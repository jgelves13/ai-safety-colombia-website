import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { APART_SPRINT_URL, CIERRE_TEXTO } from "./datos";

export const metadata: Metadata = {
  title: "AI Incident Response Sprint",
  description:
    "Del 11 al 13 de septiembre de 2026. Apart Research y CeSIA convocan el sprint sobre respuesta a incidentes de IA. Abrimos el espacio presencial en Bogotá; las aplicaciones cierran el 6 de septiembre.",
};

const ENLACE = "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

/* Los tres datos que alguien busca antes de leer nada más. */
const DATOS = [
  {
    rotulo: "Cuándo",
    valor: "11 al 13 de septiembre de 2026",
    nota: "Arranca el viernes en la noche y cierra el domingo en la noche.",
  },
  {
    rotulo: "Dónde",
    valor: "Bogotá y en línea",
    nota: "El espacio presencial es nuestro; la sede se confirma en los próximos días.",
  },
  {
    rotulo: "Premios",
    valor: "USD 2.000",
    nota: "Los reparte Apart entre los cinco primeros puestos de todo el sprint.",
  },
];

/* Lo que se lleva alguien que participa. Van numerados porque son tres cosas
   distintas, no tres formas de decir lo mismo. */
const PILARES = [
  {
    titulo: "Sales con un artefacto, no con una idea",
    body: "El entregable no es una presentación. Es un estándar de contención, un banco de detección, una petición de información para un regulador o un ejercicio de mesa: algo que otra persona pueda tomar y usar el lunes siguiente.",
  },
  {
    titulo: "Te lee gente de fuera",
    body: "Los proyectos los califican jurados que no estuvieron en la sala y que no saben de dónde viene cada equipo. La retroalimentación llega por escrito y el reporte queda publicado con tu nombre en el sitio de Apart.",
  },
  {
    titulo: "Se entra sin credenciales",
    body: "No se pide experiencia previa en seguridad de la IA ni título en nada. Los equipos son de una a cinco personas y se pueden armar en el momento, con quien esté en la sala.",
  },
];

/* Los cinco tracks son de Apart. La descripción resume lo que su convocatoria
   pide como entregable, no lo que a nosotros nos parece interesante. */
const TRACKS = [
  {
    id: "contencion",
    titulo: "Estándares de contención",
    body: "Escribir el mínimo con el que se debería correr una evaluación en caja de arena. Entra acá quien pueda proponer una matriz de control por fase de ataque, o empaquetar mitigaciones de forma que un tercero verifique que se cumplen.",
  },
  {
    id: "analisis",
    titulo: "Análisis del incidente",
    body: "Reconstruir qué pasó y en qué punto falló el monitoreo. Se buscan preguntas que alguien pueda resolver, revisiones que se puedan correr mañana y explicaciones causales que predigan algo.",
  },
  {
    id: "regulacion",
    titulo: "Respuesta regulatoria",
    body: "Redactar peticiones de información que un regulador pueda usar casi sin editar, poner a prueba los sistemas de reporte que ya existen y señalar los vacíos legales que dejan. CeSIA lleva a reguladores lo que pase la barra.",
  },
  {
    id: "comunicacion",
    titulo: "Estrategia de comunicación",
    body: "Auditar cómo cubrieron el incidente los medios y armar el kit con el que se comunica el siguiente. Acá pesa el anclaje en el registro de lo que de verdad ocurrió y la evidencia de que el mensaje llega a alguien.",
  },
  {
    id: "abierto",
    titulo: "Track abierto",
    body: "Cualquier otro ángulo del mismo problema. La condición es la de siempre: un artefacto que alguien pueda usar y una frase honesta sobre hasta dónde llega lo que demuestra.",
  },
];

/* Lo que ponemos nosotros. Cada línea es una cosa que el sitio se compromete a
   dar; lo que aún no está cerrado se dice que no está cerrado. */
const HUB = [
  {
    titulo: "Alimentación durante todo el fin de semana",
    body: "Cubrimos las comidas de los tres días. Si tienes alguna restricción, se pregunta en el formulario.",
  },
  {
    titulo: "Algo de dinero para cómputo",
    body: "Vamos a cubrir parte del gasto de cómputo de los equipos. La cifra la confirmamos antes del cierre de aplicaciones.",
  },
  {
    titulo: "Mentoría en sala",
    body: "Gente que trabaja en respuesta a incidentes, en seguridad ofensiva y en regulación pasa por el espacio durante el fin de semana.",
  },
  {
    titulo: "Cupos limitados",
    body: "El espacio tiene aforo, así que hay proceso de selección. Se aplica por el formulario y avisamos por correo.",
  },
];

