// A test only. Tries several ways of counting turns on the clips whose answer is known, to see which is closest.
// usage: node variants.mjs known.json out
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const [knownFile, outDir] = process.argv.slice(2), known = JSON.parse(readFileSync(knownFile, "utf8"));
const L_SH = 11, R_SH = 12, L_HIP = 23, R_HIP = 24, L_ANK = 27, R_ANK = 28, deg = (r) => (r * 180) / Math.PI;
const wrap = (a) => { while (a > 180) a -= 360; while (a < -180) a += 360; return a; };
const names = ["width 0.2", "width 0.1", "width 0", "depth: shoulders", "depth: hips", "depth: both"], err = names.map(() => []);
console.log("jump  should  air window (frames, s)   " + names.map((n) => n.padStart(16)).join(""));
for (const [name, code, should] of known) {
  const file = readdirSync(outDir).find((f) => f.startsWith(name + "-") && f.endsWith("-VIDEO-0.json")); if (!file) continue;
  const d = JSON.parse(readFileSync(join(outDir, file), "utf8")), aspect = d.h / d.w, rows = [];
  for (const f of d.frames) {
    if (!f.p || !f.w) continue;
    const p = f.p, w = f.w, mid = (a, b, k) => (p[a][k] + p[b][k]) / 2;
    const torso = Math.hypot(mid(L_SH, R_SH, 0) - mid(L_HIP, R_HIP, 0), (mid(L_SH, R_SH, 1) - mid(L_HIP, R_HIP, 1)) * aspect);
    rows.push({ i: f.i, shW: (p[R_SH][0] - p[L_SH][0]) / torso, feetApart: Math.hypot(p[L_ANK][0] - p[R_ANK][0], (p[L_ANK][1] - p[R_ANK][1]) * aspect) / torso,
      legLen: ((Math.max(p[L_ANK][1], p[R_ANK][1]) - mid(L_HIP, R_HIP, 1)) * aspect) / torso,
      sh: deg(Math.atan2(w[R_SH][2] - w[L_SH][2], w[R_SH][0] - w[L_SH][0])), hip: deg(Math.atan2(w[R_HIP][2] - w[L_HIP][2], w[R_HIP][0] - w[L_HIP][0])) });
  }
  const crossings = (thr) => { const c = []; let side = 0, lastK = -1;
    for (let k = 0; k < rows.length; k++) { const s = rows[k].shW > thr ? 1 : rows[k].shW < -thr ? -1 : 0; if (!s) continue;
      if (side && s !== side) for (let j = lastK + 1; j <= k; j++) { const a = rows[j - 1], b = rows[j]; if (a.shW * b.shW <= 0 && a.shW !== b.shW) { c.push(a.i + (a.shW / (a.shW - b.shW)) * (b.i - a.i)); break; } }
      side = s; lastK = k; } return c; };
  const air = rows.filter((r) => r.feetApart < 0.7 && r.legLen > 1.25).map((r) => r.i), runs = [];
  for (const i of air) { const last = runs[runs.length - 1]; if (last && i - last[1] <= 2) last[1] = i; else runs.push([i, i]); }
  const c2 = crossings(0.2); let best = null;
  for (const [a, b] of runs) { const n = c2.filter((c) => c >= a && c <= b).length; if (!best || n > best.n) best = { a, b, n }; }
  if (!best) { console.log(code, "no air window"); continue; }
  const { a, b } = best;
  const byWidth = (thr) => { const c = crossings(thr).filter((x) => x >= a && x <= b); if (c.length < 2) return c.length / 2; const g = c.slice(1).map((x, k) => x - c[k]);
    return (c.length - 1) / 2 + (c[0] - a) / g[0] / 2 + (b - c[c.length - 1]) / g[g.length - 1] / 2; };
  const byDepth = (key) => { const win = rows.filter((r) => r.i >= a && r.i <= b); let pos = 0, neg = 0;
    for (let k = 1; k < win.length; k++) { let s; if (key === "both") { const s1 = wrap(win[k].sh - win[k - 1].sh), s2 = wrap(win[k].hip - win[k - 1].hip); s = Math.abs(s1 - s2) < 60 ? (s1 + s2) / 2 : (Math.abs(s1) < Math.abs(s2) ? s1 : s2); } else s = wrap(win[k][key] - win[k - 1][key]);
      if (s > 0) pos += s; else neg -= s; } return Math.max(pos, neg) / 360 - Math.min(pos, neg) / 360; };
  const got = [byWidth(0.2), byWidth(0.1), byWidth(0), byDepth("sh"), byDepth("hip"), byDepth("both")];
  got.forEach((g, k) => err[k].push(g - should));
  console.log(`${code.padEnd(5)} ${String(should).padStart(5)}   ${String(a).padStart(4)}-${String(b).padEnd(4)} ${((b - a + 1) / d.fps).toFixed(2)} s        ` + got.map((g) => g.toFixed(1).padStart(16)).join(""));
}
console.log("\naverage miss, in turns:               " + err.map((e) => (e.reduce((s, x) => s + Math.abs(x), 0) / e.length).toFixed(2).padStart(16)).join(""));
console.log("within half a turn:                   " + err.map((e) => `${e.filter((x) => Math.abs(x) <= 0.5).length} of ${e.length}`.padStart(16)).join(""));
