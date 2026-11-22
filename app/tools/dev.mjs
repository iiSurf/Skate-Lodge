// The local server: serves public/ with the same security headers as vercel.json, and runs the functions in api/.
// It listens on this computer only (127.0.0.1). Without Supabase settings the functions use the local store in .data/.
// Settings can be put in app/.env (ignored by Git); use the TESTING project's values there, never the real one's.
//   node tools/dev.mjs            http://127.0.0.1:8787
//   node tools/dev.mjs 9000       another port
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, createReadStream } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join, normalize, extname, dirname } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pub = join(root, "public");
const port = Number(process.argv[2] || 8787);

const envFile = join(root, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m && !line.trim().startsWith("#")) process.env[m[1]] ??= m[2];
  }
}

const vercel = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
/* The same headers as production, minus the two that only make sense over https. */
const headers = vercel.headers[0].headers
  .filter((h) => h.key !== "Strict-Transport-Security")
  .map((h) => (h.key === "Content-Security-Policy" ? { ...h, value: h.value.replace(/;\s*upgrade-insecure-requests/, "") } : h));

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".txt": "text/plain; charset=utf-8", ".ics": "text/calendar" };

createServer(async (req, res) => {
  for (const h of headers) res.setHeader(h.key, h.value);
  res.setHeader("Cache-Control", "no-store");
  const path = decodeURIComponent(new URL(req.url, "http://local").pathname);
  const api = /^\/api\/([a-z-]+)$/.exec(path);
  if (api) {
    const file = join(root, "api", api[1] + ".js");
    if (!existsSync(file)) return notFound(res);
    try {
      const mod = await import(pathToFileURL(file).href);
      return await mod.default(req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      return res.end("Server error");
    }
  }
  let file = normalize(join(pub, path));
  if (!file.startsWith(pub)) return notFound(res);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  else if (!extname(file) && existsSync(file + ".html")) file += ".html";
  if (!existsSync(file) || !statSync(file).isFile()) return notFound(res);
  res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream");
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`Skate Lodge on http://127.0.0.1:${port} (store: ${process.env.SUPABASE_URL ? "Supabase" : "local file"})`));

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Not found");
}
