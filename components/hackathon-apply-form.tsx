"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { APART_SPRINT_URL, EQUIPO_FORM, TRACKS_FORM, VIAJE_FORM } from "@/app/hackathon/datos";

/* Borrador local: quien empieza a escribir y cierra la pestaña no pierde lo que
   llevaba. Se borra al enviar. */
const BORRADOR = "aisc-hackathon-2026-09";

type Campos = Record<string, string>;

const VACIO: Campos = {
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  linkedin: "",
  scholar: "",
  career: "",
  aiSafety: "",
  reason: "",
  hubProblem: "",
  hubTrack: "",
  hubTeam: "",
  hubTeamNames: "",
  hubTravel: "",
  hubAccess: "",
  hubExtra: "",
  aiConfirm: "",
  website: "",
};

/* Cada campo obligatorio con el texto que aparece en el resumen de arriba
   cuando alguien intenta enviar sin llenarlo. */
const OBLIGATORIOS: { name: string; falta: string }[] = [
  { name: "firstName", falta: "Tu nombre" },
  { name: "lastName", falta: "Tus apellidos" },
  { name: "email", falta: "Tu correo" },
  { name: "location", falta: "Desde dónde vendrías" },
  { name: "linkedin", falta: "Tu LinkedIn" },
  { name: "scholar", falta: "Tu GitHub, Scholar o portafolio" },
  { name: "career", falta: "En qué andas ahora" },
  { name: "aiSafety", falta: "Tu acercamiento previo a la seguridad de la IA" },
  { name: "reason", falta: "Por qué quieres participar" },
  { name: "hubProblem", falta: "El problema que te gustaría abordar" },
  { name: "hubTrack", falta: "El frente que te llama" },
  { name: "hubTeam", falta: "Si aplicas solo o con equipo" },
  { name: "hubTravel", falta: "Cómo llegarías a Bogotá" },
  { name: "aiConfirm", falta: "La confirmación sobre el uso de IA" },
];

const LIMITES: Record<string, number> = {
  career: 800,
  aiSafety: 900,
  reason: 1500,
  hubProblem: 1500,
  hubTeamNames: 600,
  hubAccess: 800,
  hubExtra: 800,
};

const INPUT =
  "text-body-sm w-full rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 text-aisc-ink transition-colors placeholder:text-aisc-muted/60 focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/35";
const INPUT_MAL = "border-aisc-coral focus:border-aisc-coral focus:outline-aisc-coral/35";
const ETIQUETA = "text-body-sm block font-medium text-aisc-ink";
const AYUDA = "text-meta mt-1 block text-aisc-muted";
const ERROR = "text-meta mt-1.5 block text-aisc-coral";
const SECCION = "border-t border-aisc-line pt-8 first:border-t-0 first:pt-0";
const ENLACE = "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

