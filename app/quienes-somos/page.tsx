import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "¿Quiénes somos?",
  description:
    "Comunidad en Colombia que trabaja para reducir los riesgos de la inteligencia artificial avanzada: formamos a quienes quieren entrar al campo, apoyamos investigación y organizamos eventos abiertos.",
  alternates: { canonical: "/quienes-somos", languages: alternativas("/quienes-somos") },
};

const ENLACE =
  "text-aisc-forest transition-colors hover:text-aisc-coral";

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

type Persona = {
  nombre: string;
  rol: string;
  foto?: string;
  linkedin?: string;
  bio: React.ReactNode;
};

/* La ficha del sprint, tal cual: retrato cuadrado, nombre, rol y bio. Las dos
   filas usan la misma rejilla de cuatro columnas para que las seis fichas
   midan igual. */
function Ficha({ p }: { p: Persona }) {
  return (
    <li className="flex flex-col gap-3">
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
        {p.foto ? (
          <img
            alt={p.nombre}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
            src={p.foto}
          />
        ) : (
          <span aria-hidden="true" className="text-display-2 md:text-display-2-lg text-aisc-forest/45">
            {iniciales(p.nombre)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-display-4 font-semibold text-aisc-forest">
          {p.linkedin ? (
            <a
              className="text-aisc-forest transition-colors hover:text-aisc-coral"
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.nombre}
            </a>
          ) : (
            p.nombre
          )}
        </h3>
        <p className="text-body-sm text-aisc-muted">{p.rol}</p>
        <p className="text-body-sm mt-2 text-aisc-ink">{p.bio}</p>
      </div>
    </li>
  );
}

/* Al modo del sprint: retrato cuadrado, nombre, rol y una bio corta. Sin foto
   sale la tarjeta con las iniciales; el archivo va en public/aisc/equipo/.
   Los dos primeros van en una fila de dos y el resto abajo en cuatro
   columnas iguales, así que el orden del arreglo es el orden de la página.
   TODO: faltan los cuatro de la segunda fila (nombre, rol, bio, LinkedIn). */
const EQUIPO: Persona[] = [
  {
    nombre: "Jose Gelves",
    rol: "Cofundador y director",
    foto: "/aisc/equipo/jose-gelves.png",
    linkedin: "https://www.linkedin.com/in/josegelves/",
    bio: (
      <>
        Consultor de transformación digital de la{" "}
        <a className={ENLACE} href="https://uniandes.edu.co/" target="_blank" rel="noopener noreferrer">
          Universidad de los Andes
        </a>{" "}
        para el{" "}
        <a className={ENLACE} href="https://www.mintic.gov.co/" target="_blank" rel="noopener noreferrer">
          MinTIC
        </a>
        . Pathfinder fellow de{" "}
        <a className={ENLACE} href="https://kairos-project.org" target="_blank" rel="noopener noreferrer">
          Kairos
        </a>{" "}
        y embajador de{" "}
        <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
          Apart Research
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Fernando Avalos",
    rol: "Cofundador (en memoria)",
    foto: "/aisc/equipo/fernando-avalos.png",
    linkedin: "https://www.linkedin.com/in/fernando-avalos-lopez/",
    bio: (
      <>
        Fue investigador en{" "}
        <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
          Apart Research
        </a>{" "}
        e ingeniero de investigación y analista de riesgos en el{" "}
        <a className={ENLACE} href="https://www.orcg.info/" target="_blank" rel="noopener noreferrer">
          Observatorio de Riesgos Catastróficos Globales
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Camila Beltrán",
    rol: "Grupo de AI Control",
    foto: "/aisc/mentores/camila-beltran.png",
    linkedin:
      "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
    bio: (
      <>
        Consultora en gobernanza de IA para varias organizaciones. Miembro del
        grupo de expertos de la{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/about/network-of-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          OCDE
        </a>{" "}
        e investigadora asociada del{" "}
        <a
          className={ENLACE}
          href="https://aiforgood.itu.int/multimedia-authenticity/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AMAS Young Research Programme
        </a>{" "}
        de la UIT. Como Winter Fellow de{" "}
        <a
          className={ENLACE}
          href="https://www.governance.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GovAI
        </a>{" "}
        investigó la{" "}
        <a
          className={ENLACE}
          href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai"
          target="_blank"
          rel="noopener noreferrer"
        >
          regulación europea
        </a>{" "}
        de los escenarios de pérdida de control.
      </>
    ),
  },
  {
    nombre: "Sofía Botia",
    rol: "Voluntaria",
    foto: "/aisc/equipo/sofia-botia.png",
    linkedin:
      "https://www.linkedin.com/in/karen-sof%C3%ADa-botia-vizcaya-2898b334b/",
    bio: (
      <>
        Estudiante de Derecho en la{" "}
        <a className={ENLACE} href="https://uniandes.edu.co/" target="_blank" rel="noopener noreferrer">
          Universidad de los Andes
        </a>
        . Asistente de investigación en{" "}
        <a className={ENLACE} href="https://www.psu.edu/" target="_blank" rel="noopener noreferrer">
          Penn State
        </a>{" "}
        y monitora de investigación en{" "}
        <a className={ENLACE} href="https://www.hbs.edu/" target="_blank" rel="noopener noreferrer">
          Harvard Business School
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Leonardo Párraga",
    rol: "Voluntario",
    foto: "/aisc/equipo/leonardo-parraga.png",
    linkedin: "https://www.linkedin.com/in/leonardoparraga/",
    bio: (
      /* La Coalición no tiene sitio propio, así que el nombre va sin enlace. */
      <>
        Cofundador y codirector de la Coalición Colombiana de Juventudes, Paz y
        Seguridad. Magíster en política educativa internacional de la{" "}
        <a className={ENLACE} href="https://www.gse.harvard.edu/" target="_blank" rel="noopener noreferrer">
          Harvard Graduate School of Education
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Manuel Cabrera",
    rol: "Voluntario",
    foto: "/aisc/equipo/manuel-cabrera.png",
    linkedin: "https://www.linkedin.com/in/manueloff14/",
    bio: (
      <>
        Trabajó recientemente como programador full stack en{" "}
        <a className={ENLACE} href="https://www.linkedin.com/company/aeuniandes" target="_blank" rel="noopener noreferrer">
          Altruismo Eficaz Uniandes
        </a>
        . Recién egresado del bachillerato.
      </>
    ),
  },
];

/* Cuantas fichas van arriba. El resto baja a la segunda fila. */
const EN_PRIMERA_FILA = 2;

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
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">¿Quiénes somos?</h1>
            <nav aria-label="En esta página">
              <ul className="flex flex-wrap gap-2">
                <li>
                  <a className="text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep" href="#sobre">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a className="text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep" href="#que-hacemos">
                    Qué hacemos
                  </a>
                </li>
                <li>
                  <a className="text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep" href="#equipo">
                    Equipo
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 pt-14 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,1.4fr)] md:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg">Sobre nosotros</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
              <p>AI Safety Colombia es una comunidad, creada en 2024, que trabaja para reducir los riesgos de la inteligencia artificial avanzada. Formamos a quienes quieren entrar al campo, apoyamos investigación y organizamos eventos abiertos.</p>
              <p>
                La comunidad reúne a estudiantes, investigadores, ingenieros y profesionales de política pública. Se participa a través del grupo de lectura, las charlas y los hackathones de investigación: <Link className={ENLACE} href="/unete">así se entra</Link>.
              </p>
              <p>
                Trabajamos con <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">Apart Research</a> y <a className={ENLACE} href="https://bluedot.org" target="_blank" rel="noopener noreferrer">BlueDot Impact</a>, con apoyo de <a className={ENLACE} href="https://kairos-project.org" target="_blank" rel="noopener noreferrer">Kairos</a> y <a className={ENLACE} href="https://www.coefficientgiving.org" target="_blank" rel="noopener noreferrer">Coefficient Giving</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="que-hacemos" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 pt-4 pb-14 md:pb-20 lg:pb-24">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <h2 className="text-display-2 md:text-display-2-lg">Qué hacemos</h2>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            <li className="flex flex-col gap-3 border-t border-aisc-forest-deep/30 pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">Grupo de lectura de AI Control</h3>
              <p className="text-body text-aisc-ink">Cada quince días, los viernes, se discute una lectura sobre cómo supervisar sistemas de IA que actúan por su cuenta. Se llega con cualquier nivel de conocimiento.</p>
              <span className="text-body-sm"><a className={ENLACE} href="https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB" target="_blank" rel="noopener noreferrer">Entrar al grupo de lectura</a></span>
            </li>
            <li className="flex flex-col gap-3 border-t border-aisc-forest-deep/30 pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">Hackathones de investigación</h3>
              <p className="text-body text-aisc-ink">Abrimos en Bogotá el hub presencial de los hackathones de Apart Research. Los equipos salen con un trabajo propio y retroalimentación escrita de jurados de fuera.</p>
              <span className="text-body-sm"><Link className={ENLACE} href="/sprint">Ver el sprint</Link></span>
            </li>
            <li className="flex flex-col gap-3 border-t border-aisc-forest-deep/30 pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">Charlas y talleres</h3>
              <p className="text-body text-aisc-ink">Investigadores del campo cuentan su trabajo y responden preguntas en persona.</p>
              <span className="text-body-sm"><a className={ENLACE} href="https://luma.com/user/usr-TMDEtNWA1TozP77" target="_blank" rel="noopener noreferrer">Ver los próximos</a></span>
            </li>
            <li className="flex flex-col gap-3 border-t border-aisc-forest-deep/30 pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">Investigación</h3>
              <p className="text-body text-aisc-ink">Trabajos publicados por gente de la comunidad.</p>
              <span className="text-body-sm"><Link className={ENLACE} href="/investigacion">Ver las publicaciones</Link></span>
            </li>
          </ul>
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
          {/* La misma rejilla del sprint (dos, tres y cinco columnas) para que
              el retrato mida lo mismo alli y aca. La primera fila ocupa dos de
              los cinco puestos y la segunda, cuatro. */}
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-16 lg:mt-20 lg:grid-cols-5">
            {EQUIPO.slice(0, EN_PRIMERA_FILA).map((p) => (
              <Ficha key={p.nombre} p={p} />
            ))}
          </ul>

          {/* La segunda fila siempre tiene cuatro puestos. Los que aun no
              tienen nombre quedan marcados, no escondidos. */}
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-10 lg:grid-cols-5">
            {EQUIPO.slice(EN_PRIMERA_FILA).map((p) => (
              <Ficha key={p.nombre} p={p} />
            ))}
            {Array.from({ length: Math.max(0, 4 - (EQUIPO.length - EN_PRIMERA_FILA)) }).map((_, i) => (
              <li className="flex flex-col gap-3" key={`por-anunciar-${i}`}>
                <div className="flex aspect-square w-full items-center justify-center rounded-[8px] border border-dashed border-aisc-forest/40 p-4 text-center">
                  <span className="text-body-sm text-aisc-muted">Por anunciar</span>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </section>

      <CtaPanel
        title="¿Quieres ser voluntario?"
        body="No hay membresía ni convocatoria: se llega a un evento, a un programa o a una conversación."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://cal.com/josegelves/meeting"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hablar 20 minutos
        </a>
        <a
          className={CTA_LINK}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar al grupo
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
