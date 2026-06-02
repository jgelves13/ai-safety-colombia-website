-- Run once in Supabase SQL editor (project: aisc-hackathon).
-- Stores partial-form starts (firstName + lastName + email captured at email-blur).
-- Service-role only; RLS on, no public policies.

create table if not exists public.hub_application_drafts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,

  locale text not null check (locale in ('es', 'en')),
  first_name text not null,
  last_name text not null,
  email text not null unique,

  reminder_6h_sent_at timestamptz,
  reminder_48h_sent_at timestamptz,

  user_agent text,
  ip_hash text
);

create index if not exists hub_application_drafts_pending_6h_idx
  on public.hub_application_drafts (created_at)
  where completed_at is null and reminder_6h_sent_at is null;

create index if not exists hub_application_drafts_pending_48h_idx
  on public.hub_application_drafts (reminder_6h_sent_at)
  where completed_at is null and reminder_48h_sent_at is null;

create index if not exists hub_application_drafts_email_idx
  on public.hub_application_drafts (lower(email));

alter table public.hub_application_drafts enable row level security;
