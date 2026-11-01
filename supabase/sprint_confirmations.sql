-- Confirmaciones de quienes quedaron seleccionados para el sprint de
-- septiembre de 2026. Una fila por persona: la ruta /api/confirmar hace upsert
-- sobre (sprint, email), así que si alguien abre su enlace dos veces la fila se
-- reemplaza en vez de duplicarse.
--
-- Este archivo se corre desde el Table Editor de Supabase. La llave de servicio
-- del sitio no puede correr DDL.

create table if not exists public.sprint_confirmations (
  id bigint generated always as identity primary key,
  confirmed_at timestamptz not null default now(),
  sprint text not null,
  name text not null,
  email text not null,
  -- Las tres casillas del formulario. available_all_weekend y will_read son
  -- obligatorias en la ruta, así que siempre llegan en true; se guardan de
  -- todos modos para tener el registro de qué fue lo que aceptó cada persona.
  available_all_weekend boolean not null default false,
  -- No bloquea el envío: quien no logre abrir el enlace de WhatsApp desde el
  -- celular igual confirma, y esta columna en false es la lista de a quiénes
  -- hay que insistirles.
  joined_whatsapp boolean not null default false,
  will_read boolean not null default false,
  -- 'bogota', 'necesito' o 'resuelvo'. La aplicación nunca preguntó la ciudad
  -- —location y hub_travel se guardan vacías en sprint_applications— así que
  -- esta columna es el único registro de quién necesita cama.
  lodging text,
  -- Alergias, restricciones de comida y lo que se les haya quedado por fuera.
  note text,
  -- 'enlace' si entró por el enlace firmado del correo de aceptación, con la
  -- identidad verificada; 'abierto' si entró por /sprint/confirmar/abierto y
  -- escribió su nombre y su correo a mano. Las filas 'abierto' hay que
  -- cruzarlas contra la lista de seleccionados antes de darlas por buenas.
  source text,
  -- Lo que pide el registro de Apart y que nosotros no teníamos: el LinkedIn y
  -- el Google Scholar. Solo se preguntan en el formulario abierto; por el
  -- enlace firmado llegan nulas.
  linkedin text,
  scholar text,
  -- Por dónde se enteró del sprint: 'whatsapp', 'correo', 'persona',
  -- 'universidad', 'redes', 'apart' u 'otro', y al lado la precisión que se le
  -- pidió —cuál grupo, de quién el correo—. La aplicación nunca lo preguntó,
  -- así que es la única medición de difusión que hay. Queda nula en quienes
  -- confirmaron antes del 7 de septiembre, cuando se agregó la pregunta.
  heard_about text,
  heard_detail text
);

-- Para tablas que ya existan de una corrida anterior.
alter table public.sprint_confirmations add column if not exists lodging text;
alter table public.sprint_confirmations add column if not exists note text;
alter table public.sprint_confirmations add column if not exists source text;
alter table public.sprint_confirmations add column if not exists linkedin text;
alter table public.sprint_confirmations add column if not exists scholar text;
alter table public.sprint_confirmations add column if not exists heard_about text;
alter table public.sprint_confirmations add column if not exists heard_detail text;
alter table public.sprint_confirmations
  add column if not exists joined_whatsapp boolean not null default false;
alter table public.sprint_confirmations
  add column if not exists will_read boolean not null default false;

-- El upsert de la ruta necesita esta restricción para saber sobre qué resolver
-- el conflicto. Sin ella, PostgREST rechaza el on_conflict. Va sobre las dos
-- columnas tal cual —nada de lower(email)— porque PostgREST solo reconoce un
-- índice cuyas columnas coincidan con las del on_conflict; la ruta baja el
-- correo a minúsculas antes de escribirlo, venga del token o del formulario
-- abierto, para que las dos vías caigan en la misma fila.
create unique index if not exists sprint_confirmations_sprint_email_idx
  on public.sprint_confirmations (sprint, email);

create index if not exists sprint_confirmations_confirmed_at_idx
  on public.sprint_confirmations (confirmed_at desc);

-- La tabla tiene datos personales y notas médicas. Nadie entra sin la llave de
-- servicio, que solo usa la ruta del sitio.
alter table public.sprint_confirmations enable row level security;
