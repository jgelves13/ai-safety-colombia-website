import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import Puntos, { type Patron } from "@/components/puntos";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  CTA_LINK_VERDE,
  CTA_PATTERN_BOTTOM,
  HERO_CORNER_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { type CursoId, RUTA_APLICAR_CURSOS, cursosCerrados } from "@/lib/cursos";
import { PAGINAS_CURSO, ROTULOS_CURSO } from "@/lib/cursos-paginas";
import type { Idioma } from "@/lib/idiomas";

/* La página de Únete en sus tres idiomas: cada página trae sus textos y sus
   pasos, y esta pieza los dibuja igual. Va al modo del «Get Involved» de MAIA:
   una sección por paso, el ícono junto al título, y cada opción con su
   párrafo, sus datos y un botón. Como en las páginas de los seminarios, cada
   paso tiene su banda y su forma: Explora en tarjetas suaves sobre el papel,
   Aprende en la banda oscura con los temas semana a semana y la franja para
   aplicar, e Investiga en arena con las portadas de los reportes premiados. */

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
  /* La franja para aplicar, mientras las aplicaciones están abiertas. */
  aplicar: { titulo: string; linea: string };
  /* El panel final. */
  cta: { kicker: string; title: string; body: string; primario: string; secundario: string };
};

const ANCHO = "mx-auto w-full max-w-[1200px] px-8 md:px-12";
const BANDA = "scroll-mt-6 py-16 md:py-24";
const TITULO_OPCION = "font-display text-[1.35rem] leading-snug font-semibold text-balance text-aisc-forest md:text-[1.5rem]";
/* Las portadas de tres reportes premiados del último hackathon. */
const PORTADAS_HACKATHON = [
  "/aisc/hackathon/coldron.jpg",
  "/aisc/hackathon/identidad-colombiana.jpg",
  "/aisc/hackathon/pasos-del-razonamiento.jpg",
];

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

function Encabezado({ paso, oscuro = false }: { paso: PasoUnete; oscuro?: boolean }) {
  return (
    <div className="max-w-[760px]">
      <div className="flex items-center gap-4">
        <Puntos patron={paso.patron} className={`size-10 shrink-0 ${oscuro ? "text-aisc-mint" : "text-aisc-forest"}`} />
        <h2 className={`text-display-2 md:text-display-2-lg ${oscuro ? "text-aisc-sand" : "text-aisc-forest-deep"}`}>{paso.titulo}</h2>
      </div>
      <p className={`text-body md:text-body-lg mt-4 ${oscuro ? "text-aisc-sand/80" : "text-aisc-muted"}`}>{paso.entrada}</p>
    </div>
  );
}

