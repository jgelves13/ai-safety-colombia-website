import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CARD_LINK_COBALT, CARD_LINK_FROST, CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Programas",
  description:
    "Hackathons de investigación, grupos de lectura y formación en seguridad de la inteligencia artificial, en Bogotá y en español.",
};

const CARD_BASE =
  "focus-visible:outline-aisc-forest flex min-h-[235px] w-full flex-col justify-between rounded-[var(--radius)] border p-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[3px] md:min-h-[285px] md:p-8 lg:min-h-[320px] lg:p-10";

const PROGRAMAS = [
  {
    href: "https://cal.com/josegelves/meeting",
    external: true,
    kind: "Hackathon · presencial en Bogotá",
    title: "Hackathon de investigación",
    body: "Un fin de semana para pasar de leer sobre seguridad de la IA a producir un trabajo propio, en equipo y con mentoría. Apart Research lo convoca a nivel global y nosotros abrimos el hub presencial en Bogotá.",
    kickerClass: "text-aisc-sand/70",
    cardClass: "border-aisc-forest-deep bg-aisc-forest-deep text-aisc-sand hover:bg-aisc-night",
    textClass: "text-aisc-sand/90",
    linkClass: CARD_LINK_FROST,
    cta: "Preguntar por la próxima edición",
  },
  {
    href: "https://cal.com/josegelves/meeting",
    external: true,
    kind: "Grupo de lectura · viernes",
    title: "AI Control",
    body: "Nos reunimos a leer y discutir trabajos recientes sobre cómo supervisar sistemas de IA que actúan por su cuenta. Abierto, en español y sin requisitos previos.",
    kickerClass: "text-aisc-coral",
    cardClass: "border-aisc-ink bg-aisc-cream text-aisc-ink hover:bg-aisc-sand",
    textClass: "text-aisc-ink",
    linkClass: CARD_LINK_COBALT,
    cta: "Pedir el enlace",
  },
];

const PILARES = [
  {
    title: "Se entra sin credenciales",
    body: "No pedimos posgrado ni experiencia previa en inteligencia artificial. Pedimos que aparezcas y que trabajes.",
  },
  {
    title: "Se sale con algo hecho",
    body: "Cada programa termina en un producto concreto: un trabajo, un análisis, una presentación. No en un certificado.",
  },
  {
    title: "Se trabaja en español",
    body: "El material del campo está casi todo en inglés. La discusión, la mentoría y el acompañamiento los hacemos acá, en español.",
  },
];

const REQUISITOS = [
  {
    title: "Curiosidad, no credenciales",
    body: "Vienen ingenieros, abogados, economistas, estudiantes de pregrado y gente que trabaja en el sector público. Sirve tener un oficio y querer aplicarlo a esto.",
  },
  {
    title: "Unas horas a la semana",
    body: "Los grupos de lectura piden un par de horas. Un hackathon pide un fin de semana completo. Nada de esto exige dejar lo que haces.",
  },
  {
    title: "Inglés de lectura",
    body: "Buena parte de los artículos están en inglés. No hace falta hablarlo bien, sí poder leerlo con ayuda de un traductor.",
  },
];

export default function Programas() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/programas" />
        <img
          alt=""
          aria-hidden="true"
          width={1697}
          height={1415}
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-hero-programas.svg"
        />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 relative z-10 flex min-h-[460px] items-center pt-28 pb-16 md:min-h-[520px] md:pt-36 md:pb-20">
          <div className="flex w-full max-w-[760px] flex-col items-start gap-5 text-left md:gap-6">
            <span className="text-kicker text-aisc-sand/70">Formación</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">Programas</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Formación y trabajo en grupo para quienes quieren meterse en seguridad de la IA en serio.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col py-12 md:py-14 lg:py-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="flex flex-col gap-10 pt-6 lg:pt-8">
            <h2 className="text-display-2 md:text-display-2-lg min-w-0 break-words">Activos y próximos</h2>
            <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
              {PROGRAMAS.map((programa) => (
                <a
                  key={programa.title}
                  href={programa.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${CARD_BASE} ${programa.cardClass}`}
                >
                  <div className="flex flex-col gap-10">
                    <span className={`text-kicker ${programa.kickerClass}`}>{programa.kind}</span>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-display-3 md:text-display-3-lg break-words">{programa.title}</h3>
                      <p className={`text-body md:text-body-lg ${programa.textClass}`}>{programa.body}</p>
                    </div>
                  </div>
                  <span className={programa.linkClass}>{programa.cta}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pilares" className="bg-aisc-cream px-6 py-12 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-6">
              <h2 className="text-display-2 md:text-display-2-lg break-words text-balance">Cómo los armamos</h2>
            </div>
            <div className="gap-3 md:mt-16 lg:mt-20 mt-14 grid grid-cols-1 lg:grid-cols-3">
              {PILARES.map((pilar) => (
                <article
                  key={pilar.title}
                  className="flex flex-col rounded-[12px] border border-aisc-forest-deep bg-transparent min-h-[210px] p-7 md:min-h-[245px] lg:p-9 xl:min-h-[270px]"
                >
                  <span aria-hidden="true" className="mb-5 block h-px w-10 flex-none bg-aisc-coral" />
                  <div className="flex max-w-[900px] flex-col gap-4">
                    <h3 className="text-display-4 md:text-display-4-lg break-words text-balance">{pilar.title}</h3>
                    <p className="text-body-sm text-aisc-ink">{pilar.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col py-12 md:py-14 lg:py-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-2 lg:items-start lg:gap-6 lg:pt-8">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Qué necesitas para entrar</h2>
            <p className="text-body md:text-body-lg max-w-[470px] text-aisc-ink">
              Menos de lo que la gente cree. Si dudas si es para ti, escríbenos y lo hablamos.
            </p>
          </div>
          <div className="mt-14 flex flex-col gap-2.5 md:mt-16 lg:mt-20">
            {REQUISITOS.map((requisito) => (
              <div
                key={requisito.title}
                className="flex min-h-[96px] w-full items-center rounded-[var(--radius)] border border-aisc-forest bg-aisc-cream px-6 py-5 md:min-h-[112px] md:px-10"
              >
                <div className="flex w-full min-w-0 flex-col gap-1">
                  <h3 className="text-display-4 md:text-display-4-lg break-words text-aisc-forest">{requisito.title}</h3>
                  <p className="text-body-sm break-words text-aisc-ink">{requisito.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        title="Empieza por una conversación"
        body="Veinte minutos para entender en qué andas y decirte por dónde entrar. Sin compromiso."
      >
        <a className={CTA_LINK_PRIMARY} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar 20 minutos
        </a>
        <Link className={CTA_LINK} href="/eventos">
          Ver los eventos
        </Link>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
