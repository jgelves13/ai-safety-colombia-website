"use client";

import { useState } from "react";

/* Confirmación de cupo del DefAcc Hackathon. Solo llega con enlace firmado:
   el nombre, el correo y el tamaño del equipo vienen de la aplicación, así que
   acá no se pregunta nada de eso. Todo es obligatorio menos la nota, que puede
   traer datos de salud y por eso no puede exigirse. */

const GRUPO_WHATSAPP = "https://chat.whatsapp.com/KQdBJaT1SHOLp2t64fe8Yw";

const INPUT =
  "text-body-sm w-full rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 text-aisc-ink transition-colors placeholder:text-aisc-muted/60 focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/35";
const TITULO = "text-display-4 md:text-display-4-lg text-balance text-aisc-ink";
const AYUDA = "text-meta mt-2 block text-aisc-muted";
const ERROR = "text-meta mt-2 block text-aisc-coral";
const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";
const CASILLA =
  "text-body-sm flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border border-aisc-line bg-white px-4 py-4 transition-colors hover:border-aisc-forest/45 has-checked:border-aisc-forest has-checked:bg-aisc-forest/6";

/* La aplicación del DefAcc no pedía permiso para mostrarle a los demás quién
   viene, así que se pregunta acá. Con esto se arma la lista de participantes
   de la guía, como en el sprint de Incident Response. */
const EN_LISTA = [
  { id: "si", label: "Sí, inclúyanme." },
  { id: "no", label: "Prefiero no aparecer." },
] as const;

/* Igual que en el sprint de Incident Response: sirve para saber qué difusión
   funcionó. Si la opción trae pregunta de precisión, esa también es obligatoria. */
const ENTERADO: { id: string; label: string; detalle?: string }[] = [
  { id: "whatsapp", label: "Por un grupo de WhatsApp.", detalle: "¿Cuál grupo?" },
  { id: "correo", label: "Por un correo.", detalle: "¿De quién?" },
  { id: "persona", label: "Alguien me lo contó.", detalle: "¿Quién?" },
  {
    id: "universidad",
    label: "Por mi universidad: un profesor, un semillero, un boletín.",
    detalle: "¿Cuál universidad, y quién te lo pasó?",
  },
  { id: "ieee", label: "Por IEEE CS Uniandes.", detalle: "¿Por dónde: un correo, sus redes, alguien del capítulo?" },
  { id: "redes", label: "Por redes: LinkedIn, Instagram, X.", detalle: "¿Cuál red?" },
  { id: "otro", label: "Otro.", detalle: "¿Cómo?" },
];

/** La pregunta de precisión de la opción escogida, o nada si no lleva. */
function DETALLE_DE(id: string): string {
  return ENTERADO.find((o) => o.id === id)?.detalle ?? "";
}

const ETIQUETA = "text-body-sm block font-medium text-aisc-ink";

type Estado = "listo" | "enviando" | "enviado" | "falla";

