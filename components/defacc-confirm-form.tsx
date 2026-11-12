"use client";

import { useState } from "react";

/* Confirmación de cupo del DefAcc Hackathon. Solo llega con enlace firmado:
   el nombre, el correo y el tamaño del equipo vienen de la aplicación, así que
   acá no se pregunta nada de eso. La única pregunta nueva es para equipos de 2
   a 4: si aceptarían a alguien más el sábado. La página decide si mostrarla
   (lib/defacc-confirmar usa node:crypto y no puede importarse acá). */

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

const MAS_GENTE = [
  { id: "si", label: "Sí, nos puede llegar alguien más." },
  { id: "no", label: "No, vamos como estamos." },
] as const;

/* La aplicación del DefAcc no pedía permiso para mostrarle a los demás quién
   viene, así que se pregunta acá. Con esto se arma la lista de participantes
   de la guía, como en el sprint de Incident Response. */
const EN_LISTA = [
  { id: "si", label: "Sí, inclúyanme." },
  { id: "no", label: "Prefiero no aparecer." },
] as const;

type Estado = "listo" | "enviando" | "enviado" | "falla";

export default function DefaccConfirmForm({
  token,
  nombre,
  equipo,
  preguntarMasGente,
}: {
  token: string;
  nombre: string;
  equipo: number;
  preguntarMasGente: boolean;
}) {
  const [asiste, setAsiste] = useState(false);
  const [grupo, setGrupo] = useState(false);
  const [masGente, setMasGente] = useState("");
  const [enLista, setEnLista] = useState("");
  const [nota, setNota] = useState("");
  const [trampa, setTrampa] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<Estado>("listo");

  const tarjeta = "rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9 lg:p-11";

  function revisar(): boolean {
    const e: Record<string, string> = {};
    if (!asiste) e.asiste = "Confirma que vienes el sábado completo para continuar.";
    if (preguntarMasGente && !masGente) e.masGente = "Cuéntanos si aceptarían a alguien más.";
    if (!enLista) e.enLista = "Cuéntanos si te incluimos en la lista.";
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
          masGente: preguntarMasGente ? masGente : undefined,
          enLista,
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
        {grupo ? null : (
          <p className="text-body-sm mt-4 text-aisc-ink">
            Todavía no te has unido al grupo de WhatsApp, y es obligatorio.{" "}
            <a className={ENLACE} href={GRUPO_WHATSAPP} target="_blank" rel="noreferrer">
              Únete acá.
            </a>
          </p>
        )}
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
          {/* No bloquea el envío: el enlace a veces no abre desde el navegador
              del celular. A quien no la marque se le insiste por correo. */}
        </section>

        {preguntarMasGente ? (
          <section>
            <h2 className={TITULO}>¿Aceptarían a alguien más el sábado?</h2>
            <span className={AYUDA}>
              En tu aplicación dijiste que vienes en un equipo de {equipo}. Los equipos pueden ser
              de hasta 5 y hay gente que llega sola.
            </span>
            <div className="mt-4 space-y-2.5">
              {MAS_GENTE.map((opcion) => (
                <label className={CASILLA} key={opcion.id} htmlFor={`mas-${opcion.id}`}>
                  <input
                    id={`mas-${opcion.id}`}
                    type="radio"
                    name="masGente"
                    value={opcion.id}
                    checked={masGente === opcion.id}
                    onChange={() => setMasGente(opcion.id)}
                    className="mt-0.5 accent-aisc-forest"
                  />
                  <span>{opcion.label}</span>
                </label>
              ))}
            </div>
            {errores.masGente ? <span className={ERROR}>{errores.masGente}</span> : null}
          </section>
        ) : null}

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