/* Premios de Apart, tal como los publica su convocatoria. */
const PREMIOS = [
  { puesto: "Primer puesto", monto: "USD 1.000" },
  { puesto: "Segundo puesto", monto: "USD 500" },
  { puesto: "Tercer puesto", monto: "USD 300" },
  { puesto: "Cuarto puesto", monto: "USD 100" },
  { puesto: "Quinto puesto", monto: "USD 100" },
];

const FAQ = [
  {
    q: "¿Necesito saber programar?",
    a: "No para todos los tracks. Los de regulación y comunicación se ganan escribiendo bien y entendiendo el expediente. Los de contención y análisis sí piden manos en el teclado, aunque los equipos suelen mezclar perfiles.",
  },
  {
    q: "¿Tengo que llegar con equipo?",
    a: "No. Los equipos son de una a cinco personas y se arman el viernes en la noche, en la sala y en el Discord de Apart. Mucha gente llega sola y sale con equipo.",
  },
  {
    q: "¿Qué diferencia hay entre aplicar acá y participar en línea?",
    a: "El sprint es el mismo y el entregable se sube al mismo sitio. Aplicar acá es para el espacio presencial en Bogotá, que tiene cupo limitado, alimentación y mentoría en sala. Participar en línea con Apart no tiene selección ni cupo.",
  },
  {
    q: "¿Cuánto tiempo toma la aplicación?",
    a: "Entre quince y veinticinco minutos. Hay una sola pregunta de selección de verdad: qué problema te gustaría abordar y con qué enfoque. No buscamos una propuesta cerrada.",
  },
  {
    q: "¿Puedo aplicar si no vivo en Bogotá?",
    a: "Sí. En el formulario nos dices desde dónde vendrías y lo tenemos en cuenta al organizar. El apoyo para viaje depende de lo que consigamos y no lo prometemos de entrada.",
  },
  {
    q: "¿Quién organiza qué?",
    a: "Apart Research y CeSIA convocan el sprint a nivel global, definen los tracks, ponen los premios y reciben los proyectos. Nosotros abrimos y sostenemos el espacio presencial en Bogotá.",
  },
];

const SECCION = "bg-aisc-cream";
const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16";
const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
const ENCABEZADO =
  "grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10";

