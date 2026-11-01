import { createHmac, timingSafeEqual } from "node:crypto";
import { CURSOS, type CursoId } from "./cursos";

/* Pase tardío al formulario de los seminarios.

   Cuando alguien llega después del cierre y vale la pena recibirlo, el enlace
   `?pase=<token>` le vuelve a abrir el formulario de un seminario hasta una
   hora dada, sin mover el cierre para nadie más. El token lleva el curso y el
   vencimiento (segundos Unix) y va firmado con HMAC-SHA256 y la misma llave de
   lib/firma-seminario.ts, con el prefijo "tarde." para que ningún enlace de
   confirmación sirva acá ni al revés.

   Los enlaces se sacan con scripts/pase-seminario.mjs, que repite la firma a
   propósito porque corre con node suelto. Nada de esto se importa desde el
   cliente: la página lee el pase en el servidor y el formulario solo lo
   devuelve tal como se lo pasaron. */

const SECRETO = process.env.CONFIRM_LINK_SECRET ?? "";
const PREFIJO = "tarde.";

export type Pase = { curso: CursoId; vence: Date };

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function desdeBase64url(texto: string): Buffer {
  const relleno = texto.length % 4 === 0 ? "" : "=".repeat(4 - (texto.length % 4));
  return Buffer.from(texto.replace(/-/g, "+").replace(/_/g, "/") + relleno, "base64");
}

function firma(cuerpo: string): string {
  return base64url(
    createHmac("sha256", SECRETO)
      .update(PREFIJO + cuerpo)
      .digest(),
  );
}

/* null si la firma no cuadra, si el token está roto o si ya venció. */
export function verificarPase(token: unknown): Pase | null {
  if (!SECRETO || typeof token !== "string") return null;
  const partes = token.trim().split(".");
  if (partes.length !== 2) return null;
  const [cuerpo, recibida] = partes;

  const esperada = firma(cuerpo);
  if (esperada.length !== recibida.length) return null;
  if (!timingSafeEqual(Buffer.from(esperada), Buffer.from(recibida))) return null;

  try {
    const datos = JSON.parse(desdeBase64url(cuerpo).toString("utf8")) as { s?: unknown; x?: unknown };
    const curso = (CURSOS as unknown[]).includes(datos.s) ? (datos.s as CursoId) : null;
    if (!curso || typeof datos.x !== "number") return null;
    const vence = new Date(datos.x * 1000);
    if (Date.now() > vence.getTime()) return null;
    return { curso, vence };
  } catch {
    return null;
  }
}