/* Explora: tres tarjetas de fondo suave sobre el papel. */
function Explora({ paso }: { paso: PasoUnete }) {
  return (
    <section id={paso.id} className={`${BANDA} bg-aisc-cream`}>
      <div className={ANCHO}>
        <Encabezado paso={paso} />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {paso.opciones.map((o) => (
            <li key={o.titulo} className="flex flex-col rounded-[var(--radius)] bg-aisc-sand p-7">
              <h3 className={TITULO_OPCION}>{o.titulo}</h3>
              <p className="text-body mt-3 text-aisc-ink">{o.cuerpo}</p>
              <p className="text-body-sm mt-4 font-semibold text-aisc-ink">{o.datos}</p>
              <div className="mt-auto pt-6">
                <Enlace href={o.href} externo={o.externo} className={CTA_LINK_VERDE}>
                  {o.cta}
                </Enlace>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Aprende: la banda oscura, con los dos seminarios en tarjetas blancas y,
   mientras las aplicaciones están abiertas, una franja para aplicar. */
function Aprende({ paso, idioma, t, abiertos }: { paso: PasoUnete; idioma: Idioma; t: TextosUnete; abiertos: boolean }) {
  return (
    <section id={paso.id} className={`${BANDA} relative overflow-hidden bg-aisc-forest-deep text-aisc-sand`}>
      <img
        alt=""
        aria-hidden="true"
        loading="lazy"
        width="1697"
        height="995"
        decoding="async"
        className={CTA_PATTERN_BOTTOM}
        src="/aisc/patterns/aisc-wash-lattice.svg"
      />
      <div className={`${ANCHO} relative z-10`}>
        <Encabezado paso={paso} oscuro />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {paso.opciones.map((o) => {
            const unidades = o.curso ? PAGINAS_CURSO[o.curso][idioma].semanas.unidades : [];
            return (
              <li key={o.titulo} className="flex flex-col rounded-[var(--radius)] bg-aisc-cream p-7 text-aisc-ink md:p-8">
                <h3 className={TITULO_OPCION}>{o.titulo}</h3>
                <p className="text-body mt-3">{o.cuerpo}</p>
                {unidades.length ? (
                  <>
                    <p className="text-body-sm mt-5 text-aisc-muted">{t.temas}</p>
                    <ol className="mt-2 flex flex-col border-t border-aisc-line">
                      {unidades.map((u, i) => (
                        <li key={u.titulo} className="text-body-sm grid grid-cols-[2rem_1fr] border-b border-aisc-line py-2">
                          <span className="font-display font-semibold text-aisc-coral">{i + 1}</span>
                          <span>{u.titulo}</span>
                        </li>
                      ))}
                    </ol>
                  </>
                ) : null}
                <p className="text-body-sm mt-5 font-semibold">{o.datos}</p>
                <div className="mt-auto pt-6">
                  <Enlace href={o.href} externo={o.externo} className={CTA_LINK_VERDE}>
                    {o.cta}
                  </Enlace>
                </div>
              </li>
            );
          })}
        </ul>
        {abiertos ? (
          <div className="mt-10 flex flex-col gap-5 border-t border-aisc-sand/20 pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-[1.4rem] leading-snug font-semibold text-aisc-sand">{t.aplicar.titulo}</span>
              <span className="text-body text-aisc-sand/85">{t.aplicar.linea}</span>
            </div>
            <Link className={`${CTA_LINK_PRIMARY} shrink-0`} href={RUTA_APLICAR_CURSOS[idioma]}>
              {ROTULOS_CURSO[idioma].aplicar}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* Investiga: la banda arena, el texto a la izquierda y a la derecha las
   portadas de tres reportes premiados. */
function Investiga({ paso }: { paso: PasoUnete }) {
  return (
    <section id={paso.id} className={`${BANDA} bg-aisc-sand`}>
      <div className={ANCHO}>
        <Encabezado paso={paso} />
        {paso.opciones.map((o) => (
          <div key={o.titulo} className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <h3 className={TITULO_OPCION}>{o.titulo}</h3>
              <p className="text-body md:text-body-lg mt-3 text-aisc-ink">{o.cuerpo}</p>
              <p className="text-body mt-5 font-semibold text-aisc-ink">{o.datos}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Enlace href={o.href} externo={o.externo} className={CTA_LINK_VERDE}>
                  {o.cta}
                </Enlace>
                {o.secundario ? (
                  <Link className="text-body-sm font-semibold text-aisc-forest transition-colors hover:text-aisc-coral" href={o.secundario.href}>
                    {o.secundario.texto}
                  </Link>
                ) : null}
              </div>
            </div>
            <Link href={o.secundario?.href ?? o.href} aria-hidden="true" tabIndex={-1} className="group grid grid-cols-3 gap-3 md:gap-4">
              {PORTADAS_HACKATHON.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width={900}
                  height={1165}
                  loading="lazy"
                  className={`aspect-[4/5] w-full bg-white object-cover object-top shadow-sm ring-1 ring-aisc-forest-deep/10 transition-transform duration-300 ${
                    i === 1 ? "lg:-translate-y-4 group-hover:-translate-y-5" : "group-hover:-translate-y-1"
                  }`}
                />
              ))}
            </Link>
          </div>
        ))}
      </div>
    </section>
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

      <nav className="border-b border-aisc-line bg-aisc-cream">
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

      <Explora paso={pasos[0]} />
      <Aprende paso={aprende} idioma={idioma} t={t} abiertos={abiertos} />
      <Investiga paso={pasos[2]} />

      {/* El panel final va sobre el papel; este hueco lo separa de la banda arena. */}
      <div aria-hidden="true" className="h-14 bg-aisc-cream md:h-16" />
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
