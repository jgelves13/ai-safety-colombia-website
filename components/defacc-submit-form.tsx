"use client";

import { useMemo, useState } from "react";
import type { Idioma } from "@/lib/idiomas";

/* Formulario de entrega de proyectos del DefAcc Hackathon. Envía multipart a
   /api/defacc/entregar. Un envío por equipo, sin edición por parte de
   participantes (como la plantilla V4 de Apart). Correcciones por correo antes
   del cierre. */

type Estado = "abierto" | "noIniciado" | "cerrado";
type Track = { id: string; titulo: string };
type Integrante = { nombre: string; correo: string };

type Textos = {
  noIniciado: string;
  cerrado: string;
  intro: string;
  equipo: string;
  equipoAyuda: string;
  titulo: string;
  track: string;
  elegir: string;
  resumen: string;
  resumenAyuda: string;
  palabras: (n: number) => string;
  enlace: string;
  enlaceAyuda: string;
  integrantes: string;
  integrantesAyuda: string;
  nombre: string;
  correo: string;
  agregar: string;
  quitar: string;
  pdf: string;
  pdfAyuda: string;
  enviar: string;
  enviando: string;
  listoTitulo: string;
  listoTexto: string;
  errores: Record<string, string>;
};

const TEXTOS: Record<Idioma, Textos> = {
  es: {
    noIniciado: "Las entregas abren el sábado 14 de noviembre a las 7:00 a. m. (hora de Colombia).",
    cerrado: "Las entregas cerraron el sábado 14 de noviembre a las 5:00 p. m. (hora de Colombia).",
    intro:
      "Un solo envío por equipo. Revisen todo antes de enviar; si necesitan corregir algo, escríbannos al correo del hackathon antes del cierre (5:00 p. m.).",
    equipo: "Nombre del equipo",
    equipoAyuda: "Identifica su entrega.",
    titulo: "Título del proyecto",
    track: "Track",
    elegir: "Elijan un track",
    resumen: "Resumen",
    resumenAyuda: "Entre 150 y 250 palabras: el problema, lo que construyeron y qué evidencia tienen.",
    palabras: (n) => `${n} palabras`,
    enlace: "Enlace al repositorio o demo",
    enlaceAyuda: "GitHub, Colab, Drive o similar. Que sea accesible sin pedir permiso.",
    integrantes: "Integrantes",
    integrantesAyuda: "Entre 2 y 5 personas, con el correo con el que se postularon.",
    nombre: "Nombre",
    correo: "Correo",
    agregar: "Agregar integrante",
    quitar: "Quitar",
    pdf: "Ficha técnica (PDF, máximo 2 páginas)",
    pdfAyuda: "Obligatoria. Máximo 10 MB.",
    enviar: "Enviar entrega",
    enviando: "Enviando…",
    listoTitulo: "Entrega recibida",
    listoTexto:
      "Les enviamos una confirmación al correo de cada integrante. Si necesitan corregir algo, escríbannos antes del cierre.",
    errores: {},
  },
  en: {
    noIniciado: "Submissions open Saturday, November 14 at 7:00 a.m. (Colombia time).",
    cerrado: "Submissions closed Saturday, November 14 at 5:00 p.m. (Colombia time).",
    intro:
      "One submission per team. Review everything before submitting; if you need to correct something, email the hackathon address before the deadline (5:00 p.m.).",
    equipo: "Team name",
    equipoAyuda: "Identifies your submission.",
    titulo: "Project title",
    track: "Track",
    elegir: "Choose a track",
    resumen: "Summary",
    resumenAyuda: "Between 150 and 250 words: the problem, what you built and what evidence you have.",
    palabras: (n) => `${n} words`,
    enlace: "Repository or demo link",
    enlaceAyuda: "GitHub, Colab, Drive or similar. It must be accessible without requesting access.",
    integrantes: "Team members",
    integrantesAyuda: "Between 2 and 5 people, with the email they applied with.",
    nombre: "Name",
    correo: "Email",
    agregar: "Add member",
    quitar: "Remove",
    pdf: "Technical brief (PDF, 2 pages max)",
    pdfAyuda: "Required. 10 MB max.",
    enviar: "Submit project",
    enviando: "Submitting…",
    listoTitulo: "Submission received",
    listoTexto:
      "We sent a confirmation to each member's email. If you need to correct something, email us before the deadline.",
    errores: {
      limite: "Too many attempts. Wait a few minutes and try again.",
      cerrado: "Submissions are not open right now.",
      almacenamiento: "We could not save your submission. Please try again.",
      equipo: "Enter the team name.",
      titulo: "Enter the project title.",
      track: "Choose a track.",
      resumen: "The summary must be between 150 and 250 words.",
      enlace: "The link must start with http:// or https://.",
      integrantes: "You need 2 to 5 members, each with a name and a valid email.",
      pdf: "Attach the technical brief as a PDF of 10 MB or less.",
      red: "Connection problem. Check your internet and try again.",
    },
  },
  pt: {
    noIniciado: "As entregas abrem no sábado, 14 de novembro, às 7h (horário da Colômbia).",
    cerrado: "As entregas fecharam no sábado, 14 de novembro, às 17h (horário da Colômbia).",
    intro:
      "Uma única entrega por equipe. Revisem tudo antes de enviar; se precisarem corrigir algo, escrevam para o e-mail do hackathon antes do prazo (17h).",
    equipo: "Nome da equipe",
    equipoAyuda: "Identifica a entrega.",
    titulo: "Título do projeto",
    track: "Frente",
    elegir: "Escolham uma frente",
    resumen: "Resumo",
    resumenAyuda: "Entre 150 e 250 palavras: o problema, o que construíram e que evidência têm.",
    palabras: (n) => `${n} palavras`,
    enlace: "Link do repositório ou demo",
    enlaceAyuda: "GitHub, Colab, Drive ou similar. Deve estar acessível sem pedir permissão.",
    integrantes: "Integrantes",
    integrantesAyuda: "Entre 2 e 5 pessoas, com o e-mail usado na inscrição.",
    nombre: "Nome",
    correo: "E-mail",
    agregar: "Adicionar integrante",
    quitar: "Remover",
    pdf: "Ficha técnica (PDF, até 2 páginas)",
    pdfAyuda: "Obrigatória. Máximo 10 MB.",
    enviar: "Enviar entrega",
    enviando: "Enviando…",
    listoTitulo: "Entrega recebida",
    listoTexto:
      "Enviamos uma confirmação para o e-mail de cada integrante. Se precisarem corrigir algo, escrevam antes do prazo.",
    errores: {
      limite: "Muitas tentativas. Esperem alguns minutos e tentem de novo.",
      cerrado: "As entregas não estão abertas agora.",
      almacenamiento: "Não conseguimos salvar a entrega. Tentem de novo.",
      equipo: "Escrevam o nome da equipe.",
      titulo: "Escrevam o título do projeto.",
      track: "Escolham uma frente.",
      resumen: "O resumo deve ter entre 150 e 250 palavras.",
      enlace: "O link deve começar com http:// ou https://.",
      integrantes: "São necessários de 2 a 5 integrantes, cada um com nome e e-mail válido.",
      pdf: "Anexem a ficha técnica em PDF de até 10 MB.",
      red: "Problema de conexão. Verifiquem a internet e tentem de novo.",
    },
  },
};

