/* Arma un enlace de aplicación tardía a un seminario, que vence a la hora dada.

   Uso:
     CONFIRM_LINK_SECRET=... node scripts/pase-seminario.mjs <curso> <vence>

   curso es 'agi-strategy' o 'technical-ai-safety'; vence es una fecha ISO con
   zona, por ejemplo 2026-10-13T23:59:59-05:00. La llave tiene que ser la de
   producción en Vercel, no la del .env.local.

   La firma es la de lib/pase-seminario.ts, repetida a propósito porque esto
   corre con node suelto. Si cambia el formato del token, se cambia en los dos
   lados. */

import { createHmac } from "node:crypto";

const SECRETO = process.env.CONFIRM_LINK_SECRET;
if (!SECRETO) {
  console.error("Falta CONFIRM_LINK_SECRET");
  process.exit(1);
}

const [curso, vence] = process.argv.slice(2);
const x = Math.floor(Date.parse(vence ?? "") / 1000);
if (!["agi-strategy", "technical-ai-safety"].includes(curso) || !Number.isFinite(x)) {
  console.error("Uso: node scripts/pase-seminario.mjs <agi-strategy|technical-ai-safety> <fecha ISO>");
  process.exit(1);
}

const BASE = process.env.SITIO ?? "https://aisafetycolombia.org";

const base64url = (buf) =>
  buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const cuerpo = base64url(Buffer.from(JSON.stringify({ s: curso, x }), "utf8"));
const firma = base64url(
  createHmac("sha256", SECRETO)
    .update("tarde." + cuerpo)
    .digest(),
);

console.log(`${BASE}/seminarios/aplicar?curso=${curso}&pase=${cuerpo}.${firma}`);
