/* Registro de equipos del DefAcc Hackathon y sorteo del orden de los pitches.

   Cada equipo se registra (nombre, integrantes, frente) el sábado entre las
   10:00 y las 11:00 a. m. A las 2:00 p. m. se publica el orden de los pitches, que sale de un
   sorteo: se ordena por una clave HMAC secreta del slug, así nadie lo puede
   predecir ni la hora de registro cambia nada. */

import {
  claveSorteo,
  leerJson,
  listar,
  SLUG_VALIDO,
  type Integrante,
} from "@/lib/defacc-entregas";

export const APERTURA_REGISTRO_ISO = "2026-11-14T10:00:00-05:00";
export const CIERRE_REGISTRO_ISO = "2026-11-14T11:00:00-05:00";
export const PUBLICACION_ORDEN_ISO = "2026-11-14T14:00:00-05:00";

export type Registro = {
  slug: string;
  equipo: string;
  track: string;
  integrantes: Integrante[];
  creada: string;
  /** Registro del modo prueba: no entra al sorteo real. */
  prueba?: boolean;
  /** Slug de un registro anterior con el mismo nombre. Nunca se sobrescribe. */
  duplicadoDe?: string;
};

export function registroAbierto(ahora = Date.now()): boolean {
  return (
    ahora >= new Date(APERTURA_REGISTRO_ISO).getTime() &&
    ahora < new Date(CIERRE_REGISTRO_ISO).getTime()
  );
}

export function registroPorAbrir(ahora = Date.now()): boolean {
  return ahora < new Date(APERTURA_REGISTRO_ISO).getTime();
}

export function ordenPublicado(ahora = Date.now()): boolean {
  return ahora >= new Date(PUBLICACION_ORDEN_ISO).getTime();
}

export async function leerRegistro(slug: string): Promise<Registro | null> {
  if (!SLUG_VALIDO.test(slug)) return null;
  return leerJson<Registro>(`registros/${slug}.json`);
}

export async function todosLosRegistros(): Promise<Registro[]> {
  const nombres = await listar("registros/");
  const slugs = nombres.filter((n) => n.endsWith(".json")).map((n) => n.slice(0, -5));
  const lista = await Promise.all(slugs.map((s) => leerRegistro(s)));
  return lista
    .filter((r): r is Registro => r !== null)
    .sort((a, b) => a.equipo.localeCompare(b.equipo, "es"));
}

/* Orden del sorteo. Sin registros de prueba ni duplicados. */
export function ordenDelSorteo(registros: Registro[]): Registro[] {
  return registros
    .filter((r) => !r.prueba && !r.duplicadoDe)
    .map((r) => ({ r, k: claveSorteo(r.slug) }))
    .sort((a, b) => (a.k < b.k ? -1 : a.k > b.k ? 1 : 0))
    .map((x) => x.r);
}
