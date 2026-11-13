"use client";

import { useState } from "react";

type Clave = "impacto" | "ejecucion" | "presentacion";
const CLAVES: Clave[] = ["impacto", "ejecucion", "presentacion"];

export type CriterioJuez = {
  nombre: string;
  descripcion: string;
  niveles?: { n1: string; n3: string; n5: string };
};

export type PuntajeInicial = {
  impacto: number | null;
  ejecucion: number | null;
  presentacion: number | null;
  comentario: string;
  abstiene: boolean;
  noElegible: boolean;
  actualizado: string;
} | null;

const BOTON_LLENO =
  "text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85 disabled:opacity-60";
const INPUT =
  "text-body-sm w-full rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 text-aisc-ink transition-colors placeholder:text-aisc-muted/60 focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/35";

function hora(iso: string): string {
  return new Date(iso).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    hour: "numeric",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  });
}

export default function DefAccJudgeForm({
  token,
  slug,
  criterios,
  inicial,
}: {
  token: string;
  slug: string;
  criterios: CriterioJuez[];
  inicial: PuntajeInicial;
}) {
  const [notas, setNotas] = useState<Record<Clave, number | null>>({
    impacto: inicial?.impacto ?? null,
    ejecucion: inicial?.ejecucion ?? null,
    presentacion: inicial?.presentacion ?? null,
  });
  const [comentario, setComentario] = useState(inicial?.comentario ?? "");
  const [abstiene, setAbstiene] = useState(inicial?.abstiene ?? false);
  const [noElegible, setNoElegible] = useState(inicial?.noElegible ?? false);
  const [enviando, setEnviando] = useState(false);
  const [guardado, setGuardado] = useState<string | null>(inicial?.actualizado ?? null);
  const [error, setError] = useState<string | null>(null);
  const [cambios, setCambios] = useState(false);

  const total = CLAVES.every((c) => notas[c] !== null)
    ? CLAVES.reduce((s, c) => s + (notas[c] ?? 0), 0)
    : null;

  function tocado() {
    setCambios(true);
    setError(null);
  }

  async function guardar() {
    setEnviando(true);
    setError(null);
    try {
      const r = await fetch("/api/defacc/puntaje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, slug, ...notas, comentario, abstiene, noElegible }),
      });
      const j = (await r.json()) as { ok: boolean; mensaje?: string; puntaje?: { actualizado: string } };
      if (!j.ok) {
        setError(j.mensaje ?? "No se pudo guardar.");
      } else {
        setGuardado(j.puntaje?.actualizado ?? new Date().toISOString());
        setCambios(false);
      }
    } catch {
      setError("Sin conexión. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 border-t border-aisc-line pt-4">
      {!abstiene ? (
        <>
          {CLAVES.map((clave, i) => {
            const c = criterios[i];
            if (!c) return null;
            return (
              <fieldset key={clave} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <legend className="sr-only">{c.nombre}</legend>
                <span className="text-body-sm w-28 font-medium text-aisc-ink" title={c.descripcion}>
                  {c.nombre}
                </span>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const activo = notas[clave] === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        aria-pressed={activo}
                        aria-label={`${c.nombre}: ${n}`}
                        onClick={() => {
                          setNotas((prev) => ({ ...prev, [clave]: n }));
                          tocado();
                        }}
                        className={`text-body-sm size-11 rounded-full border font-medium transition-colors ${
                          activo
                            ? "border-aisc-forest bg-aisc-forest text-aisc-cream"
                            : "border-aisc-line bg-white text-aisc-ink hover:border-aisc-forest"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
          <details className="text-meta text-aisc-muted">
            <summary className="cursor-pointer">¿Qué significa cada nota?</summary>
            <ul className="mt-2 flex flex-col gap-2">
              {criterios.slice(0, CLAVES.length).map((c) => (
                <li key={c.nombre}>
                  <span className="font-medium text-aisc-ink">{c.nombre}:</span> {c.descripcion}
                  {c.niveles ? (
                    <span className="block">
                      1: {c.niveles.n1} · 3: {c.niveles.n3} · 5: {c.niveles.n5}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </details>
        </>
      ) : null}

      <div className="text-meta flex flex-wrap gap-x-6 gap-y-2 text-aisc-muted">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={abstiene}
            onChange={(e) => {
              setAbstiene(e.target.checked);
              tocado();
            }}
            className="size-4 accent-aisc-forest"
          />
          Me abstengo (conflicto de interés o tema fuera de mi área)
        </label>
        {!abstiene ? (
          <label className="flex items-center gap-2" title="Habilita ataques más que defensa. Queda fuera del ranking.">
            <input
              type="checkbox"
              checked={noElegible}
              onChange={(e) => {
                setNoElegible(e.target.checked);
                tocado();
              }}
              className="size-4 accent-aisc-coral"
            />
            No elegible (ofensivo)
          </label>
        ) : null}
      </div>

      <label className="flex flex-col gap-2">
        <span className="sr-only">Comentario</span>
        <textarea
          value={comentario}
          maxLength={3000}
          rows={2}
          placeholder="Comentario (opcional)"
          onChange={(e) => {
            setComentario(e.target.value);
            tocado();
          }}
          className={INPUT}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={guardar} disabled={enviando} className={BOTON_LLENO}>
          {enviando ? "Guardando…" : "Guardar"}
        </button>
        {!abstiene && total !== null ? <span className="text-body-sm text-aisc-ink">{total} / 15</span> : null}
        {guardado && !cambios ? <span className="text-meta text-aisc-forest">Guardado {hora(guardado)}</span> : null}
        {cambios ? <span className="text-meta text-aisc-muted">Cambios sin guardar</span> : null}
        {error ? <span className="text-meta text-aisc-coral">{error}</span> : null}
      </div>
    </div>
  );
}
