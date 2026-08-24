"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* El sprint que estamos organizando ahora mismo. Mientras esté vigente manda
   sobre el resto del inicio: va arriba del hero, igual que en el sitio actual. */
export const SPRINT = {
  badge: "Apart Research · CeSIA",
  title: "AI Incident Response Sprint · presencial en Bogotá",
  body: "Del 11 al 13 de septiembre. Un fin de semana para investigar cómo se responde cuando un sistema de IA falla en serio: contención, reconstrucción del incidente, respuesta regulatoria y comunicación. USD 2.000 en premios y las aplicaciones cierran el 6 de septiembre.",
  cta: "Ver la convocatoria",
  href: "/sprint",
  /* fecha de arranque del sprint */
  startsAt: "2026-09-11",
};

function diasHasta(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const target = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86_400_000);
}

/** La cuenta regresiva se resuelve en el cliente para no congelar el número en
    el HTML estático ni provocar un desajuste de hidratación. */
function Countdown() {
  const [texto, setTexto] = useState<string | null>(null);

  useEffect(() => {
    const dias = diasHasta(SPRINT.startsAt);
    if (dias > 1) setTexto(`Faltan ${dias} días`);
    else if (dias === 1) setTexto("Falta 1 día");
    else if (dias === 0) setTexto("Es hoy");
    else setTexto(null);
  }, []);

  if (!texto) return null;
  return <span className="text-meta text-aisc-sand/75">{texto}</span>;
}

export default function HackathonBanner() {
  return (
    <div className="relative overflow-hidden rounded-[22px] bg-aisc-forest px-6 py-8 text-aisc-sand md:px-11 md:py-9">
      {/* el círculo salvia que se asoma por la esquina, como en el sitio actual */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[120px] -right-[80px] size-[280px] rounded-full bg-aisc-sage opacity-45"
      />
      <div className="relative z-10 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex max-w-[720px] flex-col items-start gap-3">
          <span className="text-kicker inline-flex items-center rounded-full bg-aisc-coral px-3 py-1.5 text-aisc-cream">
            {SPRINT.badge}
          </span>
          <h2 className="text-display-3 md:text-display-3-lg text-balance">{SPRINT.title}</h2>
          <p className="text-body-sm text-aisc-sand/85">{SPRINT.body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            className="text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-sand"
            href={SPRINT.href}
          >
            {SPRINT.cta}
          </Link>
          <Countdown />
        </div>
      </div>
    </div>
  );
}
