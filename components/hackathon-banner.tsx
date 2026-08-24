"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { type Idioma, idiomaDe, rutaEn } from "@/lib/idiomas";

/* El sprint que estamos organizando ahora mismo. Mientras esté vigente manda
   sobre el resto del inicio: va arriba del hero, igual que en el sitio actual. */
export const SPRINT: Record<
  Idioma,
  { badge: string; title: string; body: string; cta: string }
> = {
  es: {
    badge: "Apart Research · CeSIA",
    title: "AI Incident Response Sprint · presencial en Bogotá",
    body: "Del 11 al 13 de septiembre. Un fin de semana para investigar cómo se responde cuando un sistema de IA falla en serio: contención, reconstrucción del incidente, respuesta regulatoria y comunicación. USD 2.000 en premios y las aplicaciones cierran el 6 de septiembre.",
    cta: "Ver la convocatoria",
  },
  en: {
    badge: "Apart Research · CeSIA",
    title: "AI Incident Response Sprint · in person in Bogotá",
    body: "11 to 13 September. A weekend to research what happens once an AI system fails badly: containment, reconstructing the incident, the regulatory response and how it gets communicated. USD 2,000 in prizes, and applications close on 6 September.",
    cta: "See the call",
  },
  pt: {
    badge: "Apart Research · CeSIA",
    title: "AI Incident Response Sprint · presencial em Bogotá",
    body: "De 11 a 13 de setembro. Um fim de semana para pesquisar como se responde quando um sistema de IA falha de verdade: contenção, reconstrução do incidente, resposta regulatória e comunicação. USD 2.000 em prêmios e as inscrições fecham em 6 de setembro.",
    cta: "Ver a chamada",
  },
};

/** fecha de arranque del sprint */
export const SPRINT_EMPIEZA = "2026-09-11";

function diasHasta(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const target = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86_400_000);
}

/** La cuenta regresiva se resuelve en el cliente para no congelar el número en
    el HTML estático ni provocar un desajuste de hidratación. */
function Countdown({ idioma }: { idioma: Idioma }) {
  const [texto, setTexto] = useState<string | null>(null);

  useEffect(() => {
    const dias = diasHasta(SPRINT_EMPIEZA);
    const cuenta: Record<Idioma, (d: number) => string | null> = {
      es: (d) => (d > 1 ? `Faltan ${d} días` : d === 1 ? "Falta 1 día" : d === 0 ? "Es hoy" : null),
      en: (d) => (d > 1 ? `${d} days to go` : d === 1 ? "1 day to go" : d === 0 ? "Today" : null),
      pt: (d) => (d > 1 ? `Faltam ${d} dias` : d === 1 ? "Falta 1 dia" : d === 0 ? "É hoje" : null),
    };
    setTexto(cuenta[idioma](dias));
  }, [idioma]);

  if (!texto) return null;
  return <span className="text-meta text-aisc-sand/75">{texto}</span>;
}

export default function HackathonBanner() {
  const ruta = usePathname() ?? "/";
  const idioma = idiomaDe(ruta);
  const t = SPRINT[idioma];

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
            {t.badge}
          </span>
          <h2 className="text-display-3 md:text-display-3-lg text-balance">{t.title}</h2>
          <p className="text-body-sm text-aisc-sand/85">{t.body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            className="text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-sand"
            href={rutaEn(idioma, "/sprint")}
          >
            {t.cta}
          </Link>
          <Countdown idioma={idioma} />
        </div>
      </div>
    </div>
  );
}
