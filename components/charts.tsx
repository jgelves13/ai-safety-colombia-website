"use client";

/* Graficas del ensayo largo. Los datos NO son ilustrativos.
 *
 * Figuras 1 y 2: AI Benchmarking Hub de Epoch AI (CC BY), descargado de
 *   https://epoch.ai/data/benchmark_data.zip el 23-ago-2026. Ambas series son la
 *   frontera: para cada fecha, el mejor resultado publicado hasta ese momento.
 *   Cuando un mismo dia trae varias configuraciones del mismo modelo se queda la
 *   mejor. Los nombres, el error estandar y los intervalos vienen del mismo CSV.
 * Figura 3: Anthropic, System Card de Claude Sonnet 4.5, seccion 7.6.4.1.
 * Figura 4: AI Safety Field Map (sep-2025) y CNBC (feb-2026).
 * Figura 5: Grace et al. (2024), Tabla 2, y Forecasting Research Institute,
 *   Existential Persuasion Tournament, Tabla 9.
 *
 * Si se actualizan, hay que actualizar tambien las frases del texto que las citan. */

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** en el servidor no hay layout que medir */
const usarLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

const INK = "#211a12";
const MUTED = "#5a5044";
const LINE = "#e4d9c4";
const FOREST = "#1f4d32";
const CORAL = "#e5604d";

const NB = " ";
const MS_YEAR = 365.25 * 24 * 3600 * 1000;
const yearOf = (d: string) => Date.parse(d) / MS_YEAR + 1970;

const MESES = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];
const fecha = (d: string) => {
  const [a, m] = d.split("-");
  return `${MESES[Number(m) - 1]} ${a}`;
};
const coma = (v: number, dec = 1) => v.toFixed(dec).replace(".", ",");
const pct = (v: number, dec = 1) => `${coma(v, dec)}${NB}%`;
/** minutos a la unidad que se lee de un vistazo */
const dur = (min: number) => {
  if (min < 90) return `${Math.round(min)}${NB}min`;
  const h = min / 60;
  if (h < 40) return `${coma(h)}${NB}h`;
  return `${coma(h / 24)}${NB}días`;
};

/* --- envoltorio con tooltip ------------------------------------------------ */

type Fila = { k: string; v: string };
type Tip = { x: number; y: number; titulo: string; filas: Fila[]; nota?: string };

