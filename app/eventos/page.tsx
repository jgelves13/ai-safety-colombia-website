import type { Metadata } from "next";
import PastEvents from "./past-events";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Eventos | AI Safety Colombia",
  description:
    "Charlas abiertas, talleres, cenas de diálogo y paneles sobre seguridad y gobernanza de la inteligencia artificial en Bogotá.",
};

const FORMATOS = [
  {
    num: "01",
    title: "Charlas abiertas",
    body: "Sesiones públicas con investigadores y profesionales que trabajan en seguridad de la IA. Entrada libre, casi siempre en universidad.",
  },
  {
    num: "02",
    title: "Cenas de diálogo",
    body: "Mesas pequeñas con alguien que conoce el tema por dentro. Formato de conversación, no de presentación.",
  },
  {
    num: "03",
    title: "Talleres y grupos de lectura",
    body: "Sesiones de trabajo sobre artículos técnicos y de gobernanza. Se llega habiendo leído; se sale discutiendo.",
  },
  {
    num: "04",
    title: "Paneles y encuentros",
    body: "Espacios donde se juntan investigación, sector público e industria para hablar del estado del tema en Colombia.",
  },
];

export default function Eventos() {
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
          src="/aisc/patterns/aisc-corner-lattice.svg"
        />
        <SiteHeader active="/eventos" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Bogotá y en línea</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">Eventos</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Charlas abiertas, cenas de diálogo, talleres y paneles. Todos empiezan en el mismo punto: entender de qué
              se trata esto.
            </p>
          </div>
        </div>
      </section>

      <section id="proximos">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-8 py-12 md:py-14 lg:py-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-8">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Próximos eventos</h2>
            <p className="text-display-4 md:text-display-4-lg text-aisc-ink">
              Los anunciamos primero en el grupo de WhatsApp y en{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                href="https://www.instagram.com/aisafetycolombia/"
              >
                Instagram
              </a>
              . Si quieres que te avisemos directamente, escríbenos.
            </p>
          </div>
        </div>
      </section>

      <section id="formatos" className="bg-aisc-cream px-6 py-12 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <h2 className="text-display-2 md:text-display-2-lg">Los formatos</h2>
            <div className="mt-14 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-2 lg:mt-20 xl:grid-cols-4">
              {FORMATOS.map((formato) => (
                <article
                  key={formato.title}
                  className="flex min-h-[210px] flex-col gap-6 rounded-[12px] border border-aisc-forest-deep bg-transparent p-7 md:min-h-[245px] lg:p-9 xl:min-h-[270px]"
                >
                  <span className="text-kicker text-aisc-coral">{formato.num}</span>
                  <div className="mt-auto flex flex-col gap-4">
                    <h3 className="text-display-4 md:text-display-4-lg text-balance">{formato.title}</h3>
                    <p className="text-body-sm text-aisc-ink">{formato.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PastEvents />

      <CtaPanel
        title="Que te avisemos del próximo"
        body="El grupo de WhatsApp es donde se anuncia todo primero. También puedes escribirnos y te avisamos por correo."
      >
        {/* TODO: reemplazar por el enlace permanente del grupo de WhatsApp */}
        <a className={CTA_LINK_PRIMARY} href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer">
          Entrar al grupo
        </a>
        <a className={CTA_LINK} href="mailto:jose@aisafetycolombia.org">
          Escribirnos
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
