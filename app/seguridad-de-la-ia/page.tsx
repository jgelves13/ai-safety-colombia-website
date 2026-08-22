import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Qué es la seguridad de la IA | AI Safety Colombia",
  description:
    "Una explicación breve y sin jerga: por qué los sistemas de inteligencia artificial avanzan más rápido de lo que los entendemos, y qué se hace al respecto.",
};

/** recursos externos reales para empezar, con su idioma marcado */
const RECURSOS = [
  {
    title: "Curso de fundamentos de BlueDot",
    meta: "BlueDot Impact · inglés · gratuito",
    body: "El punto de entrada más usado del campo. Cinco semanas de lecturas y discusión, con versiones técnicas y de gobernanza.",
    href: "https://bluedot.org",
  },
  {
    title: "El perfil del problema de 80,000 Hours",
    meta: "80,000 Hours · inglés · lectura larga",
    body: "Por qué una parte del campo considera este el problema más importante del siglo, con los contraargumentos incluidos.",
    href: "https://80000hours.org/problem-profiles/artificial-intelligence/",
  },
  {
    title: "AI Safety Info",
    meta: "Comunidad · inglés · preguntas sueltas",
    body: "Respuestas cortas a las preguntas que casi todo el mundo se hace al principio, sin necesidad de leer nada de corrido.",
    href: "https://aisafety.info",
  },
];

/** las tres formas de trabajar en el problema, sin que ninguna pese mas que las otras */
const FRENTES = [
  {
    title: "Alineación e interpretabilidad",
    body: "Cómo lograr que un sistema persiga lo que se le pidió y no algo parecido, y cómo mirar por dentro para saber qué está haciendo en realidad. Es el corazón técnico del campo y sigue sin resolverse.",
  },
  {
    title: "Evaluación y control",
    body: "Cómo medir de qué es capaz un modelo antes de soltarlo y cómo mantenerlo bajo supervisión cuando ya actúa por su cuenta. Es lo más cercano a un peritaje técnico, y hoy hace falta gente que lo sepa hacer.",
  },
  {
    title: "Gobernanza y política pública",
    body: "Qué se le exige a quien despliega un sistema, con qué evidencia y ante quién responde. En Colombia esto se está definiendo ahora, en compras públicas y en regulación sectorial.",
  },
];

export default function SeguridadDeLaIA() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/seguridad-de-la-ia" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Empezar por aquí</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">
              Qué es la seguridad de la IA
            </h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Una explicación corta, sin jerga y sin catástrofes de película.
            </p>
          </div>
        </div>
      </section>

      <section id="punto-de-partida" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-16 md:gap-10 md:pt-7 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">El punto de partida</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
              <p>
                La inteligencia artificial no es una tecnología más. Los sistemas actuales aprenden de ejemplos en vez
                de seguir instrucciones, y por eso ni quienes los construyen pueden decir con precisión qué van a hacer
                en una situación nueva.
              </p>
              <p>
                La seguridad de la IA es el campo que trabaja para que esos sistemas sean confiables antes de que las
                apuestas sean altas: entender por dentro cómo funcionan, lograr que persigan lo que de verdad queremos,
                mantenerlos bajo supervisión aunque nos superen en su tarea y construir las instituciones que respondan
                cuando algo sale mal. Es un campo técnico con una pata de política pública, no una postura a favor o en
                contra de la tecnología.
              </p>
              <p>
                Nada de esto es futurología. Los sistemas que hoy filtran hojas de vida, asignan crédito o priorizan
                atención en salud ya toman decisiones sobre personas. Los que vienen actuarán con más autonomía y sobre
                más cosas, y ninguno de estos problemas se resuelve solo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="frentes" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 pb-16 md:gap-16 md:pb-20 lg:gap-20">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 md:gap-10 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Cómo se trabaja en esto</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Tres frentes que se necesitan entre sí. Se puede entrar por cualquiera de ellos, y no todos exigen
              formación técnica previa.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {FRENTES.map((frente) => (
              <article
                key={frente.title}
                className="overflow-hidden rounded-lg bg-aisc-cream border border-aisc-ink flex flex-col p-6 text-aisc-ink md:min-h-[270px] md:p-7 lg:min-h-[310px] lg:p-8 xl:min-h-[335px]"
              >
                <span aria-hidden="true" className="mb-5 block h-px w-10 flex-none bg-aisc-coral" />
                <div className="flex max-w-[420px] min-w-0 flex-col gap-3">
                  <h3 className="text-display-3 md:text-display-3-lg break-words text-balance">{frente.title}</h3>
                  <p className="text-body-sm text-aisc-ink">{frente.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos" className="bg-aisc-cream px-6 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-14 md:gap-10 md:pt-7 md:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6 lg:pb-20">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Por dónde seguir</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Tres recursos que recomendamos a quien apenas está entrando. Buena parte del material del campo está en
              inglés; en nuestros programas lo trabajamos en español.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
            {RECURSOS.map((recurso) => (
              <a
                key={recurso.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-aisc-forest block min-h-[120px] min-w-0 rounded-[8px] border bg-aisc-sand p-6 transition-colors hover:bg-aisc-cream md:p-8 lg:p-10"
                href={recurso.href}
              >
                <div className="min-w-0">
                  <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest transition-colors group-hover:text-aisc-forest-deep">
                    {recurso.title}
                  </h3>
                  <p className="text-meta md:text-meta-lg mt-3 text-aisc-ink">{recurso.meta}</p>
                  <p className="text-body-sm mt-2 max-w-[1080px] text-aisc-ink">{recurso.body}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        title="¿Y qué hago con esto?"
        body="Lo más útil que puedes hacer al principio es hablar con alguien que ya lleve un tiempo. Después vienen los programas."
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
