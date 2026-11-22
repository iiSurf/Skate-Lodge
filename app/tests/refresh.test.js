import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { fileStore } from "../server/store.js";
import { runRefresh, MIN_GAP_MS } from "../server/refresh.js";
import { hasSecret } from "../server/http.js";
import handler from "../api/refresh.js";

const ICS = ["BEGIN:VCALENDAR", "X-WR-TIMEZONE:America/Los_Angeles", "BEGIN:VEVENT", "UID:a", "DTSTART;TZID=America/Los_Angeles:20261124T130000", "DTEND;TZID=America/Los_Angeles:20261124T143000", "SUMMARY:Public Session", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
const NOW = () => new Date("2026-11-23T18:00:00Z");

function tempStore(sources) {
  const dir = mkdtempSync(join(new URL("../", import.meta.url).pathname, ".tmp-"));
  const store = fileStore(pathToFileURL(join(dir, "store.json")));
  store.sources = async () => sources;
  return { store, done: () => rmSync(dir, { recursive: true, force: true }) };
}
const src = (o = {}) => ({ id: "kent-public", rinkId: "kent", kind: "public", url: "https://calendar.google.com/x.ics", approved: true, termsChecked: "2026-11-22", ...o });

test("the job reads approved sources whose terms were read, and keeps their sessions", async () => {
  const { store, done } = tempStore([src()]);
  const r = await runRefresh({ store, fetch: async () => ({ text: ICS }), now: NOW });
  assert.equal(r.ran, true);
  assert.equal(r.results[0].ok, true);
  const week = await store.week("2026-11-23", "2026-11-29");
  assert.equal(week.sessions.length, 1);
  assert.equal(week.checks["kent-public"].ok, true);
  done();
});

test("a source whose site terms have not been read is never fetched", async () => {
  const { store, done } = tempStore([src({ termsChecked: null })]);
  let fetched = false;
  const r = await runRefresh({ store, fetch: async () => { fetched = true; return { text: ICS }; }, now: NOW });
  assert.equal(fetched, false);
  assert.equal(r.results[0].skipped, true);
  done();
});

test("a failed fetch keeps the last good sessions and records a short reason", async () => {
  const { store, done } = tempStore([src()]);
  await runRefresh({ store, fetch: async () => ({ text: ICS }), now: NOW });
  const later = () => new Date(NOW().getTime() + MIN_GAP_MS + 1000);
  const r = await runRefresh({ store, fetch: async () => { throw new Error("The server answered 500."); }, now: later });
  assert.equal(r.results[0].ok, false);
  const week = await store.week("2026-11-23", "2026-11-29");
  assert.equal(week.sessions.length, 1, "the old sessions are still there");
  assert.equal(week.checks["kent-public"].ok, false);
  assert.equal(week.checks["kent-public"].message, "The server answered 500.");
  done();
});

test("the job runs at most once every ten minutes, and its off switch stops it", async () => {
  const { store, done } = tempStore([src()]);
  await runRefresh({ store, fetch: async () => ({ text: ICS }), now: NOW });
  const again = await runRefresh({ store, fetch: async () => ({ text: ICS }), now: NOW });
  assert.equal(again.ran, false);
  store.switchOn = async () => false;
  const off = await runRefresh({ store, fetch: async () => ({ text: ICS }), now: () => new Date("2026-12-01T00:00:00Z") });
  assert.match(off.reason, /switched off/);
  done();
});

test("only a caller with the job's secret gets in", () => {
  const secret = "a-long-random-secret-for-tests-only";
  const req = (auth) => ({ headers: auth ? { authorization: auth } : {} });
  assert.equal(hasSecret(req(`Bearer ${secret}`), secret), true);
  assert.equal(hasSecret(req(`Bearer ${secret}x`), secret), false);
  assert.equal(hasSecret(req(secret), secret), false);
  assert.equal(hasSecret(req(), secret), false);
  assert.equal(hasSecret(req("Bearer short"), "short"), false, "a secret shorter than 16 characters lets nobody in");
  assert.equal(hasSecret(req("Bearer anything"), undefined), false, "no secret set lets nobody in");
});

test("the job's endpoint refuses a call without the secret and runs nothing", async () => {
  const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(b) { this.body = b; } };
  await handler({ method: "POST", url: "/api/refresh", headers: {} }, res);
  assert.equal(res.statusCode, 401);
});
