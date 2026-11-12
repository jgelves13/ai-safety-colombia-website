"use client";

import { useState } from "react";

/* Rejilla de /defacchackathon/participantes. Misma estructura que la del sprint.
   Solo entran quienes confirmaron que vienen y aceptaron salir en la lista
   (defacc_confirmations con attending y listed). El frente sale de la
   aplicación de cada persona y no es definitivo. Sin correo, WhatsApp ni LinkedIn. */

type Frente = "track-1" | "track-2" | "track-3" | "track-4" | "track-5" | "track-6";

const FRENTES: Record<Frente, string> = {
  "track-1": "Seguridad de agentes",
  "track-2": "Control y monitoreo",
  "track-3": "Ciberdefensa automatizada",
  "track-4": "Defensa epistémica",
  "track-5": "Infraestructura y gobernanza",
  "track-6": "Riesgos multiagente",
};

type Participante = {
  nombre: string;
  afiliacion?: string;
  frente?: Frente;
  problema?: string;
};

const PARTICIPANTES: Participante[] = [
  {
    nombre: "Adrian Alejandro Espinosa Zambrano",
    afiliacion: "Netdata",
    frente: "track-1",
    problema:
      "Un auditor sencillo que revise las descripciones de herramientas MCP antes de que el agente las vea, para detectar órdenes ocultas que lo lleven a leer secretos, alterar argumentos o enviar datos a terceros.",
  },
  {
    nombre: "Cesar Rivas",
    afiliacion: "Niawi Tech",
    frente: "track-3",
    problema:
      "Agentes de ciberdefensa para servidores VPS sin monitoreo, que no solo alerten temprano sino que contengan la amenaza antes de que el servidor quede comprometido.",
  },
  {
    nombre: "José Leonardo Pinilla Zamora",
    afiliacion: "Universidad Nacional",
    frente: "track-1",
    problema:
      "Un sistema con varias capas de guardas contra la inyección de instrucciones en agentes y RAG, con monitoreo de la seguridad del modelo.",
  },
  {
    nombre: "Julian Lizcano",
    afiliacion: "Independiente",
    problema:
      "Ataques de denegación de servicio a modelos de IA: entradas diseñadas para consumir la mayor cantidad posible de cómputo.",
  },
  {
    nombre: "Julio Alfonso Rodriguez Buelvas",
    afiliacion: "Pragma",
    frente: "track-2",
    problema:
      "Tener certeza de cómo razona el modelo y de si está configurado para filtrar información.",
  },
  {
    nombre: "Laura Sofía Londoño Pérez",
    afiliacion: "Universidad Sergio Arboleda",
    frente: "track-2",
    problema:
      "Un escáner que revise plugins y contenido antes de que un agente los use, y alerte sobre instrucciones ocultas o destinos sospechosos.",
  },
  {
    nombre: "Michael David Rodriguez Beltran",
    afiliacion: "SmartSoft Colombia",
    frente: "track-3",
    problema:
      "Cruzar automáticamente cada CVE nueva del NIST con el inventario de software de la empresa, avisar a los afectados y proponer los pasos para parchear.",
  },
  {
    nombre: "Sadid Romero",
    afiliacion: "BASF",
    frente: "track-4",
    problema:
      "Clarity Web, una extensión de navegador que detecta estafas, suplantaciones e información engañosa y las explica en lenguaje sencillo para personas con necesidades cognitivas diversas.",
  },
];

const CONTEO = (Object.keys(FRENTES) as Frente[])
  .map((id) => ({
    id,
    label: FRENTES[id],
    total: PARTICIPANTES.filter((p) => p.frente === id).length,
  }))
  .filter((f) => f.total > 0)
  .sort((a, b) => b.total - a.total);

const SIN_FRENTE = "Sin frente definido";
const TOTAL_SIN_FRENTE = PARTICIPANTES.filter((p) => !p.frente).length;

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

export default function RejillaParticipantes() {
  const [filtro, setFiltro] = useState<Frente | "todos" | "sin-frente">("todos");
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