function Lienzo({
  W,
  H,
  etiqueta,
  tip,
  onMover,
  onSalir,
  children,
}: {
  W: number;
  H: number;
  etiqueta: string;
  tip: Tip | null;
  onMover?: (p: { x: number; y: number }) => void;
  onSalir?: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const marco = useRef<HTMLDivElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const coord = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return null;
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };

  /* la cajita se mide y se encaja dentro del lienzo, para que nunca salga cortada */
  usarLayout(() => {
    if (!tip || !marco.current || !caja.current) {
      if (pos) setPos(null);
      return;
    }
    const cw = marco.current.offsetWidth;
    const ch = marco.current.offsetHeight;
    const bw = caja.current.offsetWidth;
    const bh = caja.current.offsetHeight;
    const px = (tip.x / W) * cw;
    const py = (tip.y / H) * ch;
    const cabe = px + 16 + bw <= cw - 6;
    const x = Math.max(6, Math.min(cabe ? px + 16 : px - 16 - bw, cw - bw - 6));
    const y = Math.max(6, Math.min(py - bh / 2, ch - bh - 6));
    setPos({ x, y });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tip, W, H]);

  return (
    <div ref={marco} className="relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={etiqueta}
        onPointerMove={(e) => {
          const p = coord(e);
          if (p && onMover) onMover(p);
        }}
        onPointerDown={(e) => {
          const p = coord(e);
          if (p && onMover) onMover(p);
        }}
        onPointerLeave={() => onSalir?.()}
      >
        {children}
      </svg>
      {tip ? (
        <div
          ref={caja}
          className="pointer-events-none absolute z-20 w-[min(260px,calc(100%-12px))] rounded-md border border-aisc-line bg-aisc-sand/95 px-3 py-2.5 shadow-[0_4px_18px_rgba(33,26,18,0.14)]"
          style={{
            left: pos ? `${pos.x}px` : 0,
            top: pos ? `${pos.y}px` : 0,
            opacity: pos ? 1 : 0,
          }}
        >
          <p className="text-meta font-semibold text-aisc-ink">{tip.titulo}</p>
          <dl className="mt-1.5">
            {tip.filas.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-3 py-[1px]">
                <dt className="text-meta text-aisc-muted">{f.k}</dt>
                <dd className="text-meta tabular-nums text-aisc-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
          {tip.nota ? <p className="text-meta mt-1.5 leading-snug text-aisc-muted">{tip.nota}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

/** pista para quien no sabe que la grafica responde */
function Pista({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y} textAnchor="end" fontSize={11} fill={MUTED} opacity={0.75}>
      Pase el cursor por la gráfica para ver cada dato
    </text>
  );
}

/* --- Figura 1: GPQA Diamond ------------------------------------------------ */

type PuntoGpqa = { d: string; v: number; se: number; m: string; o: string };

/** frontera de GPQA Diamond: 198 preguntas de doctorado en biologia, fisica y quimica */
const GPQA: PuntoGpqa[] = [
  { d: "2023-03-14", v: 35.7, se: 2.4, m: "GPT-4", o: "OpenAI" },
  { d: "2023-11-06", v: 42.4, se: 2.4, m: "GPT-4 Turbo", o: "OpenAI" },
  { d: "2024-02-29", v: 47.2, se: 2.6, m: "Claude 3 Opus", o: "Anthropic" },
  { d: "2024-05-13", v: 48.9, se: 2.6, m: "GPT-4o", o: "OpenAI" },
  { d: "2024-06-20", v: 54.0, se: 2.8, m: "Claude 3.5 Sonnet", o: "Anthropic" },
  { d: "2024-09-12", v: 62.4, se: 2.7, m: "o1-mini", o: "OpenAI" },
  { d: "2024-12-17", v: 76.8, se: 3.0, m: "o1", o: "OpenAI" },
  { d: "2025-01-31", v: 77.0, se: 2.6, m: "o3-mini", o: "OpenAI" },
  { d: "2025-02-24", v: 79.7, se: 2.7, m: "Claude 3.7 Sonnet", o: "Anthropic" },
  { d: "2025-03-25", v: 83.8, se: 2.6, m: "Gemini 2.5 Pro (exp.)", o: "Google DeepMind" },
  { d: "2025-06-05", v: 84.8, se: 2.6, m: "Gemini 2.5 Pro (preview)", o: "Google DeepMind" },
  { d: "2025-06-17", v: 85.3, se: 2.1, m: "Gemini 2.5 Pro", o: "Google DeepMind" },
  { d: "2025-07-09", v: 87.0, se: 2.0, m: "Grok 4", o: "xAI" },
  { d: "2025-11-13", v: 87.6, se: 1.9, m: "GPT-5.1", o: "OpenAI" },
  { d: "2025-11-18", v: 92.6, se: 1.7, m: "Gemini 3 Pro (preview)", o: "Google DeepMind" },
  { d: "2026-02-19", v: 94.4, se: 1.6, m: "Gemini 3.1 Pro (preview)", o: "Google DeepMind" },
  { d: "2026-03-05", v: 94.6, se: 1.6, m: "GPT-5.4 Pro", o: "OpenAI" },
  { d: "2026-08-13", v: 94.8, se: 1.3, m: "Gemini 3.7 Flash", o: "Google DeepMind" },
];

/** doctores del area que OpenAI recluto para calibrar el subconjunto Diamond */
const HUMANO = 69.7;

export function GraficaGpqa() {
  const W = 900;
  const H = 444;
  const ML = 46;
  const MR = 18;
  const MT = 30;
  const MB = 70;
  const x0 = 2023.0;
  const x1 = 2026.9;
  const px = (d: string) => ML + ((yearOf(d) - x0) / (x1 - x0)) * (W - ML - MR);
  const py = (v: number) => MT + (1 - v / 100) * (H - MT - MB);
  const linea = GPQA.map((p) => `${px(p.d)},${py(p.v)}`).join(" ");
  const cruce = GPQA.find((p) => p.v > HUMANO)!;

  const [i, setI] = useState<number | null>(null);
  const sel = i === null ? null : GPQA[i];

  const mover = ({ x }: { x: number }) => {
    let k = 0;
    let dist = Infinity;
    GPQA.forEach((p, j) => {
      const d = Math.abs(px(p.d) - x);
      if (d < dist) {
        dist = d;
        k = j;
      }
    });
    setI(k);
  };

  const tip: Tip | null = sel
    ? {
        x: px(sel.d),
        y: py(sel.v),
        titulo: sel.m,
        filas: [
          { k: "Publicado", v: fecha(sel.d) },
          { k: "Quién lo hizo", v: sel.o },
          { k: "Aciertos", v: pct(sel.v) },
          { k: "Error estándar", v: `±${NB}${coma(sel.se)} pp` },
        ],
      }
    : null;

  return (
    <Lienzo
      W={W}
      H={H}
      etiqueta="Resultados en el examen GPQA Diamond, de 2023 a 2026, comparados con el desempeño de especialistas con doctorado"
      tip={tip}
      onMover={mover}
      onSalir={() => setI(null)}
    >
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={ML} x2={W - MR} y1={py(v)} y2={py(v)} stroke={LINE} strokeWidth={1} />
          <text x={ML - 10} y={py(v) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {v}%
          </text>
        </g>
      ))}
      <Pista x={W - MR} y={H - 8} />
      {[2023, 2024, 2025, 2026].map((y) => (
        <text key={y} x={px(`${y}-01-01`)} y={H - MB + 22} textAnchor="middle" fontSize={12} fill={MUTED}>
          {y}
        </text>
      ))}

      {/* franja de adivinanza al azar: cada pregunta trae cuatro opciones */}
      <rect x={ML} y={py(25)} width={W - ML - MR} height={py(0) - py(25)} fill={INK} opacity={0.04} />
      <text x={ML + 8} y={py(25) - 7} fontSize={12} fill={MUTED}>
        Responder al azar: 25%
      </text>

      {/* linea humana */}
      <line x1={ML} x2={W - MR} y1={py(HUMANO)} y2={py(HUMANO)} stroke={CORAL} strokeWidth={1.5} strokeDasharray="6 5" />
      <text x={W - MR} y={py(HUMANO) - 9} textAnchor="end" fontSize={13} fill={CORAL} fontWeight={600}>
        Especialistas con doctorado: 69,7%
      </text>

      {/* guia vertical del punto seleccionado */}
      {sel ? (
        <line x1={px(sel.d)} x2={px(sel.d)} y1={MT} y2={py(0)} stroke={MUTED} strokeWidth={1} opacity={0.35} />
      ) : null}

      <polyline points={linea} fill="none" stroke={FOREST} strokeWidth={2.5} strokeLinejoin="round" />
      {GPQA.map((p, j) => (
        <circle
          key={p.d + p.v}
          cx={px(p.d)}
          cy={py(p.v)}
          r={j === i ? 6 : 3.5}
          fill={j === i ? CORAL : FOREST}
          stroke={j === i ? "#fbf6ec" : "none"}
          strokeWidth={j === i ? 2 : 0}
        />
      ))}

      {/* anotaciones fijas, para quien solo mira */}
      <g opacity={i === null ? 1 : 0.25}>
        <circle cx={px(GPQA[0].d)} cy={py(GPQA[0].v)} r={5.5} fill="none" stroke={FOREST} strokeWidth={1.5} />
        <text x={px(GPQA[0].d) + 14} y={py(GPQA[0].v) + 4} fontSize={13} fill={INK}>
          mar-2023: 35,7%
        </text>
        <line x1={px(cruce.d)} x2={px(cruce.d)} y1={py(cruce.v) - 10} y2={py(100) - 6} stroke={MUTED} strokeWidth={1} />
        <text x={px(cruce.d) - 8} y={py(100) - 10} textAnchor="end" fontSize={13} fill={INK}>
          dic-2024: pasa la marca humana
        </text>
        <text x={px(GPQA[GPQA.length - 1].d) - 6} y={py(GPQA[GPQA.length - 1].v) + 22} textAnchor="end" fontSize={13} fill={INK}>
          ago-2026: 94,8%
        </text>
      </g>
    </Lienzo>
  );
}

/* --- Figura 2: horizonte temporal de METR ---------------------------------- */

type PuntoMetr = { d: string; v: number; lo: number; hi: number; h80: number | null; m: string; o: string };

/** frontera del horizonte temporal de METR, en minutos, con su intervalo del 95 % */
const HORIZONTE: PuntoMetr[] = [
  { d: "2023-03-14", v: 5.4, lo: 2.5, hi: 9.7, h80: null, m: "GPT-4", o: "OpenAI" },
  { d: "2023-11-06", v: 8.6, lo: 4.2, hi: 16.1, h80: null, m: "GPT-4 Turbo", o: "OpenAI" },
  { d: "2024-06-20", v: 18.7, lo: 9.5, hi: 34.4, h80: null, m: "Claude 3.5 Sonnet", o: "Anthropic" },
  { d: "2024-09-12", v: 22.2, lo: 11.6, hi: 40.8, h80: null, m: "o1-preview", o: "OpenAI" },
  { d: "2024-10-22", v: 29.6, lo: 14.0, hi: 59.1, h80: null, m: "Claude 3.5 Sonnet (oct.)", o: "Anthropic" },
  { d: "2024-12-17", v: 39.2, lo: 17.6, hi: 84.4, h80: null, m: "o1", o: "OpenAI" },
  { d: "2025-02-24", v: 60.4, lo: 33.4, hi: 107.3, h80: 12.1, m: "Claude 3.7 Sonnet", o: "Anthropic" },
  { d: "2025-04-16", v: 119.7, lo: 73.0, hi: 191.6, h80: 30.0, m: "o3", o: "OpenAI" },
  { d: "2025-08-07", v: 203.0, lo: 114.2, hi: 406.7, h80: 38.3, m: "GPT-5", o: "OpenAI" },
  { d: "2025-11-18", v: 224.3, lo: 136.9, hi: 387.5, h80: 54.1, m: "Gemini 3 Pro (preview)", o: "Google DeepMind" },
  { d: "2025-11-24", v: 293.0, lo: 160.5, hi: 638.6, h80: 49.4, m: "Claude Opus 4.5", o: "Anthropic" },
  { d: "2025-12-11", v: 352.2, lo: 191.3, hi: 862.3, h80: 66.0, m: "GPT-5.2", o: "OpenAI" },
  { d: "2026-02-05", v: 718.8, lo: 319.3, hi: 3949.8, h80: 69.9, m: "Claude Opus 4.6", o: "Anthropic" },
  { d: "2026-04-07", v: 1044.8, lo: 508.9, hi: 3304.3, h80: 185.9, m: "Claude Mythos (preview)", o: "Anthropic" },
];

const TICKS_H = [
  { v: 4, l: "4 min" },
  { v: 15, l: "15 min" },
  { v: 60, l: "1 hora" },
  { v: 240, l: "4 horas" },
  { v: 960, l: "16 horas" },
  { v: 3840, l: "2,7 días" },
];

export function GraficaHorizonte() {
  const W = 900;
  const H = 444;
  const ML = 68;
  const MR = 18;
  const MT = 26;
  const MB = 70;
  const x0 = 2023.0;
  const x1 = 2026.6;
  const lo = Math.log2(2.2);
  const hi = Math.log2(4400);
  const px = (d: string) => ML + ((yearOf(d) - x0) / (x1 - x0)) * (W - ML - MR);
  const py = (v: number) => MT + (1 - (Math.log2(v) - lo) / (hi - lo)) * (H - MT - MB);
  const linea = HORIZONTE.map((p) => `${px(p.d)},${py(p.v)}`).join(" ");

  const [i, setI] = useState<number | null>(null);
  const sel = i === null ? null : HORIZONTE[i];

  const mover = ({ x }: { x: number }) => {
    let k = 0;
    let dist = Infinity;
    HORIZONTE.forEach((p, j) => {
      const d = Math.abs(px(p.d) - x);
      if (d < dist) {
        dist = d;
        k = j;
      }
    });
    setI(k);
  };

  const tip: Tip | null = sel
    ? {
        x: px(sel.d),
        y: py(sel.v),
        titulo: sel.m,
        filas: [
          { k: "Publicado", v: fecha(sel.d) },
          { k: "Quién lo hizo", v: sel.o },
          { k: "Acierta la mitad de las veces", v: dur(sel.v) },
          { k: "Intervalo del 95 %", v: `${dur(sel.lo)} a ${dur(sel.hi)}` },
          ...(sel.h80 ? [{ k: "Acierta 4 de cada 5 veces", v: dur(sel.h80) }] : []),
        ],
      }
    : null;

  return (
    <Lienzo
      W={W}
      H={H}
      etiqueta="Duración de las tareas que un modelo completa con la mitad de aciertos, de 2023 a 2026, con su intervalo de confianza"
      tip={tip}
      onMover={mover}
      onSalir={() => setI(null)}
    >
      {TICKS_H.map((t) => (
        <g key={t.v}>
          <line x1={ML} x2={W - MR} y1={py(t.v)} y2={py(t.v)} stroke={LINE} strokeWidth={1} />
          <text x={ML - 10} y={py(t.v) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {t.l}
          </text>
        </g>
      ))}
      {[2023, 2024, 2025, 2026].map((y) => (
        <text key={y} x={px(`${y}-01-01`)} y={H - MB + 22} textAnchor="middle" fontSize={12} fill={MUTED}>
          {y}
        </text>
      ))}

      {/* intervalos del 95 %: la incertidumbre crece con el horizonte */}
      {HORIZONTE.map((p, j) => (
        <g key={"ci" + p.d} opacity={i === null ? 0.3 : j === i ? 0.95 : 0.15}>
          <line x1={px(p.d)} x2={px(p.d)} y1={py(p.lo)} y2={py(p.hi)} stroke={FOREST} strokeWidth={j === i ? 2 : 1.5} />
          <line x1={px(p.d) - 4} x2={px(p.d) + 4} y1={py(p.hi)} y2={py(p.hi)} stroke={FOREST} strokeWidth={1.5} />
          <line x1={px(p.d) - 4} x2={px(p.d) + 4} y1={py(p.lo)} y2={py(p.lo)} stroke={FOREST} strokeWidth={1.5} />
        </g>
      ))}

      <polyline points={linea} fill="none" stroke={FOREST} strokeWidth={2.5} strokeLinejoin="round" />
      {HORIZONTE.map((p, j) => (
        <circle
          key={p.d + p.v}
          cx={px(p.d)}
          cy={py(p.v)}
          r={j === i ? 6 : 3.5}
          fill={j === i ? CORAL : FOREST}
          stroke={j === i ? "#fbf6ec" : "none"}
          strokeWidth={j === i ? 2 : 0}
        />
      ))}

      <g opacity={i === null ? 1 : 0.25}>
        <text x={px("2023-03-14") + 14} y={py(5.4) + 4} fontSize={13} fill={INK}>
          GPT-4: 5 minutos
        </text>
        <text x={px("2024-12-17") + 12} y={py(39.2) + 4} fontSize={13} fill={INK}>
          o1: 39 minutos
        </text>
        <text x={px("2025-08-07") + 12} y={py(203) + 16} fontSize={13} fill={INK}>
          GPT-5: 3 horas
        </text>
        <circle cx={px("2026-04-07")} cy={py(1044.8)} r={6} fill="none" stroke={CORAL} strokeWidth={2} />
        <text x={px("2026-04-07") - 12} y={py(1044.8) + 5} textAnchor="end" fontSize={13} fill={CORAL} fontWeight={600}>
          abr-2026: 17 horas
        </text>
      </g>

      <text x={ML} y={H - 10} fontSize={11} fill={MUTED}>
        Las líneas verticales son el intervalo del 95 %: cuanto más larga la tarea, menos preciso el dato.
      </text>
    </Lienzo>
  );
}

/* --- Figura 3: el examen medido contra si mismo ---------------------------- */

/* Anthropic, System Card de Claude Sonnet 4.5, seccion 7.6.4.1, p. 99-100:
   100 trampas sinteticas, muestreo a temperatura 0. Sin intervenir, Sonnet 4.5
   verbaliza la sospecha en mas del 80 % de los casos y comete 0 de 100 acciones
   desalineadas. Inhibiendo los vectores de conciencia de evaluacion, las acciones
   desalineadas llegan a un maximo de 8-9 %, y la mayoria queda entre 1 y 5 % o en 0.
   Control: diez vectores SAE aleatorios de la misma norma, cero acciones. */
const HONEYPOT = [
  {
    l: "Sonnet 4.5\nsin tocar",
    v: 0,
    n: `0${NB}%`,
    tipico: 0,
    destacar: false,
    titulo: "Claude Sonnet 4.5, sin intervenir",
    filas: [
      { k: "Acciones desalineadas", v: "0 de 100" },
      { k: "Dice que sospecha", v: "más del 80 % de las veces" },
    ],
    nota: "El modelo, tal como salió al mercado, no cayó en ninguna de las cien trampas.",
  },
  {
    l: "Diez direcciones\nal azar (control)",
    v: 0,
    n: `0${NB}%`,
    tipico: 0,
    destacar: false,
    titulo: "Control: diez direcciones internas al azar",
    filas: [
      { k: "Acciones desalineadas", v: "cero" },
      { k: "Fuerza aplicada", v: "la misma del experimento" },
    ],
    nota: "Sirve para descartar que el resultado se explique por sacudir el modelo con cualquier cosa.",
  },
  {
    l: "Con «esto es una\nprueba» inhibido",
    v: 9,
    n: `hasta 9${NB}%`,
    tipico: 5,
    destacar: true,
    titulo: "Apagando la idea de estar en un examen",
    filas: [
      { k: "Máximo alcanzado", v: "8 a 9 %" },
      { k: "La mayoría de vectores", v: "entre 1 y 5 %, o en 0" },
    ],
    nota: "La parte sólida de la barra es donde quedó la mayoría; la clara, hasta dónde llegó el peor caso.",
  },
  {
    l: "Sonnet 4\nsin tocar",
    v: 11,
    n: `≈11${NB}%`,
    tipico: 11,
    destacar: false,
    titulo: "Claude Sonnet 4, la versión anterior",
    filas: [{ k: "Acciones desalineadas", v: "cerca del 11 %" }],
    nota: "Anthropic lo pone como referencia: ni apagando esa idea, Sonnet 4.5 llega a portarse tan mal como su antecesor.",
  },
];

export function GraficaHoneypot() {
  const W = 900;
  const H = 320;
  const MT = 30;
  const MB = 88;
  const ML = 56;
  const MR = 24;
  const MAX = 12;
  const py = (v: number) => MT + (1 - v / MAX) * (H - MT - MB);
  const paso = (W - ML - MR) / HONEYPOT.length;
  const ancho = Math.min(110, paso * 0.5);

  const [i, setI] = useState<number | null>(null);
  const b = i === null ? null : HONEYPOT[i];

  const mover = ({ x }: { x: number }) => {
    const k = Math.floor((x - ML) / paso);
    setI(k >= 0 && k < HONEYPOT.length ? k : null);
  };

  const tip: Tip | null = b
    ? {
        x: ML + paso * (i! + 0.5),
        y: py(Math.max(b.v, 1)) - 10,
        titulo: b.titulo,
        filas: b.filas,
        nota: b.nota,
      }
    : null;

  return (
    <Lienzo
      W={W}
      H={H}
      etiqueta="Porcentaje de acciones desalineadas en cien escenarios trampa, con y sin la conciencia de estar siendo evaluado"
      tip={tip}
      onMover={mover}
      onSalir={() => setI(null)}
    >
      {[0, 3, 6, 9, 12].map((t) => (
        <g key={t}>
          <line x1={ML} x2={W - MR} y1={py(t)} y2={py(t)} stroke={LINE} strokeWidth={t === 0 ? 2 : 1} />
          <text x={ML - 12} y={py(t) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {t} %
          </text>
        </g>
      ))}
      {HONEYPOT.map((b2, j) => {
        const cx = ML + paso * (j + 0.5);
        const alto = Math.max(py(0) - py(b2.v), 0);
        const altoTipico = Math.max(py(0) - py(b2.tipico), 0);
        const activo = j === i;
        return (
          <g key={b2.l} opacity={i === null || activo ? 1 : 0.4}>
            {alto > 0 ? (
              <>
                {/* hasta donde llego el peor caso */}
                <rect
                  x={cx - ancho / 2}
                  y={py(b2.v)}
                  width={ancho}
                  height={alto - altoTipico}
                  fill={b2.destacar ? CORAL : FOREST}
                  opacity={b2.destacar ? 0.4 : 0.45}
                />
                {/* donde quedo la mayoria */}
                <rect
                  x={cx - ancho / 2}
                  y={py(b2.tipico)}
                  width={ancho}
                  height={altoTipico}
                  fill={b2.destacar ? CORAL : FOREST}
                  opacity={b2.destacar ? 1 : 0.45}
                />
                <line
                  x1={cx - ancho / 2}
                  x2={cx + ancho / 2}
                  y1={py(b2.v)}
                  y2={py(b2.v)}
                  stroke={b2.destacar ? CORAL : FOREST}
                  strokeWidth={2}
                />
              </>
            ) : (
              <line x1={cx - ancho / 2} x2={cx + ancho / 2} y1={py(0)} y2={py(0)} stroke={FOREST} strokeWidth={4} />
            )}
            <text
              x={cx}
              y={py(b2.v) - 10}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={b2.destacar ? CORAL : INK}
            >
              {b2.n}
            </text>
            {b2.l.split("\n").map((l2, k) => (
              <text key={l2} x={cx} y={H - MB + 24 + k * 16} textAnchor="middle" fontSize={12} fill={MUTED}>
                {l2}
              </text>
            ))}
          </g>
        );
      })}
    </Lienzo>
  );
}

/* --- Figura 4: la desproporcion de escala ---------------------------------- */

const ESCALA = [
  {
    l: "Todo el campo de la seguridad de la IA",
    sub: "170 organizaciones, 1.313 personas de tiempo completo",
    v: 525,
    n: "525 millones",
    destacar: true,
    titulo: "Seguridad de la IA, presupuesto anual",
    filas: [
      { k: "Presupuesto", v: "USD 525 millones" },
      { k: "Organizaciones", v: "170" },
      { k: "Personas", v: "1.313 de tiempo completo" },
      { k: "En América Latina", v: "ninguna" },
    ],
    nota: "Censo de Harry Waterman, cerrado en septiembre de 2025; cuenta organizaciones dedicadas, no equipos internos de las empresas.",
  },
  {
    l: "Inversión anunciada en infraestructura de IA",
    sub: "Amazon, Google, Meta y Microsoft, solo en 2026",
    v: 700_000,
    n: "casi 700.000 millones",
    destacar: false,
    titulo: "Infraestructura de IA, un solo año",
    filas: [
      { k: "Inversión anunciada", v: "cerca de USD 700.000 M" },
      { k: "Quiénes", v: "Amazon, Google, Meta, Microsoft" },
      { k: "Año", v: "2026" },
      { k: "Cuántas veces más", v: "unas 1.300" },
    ],
    nota: "Son cifras que las cuatro empresas anunciaron a sus inversionistas en febrero de 2026, no gasto ya ejecutado.",
  },
];

export function GraficaAsimetria() {
  const W = 900;
  const H = 310;
  const ML = 24;
  const MR = 24;
  const MT = 46;
  const alto = 46;
  const hueco = 100;
  const lo = Math.log10(100);
  const hi = Math.log10(1_000_000);
  const ancho = (v: number) => ((Math.log10(v) - lo) / (hi - lo)) * (W - ML - MR);
  const ticks = [1_000, 10_000, 100_000, 1_000_000];
  const rot = (v: number) => (v >= 1_000_000 ? "1 billón" : `${(v / 1000).toLocaleString("es-CO")} mil M`);
  const base = MT + hueco * ESCALA.length + 4;

  const [i, setI] = useState<number | null>(null);
  const b = i === null ? null : ESCALA[i];

  const mover = ({ x, y }: { x: number; y: number }) => {
    const k = ESCALA.findIndex((_, j) => y >= MT + hueco * j - 34 && y < MT + hueco * j + alto + 10);
    setI(k >= 0 && x >= ML ? k : null);
  };

  const tip: Tip | null =
    b && i !== null
      ? {
          x: Math.min(ancho(b.v) + ML, W * 0.55),
          y: MT + hueco * i + alto / 2,
          titulo: b.titulo,
          filas: b.filas,
          nota: b.nota,
        }
      : null;

  return (
    <Lienzo
      W={W}
      H={H}
      etiqueta="Comparación entre el presupuesto anual del campo de la seguridad de la IA y la inversión anunciada en infraestructura de IA"
      tip={tip}
      onMover={mover}
      onSalir={() => setI(null)}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={ML + ancho(t)} x2={ML + ancho(t)} y1={MT - 14} y2={base} stroke={LINE} strokeWidth={1} />
          <text x={ML + ancho(t)} y={base + 20} textAnchor="middle" fontSize={12} fill={MUTED}>
            {rot(t)}
          </text>
        </g>
      ))}
      <text x={ML} y={base + 44} fontSize={12} fill={MUTED}>
        Dólares por año, escala logarítmica: cada línea vale diez veces la anterior.
      </text>
      {ESCALA.map((b2, j) => {
        const y = MT + hueco * j;
        const activo = j === i;
        return (
          <g key={b2.l} opacity={i === null || activo ? 1 : 0.45}>
            <text x={ML} y={y - 22} fontSize={13} fontWeight={600} fill={INK}>
              {b2.l}
            </text>
            <text x={ML} y={y - 7} fontSize={12} fill={MUTED}>
              {b2.sub}
            </text>
            <rect
              x={ML}
              y={y}
              width={Math.max(ancho(b2.v), 3)}
              height={alto}
              fill={b2.destacar ? CORAL : FOREST}
              opacity={b2.destacar ? 1 : 0.75}
            />
            <text
              x={ML + ancho(b2.v) + (ancho(b2.v) > 300 ? -12 : 12)}
              y={y + alto / 2 + 6}
              textAnchor={ancho(b2.v) > 300 ? "end" : "start"}
              fontSize={16}
              fontWeight={600}
              fill={ancho(b2.v) > 300 ? "#f6f1e4" : b2.destacar ? CORAL : FOREST}
            >
              USD {b2.n}
            </text>
          </g>
        );
      })}
    </Lienzo>
  );
}

/* --- Figura 5: la dispersion de las estimaciones --------------------------- */

/* Dos ejercicios distintos, con preguntas distintas. Se muestran juntos porque
   la dispersion es el dato, no el promedio de todos ellos.
   - Forecasting Research Institute, Existential Persuasion Tournament (2023),
     Tabla 9: «AI Extinction Risk by 2100», mediana e intervalo del 95 %.
   - Grace et al. (2024), Tabla 2, resultados de 2023: media, desviacion,
     mediana y rango intercuartil de dos preguntas distintas. */
type Estimacion = {
  g: string;
  sub: string;
  med: number;
  lo?: number;
  hi?: number;
  media?: number;
  n: string;
  pregunta: string;
  loc: string;
};

const ESTIMACIONES: Estimacion[] = [
  {
    g: "Superpronosticadores",
    sub: "gente con buen historial prediciendo, no especialistas en IA",
    med: 0.38,
    lo: 0.1,
    hi: 0.75,
    n: "88 participantes",
    pregunta: "Probabilidad de que la IA cause la extinción humana antes de 2100.",
    loc: "Forecasting Research Institute, Tabla 9",
  },
  {
    g: "Expertos en IA del mismo torneo",
    sub: "respondieron la misma pregunta, en el mismo ejercicio",
    med: 3,
    lo: 0.49,
    hi: 10,
    n: "80 participantes",
    pregunta: "Probabilidad de que la IA cause la extinción humana antes de 2100.",
    loc: "Forecasting Research Institute, Tabla 9",
  },
  {
    g: "Investigadores que publican en IA",
    sub: "mediana 5 %, promedio 16,2 %: hay una cola larga de respuestas altas",
    med: 5,
    media: 16.2,
    n: "1.321 respuestas",
    pregunta:
      "¿Qué probabilidad le da a que los avances futuros en IA causen la extinción humana, o una pérdida de poder igual de permanente y grave?",
    loc: "Grace et al. (2024), Tabla 2, datos de 2023",
  },
  {
    g: "Los mismos, preguntados por el control",
    sub: "mediana 10 %, promedio 19,4 %",
    med: 10,
    media: 19.4,
    n: "661 respuestas",
    pregunta:
      "¿Qué probabilidad le da a que sea la incapacidad humana de controlar sistemas de IA avanzados la que cause ese desenlace?",
    loc: "Grace et al. (2024), Tabla 2, datos de 2023",
  },
];

export function GraficaEstimaciones() {
  const W = 900;
  const H = 380;
  const ML = 26;
  const MR = 26;
  const MT = 40;
  const fila = 62;
  const lo = Math.log10(0.06);
  const hi = Math.log10(60);
  const px = (v: number) => ML + ((Math.log10(v) - lo) / (hi - lo)) * (W - ML - MR);
  const ticks = [0.1, 0.3, 1, 3, 10, 30];
  const eje = MT + fila * ESTIMACIONES.length - 6;

  const [i, setI] = useState<number | null>(null);
  const e = i === null ? null : ESTIMACIONES[i];

  const mover = ({ y }: { x: number; y: number }) => {
    const k = Math.floor((y - MT + 26) / fila);
    setI(k >= 0 && k < ESTIMACIONES.length ? k : null);
  };

  const tip: Tip | null =
    e && i !== null
      ? {
          x: px(e.media ?? e.hi ?? e.med),
          y: MT + fila * i + 16,
          titulo: e.g,
          filas: [
            { k: "Mediana", v: pct(e.med, e.med < 1 ? 2 : 0) },
            ...(e.media ? [{ k: "Promedio", v: pct(e.media) }] : []),
            ...(e.lo && e.hi ? [{ k: "Intervalo del 95 %", v: `${pct(e.lo, 2)} a ${pct(e.hi, 2)}` }] : []),
            { k: "Cuántos", v: e.n },
          ],
          nota: `${e.pregunta} (${e.loc})`,
        }
      : null;

  return (
    <Lienzo
      W={W}
      H={H}
      etiqueta="Estimaciones de la probabilidad de extinción causada por la inteligencia artificial, según distintos grupos"
      tip={tip}
      onMover={mover}
      onSalir={() => setI(null)}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} x2={px(t)} y1={MT - 26} y2={eje} stroke={LINE} strokeWidth={1} />
          <text x={px(t)} y={eje + 20} textAnchor="middle" fontSize={12} fill={MUTED}>
            {coma(t, t < 1 ? 1 : 0)} %
          </text>
        </g>
      ))}

      {ESTIMACIONES.map((e2, j) => {
        const y = MT + fila * j + 22;
        const activo = j === i;
        const der = e2.media ?? e2.hi ?? e2.med;
        return (
          <g key={e2.g} opacity={i === null || activo ? 1 : 0.4}>
            <text x={ML} y={y - 24} fontSize={13} fontWeight={600} fill={INK}>
              {e2.g}
            </text>
            <text x={ML} y={y - 9} fontSize={12} fill={MUTED}>
              {e2.sub}
            </text>
            {e2.lo && e2.hi ? (
              <>
                <line x1={px(e2.lo)} x2={px(e2.hi)} y1={y} y2={y} stroke={FOREST} strokeWidth={activo ? 4 : 3} opacity={0.35} />
                <line x1={px(e2.lo)} x2={px(e2.lo)} y1={y - 6} y2={y + 6} stroke={FOREST} strokeWidth={1.5} />
                <line x1={px(e2.hi)} x2={px(e2.hi)} y1={y - 6} y2={y + 6} stroke={FOREST} strokeWidth={1.5} />
              </>
            ) : null}
            {e2.media ? (
              <>
                <line
                  x1={px(e2.med)}
                  x2={px(e2.media)}
                  y1={y}
                  y2={y}
                  stroke={CORAL}
                  strokeWidth={activo ? 4 : 3}
                  opacity={0.3}
                />
                <circle cx={px(e2.media)} cy={y} r={activo ? 7 : 5.5} fill="none" stroke={CORAL} strokeWidth={2} />
              </>
            ) : null}
            <circle cx={px(e2.med)} cy={y} r={activo ? 8 : 6} fill={e2.media ? CORAL : FOREST} />
            <text
              x={px(der) + 14}
              y={y + 5}
              fontSize={14}
              fontWeight={600}
              fill={e2.media ? CORAL : FOREST}
            >
              {pct(e2.med, e2.med < 1 ? 2 : 0)}
              {e2.media ? ` → ${pct(e2.media)}` : ""}
            </text>
          </g>
        );
      })}

      <g>
        <circle cx={ML + 6} cy={H - 26} r={5} fill={INK} />
        <text x={ML + 18} y={H - 22} fontSize={12} fill={MUTED}>
          mediana
        </text>
        <circle cx={ML + 100} cy={H - 26} r={5} fill="none" stroke={INK} strokeWidth={2} />
        <text x={ML + 112} y={H - 22} fontSize={12} fill={MUTED}>
          promedio
        </text>
        <line x1={ML + 200} x2={ML + 228} y1={H - 26} y2={H - 26} stroke={INK} strokeWidth={3} opacity={0.35} />
        <text x={ML + 236} y={H - 22} fontSize={12} fill={MUTED}>
          intervalo del 95 %
        </text>
        <text x={ML} y={H - 6} fontSize={11} fill={MUTED}>
          Escala logarítmica. Los dos ejercicios preguntaron cosas distintas: pase el cursor para ver la pregunta exacta.
        </text>
      </g>
    </Lienzo>
  );
}

