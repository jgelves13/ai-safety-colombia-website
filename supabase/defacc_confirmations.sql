-- Confirmaciones de cupo del DefAcc Hackathon (sábado 14 de noviembre de 2026).
-- Cada persona aceptada recibe un enlace firmado a /defacchackathon/confirmar;
-- la ruta /api/defacchackathon/confirmar escribe aquí con la service role.
-- Se corre una vez en el SQL Editor de Supabase.

create table if not exists public.defacc_confirmations (
  id bigint generated always as identity primary key,
  confirmed_at timestamptz not null default now(),
  -- Permite reusar la tabla en otra edición sin mezclar filas.
  event text not null,
  name text not null,
  email text not null,
  -- Casilla obligatoria: asiste el sábado completo.
  attending boolean not null default false,
  -- Unirse al grupo es obligatorio en el correo, pero la casilla no bloquea:
  -- queda en false para poder insistirle a quien no lo marcó.
  joined_whatsapp boolean not null default false,
  -- Tamaño del equipo según la aplicación (0 o 1 = llega sin equipo). Viene
  -- firmado en el enlace, no lo escribe la persona.
  team_size integer,
  -- Solo para equipos de 2 a 4: 'si' o 'no' a sumar a alguien el sábado.
  accepts_more text,
  -- Si acepta aparecer en la lista de participantes de la guía (nombre,
  -- institución e idea). Sin esto no se le muestra a nadie.
  listed boolean not null default false,
  -- Comida, accesibilidad o cualquier otra cosa.
  note text,
  -- 'enlace' por ahora; queda la columna por si se abre un formulario sin firma.
  source text
);

create unique index if not exists defacc_confirmations_event_email
  on public.defacc_confirmations (event, email);

create index if not exists defacc_confirmations_confirmed_at
  on public.defacc_confirmations (confirmed_at desc);

alter table public.defacc_confirmations enable row level security;

-- Para la tabla ya creada antes de agregar la lista de participantes:
alter table public.defacc_confirmations
  add column if not exists listed boolean not null default false;
