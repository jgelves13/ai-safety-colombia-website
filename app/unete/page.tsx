import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";
import { cursosCerrados } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Únete",
  description:
    "Tres pasos para entrar a AI safety con AI Safety Colombia: explorar la comunidad, aprender en el Seminario de futuro y riesgos de la IA o en el Seminario técnico de seguridad de la IA, e investigar en los hackathones. Cada uno con su dedicación, requisitos y costo.",
  alternates: { canonical: "/unete", languages: alternativas("/unete") },
};

/* Se renderiza en cada visita: el aviso de los cursos se apaga solo cuando
   cierran las aplicaciones, el 11 de octubre. */
export const dynamic = "force-dynamic";

/* La escalera: explorar sin compromiso, aprender en un curso con cohorte e
   investigar en un hackathon. Cada opción dice lo mismo en el mismo orden,
   dedicación, requisitos y costo, para que se puedan comparar de un vistazo. */
const PASOS = [
  {
    id: "explora",
    numero: "01",
    titulo: "Explora",
    entrada: "Para conocer el campo y a la gente sin comprometerte a nada.",
    opciones: [
      {
        titulo: "El grupo de WhatsApp",
        cuerpo: "Donde preguntas lo que no entiendes y discutes lo que acabó de salir. Es también por donde se anuncian primero las sesiones, los eventos y las convocatorias.",
        dedicacion: "La que quieras",
        requisitos: "Ninguno",
        costo: "Gratis",
        href: "https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ",
        cta: "Entrar al grupo",
        externo: true,
      },
      {
        titulo: "Grupo de lectura: AI Control",
        cuerpo: "Discutimos una lectura sobre cómo se supervisa a un sistema de IA que actúa por su cuenta. Puedes venir solo a escuchar o traer una lectura y presentarla.",
        dedicacion: "Cada quince días, los viernes a las 6:30 p. m., en línea: una hora más la lectura",
        requisitos: "Ninguno; se llega con cualquier nivel de conocimiento",
        costo: "Gratis",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        cta: "Entrar al grupo de lectura",
        externo: true,
      },
      {
        titulo: "Charlas y talleres",
        cuerpo: "Oyes de primera mano a alguien que trabaja en el tema y le preguntas en persona lo que quieras. Ahí se conoce la gente de la comunidad.",
        dedicacion: "Una o dos horas por evento",
        requisitos: "Inscribirte en Luma",
        costo: "Gratis",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        cta: "Ver los próximos",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    numero: "02",
    titulo: "Aprende",
    entrada: "Seminarios con cohorte y facilitador, con los materiales de BlueDot Impact. Aplicaciones abiertas hasta el domingo 11 de octubre a las 11:59 p. m., hora de Colombia.",
    opciones: [
      {
        titulo: "Seminario de futuro y riesgos de la IA",
        cuerpo: "Por qué se está corriendo hacia la AGI, qué impulsa el progreso, cuáles son los riesgos y qué defensas existen. Es el punto de partida si vienes de cualquier campo.",
        dedicacion: "Cinco semanas desde el lunes 12 de octubre, unas 5 horas por semana",
        requisitos: "Aplicar; no hace falta formación técnica",
        costo: "Gratis, con certificado de AI Safety Colombia",
        href: "/cursos/agi-strategy",
        cta: "Ver el seminario",
        externo: false,
      },
      {
        titulo: "Seminario técnico de seguridad de la IA",
        cuerpo: "Cómo se entrenan modelos más seguros, cómo se evalúan, interpretabilidad mecanicista y AI control. Para quien ya sabe por qué importa el problema y quiere entrar a la parte técnica.",
        dedicacion: "Seis semanas desde el lunes 12 de octubre, unas 5 horas por semana",
        requisitos: "Aplicar; entender lo básico de cómo se entrenan los modelos. Si no, empieza por el Seminario de futuro y riesgos de la IA",
        costo: "Gratis, con certificado de AI Safety Colombia",
        href: "/cursos/technical-ai-safety",
        cta: "Ver el seminario",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    numero: "03",
    titulo: "Investiga",
    entrada: "Para salir con un trabajo propio que puedas mostrar.",
    opciones: [
      {
        titulo: "Hackathones de investigación",
        cuerpo: "Abrimos en Bogotá el hub presencial de los hackathones de Apart Research. Los equipos salen con un trabajo publicado y retroalimentación escrita de jurados de fuera. El próximo se anuncia en el grupo de WhatsApp.",
        dedicacion: "Un fin de semana completo, de viernes a domingo",
        requisitos: "Aplicar para el hub en Bogotá, donde hay selección",
        costo: "Gratis",
        href: "/sprint",
        cta: "Ver el último sprint",
        externo: false,
      },
    ],
  },
];

const CARD =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col p-6 md:p-7 lg:p-8";
const ENLACE_CARD =
  "text-display-4 md:text-display-4-lg text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep";
const CHIP =
  "text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep";

export default function Unete() {
  const abiertos = !cursosCerrados();
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
              Tres pasos, según cuánto tiempo le quieras dedicar. Cada opción dice cuánto pide, qué necesitas y cuánto cuesta.
            </p>
            <nav aria-label="Los tres pasos">
              <ul className="flex flex-wrap gap-2">
                {PASOS.map((paso) => (
                  <li key={paso.id}>
                    <a className={CHIP} href={`#${paso.id}`}>
                      {paso.numero} · {paso.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {abiertos ? (
              <a
                className="text-body-sm inline-flex w-fit items-center gap-2 rounded-full bg-aisc-coral px-4 py-1.5 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85"
                href="#aprende"
              >
                Aplicaciones abiertas a los seminarios hasta el domingo 11 de octubre →
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {PASOS.map((paso) => (
        <section id={paso.id} key={paso.id} className="scroll-mt-6 bg-aisc-cream">
          <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-4 md:pt-16">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-4 pt-5 pb-10 md:gap-10 md:pt-7 md:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">
                <span className="text-aisc-forest">{paso.numero}</span> {paso.titulo}
              </h2>
              <p className="text-body md:text-body-lg self-end text-aisc-ink">{paso.entrada}</p>
            </div>
            <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-3">
              {paso.opciones.map((item) => (
                <li className="flex" key={item.titulo}>
                  <article className={CARD}>
                    <h3 className="text-display-3 md:text-display-3-lg text-balance">{item.titulo}</h3>
                    <p className="text-body-sm mt-3 text-aisc-ink">{item.cuerpo}</p>
                    <dl className="text-body-sm mt-6 flex flex-col gap-3 border-t border-aisc-line pt-5">
                      <div>
                        <dt className="text-meta text-aisc-muted">Dedicación</dt>
                        <dd className="text-aisc-ink">{item.dedicacion}</dd>
                      </div>
                      <div>
                        <dt className="text-meta text-aisc-muted">Requisitos</dt>
                        <dd className="text-aisc-ink">{item.requisitos}</dd>
                      </div>
                      <div>
                        <dt className="text-meta text-aisc-muted">Costo</dt>
                        <dd className="text-aisc-ink">{item.costo}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto pt-7">
                      {item.externo ? (
                        <a className={ENLACE_CARD} href={item.href} target="_blank" rel="noopener noreferrer">
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
      ))}

      <div className="bg-aisc-cream pt-10" />
      <CtaPanel
        kicker="¿No sabes por dónde empezar?"
        title="Habla con nosotros"
        body="Agenda una llamada corta con Jose Gelves, cofundador y director de AI Safety Colombia. En la llamada escogen juntos el paso que te sirve según lo que ya sabes y el tiempo que tienes."
      >
        <a className={CTA_LINK_PRIMARY} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar una llamada
        </a>
        <a className={CTA_LINK} href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer">
          Entrar al grupo de WhatsApp
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
