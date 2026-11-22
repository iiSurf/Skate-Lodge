/* The week page: every rink's public sessions for this week or next, with filters, My picks (kept on this device only),
   add to calendar, and directions. Text from rinks' calendars only reaches the page through the html tag, which escapes it. */

import { html, raw, todayISO, addDays, fmtDate } from "./util.js";
import { KINDS, kindName, fmtRange, toMin, buildIcs } from "./ice.js";
import { joinBlocks } from "./schedule.js";

const state = { week: 0, data: null, kinds: new Set(), rinks: new Set(), picksOnly: false, filtersOpen: false, error: "" };
const PICKS = "skatelodge.picks.v1";

/* My picks live in this browser only. Storage can be missing or full (private browsing), so every use is guarded. */
const picks = (() => {
  let set = new Set();
  try {
    set = new Set(JSON.parse(localStorage.getItem(PICKS) || "[]").filter((k) => typeof k === "string").slice(0, 500));
  } catch {
    /* no storage: picks last until the page is closed */
  }
  const save = () => {
    try {
      localStorage.setItem(PICKS, JSON.stringify([...set]));
    } catch {
      /* ignore */
    }
  };
  return { has: (k) => set.has(k), toggle: (k) => (set.has(k) ? set.delete(k) : set.add(k), save()), size: () => set.size };
})();

const keyOf = (s) => [s.rinkId, s.date, s.start, s.end, s.kind].join("|");
const STAR = raw('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.5l6.1-.7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>');

function ago(iso) {
  if (!iso) return "";
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 2) return "just now";
  if (min < 60) return `${min} minutes ago`;
  const h = Math.round(min / 60);
  if (h < 36) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  return `${d} days ago`;
}

function monday(offsetWeeks) {
  const t = todayISO();
  const d = new Date(t + "T12:00:00");
  const back = (d.getDay() + 6) % 7;
  return addDays(t, -back + 7 * offsetWeeks);
}

