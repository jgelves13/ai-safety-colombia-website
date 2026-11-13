/* Plataforma de entregas del DefAcc Hackathon (14-nov-2026).

   Todo vive en un bucket privado de Supabase Storage, `defacc-entregas`, como
   archivos JSON y PDF. No hay tablas nuevas: el proyecto no tiene migraciones
   y para unas 20 entregas y 5 jurados un archivo por cosa es suficiente.

     entregas/{slug}.json             lo que sube el equipo
     fichas/{slug}.pdf                la ficha técnica
     puntajes/{juezId}/{slug}.json    la calificación de un jurado
     revision-ia/{slug}.json          las banderas de Gemini (no califica)

   Solo el servidor toca el bucket, con la service role key. */

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { TEXTOS_HACKATHON } from "@/app/defacchackathon/datos";

export const BUCKET = "defacc-entregas";

/* Hora límite de las entregas: 14-nov 5:00 p.m. Bogotá. Se aceptan cambios
   hasta 10 minutos después por si el wifi del salón se cae justo al final. */
export const CIERRE_ENTREGAS_ISO = "2026-11-14T17:00:00-05:00";
const GRACIA_MS = 10 * 60 * 1000;
/* Se abre el día del evento a las 7 a.m. */
export const APERTURA_ENTREGAS_ISO = "2026-11-14T07:00:00-05:00";

export function entregasAbiertas(ahora = Date.now()): boolean {
  return (
    ahora >= new Date(APERTURA_ENTREGAS_ISO).getTime() &&
    ahora <= new Date(CIERRE_ENTREGAS_ISO).getTime() + GRACIA_MS
  );
}

export const TRACKS_VALIDOS = [
  "track-1",
  "track-2",
  "track-3",
  "track-4",
  "track-5",
  "track-6",
] as const;

export const PDF_MAX_BYTES = 10 * 1024 * 1024;

export type Integrante = { nombre: string; correo: string };

export type Entrega = {
  slug: string;
  equipo: string;
  titulo: string;
  track: string;
  resumen: string;
  enlace: string;
  integrantes: Integrante[];
  pdf: { ruta: string; bytes: number } | null;
  /** Solo en entregas hechas antes de quitar el código de edición. */
  codigoHash?: string;
  creada: string;
  actualizada: string;
  version: number;
  /** Entrega del modo prueba: no la ven los jurados reales ni el ranking normal. */
  prueba?: boolean;
};

export type Puntaje = {
  impacto: number | null;
  ejecucion: number | null;
  presentacion: number | null;
  comentario: string;
  abstiene: boolean;
  noElegible: boolean;
  actualizado: string;
};

export type RevisionIA = {
  fueraDeTema: boolean;
  motivoFueraDeTema: string;
  inyeccionPrompt: boolean;
  evidenciaInyeccion: string;
  infoPeligrosa?: boolean;
  evidenciaInfoPeligrosa?: string;
  hallazgosRegex: string[];
  resumen: string;
  modelo: string;
  fecha: string;
  error?: string;
};

/* ---------- configuración ---------- */

function config(): { url: string; key: string } {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  return { url, key };
}

function cabeceras(key: string, extra: Record<string, string> = {}): Record<string, string> {
  return { apikey: key, Authorization: `Bearer ${key}`, ...extra };
}

function secreto(): string {
  const s = process.env.CONFIRM_LINK_SECRET;
  if (!s) throw new Error("Falta CONFIRM_LINK_SECRET");
  return s;
}

/* ---------- Storage ---------- */

let bucketListo = false;

/* Crea el bucket si no existe. Es idempotente: si ya está, Supabase responde
   409 o 400 con "already exists" y seguimos. */
