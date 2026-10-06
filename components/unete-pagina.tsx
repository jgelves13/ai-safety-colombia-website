import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { cursosCerrados } from "@/lib/cursos";

/* La página de Únete en sus tres idiomas: cada página trae sus textos y sus
   pasos, y esta pieza los dibuja igual. Los tres pasos comparten una sola
   forma: el nombre del paso a la izquierda y sus opciones a la derecha, en una
   lista con filetes, sin tarjetas ni iconos. */

export type OpcionUnete = {
  titulo: string;
  cuerpo: string;
  /** una sola línea, sin rótulos: tiempo, requisitos y costo */
  datos: string;
  href: string;
  cta: string;
  externo: boolean;
};

export type PasoUnete = {
  id: string;
  titulo: string;
  entrada: string;
  opciones: OpcionUnete[];
};

export type TextosUnete = {
  /* El encabezado. */
  h1: string;
  intro: string;
  /* La pastilla coral mientras las aplicaciones están abiertas, y la línea
     coral sobre cada seminario mientras tanto. */
  aviso: string;
  kickerAbierto: string;
  /* El panel final. */
  cta: { kicker: string; title: string; body: string; primario: string; secundario: string };
};

const ENLACE =
  "font-display inline-flex w-fit text-[1.05rem] font-semibold text-aisc-forest transition-colors hover:text-aisc-coral";

function Enlace({ o }: { o: OpcionUnete }) {
  return o.externo ? (
    <a className={ENLACE} href={o.href} target="_blank" rel="noopener noreferrer">
      {o.cta}
    </a>
  ) : (
    <Link className={ENLACE} href={o.href}>
      {o.cta}
    </Link>
  );
}

/* Un paso: el nombre y su frase a la izquierda, las opciones a la derecha. */
function Paso({ paso, kicker }: { paso: PasoUnete; kicker?: string }) {
  return (
    <section id={paso.id} className="scroll-mt-6 bg-aisc-cream">
      <div className="mx-auto w-full max-w-[1448px] px-8 pt-14 md:px-16 md:pt-20">
        <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
        <div className="grid grid-cols-1 gap-8 pt-6 md:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="flex flex-col gap-4 lg:sticky lg:top-8 lg:self-start">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">{paso.titulo}</h2>
            <p className="text-body md:text-body-lg max-w-[420px] text-aisc-ink/85">{paso.entrada}</p>
          </div>
          <ul>
            {paso.opciones.map((o) => (
              <li key={o.titulo} className="flex flex-col border-b border-aisc-forest-deep/15 py-7 first:pt-0 md:py-8 md:first:pt-0">
                {kicker ? <span className="text-kicker mb-3 text-aisc-coral">{kicker}</span> : null}
                <h3 className="text-display-4 md:text-display-4-lg text-balance">{o.titulo}</h3>
                <p className="text-body-sm mt-2.5 max-w-[62ch] text-aisc-ink">{o.cuerpo}</p>
                <p className="text-meta mt-2 max-w-[62ch] text-aisc-muted">{o.datos}</p>
                <div className="mt-4">
                  <Enlace o={o} />
                </div>
              </li>
            ))}
          </ul>
        </div>
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

      <Paso paso={explora} />
      <Paso paso={aprende} kicker={abiertos ? t.kickerAbierto : undefined} />
      <Paso paso={investiga} />

      <div className="bg-aisc-cream pt-14 md:pt-20" />
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
