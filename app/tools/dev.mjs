// The local server: serves public/ with the same security headers as vercel.json, and runs the functions in api/.
// It listens on this computer only (127.0.0.1). Without Supabase settings the functions use the local store in .data/.
// Settings (keys, secrets) come only from Doppler, never from a file: `doppler run --config dev -- node tools/dev.mjs`.
// The dev config holds the TESTING project's values, never the real one's, and this server refuses the production config.
//   node tools/dev.mjs                                   no settings: made-up data from the local store
//   doppler run --config dev -- node tools/dev.mjs       the testing project, http://127.0.0.1:8787
//   node tools/dev.mjs 9000                              another port
import { createServer } from "node:http";
import { readFileSync, readdirSync, existsSync, statSync, createReadStream } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join, normalize, extname, dirname } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pub = join(root, "public");
const port = Number(process.argv[2] || 8787);

/* No settings files (the owner's rule, 2026-11-22): secrets come from Doppler. A stray .env file is refused rather than read,
   so a key never sits in a file next to the code. The production config is refused too: this server is for testing.
   DOPPLER_CONFIG and DOPPLER_ENVIRONMENT are the names Doppler gives its own settings (from memory; checked on first run). */
const stray = readdirSync(root).filter((f) => /^\.env/.test(f));
if (stray.length) {
  console.error(`Remove ${stray.join(", ")} from app/: settings come from Doppler (doppler run --config dev -- node tools/dev.mjs).`);
  process.exit(1);
}
if (/^prd/.test(process.env.DOPPLER_CONFIG || "") || process.env.DOPPLER_ENVIRONMENT === "prd") {
  console.error("This is the production config. The local server only runs with the dev config (the testing project).");
  process.exit(1);
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
