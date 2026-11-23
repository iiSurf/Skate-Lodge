// A test reporter for GitHub Actions. Each failing test becomes an error note (an "annotation") on the run, which GitHub shows
// to anyone, even when not signed in, so a failure can be read without opening the log. A last note counts what passed,
// failed and was skipped. Only status codes, true or false, and short text are shown, and anything that looks like a Supabase
// key or an old-style token is replaced with [hidden] before it is printed.
// Used in .github/workflows/ci.yml alongside the usual "spec" reporter:
//   node --test --test-reporter=spec --test-reporter-destination=stdout --test-reporter=./tools/github-reporter.mjs --test-reporter-destination=stdout ...

const hide = (s) =>
  String(s)
    .replace(/sb_(publishable|secret)_[A-Za-z0-9_-]*/g, "[hidden]")
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.?[A-Za-z0-9_-]*/g, "[hidden]");

const show = (v) => {
  if (v === null || v === undefined || typeof v === "number" || typeof v === "boolean") return String(v);
  const s = hide(typeof v === "string" ? v : JSON.stringify(v) ?? "?");
  return s.length > 120 ? s.slice(0, 120) + "…" : s;
};

// GitHub's rules for a note: % and line breaks are escaped in the text, and : and , too in the title.
const text = (s) => String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const title = (s) => text(s).replace(/:/g, "%3A").replace(/,/g, "%2C");

export default async function* github(source) {
  const count = { passed: 0, failed: 0, skipped: 0 };
  for await (const { type, data } of source) {
    if (type !== "test:pass" && type !== "test:fail") continue;
    if (data.details?.type === "suite") continue;
    if (data.skip !== undefined || data.todo !== undefined) {
      count.skipped++;
      continue;
    }
    if (type === "test:pass") {
      count.passed++;
      continue;
    }
    count.failed++;
    const error = data.details?.error;
    const cause = error?.cause ?? error;
    let message = hide(String(cause?.message ?? cause ?? "failed").split("\n")[0]);
    if (cause && typeof cause === "object" && "actual" in cause) message += ` (got ${show(cause.actual)}, expected ${show(cause.expected)})`;
    const file = data.file ? data.file.split("/").pop() + ": " : "";
    yield `::error title=${title(file + data.name)}::${text(message)}\n`;
  }
  yield `::notice title=Tests::${count.passed} passed, ${count.failed} failed, ${count.skipped} skipped\n`;
}
