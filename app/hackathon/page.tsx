import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  CTA_PATTERN_BOTTOM,
  CTA_PATTERN_TOP,
  HERO_CORNER_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { APART_SPRINT_URL, CIERRE_TEXTO } from "./datos";

export const metadata: Metadata = {
  title: "AI Incident Response Sprint",
  description:
    "Del 11 al 13 de septiembre de 2026. Apart Research y CeSIA convocan el sprint sobre respuesta a incidentes de IA. Abrimos el espacio presencial en Bogotá; las aplicaciones cierran el 6 de septiembre.",
};

const ENLACE = "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

/* Los tres datos que alguien busca antes de leer nada más. Van en tarjetas
   oscuras pegadas al hero, como en la página de programa de SASH. */
const DATOS = [
  {
    rotulo: "11 al 13 de septiembre de 2026",
    valor: "Tres días",
    nota: "Arranca el viernes en la noche y cierra el domingo en la noche.",
  },
  {
    rotulo: "Bogotá y en línea",
    valor: "Espacio presencial",
    nota: "La sede se confirma en los próximos días. El sprint también se puede hacer en remoto con Apart.",
  },
  {
    rotulo: "USD 2.000 en premios",
    valor: "Cinco puestos",
    nota: "Los reparte Apart entre los mejores proyectos de todo el sprint, no solo de Bogotá.",
  },
];

/* Quién hace qué. La frontera importa: Apart y CeSIA convocan, nosotros
   abrimos la sala. */
