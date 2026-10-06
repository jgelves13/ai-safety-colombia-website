import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import Puntos, { type Patron } from "@/components/puntos";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, CTA_LINK_VERDE, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { type CursoId, RUTA_APLICAR_CURSOS, cursosCerrados } from "@/lib/cursos";
import { PAGINAS_CURSO } from "@/lib/cursos-paginas";
import type { Idioma } from "@/lib/idiomas";

/* La página de Únete en sus tres idiomas: cada página trae sus textos y sus
   pasos, y esta pieza los dibuja igual. Va al modo del «Get Involved» de MAIA:
   una columna de lectura con una sección por paso, el ícono junto al título, y
   cada opción con su párrafo, sus datos y un botón. En los seminarios van los
   temas semana a semana, y mientras las aplicaciones están abiertas, un
   recuadro para aplicar. */

export type OpcionUnete = {
  titulo: string;
  cuerpo: string;
  /** dedicación, lugar, requisitos y costo, en una frase o dos */
  datos: string;
  cta: string;
  href: string;
  externo: boolean;
  /** los seminarios traen la lista de temas de su página */
  curso?: CursoId;
  /** un segundo enlace, más discreto que el botón */
  secundario?: { texto: string; href: string };
};

export type PasoUnete = {
  id: string;
  titulo: string;
  entrada: string;
  patron: Patron;
  opciones: OpcionUnete[];
};

export type TextosUnete = {
  /* El encabezado. */
  h1: string;
  intro: string;
  /* La pastilla coral mientras las aplicaciones están abiertas. */
  aviso: string;
  /* La frase que abre la lista de temas de cada seminario. */
  temas: string;
  /* El recuadro para aplicar, mientras las aplicaciones están abiertas. */
  aplicar: { titulo: string; linea: string };
  /* El panel final. */
  cta: { kicker: string; title: string; body: string; primario: string; secundario: string };
};

const SECUNDARIO = "text-body-sm font-semibold text-aisc-forest transition-colors hover:text-aisc-coral";

function Enlace({ href, externo, className, children }: { href: string; externo: boolean; className: string; children: React.ReactNode }) {
  return externo ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

function Opcion({ o, idioma, temas }: { o: OpcionUnete; idioma: Idioma; temas: string }) {
  const unidades = o.curso ? PAGINAS_CURSO[o.curso][idioma].semanas.unidades : [];
  return (
    <article className="border-t border-aisc-forest-deep/12 pt-8">
      <h3 className="font-display text-[1.45rem] leading-snug font-semibold text-balance text-aisc-forest md:text-[1.6rem]">{o.titulo}</h3>
      <p className="text-body md:text-body-lg mt-3 text-aisc-ink">{o.cuerpo}</p>
      {unidades.length ? (
        <>
          <p className="text-body mt-5 text-aisc-ink">{temas}</p>
          <ul className="text-body mt-2 list-disc space-y-1 pl-6 text-aisc-ink marker:text-aisc-forest">
            {unidades.map((u) => (
              <li key={u.titulo}>{u.titulo}</li>
            ))}
          </ul>
        </>
      ) : null}
      <p className="text-body mt-5 font-semibold text-aisc-ink">{o.datos}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Enlace href={o.href} externo={o.externo} className={CTA_LINK_VERDE}>
          {o.cta}
        </Enlace>
        {o.secundario ? (
          <Link className={SECUNDARIO} href={o.secundario.href}>
            {o.secundario.texto}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default function UnetePagina({
  active,
  idioma,
  pasos,
  t,
}: {
  active: string;
  idioma: Idioma;
  pasos: PasoUnete[];
  t: TextosUnete;
}) {
  const abiertos = !cursosCerrados();
  const aprende = pasos[1];
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

      <section className="bg-aisc-cream">
        <nav className="border-b border-aisc-forest-deep/12">
          <ul className="mx-auto flex w-full max-w-[820px] flex-wrap justify-center gap-x-10 gap-y-2 px-8 py-5">
            {pasos.map((paso) => (
              <li key={paso.id}>
                <a className="font-display text-[1.1rem] font-semibold text-aisc-forest transition-colors hover:text-aisc-coral" href={`#${paso.id}`}>
                  {paso.titulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-auto w-full max-w-[820px] px-8 pt-6 pb-20 md:pb-24">
          {pasos.map((paso) => (
            <section key={paso.id} id={paso.id} className="scroll-mt-6 pt-14 md:pt-16">
              <div className="flex items-center gap-4">
                <Puntos patron={paso.patron} className="size-10 shrink-0 text-aisc-forest" />
                <h2 className="text-display-2 md:text-display-2-lg text-aisc-forest-deep">{paso.titulo}</h2>
              </div>
              <p className="text-body md:text-body-lg mt-4 text-aisc-muted">{paso.entrada}</p>

              <div className="mt-10 flex flex-col gap-12">
                {paso.opciones.map((o) => (
                  <Opcion key={o.titulo} o={o} idioma={idioma} temas={t.temas} />
                ))}
              </div>

              {paso === aprende && abiertos ? (
                <Link
                  href={RUTA_APLICAR_CURSOS[idioma]}
                  className="group mt-12 flex items-start gap-5 rounded-[var(--radius)] border-2 border-aisc-forest p-6 transition-colors hover:border-aisc-coral md:p-7"
                >
                  <Puntos patron="seminarios" className="mt-1 size-9 shrink-0 text-aisc-coral" />
                  <span className="flex flex-col gap-1.5">
                    <span className="font-display text-[1.3rem] leading-snug font-semibold text-aisc-forest transition-colors group-hover:text-aisc-coral">
                      {t.aplicar.titulo}
                    </span>
                    <span className="text-body text-aisc-ink">{t.aplicar.linea}</span>
                  </span>
                </Link>
              ) : null}
            </section>
          ))}
        </div>
      </section>

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
