import test from "node:test";
import assert from "node:assert/strict";
import { createStore, supabaseStore, checkKey } from "../server/store.js";

/* Made-up keys in the new format. */
const PUB = "sb_publishable_made-up-0123456789";
const SEC = "sb_secret_made-up-0123456789";
const ENV = { SUPABASE_URL: "https://example-project.supabase.co", SUPABASE_PUBLISHABLE_KEY: PUB, SUPABASE_SECRET_KEY: SEC };

function withFetch(answer, fn) {
  const calls = [];
  const before = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return { ok: true, status: 200, json: async () => answer };
  };
  return Promise.resolve(fn(calls)).finally(() => (globalThis.fetch = before));
}

test("each key must be the new kind, and the right one for its place", () => {
  assert.equal(checkKey(PUB, "publishable"), PUB);
  assert.equal(checkKey(SEC, "secret"), SEC);
  assert.throws(() => checkKey(SEC, "publishable"), /not a publishable key/);
  assert.throws(() => checkKey(PUB, "secret"), /not a secret key/);
  assert.throws(() => checkKey("eyJhbGciOiJIUzI1NiJ9.legacy.jwt", "publishable"), /not a publishable key/, "the old anon key is refused");
  assert.throws(() => checkKey(undefined, "secret"), /missing/);
});

test("reading uses the publishable key, in the apikey header only", () =>
  withFetch([], async (calls) => {
    await supabaseStore(ENV).rinks();
    assert.equal(calls.length, 1);
    assert.equal(calls[0].init.headers.apikey, PUB);
    assert.equal(calls[0].init.headers.authorization, undefined, "never sent as Authorization: Bearer");
  }));

test("the job's reads and writes use the secret key, in the apikey header only", () =>
  withFetch([], async (calls) => {
    await supabaseStore(ENV).sources();
    assert.equal(calls[0].init.headers.apikey, SEC);
    assert.equal(calls[0].init.headers.authorization, undefined);
  }));

test("a secret key put in the publishable place is refused before anything is sent", () =>
  withFetch([], async (calls) => {
    await assert.rejects(supabaseStore({ ...ENV, SUPABASE_PUBLISHABLE_KEY: SEC }).rinks(), /not a publishable key/);
    assert.equal(calls.length, 0);
  }));

test("on Vercel, a missing database setting is an error, never the local file", () => {
  assert.throws(() => createStore({ VERCEL: "1" }), /No database settings/);
  assert.throws(() => createStore({ VERCEL_ENV: "production" }), /No database settings/);
  assert.equal(createStore({}).kind, "file", "on this computer with no settings, the local file is used");
  assert.equal(createStore({ ...ENV, VERCEL: "1" }).kind, "supabase");
});
