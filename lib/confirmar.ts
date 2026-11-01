import { createHmac, timingSafeEqual } from "node:crypto";

/* Enlaces firmados para la confirmación de quienes quedaron seleccionados.

   Cada persona recibe en el correo de aceptación un enlace propio con su nombre
   y su correo dentro. El token va firmado con HMAC-SHA256 para que nadie pueda
   fabricarse uno ni confirmar por otra persona cambiando el correo en la URL.
   No es un sistema de sesión: es un enlace de un solo uso lógico que caduca
   cuando pasa la fecha de cierre.

   Este módulo vive aparte de app/sprint/datos.ts por la misma razón que
   lib/pase.ts: datos.ts lo importa un componente de cliente, y la llave no
   puede terminar en el navegador. */

const SECRETO = process.env.CONFIRM_LINK_SECRET ?? "";

export type Invitada = {
  nombre: string;
  correo: string;
};

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function desdeBase64url(texto: string): Buffer {
  const relleno = texto.length % 4 === 0 ? "" : "=".repeat(4 - (texto.length % 4));
  return Buffer.from(texto.replace(/-/g, "+").replace(/_/g, "/") + relleno, "base64");
}

function firma(cuerpo: string): string {
  return base64url(createHmac("sha256", SECRETO).update(cuerpo).digest());
}

/* Genera el token que va en el enlace del correo. Lo usa el script que arma los
   correos, nunca el navegador. */
export function firmarInvitacion(invitada: Invitada): string {
  if (!SECRETO) throw new Error("Falta CONFIRM_LINK_SECRET");
  const cuerpo = base64url(
    Buffer.from(JSON.stringify({ n: invitada.nombre, c: invitada.correo.toLowerCase() }), "utf8"),
  );
  return `${cuerpo}.${firma(cuerpo)}`;
}

/* Verifica el token y devuelve a quién pertenece. Devuelve null ante cualquier
   duda —token vacío, mal formado, firma que no cuadra, JSON roto— para que la
   página y la ruta traten todos esos casos igual: enlace inválido. */
export function verificarInvitacion(token: string | undefined | null): Invitada | null {
  if (!SECRETO || !token) return null;
  const partes = token.split(".");
  if (partes.length !== 2) return null;
  const [cuerpo, recibida] = partes;

  /* timingSafeEqual exige que los dos búferes midan lo mismo, así que la
     comparación de longitudes va antes y por fuera. */
  const esperada = firma(cuerpo);
  if (esperada.length !== recibida.length) return null;
  if (!timingSafeEqual(Buffer.from(esperada), Buffer.from(recibida))) return null;

  try {
    const datos = JSON.parse(desdeBase64url(cuerpo).toString("utf8")) as {
      n?: unknown;
      c?: unknown;
    };
    const nombre = typeof datos.n === "string" ? datos.n.trim() : "";
    const correo = typeof datos.c === "string" ? datos.c.trim().toLowerCase() : "";
    if (!nombre || !correo.includes("@")) return null;
    return { nombre, correo };
  } catch {
    return null;
  }
}
