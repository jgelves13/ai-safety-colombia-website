import { NextResponse } from "next/server";
import { verificarInvitacionDefacc } from "@/lib/defacc-confirmar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORREO_CONTACTO = "equipo@aisafetycolombia.org";
const REMITENTE = "AI Safety Colombia <equipo@aisafetycolombia.org>";
const TABLA = "defacc_confirmations";
const EVENTO = "defacc-2026";
const GRUPO_WHATSAPP = "https://chat.whatsapp.com/KQdBJaT1SHOLp2t64fe8Yw";

/* Mismo límite que la confirmación del sprint: mucha gente confirma desde la
   misma red universitaria y la identidad ya viene firmada en el token. */
const VENTANA_MS = 10 * 60 * 1000;
const TOPE = 60;
const visitas = new Map<string, number[]>();

function pasaElLimite(ip: string): boolean {
  const ahora = Date.now();
  const previas = (visitas.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (previas.length >= TOPE) {
    visitas.set(ip, previas);
    return false;
  }
  previas.push(ahora);
  visitas.set(ip, previas);
  if (visitas.size > 5000) visitas.clear();
  return true;
}

function ipDeLaPeticion(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}

function texto(valor: unknown, tope: number): string {
  return typeof valor === "string" ? valor.trim().slice(0, tope) : "";
}

/** Las opciones de "¿Dónde te enteraste?" del formulario. */
const ENTERADO_IDS = ["whatsapp", "correo", "persona", "universidad", "ieee", "redes", "otro"];

type Confirmacion = {
  nombre: string;
  correo: string;
  equipo: number;
  asiste: boolean;
  grupo: boolean;
  /* Si acepta aparecer en la lista de participantes de la guía. */
  enLista: boolean;
  enterado: string;
  enteradoDetalle: string;
  nota: string;
};

async function guardar(c: Confirmacion): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("[defacc-confirmar] faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
    return false;
  }

  const fila = {
    confirmed_at: new Date().toISOString(),
    event: EVENTO,
    name: c.nombre,
    email: c.correo,
    attending: c.asiste,
    joined_whatsapp: c.grupo,
    team_size: c.equipo,
    listed: c.enLista,
    note: c.nota || null,
    heard_about: c.enterado || null,
    heard_detail: c.enteradoDetalle || null,
    source: "enlace",
  };

  /* Upsert por (event, email): abrir el enlace dos veces reemplaza la fila. */
  const enviar = (cuerpo: object) =>
    fetch(`${url}/rest/v1/${TABLA}?on_conflict=event,email`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal,resolution=merge-duplicates",
      },
      body: JSON.stringify(cuerpo),
    });

  /* Si a la tabla le falta alguna columna secundaria, la confirmación se guarda
     sin ese dato antes que devolverle un 502 a quien ya cumplió su parte. */
  const APLAZABLES = [
    "listed",
    "note",
    "source",
    "team_size",
    "joined_whatsapp",
    "heard_about",
    "heard_detail",
  ];

  try {
    const cuerpo: Record<string, unknown> = { ...fila };
    const quitadas: string[] = [];

    for (let intento = 0; intento <= APLAZABLES.length; intento += 1) {
      const r = await enviar(cuerpo);
      if (r.ok) {
        if (quitadas.length > 0) {
          console.error(
            `[defacc-confirmar] faltan columnas en la tabla (${quitadas.join(", ")}); se guardó sin ellas.`,
          );
          await correoInterno(
            `Confirmación guardada sin ${quitadas.join(", ")}`,
            resumen(c, `${c.nombre} <${c.correo}> confirmó, pero la tabla no tiene: ${quitadas.join(", ")}.`),
          );
        }
        return true;
      }

      const motivo = await r.text();
      const falta = APLAZABLES.find((col) => col in cuerpo && motivo.includes(col));
      if (!falta) {
        console.error("[defacc-confirmar] Supabase respondió", r.status, motivo);
        return false;
      }
      delete cuerpo[falta];
      quitadas.push(falta);
    }

    return false;
  } catch (e) {
    console.error("[defacc-confirmar] falló el insert", e);
    return false;
  }
}

