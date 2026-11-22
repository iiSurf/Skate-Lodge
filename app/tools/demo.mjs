// Fills the LOCAL store (.data/store.json, ignored by Git) with made-up sessions, to see and test the week page on this
// computer before any real calendar is read. The page shows a banner saying the times are made up. Never used on a server.
//   node tools/demo.mjs          made-up sessions for this week and next
//   node tools/demo.mjs clear    back to an empty local store
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { addDays, weekKey } from "../public/js/util.js";
import { todayIn } from "../public/js/schedule.js";

const file = new URL("../.data/store.json", import.meta.url);
if (process.argv[2] === "clear") {
  rmSync(file, { force: true });
  console.log("local store cleared");
  process.exit(0);
}
const today = todayIn("America/Los_Angeles");
const monday = weekKey(today);
const at = new Date(Date.now() - 95 * 60000).toISOString();
const sessions = [];
const add = (sourceId, rinkId, day, start, end, kind, title) => sessions.push({ sourceId, rinkId, date: addDays(monday, day), start, end, kind, title });
for (let w = 0; w < 14; w += 7) {
  for (const d of [0, 2, 4]) for (const [s, e] of [["06:00", "06:30"], ["06:30", "07:00"], ["07:00", "07:30"]]) add("kent-freestyle", "kent", w + d, s, e, "freestyle", "Freestyle Session");
  for (const d of [0, 1, 2, 3, 4]) add("kent-public", "kent", w + d, "13:00", "14:30", "public", "Public Skating");
  for (const d of [5, 6]) add("kent-public", "kent", w + d, "19:00", "21:00", "public", "Public Skating (under the black lights)");
  for (const d of [1, 3]) add("bremerton-all", "bremerton", w + d, "06:15", "07:45", "freestyle", "Freestyle Figure Skating Session");
  for (const d of [5, 6]) add("bremerton-all", "bremerton", w + d, "13:00", "15:00", "public", "Public Session");
  add("bremerton-all", "bremerton", w + 2, "13:00", "14:15", "stick", "Stick n Puck");
  add("bremerton-all", "bremerton", w + 5, "10:00", "10:45", "learn", "Learn to Skate");
}
const checks = Object.fromEntries(["kent-public", "kent-freestyle", "bremerton-all"].map((id) => [id, { lastTried: at, lastOk: at, ok: true }]));
mkdirSync(new URL(".", file), { recursive: true });
writeFileSync(file, JSON.stringify({ demo: true, sessions, checks, runs: {}, switches: { schedule_job: true } }));
console.log(`${sessions.length} made-up sessions written to the local store`);
