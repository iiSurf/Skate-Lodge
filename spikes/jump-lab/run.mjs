// A test only, not part of the app. Tracks the body in a clip with headless Chrome and saves the points and some pictures.
// usage: node run.mjs <clip file in ../../clips> [from frame] [to frame] [VIDEO|IMAGE] [frames to draw, comma list]
// It serves this repository on this computer only (127.0.0.1), because the page's modules and the clip need a server
// that can send part of a file. Nothing is sent anywhere else.
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { createReadStream, statSync, writeFileSync, mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname, extname, normalize, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const here = dirname(fileURLToPath(import.meta.url)), root = normalize(join(here, "..", ".."));
const [clip, from = "0", to = "100000", mode = "VIDEO", drawList = ""] = process.argv.slice(2);
const TYPES = { ".html": "text/html", ".mjs": "text/javascript", ".js": "text/javascript", ".wasm": "application/wasm", ".task": "application/octet-stream", ".mov": "video/quicktime", ".mp4": "video/mp4", ".json": "application/json" };

const server = createServer((req, res) => {
  const path = normalize(join(root, decodeURIComponent(req.url.split("?")[0])));
  if (!path.startsWith(root)) { res.writeHead(403).end(); return; }
  let size; try { size = statSync(path).size; } catch { res.writeHead(404).end(); return; }
  const type = TYPES[extname(path).toLowerCase()] || "application/octet-stream", range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
  if (range) {
    const start = range[1] ? +range[1] : 0, end = range[2] ? Math.min(+range[2], size - 1) : size - 1;
    res.writeHead(206, { "Content-Type": type, "Accept-Ranges": "bytes", "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    createReadStream(path, { start, end }).pipe(res);
  } else { res.writeHead(200, { "Content-Type": type, "Accept-Ranges": "bytes", "Content-Length": size }); createReadStream(path).pipe(res); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const profile = mkdtempSync(join(tmpdir(), "jumplab-chrome-")), port = 9600 + Math.floor(Math.random() * 300);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
try {
  let targets; for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.find((t) => t.type === "page")) break; } catch {} await sleep(200); }
  ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map(), errors = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
    if (d.method === "Runtime.exceptionThrown") errors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const run = async (expression) => { const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text); return r.result?.result?.value; };
  await send("Page.enable"); await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 405, height: 720, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `${base}/spikes/jump-lab/track.html` });
  for (let i = 0; i < 100 && !(await run("window.READY === true")); i++) await sleep(200);
  if (errors.length) console.log("page errors:", errors);
  const started = Date.now();
  const data = await run(`window.track(${JSON.stringify("/clips/" + clip)}, { from: ${+from}, to: ${+to}, runningMode: ${JSON.stringify(mode)} })`);
  const name = basename(clip, extname(clip)), outDir = join(here, "out"); mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${name}-${mode}-${from}.json`), JSON.stringify(data));
  const found = data.frames.filter((f) => f.p).length;
  console.log(`${clip}: ${data.w}x${data.h}, ${data.total} frames in the clip, tracked ${data.frames.length}, body found in ${found} (${Math.round((100 * found) / data.frames.length)}%), ${data.msPerFrame} ms a frame, ${Math.round((Date.now() - started) / 1000)} s in all`);
  for (const f of drawList.split(",").filter(Boolean)) {
    await run(`window.draw(${+f})`); await sleep(120);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 72 });
    writeFileSync(join(outDir, `${name}-f${f}.jpg`), Buffer.from(shot.result.data, "base64"));
  }
  if (drawList) console.log("drew frames", drawList);
} finally { try { ws?.close(); } catch {} chrome.kill(); server.close(); try { rmSync(profile, { recursive: true, force: true }); } catch {} }
