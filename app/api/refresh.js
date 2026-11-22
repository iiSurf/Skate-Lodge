/* POST or GET /api/refresh: run the schedule job. Only a caller with the job's secret gets in (the scheduler: Supabase pg_cron
   or Vercel cron, both sending "Authorization: Bearer <secret>"). Everyone else gets 401 and nothing runs. */

import { createStore } from "../server/store.js";
import { runRefresh } from "../server/refresh.js";
import { send, hasSecret } from "../server/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") return send(res, 405, { error: "Use POST." }, { allow: "POST, GET" });
  if (!hasSecret(req, process.env.JOB_SECRET)) return send(res, 401, { error: "Not allowed." }, { "cache-control": "no-store" });
  try {
    const result = await runRefresh({ store: createStore() });
    return send(res, 200, result, { "cache-control": "no-store" });
  } catch (err) {
    console.error("refresh failed:", err && err.message);
    return send(res, 500, { error: "The job failed." }, { "cache-control": "no-store" });
  }
}
