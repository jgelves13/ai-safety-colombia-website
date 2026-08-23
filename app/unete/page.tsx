import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Únete",
  description:
    "Las tres cosas abiertas en AI Safety Colombia: el grupo de WhatsApp, el grupo de lectura sobre AI Control los viernes, y los eventos y hackathones en Bogotá.",
};

/* Las tres cosas que están abiertas ahora mismo, cada una con su ritmo real y
   con lo que pasa después. Nada de formularios: todo apunta a canales que ya
   existen. Lo demás (agendar, escribir) va abajo, que no son actividades. */
const ABIERTO = [
  {
    // TODO: reemplazar por el enlace permanente del grupo de WhatsApp
    href: "https://chat.whatsapp.com/",
    external: true,
    title: "El grupo de WhatsApp",
    cuando: "Siempre abierto",
    cta: "Entrar al grupo",
    body: "Es donde se anuncia todo primero: las sesiones del grupo de lectura, los eventos y las convocatorias. Poco tráfico y nadie tiene que presentarse.",
    despues: "Entras y ves lo que viene. Puedes quedarte mirando el tiempo que quieras.",
  },
  {
    href: "mailto:jose@aisafetycolombia.org",
    external: true,
    title: "Grupo de lectura: AI Control",
    cuando: "Viernes, 6:30 p. m., virtual, una hora",
    cta: "Pedir el enlace",
    body: "Leemos y discutimos trabajos recientes sobre cómo supervisar sistemas de IA que actúan por su cuenta. Cada sesión la lidera un participante distinto y la presentación dura máximo veinte minutos, así que se puede llegar solo a escuchar o llegar a presentar.",
    despues: "Te pasamos el enlace y la lectura de esa semana. Se puede entrar suelto, sin seguir el ciclo entero.",
  },
  {
    href: "/eventos",
    external: false,
    title: "Eventos y hackathones",
    cuando: "El próximo hackathon es del 11 al 13 de septiembre",
    cta: "Ver los próximos",
    body: "Durante el año hay charlas y talleres en Bogotá, con entrada libre y casi siempre en universidad. El hackathon de investigación lo convoca Apart Research y nosotros abrimos el espacio presencial acá: son tres días para salir con un trabajo propio.",
    despues: "Llegas, escuchas y decides. Nadie te va a pedir datos en la puerta.",
  },
];

/* Las tres razones por las que alguien escribe en vez de entrar a algo. No son
   actividades, así que van en una franja delgada y no en tarjetas. */
const ESCRIBIR = [
  {
    title: "No sabes por dónde empezar",
    body: "Veinte minutos para entender qué te interesa y decirte por dónde entrar. Sin compromiso.",
    href: "https://cal.com/josegelves/meeting",
    cta: "Agendar en el calendario",
  },
  {
    title: "Quieres ayudar a organizar",
    body: "Quienes sostienen esto son voluntarios. Siempre falta gente para eventos, logística y comunicación.",
    href: "mailto:jose@aisafetycolombia.org",
    cta: "jose@aisafetycolombia.org",
  },
  {
    title: "Escribes desde una universidad o una organización",
    body: "Charlas, talleres y colaboraciones, o algo que quieras proponernos.",
    href: "mailto:jose@aisafetycolombia.org",
    cta: "jose@aisafetycolombia.org",
  },
];

/* Las cuatro objeciones que aparecen siempre. Solo se afirma lo que es verdad. */
const NO_NECESITAS = [
  {
    title: "Un posgrado",
    body: "Ni en inteligencia artificial ni en nada. Vienen de ingeniería, derecho, economía, política pública y ciencias sociales.",
  },
  {
    title: "Experiencia previa en el tema",
    body: "La mayoría llega sin haber leído nada del campo.",
  },
  {
    title: "Inglés fluido",
    body: "Casi todo el material del campo está en inglés, pero acá se discute en español.",
  },
  {
    title: "Dedicarle la carrera entera",
    body: "Se puede entrar a leer un viernes al mes y ya.",
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
        <SiteHeader active="/unete" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Se entra trabajando</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">Únete</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              No hace falta ser investigador ni haber estudiado inteligencia artificial. Estas son las tres cosas
              abiertas ahora mismo y lo que pasa después de cada una.
            </p>
          </div>
        </div>
      </section>

      <section id="abierto" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Qué hay abierto</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Ninguna es mejor que otra y no hay que empezar por la primera. Escoge la que te dé menos pereza hoy.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
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

      <section id="escribir" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-6 pt-5 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-10 md:pt-7">
            <h2 className="text-display-3 md:text-display-3-lg text-balance">Si prefieres escribir</h2>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
              {ESCRIBIR.map((item) => (
                <li className="border-aisc-line border-t pt-3" key={item.title}>
                  <h3 className="text-body-sm font-semibold text-aisc-forest">{item.title}</h3>
                  <p className="text-body-sm mt-1 text-aisc-muted">{item.body}</p>
                  <a
                    className="text-body-sm mt-2 inline-block text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep"
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  >
                    {item.cta}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="requisitos" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-6 pt-5 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-10 md:pt-7">
            <h2 className="text-display-3 md:text-display-3-lg text-balance">Lo que no necesitas</h2>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              {NO_NECESITAS.map((item) => (
                <div className="border-aisc-line border-t pt-3" key={item.title}>
                  <dt className="text-body-sm font-semibold text-aisc-forest">{item.title}</dt>
                  <dd className="text-body-sm mt-1 text-aisc-muted">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaPanel
        kicker="¿Prefieres mirar primero?"
        title="Nadie tiene que decidir hoy"
        body="Lee la explicación corta o mira lo que se ha hecho antes de escribir."
      >
        <Link className={CTA_LINK_PRIMARY} href="/seguridad-de-la-ia">
          Qué es AI safety
        </Link>
        <Link className={CTA_LINK} href="/investigacion">
          Ver lo que se ha hecho
        </Link>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