const ORGANIZAN = [
  {
    nombre: "Apart Research",
    rol: "Convoca el sprint, define los cinco retos, pone los premios y recibe los proyectos.",
  },
  {
    nombre: "CeSIA",
    rol: "Coorganiza el sprint y lleva a reguladores europeos el material que pase la barra.",
  },
  {
    nombre: "AI Safety Colombia",
    rol: "Abre y sostiene el espacio presencial en Bogotá durante los tres días.",
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
    body: "Redactar peticiones de información que un regulador pueda usar casi sin editar, poner a prueba los sistemas de reporte que ya existen y señalar los vacíos legales que dejan.",
  },
  {
    id: "comunicacion",
    titulo: "Estrategia de comunicación",
    body: "Auditar cómo cubrieron el incidente los medios y armar el kit con el que se comunica el siguiente. Acá pesa el anclaje en el registro de lo que de verdad ocurrió.",
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
    titulo: "Alimentación",
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
    titulo: "Sala y conectividad",
    body: "Espacio de trabajo durante todo el fin de semana, con mesas para equipos y con dónde conectarse.",
  },
  {
    titulo: "Con quién armar equipo",
    body: "El viernes en la noche se arman los equipos en la sala. Mucha gente llega sola y sale con equipo.",
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

const PERFILES = [
  "Gente de ingeniería, ciencia de datos o seguridad informática que quiera meterle mano a la contención y al análisis del incidente.",
  "Gente de derecho, política pública o periodismo: los frentes de regulación y comunicación se ganan escribiendo bien y entendiendo el expediente.",
  "Quien ya responda incidentes en otra industria, de banca a salud, y quiera ver cómo se traduce eso a sistemas de IA.",
  "Quien viene leyendo sobre riesgos de la IA y quiere pasar de leer a producir algo que otra persona pueda usar.",
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
    a: "Sí, y en el formulario nos dices desde dónde vendrías para tenerlo en cuenta al organizar. El viaje corre por tu cuenta: no cubrimos transporte ni alojamiento.",
  },
  {
    q: "¿Quién organiza qué?",
    a: "Apart Research y CeSIA convocan el sprint a nivel global, definen los tracks, ponen los premios y reciben los proyectos. Nosotros abrimos y sostenemos el espacio presencial en Bogotá.",
  },
];

const SECCION = "bg-aisc-cream";
const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";
const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
/* El encabezado de dos columnas de SASH: el titular a la izquierda, todo el
   texto a la derecha en una medida corta. */
const ENCABEZADO = "mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6";
const COLUMNA = "flex min-w-0 flex-col gap-6";
const PROSA = "text-body md:text-body-lg flex max-w-[640px] flex-col gap-5 text-aisc-ink";
const ROTULO = "text-meta mb-3 font-semibold tracking-widest text-aisc-muted uppercase";
const FILA = "flex flex-col gap-0.5 border-t border-aisc-ink/20 py-3";
/* La tarjeta de contorno con la que SASH lista lo que recibe cada persona. */
const TARJETA = "flex min-h-[104px] flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-5 md:min-h-[114px] md:p-6";
const PATRON = "/aisc/patterns/aisc-wash-lattice.svg";

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
          <div className="flex max-w-[860px] flex-col gap-5">
            <span className="text-kicker text-aisc-coral">Apart Research · CeSIA · AI Safety Colombia</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              AI Incident Response Sprint
            </h1>
            <p className="text-body md:text-body-lg max-w-[680px] text-aisc-sand/90">
              Un fin de semana para convertir los primeros incidentes en los que un sistema de IA actuó por su cuenta
              contra un tercero en material que sirva a quien tiene que responder.
            </p>
            <p className="text-display-4 md:text-display-4-lg mt-1 w-fit text-aisc-sand/80">{CIERRE_TEXTO}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link className={CTA_LINK_PRIMARY} href="/hackathon/aplicar">
                Aplicar al espacio en Bogotá
              </Link>
              <a className={CTA_LINK} href={APART_SPRINT_URL} target="_blank" rel="noopener noreferrer">
                Participar en línea con Apart
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Las tres cifras duras, en tarjetas oscuras pegadas al hero. */}
      <section className={`${SECCION} pt-9 pb-14 md:pt-10 md:pb-16`}>
        <div className={`${CONTENEDOR} flex flex-col gap-12 md:gap-14`}>
          <dl className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
            {DATOS.map((d) => (
              <div
                className="flex min-h-[122px] flex-col justify-start rounded-[8px] bg-aisc-forest-deep px-5 py-5 text-aisc-sand md:min-h-[142px] md:px-7 md:py-7"
                key={d.rotulo}
              >
                <dt className="text-display-4 md:text-display-4-lg text-balance">{d.rotulo}</dt>
                <dd className="text-body-sm mt-3 text-aisc-sand/80">
                  <span className="text-aisc-coral">{d.valor}</span> · {d.nota}
                </dd>
              </div>
            ))}
          </dl>

          {/* De qué se trata */}
          <section id="que-es" className="flex flex-col gap-5">
            <div aria-hidden="true" className={HAIRLINE} />
            <div className={ENCABEZADO}>
              <h2 className="text-display-2 md:text-display-2-lg break-words">De qué se trata</h2>
              <div className={COLUMNA}>
                <p className="text-body md:text-body-lg font-serif max-w-[640px]">
                  Ya hay casos documentados en los que un sistema de IA atacó por su cuenta a un tercero. Cuando eso
                  pasa, casi nadie tiene a mano el procedimiento.
                </p>
                <div className={PROSA}>
                  <p>
                    No está escrito cómo se contiene, ni cómo se reconstruye qué falló, ni qué le puede exigir un
                    regulador al proveedor, ni cómo se cuenta el caso sin exagerar ni minimizar. El sprint existe para
                    llenar ese vacío con piezas concretas.
                  </p>
                  <p>
                    Se trabaja en cinco frentes en paralelo durante tres días. Cada equipo entrega algo que alguien más
                    pueda usar: un estándar, un banco de pruebas, un cuestionario para un regulador, un ejercicio de
                    mesa. Los proyectos se califican después del fin de semana y se publican completos.
                  </p>
                </div>
                <div>
                  <p className={ROTULO}>Quién organiza qué</p>
                  <ul>
                    {ORGANIZAN.map((o) => (
                      <li className={FILA} key={o.nombre}>
                        <span className="text-display-4 font-semibold text-aisc-forest">{o.nombre}</span>
                        <span className="text-body text-aisc-ink">{o.rol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Los tres pilares, dentro del panel tintado */}
      <section className="bg-aisc-cream px-6 py-10 md:py-12">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-10 md:px-10 lg:py-14">
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg break-words">Por qué vale el fin de semana</h2>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
              Un hackathon de Apart no termina en una presentación de cinco minutos ante una sala amiga. Termina en un
              documento que alguien de afuera lee, califica y cita.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {PILARES.map((p, i) => (
              <li className="flex" key={p.titulo}>
                <article className="flex min-h-[180px] w-full flex-col gap-4 rounded-[8px] border border-aisc-forest/55 bg-transparent p-6 md:min-h-[210px] md:p-8 lg:min-h-[256px]">
                  <span className="text-display-2 tabular-nums text-aisc-forest" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-display-4 md:text-display-4-lg text-balance">{p.titulo}</h3>
                  <p className="text-body-sm text-aisc-ink">{p.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Los cinco frentes */}
      <section id="tracks" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">Los cinco frentes</h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                Cada equipo escoge uno. En el formulario nos dices cuál te llama, y eso nos sirve para juntar perfiles
                que se complementen y para invitar a los mentores que hagan falta.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {TRACKS.map((t) => (
              <li className="flex" key={t.id}>
                <article className="flex min-h-[180px] w-full flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 md:min-h-[200px] md:p-7">
                  <h3 className="text-display-4 md:text-display-4-lg text-balance">{t.titulo}</h3>
                  <p className="text-body-sm text-aisc-ink">{t.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* El espacio en Bogotá */}
      <section id="bogota" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">Qué encuentras en Bogotá</h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Trabajar tres días seguidos es más fácil acompañado que solo en la casa. Por eso abrimos una sala en
                  Bogotá durante todo el fin de semana.
                </p>
                <p>
                  La sede se confirma en los próximos días. La anunciamos por correo a quienes queden seleccionados y
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
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {HUB.map((h) => (
              <li className="flex" key={h.titulo}>
                <article className={`${TARJETA} w-full`}>
                  <h3 className="text-display-4 text-balance">{h.titulo}</h3>
                  <p className="text-body-sm text-aisc-muted">{h.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mentoría */}
      <section id="mentores" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">Mentoría</h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Durante el fin de semana pasa por la sala gente que trabaja en los temas de los cinco frentes. No
                  dictan charlas: se sientan con los equipos a revisar lo que llevan.
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
              <div>
                <p className={ROTULO}>Confirmados hasta ahora</p>
                <ul>
                  <li className={FILA}>
                    <span className="text-display-4 font-semibold text-aisc-forest">Camila Beltrán</span>
                    <span className="text-body text-aisc-ink">
                      Vamos anunciando el resto del grupo a medida que confirman.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quién puede aplicar */}
      <section id="quien" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">Quién puede aplicar</h2>
            <div className="flex max-w-[640px] flex-col gap-6">
              <p className="text-body md:text-body-lg text-aisc-ink">
                No se pide experiencia previa en seguridad de la IA ni título en nada. Se pide que puedas estar los tres
                días y que llegues con una idea de qué te gustaría abordar.
              </p>
              <ul className="text-body md:text-body-lg flex list-disc flex-col gap-3 pl-5 text-aisc-ink">
                {PERFILES.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="text-body md:text-body-lg text-aisc-ink">
                La aplicación toma entre quince y veinticinco minutos y no necesitas preparar nada de antemano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premios */}
      <section id="premios" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">Premios y qué pasa después</h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
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
              <ul>
                {PREMIOS.map((p) => (
                  <li className="text-body flex items-baseline justify-between gap-6 border-t border-aisc-ink/20 py-3" key={p.puesto}>
                    <span>{p.puesto}</span>
                    <span className="tabular-nums text-aisc-forest">{p.monto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="mt-5 flex flex-col gap-8">
            <h2 className="text-display-2 md:text-display-2-lg break-words">Preguntas frecuentes</h2>
            <ul className="flex flex-col">
              {FAQ.map((f) => (
                <li key={f.q}>
                  <details className="group border-t border-aisc-ink/20">
                    <summary className="text-display-4 md:text-display-4-lg flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
                      <span className="text-balance">{f.q}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-aisc-coral transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-body-sm max-w-[860px] pb-5 text-aisc-muted">{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-ink/20" />
          </div>
        </div>
      </section>

      {/* El cierre: panel alto y centrado, como el de SASH */}
      <section className="bg-aisc-cream px-6">
        <div className="mx-auto w-full max-w-[1400px] py-12 md:py-14 lg:py-16">
          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[var(--radius)] bg-aisc-forest-deep px-6 py-16 text-center text-aisc-sand md:py-20">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_TOP}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_BOTTOM}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center gap-6">
              <span className="text-kicker text-aisc-coral">{CIERRE_TEXTO}</span>
              <h2 className="text-display-2 md:text-display-2-lg text-balance">Aplica al espacio en Bogotá</h2>
              <p className="text-body md:text-body-lg text-aisc-sand/85">
                Hay una sola pregunta de selección de verdad: qué problema te gustaría abordar y con qué enfoque. No
                buscamos una propuesta cerrada.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link className={CTA_LINK_PRIMARY} href="/hackathon/aplicar">
                  Aplicar
                </Link>
                <a className={CTA_LINK} href={APART_SPRINT_URL} target="_blank" rel="noopener noreferrer">
                  Participar en línea
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
