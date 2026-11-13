/* Acceso mínimo al bucket privado de entregas del DefAcc desde node suelto.
   Lo usan defacc-exportar, defacc-subir-revision y defacc-limpiar-prueba.

   Las credenciales salen del entorno o de .env.local. Nunca se imprimen. */

import { existsSync, readFileSync } from "node:fs";

export const BUCKET = "defacc-entregas";
export const CARPETA = ".defacc-revision";

function deEnvLocal(nombre) {
  if (process.env[nombre]) return process.env[nombre];
  if (!existsSync(".env.local")) return "";
  const linea = readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith(`${nombre}=`));
  return linea ? linea.slice(nombre.length + 1).trim().replace(/^"|"$/g, "") : "";
}

export function credenciales() {
  const url = deEnvLocal("SUPABASE_URL");
  const key = deEnvLocal("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    console.error("Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY (entorno o .env.local)");
    process.exit(1);
  }
  return { url, cab: { apikey: key, Authorization: `Bearer ${key}` } };
}

/* Nombres de archivo (sin carpetas) bajo un prefijo como "entregas/". */
export async function listar(prefijo) {
  const { url, cab } = credenciales();
  const r = await fetch(`${url}/storage/v1/object/list/${BUCKET}`, {
    method: "POST",
    headers: { ...cab, "Content-Type": "application/json" },
    body: JSON.stringify({ prefix: prefijo, limit: 1000, offset: 0, sortBy: { column: "name", order: "asc" } }),
  });
  if (!r.ok) throw new Error(`listar ${prefijo}: ${r.status}`);
  const filas = await r.json();
  return filas.filter((f) => f.id !== null && f.name !== ".emptyFolderPlaceholder").map((f) => f.name);
}

/* Subcarpetas bajo un prefijo (en Supabase vienen con id null). */
export async function carpetas(prefijo) {
  const { url, cab } = credenciales();
  const r = await fetch(`${url}/storage/v1/object/list/${BUCKET}`, {
    method: "POST",
    headers: { ...cab, "Content-Type": "application/json" },
    body: JSON.stringify({ prefix: prefijo, limit: 1000, offset: 0, sortBy: { column: "name", order: "asc" } }),
  });
  if (!r.ok) throw new Error(`listar ${prefijo}: ${r.status}`);
  const filas = await r.json();
  return filas.filter((f) => f.id === null).map((f) => f.name);
}

export async function bajar(ruta) {
  const { url, cab } = credenciales();
  const r = await fetch(`${url}/storage/v1/object/${BUCKET}/${ruta}?t=${Date.now()}${Math.random()}`, {
    headers: cab,
    cache: "no-store",
  });
  if (r.status === 404 || r.status === 400) return null;
  if (!r.ok) throw new Error(`bajar ${ruta}: ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

export async function subir(ruta, cuerpo, tipo) {
  const { url, cab } = credenciales();
  const r = await fetch(`${url}/storage/v1/object/${BUCKET}/${ruta}`, {
    method: "POST",
    headers: { ...cab, "Content-Type": tipo, "x-upsert": "true", "Cache-Control": "no-cache" },
    body: cuerpo,
  });
  if (!r.ok) throw new Error(`subir ${ruta}: ${r.status} ${(await r.text()).slice(0, 200)}`);
}

export async function borrar(rutas) {
  if (!rutas.length) return;
  const { url, cab } = credenciales();
  const r = await fetch(`${url}/storage/v1/object/${BUCKET}`, {
    method: "DELETE",
    headers: { ...cab, "Content-Type": "application/json" },
    body: JSON.stringify({ prefixes: rutas }),
  });
  if (!r.ok) throw new Error(`borrar: ${r.status} ${(await r.text()).slice(0, 200)}`);
}
