/* Graficas del ensayo largo.
 *
 * Los datos NO son ilustrativos. Las dos series vienen del AI Benchmarking Hub de
 * Epoch AI (licencia CC BY), descargado de https://epoch.ai/data/benchmark_data.zip,
 * y son la frontera: para cada fecha, el mejor resultado publicado hasta ese momento.
 * Si se actualizan, hay que actualizar tambien las frases del texto que las citan. */

const INK = "#211a12";
const MUTED = "#5a5044";
const LINE = "#e4d9c4";
const FOREST = "#1f4d32";
const CORAL = "#e5604d";

const MS_YEAR = 365.25 * 24 * 3600 * 1000;
const yearOf = (d: string) => Date.parse(d) / MS_YEAR + 1970;

type Punto = { d: string; v: number };

/* --- Figura 1: GPQA Diamond ------------------------------------------------ */

/** frontera de GPQA Diamond; 198 preguntas de doctorado en biologia, fisica y quimica */
const GPQA: Punto[] = [
  { d: "2023-03-14", v: 35.7 },
  { d: "2023-11-06", v: 42.4 },
  { d: "2024-02-29", v: 47.2 },
  { d: "2024-05-13", v: 48.9 },
  { d: "2024-06-20", v: 54.0 },
  { d: "2024-09-12", v: 62.4 },
  { d: "2024-12-17", v: 76.8 },
  { d: "2025-01-31", v: 77.0 },
  { d: "2025-02-24", v: 79.7 },
  { d: "2025-03-25", v: 83.8 },
  { d: "2025-06-17", v: 85.3 },
  { d: "2025-07-09", v: 87.0 },
  { d: "2025-11-13", v: 87.6 },
  { d: "2025-11-18", v: 92.6 },
  { d: "2026-02-19", v: 94.4 },
  { d: "2026-03-05", v: 94.6 },
  { d: "2026-08-13", v: 94.8 },
];

/** doctores del area reclutados por OpenAI para calibrar el subconjunto Diamond */
const HUMANO = 69.7;

export function GraficaGpqa() {
  const W = 900;
  const H = 400;
  const ML = 46;
  const MR = 18;
  const MT = 26;
  const MB = 40;
  const x0 = 2023.0;
  const x1 = 2026.85;
  const px = (d: string) => ML + ((yearOf(d) - x0) / (x1 - x0)) * (W - ML - MR);
  const py = (v: number) => MT + (1 - v / 100) * (H - MT - MB);
  const linea = GPQA.map((p) => `${px(p.d)},${py(p.v)}`).join(" ");
  const cruce = GPQA.find((p) => p.v > HUMANO)!;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Resultados en GPQA Diamond de 2023 a 2026">
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={ML} x2={W - MR} y1={py(v)} y2={py(v)} stroke={LINE} strokeWidth={1} />
          <text x={ML - 10} y={py(v) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {v}%
          </text>
        </g>
      ))}
      {[2023, 2024, 2025, 2026].map((y) => (
        <text key={y} x={px(`${y}-01-01`)} y={H - MB + 22} textAnchor="middle" fontSize={12} fill={MUTED}>
          {y}
        </text>
      ))}

      {/* franja de adivinanza al azar: 4 opciones por pregunta */}
      <rect x={ML} y={py(25)} width={W - ML - MR} height={py(0) - py(25)} fill={INK} opacity={0.04} />
      <text x={ML + 8} y={py(25) - 7} fontSize={12} fill={MUTED}>
        Responder al azar: 25%
      </text>

      {/* linea humana */}
      <line x1={ML} x2={W - MR} y1={py(HUMANO)} y2={py(HUMANO)} stroke={CORAL} strokeWidth={1.5} strokeDasharray="6 5" />
      <text x={W - MR} y={py(HUMANO) - 9} textAnchor="end" fontSize={13} fill={CORAL} fontWeight={600}>
        Doctores del área: 69,7%
      </text>

      <polyline points={linea} fill="none" stroke={FOREST} strokeWidth={2.5} strokeLinejoin="round" />
      {GPQA.map((p) => (
        <circle key={p.d + p.v} cx={px(p.d)} cy={py(p.v)} r={3.5} fill={FOREST} />
      ))}

      {/* anotaciones */}
      <g>
        <circle cx={px(GPQA[0].d)} cy={py(GPQA[0].v)} r={5.5} fill="none" stroke={FOREST} strokeWidth={1.5} />
        <text x={px(GPQA[0].d) + 14} y={py(GPQA[0].v) + 4} fontSize={13} fill={INK}>
          mar-2023: 35,7%
        </text>
      </g>
      <g>
        <line x1={px(cruce.d)} x2={px(cruce.d)} y1={py(cruce.v) - 10} y2={py(100) - 6} stroke={MUTED} strokeWidth={1} />
        <text x={px(cruce.d) - 8} y={py(100) - 10} textAnchor="end" fontSize={13} fill={INK}>
          dic-2024: pasa la marca humana
        </text>
      </g>
      <text x={px(GPQA[GPQA.length - 1].d) - 6} y={py(GPQA[GPQA.length - 1].v) + 22} textAnchor="end" fontSize={13} fill={INK}>
        ago-2026: 94,8%
      </text>
    </svg>
  );
}

