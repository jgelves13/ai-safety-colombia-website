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
import { APART_SPRINT_URL, FECHAS, GRUPO_COMUNIDAD } from "../datos";
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

/* Guía para quien participa en línea.

   Es la misma guía del hub con todo lo presencial afuera: no lleva dirección,
   ni transporte, ni hospedaje, ni comida, ni qué traer, ni los teléfonos del
   equipo, ni el apoyo para cómputo, que es plata del hub de Bogotá y solo
   aplica a quien está en la casa. Lo que sí comparte (lecturas, charlas,
   frentes, reporte, premios, conducta) viene de ../guia-comun, para que una
   corrección no tenga que hacerse dos veces.

   La ruta es hermana y no hija de /sprint/guia a propósito: si fuera
   /sprint/guia/en-linea, quitar un pedazo de la URL llevaría derecho a la guía
   del hub, con la dirección de la casa y los números del equipo adentro.

   Del programa del hub solo entra lo que de verdad se puede seguir desde
   afuera: las charlas y las mentorías «En línea». Las de la sala no aparecen.

   Nada de rayas largas, tampoco en los comentarios. */
export const metadata: Metadata = {
  title: "Guía para participar en línea · AI Incident Response Sprint",
  robots: { index: false, follow: false },
};

/* Las charlas del hub y los bloques de mentoría que se pueden seguir desde
   fuera de la casa. La modalidad la manda el propio dato, así que el día que
   alguien pase de la sala a línea la tabla se entera sola. */
const EN_LINEA = (donde: string) => donde === "En línea";
const CHARLAS_HUB_EN_LINEA = CHARLAS_HUB.filter((c) => EN_LINEA(c.donde));
const MENTORIA_EN_LINEA = MENTORIA.filter((m) => EN_LINEA(m.donde));

/* La tabla que abre la guía. Es lo que alguien mira si no va a leer nada más. */
const CLAVE: Array<[string, React.ReactNode]> = [
  ["Fechas", FECHAS],
  [
    "Formato",
    "Completamente en línea. Las charlas, la coordinación y la entrega pasan por la página del sprint, el Discord de Apart y Zoom",
  ],
  ["Costo", "Participar es completamente gratuito"],
  [
    "Registro",
    <>
      Te registras tú mismo en{" "}
      <a
        className={ENLACE}
        href={APART_SPRINT_URL}
        rel="noreferrer"
        target="_blank"
      >
        la página del sprint de Apart
      </a>{" "}
      y entras al{" "}
      <a className={ENLACE} href={DISCORD} rel="noreferrer" target="_blank">
        Discord
      </a>
    </>,
  ],
  [
    "Antes del evento",
    <>
      Solo necesitas revisar{" "}
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
    "Recomendamos equipos de 3 a 5 personas. Puedes armar el tuyo en el grupo de WhatsApp de la comunidad o en los canales de Discord de Apart",
  ],
  [
    "Ritmo",
    "Trabajas a tu propio ritmo: no hay asistencia obligatoria y la única hora fija es la de la entrega",
  ],
  [
    "Idiomas",
    "Las charlas del hub son en español y las de Apart, en inglés. El reporte final va en inglés",
  ],
];

/* El índice de la columna. Solo lleva versión corta lo que de verdad no cabe en
   la columna: si el índice dice otra cosa que el título, uno pierde el hilo. */
const INDICE: ItemIndice[] = [
  { id: "clave", label: "Información clave" },
  { id: "participar", label: "Cómo participar en línea", corto: "Cómo entrar" },
  { id: "estudio", label: "Materiales de preparación" },
  { id: "por-frente", label: "Lecturas por frente", nivel: 3 },
  { id: "agenda", label: "Agenda del fin de semana", corto: "Agenda" },
  { id: "charlas", label: "Charlas de Apart", nivel: 3 },
  { id: "charlas-hub", label: "Charlas del hub", nivel: 3 },
  { id: "mentoria", label: "Mentoría", nivel: 3 },
  { id: "frentes", label: "Los cinco frentes" },
  { id: "equipos", label: "Equipos", nivel: 3 },
  { id: "entrega", label: "Cómo enviar tu proyecto" },
  { id: "reporte", label: "Estructura del reporte", nivel: 3 },
  { id: "rubrica", label: "Cómo se evalúa", nivel: 3 },
  { id: "premios", label: "Premios" },
  {
    id: "conducta",
    label: "Convivencia y código de conducta",
    corto: "Código de conducta",
  },
  { id: "contactos", label: "Contactos y enlaces" },
  { id: "faq", label: "Preguntas frecuentes" },
];

