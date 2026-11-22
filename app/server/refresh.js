/* The scheduled job: read each approved calendar and keep the next five weeks of its public sessions.

   Rules (SECURITY.md sections 5 and 11, CLAUDE.md):
   - Only sources that are approved AND whose site terms have been read (termsChecked set) are fetched.
   - Everything goes through safeFetch. Reading has a size limit, an event limit and a time limit.
   - The job has an off switch, and runs at most once every ten minutes however often it is called.
   - A source that fails keeps its last good sessions; the failure is recorded with a short message, never the body. */

import { safeFetch } from "./fetcher.js";
import { readGoogleCalendar } from "./google.js";
import { readCalendar, todayIn } from "../public/js/schedule.js";

export const JOB = "schedule_job";
export const MIN_GAP_MS = 10 * 60 * 1000;

export async function runRefresh({ store, fetch = safeFetch, now = () => new Date(), env = process.env }) {
  if (!(await store.switchOn(JOB))) return { ran: false, reason: "The schedule job is switched off." };
  const last = await store.lastRun(JOB);
  if (last && now() - new Date(last) < MIN_GAP_MS) return { ran: false, reason: "It ran less than ten minutes ago." };
  await store.setLastRun(JOB, now().toISOString());

  const rinks = new Map((await store.rinks()).map((r) => [r.id, r]));
  const results = [];
  for (const src of await store.sources()) {
    const rink = rinks.get(src.rinkId);
    const at = now().toISOString();
    if (!src.approved || !src.termsChecked || !rink) {
      results.push({ source: src.id, ok: false, skipped: true, message: "Not approved, or its site's terms have not been read." });
      continue;
    }
    try {
      const zone = rink.time_zone || rink.zone || "America/Los_Angeles";
      const today = todayIn(zone, now());
      let rows, counts;
      if (src.via === "google") {
        /* A public Google Calendar: through Google's Calendar API with our key (never the calendar's public address). */
        ({ rows, counts } = await readGoogleCalendar(src, { key: env.GOOGLE_API_KEY, today, zone, now: now(), fetch }));
      } else {
        const { text } = await fetch(src.url);
        ({ rows, counts } = readCalendar(text, { id: src.id, rinkId: src.rinkId, kind: src.kind, zone }, { today, maxEvents: 5000, deadline: Date.now() + 10000 }));
      }
      await store.replaceSessions(src.id, today, rows);
      await store.recordCheck(src.id, { lastTried: at, lastOk: at, ok: true, found: rows.length, message: "" });
      results.push({ source: src.id, ok: true, ...counts });
    } catch (err) {
      const message = String(err && err.message ? err.message : err).slice(0, 300);
      await store.recordCheck(src.id, { lastTried: at, ok: false, message });
      results.push({ source: src.id, ok: false, message });
    }
  }
  return { ran: true, results };
}
