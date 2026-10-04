import Link from "next/link";
import type { ReactNode } from "react";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { cursosCerrados } from "@/lib/cursos";

/* La página de Únete en sus tres idiomas: cada página trae sus textos y sus
   pasos, y esta pieza los dibuja igual. La forma sigue a aisafety.sg/programs:
   cada paso con una presentación distinta según lo que contiene. El primero,
   la comunidad, va en un panel arena con tres tarjetas ligeras; el segundo,
   los seminarios, en dos tarjetas grandes verdes que son enlace completo, como
   las de la portada; el tercero, los hackathones, en una sola fila ancha. */

export type OpcionUnete = {
  titulo: string;
  cuerpo: string;
  dedicacion: string;
  requisitos: string;
  costo: string;
  href: string;
  cta: string;
  externo: boolean;
};

export type PasoUnete = {
  id: string;
  numero: string;
  titulo: string;
  entrada: string;
  opciones: OpcionUnete[];
};

export type TextosUnete = {
  /* El encabezado. */
  h1: string;
  intro: string;
  /* La pastilla coral mientras las aplicaciones están abiertas, y el
     antetítulo de las tarjetas de los seminarios en cada caso. */
  aviso: string;
  kickerAbierto: string;
  kickerCerrado: string;
  /* Los rótulos de los tres datos. */
  dedicacion: string;
  requisitos: string;
  costo: string;
  /* El panel final. */
  cta: { kicker: string; title: string; body: string; primario: string; secundario: string };
};

const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
const ENLACE = "text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-aisc-forest transition-colors hover:text-aisc-coral";