const FAQ: Array<[string, React.ReactNode]> = [
  [
    "¿Tengo que estar conectado los tres días?",
    "No. Trabajas al ritmo que te sirva y desde donde estés. Las charlas son opcionales, aunque las recomendamos, y el único plazo fijo es el de la entrega.",
  ],
  [
    "¿Qué pasa si no tengo equipo?",
    "No pasa nada. Puedes buscar compañeros en el grupo de WhatsApp de la comunidad, que es por donde se arma equipo con otra gente en Colombia, o en los canales de formación de equipos del Discord de Apart. También puedes entregar solo.",
  ],
  [
    "¿Las charlas son obligatorias?",
    "No, ninguna. Las de Apart son en línea y en inglés, y cada una tiene su propia inscripción. Las del hub son en español y las que se pueden seguir desde fuera están en la tabla de más arriba.",
  ],
  [
    "¿Hay créditos de cómputo?",
    <>
      No. Apart responde que <strong>no entrega créditos de cómputo</strong>, y
      el apoyo de hasta USD 50 por equipo que ofrece AI Safety Colombia es solo
      para los equipos que trabajan presencialmente en el hub de Bogotá.
    </>,
  ],
  [
    "¿Compito contra los hubs presenciales?",
    "Sí, y en igualdad de condiciones. Apart evalúa conjuntamente las entregas de todos los hubs y de quienes participan de manera remota, con la misma rúbrica. Los cinco premios son globales.",
  ],
  [
    "¿En qué idioma escribo el reporte?",
    <>
      El reporte final va en <strong>inglés</strong>, porque la plantilla, la
      plataforma y el jurado de Apart trabajan en ese idioma y tu proyecto se
      evalúa junto con trabajos de otros países. Si escribir directamente en
      inglés te hace trabajar más lento, puedes desarrollar primero las ideas en
      español y traducirlas al final.
    </>,
  ],
];