/* --- Figura 2: horizonte temporal de METR ---------------------------------- */

/** frontera del horizonte temporal de METR, en minutos, escala logaritmica */
const HORIZONTE: Punto[] = [
  { d: "2023-03-14", v: 5.4 },
  { d: "2023-11-06", v: 8.6 },
  { d: "2024-06-20", v: 18.7 },
  { d: "2024-09-12", v: 22.2 },
  { d: "2024-10-22", v: 29.6 },
  { d: "2024-12-17", v: 39.2 },
  { d: "2025-02-24", v: 60.4 },
  { d: "2025-04-16", v: 119.7 },
  { d: "2025-08-07", v: 203.0 },
  { d: "2025-11-18", v: 224.3 },
  { d: "2025-11-24", v: 293.0 },
  { d: "2025-12-11", v: 352.2 },
  { d: "2026-02-05", v: 718.8 },
  { d: "2026-04-07", v: 1044.8 },
];

const TICKS_H = [
  { v: 4, l: "4 min" },
  { v: 15, l: "15 min" },
  { v: 60, l: "1 hora" },
  { v: 240, l: "4 horas" },
  { v: 960, l: "16 horas" },
];

export function GraficaHorizonte() {
  const W = 900;
  const H = 400;
  const ML = 68;
  const MR = 18;
  const MT = 26;
  const MB = 40;
  const x0 = 2023.0;
  const x1 = 2026.6;
  const lo = Math.log2(3);
  const hi = Math.log2(1400);
  const px = (d: string) => ML + ((yearOf(d) - x0) / (x1 - x0)) * (W - ML - MR);
  const py = (v: number) => MT + (1 - (Math.log2(v) - lo) / (hi - lo)) * (H - MT - MB);
  const linea = HORIZONTE.map((p) => `${px(p.d)},${py(p.v)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Duración de las tareas que un modelo completa con 50% de éxito, de 2023 a 2026"
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

      <polyline points={linea} fill="none" stroke={FOREST} strokeWidth={2.5} strokeLinejoin="round" />
      {HORIZONTE.map((p) => (
        <circle key={p.d + p.v} cx={px(p.d)} cy={py(p.v)} r={3.5} fill={FOREST} />
      ))}

      <text x={px("2023-03-14") + 14} y={py(5.4) + 4} fontSize={13} fill={INK}>
        GPT-4: 5 minutos
      </text>
      <text x={px("2024-12-17") + 12} y={py(39.2) + 4} fontSize={13} fill={INK}>
        o1: 39 minutos
      </text>
      <text x={px("2025-08-07") + 12} y={py(203) + 16} fontSize={13} fill={INK}>
        GPT-5: 3 horas
      </text>
      <g>
        <circle cx={px("2026-04-07")} cy={py(1044.8)} r={6} fill="none" stroke={CORAL} strokeWidth={2} />
        <text x={px("2026-04-07") - 12} y={py(1044.8) + 5} textAnchor="end" fontSize={13} fill={CORAL} fontWeight={600}>
          abr-2026: 17 horas
        </text>
      </g>
    </svg>
  );
}

/* --- Figura 3: dispersion de las estimaciones ------------------------------ */

const ESTIMACIONES = [
  { v: 0.38, l: "Superpronosticadores", n: "0,38%" },
  { v: 3, l: "Expertos en riesgos de IA", n: "3%" },
  { v: 5, l: "Investigadores de IA (mediana)", n: "5%" },
  { v: 16.2, l: "Investigadores de IA (media)", n: "16,2%" },
];

export function GraficaEstimaciones() {
  const W = 900;
  const H = 210;
  const ML = 60;
  const MR = 60;
  const Y = 96;
  const lo = Math.log10(0.2);
  const hi = Math.log10(40);
  const px = (v: number) => ML + ((Math.log10(v) - lo) / (hi - lo)) * (W - ML - MR);
  const ticks = [0.5, 1, 2, 5, 10, 20];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Estimaciones de probabilidad de extinción causada por IA, según distintos grupos"
    >
      <line x1={ML} x2={W - MR} y1={Y} y2={Y} stroke={LINE} strokeWidth={2} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} x2={px(t)} y1={Y - 5} y2={Y + 5} stroke={LINE} strokeWidth={2} />
          <text x={px(t)} y={Y + 26} textAnchor="middle" fontSize={12} fill={MUTED}>
            {String(t).replace(".", ",")}%
          </text>
        </g>
      ))}
      {ESTIMACIONES.map((e, i) => {
        const arriba = i % 2 === 0;
        const yl = arriba ? Y - 30 : Y + 52;
        return (
          <g key={e.l}>
            <line x1={px(e.v)} x2={px(e.v)} y1={Y} y2={arriba ? yl + 16 : yl - 26} stroke={MUTED} strokeWidth={1} />
            <circle cx={px(e.v)} cy={Y} r={6} fill={i === 0 ? FOREST : CORAL} />
            <text x={px(e.v)} y={yl} textAnchor="middle" fontSize={14} fill={INK} fontWeight={600}>
              {e.n}
            </text>
            <text x={px(e.v)} y={yl + (arriba ? -16 : 16)} textAnchor="middle" fontSize={12} fill={MUTED}>
              {e.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* --- Figura 4: el examen medido contra si mismo ---------------------------- */

/* Anthropic, system card de Claude Sonnet 4.5, §7.6.4.1: 100 trampas sinteticas.
   El maximo de 9 % es el peor de los vectores inhibidos; la mayoria quedo en 1-5 %. */
const HONEYPOT = [
  { l: "Sonnet 4.5\nsin intervenir", v: 0, n: "0 %", destacar: false },
  { l: "Con direcciones\naleatorias inhibidas", v: 0, n: "0 %", destacar: false },
  { l: "Con «esto es una\nprueba» inhibido", v: 9, n: "hasta 9 %", destacar: true },
  { l: "Sonnet 4\nsin intervenir", v: 11, n: "≈11 %", destacar: false },
];

export function GraficaHoneypot() {
  const W = 900;
  const H = 300;
  const MT = 30;
  const MB = 76;
  const ML = 56;
  const MR = 24;
  const MAX = 12;
  const py = (v: number) => MT + (1 - v / MAX) * (H - MT - MB);
  const paso = (W - ML - MR) / HONEYPOT.length;
  const ancho = Math.min(110, paso * 0.5);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Porcentaje de acciones desalineadas en cien escenarios trampa, con y sin la conciencia de estar siendo evaluado"
    >
      {[0, 3, 6, 9, 12].map((t) => (
        <g key={t}>
          <line x1={ML} x2={W - MR} y1={py(t)} y2={py(t)} stroke={LINE} strokeWidth={t === 0 ? 2 : 1} />
          <text x={ML - 12} y={py(t) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {t} %
          </text>
        </g>
      ))}
      {HONEYPOT.map((b, i) => {
        const cx = ML + paso * (i + 0.5);
        const alto = Math.max(py(b.v) === py(0) ? 0 : py(0) - py(b.v), 0);
        return (
          <g key={b.l}>
            {alto > 0 ? (
              <rect
                x={cx - ancho / 2}
                y={py(b.v)}
                width={ancho}
                height={alto}
                fill={b.destacar ? CORAL : FOREST}
                opacity={b.destacar ? 1 : 0.45}
              />
            ) : (
              <line x1={cx - ancho / 2} x2={cx + ancho / 2} y1={py(0)} y2={py(0)} stroke={FOREST} strokeWidth={4} />
            )}
            <text
              x={cx}
              y={py(b.v) - 10}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={b.destacar ? CORAL : INK}
            >
              {b.n}
            </text>
            {b.l.split("\n").map((linea, j) => (
              <text key={linea} x={cx} y={H - MB + 24 + j * 16} textAnchor="middle" fontSize={12} fill={MUTED}>
                {linea}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* --- Figura 5: la desproporcion de escala ---------------------------------- */

const ESCALA = [
  {
    l: "Todo el campo de la seguridad de la IA",
    sub: "170 organizaciones, 1.313 personas de tiempo completo",
    v: 525,
    n: "525 millones",
    destacar: true,
  },
  {
    l: "Inversión anunciada en infraestructura de IA",
    sub: "Amazon, Google, Meta y Microsoft, solo en 2026",
    v: 725_000,
    n: "725.000 millones",
    destacar: false,
  },
];

export function GraficaAsimetria() {
  const W = 900;
  const H = 300;
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

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Comparación entre el presupuesto anual del campo de la seguridad de la IA y la inversión anunciada en infraestructura de IA"
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
      {ESCALA.map((b, i) => {
        const y = MT + hueco * i;
        return (
          <g key={b.l}>
            <text x={ML} y={y - 22} fontSize={13} fontWeight={600} fill={INK}>
              {b.l}
            </text>
            <text x={ML} y={y - 7} fontSize={12} fill={MUTED}>
              {b.sub}
            </text>
            <rect
              x={ML}
              y={y}
              width={Math.max(ancho(b.v), 3)}
              height={alto}
              fill={b.destacar ? CORAL : FOREST}
              opacity={b.destacar ? 1 : 0.75}
            />
            <text
              x={ML + ancho(b.v) + (ancho(b.v) > 300 ? -12 : 12)}
              y={y + alto / 2 + 6}
              textAnchor={ancho(b.v) > 300 ? "end" : "start"}
              fontSize={16}
              fontWeight={600}
              fill={ancho(b.v) > 300 ? "#f6f1e4" : b.destacar ? CORAL : FOREST}
            >
              USD {b.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* --- envoltorio comun ------------------------------------------------------ */

export function Figura({
  numero,
  titulo,
  pie,
  limite,
  fuente,
  href,
  children,
}: {
  numero: number;
  titulo: string;
  pie: string;
  /** que NO se puede concluir de esta figura; se imprime debajo del grafico */
  limite?: string;
  fuente: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-12 md:my-14">
      <figcaption className="mb-5">
        <span className="text-kicker text-aisc-coral">Figura {numero}</span>
        <p className="text-display-4 md:text-display-4-lg mt-2 text-aisc-ink">{titulo}</p>
        <p className="text-body-sm mt-2 max-w-[680px] text-aisc-muted">{pie}</p>
      </figcaption>
      <div className="overflow-x-auto rounded-lg border border-aisc-line bg-aisc-cream p-4 md:p-6">
        <div className="min-w-[560px]">{children}</div>
      </div>
      {limite ? (
        <p className="text-body-sm mt-3 max-w-[680px] border-l-2 border-aisc-coral pl-4 text-aisc-muted">
          <span className="text-aisc-ink">No muestra:</span> {limite}
        </p>
      ) : null}
      <p className="text-meta mt-3 text-aisc-muted">
        Fuente:{" "}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-aisc-muted/40 underline-offset-4 transition-colors hover:decoration-aisc-muted"
        >
          {fuente}
        </a>
      </p>
    </figure>
  );
}
