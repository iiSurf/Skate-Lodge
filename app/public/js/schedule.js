/* Rink schedules for Skate Lodge: turning a rink's calendar into dated sessions, deciding which sessions are for the public,
   and joining freestyle slots that touch into one block. Pure logic shared by the server (reading calendars) and the page
   (showing the week), so both are tested the same way. */

import { parseIcs, occurrencesInWeek, sanitizeIceSession, KIND_IDS, toMin } from "./ice.js";
import { addDays, weekKey } from "./util.js";

/* How far ahead sessions are kept: five weeks covers "this week" and "next week" with room to spare. */
export const DAYS_AHEAD = 35;

/* Titles in a calendar that mixes everything (Bremerton's) that are not public sessions: team practices, rentals, games,
   ice maintenance. A mixed calendar shows only sessions whose kind is known and whose title does not say any of these. */
const NOT_PUBLIC = /\b(practice|rental|rented|private|maintenance|resurfac\w*|hockey|game|games|tournament|league|team|closed|staff|camp|clinic|birthday|party|reserved|booked)\b|\b\d+u\b/i;

export function isPublicSession(kind, title, sourceKind) {
  if (sourceKind !== "mixed") return true;
  if (kind === "other") return false;
  return !NOT_PUBLIC.test(String(title || ""));
}

/* "YYYY-MM-DD" for this moment on the clock of a time zone (the rink's), whatever the server's own zone is. */
export function todayIn(zone, now = new Date()) {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  } catch {
    return now.toISOString().slice(0, 10);
  }
}

/* Reads one calendar for one source and returns the dated sessions from today for DAYS_AHEAD days.
   source: { id, rinkId, kind ("mixed" or one of the kinds), zone }. Returns { rows, counts }. */
export function readCalendar(text, source, { today, maxEvents = 5000, deadline = 0 } = {}) {
  const parsed = parseIcs(text, { today, maxEvents, deadline, zone: source.zone || "America/Los_Angeles" });
  const last = addDays(today, DAYS_AHEAD - 1);
  /* The calendar's title travels as the session's note. */
  const sessions = parsed.sessions.map((s, i) => sanitizeIceSession({ ...s, id: `${source.id}#${i}`, rinkId: source.rinkId })).filter(Boolean);
  const rows = [];
  let hidden = 0;
  for (let week = weekKey(today); week <= last; week = addDays(week, 7)) {
    for (const o of occurrencesInWeek(sessions, week)) {
      if (o.date < today || o.date > last) continue;
      const kind = source.kind === "mixed" ? o.kind : KIND_IDS.includes(source.kind) ? source.kind : o.kind;
      const title = (o.note || "").slice(0, 200);
      if (!isPublicSession(kind, title, source.kind)) {
        hidden++;
        continue;
      }
      rows.push({ sourceId: source.id, rinkId: source.rinkId, date: o.date, start: o.start, end: o.end, kind, title });
    }
  }
  /* The same session written twice in a calendar shows once. */
  const seen = new Set();
  const unique = rows.filter((r) => {
    const k = [r.date, r.start, r.end, r.kind, r.title].join("|");
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  unique.sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start));
  return { rows: unique, counts: { events: parsed.total, kept: unique.length, hidden, ended: parsed.ended, skipped: parsed.skipped, overflow: parsed.overflow || 0 } };
}

/* Freestyle at Sno-King and the Kraken rink is sold in 30-minute slots, so one morning can be six cards in a row. Sessions at the
   same rink, of the same kind and title, where one ends exactly when the next starts, are joined into one block that keeps its
   parts. Input must be sorted by date and start. */
export function joinBlocks(sessions) {
  const out = [];
  for (const s of sessions) {
    const prev = out[out.length - 1];
    if (prev && prev.date === s.date && prev.rinkId === s.rinkId && prev.kind === s.kind && prev.title === s.title && toMin(prev.end) === toMin(s.start)) {
      prev.end = s.end;
      prev.parts.push(s);
    } else {
      out.push({ ...s, parts: [s] });
    }
  }
  return out;
}
