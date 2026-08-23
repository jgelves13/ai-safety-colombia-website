import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import HackathonBanner from "@/components/hackathon-banner";
import { IconActualidad, IconQuienesSomos, IconSeguridad, IconUnete } from "@/components/section-icons";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, FILL_IMAGE, HERO_CORNER_CLASS } from "@/components/ui";

export const metadata: Metadata = {
  title: "AI Safety Colombia — Hacia una inteligencia artificial segura",
  description:
    "Comunidad en Colombia de investigadores, ingenieros y profesionales de política pública dedicada a que la inteligencia artificial avance de forma segura y beneficiosa.",
};

/* Tres puertas, no una copia del menu: son las tres preguntas que el sitio tiene
   que responderle a quien llega por primera vez. Programas y Eventos tienen su
   propia seccion mas abajo, y el resto vive en el menu y en el pie. */
const PUERTAS = [
  {
    href: "/seguridad-de-la-ia",
    Icon: IconSeguridad,
    title: "¿Qué es AI safety?",
    body: "Qué es el campo, por qué importa y en qué punto está la discusión hoy.",
  },
  {
    href: "/investigacion",
    Icon: IconActualidad,
    title: "Investigación",
    body: "Lo que publica la gente de acá: trabajos propios y los reportes del último hackathon.",
  },
  {
    href: "/unete",
    Icon: IconUnete,
    title: "Únete",
    body: "Programas, eventos y las cuatro formas de entrar.",
  },
  {
    href: "/quienes-somos",
    Icon: IconQuienesSomos,
    title: "Quiénes somos",
    body: "Quién está detrás, desde cuándo y con quién trabajamos.",
  },
];

/** el problema en tres piezas: la seccion que reemplaza las areas de investigacion */
const PIEZAS = [
  {
    title: "Los sistemas van más rápido que nuestra comprensión de ellos",
    body: "Cada año los modelos hacen cosas que sus propios creadores no anticiparon. Entender por dentro cómo funcionan, lograr que persigan lo que queremos y mantenerlos bajo supervisión son problemas de investigación todavía abiertos.",
  },
  {
    title: "Las decisiones ya están delegadas",
    body: "Selección de personal, crédito, salud, atención al ciudadano. En Colombia esos sistemas ya operan, casi siempre comprados afuera y ajustados con datos que no son los nuestros.",
  },
  {
    title: "Las reglas se están escribiendo ahora",
    body: "Buena parte de la gobernanza de la IA se define en los próximos años, y en esa mesa hay muy poca gente de la región. Formar a quien pueda sentarse ahí es parte del trabajo, no un anexo.",
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
    body: "Convoca hackathons de investigación en seguridad de la IA, abiertos a participantes de todo el mundo.",
  },
  {
    name: "BlueDot Impact",
    logo: "/aisc/aliados/bluedot.png",
    href: "https://bluedot.org",
    body: "Cursos de fundamentos en seguridad y gobernanza de la IA.",
  },
  {
    name: "Kairos",
    logo: "/aisc/aliados/kairos.png",
    href: "https://kairos-project.org",
    body: "Programas de mentoría y apoyo a grupos universitarios de seguridad de la IA.",
  },
  {
    name: "Coefficient Giving",
    logo: "/aisc/aliados/coefficient-giving.svg",
    href: "https://www.coefficientgiving.org",
    body: "Financia trabajo sobre riesgos globales, entre ellos la seguridad de la IA. Hasta 2025 se llamó Open Philanthropy.",
  },
];

/** las dos tarjetas de programas, ambas sobre verde */
const PROGRAMAS = [
  {
    kicker: "Con Apart Research",
    title: "Hackathons de investigación",
    body: "Un fin de semana para pasar de leer sobre seguridad de la IA a producir un trabajo propio. Apart Research los convoca a nivel global y nosotros abrimos el espacio presencial en Bogotá.",
  },
  {
    kicker: "Todos los viernes",
    title: "Grupo de lectura",
    body: "Nos reunimos a leer y discutir trabajos recientes de seguridad técnica. Abierto, en español y sin requisitos previos.",
  },
];

const CARD_BASE =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col";

