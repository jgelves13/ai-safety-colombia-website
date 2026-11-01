"use client";

import { useState } from "react";

import { ARRANQUE, COMPROMISO_HORARIO, GRUPO_WHATSAPP, SEDE } from "@/app/sprint/datos";

/* Formulario de confirmación de quienes quedaron seleccionados.

   Es corto a propósito: la aplicación ya preguntó todo lo demás y esto se llena
   desde el celular, muchas veces el mismo día del cierre.

   Sirve para los dos casos. Con token —el enlace firmado del correo— la
   identidad no se pregunta: viene de la firma, y arriba solo se muestra a
   nombre de quién se está confirmando. Sin token, en /sprint/confirmar/abierto,
   la persona escribe su nombre y su correo a mano.

   El registro es el de junio: una línea de contexto por bloque, nunca un
   párrafo que argumente por qué la pregunta está ahí. */

const INPUT =
  "text-body-sm w-full rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 text-aisc-ink transition-colors placeholder:text-aisc-muted/60 focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/35";
const TITULO = "text-display-4 md:text-display-4-lg text-balance text-aisc-ink";
const ETIQUETA = "text-body-sm block font-medium text-aisc-ink";
const AYUDA = "text-meta mt-2 block text-aisc-muted";
const ERROR = "text-meta mt-2 block text-aisc-coral";
const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";
const CASILLA =
  "text-body-sm flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border border-aisc-line bg-white px-4 py-4 transition-colors hover:border-aisc-forest/45 has-checked:border-aisc-forest has-checked:bg-aisc-forest/6";

const HOSPEDAJE = [
  { id: "bogota", label: "Vivo en Bogotá." },
  { id: "necesito", label: "Vengo de otra ciudad y necesito hospedaje." },
  { id: "resuelvo", label: "Vengo de otra ciudad y ya lo tengo resuelto." },
] as const;

/* De donde salio la persona. Sirve para saber que canal de difusion vale la
   pena repetir el proximo sprint: los grupos de WhatsApp y los correos de
   profesores fueron los dos frentes grandes y no hay forma de distinguirlos sin
   preguntar. Las dos primeras opciones piden precision —cual grupo, de quien el
   correo— porque el dato agregado no dice nada. */
const ENTERADO: { id: string; label: string; detalle?: string }[] = [
  { id: "whatsapp", label: "Por un grupo de WhatsApp.", detalle: "¿Cuál grupo?" },
  { id: "correo", label: "Por un correo.", detalle: "¿De quién?" },
  { id: "persona", label: "Alguien me lo contó.", detalle: "¿Quién?" },
  {
    id: "universidad",
    label: "Por mi universidad: un profesor, un semillero, un boletín.",
    detalle: "¿Cuál universidad, y quién te lo pasó?",
  },
  { id: "redes", label: "Por redes: LinkedIn, Instagram, X.", detalle: "¿Cuál red?" },
  {
    id: "apart",
    label: "Por Apart Research o su comunidad.",
    detalle: "¿Por dónde: su página, su Discord, un correo suyo?",
  },
  { id: "otro", label: "Otro.", detalle: "¿Cómo?" },
];

type Estado = "listo" | "enviando" | "enviado" | "falla";

/* Los cinco campos de «Tus datos» tienen la misma forma, así que van por una
   función en vez de cinco bloques copiados. */
function Campo({
  id,
  etiqueta,
  valor,
  cambiar,
  error,
  tipo = "text",
  auto,
  largo = 200,
}: {
  id: string;
  etiqueta: string;
  valor: string;
  cambiar: (v: string) => void;
  error?: string;
  tipo?: string;
  auto?: string;
  largo?: number;
}) {
  return (
    <div className="flex flex-col">
      <label className={ETIQUETA} htmlFor={id}>
        {etiqueta}
      </label>
      <input
        id={id}
        type={tipo}
        maxLength={largo}
        autoComplete={auto}
        value={valor}
        onChange={(e) => cambiar(e.target.value)}
        className={`${INPUT} mt-2`}
      />
      {error ? <span className={ERROR}>{error}</span> : null}
    </div>
  );
}

/** La pregunta de precisión de la opción escogida, o nada si no lleva. */
function DETALLE_DE(id: string): string {
  return ENTERADO.find((o) => o.id === id)?.detalle ?? "";
}

