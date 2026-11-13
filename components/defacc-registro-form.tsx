"use client";

import { useState } from "react";

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

type Track = { id: string; titulo: string };
type Fila = { nombre: string; correo: string };

export default function DefAccRegistroForm({ tracks, bypass }: { tracks: Track[]; bypass: string }) {
  const [equipo, setEquipo] = useState("");
  const [track, setTrack] = useState("");
  const [integrantes, setIntegrantes] = useState<Fila[]>([
    { nombre: "", correo: "" },
    { nombre: "", correo: "" },
  ]);
  const [website, setWebsite] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<{ mensaje: string; campo?: string } | null>(null);
  const [listo, setListo] = useState<string | null>(null);

  function cambiar(i: number, campo: keyof Fila, valor: string) {
    setIntegrantes((xs) => xs.map((x, j) => (j === i ? { ...x, [campo]: valor } : x)));
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const r = await fetch("/api/defacc/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equipo, track, integrantes, website, bypass }),
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; mensaje?: string; campo?: string };
      if (!r.ok || !j.ok) {
        setError({ mensaje: j.mensaje ?? "Algo falló. Intenten de nuevo.", campo: j.campo });
      } else {
        setListo(equipo);
      }
    } catch {
      setError({ mensaje: "No hubo conexión. Intenten de nuevo." });
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <div className={TARJETA}>
        <h2 className="text-display-3 text-aisc-ink">¡Listo, {listo}!</h2>
        <p className="text-body mt-4 text-aisc-ink">
          Quedaron registrados. Les llega un correo con un enlace para entregar a las 5:00 p. m. que ya trae su
          nombre, track e integrantes.
        </p>
        <p className="text-body mt-3 text-aisc-ink">
          A las 2:00 p. m. publicamos el orden de los pitches en el grupo de WhatsApp y en la guía.
        </p>
      </div>
    );
  }

  const mal = (campo: string) => error?.campo === campo;

  return (
    <form onSubmit={enviar} className={`${TARJETA} flex flex-col gap-7`} noValidate>
      <p className={NOTA}>
        Un solo registro por equipo. Toma un minuto.
      </p>

      <label className="block">
        <span className={ETIQUETA}>Nombre del equipo</span>
        <input
          className={`${INPUT} mt-2 ${mal("equipo") ? INPUT_MAL : ""}`}
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          maxLength={80}
          required
        />
        {mal("equipo") && <span className={ERROR}>{error?.mensaje}</span>}
      </label>

      <label className="block">
        <span className={ETIQUETA}>Track</span>
        <span className="relative mt-2 block">
          <select
            className={`${SELECT} ${mal("track") ? INPUT_MAL : ""}`}
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            required
          >
            <option value="">Elijan un track</option>
            {tracks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titulo}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-aisc-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M5 7.5l5 5 5-5" />
          </svg>
        </span>
        <span className={AYUDA}>Si cambian de track antes de entregar, lo ajustan en el formulario de entrega.</span>
        {mal("track") && <span className={ERROR}>{error?.mensaje}</span>}
      </label>

      <fieldset>
        <legend className={ETIQUETA}>Integrantes (2 a 5)</legend>
        <div className="mt-2 flex flex-col gap-2">
          {integrantes.map((x, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <input
                className={`${INPUT} ${mal("integrantes") ? INPUT_MAL : ""}`}
                placeholder="Nombre"
                value={x.nombre}
                onChange={(e) => cambiar(i, "nombre", e.target.value)}
                maxLength={120}
              />
              <input
                className={`${INPUT} ${mal("integrantes") ? INPUT_MAL : ""}`}
                placeholder="Correo"
                type="email"
                value={x.correo}
                onChange={(e) => cambiar(i, "correo", e.target.value)}
                maxLength={200}
              />
              {integrantes.length > 2 ? (
                <button
                  type="button"
                  className="text-body-sm px-2 text-aisc-muted hover:text-aisc-coral"
                  onClick={() => setIntegrantes((xs) => xs.filter((_, j) => j !== i))}
                  aria-label={`Quitar integrante ${i + 1}`}
                >
                  Quitar
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
            className="text-body-sm mt-3 font-medium text-aisc-forest hover:underline"
            onClick={() => setIntegrantes((xs) => [...xs, { nombre: "", correo: "" }])}
          >
            + agregar integrante
          </button>
        )}
        {mal("integrantes") && <span className={ERROR}>{error?.mensaje}</span>}
      </fieldset>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden
      />

      {error && !error.campo && <p className="text-body-sm text-aisc-coral">{error.mensaje}</p>}

      <div>
        <button type="submit" className={BOTON_LLENO} disabled={enviando}>
          {enviando ? "Registrando…" : "Registrar equipo"}
        </button>
      </div>
    </form>
  );
}
