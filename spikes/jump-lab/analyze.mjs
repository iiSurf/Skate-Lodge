// A test only, not part of the app. Reads the points saved by run.mjs and prints, frame by frame, the signals a jump
// could be measured from: how far the shoulders have turned, the knee bend, and where the feet and hips are.
// usage: node analyze.mjs <out/NAME.json> [from frame] [to frame] [every nth frame]
import { readFileSync } from "node:fs";
const [file, from = "0", to = "100000", step = "1"] = process.argv.slice(2);
const d = JSON.parse(readFileSync(file, "utf8"));
const L_SH = 11, R_SH = 12, L_HIP = 23, R_HIP = 24, L_KNEE = 25, R_KNEE = 26, L_ANK = 27, R_ANK = 28;
const deg = (r) => (r * 180) / Math.PI;
const angle3 = (a, b, c) => { // the angle at b, in degrees, from three points in metres
  const u = [a[0] - b[0], a[1] - b[1], a[2] - b[2]], v = [c[0] - b[0], c[1] - b[1], c[2] - b[2]];
  const dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2], m = Math.hypot(...u) * Math.hypot(...v);
  return deg(Math.acos(Math.max(-1, Math.min(1, dot / m))));
};
const aspect = d.h / d.w;
let prev = null, turned = 0;
const rows = [];
for (const f of d.frames) {
  if (!f.p || !f.w) { rows.push({ i: f.i, none: true }); continue; }
  const w = f.w, p = f.p;
  // which way the shoulders face, seen from above (metres, x across and z toward the camera)
  const facing = deg(Math.atan2(w[R_SH][2] - w[L_SH][2], w[R_SH][0] - w[L_SH][0]));
  if (prev !== null) { let step = facing - prev; while (step > 180) step -= 360; while (step < -180) step += 360; turned += step; }
  prev = facing;
  const torso = Math.hypot(((p[L_SH][0] + p[R_SH][0]) / 2 - (p[L_HIP][0] + p[R_HIP][0]) / 2), (((p[L_SH][1] + p[R_SH][1]) / 2 - (p[L_HIP][1] + p[R_HIP][1]) / 2)) * aspect);
  rows.push({
    i: f.i, t: f.i / d.fps, facing, turned,
    shW: (p[R_SH][0] - p[L_SH][0]) / torso,   // shoulder width as seen, in torso lengths: swings through zero each half turn
    kneeL: angle3(w[L_HIP], w[L_KNEE], w[L_ANK]), kneeR: angle3(w[R_HIP], w[R_KNEE], w[R_ANK]),
    hipY: (p[L_HIP][1] + p[R_HIP][1]) / 2, ankL: p[L_ANK][1], ankR: p[R_ANK][1],
    feetApart: Math.hypot(p[L_ANK][0] - p[R_ANK][0], (p[L_ANK][1] - p[R_ANK][1]) * aspect) / torso,
    legLen: ((Math.max(p[L_ANK][1], p[R_ANK][1]) - (p[L_HIP][1] + p[R_HIP][1]) / 2) * aspect) / torso, // hips to lowest foot, in torso lengths
    vis: Math.min(p[L_ANK][2], p[R_ANK][2], p[L_SH][2], p[R_SH][2]),
  });
}
console.log(`${file}: ${d.frames.length} frames, body found in ${rows.filter((r) => !r.none).length}`);
console.log("frame  time  facing  turned  shW   kneeL kneeR  hipY  ankL  ankR  feetApart legLen vis");
for (const r of rows) {
  if (r.i < +from || r.i > +to || (r.i - +from) % +step) continue;
  if (r.none) { console.log(String(r.i).padStart(5), " no body"); continue; }
  console.log([String(r.i).padStart(5), r.t.toFixed(2).padStart(5), r.facing.toFixed(0).padStart(6), r.turned.toFixed(0).padStart(7), r.shW.toFixed(2).padStart(6),
    r.kneeL.toFixed(0).padStart(6), r.kneeR.toFixed(0).padStart(5), r.hipY.toFixed(3).padStart(6), r.ankL.toFixed(3).padStart(5), r.ankR.toFixed(3).padStart(5),
    r.feetApart.toFixed(2).padStart(8), r.legLen.toFixed(2).padStart(6), r.vis.toFixed(2).padStart(5)].join(" "));
}

// Half turns: each time the shoulder width, as seen, passes through zero, the skater has turned half way round since the
// last time. To ignore jitter, a pass only counts once the width has gone clearly to the other side (past 0.2 torso lengths).
const ok = rows.filter((r) => !r.none), cross = [];
let side = 0, lastK = -1;
for (let k = 0; k < ok.length; k++) {
  const s = ok[k].shW > 0.2 ? 1 : ok[k].shW < -0.2 ? -1 : 0;
  if (!s) continue;
  if (side && s !== side) { // find where it passed through zero between the last clear frame on the old side and this one
    for (let j = lastK + 1; j <= k; j++) { const a = ok[j - 1], b = ok[j]; if (a.shW * b.shW <= 0 && a.shW !== b.shW) { cross.push(a.i + a.shW / (a.shW - b.shW)); break; } }
  }
  side = s; lastK = k;
}
// feet together and legs long: a rough sign of being in the air
const air = ok.filter((r) => r.feetApart < 0.7 && r.legLen > 1.25).map((r) => r.i);
const runs = []; for (const i of air) { const last = runs[runs.length - 1]; if (last && i - last[1] <= 2) last[1] = i; else runs.push([i, i]); }
const long = runs.filter((r) => r[1] - r[0] >= 20);
console.log("\nhalf turns at frames:", cross.map((c) => c.toFixed(1)).join(", "));
for (const [a, b] of long) {
  const inAir = cross.filter((c) => c >= a && c <= b), gaps = inAir.slice(1).map((c, k) => c - inAir[k]);
  console.log(`\nlikely in the air: frames ${a} to ${b}, ${((b - a + 1) / d.fps).toFixed(2)} s (rough: this is "feet together, legs long", not a true takeoff and landing)`);
  console.log(`  half turns in that time: ${inAir.length}, at ${inAir.map((c) => c.toFixed(1)).join(", ")}`);
  if (inAir.length >= 2) {
    const whole = (inAir.length - 1) / 2, span = (inAir[inAir.length - 1] - inAir[0]) / d.fps;
    console.log(`  between the first and last of them: ${whole} turns in ${span.toFixed(3)} s, so ${(whole / span).toFixed(1)} turns a second on average (${Math.round((whole / span) * 60)} a minute)`);
    console.log(`  frames between half turns: ${gaps.map((g) => g.toFixed(1)).join(", ")}; fastest half turn ${Math.min(...gaps).toFixed(1)} frames = ${(0.5 / (Math.min(...gaps) / d.fps)).toFixed(1)} turns a second`);
    const before = (inAir[0] - a) / (gaps[0] || 6) / 2, after = (b - inAir[inAir.length - 1]) / (gaps[gaps.length - 1] || 6) / 2;
    console.log(`  with the part turns before the first and after the last: about ${(whole + before + after).toFixed(1)} turns in the air`);
  }
}
