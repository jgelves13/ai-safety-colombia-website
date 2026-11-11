/* Arma el enlace de confirmación de cada persona aceptada al DefAcc Hackathon.

   Uso:
     node scripts/enlaces-defacc.mjs aceptadas.csv salida.tsv

   El CSV no lleva encabezado: nombre,correo,equipo. "equipo" es el número de
   personas del equipo según la aplicación (0 si llega sin equipo). La salida es
   un TSV con nombre, correo, equipo y enlace. Se escribe a archivo y no a la
   consola para que los correos no queden en ningún registro.

   El secreto sale de CONFIRM_LINK_SECRET o, si no está, de .env.local.

   La firma es la misma de lib/defacc-confirmar.ts. Está repetida acá a
   propósito: el script corre con node suelto y no puede importar TypeScript.
   Si cambia el formato del token, hay que cambiarlo en los dos lados. */

import { createHmac } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

function secreto() {
  if (process.env.CONFIRM_LINK_SECRET) return process.env.CONFIRM_LINK_SECRET;
  if (!existsSync(".env.local")) return "";
  const linea = readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("CONFIRM_LINK_SECRET="));
  return linea ? linea.slice("CONFIRM_LINK_SECRET=".length).trim().replace(/^"|"$/g, "") : "";
}

const SECRETO = secreto();
if (!SECRETO) {
  console.error("Falta CONFIRM_LINK_SECRET");
  process.exit(1);
}

const [archivo, salida] = process.argv.slice(2);
if (!archivo || !salida) {
  console.error("Uso: node scripts/enlaces-defacc.mjs <aceptadas.csv> <salida.tsv>");
  process.exit(1);
}

const BASE = process.env.SITIO ?? "https://aisafetycolombia.org";
const PREFIJO = "defacc-confirmar.";

const base64url = (buf) =>
  buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function firmar(nombre, correo, equipo) {
  const cuerpo = base64url(
    Buffer.from(JSON.stringify({ n: nombre, c: correo.toLowerCase(), e: equipo }), "utf8"),
  );
  const firma = base64url(createHmac("sha256", SECRETO).update(PREFIJO + cuerpo).digest());
  return `${cuerpo}.${firma}`;
}

const filas = [["nombre", "correo", "equipo", "enlace"].join("\t")];
let saltadas = 0;

for (const linea of readFileSync(archivo, "utf8").split(/\r?\n/)) {
  if (!linea.trim()) continue;
  /* Primera coma para el nombre (hay apellidos compuestos) y última para el
     equipo. El correo nunca lleva coma. */
  const primera = linea.indexOf(",");
  const ultima = linea.lastIndexOf(",");
  if (primera < 0 || ultima === primera) {
    saltadas += 1;
    continue;
  }
  const nombre = linea.slice(0, primera).trim();
  const correo = linea.slice(primera + 1, ultima).trim();
  const equipo = Number.parseInt(linea.slice(ultima + 1).trim(), 10);
  if (!nombre || !correo.includes("@") || !Number.isInteger(equipo) || equipo < 0) {
    saltadas += 1;
    continue;
  }
  filas.push(
    [nombre, correo, equipo, `${BASE}/defacchackathon/confirmar?t=${firmar(nombre, correo, equipo)}`].join(
      "\t",
    ),
  );
}

writeFileSync(salida, filas.join("\n") + "\n", "utf8");
console.log(`${filas.length - 1} enlaces en ${salida}. Saltadas: ${saltadas}.`);
