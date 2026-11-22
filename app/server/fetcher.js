/* The server's only way to fetch something from the internet (SECURITY.md section 5).

   - https only, on its normal port, checked by checkUrl before anything is sent.
   - The name is resolved and every address it resolves to must be public; the connection is made to the address that was
     checked, so a name cannot pass the check and then point somewhere private (DNS rebinding).
   - At most three redirects, each one checked again the same way.
   - A time limit for the whole fetch, a size limit counted as the bytes arrive, and only the content types asked for.
   - No cookies, no sign-in, and a plain client name.

   The network part (transport) is passed in so the tests can check the rules without the internet. */

import https from "node:https";
import { lookup as dnsLookup } from "node:dns";
import { isIP } from "node:net";
import { checkUrl, isPublicAddress } from "./net.js";

export const FETCH_DEFAULTS = {
  timeoutMs: 20000,
  /* Bremerton's whole calendar was 5.6 MB on 2026-11-15, so the limit leaves room for it to grow. */
  maxBytes: 8 * 1024 * 1024,
  maxRedirects: 3,
  accept: ["text/calendar", "text/plain"],
  userAgent: "SkateLodge-schedule-reader/0.1",
};

/* A lookup for node's https that refuses any name resolving to a non-public address. */
export function guardedLookup(hostname, options, callback) {
  dnsLookup(hostname, { all: true }, (err, addresses) => {
    if (err) return callback(err);
    const list = Array.isArray(addresses) ? addresses : [{ address: addresses, family: isIP(addresses) }];
    if (!list.length || list.some((a) => !isPublicAddress(a.address))) {
      const e = new Error("That address points inside a private network.");
      e.code = "EPRIVATE";
      return callback(e);
    }
    if (options && options.all) return callback(null, list);
    callback(null, list[0].address, list[0].family);
  });
}

/* The real network: one GET, no redirect following (safeFetch does that), the body handed over as it arrives. */
export function httpsTransport(url, { headers, signal }) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: "GET", headers, lookup: guardedLookup, signal, agent: false }, (res) => {
      resolve({ status: res.statusCode, headers: res.headers, body: res });
    });
    req.on("error", reject);
    req.end();
  });
}

/* Fetches a checked address and returns { url, status, contentType, text }. Throws an Error with a plain reason otherwise. */
export async function safeFetch(rawUrl, opts = {}) {
  const o = { ...FETCH_DEFAULTS, ...opts };
  const transport = o.transport || httpsTransport;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), o.timeoutMs);
  try {
    let url = checkUrl(rawUrl);
    for (let hop = 0; ; hop++) {
      const res = await transport(url.href, {
        /* Extra headers (an API key) go in headers, never in the address, so they cannot end up in a log. */
        headers: { ...(o.headers || {}), "user-agent": o.userAgent, accept: o.accept.join(", "), "accept-encoding": "identity" },
        signal: controller.signal,
      });
      if (res.status >= 300 && res.status < 400 && res.headers.location) {
        drain(res.body);
        if (hop >= o.maxRedirects) throw new Error(`More than ${o.maxRedirects} redirects.`);
        url = checkUrl(new URL(res.headers.location, url).href);
        continue;
      }
      if (res.status !== 200) {
        drain(res.body);
        throw new Error(`The server answered ${res.status}.`);
      }
      const type = String(res.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
      if (!o.accept.includes(type)) {
        drain(res.body);
        throw new Error(`Not a calendar (the server sent ${type || "no type"}).`);
      }
      const declared = Number(res.headers["content-length"]);
      if (declared > o.maxBytes) {
        drain(res.body);
        throw new Error("The file is too big.");
      }
      const text = await readLimited(res.body, o.maxBytes);
      return { url: url.href, status: 200, contentType: type, cacheControl: String(res.headers["cache-control"] || ""), text };
    }
  } catch (err) {
    if (controller.signal.aborted) throw new Error("The fetch took too long.");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

function drain(body) {
  if (body && typeof body.resume === "function") body.resume();
}

/* Reads a body (an async iterable of chunks) as UTF-8, stopping as soon as it passes the limit. */
async function readLimited(body, maxBytes) {
  const chunks = [];
  let size = 0;
  for await (const chunk of body) {
    const buf = typeof chunk === "string" ? Buffer.from(chunk) : Buffer.from(chunk);
    size += buf.length;
    if (size > maxBytes) {
      if (typeof body.destroy === "function") body.destroy();
      throw new Error("The file is too big.");
    }
    chunks.push(buf);
  }
  return Buffer.concat(chunks).toString("utf8");
}
