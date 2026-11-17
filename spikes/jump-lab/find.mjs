// A test only, not part of the app. Looks through a whole tracked program for bursts of fast turning, and says for each
// one whether it looks like a jump (short) or a spin (long), how many half turns it had, and how fast.
// usage: node find.mjs <out/NAME-VIDEO-0.json> [more parts of the same clip ...]
import { readFileSync } from "node:fs";
const parts = process.argv.slice(2).map((f) => JSON.parse(readFileSync(f, "utf8")));
const d = parts[0], frames = parts.flatMap((p) => p.frames).sort((a, b) => a.i - b.i), aspect = d.h / d.w, FPS = d.fps;
const L_SH = 11, R_SH = 12, L_HIP = 23, R_HIP = 24, L_ANK = 27, R_ANK = 28;
const rows = [];
for (const f of frames) {
  if (!f.p) continue;
  const p = f.p, mid = (a, b, k) => (p[a][k] + p[b][k]) / 2;
  const torso = Math.hypot(mid(L_SH, R_SH, 0) - mid(L_HIP, R_HIP, 0), (mid(L_SH, R_SH, 1) - mid(L_HIP, R_HIP, 1)) * aspect);
  if (!(torso > 0.005)) continue;
  rows.push({ i: f.i, shW: (p[R_SH][0] - p[L_SH][0]) / torso, torso,
    feetApart: Math.hypot(p[L_ANK][0] - p[R_ANK][0], (p[L_ANK][1] - p[R_ANK][1]) * aspect) / torso,
    legLen: ((Math.max(p[L_ANK][1], p[R_ANK][1]) - mid(L_HIP, R_HIP, 1)) * aspect) / torso,
    size: (Math.max(p[L_ANK][1], p[R_ANK][1]) - p[0][1]) });   // nose to lowest foot, as a share of the picture's height
}
console.log(`${frames.length} frames tracked (${(frames.length / FPS).toFixed(0)} s), body found in ${frames.filter((f) => f.p).length} (${((100 * frames.filter((f) => f.p).length) / frames.length).toFixed(1)}%)`);
const sizes = rows.map((r) => r.size).sort((a, b) => a - b);
console.log(`the skater fills ${(100 * sizes[Math.floor(sizes.length / 2)]).toFixed(0)}% of the picture's height at the middle of the range (smallest tenth: ${(100 * sizes[Math.floor(sizes.length / 10)]).toFixed(0)}%)`);

// half turns, counted only once the shoulder width has gone clearly to the other side
const cross = []; let side = 0, lastK = -1;
for (let k = 0; k < rows.length; k++) {
  const s = rows[k].shW > 0.2 ? 1 : rows[k].shW < -0.2 ? -1 : 0;
  if (!s) continue;
  if (side && s !== side) for (let j = lastK + 1; j <= k; j++) { const a = rows[j - 1], b = rows[j]; if (a.shW * b.shW <= 0 && a.shW !== b.shW && b.i - a.i <= 3) { cross.push(a.i + (a.shW / (a.shW - b.shW)) * (b.i - a.i)); break; } }
  side = s; lastK = k;
}
// bursts: half turns that follow each other within 14 frames (faster than about two turns a second)
const bursts = [];
for (const c of cross) { const b = bursts[bursts.length - 1]; if (b && c - b[b.length - 1] <= 14) b.push(c); else bursts.push([c]); }
const byFrame = new Map(rows.map((r) => [r.i, r]));
console.log("\n  time    frames        half turns  seconds  turns/s  fastest  feet together  looks like");
for (const b of bursts) {
  if (b.length < 3) continue;
  const span = (b[b.length - 1] - b[0]) / FPS, whole = (b.length - 1) / 2, gaps = b.slice(1).map((c, k) => c - b[k]);
  let together = 0, n = 0;
  for (let i = Math.round(b[0]); i <= Math.round(b[b.length - 1]); i++) { const r = byFrame.get(i); if (r) { n++; if (r.feetApart < 0.7 && r.legLen > 1.25) together++; } }
  const kind = span > 1.3 ? "a spin" : together / Math.max(1, n) > 0.6 ? "a jump" : "a turn or steps";
  const t = b[0] / FPS;
  console.log(`  ${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}  ${String(Math.round(b[0])).padStart(5)}-${String(Math.round(b[b.length - 1])).padEnd(5)}  ${String(b.length).padStart(6)}      ${span.toFixed(2).padStart(5)}    ${(whole / span).toFixed(1).padStart(4)}     ${(0.5 / (Math.min(...gaps) / FPS)).toFixed(1).padStart(4)}     ${String(Math.round((100 * together) / Math.max(1, n))).padStart(3)}%          ${kind}`);
}