export default function DefaccConfirmForm({
  token,
  nombre,
}: {
  token: string;
  nombre: string;
}) {
  const [asiste, setAsiste] = useState(false);
  const [grupo, setGrupo] = useState(false);
  const [enLista, setEnLista] = useState("");
  const [enterado, setEnterado] = useState("");
  const [enteradoDetalle, setEnteradoDetalle] = useState("");
  const [nota, setNota] = useState("");
  const [trampa, setTrampa] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<Estado>("listo");

  const tarjeta = "rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9 lg:p-11";

  function revisar(): boolean {
    const e: Record<string, string> = {};
    if (!asiste) e.asiste = "Confirma que vienes el sábado completo para continuar.";
    if (!grupo) e.grupo = "Únete al grupo y marca la casilla para continuar.";
    if (!enLista) e.enLista = "Cuéntanos si te incluimos en la lista.";
    if (!enterado) e.enterado = "Cuéntanos por dónde te enteraste.";
    else if (DETALLE_DE(enterado) && !enteradoDetalle.trim())
      e.enteradoDetalle = "Falta responder.";
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    if (estado === "enviando") return;
    if (!revisar()) return;
    setEstado("enviando");
    try {
      const respuesta = await fetch("/api/defacchackathon/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          asiste,
          grupo,
          enLista,
          enterado,
          enteradoDetalle,
          nota,
          website: trampa,
        }),
      });
      if (!respuesta.ok) throw new Error(String(respuesta.status));
      setEstado("enviado");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setEstado("falla");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (estado === "enviado") {
    return (
      <div className={tarjeta}>
        <h2 className={TITULO}>Listo. Tu cupo está confirmado.</h2>
        <p className="text-body-sm mt-4 text-aisc-ink">
          Nos vemos el sábado a las 8:00 en la Universidad de los Andes. Te llega un correo con
          los detalles.
        </p>
        <p className="text-meta mt-7 text-aisc-muted">
          Si algo cambia y ya no puedes venir, escríbenos a{" "}
          <a className={ENLACE} href="mailto:equipo@aisafetycolombia.org">
            equipo@aisafetycolombia.org
          </a>{" "}
          lo antes posible. Hay gente en lista de espera.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className={tarjeta}>
      {estado === "falla" ? (
        <p className="text-body-sm mb-8 rounded-[var(--radius)] border border-aisc-coral bg-white px-4 py-3 text-aisc-coral">
          No pudimos guardar tu confirmación. Intenta de nuevo en un minuto. Si sigue fallando,
          escríbenos a equipo@aisafetycolombia.org.
        </p>
      ) : null}

      <p className="text-meta text-aisc-muted">
        Confirmando como <span className="font-medium text-aisc-ink">{nombre}</span>
      </p>

      <div className="mt-8 space-y-10">
        <section>
          <h2 className={TITULO}>Tu asistencia</h2>
          <span className={AYUDA}>
            El hackathon dura todo el día. Si tienes un choque, cuéntanoslo abajo.
          </span>
          <label className={`${CASILLA} mt-4`} htmlFor="asiste">
            <input
              id="asiste"
              type="checkbox"
              checked={asiste}
              onChange={(e) => setAsiste(e.target.checked)}
              className="mt-0.5 accent-aisc-forest"
            />
            <span>Voy el sábado 14 de noviembre, de 8 a. m. a 8 p. m.</span>
          </label>
          {errores.asiste ? <span className={ERROR}>{errores.asiste}</span> : null}
        </section>

        <section>
          <h2 className={TITULO}>Grupo de WhatsApp del hackathon</h2>
          <span className={AYUDA}>
            Unirse es obligatorio: por ahí sale toda la logística del sábado.
          </span>
          <a
            className="text-body-sm mt-4 inline-flex min-h-11 items-center rounded-full bg-aisc-ink px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-ink/85"
            href={GRUPO_WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            Unirme al grupo
          </a>
          <label className={`${CASILLA} mt-4`} htmlFor="grupo">
            <input
              id="grupo"
              type="checkbox"
              checked={grupo}
              onChange={(e) => setGrupo(e.target.checked)}
              className="mt-0.5 accent-aisc-forest"
            />
            <span>Ya me uní al grupo.</span>
          </label>
          {errores.grupo ? <span className={ERROR}>{errores.grupo}</span> : null}
        </section>

        <section>
          <h2 className={TITULO}>¿Te incluimos en la lista de participantes?</h2>
          <span className={AYUDA}>
            Antes del sábado publicamos en la guía del hackathon una lista con el nombre, la
            institución y la idea de cada persona, para que quienes llegan sin equipo encuentren
            con quién trabajar sin tener que escribir en el grupo. Tu correo y tu WhatsApp no
            aparecen. Solo la ven quienes tienen el enlace de la guía.
          </span>
          <div className="mt-4 space-y-2.5">
            {EN_LISTA.map((opcion) => (
              <label className={CASILLA} key={opcion.id} htmlFor={`lista-${opcion.id}`}>
                <input
                  id={`lista-${opcion.id}`}
                  type="radio"
                  name="enLista"
                  value={opcion.id}
                  checked={enLista === opcion.id}
                  onChange={() => setEnLista(opcion.id)}
                  className="mt-0.5 accent-aisc-forest"
                />
                <span>{opcion.label}</span>
              </label>
            ))}
          </div>
          {errores.enLista ? <span className={ERROR}>{errores.enLista}</span> : null}
        </section>

        <section>
          <h2 className={TITULO}>¿Dónde te enteraste del hackathon?</h2>
          <span className={AYUDA}>
            Nos sirve para saber qué repetir el próximo hackathon y a quién agradecerle.
          </span>
          <div className="mt-4 space-y-2.5">
            {ENTERADO.map((opcion) => (
              <label className={CASILLA} key={opcion.id} htmlFor={`enterado-${opcion.id}`}>
                <input
                  id={`enterado-${opcion.id}`}
                  type="radio"
                  name="enterado"
                  value={opcion.id}
                  checked={enterado === opcion.id}
                  onChange={() => {
                    setEnterado(opcion.id);
                    setEnteradoDetalle("");
                  }}
                  className="mt-0.5 accent-aisc-forest"
                />
                <span>{opcion.label}</span>
              </label>
            ))}
          </div>
          {errores.enterado ? <span className={ERROR}>{errores.enterado}</span> : null}
          {DETALLE_DE(enterado) ? (
            <div className="mt-4">
              <label className={ETIQUETA} htmlFor="enterado-detalle">
                {DETALLE_DE(enterado)}
              </label>
              <input
                id="enterado-detalle"
                type="text"
                maxLength={200}
                value={enteradoDetalle}
                onChange={(e) => setEnteradoDetalle(e.target.value)}
                className={`${INPUT} mt-2`}
              />
              {errores.enteradoDetalle ? (
                <span className={ERROR}>{errores.enteradoDetalle}</span>
              ) : null}
            </div>
          ) : null}
        </section>

        <section>
          <h2 className={TITULO}>
            <label htmlFor="nota">¿Algo que debamos saber?</label>
          </h2>
          <span className={AYUDA}>
            Restricciones de comida, alergias, accesibilidad o cualquier otra cosa.
          </span>
          <textarea
            id="nota"
            rows={4}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            maxLength={1200}
            className={`${INPUT} mt-4`}
          />
          <p className="text-meta mt-4 text-aisc-muted">
            Lo que nos cuentes de salud o accesibilidad es opcional y solo lo ven quienes
            organizan, para la logística del sábado. Así tratamos tus datos:{" "}
            <a className={ENLACE} href="/privacidad" target="_blank" rel="noopener noreferrer">
              política de tratamiento de datos
            </a>
            .
          </p>
        </section>
      </div>

      {/* Trampa para bots: un campo que ninguna persona ve ni llena. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">No llenar</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="text-body-sm mt-10 inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-7 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Confirmar mi cupo"}
      </button>
    </form>
  );
}
