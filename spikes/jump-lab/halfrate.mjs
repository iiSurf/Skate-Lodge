// A test only. Counts turns on a 60-frame clip twice: with every frame, and with every second frame (as if it had been
// filmed at 30 frames a second), to see what the lower frame rate costs. usage: node halfrate.mjs <out/NAME.json> ...
import { readFileSync } from "node:fs";
const L_SH = 11, R_SH = 12, L_HIP = 23, R_HIP = 24, L_ANK = 27, R_ANK = 28;
for (const file of process.argv.slice(2)) {
  const d = JSON.parse(readFileSync(file, "utf8")), aspect = d.h / d.w;
  const count = (keep) => {
    const rows = [];
    for (const f of d.frames) { if (!f.p || f.i % keep) continue; const p = f.p, mid = (a, b, k) => (p[a][k] + p[b][k]) / 2;
      const torso = Math.hypot(mid(L_SH, R_SH, 0) - mid(L_HIP, R_HIP, 0), (mid(L_SH, R_SH, 1) - mid(L_HIP, R_HIP, 1)) * aspect);
      rows.push({ i: f.i, shW: (p[R_SH][0] - p[L_SH][0]) / torso, feetApart: Math.hypot(p[L_ANK][0] - p[R_ANK][0], (p[L_ANK][1] - p[R_ANK][1]) * aspect) / torso, legLen: ((Math.max(p[L_ANK][1], p[R_ANK][1]) - mid(L_HIP, R_HIP, 1)) * aspect) / torso }); }
    const c = []; let side = 0, lastK = -1;
    for (let k = 0; k < rows.length; k++) { const s = rows[k].shW > 0.2 ? 1 : rows[k].shW < -0.2 ? -1 : 0; if (!s) continue;
      if (side && s !== side) for (let j = lastK + 1; j <= k; j++) { const a = rows[j - 1], b = rows[j]; if (a.shW * b.shW <= 0 && a.shW !== b.shW) { c.push(a.i + (a.shW / (a.shW - b.shW)) * (b.i - a.i)); break; } }
      side = s; lastK = k; }
    const air = rows.filter((r) => r.feetApart < 0.7 && r.legLen > 1.25).map((r) => r.i), runs = [];
    for (const i of air) { const last = runs[runs.length - 1]; if (last && i - last[1] <= 2 * keep) last[1] = i; else runs.push([i, i]); }
    let best = null; for (const [a, b] of runs) { const inAir = c.filter((x) => x >= a && x <= b); if (!best || inAir.length > best.inAir.length) best = { a, b, inAir }; }
    const { a, b, inAir } = best, g = inAir.slice(1).map((x, k) => x - inAir[k]);
    const turns = inAir.length < 2 ? inAir.length / 2 : (inAir.length - 1) / 2 + (inAir[0] - a) / g[0] / 2 + (b - inAir[inAir.length - 1]) / g[g.length - 1] / 2;
    return `${turns.toFixed(1)} turns from ${inAir.length} half turns, air ${((b - a + keep) / d.fps).toFixed(2)} s`;
  };
  console.log(file.split("/").pop().slice(0, 26).padEnd(27), "| every frame:", count(1).padEnd(44), "| every second frame:", count(2));
}
