"use client";

import { useMemo, useState } from "react";
import { PAST_EVENTS } from "./events-data";

/** "Todos" es el estado inicial y muestra la lista completa; el resto filtra por tipo. */
const FILTROS: { label: string; types: string[] | null }[] = [
  { label: "Todos", types: null },
  { label: "Charlas", types: ["Charla"] },
  { label: "Cenas de diálogo", types: ["Cena"] },
  { label: "Paneles y conversatorios", types: ["Panel", "Conversatorio"] },
];

const CHIP_BASE =
  "border-aisc-forest text-meta md:text-meta-lg min-h-11 rounded-[8px] border px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-forest";
const CHIP_ON = "bg-aisc-forest-deep text-aisc-sand";
const CHIP_OFF = "bg-aisc-cream text-aisc-forest hover:bg-aisc-sand";

export default function PastEvents() {
  const [active, setActive] = useState(FILTROS[0].label);

  const events = useMemo(() => {
    const filtro = FILTROS.find((f) => f.label === active);
    if (!filtro?.types) return PAST_EVENTS;
    return PAST_EVENTS.filter((e) => filtro.types!.includes(e.type));
  }, [active]);

  return (
    <section id="pasados">
      <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-8 py-12 md:py-14 lg:py-16">
        <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-8">
          <h2 className="text-display-2 md:text-display-2-lg">Lo que ya hicimos</h2>
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="text-meta md:text-meta-lg text-aisc-forest">Filtrar por</p>
            <div className="flex flex-wrap gap-2 lg:justify-end" role="group" aria-label="Filtrar eventos">
              {FILTROS.map((filtro) => (
                <button
                  key={filtro.label}
                  type="button"
                  aria-pressed={filtro.label === active}
                  onClick={() => setActive(filtro.label)}
                  className={`${CHIP_BASE} ${filtro.label === active ? CHIP_ON : CHIP_OFF}`}
                >
                  {filtro.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 lg:grid-cols-2 lg:gap-5">
          {events.map((event) => (
            <article
              key={`${event.date}-${event.title}`}
              className="border-aisc-forest flex min-h-[232px] min-w-0 flex-col rounded-[8px] border bg-aisc-cream p-8 text-aisc-ink md:p-10"
            >
              <div className="text-meta md:text-meta-lg text-aisc-forest flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <p>{event.date}</p>
                <p className="sm:shrink-0 sm:text-right">{event.type}</p>
              </div>
              <div className="mt-12 flex flex-1 flex-col gap-3">
                <h3 className="text-display-4 md:text-display-4-lg break-words text-balance">{event.title}</h3>
                <p className="text-body-sm max-w-[540px] text-aisc-ink">{event.desc}</p>
              </div>
              <div className="text-meta mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-aisc-muted">
                <span>{event.venue}</span>
                {event.url ? (
                  <a
                    className="text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver el registro
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
