/* Arma un enlace privado de postulación al DefAcc que vence a la hora dada.

   Uso:
     CONFIRM_LINK_SECRET=... node scripts/pase-defacc.mjs <vence>

   vence es una fecha ISO con zona, por ejemplo 2026-11-11T23:59:59-05:00. La
   llave tiene que ser la de producción en Vercel.

   La firma es la de lib/pase-defacc.ts, repetida a propósito porque esto corre
   con node suelto. Si cambia el formato, se cambia en los dos lados. */

import { createHmac } from "node:crypto";

const SECRETO = process.env.CONFIRM_LINK_SECRET;
if (!SECRETO) {
  console.error("Falta CONFIRM_LINK_SECRET");
  process.exit(1);
}

const x = Math.floor(Date.parse(process.argv[2] ?? "") / 1000);
if (!Number.isFinite(x)) {
  console.error("Uso: node scripts/pase-defacc.mjs <fecha ISO>");
  process.exit(1);
}

const BASE = process.env.SITIO ?? "https://aisafetycolombia.org";

const base64url = (buf) =>
  buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const cuerpo = base64url(Buffer.from(JSON.stringify({ x }), "utf8"));
const firma = base64url(createHmac("sha256", SECRETO).update("defacc." + cuerpo).digest());

console.log(`${BASE}/defacchackathon/aplicar?pase=${cuerpo}.${firma}`);
