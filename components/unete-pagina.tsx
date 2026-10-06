import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { cursosCerrados } from "@/lib/cursos";

/* La página de Únete en sus tres idiomas: cada página trae sus textos y sus
   pasos, y esta pieza los dibuja igual. Las seis opciones van en una sola
   grilla de tarjetas, al modo de los papers destacados de MAIA: la ilustración
   arriba, y debajo el paso, el nombre y dos líneas cortas. */

export type OpcionUnete = {
  titulo: string;
  /** cuándo y dónde, en una línea corta */
  linea: string;
  /** requisitos y costo, en una línea corta */
  condiciones: string;
  /** una de las ilustraciones de `public/aisc/patterns/` */
  imagen: string;
  href: string;
  externo: boolean;
};

export type PasoUnete = {
  id: string;
  titulo: string;
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

const TARJETA =
  "group flex w-full flex-col rounded-[var(--radius)] bg-aisc-sand p-5 transition-colors hover:bg-aisc-sand/60";

function Tarjeta({ o, paso, aviso }: { o: OpcionUnete; paso: string; aviso?: string }) {
  const cuerpo = (
    <>
      <div aria-hidden="true" className="relative aspect-[16/10] w-full overflow-hidden bg-aisc-forest-deep">
        <img
          src={o.imagen}
          alt=""
          loading="lazy"
          className="absolute top-[-12%] right-[-22%] w-[125%] max-w-none transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <span className={`text-kicker mt-5 ${aviso ? "text-aisc-coral" : "text-aisc-muted"}`}>{aviso ?? paso}</span>
      <h3 className="font-display mt-2 text-[1.3rem] leading-snug font-semibold text-balance text-aisc-forest transition-colors group-hover:text-aisc-coral">
        {o.titulo}
      </h3>
      <p className="text-body-sm mt-1.5 font-semibold text-aisc-ink">{o.linea}</p>
      <p className="text-meta mt-auto pt-4 text-aisc-muted">{o.condiciones}</p>
    </>
  );
  return o.externo ? (
    <a className={TARJETA} href={o.href} target="_blank" rel="noopener noreferrer">
      {cuerpo}
    </a>
  ) : (
    <Link className={TARJETA} href={o.href}>
      {cuerpo}
    </Link>
  );
}

export default function UnetePagina({ active, pasos, t }: { active: string; pasos: PasoUnete[]; t: TextosUnete }) {
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
        <div className="mx-auto w-full max-w-[1448px] px-8 pt-14 pb-14 md:px-16 md:pt-16 md:pb-16">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pasos.flatMap((paso) =>
              paso.opciones.map((o) => (
                <li key={o.titulo} id={paso.opciones[0] === o ? paso.id : undefined} className="flex scroll-mt-6">
                  <Tarjeta o={o} paso={paso.titulo} aviso={paso === aprende && abiertos ? t.kickerAbierto : undefined} />
                </li>
              )),
            )}
          </ul>
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
