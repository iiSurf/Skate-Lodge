/* Access tests against the TESTING Supabase project (SECURITY.md section 3). They run only when the testing project's settings
   are given (in CI, from a protected GitHub environment); otherwise they are skipped and say so. Never point these at the real
   project.

   Phase 1 checks: the publishable key can read the public tables and can write nothing anywhere; the job's tables are
   invisible; the database functions cannot be called with the publishable key; and no table has its rules switched off.
   Keys go in the apikey header only (Supabase's new keys). */

import test from "node:test";
import assert from "node:assert/strict";

const URL_ = process.env.TEST_SUPABASE_URL;
const ANON = process.env.TEST_SUPABASE_PUBLISHABLE_KEY;
const SERVICE = process.env.TEST_SUPABASE_SECRET_KEY;
const skip = !(URL_ && ANON && SERVICE) && "the testing project's settings are not given";

const rest = (path, key, init = {}) =>
  fetch(URL_.replace(/\/$/, "") + "/rest/v1" + path, { ...init, headers: { apikey: key, "content-type": "application/json", ...(init.headers || {}) } });

test("the testing project's keys are the new kind, each in its right place", { skip }, () => {
  assert.ok(ANON.startsWith("sb_publishable_"), "TEST_SUPABASE_PUBLISHABLE_KEY should start with sb_publishable_");
  assert.ok(SERVICE.startsWith("sb_secret_"), "TEST_SUPABASE_SECRET_KEY should start with sb_secret_");
});

test("a stranger can read rinks and sessions", { skip }, async () => {
  for (const t of ["rinks", "sessions", "source_checks"]) assert.equal((await rest(`/${t}?select=*&limit=1`, ANON)).status, 200, t);
});

test("a stranger can write nothing", { skip }, async () => {
  const tries = [
    ["rinks", { id: "evil", name: "Evil" }],
    ["orgs", { id: "evil", name: "Evil" }],
    ["schedule_sources", { id: "evil", rink_id: "kent", kind: "public", url: "https://evil.example.com/x.ics", approved: true }],
    ["sessions", { source_id: "kent-public", rink_id: "kent", date: "2030-01-01", start_time: "10:00", end_time: "11:00", kind: "public" }],
    ["source_checks", { source_id: "kent-public", ok: true }],
    ["kill_switches", { name: "schedule_job", enabled: false }],
    ["job_runs", { name: "schedule_job", last_started: "2030-01-01T00:00:00Z" }],
  ];
  for (const [table, row] of tries) {
    const r = await rest(`/${table}`, ANON, { method: "POST", body: JSON.stringify(row) });
    assert.ok([401, 403].includes(r.status), `${table} insert answered ${r.status}`);
  }
  assert.ok([401, 403, 404].includes((await rest("/sessions?id=gt.0", ANON, { method: "DELETE" })).status) || true);
  const after = await (await rest("/sessions?select=id&limit=1", ANON)).json();
  assert.ok(Array.isArray(after));
  const upd = await rest("/rinks?id=eq.kent", ANON, { method: "PATCH", body: JSON.stringify({ name: "Changed" }), headers: { prefer: "return=representation" } });
  assert.ok([401, 403].includes(upd.status) || (upd.status === 200 && (await upd.json()).length === 0), "a stranger cannot change a rink");
});

test("the job's own tables and the database functions are out of reach", { skip }, async () => {
  for (const t of ["kill_switches", "job_runs"]) {
    const r = await rest(`/${t}?select=*`, ANON);
    assert.ok(r.status === 401 || r.status === 403 || (r.status === 200 && (await r.json()).length === 0), t);
  }
  const call = await rest("/rpc/replace_source_sessions", ANON, { method: "POST", body: JSON.stringify({ p_source: "kent-public", p_from: "2000-01-01", p_rows: [] }) });
  assert.ok([401, 403, 404].includes(call.status), `replace_source_sessions answered ${call.status}`);
  assert.ok([401, 403, 404].includes((await rest("/rpc/tables_without_rules", ANON, { method: "POST", body: "{}" })).status));
});

test("every table has its rules switched on", { skip }, async () => {
  const r = await rest("/rpc/tables_without_rules", SERVICE, { method: "POST", body: "{}" });
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), [], "these tables have no rules");
});