export async function asegurarBucket(): Promise<void> {
  if (bucketListo) return;
  const { url, key } = config();
  const r = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: cabeceras(key, { "Content-Type": "application/json" }),
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: false, file_size_limit: PDF_MAX_BYTES }),
    cache: "no-store",
  });
  if (r.ok || r.status === 409) {
    bucketListo = true;
    return;
  }
  const t = await r.text();
  if (/already exists|Duplicate/i.test(t)) {
    bucketListo = true;
    return;
  }
  throw new Error(`No se pudo crear el bucket: ${r.status} ${t.slice(0, 200)}`);
}

export async function subir(ruta: string, cuerpo: BodyInit, tipo: string): Promise<void> {
  await asegurarBucket();
  const { url, key } = config();
  const r = await fetch(`${url}/storage/v1/object/${BUCKET}/${ruta}`, {
    method: "POST",
    headers: cabeceras(key, { "Content-Type": tipo, "x-upsert": "true", "cache-control": "no-cache" }),
    body: cuerpo,
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Storage rechazó ${ruta}: ${r.status} ${(await r.text()).slice(0, 200)}`);
}

export async function subirJson(ruta: string, datos: unknown): Promise<void> {
  await subir(ruta, JSON.stringify(datos, null, 2), "application/json");
}

export async function leerBytes(ruta: string): Promise<ArrayBuffer | null> {
  const { url, key } = config();
  /* El CDN de Supabase sirve versiones viejas tras sobrescribir un objeto aunque se pida no-cache;
     un parámetro único en la URL obliga a leer la versión actual. */
  const fresco = `t=${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
  const r = await fetch(`${url}/storage/v1/object/${BUCKET}/${ruta}?${fresco}`, {
    headers: cabeceras(key),
    cache: "no-store",
  });
  if (r.status === 404 || r.status === 400) return null;
  if (!r.ok) throw new Error(`Storage no entregó ${ruta}: ${r.status}`);
  return r.arrayBuffer();
}

export async function leerJson<T>(ruta: string): Promise<T | null> {
  const b = await leerBytes(ruta);
  if (!b) return null;
  try {
    return JSON.parse(new TextDecoder().decode(b)) as T;
  } catch {
    return null;
  }
}

/* Lista los nombres (sin el prefijo) dentro de una carpeta. */
export async function listar(prefijo: string): Promise<string[]> {
  const { url, key } = config();
  const r = await fetch(`${url}/storage/v1/object/list/${BUCKET}`, {
    method: "POST",
    headers: cabeceras(key, { "Content-Type": "application/json" }),
    body: JSON.stringify({ prefix: prefijo, limit: 1000, offset: 0, sortBy: { column: "name", order: "asc" } }),
    cache: "no-store",
  });
  if (!r.ok) {
    if (r.status === 400 || r.status === 404) return [];
    throw new Error(`Storage no listó ${prefijo}: ${r.status}`);
  }
  const filas = (await r.json()) as { name: string; id: string | null }[];
  return filas.filter((f) => f.id !== null && f.name !== ".emptyFolderPlaceholder").map((f) => f.name);
}

export async function urlFirmada(ruta: string, segundos = 3600): Promise<string | null> {
  const { url, key } = config();
  const r = await fetch(`${url}/storage/v1/object/sign/${BUCKET}/${ruta}`, {
    method: "POST",
    headers: cabeceras(key, { "Content-Type": "application/json" }),
    body: JSON.stringify({ expiresIn: segundos }),
    cache: "no-store",
  });
  if (!r.ok) return null;
  const j = (await r.json()) as { signedURL?: string };
  return j.signedURL ? `${url}/storage/v1${j.signedURL}` : null;
}

/* ---------- entregas ---------- */

export function slugDe(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export const SLUG_VALIDO = /^[a-z0-9][a-z0-9-]{0,59}$/;

export async function leerEntrega(slug: string): Promise<Entrega | null> {
  if (!SLUG_VALIDO.test(slug)) return null;
  return leerJson<Entrega>(`entregas/${slug}.json`);
}

export async function todasLasEntregas(): Promise<Entrega[]> {
  const nombres = await listar("entregas/");
  const slugs = nombres.filter((n) => n.endsWith(".json")).map((n) => n.slice(0, -5));
  const lista = await Promise.all(slugs.map((s) => leerEntrega(s)));
  return lista
    .filter((e): e is Entrega => e !== null)
    .sort((a, b) => a.equipo.localeCompare(b.equipo, "es"));
}

export function iguales(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

/* ---------- jurados ---------- */

export type Juez = { id: string; nombre: string; afiliacion: string };

export function jueces(): Juez[] {
  return TEXTOS_HACKATHON.es.reglas.jurados.map((j) => ({
    id: slugDe(j.nombre),
    nombre: j.nombre,
    afiliacion: j.afiliacion,
  }));
}

function firma(texto: string, largo = 24): string {
  return createHmac("sha256", secreto()).update(texto).digest("base64url").slice(0, largo);
}

export function tokenJuez(id: string): string {
  return `${id}.${firma(`jurado:${id}`)}`;
}

export function juezDelToken(token: string): Juez | null {
  const i = token.lastIndexOf(".");
  if (i <= 0) return null;
  const id = token.slice(0, i);
  const f = token.slice(i + 1);
  const juez = [...jueces(), JUEZ_PRUEBA].find((j) => j.id === id);
  if (!juez) return null;
  return iguales(f, firma(`jurado:${id}`)) ? juez : null;
}

/* ---------- modo prueba ----------
   Un token firmado abre el formulario fuera de la ventana y marca la entrega
   como prueba (slug "prueba-…", sin correos). Solo el jurado de prueba la ve
   y solo aparece en /defacchackathon/resultados?prueba=1. */

export const JUEZ_PRUEBA: Juez = {
  id: "prueba",
  nombre: "Jurado de prueba",
  afiliacion: "AI Safety Colombia",
};

export function tokenPrueba(): string {
  return firma("defacc-prueba");
}

export function esTokenPrueba(t: string | undefined | null): boolean {
  return !!t && iguales(t, tokenPrueba());
}

export async function leerPuntaje(juezId: string, slug: string): Promise<Puntaje | null> {
  return leerJson<Puntaje>(`puntajes/${juezId}/${slug}.json`);
}

export async function puntajesDelJuez(juezId: string): Promise<Record<string, Puntaje>> {
  const nombres = (await listar(`puntajes/${juezId}/`)).filter((n) => n.endsWith(".json"));
  const pares = await Promise.all(
    nombres.map(async (n) => [n.slice(0, -5), await leerPuntaje(juezId, n.slice(0, -5))] as const),
  );
  const out: Record<string, Puntaje> = {};
  for (const [s, p] of pares) if (p) out[s] = p;
  return out;
}

/* ---------- administración ---------- */

export const COOKIE_ADMIN = "defacc_admin";

export function valorCookieAdmin(): string {
  return firma("admin:resultados", 32);
}

export function claveAdminValida(clave: string): boolean {
  const esperada = process.env.ADMIN_EXPORT_TOKEN;
  if (!esperada || !clave) return false;
  const a = createHash("sha256").update(clave).digest("hex");
  const b = createHash("sha256").update(esperada).digest("hex");
  return iguales(a, b);
}

export function cookieAdminValida(valor: string | undefined): boolean {
  return !!valor && iguales(valor, valorCookieAdmin());
}

/* ---------- utilidades de petición ---------- */

const VENTANA_MS = 10 * 60 * 1000;
const visitas = new Map<string, number[]>();

export function pasaElLimite(ip: string, tope = 8): boolean {
  const ahora = Date.now();
  const previas = (visitas.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (previas.length >= tope) {
    visitas.set(ip, previas);
    return false;
  }
  previas.push(ahora);
  visitas.set(ip, previas);
  if (visitas.size > 5000) visitas.clear();
  return true;
}

export function ipDeLaPeticion(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}
