-- Confirmaciones y votación de horarios de quienes quedaron en los seminarios
-- de octubre de 2026. Una fila por persona y seminario: la ruta
-- /api/seminarios/confirmar hace upsert sobre (seminar, email), así que si
-- alguien vuelve a abrir su enlace para cambiar los horarios, la fila se
-- reemplaza.
--
-- Se corre desde el SQL Editor de Supabase. La llave de servicio del sitio no
-- puede correr DDL.

create table if not exists public.seminar_confirmations (
  id bigint generated always as identity primary key,
  confirmed_at timestamptz not null default now(),
  -- 'tecnico' o 'futuro'. Viene firmado en el enlace, no lo escoge la persona.
  seminar text not null,
  name text not null,
  email text not null,
  -- false es quien avisó que no puede: su cupo se libera.
  takes_spot boolean not null,
  -- 'presencial', 'en-linea' o 'cualquiera'. Nula si no toma el cupo.
  modality text,
  -- Los bloques de dos horas que marcó, como 'sab-13:30' (día y hora de inicio,
  -- hora de Bogotá). Con esto y la modalidad se arman las cohortes.
  slots text[] not null default '{}',
  note text
);

create unique index if not exists seminar_confirmations_seminar_email_idx
  on public.seminar_confirmations (seminar, email);

-- Nadie entra sin la llave de servicio, que solo usa la ruta del sitio.
alter table public.seminar_confirmations enable row level security;

-- Para contar votos por horario:
--   select seminar, modality, unnest(slots) as slot, count(*)
--   from public.seminar_confirmations where takes_spot
--   group by 1, 2, 3 order by 1, 4 desc;
