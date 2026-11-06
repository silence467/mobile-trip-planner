-- Secure capability-based sharing:
-- a trip can only be read or written when the client presents the matching
-- random trip secret in the x-trip-secret request header.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.trip_state (
  id text primary key check (char_length(id) between 4 and 80),
  secret_hash text not null check (secret_hash ~ '^[0-9a-f]{64}$'),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.trip_state
  add column if not exists secret_hash text;

-- Existing rows created by the old open policy cannot be recovered securely.
-- Give them an unguessable value so they are no longer exposed. Re-upload the
-- itinerary from the app after configuring a new trip secret.
update public.trip_state
set secret_hash = encode(extensions.gen_random_bytes(32), 'hex')
where secret_hash is null;

alter table public.trip_state
  alter column secret_hash set not null;

alter table public.trip_state enable row level security;

create or replace function public.request_trip_secret_hash()
returns text
language sql
stable
as $$
  select case
    when nullif(current_setting('request.headers', true), '') is null then null
    else encode(
      extensions.digest(
        coalesce(
          (current_setting('request.headers', true)::jsonb ->> 'x-trip-secret'),
          ''
        ),
        'sha256'
      ),
      'hex'
    )
  end
$$;

revoke all on function public.request_trip_secret_hash() from public;
grant execute on function public.request_trip_secret_hash() to anon, authenticated;

drop policy if exists "trip_state_demo_read" on public.trip_state;
drop policy if exists "trip_state_demo_insert" on public.trip_state;
drop policy if exists "trip_state_demo_update" on public.trip_state;
drop policy if exists "trip_state_secret_read" on public.trip_state;
drop policy if exists "trip_state_secret_insert" on public.trip_state;
drop policy if exists "trip_state_secret_update" on public.trip_state;

create policy "trip_state_secret_read"
  on public.trip_state
  for select
  using (secret_hash = public.request_trip_secret_hash());

create policy "trip_state_secret_insert"
  on public.trip_state
  for insert
  with check (secret_hash = public.request_trip_secret_hash());

create policy "trip_state_secret_update"
  on public.trip_state
  for update
  using (secret_hash = public.request_trip_secret_hash())
  with check (secret_hash = public.request_trip_secret_hash());