export default function Hackathon() {
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
          src="/aisc/patterns/aisc-hero-hackathon.svg"
        />
        <SiteHeader active="/hackathon" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[820px] flex-col gap-5">
            <span className="text-kicker text-aisc-coral">
              11 al 13 de septiembre de 2026 · Bogotá y en línea
            </span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              AI Incident Response Sprint
            </h1>
            <p className="text-body md:text-body-lg max-w-[680px] text-aisc-sand/90">
              Un fin de semana para convertir los primeros incidentes en los que un sistema de IA actuó por su cuenta
              contra un tercero en material que sirva a quien tiene que responder. Lo convocan Apart Research y CeSIA.
              Nosotros abrimos el espacio presencial en Bogotá.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link className={CTA_LINK_PRIMARY} href="/hackathon/aplicar">
                Aplicar al espacio en Bogotá
              </Link>
              <a className={CTA_LINK} href={APART_SPRINT_URL} target="_blank" rel="noopener noreferrer">
                Participar en línea con Apart
              </a>
            </div>
            <p className="text-meta text-aisc-sand/70">{CIERRE_TEXTO}</p>
          </div>
        </div>
      </section>

      {/* Los tres datos duros, en la banda inmediatamente debajo del hero. */}
      <section className={SECCION}>
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
            {DATOS.map((d) => (
              <li className="flex" key={d.rotulo}>
                <div className="flex w-full flex-col rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-7 lg:p-8">
                  <span className="text-kicker text-aisc-coral">{d.rotulo}</span>
                  <p className="text-display-3 md:text-display-3-lg mt-4 text-balance">{d.valor}</p>
                  <p className="text-body-sm mt-3 text-aisc-muted">{d.nota}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="que-es" className={SECCION}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">De qué se trata</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                Ya hay casos documentados en los que un sistema de IA atacó por su cuenta a un tercero. El problema es
                que, cuando eso pasa, casi nadie tiene a mano el procedimiento: ni cómo contenerlo, ni cómo reconstruir
                qué falló, ni qué le puede exigir un regulador al proveedor, ni cómo se cuenta sin exagerar ni
                minimizar.
              </p>
              <p>
                Este sprint existe para llenar ese vacío con piezas concretas. Se trabaja en cinco frentes en paralelo y
                cada equipo entrega algo que alguien más pueda usar: un estándar, un banco de pruebas, un cuestionario
                para un regulador, un ejercicio de mesa.
              </p>
              <p>
                <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
                  Apart Research
                </a>{" "}
                y CeSIA convocan el sprint a nivel global, definen los retos y reciben los proyectos. Nosotros abrimos
                el espacio presencial en Bogotá para quienes quieran trabajarlo acompañados y en persona.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
            {PILARES.map((p, i) => (
              <li className="flex" key={p.titulo}>
                <article className="flex w-full flex-col rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-7 lg:p-8">
                  <span className="text-meta text-aisc-coral tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-display-3 md:text-display-3-lg mt-4 text-balance">{p.titulo}</h3>
                  <p className="text-body-sm mt-3 text-aisc-ink">{p.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="tracks" className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 py-14 md:py-16">
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Los cinco frentes</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Se escoge uno al armar el equipo. En el formulario nos dices cuál te llama, y eso nos sirve para juntar
              perfiles que se complementen y para invitar a los mentores que hagan falta.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-3">
            {TRACKS.map((t) => (
              <li className="flex" key={t.id}>
                <article className="flex w-full flex-col rounded-lg border border-aisc-forest-deep/25 bg-aisc-cream p-6 md:p-7 lg:p-8">
                  <h3 className="text-display-3 md:text-display-3-lg text-balance">{t.titulo}</h3>
                  <p className="text-body-sm mt-3 text-aisc-ink">{t.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="bogota" className={SECCION}>
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">El espacio en Bogotá</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                Trabajar tres días seguidos es más fácil acompañado que solo en la casa. Por eso abrimos una sala en
                Bogotá durante todo el fin de semana, con mentoría, comida y gente con la que armar equipo.
              </p>
              <p>
                La sede se confirma en los próximos días y la anunciamos por correo a quienes queden seleccionados y
                por el{" "}
                <a
                  className={ENLACE}
                  href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  grupo de WhatsApp
                </a>
                .
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {HUB.map((h) => (
              <li className="border-t border-aisc-forest-deep/15 py-5" key={h.titulo}>
                <h3 className="text-display-4 md:text-display-4-lg text-balance">{h.titulo}</h3>
                <p className="text-body-sm mt-2 text-aisc-muted">{h.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="premios" className={SECCION}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Premios y qué pasa después</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                Apart reparte USD 2.000 entre los cinco primeros puestos de todo el sprint. Los jurados evalúan los
                proyectos la semana siguiente y la calificación es ciega.
              </p>
              <p>
                Más allá del premio, los equipos con mejores resultados entran a la vía rápida de la beca de
                investigación de Apart y quedan conectados con mentores del campo. Cada reporte se publica completo y
                con los nombres de sus autores.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {PREMIOS.map((p) => (
              <li
                className="text-body flex items-baseline justify-between gap-6 border-t border-aisc-forest-deep/15 py-3.5"
                key={p.puesto}
              >
                <span>{p.puesto}</span>
                <span className="text-aisc-forest tabular-nums">{p.monto}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="mentores" className={SECCION}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="grid grid-cols-1 gap-8 pt-5 md:gap-10 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Mentoría</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                Estamos cerrando el grupo de mentores para los cinco frentes. Por ahora está confirmada{" "}
                <strong>Camila Beltrán</strong>, y vamos anunciando el resto a medida que confirman.
              </p>
              <p>
                Si trabajas en respuesta a incidentes, en seguridad ofensiva, en regulación o en comunicación de
                riesgos y te interesa acompañar a un equipo, escríbenos a{" "}
                <a className={ENLACE} href="mailto:contacto@aisafetycolombia.org">
                  contacto@aisafetycolombia.org
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="preguntas" className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 py-14 md:py-16">
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Preguntas frecuentes</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Si te queda alguna sin responder, escríbenos a{" "}
              <a className={ENLACE} href="mailto:contacto@aisafetycolombia.org">
                contacto@aisafetycolombia.org
              </a>{" "}
              y te contestamos.
            </p>
          </div>
          <ul className="flex flex-col">
            {FAQ.map((f) => (
              <li key={f.q}>
                <details className="group border-t border-aisc-forest-deep/20">
                  <summary className="text-display-4 md:text-display-4-lg flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
                    <span className="text-balance">{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="text-aisc-coral shrink-0 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-body-sm max-w-[760px] pb-6 text-aisc-muted">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep/20" />
        </div>
      </section>

      <CtaPanel
        kicker={CIERRE_TEXTO}
        title="Aplica al espacio en Bogotá"
        body="El formulario toma entre quince y veinticinco minutos. Hay una sola pregunta de selección: qué problema te gustaría abordar y con qué enfoque."
      >
        <Link className={CTA_LINK_PRIMARY} href="/hackathon/aplicar">
          Aplicar
        </Link>
        <a className={CTA_LINK} href={APART_SPRINT_URL} target="_blank" rel="noopener noreferrer">
          Participar en línea
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
