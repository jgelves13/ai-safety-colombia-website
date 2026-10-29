"use client";

import { useEffect, useMemo, useState } from "react";

import { FOCO, LINK, TENUE } from "@/components/eventos-estilos";
import { ANCHO, Icono } from "@/components/oportunidades-iconos";

/* La parte que se mueve de /oportunidades, calcada del listado de
   aisafety.com/training: pestañas Próximos/Recurrentes, los dos destacados
   arriba, y debajo una columna ancha con los filtros y las tarjetas en dos
   columnas, más una lateral angosta que llega desde el servidor. Filtros de
   selección múltiple con su conteo (O dentro de cada faceta, Y entre facetas) y
   la lista agrupada por estado de la convocatoria. Los textos de cada tarjeta
   llegan ya escritos desde el servidor para no romper la hidratación. */

export type Faceta = "applications" | "type" | "focus" | "entryBar" | "stipend" | "length" | "location";

export type Detalle = { icono: Icono; texto: string };

export type ProgramaVista = {
  id: string;
  name: string;
  description: string | null;
  href: string | null;
  logo: string | null;
  types: string[];
  /** «Beca destacada», o null si no va en los destacados. */
  destacado: string | null;
  grupo: "open" | "notYetOpen" | "closed" | null;
  lugar: string | null;
  fechas: string | null;
  detalles: Detalle[];
  /** Valores con los que filtra cada faceta. */
  valores: Record<Faceta, string[]>;
};

export type TextosListado = {
  pestanas: { upcoming: string; recurring: string };
  facetas: Record<Faceta, string>;
  opciones: Record<string, string>;
  limpiar: string;
  /** Singular y plural, con {n} en lugar del número. */
  conteo: Record<"upcoming" | "recurring", [string, string]>;
  grupos: Record<"open" | "notYetOpen" | "closed", string>;
  sinResultados: string;
  sinProgramas: Record<"upcoming" | "recurring", string>;
  destacados: string;
};

const OPCIONES: Record<Faceta, string[]> = {
  applications: ["Open", "Closed"],
  type: ["Fellowship", "Course", "Bootcamp", "Immersive workshop", "Other"],
  focus: ["General", "Technical", "Governance"],
  entryBar: ["Low", "Mid", "High"],
  stipend: ["No stipend", "Expenses covered", "Stipend included"],
  length: ["Under 1 month", "1–3 months", "3+ months"],
  location: ["Online", "In person", "Hybrid"],
};

/* La etiqueta de cada tipo con su tinte, como las de AISafety.com pero con los
   colores del sitio: coral, durazno, verde, azul y arena. */
const COLOR_TIPO: Record<string, string> = {
  Fellowship: "text-[#f08a78] bg-[#e5604d]/12 border-[#e5604d]/30",
  Bootcamp: "text-[#f0b27a] bg-[#f0b27a]/12 border-[#f0b27a]/30",
  Course: "text-[#8cc9a0] bg-[#8cc9a0]/12 border-[#8cc9a0]/30",
  "Immersive workshop": "text-[#9cc7d8] bg-[#9cc7d8]/12 border-[#9cc7d8]/30",
  Other: "text-aisc-sand/80 bg-aisc-sand/8 border-aisc-sand/25",
};

const PILDORA ="inline-flex items-center gap-1.5 rounded-full border px-2 text-[13px] leading-[22px] font-semibold";

type Vista = "upcoming" | "recurring";
type Seleccion = Partial<Record<Faceta, string[]>>;

function pasa(p: ProgramaVista, sel: Seleccion, salvo?: Faceta) {
  return (Object.keys(sel) as Faceta[]).every((f) => f === salvo || !sel[f]?.length || sel[f]!.some((v) => p.valores[f].includes(v)));
}