function resumen(c: Confirmacion, encabezado: string): string {
  return [
    encabezado,
    "",
    `Asiste el sábado completo: ${c.asiste ? "sí" : "no"}`,
    `Entró al grupo: ${c.grupo ? "sí" : "no"}`,
    `Equipo según la aplicación: ${c.equipo <= 1 ? "sin equipo" : `${c.equipo} personas`}`,
    `Aparece en la lista de participantes: ${c.enLista ? "sí" : "no"}`,
    `Se enteró por: ${c.enterado || "(vacío)"} — ${c.enteradoDetalle || "sin detalle"}`,
    `Nota: ${c.nota || "(vacía)"}`,
  ].join("\n");
}

async function correoInterno(asunto: string, cuerpo: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: REMITENTE,
        to: [CORREO_CONTACTO],
        subject: `[defacc] ${asunto}`,
        text: cuerpo,
      }),
    });
  } catch (e) {
    console.error("[defacc-confirmar] no salió el aviso interno", e);
  }
}

/* Acuse para quien confirma. Si no sale, la confirmación ya quedó guardada. */
async function acusar(c: Confirmacion): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const cuerpo = [
    `Hola ${c.nombre.trim().split(/\s+/)[0]},`,
    "",
    "Tu cupo en el DefAcc Hackathon queda confirmado.",
    "",
    "Sábado 14 de noviembre, de 8 a. m. a 8 p. m., en la Universidad de los Andes, Bogotá.",
    "El registro abre a las 8:00. Trae tu documento de identidad original para entrar al campus. El almuerzo va por nuestra cuenta.",
    "",
    `Si todavía no lo abriste, este es el grupo de WhatsApp: ${GRUPO_WHATSAPP}`,
    "",
    `Si algo cambia y ya no puedes venir, avísanos a ${CORREO_CONTACTO} lo antes posible. Hay gente en lista de espera.`,
    "",
    "AI Safety Colombia",
  ]
    .filter((linea, i, todas) => linea !== "" || todas[i - 1] !== "")
    .join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: REMITENTE,
        to: [c.correo],
        reply_to: CORREO_CONTACTO,
        subject: "Confirmado: nos vemos el sábado en el DefAcc Hackathon",
        text: cuerpo,
      }),
    });
    if (!r.ok) console.error("[defacc-confirmar] Resend rechazó el acuse", r.status, await r.text());
  } catch (e) {
    console.error("[defacc-confirmar] no salió el acuse", e);
  }
}

export async function POST(req: Request) {
  if (!pasaElLimite(ipDeLaPeticion(req)))
    return NextResponse.json({ error: "demasiadas" }, { status: 429 });

  let crudo: Record<string, unknown>;
  try {
    crudo = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "json" }, { status: 400 });
  }

  /* Acá no hay camino abierto: sin token válido no se confirma. El nombre, el
     correo y el tamaño del equipo salen de la firma, no del navegador. */
  const invitada = verificarInvitacionDefacc(texto(crudo.token, 2000));
  if (!invitada) return NextResponse.json({ error: "enlace" }, { status: 403 });

  if (texto(crudo.website, 100)) return NextResponse.json({ ok: true });

  /* Todo es obligatorio menos la nota: asistencia, grupo y lista. */
  const asiste = crudo.asiste === true;
  const grupo = crudo.grupo === true;
  if (!asiste || !grupo) return NextResponse.json({ error: "casillas" }, { status: 400 });

  const lista = texto(crudo.enLista, 4);
  if (lista !== "si" && lista !== "no")
    return NextResponse.json({ error: "lista" }, { status: 400 });

  /* Igual que el sprint: de dónde se enteró, y la precisión (todas la piden). */
  const enterado = texto(crudo.enterado, 20);
  const enteradoDetalle = texto(crudo.enteradoDetalle, 200);
  if (!ENTERADO_IDS.includes(enterado) || !enteradoDetalle)
    return NextResponse.json({ error: "enterado" }, { status: 400 });

  const confirmacion: Confirmacion = {
    nombre: invitada.nombre,
    correo: invitada.correo,
    equipo: invitada.equipo,
    asiste,
    grupo,
    enLista: lista === "si",
    enterado,
    enteradoDetalle,
    nota: texto(crudo.nota, 1200),
  };

  const guardada = await guardar(confirmacion);
  if (!guardada) {
    await correoInterno(
      `NO SE GUARDÓ la confirmación de ${confirmacion.nombre}`,
      resumen(
        confirmacion,
        `${confirmacion.nombre} <${confirmacion.correo}> confirmó su cupo y Supabase rechazó la fila.`,
      ),
    );
    return NextResponse.json({ error: "guardar" }, { status: 502 });
  }

  await acusar(confirmacion);
  return NextResponse.json({ ok: true });
}
