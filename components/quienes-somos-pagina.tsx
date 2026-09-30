import type { ReactNode } from "react";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import type { Idioma } from "@/lib/idiomas";

/* La página de «quiénes somos» al modo de aisafety.sg/about: encabezado de
   una línea, «Sobre nosotros» en dos columnas y la gente en tarjetas con
   borde, retrato cuadrado a la izquierda y nombre, rol, bio y LinkedIn a la
   derecha. Cada idioma manda sus textos; la forma es una sola. */

export type Persona = {
  nombre: string;
  rol: ReactNode;
  foto?: string;
  linkedin?: string;
  bio: ReactNode;
};

export type GrupoPersonas = {
  id: string;
  titulo: string;
  entrada: string;
  personas: Persona[];
};

export type TextosQuienesSomos = {
  kicker: string;
  h1: string;
  intro: string;
  sobreTitulo: string;
  linkedin: string;
  cta: { title: string; body: string; primario: string; secundario: string };
};

const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
/* El mismo trazo de LinkedIn que usa el pie. */
const LINKEDIN_D =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z";
const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

function Encabezado({ titulo, entrada }: { titulo: string; entrada: string }) {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div aria-hidden="true" className={HAIRLINE} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
        <h2 className="text-display-2 md:text-display-2-lg">{titulo}</h2>
        <p className="text-body md:text-body-lg max-w-[520px] text-aisc-ink lg:justify-self-end">{entrada}</p>
      </div>
    </div>
  );
}

/* La tarjeta de SASH: retrato de 150/190 px, nombre en display-3, rol en
   verde, bio y el enlace a LinkedIn abajo. Sin foto van las iniciales. */
function Tarjeta({ p, linkedin }: { p: Persona; linkedin: string }) {
  return (
    <li>
      <article className="flex h-full min-w-0 flex-col gap-5 rounded-[var(--radius)] border border-aisc-forest-deep/25 bg-aisc-cream p-5 sm:flex-row md:p-6">
        <div className="flex size-[150px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand md:size-[190px]">
          {p.foto ? (
            <img
              alt={p.nombre}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
              src={p.foto}
            />
          ) : (
            <span aria-hidden="true" className="text-display-2 md:text-display-2-lg text-aisc-forest/45">
              {iniciales(p.nombre)}
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="flex min-w-0 flex-col gap-1.5">
            <h3 className="text-display-3 md:text-display-3-lg break-words">{p.nombre}</h3>
            <p className="text-body-sm text-aisc-forest">{p.rol}</p>
          </header>
          <p className="text-body-sm text-aisc-ink">{p.bio}</p>
          {p.linkedin ? (
            <a
              className="mt-auto inline-flex w-fit text-aisc-forest transition-colors hover:text-aisc-coral"
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.nombre} ${linkedin}`}
              title={linkedin}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
                <path d={LINKEDIN_D} />
              </svg>
            </a>
          ) : null}
        </div>
      </article>
    </li>
  );
}

export default function QuienesSomosPagina({
  active,
  idioma = "es",
  sobre,
  grupos,
  t,
}: {
  active: string;
  idioma?: Idioma;
  sobre: ReactNode[];
  grupos: GrupoPersonas[];
  t: TextosQuienesSomos;
}) {
  return (
    <main lang={idioma} className={PAGE_SHELL}>
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
          src="/aisc/patterns/aisc-hero-quienes-somos.svg"
        />
        <SiteHeader active={active} />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">{t.kicker}</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">{t.h1}</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand">{t.intro}</p>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-aisc-cream">
        <div className={`${CONTENEDOR} flex flex-col gap-10 pt-14 pb-14 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24`}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,1.4fr)] md:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg">{t.sobreTitulo}</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
              {sobre.map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {grupos.map((g) => (
        <section id={g.id} key={g.id} className="bg-aisc-cream">
          <div className={`${CONTENEDOR} pt-0 pb-14 md:pb-20 lg:pb-24`}>
            <Encabezado titulo={g.titulo} entrada={g.entrada} />
            <ul className="mt-10 grid grid-cols-1 gap-[10px] md:mt-12 lg:grid-cols-2">
              {g.personas.map((p) => (
                <Tarjeta key={p.nombre} p={p} linkedin={t.linkedin} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaPanel title={t.cta.title} body={t.cta.body}>
        <a className={CTA_LINK_PRIMARY} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          {t.cta.primario}
        </a>
        <a className={CTA_LINK} href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer">
          {t.cta.secundario}
        </a>
      </CtaPanel>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
