import { createHmac, timingSafeEqual } from "node:crypto";

/* Enlaces firmados para confirmar el cupo en el DefAcc Hackathon.

   Mismo esquema que lib/confirmar.ts (el del sprint), con dos diferencias:
   la firma lleva el prefijo "defacc-confirmar." para que un token del sprint
   no sirva acá ni al revés, y el cuerpo trae el tamaño del equipo según la
   aplicación (e), que se guarda con la confirmación sin volver a preguntarlo.

   Vive en lib/ y no en app/defacchackathon/datos.ts porque ese archivo lo
   importa un componente de cliente y la llave no puede llegar al navegador. */

const SECRETO = process.env.CONFIRM_LINK_SECRET ?? "";
const PREFIJO = "defacc-confirmar.";

export type InvitadaDefacc = {
  nombre: string;
  correo: string;
  /* Personas en el equipo según la aplicación. 0 o 1 = llega sin equipo. */
  equipo: number;
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

export function firmarInvitacionDefacc(invitada: InvitadaDefacc): string {
  if (!SECRETO) throw new Error("Falta CONFIRM_LINK_SECRET");
  const cuerpo = base64url(
    Buffer.from(
      JSON.stringify({
        n: invitada.nombre,
        c: invitada.correo.toLowerCase(),
        e: invitada.equipo,
      }),
      "utf8",
    ),
  );
  return `${cuerpo}.${firma(cuerpo)}`;
}

/* Devuelve null ante cualquier duda, para que la página y la ruta traten igual
   un token vacío, cortado, alterado o del sprint. */
export function verificarInvitacionDefacc(
  token: string | undefined | null,
): InvitadaDefacc | null {
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
      e?: unknown;
    };
    const nombre = typeof datos.n === "string" ? datos.n.trim() : "";
    const correo = typeof datos.c === "string" ? datos.c.trim().toLowerCase() : "";
    const equipo =
      typeof datos.e === "number" && Number.isInteger(datos.e) && datos.e >= 0 ? datos.e : 0;
    if (!nombre || !correo.includes("@")) return null;
    return { nombre, correo, equipo };
  } catch {
    return null;
  }
}
