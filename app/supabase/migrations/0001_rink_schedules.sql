-- Phase 1: rinks and their public schedules.
-- SECURITY.md section 3: every table has its access rules switched on, starting from "nobody can read or write", and adds only
-- what a feature needs. Here that is: anyone may read rinks, approved sources, sessions and checks (all public information).
-- Nobody may write through the public key. Only the scheduled job writes, with the service key, through replace_source_sessions.

create table public.orgs (
  id text primary key check (id ~ '^[a-z0-9-]{2,40}$'),
  name text not null check (char_length(name) between 1 and 80)
);

create table public.rinks (
  id text primary key check (id ~ '^[a-z0-9-]{2,40}$'),
  org_id text references public.orgs on delete set null,
  name text not null check (char_length(name) between 1 and 80),
  city text check (char_length(city) <= 60),
  address text check (char_length(address) <= 160),
  website text check (website ~ '^https://[^\s]{4,300}$'),
  schedule_page text check (schedule_page ~ '^https://[^\s]{4,300}$'),
  time_zone text not null default 'America/Los_Angeles' check (char_length(time_zone) <= 40),
  color text check (color ~ '^#[0-9a-f]{6}$'),
  note text check (char_length(note) <= 120),
  last_confirmed date
);

create table public.schedule_sources (
  id text primary key check (id ~ '^[a-z0-9-]{2,40}$'),
  rink_id text not null references public.rinks on delete cascade,
  kind text not null check (kind in ('freestyle', 'public', 'stick', 'learn', 'adult', 'other', 'mixed')),
  url text not null check (url ~ '^https://[^\s]{4,500}$'),
  label text check (char_length(label) <= 120),
  approved boolean not null default false,
  -- The day this source's site terms were read (CLAUDE.md). The job fetches nothing until it is set.
  terms_checked date,
  terms_note text check (char_length(terms_note) <= 500)
);

create table public.sessions (
  id bigint generated always as identity primary key,
  source_id text not null references public.schedule_sources on delete cascade,
  rink_id text not null references public.rinks on delete cascade,
  date date not null,
  start_time time not null,
  end_time time not null,
  kind text not null check (kind in ('freestyle', 'public', 'stick', 'learn', 'adult', 'other')),
  title text check (char_length(title) <= 200),
  fetched_at timestamptz not null default now(),
  check (end_time > start_time)
);
create index sessions_by_date on public.sessions (date, start_time);
create index sessions_by_source on public.sessions (source_id, date);

create table public.source_checks (
  source_id text primary key references public.schedule_sources on delete cascade,
  last_tried timestamptz,
  last_ok timestamptz,
  ok boolean,
  sessions_found integer,
  message text check (char_length(message) <= 300)
);

-- Off switches for risky parts (SECURITY.md section 11). Off unless a row says enabled.
create table public.kill_switches (
  name text primary key check (char_length(name) <= 60),
  enabled boolean not null default false,
  note text check (char_length(note) <= 200)
);
insert into public.kill_switches (name, enabled, note) values ('schedule_job', true, 'Reads approved public calendars a few times a day.');

-- When each job last started, so it cannot be run more often than it should.
create table public.job_runs (
  name text primary key check (char_length(name) <= 60),
  last_started timestamptz not null
);

-- Rules: on for every table, then only reading what is public.
alter table public.orgs enable row level security;
alter table public.rinks enable row level security;
alter table public.schedule_sources enable row level security;
alter table public.sessions enable row level security;
alter table public.source_checks enable row level security;
alter table public.kill_switches enable row level security;
alter table public.job_runs enable row level security;

revoke all on public.orgs, public.rinks, public.schedule_sources, public.sessions, public.source_checks, public.kill_switches, public.job_runs from anon, authenticated;
grant select on public.orgs, public.rinks, public.sessions, public.source_checks to anon, authenticated;
grant select (id, rink_id, kind, label, approved) on public.schedule_sources to anon, authenticated;

create policy "anyone reads orgs" on public.orgs for select to anon, authenticated using (true);
create policy "anyone reads rinks" on public.rinks for select to anon, authenticated using (true);
create policy "anyone reads approved sources" on public.schedule_sources for select to anon, authenticated using (approved);
create policy "anyone reads sessions" on public.sessions for select to anon, authenticated using (true);
create policy "anyone reads checks" on public.source_checks for select to anon, authenticated using (true);
-- kill_switches and job_runs: no rules for anon or authenticated, so nobody but the service key can see or change them.

-- Replaces one source's sessions from a day on, in one transaction, so a failed run never leaves the schedule empty.
create function public.replace_source_sessions(p_source text, p_from date, p_rows jsonb)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  n integer;
begin
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 5000 then
    raise exception 'rows must be an array of at most 5000';
  end if;
  delete from public.sessions where source_id = p_source and date >= p_from;
  insert into public.sessions (source_id, rink_id, date, start_time, end_time, kind, title)
  select p_source, r.rink_id, r.date, r.start_time, r.end_time, r.kind, r.title
  from jsonb_to_recordset(p_rows) as r(rink_id text, date date, start_time time, end_time time, kind text, title text)
  where r.date >= p_from;
  get diagnostics n = row_count;
  return n;
end;
$$;
revoke execute on function public.replace_source_sessions(text, date, jsonb) from public, anon, authenticated;
grant execute on function public.replace_source_sessions(text, date, jsonb) to service_role;

-- For the CI check: every table in public that has its rules switched off. It must always return nothing.
create function public.tables_without_rules()
returns table (table_name text)
language sql
security definer
set search_path = ''
as $$
  select c.relname::text
  from pg_catalog.pg_class c
  join pg_catalog.pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind in ('r', 'p') and not c.relrowsecurity
  order by 1;
$$;
revoke execute on function public.tables_without_rules() from public, anon, authenticated;
grant execute on function public.tables_without_rules() to service_role;
