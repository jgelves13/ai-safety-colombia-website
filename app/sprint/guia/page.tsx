import type { Metadata } from "next";
import BodyMain from "@/components/body-main";
import IndiceEnsayo, { type ItemIndice } from "@/components/indice-ensayo";
import MarcoConIndice from "@/components/marco-con-indice";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  HERO_CORNER_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { APART_SPRINT_URL, FECHAS, GRUPO_WHATSAPP, SEDE } from "../datos";
import {
  CHARLAS,
  CHARLAS_HUB,
  COL,
  CODIGO_APART,
  CONDUCTA_NO,
  CONDUCTA_SI,
  CORREO,
  DISCORD,
  ENLACE,
  ENTREGA_AOE,
  ENTREGA_LOCAL,
  FILA,
  FRENTES,
  H2,
  H3,
  Lista,
  MENTORIA,
  P,
  PAGINA_HUB,
  PREMIOS,
  Parrafo,
  Preparacion,
  REPORTE,
  RUBRICA,
  SOPORTE_APART,
  Tabla,
} from "../guia-comun";

/* Guía para participantes del sprint de septiembre.

   Estructura: la guía de junio que vivía en Notion. Redacción: la versión que
   escribió Jose el 9 de septiembre, que es la que manda. Tono de anfitrión: la
   restricción se dice una vez y en positivo, lo que ponemos nosotros no se
   enuncia como carencia del participante, y la alternativa se ofrece como
   cortesía. Nada de rayas largas, tampoco en los comentarios.

   Maqueta: la del ensayo /seguridad-de-la-ia. Índice pegajoso a la izquierda en
   pantalla ancha, cuerpo a la derecha. Títulos en display-3 y display-4: son
   veinte secciones y a tamaño de portada se comen la página.

   Solo en español y sin enlazar desde ningún lado. Se manda por correo y por el
   grupo de WhatsApp del sprint, así que igual que /sprint/confirmar no entra en
   la tabla de PAGINAS de lib/idiomas.ts y va con noindex. Puede llevar la
   dirección exacta precisamente porque solo la ve quien quedó seleccionado. */
export const metadata: Metadata = {
  title: "Guía para participantes · AI Incident Response Sprint",
  robots: { index: false, follow: false },
};

/* La dirección va enlazada a Maps: es una casa en una calle con numeración
   confusa y varios llegan en taxi o en app. */
const MAPA =
  "https://www.google.com/maps/search/?api=1&query=Calle+98+%23+11B-48%2C+Bogot%C3%A1";

/* La jornada real del sábado y del domingo. Es la duda que más preguntan. */
const JORNADA = "de 8:00 a. m. a 8:00 p. m. aproximadamente";

/* La lista de quienes asisten, publicada el miércoles 9 con el mismo régimen
   que esta guía: en español, noindex y sin enlazar desde ningún otro lado. */
const PARTICIPANTES = "/sprint/participantes";

/* La tabla que abre la guía. Es lo que alguien mira si no va a leer nada más. */
const CLAVE: Array<[string, React.ReactNode]> = [
  ["Fechas", FECHAS],
  [
    "Llegada",
    "Viernes 11, 5:00 p. m. Si se te complica llegar a esa hora, avísanos por el grupo y coordinamos contigo",
  ],
  [
    "Lugar",
    <>
      <a className={ENLACE} href={MAPA} rel="noreferrer" target="_blank">
        {SEDE}
      </a>
      , barrio El Chicó. La casa no tiene parqueadero propio
    </>,
  ],
  [
    "Horario",
    <>
      Viernes, de 5:00 a 9:00 p. m. aproximadamente. Sábado y domingo, {JORNADA}
      . <strong>Esperamos contar contigo durante toda la jornada</strong>
    </>,
  ],
  ["Formato", "Presencial en el hub, con algunas charlas en línea de Apart"],
  [
    "Antes del evento",
    <>
      Nosotros nos encargamos del registro en la plataforma de Apart. Antes del
      evento solo necesitas revisar{" "}
      <a className={ENLACE} href="#estudio">
        las dos lecturas de preparación
      </a>
      , que toman alrededor de una hora
    </>,
  ],
  [
    "Entrega del proyecto",
    <>
      {ENTREGA_AOE}, o sea las <strong>6:59 a. m. del lunes 14</strong> en
      Colombia
    </>,
  ],
  [
    "Equipos",
    "Recomendamos equipos de 3 a 5 personas. Los formamos el viernes, así que no necesitas llegar con uno",
  ],
  ["Costo", "Participar es completamente gratuito"],
  [
    "Comida",
    "Cubrimos las tres comidas del día. La comida será vegana y procuramos que haya opciones ricas y completas",
  ],
  [
    "Hospedaje",
    "Cubrimos tres noches para quienes vienen de otra ciudad. El transporte hasta Bogotá corre por cuenta de cada participante",
  ],
];

