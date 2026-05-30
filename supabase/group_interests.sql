-- Run once in Supabase SQL editor (project: aisc-hackathon).
-- Mirrors hub_applications policy: RLS on, no policies, only service_role writes.

create table if not exists public.group_interests (
  id uuid primary key default gen_random_uuid(),
  submitted_at timestamptz not null default now(),
  locale text not null check (locale in ('es', 'en')),

  first_name text not null,
  last_name text not null,
  email text not null,
  location text not null,
  linkedin text,

  about text not null,
  areas text[] not null,
  extra text
);

create index if not exists group_interests_submitted_at_idx
  on public.group_interests (submitted_at desc);

create index if not exists group_interests_areas_idx
  on public.group_interests using gin (areas);

alter table public.group_interests enable row level security;
-- No policies: only the service_role key (used by the Vercel function) can read/write.
