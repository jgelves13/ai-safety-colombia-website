/* Arma el enlace de confirmación de cada persona seleccionada.

   Uso:
     CONFIRM_LINK_SECRET=... node scripts/enlaces-confirmacion.mjs seleccionados.csv

   El CSV es de dos columnas y sin encabezado: nombre,correo. La salida es un
   TSV con nombre, correo y enlace, listo para pegar en la hoja desde donde
   salen los correos.

   La firma es la misma de lib/confirmar.ts. Está repetida acá a propósito: el
   script corre con node suelto y no puede importar TypeScript. Si alguna vez
   cambia el formato del token, hay que cambiarlo en los dos lados. */

import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";

const SECRETO = process.env.CONFIRM_LINK_SECRET;
if (!SECRETO) {
  console.error("Falta CONFIRM_LINK_SECRET");
  process.exit(1);
}

const archivo = process.argv[2];
if (!archivo) {
  console.error("Uso: node scripts/enlaces-confirmacion.mjs <archivo.csv>");
  process.exit(1);
}

const BASE = process.env.SITIO ?? "https://aisafetycolombia.org";

const base64url = (buf) =>
  buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function firmar(nombre, correo) {
  const cuerpo = base64url(
    Buffer.from(JSON.stringify({ n: nombre, c: correo.toLowerCase() }), "utf8"),
  );
  const firma = base64url(createHmac("sha256", SECRETO).update(cuerpo).digest());
  return `${cuerpo}.${firma}`;
}

const lineas = readFileSync(archivo, "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

console.log(["nombre", "correo", "enlace"].join("\t"));
for (const linea of lineas) {
  /* Se parte en la primera coma nada más: hay apellidos compuestos y el correo
     nunca lleva coma. */
  const corte = linea.indexOf(",");
  if (corte < 0) {
    console.error(`Línea sin coma, se salta: ${linea}`);
    continue;
  }
  const nombre = linea.slice(0, corte).trim();
  const correo = linea.slice(corte + 1).trim();
  if (!nombre || !correo.includes("@")) {
    console.error(`Línea incompleta, se salta: ${linea}`);
    continue;
  }
  console.log(
    [nombre, correo, `${BASE}/sprint/confirmar?t=${firmar(nombre, correo)}`].join("\t"),
  );
}