/* --- envoltorio comun ------------------------------------------------------ */

export function Figura({
  numero,
  titulo,
  pie,
  limite,
  fuentes,
  children,
}: {
  numero: number;
  titulo: string;
  pie: string;
  /** que NO se puede concluir de esta figura; se imprime debajo del grafico */
  limite?: string;
  /** una entrada por fuente citada: cada una lleva su propio enlace */
  fuentes: { texto: string; href: string }[];
  children: React.ReactNode;
}) {
  return (
    <figure className="my-12 md:my-14">
      <figcaption className="mb-5">
        <span className="text-kicker text-aisc-coral">Figura {numero}</span>
        <p className="text-display-4 md:text-display-4-lg mt-2 text-aisc-ink">{titulo}</p>
        <p className="text-body-sm mt-2 w-full text-aisc-muted">{pie}</p>
      </figcaption>
      <div className="overflow-x-auto rounded-lg border border-aisc-line bg-aisc-cream p-4 md:p-6">
        <div className="min-w-[560px]">{children}</div>
      </div>
      {limite ? (
        <p className="text-body-sm mt-3 w-full border-l-2 border-aisc-coral pl-4 text-aisc-muted">
          <span className="text-aisc-ink">No muestra:</span> {limite}
        </p>
      ) : null}
      <p className="text-meta mt-3 text-aisc-muted">
        {fuentes.length > 1 ? "Fuentes: " : "Fuente: "}
        {fuentes.map((f, i) => (
          <span key={f.href}>
            {i > 0 ? (i === fuentes.length - 1 ? " y " : ", ") : ""}
            <a
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-aisc-muted/40 underline-offset-4 transition-colors hover:decoration-aisc-muted"
            >
              {f.texto}
            </a>
          </span>
        ))}
      </p>
    </figure>
  );
}