function Campo({
  name,
  label,
  ayuda,
  error,
  requerido,
  children,
}: {
  name: string;
  label: string;
  ayuda?: string;
  error?: string;
  requerido?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className={ETIQUETA} htmlFor={name}>
        {label}
        {requerido ? <span className="text-aisc-coral"> *</span> : <span className="text-aisc-muted"> (opcional)</span>}
      </label>
      {ayuda ? <span className={AYUDA}>{ayuda}</span> : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <span className={ERROR} id={`${name}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default function HackathonApplyForm({ cerrado }: { cerrado: boolean }) {
  const [v, setV] = useState<Campos>(VACIO);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<"listo" | "enviando" | "enviado" | "falla">("listo");
  const [faltantes, setFaltantes] = useState<string[]>([]);
  const [cargado, setCargado] = useState(false);
  const resumen = useRef<HTMLDivElement>(null);

  /* Recuperar el borrador. Va en un efecto para que el HTML del servidor y el
     del cliente coincidan en el primer render. */
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(BORRADOR);
      if (guardado) setV({ ...VACIO, ...(JSON.parse(guardado) as Campos) });
    } catch {
      /* si el almacenamiento está bloqueado, se sigue sin borrador */
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado || estado === "enviado") return;
    try {
      window.localStorage.setItem(BORRADOR, JSON.stringify({ ...v, website: "" }));
    } catch {
      /* idem */
    }
  }, [v, cargado, estado]);

  const set = (name: string, valor: string) => {
    setV((prev) => ({ ...prev, [name]: valor }));
    setErrores((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const revisar = () => {
    const nuevos: Record<string, string> = {};
    for (const campo of OBLIGATORIOS) {
      if (!v[campo.name]?.trim()) nuevos[campo.name] = "Falta responder.";
    }
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
      nuevos.email = "Revisa el correo: parece que le falta algo.";
    }
    if (v.hubTeam === "equipo" && !v.hubTeamNames.trim()) {
      nuevos.hubTeamNames = "Falta responder.";
    }
    for (const [name, tope] of Object.entries(LIMITES)) {
      if ((v[name] ?? "").length > tope) nuevos[name] = `Pasaste el límite de ${tope} caracteres.`;
    }
    return nuevos;
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (estado === "enviando") return;

    const nuevos = revisar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) {
      const pendientes = OBLIGATORIOS.filter((c) => nuevos[c.name]).map((c) => c.falta);
      if (nuevos.hubTeamNames) pendientes.push("Con quién aplicas");
      setFaltantes(pendientes);
      requestAnimationFrame(() => resumen.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
      return;
    }

    setFaltantes([]);
    setEstado("enviando");
    try {
      const r = await fetch("/api/aplicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (!r.ok) throw new Error(String(r.status));
      try {
        window.localStorage.removeItem(BORRADOR);
      } catch {
        /* idem */
      }
      setEstado("enviado");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setEstado("falla");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const tarjeta = "rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9 lg:p-11";

  if (cerrado) {
    return (
      <div className={tarjeta}>
        <h2 className="text-display-3 md:text-display-3-lg text-balance">Las aplicaciones ya cerraron</h2>
        <p className="text-body-sm mt-4 text-aisc-ink">
          El plazo para el espacio presencial en Bogotá se cerró el 6 de septiembre. Todavía puedes participar en línea
          con Apart, que recibe proyectos hasta el domingo del sprint.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            className="text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85"
            href={APART_SPRINT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Participar en línea
          </a>
          <Link
            className="text-body-sm inline-flex min-h-11 items-center rounded-full border border-aisc-ink px-6 font-medium text-aisc-ink transition-colors hover:bg-aisc-ink hover:text-aisc-cream"
            href="/hackathon"
          >
            Volver al sprint
          </Link>
        </div>
      </div>
    );
  }

  if (estado === "enviado") {
    return (
      <div className={tarjeta}>
        <h2 className="text-display-3 md:text-display-3-lg text-balance">Recibimos tu aplicación</h2>
        <p className="text-body-sm mt-4 text-aisc-ink">
          Te llega una confirmación al correo que nos diste. Revisamos las aplicaciones a medida que llegan y
          respondemos a todo el mundo antes del sprint, sin importar el resultado.
        </p>
        <p className="text-body-sm mt-3 text-aisc-ink">
          Mientras tanto, el grupo de WhatsApp es por donde anunciamos la sede y lo que conviene leer antes.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            className="text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85"
            href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Entrar al grupo
          </a>
          <Link
            className="text-body-sm inline-flex min-h-11 items-center rounded-full border border-aisc-ink px-6 font-medium text-aisc-ink transition-colors hover:bg-aisc-ink hover:text-aisc-cream"
            href="/hackathon"
          >
            Volver al sprint
          </Link>
        </div>
      </div>
    );
  }

  const contador = (name: string) => {
    const usado = (v[name] ?? "").length;
    const tope = LIMITES[name];
    return (
      <span className={`text-meta mt-1 block text-right tabular-nums ${usado > tope ? "text-aisc-coral" : "text-aisc-muted"}`}>
        {usado} / {tope}
      </span>
    );
  };

  const areaProps = (name: string, rows: number) => ({
    id: name,
    name,
    rows,
    value: v[name],
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => set(name, e.target.value),
    className: `${INPUT} resize-y ${errores[name] ? INPUT_MAL : ""}`,
    "aria-invalid": errores[name] ? true : undefined,
    "aria-describedby": errores[name] ? `${name}-error` : undefined,
  });

  const textProps = (name: string, tipo = "text", extra = 200) => ({
    id: name,
    name,
    type: tipo,
    maxLength: extra,
    value: v[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(name, e.target.value),
    className: `${INPUT} ${errores[name] ? INPUT_MAL : ""}`,
    "aria-invalid": errores[name] ? true : undefined,
    "aria-describedby": errores[name] ? `${name}-error` : undefined,
  });

  return (
    <form className={tarjeta} noValidate onSubmit={enviar}>
      {estado === "falla" ? (
        <div className="mb-8 rounded-[var(--radius)] border border-aisc-coral bg-aisc-coral/8 p-5">
          <p className="text-body-sm text-aisc-ink">
            No pudimos guardar tu aplicación. Vuelve a intentarlo en un minuto; lo que escribiste sigue acá. Si falla
            otra vez, escríbenos a{" "}
            <a className={ENLACE} href="mailto:contacto@aisafetycolombia.org">
              contacto@aisafetycolombia.org
            </a>{" "}
            y la recibimos por correo.
          </p>
        </div>
      ) : null}

      <div aria-live="polite" ref={resumen}>
        {faltantes.length > 0 ? (
          <div className="mb-8 rounded-[var(--radius)] border border-aisc-coral bg-aisc-coral/8 p-5">
            <p className="text-body-sm font-medium text-aisc-ink">Falta responder esto antes de enviar:</p>
            <ul className="text-body-sm mt-2 list-disc pl-5 text-aisc-ink">
              {faltantes.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* trampa para robots: si viene llena, la aplicación se descarta */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="website">No llenes este campo</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={v.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-9">
        <section className={SECCION}>
          <h2 className="text-display-3 md:text-display-3-lg text-balance">Datos básicos</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Campo requerido name="firstName" label="Nombre" error={errores.firstName}>
              <input {...textProps("firstName", "text", 100)} autoComplete="given-name" />
            </Campo>
            <Campo requerido name="lastName" label="Apellidos" error={errores.lastName}>
              <input {...textProps("lastName", "text", 100)} autoComplete="family-name" />
            </Campo>
            <Campo
              requerido
              name="email"
              label="Correo"
              ayuda="Acá te avisamos si quedaste y por acá mandamos la sede."
              error={errores.email}
            >
              <input {...textProps("email", "email", 200)} autoComplete="email" />
            </Campo>
            <Campo
              requerido
              name="location"
              label="Desde dónde vendrías"
              ayuda="Ciudad y país."
              error={errores.location}
            >
              <input {...textProps("location", "text", 200)} placeholder="Bogotá, Colombia" />
            </Campo>
            <Campo
              requerido
              name="linkedin"
              label="LinkedIn"
              ayuda="Si no tienes, pega otro perfil donde se vea en qué has trabajado."
              error={errores.linkedin}
            >
              <input {...textProps("linkedin", "url", 300)} placeholder="https://linkedin.com/in/..." />
            </Campo>
            <Campo
              requerido
              name="scholar"
              label="GitHub, Scholar o portafolio"
              ayuda="Cualquier cosa tuya que podamos abrir: repositorio, publicaciones, un texto, un proyecto."
              error={errores.scholar}
            >
              <input {...textProps("scholar", "url", 300)} placeholder="https://" />
            </Campo>
          </div>
        </section>

        <section className={SECCION}>
          <h2 className="text-display-3 md:text-display-3-lg text-balance">Tu trayectoria</h2>
          <p className="text-body-sm mt-3 max-w-[640px] text-aisc-muted">
            No pedimos credenciales ni experiencia previa en seguridad de la IA. Con saber de dónde vienes nos basta
            para armar equipos que se complementen.
          </p>
          <div className="mt-6 flex flex-col gap-6">
            <Campo
              requerido
              name="career"
              label="¿En qué andas ahora?"
              ayuda="Qué estudias o en qué trabajas, y desde hace cuánto."
              error={errores.career}
            >
              <textarea {...areaProps("career", 3)} />
              {contador("career")}
            </Campo>
            <Campo
              requerido
              name="aiSafety"
              label="¿Has tenido algún acercamiento a la seguridad de la IA?"
              ayuda="Un curso, un grupo de lectura, un artículo que te marcó, un proyecto, una charla. Si la respuesta es ninguno, dilo: no descalifica y nos sirve para saber con quién estamos hablando."
              error={errores.aiSafety}
            >
              <textarea {...areaProps("aiSafety", 4)} />
              {contador("aiSafety")}
            </Campo>
            <Campo
              requerido
              name="reason"
              label="¿Por qué quieres participar en este sprint?"
              ayuda="Qué te trajo hasta acá y qué esperas llevarte del fin de semana."
              error={errores.reason}
            >
              <textarea {...areaProps("reason", 5)} />
              {contador("reason")}
            </Campo>
          </div>
        </section>

        <section className={SECCION}>
          <h2 className="text-display-3 md:text-display-3-lg text-balance">La pregunta de selección</h2>
          <p className="text-body-sm mt-3 max-w-[640px] text-aisc-muted">
            Es una sola y es la que de verdad pesa. Responde con tu propio razonamiento: no aceptamos aplicaciones
            escritas por un modelo.
          </p>
          <div className="mt-6 flex flex-col gap-6">
            <Campo
              requerido
              name="hubProblem"
              label="¿Qué problema te gustaría abordar en el sprint?"
              ayuda="Hasta unas 200 palabras. No buscamos una propuesta cerrada; sí ver si te imaginas algo concreto y abordable en un fin de semana."
              error={errores.hubProblem}
            >
              <textarea {...areaProps("hubProblem", 8)} />
              {contador("hubProblem")}
            </Campo>

            <fieldset>
              <legend className={ETIQUETA}>
                ¿Cuál de los cinco frentes te llama más?<span className="text-aisc-coral"> *</span>
              </legend>
              <span className={AYUDA}>
                No es un compromiso. Los equipos se arman el viernes y puedes terminar en otro.
              </span>
              <div className="mt-3 flex flex-col gap-2">
                {TRACKS_FORM.map((t) => (
                  <label
                    className="text-body-sm flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 transition-colors hover:border-aisc-forest/45 has-checked:border-aisc-forest has-checked:bg-aisc-forest/6"
                    key={t.id}
                  >
                    <input
                      type="radio"
                      name="hubTrack"
                      value={t.id}
                      checked={v.hubTrack === t.id}
                      onChange={() => set("hubTrack", t.id)}
                      className="mt-0.5 accent-aisc-forest"
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
              {errores.hubTrack ? (
                <span className={ERROR} role="alert">
                  {errores.hubTrack}
                </span>
              ) : null}
            </fieldset>

            <fieldset>
              <legend className={ETIQUETA}>
                ¿Aplicas solo o con equipo?<span className="text-aisc-coral"> *</span>
              </legend>
              <span className={AYUDA}>
                Los equipos son de una a cinco personas. Si aplicas solo, el viernes en la noche armamos equipos en la
                sala con quien esté en la misma situación.
              </span>
              <div className="mt-3 flex flex-col gap-2">
                {EQUIPO_FORM.map((t) => (
                  <label
                    className="text-body-sm flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 transition-colors hover:border-aisc-forest/45 has-checked:border-aisc-forest has-checked:bg-aisc-forest/6"
                    key={t.id}
                  >
                    <input
                      type="radio"
                      name="hubTeam"
                      value={t.id}
                      checked={v.hubTeam === t.id}
                      onChange={() => set("hubTeam", t.id)}
                      className="mt-0.5 accent-aisc-forest"
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
              {errores.hubTeam ? (
                <span className={ERROR} role="alert">
                  {errores.hubTeam}
                </span>
              ) : null}
            </fieldset>

            {v.hubTeam === "equipo" ? (
              <Campo
                requerido
                name="hubTeamNames"
                label="¿Con quiénes aplicas?"
                ayuda="Nombre y correo de cada persona del equipo. Cada una tiene que llenar este formulario por su lado."
                error={errores.hubTeamNames}
              >
                <textarea {...areaProps("hubTeamNames", 4)} />
                {contador("hubTeamNames")}
              </Campo>
            ) : null}

            <fieldset>
              <legend className={ETIQUETA}>
                ¿Cómo llegarías a Bogotá?<span className="text-aisc-coral"> *</span>
              </legend>
              <span className={AYUDA}>
                Nos sirve para organizar. El viaje corre por tu cuenta: no cubrimos transporte ni alojamiento.
              </span>
              <div className="mt-3 flex flex-col gap-2">
                {VIAJE_FORM.map((t) => (
                  <label
                    className="text-body-sm flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 transition-colors hover:border-aisc-forest/45 has-checked:border-aisc-forest has-checked:bg-aisc-forest/6"
                    key={t.id}
                  >
                    <input
                      type="radio"
                      name="hubTravel"
                      value={t.id}
                      checked={v.hubTravel === t.id}
                      onChange={() => set("hubTravel", t.id)}
                      className="mt-0.5 accent-aisc-forest"
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
              {errores.hubTravel ? (
                <span className={ERROR} role="alert">
                  {errores.hubTravel}
                </span>
              ) : null}
            </fieldset>
          </div>
        </section>

        <section className={SECCION}>
          <h2 className="text-display-3 md:text-display-3-lg text-balance">Para que el fin de semana te sirva</h2>
          <div className="mt-6 flex flex-col gap-6">
            <Campo
              name="hubAccess"
              label="¿Necesitas algo para poder participar?"
              ayuda="Restricciones de alimentación, accesibilidad, horarios, cuidado de alguien. Lo que nos digas acá lo tenemos en cuenta al organizar."
              error={errores.hubAccess}
            >
              <textarea {...areaProps("hubAccess", 3)} />
              {contador("hubAccess")}
            </Campo>
            <Campo
              name="hubExtra"
              label="¿Algo más que quieras contarnos?"
              ayuda="Opcional de verdad. Si no se te ocurre nada, déjalo en blanco."
              error={errores.hubExtra}
            >
              <textarea {...areaProps("hubExtra", 3)} />
              {contador("hubExtra")}
            </Campo>
          </div>
        </section>

        <section className={SECCION}>
          <h2 className="text-display-3 md:text-display-3-lg text-balance">Antes de enviar</h2>
          <label
            className="text-body-sm mt-6 flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border border-aisc-line bg-white px-4 py-4 transition-colors hover:border-aisc-forest/45 has-checked:border-aisc-forest has-checked:bg-aisc-forest/6"
            htmlFor="aiConfirm"
          >
            <input
              id="aiConfirm"
              name="aiConfirm"
              type="checkbox"
              checked={v.aiConfirm === "si"}
              onChange={(e) => set("aiConfirm", e.target.checked ? "si" : "")}
              className="mt-0.5 accent-aisc-forest"
            />
            <span>
              Las respuestas de esta aplicación las escribí yo. Pude usar un modelo para corregir la redacción, pero el
              razonamiento es mío.
            </span>
          </label>
          {errores.aiConfirm ? (
            <span className={ERROR} role="alert">
              {errores.aiConfirm}
            </span>
          ) : null}
          <p className="text-meta mt-4 text-aisc-muted">
            Usamos lo que nos cuentas para la selección y para organizar el fin de semana. Si quedas seleccionado,
            compartimos tu nombre, en qué andas y el frente que escogiste con el resto de participantes, que es como se
            arman los equipos de quienes aplican solos. Tu correo y lo que nos digas en las dos últimas preguntas no
            salen de nosotros. Si quieres que borremos tus datos, escríbenos a{" "}
            <a className={ENLACE} href="mailto:contacto@aisafetycolombia.org">
              contacto@aisafetycolombia.org
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-aisc-line pt-8">
        <button
          className="text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-7 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={estado === "enviando"}
          type="submit"
        >
          {estado === "enviando" ? "Enviando…" : "Enviar aplicación"}
        </button>
        <span className="text-meta text-aisc-muted">
          Lo que escribes se guarda en este navegador mientras no lo envíes.
        </span>
      </div>
    </form>
  );
}