async function load() {
  state.error = "";
  const start = monday(state.week);
  document.getElementById("range").textContent = `${fmtDate(start, { month: "short", day: "numeric" })} to ${fmtDate(addDays(start, 6), { month: "short", day: "numeric" })}`;
  try {
    const res = await fetch(`/api/week?start=${encodeURIComponent(start)}`, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(String(res.status));
    state.data = await res.json();
  } catch {
    state.data = null;
    state.error = "Schedules could not be loaded. Check your connection and try again.";
  }
  render();
}

function sessionCard(s, ctx) {
  const rink = ctx.rinkOf.get(s.rinkId) || { name: "A rink" };
  const key = keyOf(s);
  const pick = picks.has(key);
  const over = s.date === ctx.today && toMin(s.end) <= ctx.nowMin;
  const src = ctx.sourceOf.get(s.sourceId);
  const check = ctx.checks[s.sourceId] || {};
  const stale = check.lastOk && Date.now() - new Date(check.lastOk).getTime() > 2 * 86400000;
  const what = `${kindName(s.kind)} at ${rink.name}, ${fmtDate(s.date, { weekday: "long" })} ${fmtRange(s.start, s.end)}`;
  const clash = ctx.clashes.get(key);
  /* A title that only repeats the kind ("Freestyle Session", "Public Skating") says nothing new. */
  const plainTitle = /^(free ?style( figure skating)?( session)?|public (skating|session|skate)|stick (n|and|&) puck|learn to skate)$/i;
  const showTitle = s.title && !plainTitle.test(s.title.trim());
  return html`<article class="sess ${pick ? "is-pick" : ""} ${over ? "is-over" : ""}" data-rk="${rink.color || ""}">
    <div class="info">
      <span class="time">${fmtRange(s.start, s.end)}</span>
      <span class="kind">${kindName(s.kind)}</span>
      <span class="rink"><i class="dot" data-rk="${rink.color || ""}"></i>${rink.name}</span>
      ${showTitle ? html`<span class="title">${s.title}</span>` : ""}
      ${s.parts && s.parts.length > 1 ? html`<span class="slots">${s.parts.length} slots of ${Math.round(toMin(s.parts[0].end) - toMin(s.parts[0].start))} minutes, back to back</span>` : ""}
      <span class="from ${stale ? "is-stale" : ""}">From ${rink.schedule_page ? html`<a href="${rink.schedule_page}" target="_blank" rel="noopener noreferrer">${src ? src.label : "the rink's calendar"}</a>` : src ? src.label : "the rink's calendar"}${check.lastOk ? html`, checked ${ago(check.lastOk)}` : ""}${stale ? ". It may be out of date." : ""}</span>
      ${over ? html`<span class="from">Finished for today</span>` : ""}
    </div>
    <button class="star" type="button" data-act="pick" data-key="${key}" aria-pressed="${pick}" aria-label="${pick ? "Remove from My picks" : "Add to My picks"}: ${what}">${STAR}</button>
    ${clash ? html`<p class="clash">Overlaps another pick: ${kindName(clash.kind)} at ${(ctx.rinkOf.get(clash.rinkId) || { name: "another rink" }).name}, ${fmtRange(clash.start, clash.end)}</p>` : ""}
    <div class="acts">
      <button class="btn btn--plain btn--small" type="button" data-act="ics" data-key="${key}">Add to calendar</button>
      ${rink.address ? html`<a class="btn btn--plain btn--small" href="${"https://maps.apple.com/?daddr=" + encodeURIComponent(rink.address)}" target="_blank" rel="noopener noreferrer">Directions</a>` : ""}
    </div>
  </article>`;
}

function render() {
  const main = document.getElementById("main");
  document.querySelectorAll("[data-week]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.week) === state.week)));
  if (state.error) {
    main.innerHTML = String(html`<p class="banner banner--error">${state.error}</p><div class="cluster"><button class="btn" type="button" data-act="retry">Try again</button></div>`);
    return;
  }
  const d = state.data;
  const today = d.today || todayISO();
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const rinkOf = new Map(d.rinks.map((r) => [r.id, r]));
  const sourceOf = new Map((d.sources || []).map((s) => [s.id, s]));
  const checks = d.checks || {};

  const all = joinBlocks(d.sessions.filter((s) => s.date >= today));
  /* Picks that overlap on the same day. */
  const picked = all.filter((s) => picks.has(keyOf(s)));
  const clashes = new Map();
  for (const a of picked) for (const b of picked) if (a !== b && a.date === b.date && a.start < b.end && b.start < a.end && !clashes.has(keyOf(a))) clashes.set(keyOf(a), b);
  const shown = all.filter((s) => (!state.kinds.size || state.kinds.has(s.kind)) && (!state.rinks.size || state.rinks.has(s.rinkId)) && (!state.picksOnly || picks.has(keyOf(s))));

  const withSessions = new Set(d.sessions.map((s) => s.rinkId));
  const kindsHere = KINDS.filter((k) => all.some((s) => s.kind === k.id));
  const rinksHere = d.rinks.filter((r) => withSessions.has(r.id));
  const ctx = { today, nowMin, rinkOf, sourceOf, checks, clashes };

  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(d.start, i);
    if (date < today) continue;
    const list = shown.filter((s) => s.date === date);
    if (!list.length) continue;
    days.push(html`<section class="day" aria-label="${fmtDate(date, { weekday: "long", month: "long", day: "numeric" })}">
      <h2>${fmtDate(date, { weekday: "long", month: "short", day: "numeric" })}${date === today ? html` <span class="today">Today</span>` : ""}</h2>
      <div class="sessions">${list.map((s) => sessionCard(s, ctx))}</div>
    </section>`);
  }

  const active = state.kinds.size + state.rinks.size;
  const others = d.rinks.filter((r) => !withSessions.has(r.id));
  main.innerHTML = String(html`
    ${d.demo ? html`<p class="banner">Made-up sessions for testing on this computer. These are not real times.</p>` : ""}
    <section class="card filters" aria-label="Show and filter">
      <div class="cluster">
        <div class="seg" role="group" aria-label="Show">
          <button type="button" data-act="all" aria-pressed="${!state.picksOnly}">All sessions</button>
          <button type="button" data-act="mine" aria-pressed="${state.picksOnly}">My picks · ${picks.size()}</button>
        </div>
        ${kindsHere.length > 1 || rinksHere.length > 1 ? html`<button class="chip" type="button" data-act="filters" aria-expanded="${state.filtersOpen}" aria-controls="filter-panel">Filter${active ? ` · ${active}` : ""}</button>` : ""}
        ${active ? html`<button class="chip" type="button" data-act="clear">Clear</button>` : ""}
      </div>
      ${state.filtersOpen ? html`<div class="stack" id="filter-panel">
        ${kindsHere.length > 1 ? html`<span class="label" id="f-kind">Type</span><div class="cluster" role="group" aria-labelledby="f-kind">${kindsHere.map((k) => html`<button class="chip" type="button" data-act="kind" data-id="${k.id}" aria-pressed="${state.kinds.has(k.id)}">${k.name}</button>`)}</div>` : ""}
        ${rinksHere.length > 1 ? html`<span class="label" id="f-rink">Rink</span><div class="cluster" role="group" aria-labelledby="f-rink">${rinksHere.map((r) => html`<button class="chip" type="button" data-act="rink" data-id="${r.id}" aria-pressed="${state.rinks.has(r.id)}"><i class="dot" data-rk="${r.color || ""}"></i>${r.name}</button>`)}</div>` : ""}
        <p class="note">Nothing selected means all of them.</p>
      </div>` : ""}
    </section>
    <div class="days">${days.length ? days : html`<section class="card empty"><p class="dim">${state.picksOnly ? "No picks this week. Choose All sessions and tap the star on the ones you want." : withSessions.size ? "No sessions match these filters this week." : "No schedules have been read yet."}</p></section>`}</div>
    ${others.length ? html`<section class="stack" aria-labelledby="others-h">
      <h2 id="others-h">More rinks</h2>
      <p class="note">We don't read these schedules yet. Check each rink's own page.</p>
      <div class="others">${others.map((r) => html`<article class="other" data-rk="${r.color || ""}">
        <span class="name"><i class="dot" data-rk="${r.color || ""}"></i>${r.name}</span>
        <span class="note">${r.city}${r.note ? html` · ${r.note}` : ""}</span>
        <div class="cluster">
          ${r.schedule_page ? html`<a class="btn btn--plain btn--small" href="${r.schedule_page}" target="_blank" rel="noopener noreferrer">Schedule on ${new URL(r.schedule_page).hostname.replace(/^www\./, "")}</a>` : ""}
          ${r.address ? html`<a class="btn btn--plain btn--small" href="${"https://maps.apple.com/?daddr=" + encodeURIComponent(r.address)}" target="_blank" rel="noopener noreferrer">Directions</a>` : ""}
        </div>
      </article>`)}</div>
    </section>` : ""}
  `);
  /* Rink colors are set from code, since the page's security rules allow no inline styles. Only real colors get through. */
  main.querySelectorAll("[data-rk]").forEach((el) => {
    if (/^#[0-9a-f]{6}$/i.test(el.dataset.rk)) el.style.setProperty("--rk", el.dataset.rk);
  });
  state.lastShown = { all, rinkOf };
}

function downloadIcs(key) {
  const { all, rinkOf } = state.lastShown || {};
  const s = (all || []).find((x) => keyOf(x) === key);
  if (!s) return;
  const rink = rinkOf.get(s.rinkId) || { id: s.rinkId, name: "Rink", city: "" };
  const text = buildIcs([{ id: key.replace(/[^a-z0-9-]/gi, "-"), rinkId: rink.id, kind: s.kind, date: s.date, days: [], start: s.start, end: s.end, note: s.title || "", price: null, skip: [] }], [{ ...rink, url: rink.schedule_page || rink.website || "" }]).replace("-//MySkate//Ice times//EN", "-//Skate Lodge//Rink schedules//EN");
  const url = URL.createObjectURL(new Blob([text], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${rink.name} ${s.date}.ics`.replace(/[^\w .-]/g, "");
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

document.addEventListener("click", (e) => {
  const weekBtn = e.target.closest("[data-week]");
  if (weekBtn) {
    state.week = Number(weekBtn.dataset.week);
    load();
    return;
  }
  const b = e.target.closest("[data-act]");
  if (!b) return;
  const act = b.dataset.act;
  if (act === "retry") return load();
  if (act === "pick") picks.toggle(b.dataset.key);
  else if (act === "ics") return downloadIcs(b.dataset.key);
  else if (act === "all") state.picksOnly = false;
  else if (act === "mine") state.picksOnly = true;
  else if (act === "filters") state.filtersOpen = !state.filtersOpen;
  else if (act === "clear") (state.kinds.clear(), state.rinks.clear());
  else if (act === "kind") state.kinds.has(b.dataset.id) ? state.kinds.delete(b.dataset.id) : state.kinds.add(b.dataset.id);
  else if (act === "rink") state.rinks.has(b.dataset.id) ? state.rinks.delete(b.dataset.id) : state.rinks.add(b.dataset.id);
  render();
  /* Keep the focus on the control that was used, after the page is drawn again. */
  const again = document.querySelector(`[data-act="${act}"]${b.dataset.key ? `[data-key="${CSS.escape(b.dataset.key)}"]` : ""}${b.dataset.id ? `[data-id="${CSS.escape(b.dataset.id)}"]` : ""}`);
  if (again) again.focus();
});

load();
