import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Únete",
  description:
    "Las cuatro cosas abiertas en AI Safety Colombia: el grupo de WhatsApp, el grupo de lectura sobre AI Control los viernes, las charlas en Bogotá y los hackathones de investigación.",
};

/* Las cuatro cosas que están abiertas ahora mismo, cada una con su ritmo real y
   con lo que pasa después. Nada de formularios: todo apunta a canales que ya
   existen. */
const ABIERTO = [
  {
    href: "https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ",
    external: true,
    title: "El grupo de WhatsApp",
    cuando: "Siempre abierto",
    cta: "Entrar al grupo",
    body: "Es donde se anuncia todo primero: las sesiones del grupo de lectura, los eventos y las convocatorias. Poco tráfico y nadie tiene que presentarse.",
    despues: "Entras y ves lo que viene. Puedes quedarte mirando el tiempo que quieras.",
  },
  {
    href: "mailto:contacto@aisafetycolombia.org",
    external: true,
    title: "Grupo de lectura: AI Control",
    cuando: "Viernes, 6:30 p. m., virtual, una hora",
    cta: "Pedir el enlace",
    body: "Leemos y discutimos trabajos recientes sobre cómo supervisar sistemas de IA que actúan por su cuenta. Cada sesión la lidera un participante distinto y la presentación dura máximo veinte minutos, así que se puede llegar solo a escuchar o llegar a presentar.",
    despues: "Te pasamos el enlace y la lectura de esa semana. Las lecturas están en inglés y la discusión es en español.",
  },
  {
    href: "/eventos",
    external: false,
    title: "Charlas y talleres",
    cuando: "Varias veces al año, en Bogotá",
    cta: "Ver los próximos",
    body: "Sesiones de una o dos horas, casi siempre en universidad y con entrada libre. A veces las da alguien de la comunidad y a veces alguien de fuera que está de paso.",
    despues: "Llegas, escuchas y decides. Nadie te va a pedir datos en la puerta.",
  },
  {
    href: "https://apartresearch.com/sprints/ai-incident-response-sprint-2026-09-11-to-2026-09-13",
    external: true,
    title: "Hackathones de investigación",
    cuando: "El próximo es del 11 al 13 de septiembre",
    cta: "Ver el de septiembre",
    body: "Los convoca Apart Research a nivel global y nosotros abrimos el espacio presencial acá. Son tres días para salir con un trabajo propio, que después califican jurados de fuera. El próximo es sobre respuesta a incidentes de IA.",
    despues: "Te inscribes en el sitio de Apart. El espacio en Bogotá lo anunciamos en el grupo de WhatsApp.",
  },
];

const CARD =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col p-6 md:p-7 lg:p-8";
const ENLACE_CARD =
  "text-display-4 md:text-display-4-lg text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep";

export default function Unete() {
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
        <SiteHeader active="/unete" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">Únete</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Hay varias formas de hacer parte de la comunidad y de empezar a aportar. Estas son las que están
              abiertas ahora mismo, y lo que pasa después de cada una.
            </p>
          </div>
        </div>
      </section>

      <section id="abierto" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Qué hay abierto</h2>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-4">
            {ABIERTO.map((item) => (
              <li className="flex" key={item.title}>
                <article className={CARD}>
                  <span className="text-kicker text-aisc-coral">{item.cuando}</span>
                  <h3 className="text-display-3 md:text-display-3-lg mt-3 text-balance">{item.title}</h3>
                  <p className="text-body-sm mt-3 text-aisc-ink">{item.body}</p>
                  <p className="text-meta mt-5 text-aisc-forest">{item.despues}</p>
                  <div className="mt-auto pt-7">
                    {item.external ? (
                      <a
                        className={ENLACE_CARD}
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      >
                        {item.cta}
                      </a>
                    ) : (
                      <Link className={ENLACE_CARD} href={item.href}>
                        {item.cta}
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel
        kicker="Por dónde empezar"
        title="Entra al grupo y mira qué viene"
        body="Todo se anuncia ahí primero: las sesiones de lectura, las charlas y las convocatorias."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar al grupo
        </a>
        <Link className={CTA_LINK} href="/eventos">
          Ver los próximos eventos
        </Link>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