/* Iconos de una sola línea, uno por opción, al modo de aisafety.sg. */
const ICONO = "size-9 shrink-0 text-aisc-forest";
const TRAZO = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ICONOS: Record<string, ReactNode> = {
  chat: (
    <svg aria-hidden="true" className={ICONO} viewBox="0 0 36 36" {...TRAZO}>
      <path d="M6 9.5A3.5 3.5 0 0 1 9.5 6h17A3.5 3.5 0 0 1 30 9.5v12a3.5 3.5 0 0 1-3.5 3.5H15l-7 6v-6H9.5A3.5 3.5 0 0 1 6 21.5z" />
      <path d="M12 13h12M12 18h8" />
    </svg>
  ),
  libro: (
    <svg aria-hidden="true" className={ICONO} viewBox="0 0 36 36" {...TRAZO}>
      <path d="M18 10c-2.5-2.2-6.5-3-12-3v19c5.5 0 9.5.8 12 3 2.5-2.2 6.5-3 12-3V7c-5.5 0-9.5.8-12 3z" />
      <path d="M18 10v19" />
    </svg>
  ),
  charla: (
    <svg aria-hidden="true" className={ICONO} viewBox="0 0 36 36" {...TRAZO}>
      <rect x="14" y="5" width="8" height="15" rx="4" />
      <path d="M9 16a9 9 0 0 0 18 0M18 25v6M13 31h10" />
    </svg>
  ),
  bifurca: (
    <svg aria-hidden="true" className={ICONO} viewBox="0 0 36 36" {...TRAZO}>
      <path d="M4 18h9M13 18c5 0 5-7 10-7h9M13 18c5 0 5 7 10 7h9" />
      <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  escudo: (
    <svg aria-hidden="true" className={ICONO} viewBox="0 0 36 36" {...TRAZO}>
      <path d="M18 4l12 4.5V18c0 7.5-5 12.5-12 14-7-1.5-12-6.5-12-14V8.5z" />
      <path d="M12 18h12M18 12v12M13.5 13.5l9 9M22.5 13.5l-9 9" />
    </svg>
  ),
  equipo: (
    <svg aria-hidden="true" className={ICONO} viewBox="0 0 36 36" {...TRAZO}>
      <circle cx="13" cy="12" r="4" />
      <circle cx="24" cy="14" r="3" />
      <path d="M5 28c0-5 3.5-8 8-8s8 3 8 8M21 28c0-3.5 2-6 5.5-6S31 24.5 31 28" />
    </svg>
  ),
};
const ICONO_DE: string[][] = [
  ["chat", "libro", "charla"],
  ["bifurca", "escudo"],
  ["equipo"],
];

function Encabezado({ paso }: { paso: PasoUnete }) {
  return (
    <div className="flex flex-col gap-6">
      <div aria-hidden="true" className={HAIRLINE} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
        <h2 className="text-display-2 md:text-display-2-lg text-balance">
          <span className="text-aisc-forest">{paso.numero}</span> {paso.titulo}
        </h2>
        <p className="text-body md:text-body-lg max-w-[520px] text-aisc-ink lg:justify-self-end">{paso.entrada}</p>
      </div>
    </div>
  );
}

/* Los tres datos de una opción, en una columna o en tres. */
function Datos({ o, t, columnas, oscuro }: { o: OpcionUnete; t: TextosUnete; columnas: boolean; oscuro: boolean }) {
  const filas = [
    [t.dedicacion, o.dedicacion],
    [t.requisitos, o.requisitos],
    [t.costo, o.costo],
  ];
  return (
    <dl
      className={`text-body-sm grid grid-cols-1 gap-x-6 gap-y-3 border-t pt-5 ${
        columnas ? "md:grid-cols-2" : ""
      } ${oscuro ? "border-aisc-sand/20" : "border-aisc-forest-deep/15"}`}
    >
      {filas.map(([k, v], i) => (
        <div key={k} className={`flex flex-col gap-0.5 ${columnas && i === 0 ? "md:col-span-2" : ""}`}>
          <dt className={`text-meta ${oscuro ? "text-aisc-sand/60" : "text-aisc-muted"}`}>{k}</dt>
          <dd className={oscuro ? "text-aisc-sand/90" : "text-aisc-ink"}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Enlace({ o, className }: { o: OpcionUnete; className: string }) {
  return o.externo ? (
    <a className={className} href={o.href} target="_blank" rel="noopener noreferrer">
      {o.cta}
    </a>
  ) : (
    <Link className={className} href={o.href}>
      {o.cta}
    </Link>
  );
}

/* 01: panel arena con una tarjeta ligera por opción. */
function Panel({ paso, t }: { paso: PasoUnete; t: TextosUnete }) {
  return (
    <section id={paso.id} className="scroll-mt-6 bg-aisc-cream px-6 pt-12 md:pt-14 lg:pt-16">
      <div className="mx-auto w-full max-w-[1400px] rounded-[var(--radius)] bg-aisc-sand px-6 py-10 md:px-10 md:py-12 lg:py-14">
        <Encabezado paso={paso} />
        <ul className="mt-10 grid grid-cols-1 gap-3 md:mt-12 lg:grid-cols-3">
          {paso.opciones.map((o, i) => (
            <li className="flex" key={o.titulo}>
              <article className="flex w-full flex-col rounded-[var(--radius)] border border-aisc-forest-deep/25 bg-aisc-cream p-6 md:p-7 lg:p-8">
                {ICONOS[ICONO_DE[0][i]]}
                <div className="flex flex-col gap-3 pt-8">
                  <h3 className="text-display-4 md:text-display-4-lg text-balance">{o.titulo}</h3>
                  <p className="text-body-sm text-aisc-ink">{o.cuerpo}</p>
                  <div className="pt-2">
                    <Datos o={o} t={t} columnas={false} oscuro={false} />
                  </div>
                </div>
                <div className="mt-auto pt-6">
                  <Enlace o={o} className={ENLACE} />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 02: dos tarjetas grandes verdes, enlace completo, como las de la portada. */
function Destacado({ paso, t, abiertos }: { paso: PasoUnete; t: TextosUnete; abiertos: boolean }) {
  const kicker = abiertos ? t.kickerAbierto : t.kickerCerrado;
  return (
    <section id={paso.id} className="scroll-mt-6 bg-aisc-cream">
      <div className="mx-auto w-full max-w-[1448px] px-8 pt-12 md:px-16 md:pt-14 lg:pt-16">
        <Encabezado paso={paso} />
        <ul className="mt-10 grid grid-cols-1 gap-[10px] md:mt-12 md:grid-cols-2">
          {paso.opciones.map((o, i) => (
            <li className="flex" key={o.titulo}>
              <Link
                className="group flex w-full min-w-0 flex-col rounded-[var(--radius)] border border-aisc-forest bg-aisc-forest-deep p-6 text-aisc-sand transition-colors hover:bg-aisc-night md:min-h-[440px] md:p-8 lg:p-10"
                href={o.href}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-kicker text-aisc-sand/70">{kicker}</span>
                  <span className="[&>svg]:text-aisc-sand/80">{ICONOS[ICONO_DE[1][i]]}</span>
                </span>
                <span className="mt-auto flex flex-col gap-3 pt-14 md:pt-16">
                  <span className="text-display-3 md:text-display-3-lg block text-balance">{o.titulo}</span>
                  <span className="text-body-sm block max-w-[600px] text-aisc-sand/90">{o.cuerpo}</span>
                </span>
                <span className="block pt-6">
                  <Datos o={o} t={t} columnas oscuro />
                </span>
                <span className="text-display-4 md:text-display-4-lg mt-8 w-fit self-start text-aisc-sand transition-colors group-hover:text-aisc-sand/72">
                  {o.cta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 03: una sola fila ancha. */
function Fila({ paso, t }: { paso: PasoUnete; t: TextosUnete }) {
  return (
    <section id={paso.id} className="scroll-mt-6 bg-aisc-cream">
      <div className="mx-auto w-full max-w-[1448px] px-8 pt-12 md:px-16 md:pt-14 lg:pt-16">
        <Encabezado paso={paso} />
        <ul className="mt-10 flex flex-col gap-3 md:mt-12">
          {paso.opciones.map((o, i) => (
            <li key={o.titulo}>
              <article className="grid grid-cols-1 gap-8 rounded-[var(--radius)] border border-aisc-forest bg-white/80 p-6 md:p-10 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col gap-4">
                  {ICONOS[ICONO_DE[2][i]]}
                  <h3 className="text-display-3 md:text-display-3-lg pt-4 text-balance">{o.titulo}</h3>
                  <p className="text-body-sm max-w-[560px] text-aisc-ink">{o.cuerpo}</p>
                </div>
                <div className="flex flex-col gap-6 lg:justify-end">
                  <Datos o={o} t={t} columnas={false} oscuro={false} />
                  <Enlace o={o} className={ENLACE} />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function UnetePagina({ active, pasos, t }: { active: string; pasos: PasoUnete[]; t: TextosUnete }) {
  const abiertos = !cursosCerrados();
  const [explora, aprende, investiga] = pasos;
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="1415"
          decoding="async"
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-hero-unete.svg"
        />
        <SiteHeader active={active} />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">{t.h1}</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">{t.intro}</p>
            {abiertos ? (
              <a
                className="text-body-sm inline-flex w-fit items-center gap-2 rounded-full bg-aisc-coral px-4 py-1.5 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85"
                href={`#${aprende.id}`}
              >
                {t.aviso}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <Panel paso={explora} t={t} />
      <Destacado paso={aprende} t={t} abiertos={abiertos} />
      <Fila paso={investiga} t={t} />

      <div className="bg-aisc-cream pt-12 md:pt-14 lg:pt-16" />
      <CtaPanel kicker={t.cta.kicker} title={t.cta.title} body={t.cta.body}>
        <a className={CTA_LINK_PRIMARY} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          {t.cta.primario}
        </a>
        <a className={CTA_LINK} href="https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF" target="_blank" rel="noopener noreferrer">
          {t.cta.secundario}
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
