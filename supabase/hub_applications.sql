-- Run once in Supabase SQL editor (project: aisc-hackathon).
-- This table is written to only by the server-side service_role key — RLS stays on with no public policies.

create table if not exists public.hub_applications (
  id uuid primary key default gen_random_uuid(),
  submitted_at timestamptz not null default now(),
  locale text not null check (locale in ('es', 'en')),

  first_name text not null,
  last_name text not null,
  email text not null,
  location text not null,
  linkedin text,
  scholar text,

  career_es text not null,
  reason_es text not null,
  hub_problem_es text not null,
  hub_track text not null check (hub_track in ('technical', 'security', 'either')),
  hub_days text not null check (hub_days in ('all', 'some', 'unsure')),
  hub_access_es text,
  hub_extra_es text,

  career_en text,
  reason_en text,
  hub_problem_en text,
  hub_access_en text,
  hub_extra_en text
);

create index if not exists hub_applications_submitted_at_idx
  on public.hub_applications (submitted_at desc);

alter table public.hub_applications enable row level security;
-- No policies: only the service_role key (used by the Vercel function) can read/write.
