// A test only, not part of the app. For clips whose jump is known, compares the turns the counter finds with the turns
// the jump should have. usage: node check.mjs <credits.json> <out folder>
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const [creditsFile, outDir] = process.argv.slice(2);
const credits = JSON.parse(readFileSync(creditsFile, "utf8"));
const L_SH = 11, R_SH = 12, L_HIP = 23, R_HIP = 24, L_ANK = 27, R_ANK = 28;
console.log("clip              jump  should be  counted  half turns  turns/s  in the air  frames/s  size  verdict");
let good = 0, n = 0;
for (const [name, code, should] of credits) {
  const file = readdirSync(outDir).find((f) => f.startsWith(name + "-") && f.endsWith("-VIDEO-0.json"));
  if (!file) { console.log(name.padEnd(17), "not tracked yet"); continue; }
  const d = JSON.parse(readFileSync(join(outDir, file), "utf8")), aspect = d.h / d.w, rows = [];
  for (const f of d.frames) {
    if (!f.p) continue;
    const p = f.p, mid = (a, b, k) => (p[a][k] + p[b][k]) / 2;
    const torso = Math.hypot(mid(L_SH, R_SH, 0) - mid(L_HIP, R_HIP, 0), (mid(L_SH, R_SH, 1) - mid(L_HIP, R_HIP, 1)) * aspect);
    if (!(torso > 0.005)) continue;
    rows.push({ i: f.i, shW: (p[R_SH][0] - p[L_SH][0]) / torso, feetApart: Math.hypot(p[L_ANK][0] - p[R_ANK][0], (p[L_ANK][1] - p[R_ANK][1]) * aspect) / torso,
      legLen: ((Math.max(p[L_ANK][1], p[R_ANK][1]) - mid(L_HIP, R_HIP, 1)) * aspect) / torso, size: Math.max(p[L_ANK][1], p[R_ANK][1]) - p[0][1] });
  }
  const cross = []; let side = 0, lastK = -1;
  for (let k = 0; k < rows.length; k++) {
    const s = rows[k].shW > 0.2 ? 1 : rows[k].shW < -0.2 ? -1 : 0; if (!s) continue;
    if (side && s !== side) for (let j = lastK + 1; j <= k; j++) { const a = rows[j - 1], b = rows[j]; if (a.shW * b.shW <= 0 && a.shW !== b.shW) { cross.push(a.i + (a.shW / (a.shW - b.shW)) * (b.i - a.i)); break; } }
    side = s; lastK = k;
  }
  const air = rows.filter((r) => r.feetApart < 0.7 && r.legLen > 1.25).map((r) => r.i), runs = [];
  for (const i of air) { const last = runs[runs.length - 1]; if (last && i - last[1] <= 2) last[1] = i; else runs.push([i, i]); }
  // the jump is the run with the most half turns in it
  let best = null;
  for (const [a, b] of runs) { const inAir = cross.filter((c) => c >= a && c <= b); if (!best || inAir.length > best.inAir.length) best = { a, b, inAir }; }
  const sizes = rows.map((r) => r.size).sort((x, y) => x - y), size = Math.round(100 * sizes[Math.floor(sizes.length / 2)]);
  n++;
  if (!best || best.inAir.length < 2) { console.log(`${name.padEnd(17)} ${code.padEnd(5)} ${String(should).padStart(6)}       none found                                  ${String(d.fps).padStart(6)}   ${size}%   MISSED`); continue; }
  const { a, b, inAir } = best, gaps = inAir.slice(1).map((c, k) => c - inAir[k]), whole = (inAir.length - 1) / 2;
  const turns = whole + (inAir[0] - a) / gaps[0] / 2 + (b - inAir[inAir.length - 1]) / gaps[gaps.length - 1] / 2;
  const speed = whole / ((inAir[inAir.length - 1] - inAir[0]) / d.fps), off = turns - should, ok = Math.abs(off) <= 0.5;
  if (ok) good++;
  console.log(`${name.padEnd(17)} ${code.padEnd(5)} ${String(should).padStart(6)}     ${turns.toFixed(1).padStart(5)}     ${String(inAir.length).padStart(5)}     ${speed.toFixed(1).padStart(5)}     ${((b - a + 1) / d.fps).toFixed(2)} s    ${String(d.fps).padStart(5)}   ${size}%   ${ok ? "within half a turn" : (off > 0 ? "OVER by " : "UNDER by ") + Math.abs(off).toFixed(1)}`);
}
console.log(`\n${good} of ${n} within half a turn of the right answer`);
