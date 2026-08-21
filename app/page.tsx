import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, FILL_IMAGE, HERO_CORNER_CLASS } from "@/components/ui";

export const metadata: Metadata = {
  title: "AI Safety Colombia — Hacia una inteligencia artificial segura",
  description:
    "Comunidad en Colombia de investigadores, ingenieros y profesionales de política pública dedicada a que la inteligencia artificial avance de forma segura y beneficiosa.",
};

/** las cuatro puertas de entrada, justo debajo del hero */
const PUERTAS = [
  {
    num: "01",
    href: "/seguridad-de-la-ia",
    title: "Seguridad de la IA",
    body: "Qué es, por qué importa y en qué punto está la discusión hoy.",
  },
  {
    num: "02",
    href: "/programas",
    title: "Programas",
    body: "Formación, grupos de lectura y hackathons de investigación.",
  },
  {
    num: "03",
    href: "/eventos",
    title: "Eventos",
    body: "Charlas, talleres y encuentros abiertos en Bogotá.",
  },
  {
    num: "04",
    href: "/actualidad",
    title: "Actualidad",
    body: "Lo que escribimos y lo que sale de nuestros hackathons.",
  },
];

/** el problema en tres piezas: la seccion que reemplaza las areas de investigacion */
const PIEZAS = [
  {
    title: "No sabemos revisar lo que construimos",
    body: "Un modelo puede pasar todas las pruebas y aun así fallar donde nadie miró. Las técnicas para evaluar qué hace un sistema, y por qué lo hace, van muy por detrás de las técnicas para entrenarlo.",
  },
  {
    title: "Las decisiones ya están delegadas",
    body: "Selección de personal, crédito, salud, atención al ciudadano. En Colombia esos sistemas ya operan, casi siempre comprados afuera y evaluados con datos que no son los nuestros.",
  },
  {
    title: "Las reglas se están escribiendo ahora",
    body: "Buena parte de la gobernanza de la IA se define en los próximos años, y en esa mesa hay muy poca gente de la región. Formar a quien pueda sentarse ahí es parte del trabajo técnico, no un anexo.",
  },
];

/** fotos reales de encuentros de AISC */
const FOTOS = [
  { src: "/aisc/eventos/panel-gobernanza.jpg", alt: "Panel sobre gobernanza de la IA en Colombia" },
  { src: "/aisc/eventos/connect-latam.jpg", alt: "Encuentro AI Safety Connect LATAM" },
  { src: "/aisc/eventos/algoritmo-a-la-ley.jpg", alt: "Sesión Del algoritmo a la ley" },
  { src: "/aisc/eventos/cena-politica.jpg", alt: "Cena de discusión sobre IA y política pública" },
];

/** aliados de la organizacion. el hackathon tiene los suyos, y no van aca */
const ALIADOS = [
  {
    name: "Apart Research",
    logo: "/aisc/aliados/apart.png",
    href: "https://apartresearch.com",
    body: "Hackathons de investigación en seguridad de la IA, con sedes en todo el mundo.",
  },
  {
    name: "BlueDot Impact",
    logo: "/aisc/aliados/bluedot.png",
    href: "https://bluedot.org",
    body: "Cursos de fundamentos en seguridad y gobernanza de la IA.",
  },
  {
    name: "Kairos",
    logo: null,
    href: "https://kairos-project.org",
    body: "Programas de mentoría y apoyo a grupos universitarios de seguridad de la IA.",
  },
];

const CARD_BASE =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col";