function Tarjeta({ p, grande, t }: { p: ProgramaVista; grande?: boolean; t: TextosListado }) {
  const cuerpo = (
    <>
      {grande && (
        <svg viewBox="0 0 16 24" aria-hidden className="absolute top-0 right-10 h-6 w-4 fill-aisc-coral">
          <path d="M0 0h16v24l-8-6-8 6z" />
        </svg>
      )}
      <div className="flex flex-wrap gap-2">
        {grande ? (
          <span className={`${PILDORA} border-aisc-coral/30 bg-aisc-coral/12 text-[#f08a78]`}>
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {p.destacado}
          </span>
        ) : (
          p.types.map((tipo) => (
            <span key={tipo} className={`${PILDORA} ${COLOR_TIPO[tipo] ?? COLOR_TIPO.Other}`}>
              {t.opciones[tipo] ?? tipo}
            </span>
          ))
        )}
      </div>
      <div className="flex items-start gap-4 py-6">
        {p.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.logo} alt="" width={64} height={64} loading="lazy" className="size-16 flex-none rounded-[4px] object-contain" />
        )}
        <div className="min-w-0">
          <h3 className="text-[22px] leading-[1.25] font-light text-aisc-sand">{p.name}</h3>
          {(p.lugar || p.fechas) && (
            <ul className={`mt-2 grid gap-1 text-[13px] leading-[1.4] font-light ${TENUE}`}>
              {p.lugar && (
                <li className="flex items-start gap-2">
                  <Icono nombre="lugar" />
                  {p.lugar}
                </li>
              )}
              {p.fechas && (
                <li className="flex items-start gap-2">
                  <Icono nombre="fecha" />
                  {p.fechas}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
      {p.description && (
        <p className={`pb-6 font-light text-aisc-sand ${grande ? "text-[17px] leading-[1.5]" : "text-[15px] leading-[1.5]"}`}>{p.description}</p>
      )}
      {p.detalles.length > 0 && (
        <ul className={`mt-auto grid gap-2 text-[13px] leading-[1.4] font-light ${TENUE}`}>
          {p.detalles.map((d) => (
            <li key={d.texto} className="flex items-start gap-2">
              <Icono nombre={d.icono} />
              {d.texto}
            </li>
          ))}
        </ul>
      )}
    </>
  );
  // Como en AISafety.com: sin borde, sombra honda y un leve zoom al pasar el mouse.
  const clases = `relative flex flex-col rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-transform duration-100 ease-in-out will-change-transform [backface-visibility:hidden] [@media(hover:hover)]:hover:scale-[1.015] ${FOCO} ${
    grande ? "p-8 lg:p-14 bg-[radial-gradient(at_0%_0%,#245a3b_0%,#143620_100%)]" : "p-8 lg:p-10 bg-[#143620]"
  }`;
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={clases}>
      {cuerpo}
    </a>
  ) : (
    <div className={clases}>{cuerpo}</div>
  );
}

function Filtro({
  faceta,
  opciones,
  elegidos,
  conteos,
  t,
  alternar,
}: {
  faceta: Faceta;
  opciones: string[];
  elegidos: string[];
  conteos: Record<string, number>;
  t: TextosListado;
  alternar: (f: Faceta, v: string) => void;
}) {
  return (
    <details className="group relative">
      <summary
        className={`flex cursor-pointer list-none items-center gap-1.5 rounded-full border bg-[#143620] py-[7px] pr-3 pl-4 text-[13px] font-semibold transition-colors [&::-webkit-details-marker]:hidden ${FOCO} ${
          elegidos.length ? "border-[#8cc9a0]/70 text-[#8cc9a0]" : "border-[#1f4d32] text-aisc-sand/65 hover:text-aisc-sand"
        }`}
      >
        {t.facetas[faceta]}
        {elegidos.length > 0 && <span className="rounded-full bg-[#8cc9a0] px-1.5 text-[11px] leading-4 text-aisc-night">{elegidos.length}</span>}
        <Icono nombre="flecha" className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="absolute left-0 z-20 mt-2 min-w-[14rem] rounded-xl border border-[#1f4d32] bg-[#143620] p-2 shadow-xl">
        {opciones.map((v) => (
          <label key={v} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] hover:bg-white/[0.06]">
            <input type="checkbox" checked={elegidos.includes(v)} onChange={() => alternar(faceta, v)} className="accent-[#8cc9a0]" />
            <span className="flex-1">{t.opciones[v] ?? v}</span>
            <span className={TENUE}>{conteos[v] ?? 0}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

export default function OportunidadesListado({
  upcoming,
  recurring,
  t,
  lateral,
}: {
  upcoming: ProgramaVista[];
  recurring: ProgramaVista[];
  t: TextosListado;
  lateral?: React.ReactNode;
}) {
  const [vista, setVista] = useState<Vista>("upcoming");
  const [sel, setSel] = useState<Seleccion>({});

  /* La pestaña vive en ?view=recurring, como en AISafety.com. */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "recurring") setVista("recurring");
  }, []);

  function cambiar(v: Vista) {
    setVista(v);
    setSel({});
    const url = new URL(window.location.href);
    if (v === "recurring") url.searchParams.set("view", "recurring");
    else url.searchParams.delete("view");
    window.history.replaceState(null, "", url);
  }

  function alternar(f: Faceta, v: string) {
    setSel((s) => {
      const actual = s[f] ?? [];
      return { ...s, [f]: actual.includes(v) ? actual.filter((x) => x !== v) : [...actual, v] };
    });
  }

  const todos = vista === "upcoming" ? upcoming : recurring;
  const facetas = (Object.keys(OPCIONES) as Faceta[]).filter((f) => vista === "upcoming" || f !== "applications");
  const hayFiltros = Object.values(sel).some((v) => v?.length);
  const destacados = todos.filter((p) => p.destacado);

  const conteos = useMemo(() => {
    const c = {} as Record<Faceta, Record<string, number>>;
    for (const f of facetas) {
      c[f] = {};
      for (const p of todos) if (pasa(p, sel, f)) for (const v of p.valores[f]) c[f][v] = (c[f][v] ?? 0) + 1;
    }
    return c;
  }, [todos, sel, facetas]);

  const filtrados = todos.filter((p) => pasa(p, sel));
  /* Sin filtros, los destacados no se repiten en la lista. */
  const lista = hayFiltros ? filtrados : filtrados.filter((p) => !p.destacado);

  const grupos =
    vista === "upcoming"
      ? (["open", "notYetOpen", "closed"] as const).map((g) => ({ g, items: lista.filter((p) => p.grupo === g) })).filter((x) => x.items.length)
      : [{ g: null, items: lista }];

  return (
    <section className={`${ANCHO} pb-24`}>
      <div role="tablist" className="flex gap-2">
        {(["upcoming", "recurring"] as const).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={vista === v}
            onClick={() => cambiar(v)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors ${FOCO} ${
              vista === v ? "border-[#8cc9a0]/30 text-aisc-sand" : "border-transparent text-aisc-sand/60 hover:text-aisc-sand"
            }`}
          >
            <Icono nombre={v === "upcoming" ? "fecha" : "repetir"} />
            {t.pestanas[v]}
          </button>
        ))}
      </div>

      {destacados.length > 0 && (
        <div className="mt-10">
          <h2 className="sr-only">{t.destacados}</h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-14">
            {destacados.map((p) => (
              <Tarjeta key={p.id} p={p} grande t={t} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-14 flex flex-col gap-14 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {facetas.map((f) => (
              <Filtro key={f} faceta={f} opciones={OPCIONES[f]} elegidos={sel[f] ?? []} conteos={conteos[f]} t={t} alternar={alternar} />
            ))}
            {hayFiltros && (
              <button onClick={() => setSel({})} className={`px-2 text-[13px] font-semibold ${LINK} ${FOCO}`}>
                {t.limpiar}
              </button>
            )}
            <p className={`ml-2 text-[15px] font-light ${TENUE}`}>{t.conteo[vista][filtrados.length === 1 ? 0 : 1].replace("{n}", String(filtrados.length))}</p>
          </div>

          {todos.length === 0 ? (
            <p className={`mt-10 text-[15px] font-light ${TENUE}`}>{t.sinProgramas[vista]}</p>
          ) : lista.length === 0 ? (
            <p className={`mt-10 text-[15px] font-light ${TENUE}`}>{t.sinResultados}</p>
          ) : (
            grupos.map(({ g, items }) => (
              <div key={g ?? "todos"} className="mt-10">
                {g && <h2 className={`pb-6 text-[15px] font-light ${TENUE}`}>{t.grupos[g]}</h2>}
                <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                  {items.map((p) => (
                    <Tarjeta key={p.id} p={p} t={t} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        {lateral && <aside className="flex-none lg:w-[222px]">{lateral}</aside>}
      </div>
    </section>
  );
}
