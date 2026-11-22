import test from "node:test";
import assert from "node:assert/strict";
import { readCalendar, joinBlocks, isPublicSession, todayIn, DAYS_AHEAD } from "../public/js/schedule.js";
import { parseIcs } from "../public/js/ice.js";

const cal = (events, zone = "America/Los_Angeles") =>
  ["BEGIN:VCALENDAR", "VERSION:2.0", `X-WR-TIMEZONE:${zone}`, ...events.flatMap((e) => ["BEGIN:VEVENT", ...e, "END:VEVENT"]), "END:VCALENDAR"].join("\r\n");
const one = (uid, date, start, end, title) => [`UID:${uid}`, `DTSTART;TZID=America/Los_Angeles:${date}T${start}00`, `DTEND;TZID=America/Los_Angeles:${date}T${end}00`, `SUMMARY:${title}`];

/* 2026-11-23 is a Monday. */
const TODAY = "2026-11-23";

test("the server reads past the old 300-event limit: events that have ended never count toward it", () => {
  /* Like Bremerton's real calendar: thousands of old events first, then the ones still to come. */
  const old = Array.from({ length: 4000 }, (_, i) => one(`old${i}`, "20250101", "0900", "1000", "Public Session"));
  const coming = [one("new1", "20261124", "1300", "1430", "Public Session"), one("new2", "20261125", "0600", "0700", "Freestyle Figure Skating Session")];
  const text = cal([...old, ...coming]);
  /* MySkate's limit was 300 events in all, so these two were never reached. */
  const parsed = parseIcs(text, { today: TODAY, maxEvents: 300 });
  assert.equal(parsed.sessions.length, 2);
  assert.equal(parsed.ended, 4000);
  assert.equal(parsed.total, 4002);
});

test("a mixed calendar shows public sessions and hides practices, rentals, games and maintenance", () => {
  const text = cal([
    one("a", "20261124", "1300", "1430", "Public Session"),
    one("b", "20261124", "1500", "1600", "Stick n Puck"),
    one("c", "20261124", "0600", "0700", "Freestyle Figure Skating Session"),
    one("d", "20261124", "1700", "1800", "BKAT Practice"),
    one("e", "20261124", "1800", "1900", "Private Rental"),
    one("f", "20261124", "1900", "1915", "Ice Maintenance"),
    one("g", "20261124", "2000", "2100", "WSHC 18U Practice"),
    one("h", "20261124", "2100", "2200", "Adult Hockey League"),
    one("i", "20261125", "1000", "1100", "Learn to Skate Winter"),
  ]);
  const { rows, counts } = readCalendar(text, { id: "bremerton", rinkId: "bremerton", kind: "mixed" }, { today: TODAY });
  assert.deepEqual(rows.map((r) => r.kind).sort(), ["freestyle", "learn", "public", "stick"]);
  assert.equal(counts.hidden, 5);
});

test("a calendar of one kind gives every session that kind", () => {
  const text = cal([one("a", "20261124", "1300", "1430", "Holiday Public Skating (under the black lights)"), one("b", "20261124", "1500", "1600", "Something odd")]);
  const { rows } = readCalendar(text, { id: "kent-public", rinkId: "kent", kind: "public" }, { today: TODAY });
  assert.deepEqual(rows.map((r) => r.kind), ["public", "public"]);
});

test("weekly repeats become dated sessions from today for five weeks, skipping cancelled days", () => {
  const text = cal([
    ["UID:fs", "DTSTART;TZID=America/Los_Angeles:20260105T060000", "DTEND;TZID=America/Los_Angeles:20260105T070000", "RRULE:FREQ=WEEKLY;BYDAY=MO,WE", "EXDATE;TZID=America/Los_Angeles:20261125T060000", "SUMMARY:Freestyle Session"],
  ]);
  const { rows } = readCalendar(text, { id: "kent-fs", rinkId: "kent", kind: "freestyle" }, { today: TODAY });
  assert.equal(rows[0].date, "2026-11-23");
  assert.ok(!rows.some((r) => r.date === "2026-11-25"), "the cancelled Wednesday is gone");
  assert.ok(rows.every((r) => r.date >= TODAY && r.date < "2026-12-28"));
  assert.equal(rows.length, 2 * 5 - 1);
  assert.equal(DAYS_AHEAD, 35);
});

test("titles stay text, however hostile", () => {
  const text = cal([one("x", "20261124", "1300", "1400", "<script>alert(1)</script> Public Session")]);
  const { rows } = readCalendar(text, { id: "s", rinkId: "r", kind: "public" }, { today: TODAY });
  assert.equal(rows[0].title, "<script>alert(1)</script> Public Session");
});

test("a huge calendar is stopped by the time limit, and a repeat with no end does not run forever", () => {
  const many = Array.from({ length: 20000 }, (_, i) => one(`n${i}`, "20261124", "1300", "1400", "Public Session"));
  assert.throws(() => readCalendar(cal(many), { id: "s", rinkId: "r", kind: "public" }, { today: TODAY, deadline: Date.now() - 1 }), /took too long/);
  const endless = cal([["UID:e", "DTSTART;TZID=America/Los_Angeles:20200101T100000", "DTEND;TZID=America/Los_Angeles:20200101T110000", "RRULE:FREQ=DAILY", "SUMMARY:Public"]]);
  const { rows } = readCalendar(endless, { id: "s", rinkId: "r", kind: "public" }, { today: TODAY });
  assert.equal(rows.length, 35);
});

test("the number of upcoming events kept has a limit, and what did not fit is counted", () => {
  const many = Array.from({ length: 50 }, (_, i) => one(`n${i}`, "20261124", String(600 + i).padStart(4, "0"), String(601 + i).padStart(4, "0"), "Public"));
  const { counts } = readCalendar(cal(many), { id: "s", rinkId: "r", kind: "public" }, { today: TODAY, maxEvents: 10 });
  assert.equal(counts.overflow, 40);
});

test("30-minute freestyle slots that touch are joined into one block", () => {
  const s = (start, end, extra = {}) => ({ rinkId: "renton", date: "2026-11-24", kind: "freestyle", title: "Freestyle", start, end, ...extra });
  const blocks = joinBlocks([s("06:00", "06:30"), s("06:30", "07:00"), s("07:00", "07:30"), s("08:00", "08:30"), s("08:30", "09:00", { rinkId: "kirkland" })]);
  assert.equal(blocks.length, 3);
  assert.deepEqual([blocks[0].start, blocks[0].end, blocks[0].parts.length], ["06:00", "07:30", 3]);
});

test("today is worked out on the rink's clock, not the server's", () => {
  /* 2026-11-24 05:00 UTC is still the evening of 11-23 in Seattle. */
  assert.equal(todayIn("America/Los_Angeles", new Date("2026-11-24T05:00:00Z")), "2026-11-23");
  assert.equal(isPublicSession("other", "Anything", "public"), true);
  assert.equal(isPublicSession("public", "Team Practice", "mixed"), false);
});
