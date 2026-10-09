-- Aplicaciones a los cursos de BlueDot Impact que corre AI Safety Colombia
-- (AGI Strategy y Technical AI Safety). La llena app/api/cursos/route.ts con la
-- service role key; nadie más escribe ni lee, por eso RLS va prendido y sin
-- políticas.

create table if not exists public.course_applications (
  id bigint generated always as identity primary key,
  submitted_at timestamptz not null default now(),
  round text not null,
  locale text not null,
  course text not null,
  role text not null,
  availability text not null,
  alt_placement boolean not null default false,
  first_name text not null,
  last_name text not null,
  email text not null,
  profile_url text not null,
  other_profile text,
  fields_of_study text not null,
  career_stage text not null,
  career_detail text,
  location text not null,
  hours_ai_safety text,
  q_plan text not null,
  q_engagement text not null,
  q_skills text not null,
  q_achievement text not null,
  q_tradeoff text,
  source text not null,
  nominee text not null,
  mention_name boolean not null,
  feedback text,
  share_data boolean not null,
  status text not null default 'nueva',
  -- Prueba de la autorización (Ley 1581 de 2012): cuándo se marcó la casilla y
  -- qué versión de /privacidad se aceptó.
  consent_at timestamptz,
  policy_version text
);

alter table public.course_applications add column if not exists consent_at timestamptz;
alter table public.course_applications add column if not exists policy_version text;

alter table public.course_applications enable row level security;