const TRANSPORTE: Array<[string, string]> = [
  [
    "TransMilenio",
    "La estación más cercana es Calle 100, sobre la Autopista Norte.",
  ],
  [
    "SITP o bus",
    "Puedes usar las rutas que suben por la Carrera 11 o la Avenida 9 y bajarte cerca de la Calle 98.",
  ],
  [
    "Carro o app",
    "Usa como destino Calle 98 # 11B-48, El Chicó. Uber y DiDi llegan sin problema. La casa no tiene parqueadero propio, así que si vienes en carro tendrás que usar un parqueadero del sector o estacionar donde esté permitido.",
  ],
];

const DIAS: Array<[string, string]> = [
  [
    "Viernes 11",
    "De 5:00 a 9:00 p. m. aproximadamente. Llegada, registro y apertura del hub. Presentamos el incidente y los cinco frentes, formamos los equipos y cada uno empieza a definir su proyecto.",
  ],
  [
    "Sábado 12",
    `Jornada completa, ${JORNADA}. Trabajo en equipos, mentoría y un punto de control en la tarde para revisar avances.`,
  ],
  [
    "Domingo 13",
    `Jornada completa, ${JORNADA}. Últimos bloques de trabajo, cierre del reporte, presentaciones breves entre equipos y preparación del envío a Apart.`,
  ],
];

/* «573028405507» se lee «302 840 5507»: el indicativo hace falta en el enlace,
   para que abra desde cualquier país, y sobra al leerlo. El número ya no se
   imprime en la celda, pero sigue a la vista en el «title» del enlace para quien
   quiera agendar el contacto. */
