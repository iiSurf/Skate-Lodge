import test from "node:test";
import assert from "node:assert/strict";
import { isPublicAddress, checkUrl } from "../server/net.js";
import { safeFetch, guardedLookup } from "../server/fetcher.js";

test("only ordinary public addresses count as public", () => {
  for (const ip of ["8.8.8.8", "142.250.72.14", "2607:f8b0:4005:80b::200e", "1.1.1.1"]) assert.equal(isPublicAddress(ip), true, ip);
  for (const ip of [
    "127.0.0.1", "10.1.2.3", "172.16.0.1", "172.31.255.255", "192.168.1.1", "169.254.169.254", "100.64.0.1", "0.0.0.0",
    "224.0.0.1", "255.255.255.255", "192.0.2.5", "198.51.100.7", "203.0.113.9",
    "::1", "::", "fe80::1", "fc00::1", "fd12:3456::1", "ff02::1", "2001:db8::1", "2002:7f00:1::1", "2001:0:abcd::1",
    "::ffff:127.0.0.1", "::ffff:169.254.169.254", "::ffff:7f00:1", "64:ff9b::10.0.0.1", "not an ip", "",
  ]) assert.equal(isPublicAddress(ip), false, ip);
});

test("addresses are refused before anything is sent", () => {
  const refused = [
    "http://calendar.google.com/x.ics", "ftp://example.com/x", "https://user:pw@example.com/x", "https://example.com:8443/x",
    "https://localhost/x", "https://127.0.0.1/x", "https://169.254.169.254/latest/meta-data", "https://[::1]/x",
    "https://[::ffff:10.0.0.1]/x", "https://intranet/x", "https://printer.local/x", "https://db.internal/x", "not a url",
  ];
  for (const u of refused) assert.throws(() => checkUrl(u), Error, u);
  assert.equal(checkUrl("https://calendar.google.com/calendar/ical/a%40group.calendar.google.com/public/basic.ics").hostname, "calendar.google.com");
});

test("a name that resolves to a private address is refused when connecting", async () => {
  await new Promise((resolve) => {
    guardedLookup("localhost", {}, (err) => {
      assert.ok(err);
      assert.equal(err.code, "EPRIVATE");
      resolve();
    });
  });
  await assert.rejects(safeFetch("https://localhost/x.ics"), /private network/);
});

/* A pretend network for the rules that do not need the internet. */
function fakeNet(routes) {
  const calls = [];
  const transport = async (url) => {
    calls.push(url);
    const r = routes[url];
    if (!r) throw new Error("no route " + url);
    return typeof r === "function" ? r() : { status: r.status ?? 200, headers: r.headers ?? { "content-type": "text/calendar" }, body: chunks(r.body ?? "") };
  };
  return { transport, calls };
}
async function* chunks(text, size = 1000) {
  for (let i = 0; i < text.length; i += size) yield Buffer.from(text.slice(i, i + size));
}

test("a calendar is fetched and read as text", async () => {
  const { transport } = fakeNet({ "https://cal.example.com/a.ics": { body: "BEGIN:VCALENDAR\r\nEND:VCALENDAR\r\n" } });
  const r = await safeFetch("https://cal.example.com/a.ics", { transport });
  assert.equal(r.status, 200);
  assert.match(r.text, /VCALENDAR/);
});

test("redirects are followed at most three times, and every hop is checked again", async () => {
  const hop = (to) => ({ status: 302, headers: { location: to }, body: chunks("") });
  const ok = fakeNet({ "https://a.example.com/1": hop("https://a.example.com/2"), "https://a.example.com/2": hop("/3"), "https://a.example.com/3": { body: "BEGIN:VCALENDAR" } });
  assert.match((await safeFetch("https://a.example.com/1", { transport: ok.transport })).text, /VCALENDAR/);

  const four = fakeNet({ "https://a.example.com/1": hop("/2"), "https://a.example.com/2": hop("/3"), "https://a.example.com/3": hop("/4"), "https://a.example.com/4": hop("/5") });
  await assert.rejects(safeFetch("https://a.example.com/1", { transport: four.transport }), /More than 3 redirects/);

  const sneaky = fakeNet({ "https://a.example.com/1": hop("https://169.254.169.254/latest/meta-data") });
  await assert.rejects(safeFetch("https://a.example.com/1", { transport: sneaky.transport }), /private network/);
  assert.deepEqual(sneaky.calls, ["https://a.example.com/1"]);

  const downgrade = fakeNet({ "https://a.example.com/1": hop("http://a.example.com/plain") });
  await assert.rejects(safeFetch("https://a.example.com/1", { transport: downgrade.transport }), /Only https/);
});

test("only calendar or plain text is accepted", async () => {
  const { transport } = fakeNet({ "https://a.example.com/x": { headers: { "content-type": "text/html; charset=utf-8" }, body: "<html>" } });
  await assert.rejects(safeFetch("https://a.example.com/x", { transport }), /Not a calendar/);
});

test("a file that is too big is stopped, whether or not it says its size", async () => {
  const big = "x".repeat(5000);
  const told = fakeNet({ "https://a.example.com/x": { headers: { "content-type": "text/calendar", "content-length": "999999999" }, body: big } });
  await assert.rejects(safeFetch("https://a.example.com/x", { transport: told.transport, maxBytes: 4000 }), /too big/);
  const untold = fakeNet({ "https://a.example.com/x": { body: big } });
  await assert.rejects(safeFetch("https://a.example.com/x", { transport: untold.transport, maxBytes: 4000 }), /too big/);
});

test("an answer other than 200 is an error, and a slow server is cut off", async () => {
  const notFound = fakeNet({ "https://a.example.com/x": { status: 404, body: "" } });
  await assert.rejects(safeFetch("https://a.example.com/x", { transport: notFound.transport }), /answered 404/);
  const slow = async (url, { signal }) => new Promise((_, reject) => signal.addEventListener("abort", () => reject(new Error("aborted"))));
  await assert.rejects(safeFetch("https://a.example.com/x", { transport: slow, timeoutMs: 50 }), /took too long/);
});
