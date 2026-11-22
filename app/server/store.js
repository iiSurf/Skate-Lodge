/* Where schedules are kept. Two kinds, with the same functions:

   - Supabase, when SUPABASE_URL is set. Reads use the public key, which the database's own rules limit to reading rinks,
     approved sources, sessions and checks. Writes use the service key, which only the scheduled job holds; it never reaches
     the page or a log. Replacing a source's sessions is one database function, so a failed run never leaves a gap.
   - A local file (app/.data/store.json, ignored by Git) when it is not, so the site runs on a laptop with no accounts.

   Seeded from data/rinks.json. */

import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from "node:fs";

const SEED = JSON.parse(readFileSync(new URL("../data/rinks.json", import.meta.url), "utf8"));

export function createStore(env = process.env) {
  if (env.SUPABASE_URL) return supabaseStore(env);
  return fileStore(new URL("../.data/store.json", import.meta.url));
}

/* ---------- The local file ---------- */

export function fileStore(fileUrl) {
  const load = () => {
    if (!existsSync(fileUrl)) return { sessions: [], checks: {}, runs: {}, switches: { schedule_job: true } };
    return JSON.parse(readFileSync(fileUrl, "utf8"));
  };
  const save = (data) => {
    mkdirSync(new URL(".", fileUrl), { recursive: true });
    const tmp = new URL(fileUrl.href + ".tmp");
    writeFileSync(tmp, JSON.stringify(data));
    renameSync(tmp, fileUrl);
  };
  return {
    kind: "file",
    async rinks() {
      return SEED.rinks;
    },
    async sources() {
      return SEED.sources.filter((s) => s.approved);
    },
    async switchOn(name) {
      return load().switches[name] !== false;
    },
    async lastRun(name) {
      return load().runs[name] || null;
    },
    async setLastRun(name, when) {
      const d = load();
      d.runs[name] = when;
      save(d);
    },
    async replaceSessions(sourceId, fromDate, rows) {
      const d = load();
      d.sessions = d.sessions.filter((s) => !(s.sourceId === sourceId && s.date >= fromDate)).concat(rows);
      save(d);
    },
    async recordCheck(sourceId, check) {
      const d = load();
      d.checks[sourceId] = { ...(d.checks[sourceId] || {}), ...check };
      save(d);
    },
    async week(start, end) {
      const d = load();
      return {
        sessions: d.sessions.filter((s) => s.date >= start && s.date <= end).sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start)),
        checks: d.checks,
        sources: SEED.sources.filter((s) => s.approved).map(({ id, rinkId, kind, label }) => ({ id, rinkId, kind, label })),
        demo: d.demo === true,
      };
    },
  };
}

/* ---------- Supabase ---------- */

export function supabaseStore(env) {
  const base = env.SUPABASE_URL.replace(/\/$/, "") + "/rest/v1";
  const call = async (path, { key, method = "GET", body, prefer } = {}) => {
    if (!key) throw new Error("A Supabase key is missing from the server's settings.");
    const res = await fetch(base + path, {
      method,
      headers: { apikey: key, authorization: `Bearer ${key}`, "content-type": "application/json", ...(prefer ? { prefer } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    /* Never echo the response body: it can carry database details. */
    if (!res.ok) throw new Error(`The database answered ${res.status} for ${method} ${path.split("?")[0]}.`);
    return res.status === 204 ? null : res.json();
  };
  const read = (path) => call(path, { key: env.SUPABASE_ANON_KEY });
  const write = (path, opts) => call(path, { key: env.SUPABASE_SERVICE_KEY, ...opts });
  return {
    kind: "supabase",
    async rinks() {
      return read("/rinks?select=id,org_id,name,city,address,website,schedule_page,time_zone,color,note&order=name");
    },
    async sources() {
      /* The job's own view: approved sources, read with the service key so terms_checked is included. */
      return (await write("/schedule_sources?select=id,rink_id,kind,url,label,approved,terms_checked&approved=is.true")).map((s) => ({
        id: s.id, rinkId: s.rink_id, kind: s.kind, url: s.url, label: s.label, approved: s.approved, termsChecked: s.terms_checked,
      }));
    },
    async switchOn(name) {
      const rows = await write(`/kill_switches?select=enabled&name=eq.${encodeURIComponent(name)}`);
      return rows.length ? rows[0].enabled === true : false;
    },
    async lastRun(name) {
      const rows = await write(`/job_runs?select=last_started&name=eq.${encodeURIComponent(name)}`);
      return rows.length ? rows[0].last_started : null;
    },
    async setLastRun(name, when) {
      await write("/job_runs", { method: "POST", body: { name, last_started: when }, prefer: "resolution=merge-duplicates,return=minimal" });
    },
    async replaceSessions(sourceId, fromDate, rows) {
      await write("/rpc/replace_source_sessions", {
        method: "POST",
        body: { p_source: sourceId, p_from: fromDate, p_rows: rows.map((r) => ({ rink_id: r.rinkId, date: r.date, start_time: r.start, end_time: r.end, kind: r.kind, title: r.title })) },
      });
    },
    async recordCheck(sourceId, c) {
      await write("/source_checks", {
        method: "POST",
        body: { source_id: sourceId, last_tried: c.lastTried, ...(c.lastOk ? { last_ok: c.lastOk } : {}), ok: c.ok, sessions_found: c.found ?? null, message: (c.message || "").slice(0, 300) },
        prefer: "resolution=merge-duplicates,return=minimal",
      });
    },
    async week(start, end) {
      const sessions = await read(`/sessions?select=source_id,rink_id,date,start_time,end_time,kind,title&date=gte.${start}&date=lte.${end}&order=date,start_time`);
      const checks = await read("/source_checks?select=source_id,last_tried,last_ok,ok,sessions_found");
      const sources = await read("/schedule_sources?select=id,rink_id,kind,label");
      return {
        sources: sources.map((s) => ({ id: s.id, rinkId: s.rink_id, kind: s.kind, label: s.label })),
        sessions: sessions.map((s) => ({ sourceId: s.source_id, rinkId: s.rink_id, date: s.date, start: s.start_time.slice(0, 5), end: s.end_time.slice(0, 5), kind: s.kind, title: s.title || "" })),
        checks: Object.fromEntries(checks.map((c) => [c.source_id, { lastTried: c.last_tried, lastOk: c.last_ok, ok: c.ok, found: c.sessions_found }])),
      };
    },
  };
}

export const seed = SEED;