export default function Home() {
  return (
    <main className="aisc-page flex flex-col">
      <section className="relative overflow-hidden bg-aisc-forest-deep text-aisc-sand">
        <SiteHeader />
        <img
          alt=""
          aria-hidden="true"
          width={1697}
          height={1415}
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-corner-lattice.svg"
        />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 relative z-10 flex min-h-[520px] items-center pt-28 pb-20 md:min-h-[580px] md:pt-36 md:pb-24 lg:min-h-[620px]">
          <div className="flex w-full max-w-[820px] flex-col items-start gap-6 text-left">
            <span className="text-kicker text-aisc-sand/70">Bogotá, Colombia</span>
            <div className="flex flex-col items-start gap-5 md:gap-6">
              <h1 className="text-display-1 md:text-display-1-lg max-w-[880px] text-balance text-aisc-sand">
                La inteligencia artificial avanza más rápido de lo que sabemos verificarla.
              </h1>
              <p className="text-body md:text-body-lg max-w-[620px] text-aisc-sand/90">
                AI Safety Colombia reúne a quienes trabajan en que eso cambie: investigación, formación y una comunidad
                abierta a la que se puede entrar hoy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-t-[40px] bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 py-12 md:py-14 lg:py-16">
          <nav aria-label="Secciones del sitio">
            <ul className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
              {PUERTAS.map((p) => (
                <li className="flex" key={p.href}>
                  <Link
                    className={`${CARD_BASE} group gap-5 p-6 transition-colors hover:bg-aisc-sand focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-forest md:min-h-[180px] md:p-7`}
                    href={p.href}
                  >
                    <span className="text-kicker text-aisc-coral">{p.num}</span>
                    <span className="mt-auto flex flex-col gap-2">
                      <span className="text-display-4 md:text-display-4-lg block break-words text-aisc-forest transition-colors group-hover:text-aisc-forest-deep">
                        {p.title}
                      </span>
                      <span className="text-body-sm block text-aisc-ink">{p.body}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 py-12 md:gap-16 md:py-14 lg:gap-20 lg:py-16">
          <div className="flex flex-col gap-7">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">¿De qué se trata todo esto?</h2>
              <div className="flex max-w-[760px] flex-col gap-3">
                <p className="text-body md:text-body-lg text-aisc-ink">
                  No es una discusión sobre robots. Es sobre sistemas que ya toman decisiones sobre personas y que
                  todavía no sabemos auditar del todo. Ese hueco entre lo que la IA puede hacer y lo que podemos
                  comprobar es el problema al que nos dedicamos.
                </p>
                <Link
                  className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                  href="/seguridad-de-la-ia"
                >
                  Leer la versión larga
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {PIEZAS.map((pieza, i) => (
              <article
                className={`${CARD_BASE} p-6 md:min-h-[270px] md:p-7 lg:min-h-[310px] lg:p-8 xl:min-h-[340px]`}
                key={pieza.title}
              >
                <span className="text-kicker text-aisc-coral">{`0${i + 1}`}</span>
                <div className="mt-16 flex max-w-[420px] min-w-0 flex-col gap-3 md:mt-20 lg:mt-24">
                  <h3 className="text-display-3 md:text-display-3-lg break-words text-balance">{pieza.title}</h3>
                  <p className="text-body-sm text-aisc-ink">{pieza.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 py-12 md:gap-16 md:py-14 lg:gap-20 lg:py-16">
          <div className="flex flex-col gap-9">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
              <h2 className="text-display-2 md:text-display-2-lg">Programas</h2>
              <div className="flex max-w-[760px] flex-col gap-5">
                <p className="text-body md:text-body-lg text-aisc-ink">
                  Formación y trabajo en grupo para gente que quiere meterse en esto en serio, sin necesidad de haber
                  empezado antes.
                </p>
                <Link
                  className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                  href="/programas"
                >
                  Ver todos los programas
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
            <Link
              className="group flex min-w-0 flex-col rounded-[8px] border border-aisc-forest p-6 transition-colors md:min-h-[240px] md:p-8 lg:p-10 bg-aisc-forest-deep text-aisc-sand hover:bg-aisc-night"
              href="/programas"
            >
              <span className="text-kicker text-aisc-sand/70">Con Apart Research</span>
              <span className="mt-auto flex max-w-[560px] flex-col gap-3 pt-16 md:pt-20">
                <span className="text-display-3 md:text-display-3-lg block">Hackathons de investigación</span>
                <span className="text-body-sm block max-w-[560px] text-aisc-sand/90">
                  Un fin de semana para pasar de leer sobre seguridad de la IA a producir un trabajo propio, con sede en
                  Bogotá y participantes de toda la región.
                </span>
              </span>
              <span className="text-display-4 md:text-display-4-lg mt-10 w-fit self-start transition-colors text-aisc-sand group-hover:text-aisc-sand/72">
                Conocer más
              </span>
            </Link>
            <Link
              className="group flex min-w-0 flex-col rounded-[8px] border border-aisc-forest p-6 transition-colors md:min-h-[240px] md:p-8 lg:p-10 bg-aisc-cream text-aisc-ink hover:bg-aisc-sand"
              href="/programas"
            >
              <span className="text-kicker text-aisc-coral">Todos los viernes</span>
              <span className="mt-auto flex max-w-[560px] flex-col gap-3 pt-16 md:pt-20">
                <span className="text-display-3 md:text-display-3-lg block">Grupo de lectura</span>
                <span className="text-body-sm block max-w-[560px] text-aisc-ink">
                  Nos reunimos a leer y discutir trabajos recientes de seguridad técnica. Abierto, en español y sin
                  requisitos previos.
                </span>
              </span>
              <span className="text-display-4 md:text-display-4-lg mt-10 w-fit self-start transition-colors text-aisc-forest group-hover:text-aisc-forest-deep">
                Conocer más
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-aisc-cream px-6 py-10 md:py-12">
        <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-12 rounded-[var(--radius)] bg-aisc-sand px-6 py-8 md:px-10 md:py-12 lg:gap-16 lg:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.95fr)] lg:items-center lg:gap-16">
            <div className="grid min-w-0 grid-cols-6 gap-2 md:gap-3">
              {FOTOS.map((foto) => (
                <div
                  className="col-span-3 aspect-[1.16] relative overflow-hidden rounded-[var(--radius)] bg-aisc-forest-deep"
                  key={foto.src}
                >
                  <img
                    alt={foto.alt}
                    loading="lazy"
                    decoding="async"
                    className="object-cover"
                    style={{ ...FILL_IMAGE, objectPosition: "center" }}
                    src={foto.src}
                  />
                </div>
              ))}
            </div>
            <div className="flex max-w-[700px] flex-col gap-7 lg:justify-self-start">
              <div className="flex flex-col gap-5">
                <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
                <h2 className="text-display-2 md:text-display-2-lg text-balance">Comunidad y eventos</h2>
                <div className="text-body md:text-body-lg flex max-w-[720px] flex-col gap-2 text-aisc-ink">
                  <p>Charlas abiertas, talleres y cenas de discusión en Bogotá.</p>
                  <p>
                    Encuentros con investigadores y con gente de política pública que ya está trabajando el tema en el
                    país.
                  </p>
                </div>
              </div>
              <Link
                className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                href="/eventos"
              >
                Ver próximos eventos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 py-12 md:gap-12 md:py-14 lg:gap-14 lg:py-16">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">Trabajamos con</h2>
              <p className="text-body md:text-body-lg max-w-[760px] text-aisc-ink">
                Organizaciones con las que sostenemos trabajo continuo. Los aliados de cada hackathon se anuncian en la
                convocatoria correspondiente.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
            {ALIADOS.map((aliado) => (
              <li className="flex" key={aliado.name}>
                <a
                  className={`${CARD_BASE} gap-6 p-6 transition-colors hover:bg-aisc-sand md:min-h-[210px] md:p-7`}
                  href={aliado.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex h-10 items-center md:h-12">
                    {aliado.logo ? (
                      <img
                        src={aliado.logo}
                        alt={aliado.name}
                        loading="lazy"
                        className="h-full w-auto max-w-[190px] object-contain object-left"
                      />
                    ) : (
                      <span className="text-display-3 md:text-display-3-lg text-aisc-forest">{aliado.name}</span>
                    )}
                  </span>
                  <span className="text-body-sm mt-auto block max-w-[380px] text-aisc-ink">{aliado.body}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel
        title="¿Quieres entrar?"
        body="No hace falta ser investigador ni haber estudiado inteligencia artificial. Entra al grupo, escríbenos o agenda veinte minutos con Jose."
      >
        {/* TODO: reemplazar por el enlace permanente del grupo de WhatsApp */}
        <a className={CTA_LINK} href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer">
          Entrar al grupo de WhatsApp
        </a>
        <a className={CTA_LINK} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar 20 minutos
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
