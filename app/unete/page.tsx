import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Únete | AI Safety Colombia",
  description:
    "Cuatro formas de entrar a AI Safety Colombia: el grupo de WhatsApp, veinte minutos con Jose, un correo o venir a un evento.",
};

/* Las cuatro puertas reales, cada una con lo que pasa despues. Nada de formularios
   por ahora: todo apunta a canales que ya existen. */
const PUERTAS = [
  {
    // TODO: reemplazar por el enlace permanente del grupo de WhatsApp
    href: "https://chat.whatsapp.com/",
    external: true,
    title: "El grupo de WhatsApp",
    cta: "Entrar al grupo",
    body: "Es donde se anuncian los eventos, las convocatorias y las sesiones del grupo de lectura. Poco tráfico y nadie tiene que presentarse.",
    despues: "Entras y ves lo que viene. Puedes quedarte mirando el tiempo que quieras.",
  },
  {
    href: "https://cal.com/josegelves/meeting",
    external: true,
    title: "Veinte minutos con Jose",
    cta: "Agendar en el calendario",
    body: "Una llamada para contarte qué hay, entender qué te interesa y decirte por dónde entrar sin que pierdas meses averiguándolo solo.",
    despues: "Escoges una hora libre en el calendario. No hay que escribir antes.",
  },
  {
    href: "mailto:jose@aisafetycolombia.org",
    external: true,
    title: "Escribirnos",
    cta: "jose@aisafetycolombia.org",
    body: "Sirve para lo que no cabe en un grupo: una propuesta de colaboración, una invitación, una pregunta larga o algo de tu organización.",
    despues: "Contestamos nosotros, no un formulario.",
  },
  {
    href: "/eventos",
    external: false,
    title: "Venir a un evento",
    cta: "Ver los próximos",
    body: "Charlas, talleres y cenas de discusión en Bogotá. Entrada libre y casi siempre en universidad. Es la forma más fácil de ver de qué se trata sin comprometerte a nada.",
    despues: "Llegas, escuchas y decides. Nadie te va a pedir datos en la puerta.",
  },
];

/* Las cuatro objeciones que aparecen siempre. Solo se afirma lo que es verdad. */
const NO_NECESITAS = [
  {
    title: "Un posgrado",
    body: "Ni en inteligencia artificial ni en nada. Entre quienes participan hay gente de ingeniería, derecho, economía, política pública y ciencias sociales.",
  },
  {
    title: "Experiencia previa en el tema",
    body: "La mayoría llega sin haber leído nada del campo. Para eso están el grupo de lectura y la conversación de veinte minutos.",
  },
  {
    title: "Inglés fluido",
    body: "Casi todo el material del campo está en inglés, pero acá se discute en español y las sesiones son en español.",
  },
  {
    title: "Dedicarle la carrera entera",
    body: "Se puede entrar a leer un viernes al mes y ya. Quien quiera ir más lejos encuentra por dónde, pero no es el requisito de entrada.",
  },
];

const CARD =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col p-6 md:p-7 lg:p-8";

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
              No hace falta ser investigador ni haber estudiado inteligencia artificial. Estas son las cuatro formas de
              entrar y lo que pasa después de cada una.
            </p>
          </div>
        </div>
      </section>

      <section id="puertas" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-16 md:pb-20">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Por dónde entrar</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Ninguna es mejor que otra y no hay que empezar por la primera. Escoge la que te dé menos pereza hoy.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
            {PUERTAS.map((puerta) => (
              <li className="flex" key={puerta.title}>
                <article className={CARD}>
                  <span aria-hidden="true" className="mb-5 block h-px w-10 flex-none bg-aisc-coral" />
                  <h3 className="text-display-3 md:text-display-3-lg text-balance">{puerta.title}</h3>
                  <p className="text-body-sm mt-3 text-aisc-ink">{puerta.body}</p>
                  <p className="text-meta mt-5 text-aisc-forest">{puerta.despues}</p>
                  <div className="mt-7">
                    {puerta.external ? (
                      <a
                        className="text-display-4 md:text-display-4-lg text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep"
                        href={puerta.href}
                        target={puerta.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={puerta.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      >
                        {puerta.cta}
                      </a>
                    ) : (
                      <Link
                        className="text-display-4 md:text-display-4-lg text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep"
                        href={puerta.href}
                      >
                        {puerta.cta}
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="requisitos" className="bg-aisc-cream px-6 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-14 md:gap-10 md:pt-7 md:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Lo que no necesitas</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Las cuatro cosas que la gente cree que le faltan antes de escribirnos. Ninguna hace falta.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2">
            {NO_NECESITAS.map((item) => (
              <div key={item.title} className="border-aisc-forest min-w-0 rounded-[8px] border bg-aisc-sand p-6 md:p-8">
                <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">{item.title}</h3>
                <p className="text-body-sm mt-3 text-aisc-ink">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        kicker="¿Prefieres mirar primero?"
        title="Nadie tiene que decidir hoy"
        body="Si todavía no sabes bien de qué se trata, lee la explicación corta o mira qué hacemos antes de escribir."
      >
        <Link className={CTA_LINK_PRIMARY} href="/seguridad-de-la-ia">
          Empezar aquí
        </Link>
        <Link className={CTA_LINK} href="/programas">
          Ver los programas
        </Link>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
