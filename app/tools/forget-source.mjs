// Forgets everything that came from one schedule source and switches it off, in whichever store the settings point at.
// For a rink that withdraws its permission, or if we stop using an API (Google's API terms, section 8b).
//   node tools/forget-source.mjs kent-public
import { createStore } from "../server/store.js";

const id = process.argv[2];
if (!/^[a-z0-9-]{2,40}$/.test(id || "")) {
  console.error("Give a source id, for example: node tools/forget-source.mjs kent-public");
  process.exit(1);
}
const store = createStore();
const n = await store.forgetSource(id);
console.log(`${id}: forgotten (${n} sessions removed) and switched off${store.kind === "file" ? " in the local store (switch it off in data/rinks.json too)" : ""}.`);
