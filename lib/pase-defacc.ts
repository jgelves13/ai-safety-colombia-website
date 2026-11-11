import { createHmac, timingSafeEqual } from "node:crypto";

/* Pase privado a la postulación del DefAcc después del cierre.

   El enlace `?pase=<token>` vuelve a abrir el formulario hasta la hora que
   lleva el token, sin mover el cierre para nadie más. El token lleva solo el
   vencimiento (segundos Unix) y va firmado con HMAC-SHA256 y la llave de
   lib/firma-seminario.ts, con el prefijo "defacc." para que ningún pase de
   seminarios ni enlace de confirmación sirva acá.

   Los enlaces se sacan con scripts/pase-defacc.mjs. Nada de esto se importa
   desde el cliente: la página lee el pase en el servidor y el formulario solo
   lo devuelve tal cual. */

const SECRETO = process.env.CONFIRM_LINK_SECRET ?? "";
const PREFIJO = "defacc.";

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function desdeBase64url(texto: string): Buffer {
  const relleno = texto.length % 4 === 0 ? "" : "=".repeat(4 - (texto.length % 4));
  return Buffer.from(texto.replace(/-/g, "+").replace(/_/g, "/") + relleno, "base64");
}

function firma(cuerpo: string): string {
  return base64url(createHmac("sha256", SECRETO).update(PREFIJO + cuerpo).digest());
}

/* Fecha de vencimiento si el pase es válido y sigue vigente; null si no. */
export function verificarPaseDefacc(token: unknown): Date | null {
  if (!SECRETO || typeof token !== "string") return null;
  const partes = token.trim().split(".");
  if (partes.length !== 2) return null;
  const [cuerpo, recibida] = partes;

  const esperada = firma(cuerpo);
  if (esperada.length !== recibida.length) return null;
  if (!timingSafeEqual(Buffer.from(esperada), Buffer.from(recibida))) return null;

  try {
    const datos = JSON.parse(desdeBase64url(cuerpo).toString("utf8")) as { x?: unknown };
    if (typeof datos.x !== "number") return null;
    const vence = new Date(datos.x * 1000);
    if (Date.now() > vence.getTime()) return null;
    return vence;
  } catch {
    return null;
  }
}
