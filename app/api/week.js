/* GET /api/week?start=YYYY-MM-DD (a Monday): every rink, and the public sessions in that week with where each came from and
   when its calendar was last read. Public information only; no account, nothing about any person. */

import { createStore } from "../server/store.js";
import { send, query } from "../server/http.js";
import { isDay } from "../public/js/ice.js";
import { addDays, weekKey } from "../public/js/util.js";
import { todayIn, DAYS_AHEAD } from "../public/js/schedule.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return send(res, 405, { error: "Use GET." }, { allow: "GET" });
  const today = todayIn("America/Los_Angeles");
  const thisWeek = weekKey(today);
  const asked = query(req).get("start") || thisWeek;
  /* Only real Mondays from this week up to the last week we keep. */
  if (!isDay(asked) || weekKey(asked) !== asked || asked < thisWeek || asked > addDays(today, DAYS_AHEAD)) {
    return send(res, 400, { error: "Ask for a Monday from this week on." }, { "cache-control": "no-store" });
  }
  try {
    const store = createStore();
    const rinks = await store.rinks();
    const { sessions, checks, sources, demo } = await store.week(asked, addDays(asked, 6));
    return send(res, 200, { start: asked, today, rinks, sources, sessions, checks, demo: demo === true }, { "cache-control": "public, max-age=60, s-maxage=300" });
  } catch (err) {
    console.error("week failed:", err && err.message);
    return send(res, 503, { error: "Schedules are not available right now." }, { "cache-control": "no-store" });
  }
}
