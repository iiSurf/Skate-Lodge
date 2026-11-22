/* Which internet addresses the server may visit. SECURITY.md section 5: when the server fetches an address someone gave it,
   it must never be turned into a way to reach machines inside a private network (our host's own metadata service, a router,
   localhost). Every address is checked here, including the address a name actually resolves to. */

import { BlockList, isIP } from "node:net";

const blocked = new BlockList();
/* IPv4 ranges that are not the public internet. */
for (const [net, bits] of [
  ["0.0.0.0", 8], // "this network"
  ["10.0.0.0", 8], // private
  ["100.64.0.0", 10], // carrier-grade NAT
  ["127.0.0.0", 8], // this machine
  ["169.254.0.0", 16], // link-local, including cloud metadata at 169.254.169.254
  ["172.16.0.0", 12], // private
  ["192.0.0.0", 24], // protocol assignments
  ["192.0.2.0", 24], // documentation
  ["192.88.99.0", 24], // old 6to4 relays
  ["192.168.0.0", 16], // private
  ["198.18.0.0", 15], // benchmarking
  ["198.51.100.0", 24], // documentation
  ["203.0.113.0", 24], // documentation
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // reserved, and 255.255.255.255
]) blocked.addSubnet(net, bits, "ipv4");
/* IPv6 ranges inside the global-unicast block that are still not ordinary internet hosts. */
for (const [net, bits] of [
  ["2001::", 32], // Teredo tunnels
  ["2001:db8::", 32], // documentation
  ["2002::", 16], // 6to4, which can hide an IPv4 address
]) blocked.addSubnet(net, bits, "ipv6");

/* The IPv4 address hidden inside an IPv6 one (::ffff:a.b.c.d, or NAT64 64:ff9b::a.b.c.d), if there is one. */
function embeddedIPv4(ip) {
  const m = /^(?:::ffff:|64:ff9b::)((?:\d{1,3}\.){3}\d{1,3})$/i.exec(ip);
  if (m) return m[1];
  const h = /^(?:::ffff:|64:ff9b::)([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i.exec(ip);
  if (h) {
    const a = parseInt(h[1], 16), b = parseInt(h[2], 16);
    return [a >> 8, a & 255, b >> 8, b & 255].join(".");
  }
  return null;
}

/* True only for an ordinary public internet address. */
export function isPublicAddress(ip) {
  const family = isIP(ip);
  if (family === 4) return !blocked.check(ip, "ipv4");
  if (family === 6) {
    const inner = embeddedIPv4(ip);
    if (inner) return isPublicAddress(inner);
    /* Public IPv6 addresses are in 2000::/3 (first group 2000 to 3fff); everything else (::1, fe80::, fc00::, ff00:: ...) is not. */
    const first = ip.toLowerCase().startsWith("::") ? 0 : parseInt(ip.split(":")[0] || "0", 16);
    if (!(first >= 0x2000 && first <= 0x3fff)) return false;
    return !blocked.check(ip, "ipv6");
  }
  return false;
}

/* Checks an address before anything is fetched. Returns the parsed URL, or throws an Error saying why it was refused.
   Only https on its normal port, no user name or password in it, and no name that only means "this machine". A host written
   as an IP address must be public; a host name is checked again on the address it resolves to, when connecting. */
export function checkUrl(raw) {
  let u;
  try {
    u = new URL(String(raw));
  } catch {
    throw new Error("Not a web address.");
  }
  if (u.protocol !== "https:") throw new Error("Only https addresses are fetched.");
  if (u.username || u.password) throw new Error("Addresses with a user name or password are not fetched.");
  if (u.port && u.port !== "443") throw new Error("Only the normal https port is used.");
  const host = u.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (!host || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new Error("That address points inside a private network.");
  }
  if (isIP(host) && !isPublicAddress(host)) throw new Error("That address points inside a private network.");
  if (!isIP(host) && !host.includes(".")) throw new Error("That address points inside a private network.");
  return u;
}
