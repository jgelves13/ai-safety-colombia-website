/* Arma el enlace de confirmación de cada persona seleccionada en los seminarios.

   Uso:
     CONFIRM_LINK_SECRET=... node scripts/enlaces-seminarios.mjs seleccionados.csv

   El CSV va sin encabezado, con tres columnas: nombre,correo,seminario, donde
   seminario es 'tecnico' o 'futuro'. Quien vive fuera de Bogotá lleva una
   cuarta, 'remoto', y su enlace le pregunta si prefiere la cohorte en línea.
   La salida es un TSV con nombre, correo, seminario, remoto y enlace.

   La firma es la de lib/firma-seminario.ts, repetida a propósito porque esto
   corre con node suelto. Si cambia el formato del token, se cambia en los dos
   lados. */

import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";

const SECRETO = process.env.CONFIRM_LINK_SECRET;
if (!SECRETO) {
  console.error("Falta CONFIRM_LINK_SECRET");
  process.exit(1);
}

const archivo = process.argv[2];
if (!archivo) {
  console.error("Uso: node scripts/enlaces-seminarios.mjs <archivo.csv>");
  process.exit(1);
}

const BASE = process.env.SITIO ?? "https://aisafetycolombia.org";

const base64url = (buf) =>
  buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function firmar(nombre, correo, seminario, remoto) {
  const cuerpo = base64url(
    Buffer.from(
      JSON.stringify({
        n: nombre,
        c: correo.toLowerCase(),
        s: seminario,
        ...(remoto ? { v: 1 } : {}),
      }),
      "utf8",
    ),
  );
  const firma = base64url(
    createHmac("sha256", SECRETO)
      .update("seminario." + cuerpo)
      .digest(),
  );
  return `${cuerpo}.${firma}`;
}

const lineas = readFileSync(archivo, "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

console.log(["nombre", "correo", "seminario", "remoto", "enlace"].join("\t"));
for (const linea of lineas) {
  /* El seminario y el correo van al final y nunca llevan coma; el nombre sí
     puede, así que se parte desde la derecha. */
  const partes = linea.split(",");
  const remoto = partes.at(-1)?.trim() === "remoto";
  if (remoto) partes.pop();
  const seminario = (partes.pop() ?? "").trim();
  const correo = (partes.pop() ?? "").trim();
  const nombre = partes.join(",").trim();
  if (!nombre || !correo.includes("@") || !["tecnico", "futuro"].includes(seminario)) {
    console.error(`Línea incompleta, se salta: ${linea}`);
    continue;
  }
  console.log(
    [
      nombre,
      correo,
      seminario,
      remoto ? "sí" : "",
      `${BASE}/seminarios/confirmar?t=${firmar(nombre, correo, seminario, remoto)}`,
    ].join("\t"),
  );
}
