import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HeroHackathon } from "@/components/hero-hackathon";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  CTA_PATTERN_BOTTOM,
  CTA_PATTERN_TOP,
  HERO_DERRAME_CLASS,
  HERO_INNER,
  HERO_SECTION,
  HERO_VELO_CLASS,
  PAGE_SHELL,
} from "@/components/ui";
import { APART_SPRINT_URL, CIERRE_TEXTO } from "./datos";

export const metadata: Metadata = {
  title: "AI Incident Response Sprint",
  description:
    "Del 11 al 13 de septiembre de 2026. Apart Research y CeSIA convocan el sprint sobre respuesta a incidentes de IA. Abrimos el hub presencial en Bogotá; las aplicaciones cierran a la medianoche del domingo 6 de septiembre.",
};

const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

/* Los tres datos que alguien busca antes de leer nada más. Una cifra grande y
   una línea de apoyo, sin más: es lo que hace que se lean de un vistazo. */
const DATOS = [
  {
    valor: "11 al 13 de septiembre",
    nota: "Tres días, de viernes en la tarde a domingo en la noche",
  },
  {
    valor: "Bogotá y en línea",
    nota: "Hub presencial en Bogotá, sede por confirmar",
  },
  {
    valor: "USD 2.000 en premios",
    nota: "Cinco ganadores a nivel global, que Apart escoge entre todo el sprint",
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

/* Quién convoca el sprint y quién pone la plata del hub. Los logos viven en
   public/aisc/aliados/. */
const GRUPOS = [
  {
    rotulo: "Organizan el sprint",
    orgs: [
      {
        name: "Apart Research",
        body: "Laboratorio de investigación en seguridad de la IA. Convoca el sprint, define los cinco frentes, pone los premios y publica los reportes.",
        logo: "/aisc/aliados/apart.png",
        href: "https://apartresearch.com",
      },
      {
        name: "CeSIA",
        body: "Centro francés para la seguridad de la IA. Coorganiza el sprint y lleva a reguladores europeos el material que sale de él.",
        logo: "/aisc/aliados/cesia.svg",
        href: "https://www.securite-ia.fr",
      },
    ],
  },
  {
    rotulo: "Financian el hub en Bogotá",
    orgs: [
      {
        name: "Apart Research",
        body: "Además de convocar el sprint, apoya a los grupos que abren un hub presencial durante el fin de semana.",
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
        name: "Pathfinder Fellowship",
        body: "Beca de Kairos para quienes construyen comunidades de seguridad de la IA. Aporta mentoría y financiación para sus actividades.",
        logo: "/aisc/aliados/pathfinder.png",
        href: "https://pathfinder.kairos-project.org",
      },
    ],
  },
];

/* Lo que ponemos nosotros. Cada línea es una cosa que el sitio se compromete a
   dar; lo que aún no está cerrado se dice que no está cerrado. */
const HUB = [
  {
    titulo: "Alimentación y alojamiento",
    body: "Cubrimos las comidas de los tres días. Si vienes de otra ciudad, también cubrimos el alojamiento del fin de semana.",
  },
  {
    titulo: "Apoyo para cómputo",
    body: "Cubrimos parte del gasto de cómputo de los equipos. La cifra se confirma antes del cierre de aplicaciones.",
  },
  {
    titulo: "Mentoría en sala",
    body: "Gente que trabaja en respuesta a incidentes, en seguridad ofensiva y en regulación pasa por el hub durante el fin de semana.",
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
    body: "El hub tiene aforo, así que hay proceso de selección. Se aplica por el formulario y avisamos por correo.",
  },
];

/* Premios de Apart, tal como los publica su convocatoria. */
const PREMIOS = [
  { puesto: "Primer puesto", monto: "1.000" },
  { puesto: "Segundo puesto", monto: "500" },
  { puesto: "Tercer puesto", monto: "300" },
  { puesto: "Cuarto puesto", monto: "100" },
  { puesto: "Quinto puesto", monto: "100" },
];

/* Los mentores, al modo de SASH: retrato cuadrado, nombre, rol y una bio de
   dos o tres frases. Mientras no tengamos la foto de alguien se muestra la
   tarjeta con sus iniciales; el archivo va en public/aisc/mentores/. */
const MENTORES: {
  nombre: string;
  rol: string;
  foto?: string;
  linkedin?: string;
  bio?: React.ReactNode;
}[] = [
  {
    nombre: "Camila Beltrán",
    rol: "Mentora y ponente",
    foto: "/aisc/mentores/camila-beltran.png",
    linkedin:
      "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
    bio: (
      <>
        Asesora sénior de IA en{" "}
        <a
          className={ENLACE}
          href="https://www.mintic.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MinTIC
        </a>{" "}
        y experta de la{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/about/network-of-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          OCDE
        </a>
        . Como Winter Fellow de{" "}
        <a
          className={ENLACE}
          href="https://www.governance.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GovAI
        </a>
        , investigó la{" "}
        <a
          className={ENLACE}
          href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai"
          target="_blank"
          rel="noopener noreferrer"
        >
          regulación europea
        </a>{" "}
        de escenarios de pérdida de control, y lidera el grupo de AI Control de
        AIS Colombia.
      </>
    ),
  },
];

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

/* Cada perfil con el rótulo por el que alguien se reconoce de un vistazo. */
const PERFILES = [
  {
    rotulo: "Perfiles técnicos",
    body: "Ingeniería, ciencia de datos o seguridad informática: la contención y el análisis del incidente piden manos en el teclado durante los tres días.",
  },
  {
    rotulo: "Derecho, política pública y periodismo",
    body: "Los frentes de regulación y comunicación se ganan escribiendo bien y entendiendo el expediente, no programando.",
  },
  {
    rotulo: "Quien ya responde incidentes",
    body: "De banca a salud, la respuesta a incidentes ya es un oficio. Acá se trata de ver qué cambia cuando el que falló es un sistema de IA.",
  },
  {
    rotulo: "Quien llega al tema por primera vez",
    body: "No hace falta haber leído nada sobre seguridad de la IA. Se entra por lo que ya sabes hacer y lo que falte se pregunta en la sala. Buena parte de quienes hoy trabajan en el campo entraron por un fin de semana como este.",
  },
];

const FAQ = [
  {
    q: "¿Puedo aplicar si nunca he trabajado en seguridad de la IA?",
    a: "Sí, y es el caso de buena parte de quienes participan. Los proyectos que mejor salen suelen mezclar a alguien que conoce el campo con alguien que sabe hacer muy bien otra cosa: escribir, litigar, levantar infraestructura, leerse un expediente. Lo que sí pedimos es que puedas estar los tres días.",
  },
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
    a: "El sprint es el mismo y el entregable se sube al mismo sitio. Aplicar acá es para el hub presencial en Bogotá, que tiene cupo limitado y por eso tiene selección. En el hub cubrimos alimentación, alojamiento si vienes de otra ciudad, apoyo para cómputo y mentoría en sala. Participar en línea con Apart no tiene selección ni cupo.",
  },
  {
    q: "¿Cuánto tiempo toma la aplicación?",
    a: "Alrededor de veinte minutos. Leemos la postulación completa. La pregunta que más pesa es qué problema te gustaría abordar y con qué enfoque, y no esperamos una propuesta cerrada.",
  },
  {
    q: "¿Puedo aplicar si no vivo en Bogotá?",
    a: "Sí. En el formulario nos dices desde dónde vendrías y, si vienes de otra ciudad, cubrimos el alojamiento del fin de semana. El transporte hasta Bogotá corre por tu cuenta.",
  },
];

const SECCION = "bg-aisc-cream";
const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";
const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
/* El encabezado de dos columnas de SASH: el titular a la izquierda, todo el
   texto a la derecha en una medida corta. */
const ENCABEZADO =
  "mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6";
const COLUMNA = "flex min-w-0 flex-col gap-6";
const PROSA =
  "text-body md:text-body-lg flex max-w-[640px] flex-col gap-5 text-aisc-ink";
/* La tarjeta de contorno con la que SASH lista lo que recibe cada persona. */
const TARJETA =
  "flex min-h-[104px] flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-5 md:min-h-[114px] md:p-6";
const PATRON = "/aisc/patterns/aisc-wash-lattice.svg";

export default function Hackathon() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <HeroHackathon className={HERO_DERRAME_CLASS} />
        <div className={HERO_VELO_CLASS} aria-hidden="true" />
        <SiteHeader active="/hackathon" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[860px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              AI Incident Response Sprint
            </h1>
            <p className="text-body md:text-body-lg max-w-[680px] text-aisc-sand/90">
              Un fin de semana para convertir los primeros incidentes en los que
              un sistema de IA actuó por su cuenta contra un tercero en material
              que sirva a quien tiene que responder.
            </p>
            <p className="text-body-sm mt-1 w-fit text-aisc-sand/75">
              {CIERRE_TEXTO}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link className={CTA_LINK_PRIMARY} href="/hackathon/aplicar">
                Aplicar al hub en Bogotá
              </Link>
              <a
                className={CTA_LINK}
                href={APART_SPRINT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Participar en línea con Apart
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Las tres cifras duras, en tarjetas oscuras pegadas al hero. */}
      <section className={`${SECCION} pt-9 pb-10 md:pt-10 md:pb-12`}>
        <div className={`${CONTENEDOR} flex flex-col gap-12 md:gap-14`}>
          <dl className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
            {DATOS.map((d) => (
              <div
                className="flex min-h-[122px] flex-col justify-start rounded-[8px] bg-aisc-forest-deep px-5 py-5 text-aisc-sand md:min-h-[142px] md:px-7 md:py-7"
                key={d.valor}
              >
                <dt className="text-display-4 md:text-display-4-lg break-words">
                  {d.valor}
                </dt>
                <dd className="text-body-sm mt-3 text-aisc-sand">{d.nota}</dd>
              </div>
            ))}
          </dl>

          {/* De qué se trata */}
          <section id="que-es" className="flex flex-col gap-5">
            <div aria-hidden="true" className={HAIRLINE} />
            <div className="mt-5 flex flex-col gap-6">
              <h2 className="text-display-2 md:text-display-2-lg break-words">
                De qué se trata
              </h2>
              <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
                <p>
                  Ya hay casos documentados en los que un sistema de IA atacó
                  por su cuenta a un tercero. En julio de 2026, unos modelos que
                  estaban siendo evaluados se salieron de su entorno de pruebas
                  y encadenaron fallas hasta entrar a la infraestructura de
                  producción de Hugging Face. Lo contaron{" "}
                  <a
                    className={ENLACE}
                    href="https://openai.com/index/hugging-face-model-evaluation-security-incident/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenAI
                  </a>{" "}
                  y{" "}
                  <a
                    className={ENLACE}
                    href="https://huggingface.co/blog/security-incident-july-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hugging Face
                  </a>{" "}
                  cada uno por su lado. Ninguna ley los obligaba a hacerlo.
                </p>
                <p>
                  Cuando pasa algo así, casi nadie tiene a mano el
                  procedimiento: no está escrito cómo se contiene, ni cómo se
                  reconstruye qué falló, ni qué le puede exigir un regulador al
                  proveedor, ni cómo se cuenta el caso sin exagerar ni
                  minimizar.
                </p>
                <p>
                  El sprint existe para llenar ese vacío con piezas concretas.
                  Se trabaja en cinco frentes en paralelo durante tres días.
                  Cada equipo entrega algo que alguien más pueda usar: un
                  estándar, un banco de pruebas, un cuestionario para un
                  regulador, un ejercicio de mesa. Después del fin de semana
                  los califican jurados que no estuvieron en la sala. La
                  retroalimentación llega por escrito y el reporte queda
                  publicado con tu nombre. Apart Research y CeSIA convocan el
                  sprint en todo el mundo; nosotros abrimos el hub presencial en
                  Bogotá.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Los cinco frentes */}
      <section id="tracks" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Los cinco frentes
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                Cada equipo escoge uno. En el formulario nos dices cuál te
                llama, y eso nos sirve para saber qué perfiles habrá en la sala y
                para invitar a los mentores que hagan falta. Apart publica el
                detalle de cada frente en{" "}
                <a
                  className={ENLACE}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  la convocatoria del sprint
                </a>
                .
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {TRACKS.map((t, i) => (
              <li className="flex" key={t.id}>
                <article className="flex min-h-[180px] w-full flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 md:min-h-[200px] md:p-7">
                  <span
                    className="text-display-4 tabular-nums text-aisc-coral"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-display-4 md:text-display-4-lg text-balance">
                    {t.titulo}
                  </h3>
                  <p className="text-body-sm text-aisc-ink">{t.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* El hub en Bogotá */}
      <section id="bogota" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Qué encuentras en Bogotá
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Trabajar tres días seguidos es más fácil acompañado que solo
                  en la casa. Por eso abrimos una sala en Bogotá durante todo el
                  fin de semana.
                </p>
                <p>
                  La sede se confirma en los próximos días. La anunciamos por
                  correo a quienes queden seleccionados y por el{" "}
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
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Mentoría
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Durante el fin de semana pasa por la sala gente que trabaja en
                  los temas de los cinco frentes. Algunos abren con una charla
                  corta. Todos se sientan con los equipos a apoyar lo que
                  estén construyendo.
                </p>
                <p>
                  Si trabajas en respuesta a incidentes, en seguridad ofensiva,
                  en regulación o en comunicación de riesgos y te interesa dar
                  una charla o acompañar a un equipo, escríbenos a{" "}
                  <a
                    className={ENLACE}
                    href="mailto:contacto@aisafetycolombia.org"
                  >
                    contacto@aisafetycolombia.org
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
            {MENTORES.map((m) => (
              <li className="flex flex-col gap-3" key={m.nombre}>
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
                  {m.foto ? (
                    <img
                      alt={m.nombre}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center"
                      src={m.foto}
                    />
                  ) : (
                    <span
                      className="text-display-2 md:text-display-2-lg text-aisc-forest/45"
                      aria-hidden="true"
                    >
                      {iniciales(m.nombre)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-display-4 font-semibold text-aisc-forest">
                    {m.linkedin ? (
                      <a
                        className="underline decoration-aisc-forest/30 underline-offset-4 transition-colors hover:text-aisc-coral hover:decoration-aisc-coral"
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {m.nombre}
                      </a>
                    ) : (
                      m.nombre
                    )}
                  </span>
                  <span className="text-body-sm text-aisc-muted">{m.rol}</span>
                  {m.bio ? (
                    <p className="text-body-sm mt-2 text-aisc-ink">{m.bio}</p>
                  ) : null}
                </div>
              </li>
            ))}
            <li className="flex flex-col gap-3">
              <div className="flex aspect-square w-full items-center justify-center rounded-[8px] border border-dashed border-aisc-forest/40 p-4 text-center">
                <span className="text-body-sm text-aisc-muted">
                  Pronto anunciamos más nombres.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Quién puede aplicar: banda oscura, para que la página respire entre
          tanto papel crema y para que los cuatro perfiles no queden en viñetas. */}
      <section
        id="quien"
        className="relative overflow-hidden bg-aisc-forest-deep py-14 text-aisc-sand md:py-16"
      >
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
        <div className={`${CONTENEDOR} relative z-10`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Quién puede aplicar
            </h2>
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                No se pide experiencia previa en seguridad de la IA ni título en
                nada. Se pide que puedas estar los tres días y que llegues con
                una idea de qué te gustaría abordar.
              </p>
              <p className="text-body-sm text-aisc-sand/70">
                La aplicación toma alrededor de veinte minutos y no necesitas
                preparar nada de antemano.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 md:mt-14 lg:mt-16 lg:grid-cols-2">
            {PERFILES.map((p) => (
              <li
                className="flex flex-col gap-1.5 border-t border-aisc-sand/25 py-6"
                key={p.rotulo}
              >
                <h3 className="text-display-4 md:text-display-4-lg text-balance">
                  {p.rotulo}
                </h3>
                <p className="text-body-sm text-aisc-sand/75">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link className={CTA_LINK_PRIMARY} href="/hackathon/aplicar">
              Aplicar al hub en Bogotá
            </Link>
            <span className="text-body-sm text-aisc-sand/70">
              {CIERRE_TEXTO}
            </span>
          </div>
        </div>
      </section>

      {/* Premios */}
      <section id="premios" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Premios y qué pasa después
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Apart reparte USD 2.000 entre los cinco primeros puestos de
                  todo el sprint. Los jurados evalúan los proyectos la semana
                  siguiente y la calificación es ciega: no saben de dónde viene
                  cada equipo.
                </p>
                <p>
                  Más allá del premio, los equipos con mejores resultados entran
                  a la vía rápida de la beca de investigación de Apart y quedan
                  conectados con mentores del campo. Cada reporte se publica
                  completo y con los nombres de sus autores.
                </p>
              </div>
            </div>
          </div>
          {/* La escalera de premios: el primer puesto lleno, los otros cuatro de
              contorno, con la cifra como lo primero que se ve. */}
          <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
            {PREMIOS.map((p, i) => (
              <li className="flex" key={p.puesto}>
                <article
                  className={`flex min-h-[150px] w-full flex-col justify-between rounded-[8px] p-5 md:min-h-[172px] md:p-6 ${
                    i === 0
                      ? "bg-aisc-forest text-aisc-sand"
                      : "border border-aisc-forest/55 bg-aisc-cream text-aisc-ink"
                  }`}
                >
                  <span
                    className={`text-meta font-semibold tracking-widest uppercase ${
                      i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"
                    }`}
                  >
                    {p.puesto}
                  </span>
                  <span className="mt-6 flex flex-col">
                    <span
                      className={`text-meta ${i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"}`}
                    >
                      USD
                    </span>
                    <span
                      className={`text-display-2 md:text-display-2-lg tabular-nums ${
                        i === 0 ? "text-aisc-sand" : "text-aisc-forest"
                      }`}
                    >
                      {p.monto}
                    </span>
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quién convoca y quién financia */}
      <section id="organizan" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Quién está detrás
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                Apart Research y CeSIA convocan el sprint en todo el mundo.
                Nosotros abrimos el hub presencial en Bogotá, y son estas
                organizaciones las que lo hacen posible.
              </p>
            </div>
          </div>
          {GRUPOS.map((g) => (
            <div className="mt-12 flex flex-col gap-5 md:mt-14" key={g.rotulo}>
              <h3 className="text-kicker text-aisc-muted">{g.rotulo}</h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.orgs.map((o) => (
                  <li className="flex" key={o.name}>
                    <a
                      className="flex min-h-[190px] w-full flex-col justify-between gap-8 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand md:p-7"
                      href={o.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex h-[42px] items-center">
                        <img
                          alt={o.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-[38px] w-auto object-contain"
                          src={o.logo}
                        />
                      </span>
                      <span className="flex flex-col gap-2">
                        <span className="text-display-4 md:text-display-4-lg text-balance">
                          {o.name}
                        </span>
                        <span className="text-body-sm text-aisc-ink">
                          {o.body}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="mt-5 flex flex-col gap-8">
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Preguntas frecuentes
            </h2>
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
                    <p className="text-body-sm max-w-[860px] pb-5 text-aisc-muted">
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="h-px w-full flex-none bg-aisc-ink/20"
            />
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
              <span className="text-body-sm text-aisc-sand/70">
                {CIERRE_TEXTO}
              </span>
              <h2 className="text-display-2 md:text-display-2-lg text-balance">
                Aplica al hub en Bogotá
              </h2>
              <p className="text-body md:text-body-lg text-aisc-sand/85">
                Leemos la postulación completa. La pregunta que más pesa es
                qué problema te gustaría abordar y con qué enfoque. No buscamos
                una propuesta cerrada.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link className={CTA_LINK_PRIMARY} href="/hackathon/aplicar">
                  Aplicar
                </Link>
                <a
                  className={CTA_LINK}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
