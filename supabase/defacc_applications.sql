-- Aplicaciones al Defensive Acceleration Hackathon (CyberBear Hackathon)
-- Sábado 14 de noviembre de 2026 en la Universidad de los Andes, Bogotá.
-- Organizan: AI Safety Colombia × IEEE Computer Society Uniandes.
--
-- Pegar tal cual en el editor SQL de Supabase (Dashboard -> SQL Editor -> Run).

create table if not exists public.defacc_applications (
  id                      bigint generated always as identity primary key,
  submitted_at            timestamptz not null default now(),

  -- Datos personales y de contacto
  first_name              text not null,
  last_name               text not null,
  email                   text not null,
  whatsapp                text not null,

  -- Identificación para ingreso al campus de la Universidad de los Andes
  document_type           text not null default 'CC', -- CC, CE, Pasaporte, TI
  document_number         text not null,

  -- Perfil académico / profesional
  affiliation             text not null, -- Universidad o empresa
  career_role             text not null, -- Carrera, semestre o cargo
  experience_level        text not null default 'intermedio', -- principiante, intermedio, avanzado
  linkedin                text,
  github_portfolio        text,

  -- Modalidad de participación y equipo (equipos de 2 a 4)
  team_mode               text not null, -- 'equipo' o 'individual'
  team_members            text,          -- Nombres y correos si vienen en equipo

  -- Interés temático
  preferred_track         text not null, -- track1..track5 o 'por_definir'
  project_idea            text,          -- Idea o reto preliminar

  -- Logística de la jornada (almuerzo para 100 personas y aforo en campus)
  dietary_restrictions    text,          -- Vegetariano, vegano, alergias
  availability_confirmed  boolean not null default false, -- Sábado 14 nov 8:00 a.m. a 8:00 p.m.

  -- Autorización y prueba de tratamiento de datos personales (Ley 1581 de 2012)
  consent_at              timestamptz not null default now(),
  policy_version          text not null default '2026-10-09',

  -- Estado de la postulación
  status                  text not null default 'nueva' -- nueva, seleccionada, en_espera, declinada
);

-- Índices para búsqueda y control de duplicados
create index if not exists defacc_applications_email_idx
  on public.defacc_applications (lower(email));

create index if not exists defacc_applications_submitted_idx
  on public.defacc_applications (submitted_at desc);

-- Seguridad: la tabla queda cerrada a lectura pública por RLS
-- y solo accesible mediante el service role key desde el backend de Next.js
alter table public.defacc_applications enable row level security;