const INPUT =
  "text-body-sm w-full rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 text-aisc-ink transition-colors placeholder:text-aisc-muted/60 focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/35";
const INPUT_MAL = "border-aisc-coral focus:border-aisc-coral focus:outline-aisc-coral/35";
const SELECT = `${INPUT} cursor-pointer appearance-none pr-10`;
const ETIQUETA = "text-body-sm block font-medium text-aisc-ink";
const AYUDA = "text-meta mt-1 block text-aisc-muted";
const ERROR = "text-meta mt-1.5 block text-aisc-coral";
const NOTA = "text-body-sm max-w-[640px] text-aisc-muted";
const BOTON_LLENO =
  "text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85 disabled:opacity-60";
const TARJETA = "rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9 lg:p-11";

function contarPalabras(texto: string): number {
  const t = texto.trim();
  return t ? t.split(/\s+/).length : 0;
}

export default function DefAccSubmitForm({
  idioma = "es",
  estado,
  tracks,
  bypass,
  inicial,
}: {
  idioma?: Idioma;
  estado: Estado;
  tracks: Track[];
  bypass?: string;
  inicial?: { equipo: string; track: string; integrantes: Integrante[] };
}) {
  const t = TEXTOS[idioma];
  const [equipo, setEquipo] = useState(inicial?.equipo ?? "");
  const [titulo, setTitulo] = useState("");
  const [track, setTrack] = useState(inicial?.track ?? "");
  const [resumen, setResumen] = useState("");
  const [enlace, setEnlace] = useState("");
  const [integrantes, setIntegrantes] = useState<Integrante[]>(() => {
    const filas = (inicial?.integrantes ?? []).map((i) => ({ nombre: i.nombre, correo: i.correo }));
    while (filas.length < 2) filas.push({ nombre: "", correo: "" });
    return filas;
  });
  const [pdf, setPdf] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<{ mensaje: string; campo?: string } | null>(null);
  const [listo, setListo] = useState(false);

  const palabras = useMemo(() => contarPalabras(resumen), [resumen]);
  const palabrasOk = palabras >= 150 && palabras <= 250;

  if (estado !== "abierto" && !bypass) {
    return (
      <div className={TARJETA}>
        <p className="text-body md:text-body-lg text-aisc-ink">{estado === "noIniciado" ? t.noIniciado : t.cerrado}</p>
      </div>
    );
  }

  if (listo) {
    return (
      <div className={`${TARJETA} flex flex-col gap-5`}>
        <h2 className="text-display-3 md:text-display-3-lg text-balance">{t.listoTitulo}</h2>
        <p className="text-body text-aisc-ink">{t.listoTexto}</p>
      </div>
    );
  }

  const malEn = (campo: string) => error?.campo === campo;

  function cambiarIntegrante(i: number, campo: keyof Integrante, valor: string) {
    setIntegrantes((xs) => xs.map((x, j) => (j === i ? { ...x, [campo]: valor } : x)));
  }

  async function enviar(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (enviando) return;
    setError(null);
    if (!pdf) {
      setError({ mensaje: t.errores.pdf || "Adjunten la ficha técnica en PDF.", campo: "pdf" });
      return;
    }
    const fd = new FormData();
    fd.set("equipo", equipo);
    fd.set("titulo", titulo);
    fd.set("track", track);
    fd.set("resumen", resumen);
    fd.set("enlace", enlace);
    fd.set("integrantes", JSON.stringify(integrantes));
    fd.set("website", (ev.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "");
    if (bypass) fd.set("bypass", bypass);
    fd.set("pdf", pdf);
    setEnviando(true);
    try {
      const r = await fetch("/api/defacc/entregar", { method: "POST", body: fd });
      const d = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        mensaje?: string;
        campo?: string;
      };
      if (r.ok && d.ok) {
        setListo(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const local =
          (d.error === "campo" && d.campo && t.errores[d.campo]) || (d.error && t.errores[d.error]) || "";
        setError({ mensaje: local || d.mensaje || t.errores.red || "Error", campo: d.campo });
      }
    } catch {
      setError({ mensaje: t.errores.red || "No pudimos conectar. Revisen su internet e intenten de nuevo." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-7" noValidate>
      <p className={NOTA}>{t.intro}</p>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="block">
        <span className={ETIQUETA}>{t.equipo}</span>
        <input
          className={`${INPUT} mt-2 ${malEn("equipo") ? INPUT_MAL : ""}`}
          value={equipo}
          maxLength={80}
          required
          onChange={(e) => setEquipo(e.target.value)}
        />
        <span className={AYUDA}>{t.equipoAyuda}</span>
      </label>

      <label className="block">
        <span className={ETIQUETA}>{t.titulo}</span>
        <input
          className={`${INPUT} mt-2 ${malEn("titulo") ? INPUT_MAL : ""}`}
          value={titulo}
          maxLength={160}
          required
          onChange={(e) => setTitulo(e.target.value)}
        />
      </label>

      <label className="block">
        <span className={ETIQUETA}>{t.track}</span>
        <span className="relative mt-2 block">
          <select
            className={`${SELECT} ${malEn("track") ? INPUT_MAL : ""}`}
            value={track}
            required
            onChange={(e) => setTrack(e.target.value)}
          >
            <option value="">{t.elegir}</option>
            {tracks.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {tr.titulo}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-aisc-muted"
          >
            <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
      </label>

      <label className="block">
        <span className={ETIQUETA}>{t.resumen}</span>
        <textarea
          className={`${INPUT} mt-2 min-h-56 ${malEn("resumen") ? INPUT_MAL : ""}`}
          value={resumen}
          required
          onChange={(e) => setResumen(e.target.value)}
        />
        <span className="mt-1 flex justify-between gap-4">
          <span className="text-meta text-aisc-muted">{t.resumenAyuda}</span>
          <span className={`text-meta shrink-0 ${palabras === 0 || palabrasOk ? "text-aisc-muted" : "text-aisc-coral"}`}>
            {t.palabras(palabras)}
          </span>
        </span>
      </label>

      <label className="block">
        <span className={ETIQUETA}>{t.enlace}</span>
        <input
          type="url"
          inputMode="url"
          className={`${INPUT} mt-2 ${malEn("enlace") ? INPUT_MAL : ""}`}
          value={enlace}
          maxLength={500}
          placeholder="https://"
          required
          onChange={(e) => setEnlace(e.target.value)}
        />
        <span className={AYUDA}>{t.enlaceAyuda}</span>
      </label>

      <fieldset>
        <legend className={ETIQUETA}>{t.integrantes}</legend>
        <span className={AYUDA}>{t.integrantesAyuda}</span>
        <div className="mt-3 flex flex-col gap-3">
          {integrantes.map((x, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <input
                className={`${INPUT} ${malEn("integrantes") ? INPUT_MAL : ""}`}
                placeholder={t.nombre}
                aria-label={`${t.nombre} ${i + 1}`}
                value={x.nombre}
                maxLength={120}
                onChange={(e) => cambiarIntegrante(i, "nombre", e.target.value)}
              />
              <input
                type="email"
                className={`${INPUT} ${malEn("integrantes") ? INPUT_MAL : ""}`}
                placeholder={t.correo}
                aria-label={`${t.correo} ${i + 1}`}
                value={x.correo}
                maxLength={200}
                onChange={(e) => cambiarIntegrante(i, "correo", e.target.value)}
              />
              {integrantes.length > 2 ? (
                <button
                  type="button"
                  className="text-meta px-2 text-aisc-muted underline underline-offset-[3px] hover:text-aisc-coral"
                  onClick={() => setIntegrantes((xs) => xs.filter((_, j) => j !== i))}
                >
                  {t.quitar}
                </button>
              ) : (
                <span className="hidden sm:block" />
              )}
            </div>
          ))}
        </div>
        {integrantes.length < 5 && (
          <button
            type="button"
            className="text-body-sm mt-3 text-aisc-forest underline underline-offset-[3px] hover:text-aisc-forest-deep"
            onClick={() => setIntegrantes((xs) => [...xs, { nombre: "", correo: "" }])}
          >
            + {t.agregar}
          </button>
        )}
      </fieldset>

      <label className="block">
        <span className={ETIQUETA}>{t.pdf}</span>
        <input
          type="file"
          accept="application/pdf,.pdf"
          className={`${INPUT} mt-2 file:mr-3 file:rounded-full file:border-0 file:bg-aisc-ink file:px-4 file:py-1.5 file:text-aisc-cream ${malEn("pdf") ? INPUT_MAL : ""}`}
          onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
        />
        <span className={AYUDA}>{t.pdfAyuda}</span>
      </label>

      {error && (
        <p className={ERROR} role="alert">
          {error.mensaje}
        </p>
      )}

      <div>
        <button type="submit" className={BOTON_LLENO} disabled={enviando}>
          {enviando ? t.enviando : t.enviar}
        </button>
      </div>
    </form>
  );
}
