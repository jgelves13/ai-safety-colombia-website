-- Aplicaciones al espacio presencial de los sprints de Apart en Bogotá.
-- Pegar tal cual en el editor SQL del proyecto de Supabase.

create table if not exists public.sprint_applications (
  id            bigint generated always as identity primary key,
  submitted_at  timestamptz not null default now(),
  sprint        text        not null,
  first_name    text        not null,
  last_name     text        not null,
  email         text        not null,
  location      text        not null,
  linkedin      text        not null,
  scholar       text        not null,
  career        text        not null,
  ai_safety     text        not null,
  reason        text        not null,
  hub_problem   text        not null,
  hub_track     text        not null,
  hub_travel    text        not null,
  hub_access    text,
  hub_extra     text,
  ai_confirmed  boolean     not null default false,
  status        text        not null default 'nueva'
);

-- Por si la tabla ya existía de una edición anterior del formulario.
alter table public.sprint_applications
  add column if not exists ai_safety text;

create index if not exists sprint_applications_sprint_idx
  on public.sprint_applications (sprint, submitted_at desc);

-- La tabla trae datos personales: se cierra a todo el mundo y solo entra la
-- ruta del sitio, que usa la llave de servicio (esa salta el RLS).
alter table public.sprint_applications enable row level security;
