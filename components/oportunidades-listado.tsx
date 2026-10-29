"use client";

import { useEffect, useMemo, useState } from "react";

import { ACENTO, FILETE, FOCO, LINK, TENUE } from "@/components/eventos-estilos";

/* La parte que se mueve de /oportunidades, calcada del listado de
   aisafety.com/training: pestañas Próximos/Recurrentes, los destacados arriba,
   filtros de selección múltiple con su conteo (O dentro de cada faceta, Y entre
   facetas) y la lista agrupada por estado de la convocatoria. Los textos de cada
   tarjeta llegan ya escritos desde el servidor para no romper la hidratación. */

export type Faceta = "applications" | "type" | "focus" | "entryBar" | "stipend" | "length" | "location";

export type ProgramaVista = {
  id: string;
  name: string;
  description: string | null;
  href: string | null;
  logo: string | null;
  types: string[];
  /** «Featured fellowship», o null si no va en los destacados. */
  destacado: string | null;
  grupo: "open" | "notYetOpen" | "closed" | null;
  lugar: string | null;
  fechas: string | null;
  meta: string[];
  /** Valores con los que filtra cada faceta. */
  valores: Record<Faceta, string[]>;
};

export type TextosListado = {
  pestanas: { upcoming: string; recurring: string };
  facetas: Record<Faceta, string>;
  opciones: Record<string, string>;
  limpiar: string;
  conteo: (n: number, vista: "upcoming" | "recurring") => string;
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

/* El color de cada tipo, del verde al coral del sitio, en lugar del naranja, rosa y azul de AISafety.com. */
const COLOR_TIPO: Record<string, string> = {
  Fellowship: "text-aisc-coral",
  Bootcamp: "text-[#f0b27a]",
  Course: "text-[#8cc9a0]",
  "Immersive workshop": "text-[#9cc7d8]",
  Other: "text-aisc-sand/80",
};

type Vista = "upcoming" | "recurring";
type Seleccion = Partial<Record<Faceta, string[]>>;

function pasa(p: ProgramaVista, sel: Seleccion, salvo?: Faceta) {
  return (Object.keys(sel) as Faceta[]).every((f) => f === salvo || !sel[f]?.length || sel[f]!.some((v) => p.valores[f].includes(v)));
}

function Tarjeta({ p, grande, t }: { p: ProgramaVista; grande?: boolean; t: TextosListado }) {
  const cuerpo = (
    <>
      <div className="flex flex-wrap items-center gap-2 text-[0.8rem] font-semibold">
        {grande ? (
          <span className={`${ACENTO} uppercase tracking-[0.08em]`}>{p.destacado}</span>
        ) : (
          p.types.map((tipo) => (
            <span key={tipo} className={`inline-flex items-center gap-1.5 rounded-full border ${FILETE} px-2.5 py-0.5 ${COLOR_TIPO[tipo] ?? COLOR_TIPO.Other}`}>
              <span className="size-1.5 rounded-full bg-current" aria-hidden />
              {t.opciones[tipo] ?? tipo}
            </span>
          ))
        )}
      </div>
      <div className="mt-3 flex items-start gap-4">
        {p.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.logo} alt="" width={48} height={48} loading="lazy" className="size-12 flex-none rounded-lg bg-white object-contain" />
        )}
        <div className="min-w-0">
          <h3 className={`font-display font-semibold leading-snug ${grande ? "text-[1.35rem]" : "text-[1.15rem]"}`}>{p.name}</h3>
          {(p.lugar || p.fechas) && (
            <p className={`mt-1 text-[0.9rem] ${TENUE}`}>
              {[p.lugar, p.fechas].filter(Boolean).map((x, i) => (
                <span key={i} className="block">
                  {x}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      {p.description && <p className="mt-3 text-[0.95rem] leading-relaxed text-aisc-sand/85">{p.description}</p>}
      {p.meta.length > 0 && (
        <p className={`mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.85rem] ${ACENTO}`}>
          {p.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </p>
      )}
    </>
  );
  const clases = `block rounded-2xl border ${FILETE} bg-white/[0.03] p-5 transition-colors hover:border-[#8cc9a0]/60 hover:bg-white/[0.06] ${FOCO} ${grande ? "md:p-6" : ""}`;
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
        className={`flex cursor-pointer list-none items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.9rem] [&::-webkit-details-marker]:hidden ${FOCO} ${
          elegidos.length ? "border-[#8cc9a0] text-[#8cc9a0]" : `${FILETE} text-aisc-sand/85 hover:border-aisc-sand/40`
        }`}
      >
        {t.facetas[faceta]}
        {elegidos.length > 0 && <span className="rounded-full bg-[#8cc9a0] px-1.5 text-[0.75rem] font-semibold text-aisc-night">{elegidos.length}</span>}
        <span aria-hidden className="text-[0.7rem] transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className={`absolute left-0 z-20 mt-2 min-w-[14rem] rounded-xl border ${FILETE} bg-aisc-night p-2 shadow-xl`}>
        {opciones.map((v) => (
          <label key={v} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[0.9rem] hover:bg-white/[0.06]">
            <input type="checkbox" checked={elegidos.includes(v)} onChange={() => alternar(faceta, v)} className="accent-[#8cc9a0]" />
            <span className="flex-1">{t.opciones[v] ?? v}</span>
            <span className={`text-[0.8rem] ${TENUE}`}>{conteos[v] ?? 0}</span>
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
}: {
  upcoming: ProgramaVista[];
  recurring: ProgramaVista[];
  t: TextosListado;
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
    <section className="mx-auto w-full max-w-[60rem] px-6 pb-20 md:px-8">
      <div role="tablist" className={`flex gap-6 border-b ${FILETE}`}>
        {(["upcoming", "recurring"] as const).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={vista === v}
            onClick={() => cambiar(v)}
            className={`-mb-px border-b-2 pb-3 text-[1.05rem] font-semibold transition-colors ${FOCO} ${
              vista === v ? "border-[#8cc9a0] text-aisc-sand" : "border-transparent text-aisc-sand/60 hover:text-aisc-sand"
            }`}
          >
            {t.pestanas[v]}
          </button>
        ))}
      </div>

      {destacados.length > 0 && (
        <div className="mt-8">
          <h2 className="sr-only">{t.destacados}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {destacados.map((p) => (
              <Tarjeta key={p.id} p={p} grande t={t} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {facetas.map((f) => (
          <Filtro key={f} faceta={f} opciones={OPCIONES[f]} elegidos={sel[f] ?? []} conteos={conteos[f]} t={t} alternar={alternar} />
        ))}
        {hayFiltros && (
          <button onClick={() => setSel({})} className={`ml-1 text-[0.9rem] ${LINK} ${FOCO}`}>
            {t.limpiar}
          </button>
        )}
      </div>
      <p className={`mt-4 text-[0.95rem] ${TENUE}`}>{t.conteo(filtrados.length, vista)}</p>

      {todos.length === 0 ? (
        <p className={`mt-8 ${TENUE}`}>{t.sinProgramas[vista]}</p>
      ) : lista.length === 0 ? (
        <p className={`mt-8 ${TENUE}`}>{t.sinResultados}</p>
      ) : (
        grupos.map(({ g, items }) => (
          <div key={g ?? "todos"} className="mt-8">
            {g && grupos.length > 1 && <h2 className="mb-4 font-display text-[1.4rem] font-semibold">{t.grupos[g]}</h2>}
            <div className="grid gap-4">
              {items.map((p) => (
                <Tarjeta key={p.id} p={p} t={t} />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