export default function Home() {
  return (
    <main className="aisc-page flex flex-col">
      {/* mientras el sprint de septiembre siga abierto, manda sobre el hero */}
      <section className="relative bg-aisc-forest-deep text-aisc-sand">
        <SiteHeader />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-24 md:pt-28">
          <HackathonBanner />
        </div>
      </section>

      <section className="relative overflow-hidden bg-aisc-forest-deep text-aisc-sand">
        <img
          alt=""
          aria-hidden="true"
          width={1697}
          height={1415}
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-corner-lattice.svg"
        />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 relative z-10 flex min-h-[400px] items-center pt-12 pb-20 md:min-h-[460px] md:pt-16 md:pb-24">
          <div className="flex w-full max-w-[860px] flex-col items-start gap-5 text-left md:gap-6">
            <h1 className="text-display-1 md:text-display-1-lg max-w-[900px] text-balance text-aisc-sand">
              La inteligencia artificial será la tecnología más determinante de nuestro tiempo. Que salga bien no está
              garantizado.
            </h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Somos la comunidad que trabaja en ello desde Colombia: formación, investigación y eventos abiertos a los
              que se puede entrar hoy.
            </p>
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
                    className={`${CARD_BASE} group gap-6 p-6 transition-colors hover:bg-aisc-sand focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-forest md:min-h-[200px] md:p-7`}
                    href={p.href}
                  >
                    <span className="text-aisc-coral transition-colors group-hover:text-aisc-forest">
                      <p.Icon />
                    </span>
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
              <div className="flex max-w-[760px] flex-col gap-4">
                <p className="text-body md:text-body-lg text-aisc-ink">
                  No es una discusión sobre robots ni sobre un futuro lejano. Es el trabajo de lograr que sistemas cada
                  vez más capaces hagan lo que se espera de ellos, que quien los usa entienda sus límites y que existan
                  reglas antes de que hagan daño. Va desde la investigación técnica hasta la política pública.
                </p>
                <Link
                  className="text-body md:text-body-lg group inline-flex min-h-11 w-fit items-center gap-2 text-aisc-forest underline underline-offset-[5px] transition-colors hover:text-aisc-forest-deep"
                  href="/seguridad-de-la-ia"
                >
                  Leer la versión larga
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {PIEZAS.map((pieza) => (
              <article
                className={`${CARD_BASE} p-6 md:min-h-[260px] md:p-7 lg:min-h-[290px] lg:p-8`}
                key={pieza.title}
              >
                <div className="flex max-w-[420px] min-w-0 flex-col gap-3">
                  <span aria-hidden="true" className="mb-2 block h-px w-10 bg-aisc-coral" />
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
            {PROGRAMAS.map((programa) => (
              <Link
                key={programa.title}
                className="group flex min-w-0 flex-col rounded-[8px] border border-aisc-forest bg-aisc-forest-deep p-6 text-aisc-sand transition-colors hover:bg-aisc-night md:min-h-[240px] md:p-8 lg:p-10"
                href="/programas"
              >
                <span className="text-kicker text-aisc-sand/70">{programa.kicker}</span>
                <span className="mt-auto flex max-w-[560px] flex-col gap-3 pt-16 md:pt-20">
                  <span className="text-display-3 md:text-display-3-lg block">{programa.title}</span>
                  <span className="text-body-sm block max-w-[560px] text-aisc-sand/90">{programa.body}</span>
                </span>
                <span className="text-display-4 md:text-display-4-lg mt-10 w-fit self-start text-aisc-sand transition-colors group-hover:text-aisc-sand/72">
                  Conocer más
                </span>
              </Link>
            ))}
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
                Organizaciones con las que sostenemos trabajo continuo. De las cuatro hemos recibido también
                financiación. Los aliados de cada hackathon se anuncian en la convocatoria correspondiente.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-4">
            {ALIADOS.map((aliado) => (
              <li className="flex" key={aliado.name}>
                <a
                  className={`${CARD_BASE} gap-6 p-6 transition-colors hover:bg-aisc-sand md:min-h-[210px] md:p-7`}
                  href={aliado.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex h-9 items-center md:h-10">
                    <img
                      src={aliado.logo}
                      alt={aliado.name}
                      loading="lazy"
                      className="h-full w-auto max-w-[220px] object-contain object-left"
                    />
                  </span>
                  <span className="text-body-sm mt-auto block max-w-[380px] text-aisc-ink">{aliado.body}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel
        kicker="Se entra trabajando"
        title="¿Quieres entrar?"
        body="No hace falta ser investigador ni haber estudiado inteligencia artificial."
      >
        {/* TODO: reemplazar por el enlace permanente del grupo de WhatsApp */}
        <a className={CTA_LINK_PRIMARY} href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer">
          Entrar al grupo de WhatsApp
        </a>
        <a className={CTA_LINK} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar 20 minutos
        </a>
        <a className={CTA_LINK} href="mailto:jose@aisafetycolombia.org">
          Escribirnos
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