/* El correo se valida flojo a propósito: lo estricto se lo dejamos al envío del
   acuse, y una expresión apretada rechaza direcciones válidas. */
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SprintConfirmForm({
  token = "",
  nombre = "",
}: {
  token?: string;
  nombre?: string;
}) {
  /* Sin token, la página es la abierta y hay que preguntar quién es. */
  const abierto = token === "";
  const [nombreEscrito, setNombreEscrito] = useState("");
  const [correo, setCorreo] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [scholar, setScholar] = useState("");
  const [disponible, setDisponible] = useState(false);
  const [grupo, setGrupo] = useState(false);
  const [lectura, setLectura] = useState(false);
  const [hospedaje, setHospedaje] = useState("");
  const [enterado, setEnterado] = useState("");
  const [enteradoDetalle, setEnteradoDetalle] = useState("");
  const [nota, setNota] = useState("");
  const [trampa, setTrampa] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<Estado>("listo");

  const tarjeta = "rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9 lg:p-11";

  function revisar(): boolean {
    const e: Record<string, string> = {};
    if (abierto) {
      if (nombreEscrito.trim().length < 3) e.nombre = "Escribe tu nombre completo.";
      if (!CORREO.test(correo.trim())) e.correo = "Escribe un correo válido.";
      /* Apart marca LinkedIn como obligatorio y deja escribir N/A. Acá se
         mantiene obligatorio porque el perfil sí nos sirve; Google Scholar
         casi nadie de esta sala lo tiene, así que se manda como N/A si va
         vacío en vez de cobrarle a todo el mundo un campo de más. */
      if (!linkedin.trim()) e.linkedin = "Pon tu LinkedIn, o escribe N/A.";
    }
    if (!disponible) e.disponible = "Confirma tu disponibilidad para continuar.";
    if (!lectura) e.lectura = "Marca la casilla para confirmar que vas a revisar el material.";
    if (!hospedaje) e.hospedaje = "Dinos si necesitas hospedaje.";
    if (!enterado) e.enterado = "Cuéntanos por dónde te enteraste.";
    /* La precisión se cobra siempre que se muestre, igual que los nombres del
       equipo en el formulario de aplicación: saber que alguien llegó «por
       WhatsApp» no distingue entre cinco grupos ni entre veinte remitentes, que
       es justo el dato que hay que medir. */
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
      const respuesta = await fetch("/api/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          nombre: nombreEscrito.trim(),
          correo: correo.trim(),
          linkedin: linkedin.trim(),
          scholar: scholar.trim() || "N/A",
          disponible,
          grupo,
          lectura,
          hospedaje,
          enterado,
          enteradoDetalle: enteradoDetalle.trim(),
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
          Nos vemos el {ARRANQUE} en {SEDE}. Pronto te compartimos la agenda y el resto de la
          logística.
        </p>
        {/* Solo se le vuelve a poner el grupo enfrente a quien no marcó la
            casilla: a quien ya entró, repetírselo sobra. */}
        {grupo ? null : (
          <p className="text-body-sm mt-4 text-aisc-ink">
            Todavía no te has unido al grupo de WhatsApp.{" "}
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
          lo antes posible.
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

      {abierto ? null : (
        <p className="text-meta text-aisc-muted">
          Confirmando como <span className="font-medium text-aisc-ink">{nombre}</span>
        </p>
      )}

      <div className={abierto ? "space-y-10" : "mt-8 space-y-10"}>
        {abierto ? (
          <section>
            <h2 className={TITULO}>Tus datos</h2>
            {/* Es lo mínimo que pide el registro de Apart —quien organiza el
                sprint— y que nosotros todavía no sabemos de ti. Lo que allá es
                opcional (a qué te dedicas, por qué te interesa) no se pregunta
                acá. */}
            <span className={AYUDA}>
              Con esto te inscribimos en Apart, que es quien organiza el sprint. Al correo llega
              todo lo del fin de semana.
            </span>
            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <Campo
                id="nombre"
                etiqueta="Nombre completo"
                auto="name"
                largo={120}
                valor={nombreEscrito}
                cambiar={setNombreEscrito}
                error={errores.nombre}
              />
              <Campo
                id="correo"
                etiqueta="Correo"
                tipo="email"
                auto="email"
                valor={correo}
                cambiar={setCorreo}
                error={errores.correo}
              />
              <Campo
                id="linkedin"
                etiqueta="LinkedIn (o N/A)"
                auto="url"
                valor={linkedin}
                cambiar={setLinkedin}
                error={errores.linkedin}
              />
              <Campo
                id="scholar"
                etiqueta="Google Scholar (opcional)"
                auto="url"
                valor={scholar}
                cambiar={setScholar}
              />
            </div>
          </section>
        ) : null}

        <section>
          <h2 className={TITULO}>Tu disponibilidad</h2>
          {/* La misma frase en las dos páginas. La bifurcación anterior dejaba
              al del enlace con «solo hay excepciones para quien nos lo dijo en
              la aplicación», que cierra la puerta en vez de abrir la nota. */}
          <span className={AYUDA}>
            Te necesitamos los tres días. El trabajo empieza el viernes y se entrega el domingo por
            la tarde. Si tienes un choque y no nos lo dijiste en la aplicación, cuéntanoslo abajo.
          </span>
          <label className={`${CASILLA} mt-4`} htmlFor="disponible">
            <input
              id="disponible"
              type="checkbox"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
              className="mt-0.5 accent-aisc-forest"
            />
            <span>{COMPROMISO_HORARIO}</span>
          </label>
          {errores.disponible ? <span className={ERROR}>{errores.disponible}</span> : null}
        </section>

        <section>
          <h2 className={TITULO}>Grupo de WhatsApp del sprint</h2>
          <span className={AYUDA}>Toda la logística del fin de semana la coordinamos ahí.</span>
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
          {/* La casilla no bloquea el envío a propósito: en junio varios se
              quedaron atascados acá porque el enlace de WhatsApp no abría desde
              el navegador del celular. A quien no la marque se le insiste por
              correo. */}
        </section>

        <section>
          <h2 className={TITULO}>El material de preparación</h2>
          <span className={AYUDA}>
            Te lo mandamos el miércoles, junto con la guía para participantes y el catálogo.
          </span>
          <label className={`${CASILLA} mt-4`} htmlFor="lectura">
            <input
              id="lectura"
              type="checkbox"
              checked={lectura}
              onChange={(e) => setLectura(e.target.checked)}
              className="mt-0.5 accent-aisc-forest"
            />
            <span>Me comprometo a revisarlo antes del viernes.</span>
          </label>
          {errores.lectura ? <span className={ERROR}>{errores.lectura}</span> : null}
        </section>

        <section>
          <h2 className={TITULO}>Hospedaje</h2>
          <span className={AYUDA}>
            Cubrimos el hospedaje de quien venga de otra ciudad. El transporte va por tu cuenta.
          </span>
          <div className="mt-4 space-y-2.5">
            {HOSPEDAJE.map((opcion) => (
              <label className={CASILLA} key={opcion.id} htmlFor={`hospedaje-${opcion.id}`}>
                <input
                  id={`hospedaje-${opcion.id}`}
                  type="radio"
                  name="hospedaje"
                  value={opcion.id}
                  checked={hospedaje === opcion.id}
                  onChange={() => setHospedaje(opcion.id)}
                  className="mt-0.5 accent-aisc-forest"
                />
                <span>{opcion.label}</span>
              </label>
            ))}
          </div>
          {errores.hospedaje ? <span className={ERROR}>{errores.hospedaje}</span> : null}
        </section>

        <section>
          <h2 className={TITULO}>¿Dónde te enteraste del sprint?</h2>
          <span className={AYUDA}>
            Nos sirve para saber qué repetir el próximo sprint y a quién agradecerle.
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
          {/* El campo de precisión aparece pegado a la opción escogida, con la
              pregunta que corresponda; si no hay opción escogida, no hay campo. */}
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
            La comida es vegana. Cuéntanos alergias, accesibilidad, o lo que se te quedó por
            fuera de la aplicación. Acá también nos dices si prefieres no salir en el
            catálogo de participantes.
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
            organizan, para la logística del fin de semana. Tu nombre, tu correo y tu perfil
            van a Apart Research para inscribirte. Así tratamos tus datos:{" "}
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
