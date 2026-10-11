import { createHmac, timingSafeEqual } from "node:crypto";
import type { SeminarioId } from "./seminarios-confirmar";

/* Enlaces firmados para confirmar el cupo en los seminarios. Es el mismo
   esquema de lib/confirmar.ts —nombre y correo dentro del token, firmado con
   HMAC-SHA256 y la misma llave— con dos diferencias: el token lleva también el
   seminario, y la firma va sobre "seminario." + cuerpo. Ese prefijo hace que un
   enlace del sprint no sirva acá ni uno de acá sirva en el sprint.

   Vive aparte de lib/seminarios-confirmar.ts porque ese lo importa el
   navegador, y la llave no puede terminar allá. */

const SECRETO = process.env.CONFIRM_LINK_SECRET ?? "";
const PREFIJO = "seminario.";

export type Seleccionada = {
  nombre: string;
  correo: string;
  seminario: SeminarioId;
};

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

export function firmarSeleccionada(p: Seleccionada): string {
  if (!SECRETO) throw new Error("Falta CONFIRM_LINK_SECRET");
  const cuerpo = base64url(
    Buffer.from(
      JSON.stringify({ n: p.nombre, c: p.correo.toLowerCase(), s: p.seminario }),
      "utf8",
    ),
  );
  return `${cuerpo}.${firma(cuerpo)}`;
}

/* null ante cualquier duda, igual que verificarInvitacion: la página y la ruta
   tratan todos los casos raros como un enlace que no sirve. */
export function verificarSeleccionada(token: string | undefined | null): Seleccionada | null {
  if (!SECRETO || !token) return null;
  const partes = token.split(".");
  if (partes.length !== 2) return null;
  const [cuerpo, recibida] = partes;

  const esperada = firma(cuerpo);
  if (esperada.length !== recibida.length) return null;
  if (!timingSafeEqual(Buffer.from(esperada), Buffer.from(recibida))) return null;

  try {
    const datos = JSON.parse(desdeBase64url(cuerpo).toString("utf8")) as {
      n?: unknown;
      c?: unknown;
      s?: unknown;
    };
    const nombre = typeof datos.n === "string" ? datos.n.trim() : "";
    const correo = typeof datos.c === "string" ? datos.c.trim().toLowerCase() : "";
    const seminario = datos.s === "tecnico" || datos.s === "futuro" ? datos.s : null;
    if (!nombre || !correo.includes("@") || !seminario) return null;
    return { nombre, correo, seminario };
  } catch {
    return null;
  }
}
