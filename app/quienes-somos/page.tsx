import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Somos la primera organización dedicada a la seguridad de la inteligencia artificial en Colombia. Formamos gente, organizamos investigación y abrimos la conversación pública sobre el tema.",
};

/** TODO: agregar al resto de la junta cuando Jose pase nombres, roles y LinkedIn */
const JUNTA = [
  {
    name: "Jose Gelves",
    role: "Director",
    bio: "Politólogo. Dirige AI Safety Colombia desde 2024. Alumni de ML4Good, Pathfinder fellow de Kairos y embajador de Apart Research. Trabaja en transformación digital del sector público.",
    linkedin: "https://www.linkedin.com/in/josegelves/",
  },
];

const ALIADOS = [
  {
    name: "Apart Research",
    body: "Convoca hackathons de investigación abiertos a todo el mundo. Nosotros abrimos el hub presencial en Bogotá.",
    logo: "/aisc/aliados/apart.png",
    href: "https://apartresearch.com",
  },
  {
    name: "BlueDot Impact",
    body: "Sus cursos gratuitos son la entrada estándar al campo. Con Rapid Grants financian trabajo concreto: USD 1,4 millones otorgados en total y decisiones en solo tres días en promedio.",
    logo: "/aisc/aliados/bluedot.png",
    href: "https://bluedot.org/grants/rapid",
  },
  {
    name: "Kairos",
    body: "Su programa Pathfinder acompaña a quienes construyen comunidades de seguridad de la IA.",
    logo: "/aisc/aliados/kairos.png",
    href: "https://kairos-project.org",
  },
  {
    name: "Coefficient Giving",
    body: "Solo en 2024 comprometió unos 50 millones de dólares en investigación técnica de seguridad de la IA. Hasta 2025 se llamó Open Philanthropy.",
    logo: "/aisc/aliados/coefficient-giving.svg",
    href: "https://www.coefficientgiving.org",
  },
];

export default function QuienesSomos() {
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
          src="/aisc/patterns/aisc-hero-quienes-somos.svg"
        />
        <SiteHeader active="/quienes-somos" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Desde 2024</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">Quiénes somos</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              La primera organización dedicada a la seguridad de la inteligencia artificial en Colombia.
            </p>
          </div>
        </div>
      </section>

      <section id="mision" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 pt-14 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="flex flex-col gap-8 md:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg">Por qué existimos</h2>
            <div className="flex max-w-[860px] flex-col gap-5 text-body-sm text-aisc-ink md:gap-6 md:text-body md:text-body-lg">
              <p>
                Los sistemas de inteligencia artificial ganan capacidades más rápido de lo que crece nuestra
                comprensión de ellos. En ese hueco trabaja muy poca gente en el mundo. Los colombianos que ya estaban
                ahí trabajaban cada uno por su lado.
              </p>
              <p>
                Colombia son 52 millones de personas que van a usar estos sistemas, regularlos y sufrirlos, y hasta 2024
                no había una sola organización trabajando en el tema. Empezamos para que la haya: para que quien quiera
                meterse tenga por dónde entrar, y para que cuando se decidan las reglas haya gente de acá que entienda de
                qué se está hablando.
              </p>
              <p>
                Somos una organización pequeña y voluntaria. Lo que hacemos es concreto: formar gente, organizar
                investigación y sostener la conversación pública sobre el tema en el país. Tres personas de acá han
                entrado a ML4Good, el campamento técnico al que llega quien quiere dedicarse a esto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="equipo" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-0 pb-14 md:pb-20 lg:pb-24">
          <div className="flex flex-col gap-8 md:gap-10">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] sm:items-start sm:gap-8">
              <h2 className="text-display-2 md:text-display-2-lg">El equipo</h2>
              <p className="text-body-sm text-aisc-ink md:text-body md:text-body-lg">
                Quienes sostienen la operación. Todos somos voluntarios y la organización se financia con
                donaciones y con los presupuestos de los programas que organizamos.
              </p>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-[10px] sm:grid-cols-2 md:mt-16 lg:mt-20">
            {JUNTA.map((persona) => (
              <article
                key={persona.name}
                className="flex min-w-0 flex-col gap-5 overflow-hidden rounded-lg border border-aisc-ink bg-aisc-cream p-6 text-aisc-ink md:p-8"
              >
                <header className="flex min-w-0 flex-col gap-1.5">
                  <h3 className="text-display-3 md:text-display-3-lg break-words">{persona.name}</h3>
                  <p className="text-body-sm text-aisc-forest">{persona.role}</p>
                </header>
                <p className="text-body-sm text-aisc-ink">{persona.bio}</p>
                {persona.linkedin && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm mt-auto w-fit text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                    href={persona.linkedin}
                  >
                    LinkedIn
                  </a>
                )}
              </article>
            ))}
            <article className="flex min-w-0 flex-col gap-5 overflow-hidden rounded-lg border border-aisc-forest bg-aisc-sand p-6 text-aisc-ink md:p-8">
              <header className="flex min-w-0 flex-col gap-1.5">
                <h3 className="text-display-3 md:text-display-3-lg break-words">¿Quieres estar acá?</h3>
                <p className="text-body-sm text-aisc-forest">Voluntariado</p>
              </header>
              <p className="text-body-sm text-aisc-ink">
                Buscamos gente que ayude a organizar eventos, a traducir material, a llevar la comunicación y a mover
                los programas. No hace falta ser técnico, hace falta aparecer.
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm mt-auto w-fit text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                href="https://cal.com/josegelves/meeting"
              >
                Hablemos 20 minutos
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="aliados" className="bg-aisc-cream px-6 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] md:items-start md:gap-6">
              <h2 className="text-display-2 md:text-display-2-lg">Con quién trabajamos</h2>
              <p className="text-body-sm text-aisc-ink md:text-body md:text-body-lg">
                Cuatro organizaciones del campo con las que sostenemos trabajo, y de las que también hemos recibido
                financiación. Otras acompañan programas puntuales, como el hackathon, y aparecen en la página de ese
                programa.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-3 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
              {ALIADOS.map((aliado) => (
                <a
                  key={aliado.name}
                  href={aliado.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[190px] flex-col justify-between gap-8 rounded-[12px] border border-aisc-forest-deep bg-transparent p-7 transition-colors hover:bg-aisc-cream lg:p-9"
                >
                  <div className="flex h-[42px] items-center">
                    <img src={aliado.logo} alt={aliado.name} className="max-h-[38px] w-auto object-contain" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-display-4 md:text-display-4-lg text-balance">{aliado.name}</h3>
                    <p className="text-body-sm text-aisc-ink">{aliado.body}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Cómo se entra"
        body="No hay membresía ni convocatoria: se llega a un evento, a un programa o a una conversación."
      >
        <Link className={CTA_LINK_PRIMARY} href="/programas">
          Ver los programas
        </Link>
        <a className={CTA_LINK} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar 20 minutos
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
