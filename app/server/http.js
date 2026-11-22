/* Small helpers for the server functions, written for plain Node (req, res) so they run the same on Vercel and locally. */

import { createHash, timingSafeEqual } from "node:crypto";

export function send(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("x-content-type-options", "nosniff");
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

export const query = (req) => new URL(req.url, "http://local").searchParams;

/* True only if the request carries "Authorization: Bearer <secret>" with the right secret. Compared as hashes in constant time,
   so neither the length nor the content leaks through timing. No secret set means nobody gets in. */
export function hasSecret(req, secret) {
  if (!secret || secret.length < 16) return false;
  const m = /^Bearer (.+)$/.exec(String(req.headers.authorization || ""));
  if (!m) return false;
  const a = createHash("sha256").update(m[1]).digest();
  const b = createHash("sha256").update(secret).digest();
  return timingSafeEqual(a, b);
}
