"use client";

import { useState } from "react";
import { FRENTES, type Frente, type Participante } from "./datos";

/* Rejilla de /defacchackathon/participantes. Misma estructura que la del sprint.
   Solo entran quienes confirmaron que vienen y aceptaron salir en la lista
   (defacc_confirmations con attending y listed). La lista llega armada desde
   el servidor (fuente.ts). El frente sale de la
   aplicación de cada persona y no es definitivo. Sin correo, WhatsApp ni LinkedIn. */

const SIN_FRENTE = "Sin frente definido";

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

function Filtro({
  activo,
  onClick,
  label,
  total,
}: {
  activo: boolean;
  onClick: () => void;
  label: string;
  total: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={
        "text-body-sm flex items-center gap-2 rounded-full border px-4 py-2 transition-colors " +
        (activo
          ? "border-aisc-forest bg-aisc-forest text-aisc-sand"
          : "border-aisc-forest/20 text-aisc-forest hover:border-aisc-forest/60")
      }
    >
      {label}
      <span className={activo ? "text-aisc-sand/60" : "text-aisc-muted"}>{total}</span>
    </button>
  );
}

export default function RejillaParticipantes({
  participantes: PARTICIPANTES,
}: {
  participantes: Participante[];
}) {
  const [filtro, setFiltro] = useState<Frente | "todos" | "sin-frente">("todos");
  const CONTEO = (Object.keys(FRENTES) as Frente[])
    .map((id) => ({
      id,
      label: FRENTES[id],
      total: PARTICIPANTES.filter((p) => p.frente === id).length,
    }))
    .filter((f) => f.total > 0)
    .sort((a, b) => b.total - a.total);
  const TOTAL_SIN_FRENTE = PARTICIPANTES.filter((p) => !p.frente).length;

  if (PARTICIPANTES.length === 0) {
    return (
      <p className="text-body mt-12 text-aisc-muted md:mt-14">
        Todavía no hay personas en la lista. Vuelve a revisar en un rato.
      </p>
    );
  }

  const visibles =
    filtro === "todos"
      ? PARTICIPANTES
      : filtro === "sin-frente"
        ? PARTICIPANTES.filter((p) => !p.frente)
        : PARTICIPANTES.filter((p) => p.frente === filtro);

  return (
    <>
      <div className="mt-10 flex flex-col gap-3 md:mt-12">
        <span className="text-kicker text-aisc-muted">Filtrar por frente</span>
        <div className="flex flex-wrap gap-2">
          <Filtro
            activo={filtro === "todos"}
            onClick={() => setFiltro("todos")}
            label="Todos"
            total={PARTICIPANTES.length}
          />
          {CONTEO.map((f) => (
            <Filtro
              key={f.id}
              activo={filtro === f.id}
              onClick={() => setFiltro(f.id)}
              label={f.label}
              total={f.total}
            />
          ))}
          {TOTAL_SIN_FRENTE > 0 ? (
            <Filtro
              activo={filtro === "sin-frente"}
              onClick={() => setFiltro("sin-frente")}
              label={SIN_FRENTE}
              total={TOTAL_SIN_FRENTE}
            />
          ) : null}
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
        {visibles.map((p) => (
          <li key={p.nombre} className="flex flex-col gap-3">
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
              <span
                className="text-display-2 md:text-display-2-lg text-aisc-forest"
                aria-hidden="true"
              >
                {iniciales(p.nombre)}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-kicker mb-1 text-aisc-coral">
                {p.frente ? FRENTES[p.frente] : SIN_FRENTE}
              </span>
              <span className="text-display-4 font-semibold text-aisc-forest">{p.nombre}</span>
              {p.afiliacion ? (
                <span className="text-body-sm text-aisc-muted">{p.afiliacion}</span>
              ) : null}
              {p.problema ? <p className="text-body-sm mt-2 text-aisc-ink">{p.problema}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