export default function GuiaEnLinea() {
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
              Guía para participar en línea
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              AI Incident Response Sprint, del viernes 11 al domingo 13 de
              septiembre, desde donde estés.
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · para quienes participan fuera del hub de
              Bogotá
            </p>
          </div>
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        <BodyMain className="pt-14 md:pt-16">
          <MarcoConIndice items={INDICE}>
            <div className="min-w-0">
              <p className={`${COL} ${P}`}>
                <strong>Qué bueno que te unas al sprint.</strong> Esta guía es
                para quien participa en línea: qué hay que hacer antes del
                viernes, qué pasa cada día, cómo armar equipo, qué charlas y qué
                mentorías puedes seguir desde donde estés, y cómo enviar el
                proyecto.
              </p>
              <Parrafo>
                El sprint es un evento en línea de Apart Research. Nosotros, el
                hub de Bogotá, somos una de las sedes presenciales, y además
                abrimos parte de nuestro programa para quien participa desde
                fuera: las charlas en español y varios bloques de mentoría.
              </Parrafo>
              <Parrafo>
                Te recomendamos guardar esta página, porque la iremos
                actualizando durante la semana.
              </Parrafo>
              <Parrafo>
                <strong>Grupo de WhatsApp de la comunidad:</strong>{" "}
                <a
                  className={ENLACE}
                  href={GRUPO_COMUNIDAD}
                  rel="noreferrer"
                  target="_blank"
                >
                  entrar al grupo
                </a>
                . Es por donde se arma equipo con otra gente en Colombia y por
                donde mandamos los enlaces de las sesiones.
              </Parrafo>

              <IndiceEnsayo items={INDICE} plegable />

              <H2 id="clave">Información clave</H2>
              <Tabla cabeceras={["Tema", "Detalle"]} filas={CLAVE} />

              <H2 id="participar">Cómo participar en línea</H2>
              <Parrafo>
                Son cuatro pasos y ninguno toma más de unos minutos.
              </Parrafo>
              <Lista
                items={[
                  <>
                    <strong>Regístrate en el sprint.</strong> El botón{" "}
                    <em>Sign Up</em> de{" "}
                    <a
                      className={ENLACE}
                      href={APART_SPRINT_URL}
                      rel="noreferrer"
                      target="_blank"
                    >
                      la página de Apart
                    </a>
                    . Es gratis y es el registro que te habilita para entregar.
                  </>,
                  <>
                    <strong>
                      Entra al{" "}
                      <a
                        className={ENLACE}
                        href={DISCORD}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Discord del sprint
                      </a>
                      .
                    </strong>{" "}
                    Ahí pasan las charlas, la mesa de ayuda y los canales para
                    formar equipo. Apart lo dice claro: todo el evento ocurre
                    por Discord y Zoom.
                  </>,
                  <>
                    <strong>
                      Entra al{" "}
                      <a
                        className={ENLACE}
                        href={GRUPO_COMUNIDAD}
                        rel="noreferrer"
                        target="_blank"
                      >
                        grupo de WhatsApp de la comunidad
                      </a>
                      .
                    </strong>{" "}
                    Es el canal en español: por ahí se arma equipo con otra
                    gente del país y por ahí mandamos los enlaces de las
                    sesiones del hub.
                  </>,
                  <>
                    <strong>Revisa las dos lecturas de preparación.</strong>{" "}
                    Alrededor de una hora en total y están{" "}
                    <a className={ENLACE} href="#estudio">
                      aquí mismo
                    </a>
                    .
                  </>,
                ]}
              />

              <Preparacion
                equipos={
                  <>
                    Los equipos se arman en el grupo de WhatsApp y en los
                    canales de Discord, y cada equipo escoge su frente.
                  </>
                }
              />

              <H2 id="agenda">Agenda del fin de semana</H2>
              <Parrafo>
                No hay una hora a la que tengas que estar conectado. Apart lo
                dice así: trabajas a tu propio ritmo, las charlas son opcionales
                y el único plazo fijo es el de la entrega, el{" "}
                <strong>{ENTREGA_LOCAL}</strong>.
              </Parrafo>
              <Parrafo>
                Aun así, el fin de semana rinde mucho más si te pones un horario
                y lo cumples con tu equipo. La forma más simple es tomar los
                bloques que ya están agendados, los de abajo, como puntos fijos
                del día y trabajar alrededor de ellos.
              </Parrafo>

              <H3 id="charlas">Charlas de Apart</H3>
              <Parrafo>
                Apart organizó nueve charlas en línea, en inglés, abiertas para
                todo el mundo. Abajo encuentras los horarios en hora de Bogotá.
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
                El hub de Bogotá organiza además sus propias charlas,{" "}
                <strong>en español</strong>, de unos 30 minutos cada una. Acá
                están las que se dan en línea, que son las que puedes seguir
                desde donde estés. Las que ese fin de semana ocurren solo en la
                sala no aparecen en esta tabla.
              </Parrafo>
              <Tabla
                ancho="min-w-[46rem]"
                cabeceras={["Cuándo", "Ponente", "Charla", "Enlace"]}
                filas={CHARLAS_HUB_EN_LINEA.map((c) => [
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
                      Inscribirse
                    </a>
                  ) : (
                    "—"
                  ),
                ])}
              />
              <Parrafo>
                Cada charla tiene su enlace de inscripción en la última
                columna, y ahí está toda la información de la sesión.
                <strong> Inscríbete en las que te interesen</strong> y mantente
                pendiente de la hora: conectarte a tiempo corre por tu cuenta.
              </Parrafo>

              <H3 id="mentoria">Mentoría</H3>
              <Parrafo>
                Varios mentores del hub atienden en línea, así que puedes
                aprovecharlos aunque no estés en Bogotá. Estos son sus bloques.
              </Parrafo>
              <Tabla
                ancho="min-w-[46rem]"
                cabeceras={["Cuándo", "Mentor", "Experiencia", "Enlace"]}
                filas={MENTORIA_EN_LINEA.map((m) => [
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
              <Tabla
                ancho="min-w-[46rem]"
                cabeceras={["Frente", "De qué trata", "Se juzga por"]}
                filas={FRENTES}
              />

              <H3 id="equipos">Equipos</H3>
              <Parrafo>
                Recomendamos trabajar en equipos de{" "}
                <strong>3 a 5 personas</strong>, aunque también puedes entregar
                solo. El máximo que recomienda Apart es de cinco integrantes.
              </Parrafo>
              <Parrafo>
                <strong>¿No tienes equipo? No pasa nada.</strong> Quien
                participa en línea arma equipo con otra gente que también está
                en línea, y para eso hay dos puertas: el{" "}
                <a
                  className={ENLACE}
                  href={GRUPO_COMUNIDAD}
                  rel="noreferrer"
                  target="_blank"
                >
                  grupo de WhatsApp de la comunidad
                </a>
                , que es donde se junta la gente en Colombia, y los canales de
                formación de equipos del{" "}
                <a
                  className={ENLACE}
                  href={DISCORD}
                  rel="noreferrer"
                  target="_blank"
                >
                  Discord de Apart
                </a>
                , donde está todo el mundo.
              </Parrafo>
              <Parrafo>
                Preséntate con dos líneas: qué sabes hacer y qué frente te
                llama. Es lo que más rápido hace que alguien te escriba.
              </Parrafo>

              <H2 id="entrega">Cómo enviar tu proyecto</H2>
              <Parrafo>
                La entrega final es un{" "}
                <strong>reporte tipo mini-paper en PDF</strong>, con la
                plantilla oficial de Apart y subido a la página del sprint. El
                registro de tu equipo en la plataforma lo hace tu propio equipo.
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
                las mismas para todos los frentes y para todos los hubs: se
                compite entre todas las entregas, sin importar desde dónde se
                trabajó. El frente entra por su criterio propio, la columna
                «Se juzga por» de la tabla de los cinco frentes.
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

              <H2 id="premios">Premios</H2>
              <Parrafo>
                Apart reparte <strong>USD 2.000</strong> entre cinco puestos,
                mirando conjuntamente los proyectos de todos los frentes, hubs y
                participantes remotos.{" "}
                <strong>Compites en igualdad de condiciones</strong> con quienes
                están en una sede presencial.
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

              <H2 id="conducta">Convivencia y código de conducta</H2>
              <Parrafo>
                Queremos que el sprint sea un espacio respetuoso, colaborativo y
                agradable para todas las personas, también en los canales en
                línea. Al participar aceptas el{" "}
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
              <Lista items={CONDUCTA_SI.slice(0, 3)} />
              <Parrafo>No están permitidos:</Parrafo>
              <Lista items={CONDUCTA_NO} />
              <Parrafo>
                Si alguna situación te incomoda, escríbenos por privado a{" "}
                <a className={ENLACE} href={`mailto:${CORREO}`}>
                  {CORREO}
                </a>{" "}
                o usa la mesa de ayuda del Discord de Apart. Revisamos cualquier
                situación con discreción y tomamos las medidas que sean
                necesarias para cuidar a las personas.
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
              <Parrafo>
                Para cualquier cosa del hub, el canal es{" "}
                <a
                  className={ENLACE}
                  href={GRUPO_COMUNIDAD}
                  rel="noreferrer"
                  target="_blank"
                >
                  el grupo de WhatsApp de la comunidad
                </a>
                . Si prefieres tratar algo en privado, escribe a{" "}
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
                      href={APART_SPRINT_URL}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Página del sprint de Apart Research
                    </a>
                    : registro, plantilla de entrega, <em>Guidelines</em> y{" "}
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
                    : charlas, formación de equipos, mentores y mesa de ayuda
                  </>,
                  <>
                    <a
                      className={ENLACE}
                      href={GRUPO_COMUNIDAD}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Grupo de WhatsApp de la comunidad
                    </a>
                    : equipos en Colombia y enlaces de las sesiones del hub
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
                  Nos vemos el viernes. ¡Qué bueno contar contigo!
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
