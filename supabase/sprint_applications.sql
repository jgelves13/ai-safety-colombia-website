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
  reason        text        not null,
  hub_problem   text        not null,
  hub_track     text        not null,
  hub_team      text        not null,
  hub_team_names text,
  hub_travel    text        not null,
  hub_availability text,
  hub_access    text,
  hub_extra     text,
  ai_confirmed  boolean     not null default false,
  status        text        not null default 'nueva'
);

-- Hay dos formularios escribiendo acá. El largo, en /sprint/aplicar, llena
-- todas las columnas. El corto, en /sprint/aplicar/rapido, es el enlace que se
-- le manda a quien llega recomendado y solo pregunta nombre, apellidos, correo,
-- LinkedIn y por qué quiere venir; el resto viaja en blanco, igual que scholar.
-- Las filas del corto se reconocen porque career y hub_problem están vacías.
--
-- Ni location ni hub_travel se preguntan ya en ningún formulario. La ciudad de
-- origen no cambiaba ninguna decisión de selección. Las dos columnas siguen
-- siendo not null y se guardan vacías, para no tocar las filas que ya están.

-- Por si la tabla ya existía de una edición anterior del formulario.
-- hub_availability guarda qué tan seguro está el aspirante de poder estar los
-- tres días. La ruta ya la manda; mientras esta línea no se corra, guarda la
-- aplicación sin esa respuesta y lo deja dicho en el log.
alter table public.sprint_applications
  add column if not exists hub_team text,
  add column if not exists hub_team_names text,
  add column if not exists hub_availability text;

create index if not exists sprint_applications_sprint_idx
  on public.sprint_applications (sprint, submitted_at desc);

-- La tabla trae datos personales: se cierra a todo el mundo y solo entra la
-- ruta del sitio, que usa la llave de servicio (esa salta el RLS).
alter table public.sprint_applications enable row level security;
