"use client";

import { useMemo, useState } from "react";
import { PAST_EVENTS } from "./events-data";

/** "Highlights" is the landing state and shows the full list; the rest narrow
    down to a single event type. */
const FILTERS = [
  { label: "Highlights", type: null },
  { label: "Talks", type: "Talk" },
  { label: "Workshops", type: "Workshop" },
  { label: "Convenings", type: "Convening" },
  { label: "Briefings", type: "Briefing" },
];

const CHIP_BASE =
  "border-sash-cobalt text-meta md:text-meta-lg min-h-11 rounded-[8px] border px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sash-cobalt";
const CHIP_ON = "bg-sash-midnight text-sash-frost";
const CHIP_OFF = "bg-white text-sash-cobalt hover:bg-sash-frost";

export default function PastEvents() {
  const [active, setActive] = useState(FILTERS[0].label);

  const events = useMemo(() => {
    const filter = FILTERS.find((f) => f.label === active);
    if (!filter?.type) return PAST_EVENTS;
    return PAST_EVENTS.filter((e) => e.type === filter.type);
  }, [active]);

  return (
    <section id="past">
      <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-8 py-12 md:py-14 lg:py-16">
        <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-8">
          <h2 className="text-display-2 md:text-display-2-lg">Past Events</h2>
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="text-meta md:text-meta-lg text-sash-cobalt">Filter by</p>
            <div className="flex flex-wrap gap-2 lg:justify-end" role="group" aria-label="Filter events">
              {FILTERS.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  aria-pressed={filter.label === active}
                  onClick={() => setActive(filter.label)}
                  className={`${CHIP_BASE} ${filter.label === active ? CHIP_ON : CHIP_OFF}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 lg:grid-cols-2 lg:gap-5">
          {events.map((event) => (
            <article key={`${event.date}-${event.title}`} className="border-sash-cobalt flex min-h-[232px] min-w-0 flex-col rounded-[8px] border bg-white p-8 text-sash-graphite md:p-10">
              <div className="text-meta md:text-meta-lg text-sash-cobalt flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <p>{event.date}</p>
                <p className="sm:shrink-0 sm:text-right">{event.type}</p>
              </div>
              <div className="mt-12 flex flex-1 flex-col gap-3">
                <h3 className="text-display-4 md:text-display-4-lg break-words">{event.title}</h3>
                <p className="text-body-sm max-w-[540px] text-sash-graphite">{event.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
