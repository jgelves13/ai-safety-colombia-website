-- Run once in Supabase SQL editor (project: aisc-hackathon).
-- Acceptance / confirmation form for selected participants. Written to only by
-- the server-side service_role key — RLS stays on with no public policies.
--
-- One row per person. `email` is unique so re-submitting the form updates the
-- existing row (upsert via on_conflict=email) instead of creating duplicates.

create table if not exists public.hub_confirmations (
  id uuid primary key default gen_random_uuid(),
  confirmed_at timestamptz not null default now(),
  locale text not null check (locale in ('es', 'en')),

  first_name text not null,
  last_name text,
  email text not null unique,

  -- Single full-schedule toggle: Friday 19 (4–9 PM opening) + Saturday 20 and
  -- Sunday 21 all day. The hackathon is intensive and teams work together start
  -- to finish, so availability is all-or-nothing, not per-day.
  available boolean not null default false,

  -- Mandatory: confirms they joined the dedicated WhatsApp group (via the link;
  -- we no longer collect a phone number since joining is direct).
  whatsapp_joined boolean not null default false,

  notes text,                              -- optional free text from participant

  -- "Invite a friend" perk: a few hand-picked participants can bring one guest
  -- who gets a guaranteed spot. Captured here; we reach out to the guest manually.
  friend_name text,
  friend_email text,
  friend_whatsapp text,
  friend_linkedin text
);

-- Idempotent: if the table already existed without the friend columns, add them.
alter table public.hub_confirmations add column if not exists friend_name text;
alter table public.hub_confirmations add column if not exists friend_email text;
alter table public.hub_confirmations add column if not exists friend_whatsapp text;
alter table public.hub_confirmations add column if not exists friend_linkedin text;

create index if not exists hub_confirmations_confirmed_at_idx
  on public.hub_confirmations (confirmed_at desc);

alter table public.hub_confirmations enable row level security;
-- No policies: only the service_role key (used by the Vercel function) can read/write.