function comoSeLee(wa: string) {
  const n = wa.slice(2);
  return `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
}

/* El equipo del hub, con los cuatro roles ya definidos por Jose. El WhatsApp va
   en la tabla y no en un párrafo porque durante el fin de semana es lo que la
   gente busca de afán. El número se guarda completo, con indicativo, para que el
   enlace abra el chat sin tener que agendar el contacto; en pantalla no se
   imprime, porque lo que se hace con él es escribir, no marcarlo. */
const EQUIPO: Array<{ quien: string; wa: string; que: React.ReactNode }> = [
  { quien: "Jose", wa: "573028405507", que: "Coordinación general del hub." },
  { quien: "Deiver", wa: "573202051309", que: "Coordinación de logística." },
  {
    quien: "Luna",
    wa: "573208399479",
    que: (
      <>
        Convivencia y bienestar.{" "}
        <strong>
          Si algo te incomoda o necesitas apoyo, puedes hablar con ella.
        </strong>
      </>
    ),
  },
  { quien: "Sofía", wa: "573133707976", que: "Coordinación de voluntarios." },
];

const FAQ: Array<[string, React.ReactNode]> = [
  [
    "¿A qué horas tengo que estar en la casa?",
    <>
      El viernes te esperamos desde las <strong>5:00 p. m.</strong> El sábado y
      el domingo estaremos trabajando {JORNADA}. La idea es que puedas
      acompañarnos durante toda la jornada, porque buena parte del proyecto se
      construye presencialmente con tu equipo y los mentores. Si en algún
      momento necesitas salir, no hay problema: coordínalo con tu equipo para
      que puedan organizarse.
    </>,
  ],
  [
    "¿Hay parqueadero?",
    "La casa no tiene parqueadero propio. Si vienes en carro, puedes utilizar alguno de los parqueaderos del sector o estacionar en la calle donde esté permitido.",
  ],
  [
    "¿Puedo pedir comida que no sea vegana?",
    "La comida que cubre el hub será vegana y procuramos que sea rica, completa y variada. Si quieres traer algo adicional o pedir comida por tu cuenta, puedes hacerlo con toda tranquilidad. Y si tienes una alergia o una restricción médica, escríbenos por privado antes del miércoles para buscar contigo una buena opción.",
  ],
  [
    "¿Qué pasa si llego sin equipo?",
    "No pasa nada. Después de presentar los frentes el viernes tendremos un espacio para formar los equipos. Puedes llegar solo o sola; justamente una de las ideas del sprint es que conozcas personas con intereses complementarios.",
  ],
  [
    "¿Hay créditos de cómputo o GPUs?",
    <>
      Podemos reembolsar hasta <strong>USD 50 por equipo</strong> contra
      recibos. No tendremos GPUs físicamente en la casa, así que si tu proyecto
      requiere cómputo, puedes utilizar este apoyo para servicios externos.
    </>,
  ],
  [
    "¿Las charlas son obligatorias?",
    "No. Las charlas de Apart son opcionales, en línea y en inglés. Además, varias ocurren antes de que abra la sede. Cada una tiene su propia inscripción, así que puedes elegir las que más te interesen.",
  ],
  [
    "¿Compito contra los otros hubs?",
    "Sí. Apart evalúa conjuntamente las entregas de todos los hubs y de quienes participan de manera remota. Los cinco premios son globales.",
  ],
  [
    "¿En qué idioma escribo el reporte?",
    <>
      El reporte final va en <strong>inglés</strong>, porque la plantilla, la
      plataforma y el jurado de Apart trabajan en ese idioma y tu proyecto se
      evalúa junto con trabajos de otros países. Si escribir directamente en
      inglés te hace trabajar más lento, puedes desarrollar primero las ideas en
      español y traducirlas al final. Los mentores también pueden ayudarte a
      revisar ese proceso.
    </>,
  ],
];

/* El indice de la columna. Solo lleva version corta lo que de verdad no cabe en
   la columna: si el indice dice otra cosa que el titulo, uno pierde el hilo. */
const INDICE: ItemIndice[] = [
  { id: "clave", label: "Información clave" },
  { id: "estudio", label: "Materiales de preparación" },
  { id: "por-frente", label: "Lecturas por frente", nivel: 3 },
  { id: "lugar", label: "Lugar y cómo llegar" },
  { id: "hospedaje", label: "Hospedaje", nivel: 3 },
  { id: "cronograma", label: "Cronograma" },
  { id: "charlas", label: "Charlas de Apart", nivel: 3 },
  { id: "charlas-hub", label: "Charlas del hub", nivel: 3 },
  { id: "mentoria", label: "Mentoría", nivel: 3 },
  { id: "frentes", label: "Los cinco frentes" },
  { id: "equipos", label: "Equipos", nivel: 3 },
  { id: "participantes", label: "Quiénes van", nivel: 3 },
  { id: "entrega", label: "Cómo enviar tu proyecto" },
  { id: "reporte", label: "Estructura del reporte", nivel: 3 },
  { id: "rubrica", label: "Cómo se evalúa", nivel: 3 },
  { id: "premios", label: "Premios y cómputo" },
  { id: "llevar", label: "Qué traer" },
  {
    id: "sala",
    label: "Comida, salud y emergencias",
    corto: "Comida y salud",
  },
  {
    id: "conducta",
    label: "Convivencia y código de conducta",
    corto: "Código de conducta",
  },
  { id: "contactos", label: "Contactos y enlaces" },
  { id: "faq", label: "Preguntas frecuentes" },
];

export default function Guia() {
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
        <SiteHeader active="/sprint" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Guía para participantes
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              AI Incident Response Sprint, del viernes 11 al domingo 13 de
              septiembre en el hub de Bogotá.
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · solo para participantes seleccionados
            </p>
          </div>
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        <BodyMain className="pt-14 md:pt-16">
          <MarcoConIndice items={INDICE}>
            <div className="min-w-0">
              <p className={`${COL} ${P}`}>
                <strong>Qué bueno tenerte en el sprint.</strong> En esta guía
                encuentras todo lo que necesitas para el fin de semana: dónde
                estaremos, cómo llegar, la agenda, cómo funciona el trabajo en
                equipos, cómo enviar tu proyecto y a quién acudir si necesitas
                algo.
              </p>
              <Parrafo>
                Te recomendamos guardar esta página, porque la iremos
                actualizando. Si hay algún cambio importante, te avisamos
                también por correo y por el grupo de WhatsApp del hub.
              </Parrafo>
              <Parrafo>
                Antes del viernes solo te pedimos revisar{" "}
                <a className={ENLACE} href="#estudio">
                  las dos lecturas de preparación
                </a>
                : toman alrededor de una hora en total y están aquí mismo,
                después de la información clave.
              </Parrafo>
              <Parrafo>
                La dirección exacta está más abajo y no está publicada en el
                sitio general. Te agradecemos no compartirla por fuera del grupo
                de participantes.
              </Parrafo>
              <Parrafo>
                <strong>Grupo de WhatsApp del hub:</strong>{" "}
                <a
                  className={ENLACE}
                  href={GRUPO_WHATSAPP}
                  rel="noreferrer"
                  target="_blank"
                >
                  entrar al grupo
                </a>
                .
              </Parrafo>

              <IndiceEnsayo items={INDICE} plegable />

              <H2 id="clave">Información clave</H2>
              <Tabla cabeceras={["Tema", "Detalle"]} filas={CLAVE} />

              <Preparacion
                equipos={
                  <>
                    Los equipos se forman el viernes a las 5:00 p. m. y cada
                    equipo escoge su frente.
                  </>
                }
              />

              <H2 id="lugar">Lugar y cómo llegar</H2>
              <Parrafo>
                <strong>Dirección:</strong>{" "}
                <a
                  className={ENLACE}
                  href={MAPA}
                  rel="noreferrer"
                  target="_blank"
                >
                  {SEDE}
                </a>
                , barrio El Chicó.
              </Parrafo>
              <Parrafo>
                Estaremos en una casa, no en un auditorio. Si al llegar tienes
                alguna dificultad para encontrar la entrada, escríbenos por el
                grupo y alguien del equipo te ayuda. La contraseña del wifi te
                la compartimos al llegar.
              </Parrafo>
              <Tabla cabeceras={["Medio", "Cómo llegar"]} filas={TRANSPORTE} />

              <H3 id="hospedaje">Hospedaje</H3>
              <Parrafo>
                Si vienes de fuera de Bogotá,{" "}
                <strong>el hub cubre tus tres noches de hospedaje</strong>. Ya
                tenemos identificado quién lo necesita según la información de
                la confirmación, y te enviamos los detalles antes del viernes.
                El transporte hasta Bogotá sí corre por tu cuenta.
              </Parrafo>
              <Parrafo>
                También nos quedan{" "}
                <strong>un par de habitaciones disponibles</strong>. Si vives
                lejos de la sede y quedarte cerca haría mucho más fácil tu
                participación durante el fin de semana, escríbele por privado a
                cualquiera del equipo organizador y miramos si todavía podemos
                ofrecerte una.
              </Parrafo>
              <Parrafo>
                Si tus planes cambiaron, por ejemplo si ya no puedes venir o si
                ahora sí necesitas hospedaje, avísanos antes del miércoles para
                que podamos reorganizarnos.
              </Parrafo>

              <H2 id="cronograma">Cronograma</H2>
              <Parrafo>
                El viernes empezamos a las <strong>5:00 p. m.</strong> y
                terminamos alrededor de las <strong>9:00 p. m.</strong> El
                sábado y el domingo trabajamos aproximadamente de{" "}
                <strong>8:00 a. m. a 8:00 p. m.</strong>
              </Parrafo>
              <Parrafo>
                Te pedimos contar con la jornada completa del sábado y el
                domingo, porque buena parte del trabajo ocurre en equipo y junto
                a los mentores.
              </Parrafo>
              <Parrafo>
                En todos los casos el horario programado va{" "}
                <strong>hasta la cena</strong>. Después nos quedamos un rato
                más, con juegos de mesa y tiempo para conversar sin afán.
              </Parrafo>
              <Parrafo>
                <strong>
                  Las horas exactas de cada bloque las confirmamos el miércoles
                </strong>{" "}
                y las compartimos también por el grupo.
              </Parrafo>
              <Tabla cabeceras={["Día", "Qué pasa"]} filas={DIAS} />

              <H3 id="charlas">Charlas de Apart</H3>
              <Parrafo>
                Apart organizó nueve charlas en línea, en inglés, abiertas para
                todos los hubs. Abajo encuentras los horarios en hora de Bogotá.
              </Parrafo>
              <Parrafo>
                Varias ocurren antes de que abramos la sede el viernes a las
                5:00 p. m., así que puedes conectarte desde donde estés. La de
                Marko Grobelnik cae el domingo en plena jornada de trabajo.
              </Parrafo>
              <Parrafo>
                <strong>
                  Las charlas son opcionales y cada una tiene su propia
                  inscripción.
                </strong>{" "}
                Puedes inscribirte en las que más te interesen.
              </Parrafo>
              <Tabla
                ancho="min-w-[46rem]"
                cabeceras={[
                  "Cuándo (Bogotá)",
                  "Ponente",
                  "Tema",
                  "Inscripción",
                ]}
                filas={CHARLAS.map((c) => [
                  c.cuando,
                  <>
                    <a
                      className={ENLACE}
                      href={c.perfil}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {c.quien}
                    </a>
                    <span className="text-body-sm mt-0.5 block font-normal text-aisc-ink/70">
                      {c.donde}
                    </span>
                  </>,
                  `«${c.tema ?? `HackTalk: ${c.quien}`}»`,
                  <a
                    className={ENLACE}
                    href={c.rsvp}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Inscribirse
                  </a>,
                ])}
              />

              <H3 id="charlas-hub">Charlas del hub</H3>
              <Parrafo>
                Además de las sesiones de Apart, el hub organiza sus propias
                charlas, <strong>en español</strong>, de unos 30 minutos cada
                una. Todas se siguen desde la sede: quien está en Bogotá la da
                en la sala y quien no, se conecta y la proyectamos ahí mismo.
                Debajo de cada nombre dice cuál es el caso. Si quieres seguir
                una de las que son en línea por tu cuenta, el enlace está en
                la última columna.
              </Parrafo>
              <Tabla
                ancho="min-w-[46rem]"
                cabeceras={["Cuándo", "Ponente", "Charla", "Enlace"]}
                filas={CHARLAS_HUB.map((c) => [
                  c.cuando,
                  <>
                    {c.linkedin ? (
                      <a
                        className={ENLACE}
                        href={c.linkedin}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {c.quien}
                      </a>
                    ) : (
                      c.quien
                    )}
                    <span className="text-body-sm mt-0.5 block font-normal text-aisc-ink/70">
                      {c.donde}
                    </span>
                  </>,
                  <>
                    {c.enlace ? (
                      <a
                        className={ENLACE}
                        href={c.enlace}
                        rel="noreferrer"
                        target="_blank"
                      >
                        «{c.tema}»
                      </a>
                    ) : c.tema === "Por confirmar" ? (
                      "Por confirmar"
                    ) : (
                      `«${c.tema}»`
                    )}
                  </>,
                  c.luma ? (
                    <a
                      className={ENLACE}
                      href={c.luma}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Conectarse en línea
                    </a>
                  ) : (
                    "—"
                  ),
                ])}
              />

              <H3 id="mentoria">Mentoría</H3>
              <Parrafo>
                Durante el fin de semana tienes varios espacios para conversar
                con mentores, aterrizar tus ideas y recibir comentarios sobre el
                proyecto. Algunos están presencialmente en la casa y otros se
                conectan de forma remota.
              </Parrafo>
              <Tabla
                ancho="min-w-[46rem]"
                cabeceras={["Cuándo", "Mentor", "Experiencia", "Enlace"]}
                filas={MENTORIA.map((m) => [
                  <>
                    {m.cuando.map(([dia, hora]) => (
                      <span className="mt-1 block first:mt-0" key={dia}>
                        {dia}:{" "}
                        <span className="font-normal text-aisc-ink/75">
                          {hora}
                        </span>
                      </span>
                    ))}
                  </>,
                  <>
                    {m.linkedin ? (
                      <a
                        className={ENLACE}
                        href={m.linkedin}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {m.quien}
                      </a>
                    ) : (
                      m.quien
                    )}
                    <span className="text-body-sm mt-0.5 block font-normal text-aisc-ink/70">
                      {m.donde}
                    </span>
                  </>,
                  m.experiencia,
                  m.meet ? (
                    <a
                      className={ENLACE}
                      href={m.meet}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Entrar al Meet
                    </a>
                  ) : (
                    "—"
                  ),
                ])}
              />
              <Parrafo>
                Además, no tienes que esperar a un bloque formal si necesitas
                ayuda: escribe en el grupo qué necesita tu equipo y te ayudamos
                a encontrar al mentor más adecuado.
              </Parrafo>
              <Parrafo>
                También puedes acudir a la red internacional de mentores del
                sprint en el{" "}
                <a
                  className={ENLACE}
                  href={DISCORD}
                  rel="noreferrer"
                  target="_blank"
                >
                  Discord de Apart
                </a>
                , sobre todo para preguntas que se salgan de las áreas de los
                mentores del hub.
              </Parrafo>

              <H2 id="frentes">Los cinco frentes</H2>
              <Parrafo>
                El sprint parte de un incidente concreto: en julio, agentes de
                OpenAI terminaron interactuando con infraestructura de
                producción de Hugging Face.
              </Parrafo>
              <Parrafo>
                A partir de ese caso puedes trabajar en cualquiera de los cinco
                frentes. <strong>Todos tienen el mismo peso</strong> y no hay
                una lista cerrada de retos: cada equipo formula su propia
                pregunta o proyecto.
              </Parrafo>
              <Parrafo>
                El viernes presentamos cada frente con más detalle, y los
                mentores pueden ayudarte a ajustar el alcance para que sea
                ambicioso pero realizable durante el fin de semana.
              </Parrafo>
              <Tabla
                ancho="min-w-[46rem]"
                cabeceras={["Frente", "De qué trata", "Se juzga por"]}
                filas={FRENTES}
              />

              <H3 id="equipos">Equipos</H3>
              <Parrafo>
                Recomendamos trabajar en equipos de{" "}
                <strong>3 a 5 personas</strong>, aunque también puedes
                participar individualmente. El máximo es de cinco integrantes.
              </Parrafo>
              <Parrafo>
                <strong>¿Llegas sin equipo? No pasa nada.</strong> El viernes,
                después de presentar el incidente y los frentes, tenemos un
                espacio específico para formar los equipos.
              </Parrafo>

              <H3 id="participantes">Quiénes van</H3>
              <Parrafo>
                Ya está lista la{" "}
                <a
                  className={ENLACE}
                  href={PARTICIPANTES}
                  rel="noreferrer"
                  target="_blank"
                >
                  lista de participantes
                </a>
                , con quién viene, a qué se dedica, en qué problema le gustaría
                trabajar y a qué frente corresponde su propuesta. Arriba de la
                lista puedes filtrar por frente y encontrar fácilmente a quienes
                tienen intereses similares.
              </Parrafo>
              <Parrafo>
                Te recomendamos echarle un vistazo con calma y llegar con
                algunas personas en mente con quienes te interesaría conversar o
                trabajar. Eso hace mucho más fácil la formación de equipos el
                viernes.
              </Parrafo>
              <Parrafo>
                Ese frente corresponde a la propuesta con la que cada persona
                aplicó, pero no es definitivo: el viernes puedes sumarte a otro
                si encuentras una idea que te interese más.
              </Parrafo>

              <H2 id="entrega">Cómo enviar tu proyecto</H2>
              <Parrafo>
                La entrega final es un{" "}
                <strong>reporte tipo mini-paper en PDF</strong>, con la
                plantilla oficial de Apart y subido a la página del sprint. Del
                registro de tu equipo en la plataforma nos encargamos nosotros.
              </Parrafo>
              <Parrafo>
                No necesitas programar para participar. Los proyectos de
                regulación, comunicación u otros frentes pueden entregar
                análisis, marcos, propuestas o herramientas sin código.
              </Parrafo>
              <Parrafo>
                El reporte puede tener un máximo de <strong>8 páginas</strong>,
                sin contar referencias ni apéndices. Como referencia, muchos
                buenos proyectos quedan entre 4 y 8 páginas.
              </Parrafo>
              <Lista
                items={[
                  "El artefacto del proyecto, por ejemplo un banco de pruebas, un detector, una matriz de control, un instrumento regulatorio o un kit de simulacro, puede ir en un repositorio enlazado o como apéndice.",
                  "Un repositorio público y un video de 3 a 5 minutos son opcionales.",
                  <>
                    Debes incluir una sección de{" "}
                    <strong>limitaciones y consideraciones de doble uso</strong>
                    : qué no demuestra tu trabajo, qué riesgos tiene y de qué
                    maneras podría utilizarse indebidamente.
                  </>,
                  "Antes del envío, ten a la mano los nombres, correos y usuarios de Discord de todo el equipo, además del título, el resumen y el PDF.",
                ]}
              />

              <H3>El plazo</H3>
              <Parrafo>
                <strong>El envío cierra el {ENTREGA_LOCAL}.</strong>
              </Parrafo>
              <Parrafo>
                Apart lo anuncia como «{ENTREGA_AOE}». AoE (
                <em>Anywhere on Earth</em>) es la zona horaria más permisiva,
                así que en Colombia el plazo termina el lunes temprano.
              </Parrafo>
              <Parrafo>
                Aun así, te recomendamos subir una primera versión el domingo en
                la tarde, incluso si todavía estás haciendo ajustes. Puedes
                reemplazarla mientras el plazo siga abierto, y así reduces el
                riesgo de quedarte sin entregar por un problema de último
                minuto.
              </Parrafo>

              <H3 id="reporte">Estructura sugerida del reporte</H3>
              <Tabla cabeceras={["Sección", "Qué va ahí"]} filas={REPORTE} />

              <H3 id="rubrica">Cómo se evalúa</H3>
              <Parrafo>
                El jurado puntúa cada proyecto de 1 a 5 en tres dimensiones,
                las mismas para todos los frentes. El frente entra por su
                criterio propio, la columna «Se juzga por» de la tabla de los
                cinco frentes.
              </Parrafo>
              <Tabla
                ancho="min-w-[54rem]"
                cabeceras={["Dimensión", "Qué mide", "Un 3", "Un 5"]}
                filas={RUBRICA}
              />
              <Parrafo>
                Los requisitos completos y la plantilla están en la pestaña{" "}
                <em>Guidelines</em> de{" "}
                <a
                  className={ENLACE}
                  href={APART_SPRINT_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  la página del sprint
                </a>
                .
              </Parrafo>
              <Parrafo>
                <strong>Todas las entregas reciben comentarios escritos</strong>
                , no solo los proyectos ganadores.
              </Parrafo>

              <H2 id="premios">Premios y apoyo para cómputo</H2>
              <Parrafo>
                Apart reparte <strong>USD 2.000</strong> entre cinco puestos,
                mirando conjuntamente los proyectos de todos los frentes, hubs y
                participantes remotos.
              </Parrafo>
              <Parrafo>
                El jurado evalúa los proyectos durante la semana siguiente al
                evento y los resultados se anuncian unas semanas después. Cada
                equipo nomina a una persona para recibir el premio, que después
                lo reparte internamente.
              </Parrafo>
              <Tabla
                ancho="min-w-[24rem]"
                cabeceras={["Puesto", "Premio"]}
                filas={PREMIOS}
              />

              <H3>Apoyo para cómputo</H3>
              <Parrafo>
                Si tu proyecto necesita usar APIs o GPU, el hub puede cubrir
                hasta <strong>USD 50 por equipo</strong>.
              </Parrafo>
              <Parrafo>
                El procedimiento es sencillo: el equipo hace el pago, conserva
                los recibos y nosotros hacemos el reembolso una vez el
                entregable esté subido a Apart.
              </Parrafo>

              <H3>Oportunidades después del sprint</H3>
              <Parrafo>
                Algunos proyectos podrán seguir desarrollándose después del fin
                de semana:
              </Parrafo>
              <Lista
                items={[
                  "Los equipos más fuertes reciben una invitación para postular a la beca de investigación de Apart, que dura entre tres y seis meses e incluye mentoría y apoyo para publicar.",
                  "CeSIA comparte el mejor trabajo del frente regulatorio con sus contactos en la Oficina de IA de la Unión Europea, dando crédito al equipo.",
                  "Los trabajos que puedan hacerse públicos se publican con licencia abierta y en un mismo lugar, para que puedan consultarse y citarse después del sprint.",
                ]}
              />

              <H2 id="llevar">Qué traer</H2>
              <Lista
                items={[
                  <>
                    <strong>Computador portátil y cargador.</strong> Cada
                    persona trabaja en su propio equipo. Nosotros ponemos
                    algunas multitomas.
                  </>,
                  <>
                    <strong>Audífonos.</strong> Puede haber bastante gente
                    trabajando al mismo tiempo. Si los tienes puestos,
                    entendemos que estás concentrado o que necesitas un rato
                    tranquilo.
                  </>,
                  <>
                    <strong>Documento de identidad y botella de agua.</strong>
                  </>,
                  <>
                    <strong>Cuaderno y esfero</strong>, si te sirven para
                    trabajar.
                  </>,
                  <>
                    <strong>Tu medicación personal</strong>, si la necesitas.
                  </>,
                  <>
                    Si te quedas en el hospedaje que cubre el hub,{" "}
                    <strong>lo que necesites para las tres noches</strong>.
                  </>,
                ]}
              />

              <H2 id="sala">Comida, salud y emergencias</H2>

              <H3>Comida</H3>
              <Parrafo>
                Cubrimos <strong>las tres comidas del día</strong> y el menú
                será vegano. Procuramos que haya opciones completas y ricas para
                que durante el sprint no tengas que preocuparte por conseguir
                comida. Tenemos agua y café disponibles durante el día.
              </Parrafo>
              <Parrafo>
                Por supuesto, si quieres traer algo adicional o pedir comida por
                tu cuenta, puedes hacerlo sin problema.
              </Parrafo>
              <Parrafo>
                Si tienes una alergia o alguna restricción médica relacionada
                con la alimentación,{" "}
                <strong>escríbenos por privado antes del miércoles</strong> y
                revisamos contigo cómo acomodarla.
              </Parrafo>

              <H3>Emergencias médicas</H3>
              <Parrafo>
                Ante una emergencia, llama de inmediato al <strong>123</strong>,
                la línea única de emergencias de Bogotá, y avisa también a
                alguien del equipo organizador. Tenemos un botiquín en la casa
                y, si hace falta, te acompañamos al centro médico más adecuado
                según la situación.
              </Parrafo>

              <H3>Si algo te incomoda</H3>
              <Parrafo>
                Queremos que todas las personas se sientan cómodas y respetadas
                durante el sprint. Si en algún momento te sientes abrumado,
                necesitas apoyo o alguna interacción con otra persona te
                incomoda, puedes hablar con <strong>Luna</strong>, que está
                pendiente de convivencia y bienestar.
              </Parrafo>
              <Parrafo>
                También puedes escribirle directamente a Jose por WhatsApp o a{" "}
                <a className={ENLACE} href={`mailto:${CORREO}`}>
                  {CORREO}
                </a>
                . Cualquier situación que nos compartas se maneja con la
                discreción y confidencialidad que necesites.
              </Parrafo>

              <H3>El espacio de trabajo</H3>
              <Parrafo>
                Tenemos mesas, sillas, wifi y algunos tableros para que los
                equipos puedan trabajar y dibujar ideas. Los enchufes pueden
                llenarse rápido, así que si tienes una multitoma y te queda
                fácil traerla, será bienvenida.
              </Parrafo>

              <H2 id="conducta">Convivencia y código de conducta</H2>
              <Parrafo>
                Queremos que el hub sea un espacio respetuoso, colaborativo y
                agradable para todas las personas. Al participar aceptas el{" "}
                <a
                  className={ENLACE}
                  href={CODIGO_APART}
                  rel="noreferrer"
                  target="_blank"
                >
                  código de conducta de Apart Research
                </a>{" "}
                y algunos acuerdos básicos de convivencia:
              </Parrafo>
              <Lista items={CONDUCTA_SI} />
              <Parrafo>No están permitidos:</Parrafo>
              <Lista items={CONDUCTA_NO} />
              <Parrafo>
                Si alguna situación te incomoda, puedes hablar con Luna o con
                cualquier integrante del equipo organizador. Si te sientes
                cómodo haciéndolo, también puedes hablar directamente con la
                otra persona, pero no es necesario que lo hagas antes de acudir
                al equipo.
              </Parrafo>
              <Parrafo>
                Revisamos cualquier situación con discreción y tomamos las
                medidas que sean necesarias para cuidar a las personas y al
                espacio, incluida la posibilidad de pedirle a alguien que se
                retire del evento.
              </Parrafo>
              <Parrafo>
                Y recuerda que{" "}
                <strong>
                  el sprint está pensado para combinar perfiles distintos
                </strong>
                . Muchas de las personas que participan no vienen de machine
                learning, y justamente esa diversidad de perspectivas es parte
                del valor del evento.
              </Parrafo>

              <H2 id="contactos">Contactos y enlaces</H2>

              <H3>El equipo del hub</H3>
              <Tabla
                cabeceras={["Quién", "Qué hace", "WhatsApp"]}
                filas={EQUIPO.map((p) => [
                  p.quien,
                  p.que,
                  <a
                    className={`${ENLACE} whitespace-nowrap`}
                    href={`https://wa.me/${p.wa}`}
                    rel="noreferrer"
                    target="_blank"
                    title={`Escribirle a ${p.quien} por WhatsApp (${comoSeLee(
                      p.wa,
                    )})`}
                  >
                    Escribirle
                  </a>,
                ])}
              />
              <Parrafo>
                Para cualquier asunto del fin de semana, el canal principal es{" "}
                <a
                  className={ENLACE}
                  href={GRUPO_WHATSAPP}
                  rel="noreferrer"
                  target="_blank"
                >
                  el grupo de WhatsApp
                </a>
                . Si prefieres tratar algo en privado, escribe al WhatsApp de
                quien corresponda o a{" "}
                <a className={ENLACE} href={`mailto:${CORREO}`}>
                  {CORREO}
                </a>
                .
              </Parrafo>
              <Parrafo>
                Para preguntas sobre la entrega, la plantilla o la plataforma de
                Apart, puedes escribir a{" "}
                <a className={ENLACE} href={`mailto:${SOPORTE_APART}`}>
                  {SOPORTE_APART}
                </a>{" "}
                o usar la mesa de ayuda de su{" "}
                <a
                  className={ENLACE}
                  href={DISCORD}
                  rel="noreferrer"
                  target="_blank"
                >
                  Discord
                </a>
                .
              </Parrafo>

              <H3>Enlaces útiles</H3>
              <Lista
                items={[
                  <>
                    <a
                      className={ENLACE}
                      href={GRUPO_WHATSAPP}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Grupo de WhatsApp del hub
                    </a>
                  </>,
                  <>
                    <a
                      className={ENLACE}
                      href={APART_SPRINT_URL}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Página del sprint de Apart Research
                    </a>
                    : plantilla de entrega, <em>Guidelines</em> y{" "}
                    <em>Resources</em>
                  </>,
                  <>
                    <a
                      className={ENLACE}
                      href={DISCORD}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Discord del sprint
                    </a>
                    : charlas, mentores y mesa de ayuda
                  </>,
                  <>
                    <a className={ENLACE} href={PAGINA_HUB}>
                      Página del hub en AI Safety Colombia
                    </a>
                    : mentores y ponentes
                  </>,
                  <>
                    <a
                      className={ENLACE}
                      href={CODIGO_APART}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Código de conducta
                    </a>
                  </>,
                ]}
              />

              <H2 id="faq">Preguntas frecuentes</H2>
              <dl className={`${COL} mt-6 border-b border-aisc-ink/12`}>
                {FAQ.map(([pregunta, respuesta]) => (
                  <div className={`${FILA} py-6`} key={pregunta}>
                    <dt className="text-body font-semibold text-aisc-ink">
                      {pregunta}
                    </dt>
                    <dd className="text-body mt-2 text-aisc-ink">
                      {respuesta}
                    </dd>
                  </div>
                ))}
              </dl>
              <Parrafo>
                <strong>¿Te quedó alguna pregunta que no aparece acá?</strong>{" "}
                Escríbela en el grupo. Si vemos que también le sirve a otras
                personas, la añadimos a esta guía.
              </Parrafo>
              <Parrafo>
                <strong>
                  Nos vemos el viernes a las 5:00 p. m. ¡Qué bueno contar
                  contigo!
                </strong>
              </Parrafo>
            </div>
          </MarcoConIndice>
        </BodyMain>
      </article>
      <SiteFooter />
    </main>
  );
}
