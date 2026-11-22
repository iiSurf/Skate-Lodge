/* Reading a rink's public Google Calendar through Google's Calendar API (the owner's choice, 2026-11-22), not through the
   calendar's public address, which Google's robots file disallows for automated readers.

   - One request type: events.list on the calendar, with repeats expanded into single sessions by Google (singleEvents).
   - Our own API key, from the server's settings, sent in the X-Goog-Api-Key header so it never appears in an address or a log.
   - Everything goes through safeFetch (https only, public addresses, size and time limits), accepting JSON only.
   - At most a few pages, and only the window we show: from yesterday to five weeks ahead. */

import { safeFetch } from "./fetcher.js";
import { guessKind } from "../public/js/ice.js";
import { addDays } from "../public/js/util.js";
import { isPublicSession, finishRows, DAYS_AHEAD } from "../public/js/schedule.js";

export const CALENDAR_API = "https://www.googleapis.com/calendar/v3/calendars/";
const FIELDS = "items(id,status,summary,start,end),nextPageToken";

export function eventsUrl(calendarId, { timeMin, timeMax, zone, pageToken }) {
  if (!/^[a-z0-9._%+-]{1,120}@(group\.calendar\.google\.com|gmail\.com|[a-z0-9.-]+\.[a-z]{2,})$/i.test(calendarId)) throw new Error("Not a calendar ID.");
  const u = new URL(CALENDAR_API + encodeURIComponent(calendarId) + "/events");
  u.searchParams.set("singleEvents", "true");
  u.searchParams.set("orderBy", "startTime");
  u.searchParams.set("timeMin", timeMin);
  u.searchParams.set("timeMax", timeMax);
  u.searchParams.set("timeZone", zone);
  u.searchParams.set("maxResults", "2500");
  u.searchParams.set("fields", FIELDS);
  if (pageToken) u.searchParams.set("pageToken", pageToken);
  return u.href;
}

/* The date and "HH:MM" on the rink's clock for a moment Google gives as an RFC 3339 time. */
export function localParts(dateTime, zone) {
  const d = new Date(dateTime);
  if (Number.isNaN(d.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d);
  const get = (t) => parts.find((p) => p.type === t).value;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}

/* Turns the API's events into our sessions. All-day events, overnight events, cancelled ones and anything outside the window are
   left out, and a calendar that mixes everything keeps only public sessions. */
export function eventsToRows(items, source, { today, zone }) {
  const last = addDays(today, DAYS_AHEAD - 1);
  const rows = [];
  let skipped = 0;
  let hidden = 0;
  for (const e of Array.isArray(items) ? items : []) {
    if (!e || e.status === "cancelled" || !e.start || !e.end || !e.start.dateTime || !e.end.dateTime) {
      skipped++;
      continue;
    }
    const s = localParts(e.start.dateTime, zone);
    const f = localParts(e.end.dateTime, zone);
    if (!s || !f || s.date !== f.date || f.time <= s.time) {
      skipped++;
      continue;
    }
    if (s.date < today || s.date > last) continue;
    const title = String(e.summary || "").trim().slice(0, 200);
    const kind = source.kind === "mixed" ? guessKind(title) : source.kind;
    if (!isPublicSession(kind, title, source.kind)) {
      hidden++;
      continue;
    }
    rows.push({ sourceId: source.id, rinkId: source.rinkId, date: s.date, start: s.time, end: f.time, kind, title });
  }
  const unique = finishRows(rows);
  return { rows: unique, counts: { events: Array.isArray(items) ? items.length : 0, kept: unique.length, hidden, skipped } };
}

/* Reads one calendar. Throws a plain Error (never including the key) when it cannot. */
export async function readGoogleCalendar(source, { key, today, zone, now = new Date(), fetch = safeFetch, maxPages = 4 }) {
  if (!key) throw new Error("No Google API key in the server's settings.");
  const timeMin = new Date(now.getTime() - 86400000).toISOString();
  const timeMax = new Date(now.getTime() + (DAYS_AHEAD + 1) * 86400000).toISOString();
  const items = [];
  let pageToken = "";
  for (let page = 0; page < maxPages; page++) {
    const res = await fetch(eventsUrl(source.calendarId, { timeMin, timeMax, zone, pageToken }), {
      accept: ["application/json"],
      headers: { "x-goog-api-key": key },
      maxBytes: 4 * 1024 * 1024,
    });
    let body;
    try {
      body = JSON.parse(res.text);
    } catch {
      throw new Error("Google's answer was not readable.");
    }
    if (Array.isArray(body.items)) items.push(...body.items.slice(0, 2500));
    pageToken = typeof body.nextPageToken === "string" ? body.nextPageToken : "";
    if (!pageToken) break;
  }
  return eventsToRows(items, source, { today, zone });
}
