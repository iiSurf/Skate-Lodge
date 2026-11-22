import test from "node:test";
import assert from "node:assert/strict";
import { eventsUrl, eventsToRows, readGoogleCalendar, localParts } from "../server/google.js";
import { runRefresh } from "../server/refresh.js";

const ZONE = "America/Los_Angeles";
const TODAY = "2026-11-23";
const KENT = { id: "kent-public", rinkId: "kent", kind: "public", via: "google", calendarId: "juvuejlh2bvf020bhbe4m2h2og@group.calendar.google.com" };
const ev = (id, start, end, summary, extra = {}) => ({ id, summary, start: { dateTime: start }, end: { dateTime: end }, ...extra });

test("the address asks Google for single sessions in our window, and never carries the key", () => {
  const u = new URL(eventsUrl(KENT.calendarId, { timeMin: "2026-11-22T00:00:00Z", timeMax: "2026-12-29T00:00:00Z", zone: ZONE }));
  assert.equal(u.origin, "https://www.googleapis.com");
  assert.equal(u.pathname, "/calendar/v3/calendars/juvuejlh2bvf020bhbe4m2h2og%40group.calendar.google.com/events");
  assert.equal(u.searchParams.get("singleEvents"), "true");
  assert.equal(u.searchParams.get("key"), null);
  assert.throws(() => eventsUrl("../../evil", { timeMin: "", timeMax: "", zone: ZONE }), /Not a calendar ID/);
});

test("times are put on the rink's clock", () => {
  assert.deepEqual(localParts("2026-11-24T13:00:00-08:00", ZONE), { date: "2026-11-24", time: "13:00" });
  assert.deepEqual(localParts("2026-11-24T21:30:00Z", ZONE), { date: "2026-11-24", time: "13:30" });
});

test("events become sessions; all-day, overnight, cancelled and out-of-window ones are left out", () => {
  const items = [
    ev("a", "2026-11-24T13:00:00-08:00", "2026-11-24T14:30:00-08:00", "Public Skating"),
    { id: "b", summary: "Closed", start: { date: "2026-11-26" }, end: { date: "2026-11-27" } },
    ev("c", "2026-11-24T22:00:00-08:00", "2026-11-25T01:00:00-08:00", "Overnight"),
    ev("d", "2026-11-25T13:00:00-08:00", "2026-11-25T14:30:00-08:00", "Public Skating", { status: "cancelled" }),
    ev("e", "2026-11-20T13:00:00-08:00", "2026-11-20T14:30:00-08:00", "Last week"),
    ev("f", "2027-02-01T13:00:00-08:00", "2027-02-01T14:30:00-08:00", "Far ahead"),
  ];
  const { rows, counts } = eventsToRows(items, KENT, { today: TODAY, zone: ZONE });
  assert.deepEqual(rows, [{ sourceId: "kent-public", rinkId: "kent", date: "2026-11-24", start: "13:00", end: "14:30", kind: "public", title: "Public Skating" }]);
  assert.equal(counts.skipped, 3);
});

test("a mixed calendar keeps only public sessions", () => {
  const brem = { ...KENT, id: "bremerton-all", rinkId: "bremerton", kind: "mixed" };
  const items = [
    ev("a", "2026-11-24T13:00:00-08:00", "2026-11-24T14:30:00-08:00", "Public Session"),
    ev("b", "2026-11-24T17:00:00-08:00", "2026-11-24T18:00:00-08:00", "BKAT Practice"),
    ev("c", "2026-11-24T06:00:00-08:00", "2026-11-24T07:00:00-08:00", "Freestyle Figure Skating Session"),
  ];
  const { rows } = eventsToRows(items, brem, { today: TODAY, zone: ZONE });
  assert.deepEqual(rows.map((r) => r.kind), ["freestyle", "public"]);
});

test("pages are followed, the key goes in a header, and only JSON is accepted", async () => {
  const calls = [];
  const fetch = async (url, opts) => {
    calls.push({ url, opts });
    const page = new URL(url).searchParams.get("pageToken");
    const body = page
      ? { items: [ev("b", "2026-11-25T13:00:00-08:00", "2026-11-25T14:00:00-08:00", "Public Skating")] }
      : { items: [ev("a", "2026-11-24T13:00:00-08:00", "2026-11-24T14:00:00-08:00", "Public Skating")], nextPageToken: "p2" };
    return { text: JSON.stringify(body) };
  };
  const { rows } = await readGoogleCalendar(KENT, { key: "test-key-0123456789", today: TODAY, zone: ZONE, now: new Date("2026-11-23T18:00:00Z"), fetch });
  assert.equal(rows.length, 2);
  assert.equal(calls.length, 2);
  for (const c of calls) {
    assert.equal(c.opts.headers["x-goog-api-key"], "test-key-0123456789");
    assert.ok(!c.url.includes("test-key"), "the key is never in the address");
    assert.deepEqual(c.opts.accept, ["application/json"]);
  }
});

test("without a key nothing is fetched, and the job records why", async () => {
  await assert.rejects(readGoogleCalendar(KENT, { key: "", today: TODAY, zone: ZONE }), /No Google API key/);
  const checks = {};
  const store = {
    switchOn: async () => true, lastRun: async () => null, setLastRun: async () => {},
    rinks: async () => [{ id: "kent", time_zone: ZONE }],
    sources: async () => [{ ...KENT, approved: true, termsChecked: "2026-11-23" }],
    replaceSessions: async () => { throw new Error("should not be called"); },
    recordCheck: async (id, c) => { checks[id] = c; },
  };
  let fetched = false;
  const r = await runRefresh({ store, env: {}, fetch: async () => { fetched = true; return { text: "{}" }; }, now: () => new Date("2026-11-23T18:00:00Z") });
  assert.equal(fetched, false);
  assert.equal(r.results[0].ok, false);
  assert.match(checks["kent-public"].message, /No Google API key/);
});

test("Google's error is reported without the key", async () => {
  const fetch = async () => { throw new Error("The server answered 403."); };
  await assert.rejects(readGoogleCalendar(KENT, { key: "secret-key-abcdefghij", today: TODAY, zone: ZONE, fetch }), (err) => !String(err.message).includes("secret-key") && /403/.test(err.message));
});
