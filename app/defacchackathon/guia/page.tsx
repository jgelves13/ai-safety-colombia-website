import type { Metadata } from "next";
import BodyMain from "@/components/body-main";
import { FondoBinario } from "@/components/defacc-page";
import IndiceEnsayo, { type ItemIndice } from "@/components/indice-ensayo";
import MarcoConIndice from "@/components/marco-con-indice";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";
import { ordenDelSorteo, ordenPublicado, todosLosRegistros, type Registro } from "@/lib/defacc-registro";
import {
  COL,
  CORREO,
  ENLACE,
  H2,
  H3,
  Lista,
  P,
  Parrafo,
  Tabla,
} from "../../sprint/guia-comun";

/* Guía para participantes seleccionados. Solo en español, fuera del índice de
   buscadores y sin enlaces desde el sitio: se comparte por correo. */
export const metadata: Metadata = {
  title: "Guía para participantes · Defensive Acceleration Hackathon",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ENTREGAR = "/defacchackathon/entregar";
const REGISTRO = "/defacchackathon/registro";

/* Lista de quienes confirmaron y aceptaron salir en ella. Mismo régimen que
   esta guía: noindex y enlazada solo desde aquí. */
const PARTICIPANTES = "/defacchackathon/participantes";

const CLAVE: Array<[string, React.ReactNode]> = [
  ["Fecha", "Sábado 14 de noviembre de 2026"],
  ["Horario", "8:00 a. m. a 8:00 p. m."],
  ["Lugar", "Universidad de los Andes, Bogotá"],
  ["Salón", "ML 607 todo el día. Pitches y cierre en el Auditorio ML C, de 5:00 a 8:00 p. m."],
  ["Equipos", "De 2 a 5 personas"],
  ["Registro del equipo", "Sábado de 10:00 a 11:00 a. m."],
  ["Entrega", "5:00 p. m. en punto, por la página de entregas"],
  ["Pitch", "3 minutos por equipo, desde las 5:10 p. m., en el orden del sorteo"],
  ["Premios", "COP 1.000.000, 500.000 y 500.000 a los tres primeros puestos"],
  ["Comida", "Snacks para el desayuno (hasta agotar existencias) y almuerzo incluidos"],
  ["Organizan", "IEEE Computer Society Uniandes y AI Safety Colombia"],
];

const AGENDA: Array<[string, React.ReactNode]> = [
  ["8:00 a. m.", "Registro e ingreso al campus."],
  ["8:30 a. m.", "Apertura, presentación del reto y formación de equipos."],
  ["9:00 a. m.", "Empieza el sprint. Tienen 8 horas de trabajo. Snacks para el desayuno, hasta agotar existencias."],
  ["10:00 a. m.", "Abre el registro de equipos: nombre, integrantes y frente. Toma un minuto."],
  ["11:00 a. m.", "Cierra el registro de equipos."],
  ["12:30 p. m.", "Almuerzo, aproximadamente."],
  ["2:00 p. m.", "Publicamos el orden de los pitches."],
  ["5:00 p. m.", "Cierre de entregas. En punto."],
  ["5:10 p. m.", "Pitches de todos los equipos en el Auditorio ML C, 3 minutos cada uno."],
  ["6:40 p. m.", "Deliberación del jurado."],
  ["7:15 p. m.", "Premiación."],
  ["7:30 p. m.", "Cierre. Salimos a más tardar a las 8:00 p. m."],
];

const CRITERIOS: Array<[string, React.ReactNode]> = [
  [
    "Impacto potencial e innovación",
    "¿Ataca un riesgo real de IA con una idea nueva? ¿Le da ventaja a quien defiende?",
  ],
  [
    "Calidad de ejecución",
    "¿Funciona y lo pusieron a prueba? ¿Los resultados respaldan lo que dicen? En el Track 5: ¿el estándar o el modelo de amenazas es técnico y accionable?",
  ],
  [
    "Presentación y claridad",
    "¿Un jurado entiende en 2 minutos qué hicieron y qué encontraron?",
  ],
];

const INDICE: ItemIndice[] = [
  { id: "clave", label: "Información clave" },
  { id: "cronograma", label: "Cronograma" },
  { id: "lugar", label: "Lugar y qué traer" },
  { id: "parqueaderos", label: "Parqueaderos", nivel: 3 },
  { id: "equipos", label: "Equipos" },
  { id: "oracle", label: "Oracle Academy", nivel: 3 },
  { id: "participantes", label: "Quiénes van", nivel: 3 },
  { id: "registro", label: "Registro del equipo", nivel: 3 },
  { id: "frentes", label: "Frentes temáticos" },
  { id: "entrega", label: "Cómo entregar" },
  { id: "calificacion", label: "Cómo se califica" },
  { id: "orden", label: "Orden de los pitches", nivel: 3 },
  { id: "reglas", label: "Reglas de uso responsable" },
  { id: "contacto", label: "Contacto y mentores" },
];

export default async function GuiaDefAcc() {
  let orden: Registro[] | null = null;
  try {
    if (ordenPublicado()) orden = ordenDelSorteo(await todosLosRegistros());
  } catch {
    orden = null;
  }

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div
          className={`${HERO_INNER} items-start gap-6 md:flex-row md:items-end md:justify-between`}
        >
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Guía para participantes
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              Defensive Acceleration Hackathon, sábado 14 de noviembre en la
              Universidad de los Andes.
            </p>
            <p className="text-meta text-aisc-sand/60">
              IEEE CS Uniandes × AI Safety Colombia · solo para participantes
              seleccionados
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aisc/hackathon/cyberbear-clean.png"
            alt="Oso de anteojos, mascota del hackatón"
            width={180}
            height={277}
            className="order-first h-32 w-auto shrink-0 object-contain drop-shadow-md md:order-none md:h-60"
          />
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        <BodyMain className="pt-14 md:pt-16">
          <MarcoConIndice items={INDICE}>
            <div className="min-w-0">
              <p className={`${COL} ${P}`}>
                <strong>Qué bueno tenerte en el hackatón.</strong> Aquí está lo
                que necesitas para el sábado: horarios, equipos, cómo entregar
                y cómo se califica.
              </p>
              <Parrafo>
                Guarda esta página. Si algo cambia antes del sábado, lo
                actualizamos aquí.
              </Parrafo>

              <IndiceEnsayo items={INDICE} plegable />

              <H2 id="clave">Información clave</H2>
              <Tabla cabeceras={["Tema", "Detalle"]} filas={CLAVE} />

              <H2 id="cronograma">Cronograma</H2>
              <Tabla cabeceras={["Hora", "Qué pasa"]} filas={AGENDA} />
              <Parrafo>
                La entrega cierra a las 5:00 p. m. en punto. No damos tiempo
                extra.
              </Parrafo>

              <H2 id="lugar">Lugar y qué traer</H2>
              <Parrafo>
                <strong>Salón:</strong> ML 607, en el edificio Mario Laserna
                (ML). Está disponible todo el día y ahí trabajamos durante el
                sprint.
              </Parrafo>
              <Parrafo>
                <strong>Pitches y cierre:</strong> Auditorio ML C, de 5:00 a
                8:00 p. m. Al cerrar la entrega pasamos todos al auditorio.
              </Parrafo>
              <Parrafo>
                El registro de portería te llega por correo antes del evento.
              </Parrafo>
              <Lista
                items={[
                  "Computador portátil y cargador.",
                  "Documento de identidad original. Lo piden en la portería de Uniandes.",
                  "Termo para agua.",
                ]}
              />
              <Parrafo>
                Ponemos el almuerzo y snacks para el desayuno. Los snacks del
                desayuno se reparten a las 9:00 a. m., hasta agotar existencias,
                así que si tienes mucha hambre, mejor desayuna antes de salir.
              </Parrafo>

              <H3 id="parqueaderos">Parqueaderos</H3>
              <Parrafo>
                <strong>Ojo:</strong> los parqueaderos de la universidad cierran
                el sábado a las 6:00 p. m. y los pitches van hasta las 8:00 p.
                m. Si vienes en carro o moto, revisa estas opciones antes.
              </Parrafo>
              <Tabla
                cabeceras={["Parqueadero", "Lo que sabemos"]}
                filas={[
                  [
                    "Uniandes: edificio Santo Domingo (SD), Calle 22 # 1-19, y edificio Q, Carrera 1 # 18A-12",
                    <>
                      Sábado de 7:00 a. m. a 6:00 p. m. Carro $100 por minuto o
                      tarifa plena $21.000. Moto $70 por minuto o plena $11.500.
                      Bicicleta gratis. Solo para quien tenga carné activo de
                      Uniandes, según disponibilidad. Pagas en efectivo o
                      tarjeta en el piso 1 del SD o en la máquina del sótano.
                    </>,
                  ],
                  [
                    "Uniandes: edificios ML, AU y Q (mensualidades)",
                    "Solo para profesores y personal administrativo con mensualidad. No están abiertos al público.",
                  ],
                  [
                    "Quick Parking: Av. Calle 20 con Av. Carrera 1 (cerca a Monserrate) y Carrera 3 # 19-81",
                    "Privado. No publica horario ni tarifa general en su web. Confirma antes al 300 347 2662 (también WhatsApp).",
                  ],
                  [
                    "Parqueadero del edificio CityU: Calle 19 # 2A-10, Las Aguas",
                    "Público, de pago. El operador indica acceso 24/7 y cobro por minuto. No publica la tarifa.",
                  ],
                ]}
              />
              <Parrafo>
                En 2026 un parqueadero en Bogotá puede cobrar como máximo $230
                por minuto a un carro y $161 a una moto ($253 y $177 si tiene
                Sello Oro). Puede cobrar menos.
              </Parrafo>
              <Parrafo>
                Lo más fácil es llegar en transporte público: la estación Las
                Aguas de TransMilenio, sobre el Eje Ambiental, queda a pocas
                cuadras.
              </Parrafo>

              <H2 id="equipos">Equipos</H2>
              <Parrafo>
                Los equipos son de <strong>2 a 5 personas</strong>.
              </Parrafo>
              <Parrafo>
                Si llegas sin equipo, no hay problema. A las 8:30 a. m. hacemos
                una dinámica para armarlos, y nadie se queda solo.
              </Parrafo>

              <H3 id="oracle">Oracle Academy</H3>
              <Parrafo>
                Las herramientas de Oracle Academy solo se activan con un
                correo @uniandes.edu.co. Si tu equipo las quiere usar, necesita
                a alguien de Uniandes.
              </Parrafo>
              <Parrafo>
                Si no tienen a nadie, avísanos al armar equipos y les ayudamos
                a encontrarlo.
              </Parrafo>

              <H3 id="participantes">Quiénes van</H3>
              <Parrafo>
                Ya está la{" "}
                <a
                  className={ENLACE}
                  href={PARTICIPANTES}
                  rel="noreferrer"
                  target="_blank"
                >
                  lista de participantes
                </a>
                , con quién viene, de dónde viene, en qué problema le gustaría
                trabajar y a qué frente corresponde. Puedes filtrar por frente
                para encontrar a quienes piensan parecido. Solo aparecen quienes
                confirmaron y aceptaron salir en ella, y se va llenando a medida
                que más gente confirma.
              </Parrafo>

              <H3 id="registro">Registro del equipo</H3>
              <Parrafo>
                Cuando tengan equipo, registren el nombre, los integrantes y el
                frente en{" "}
                <a className={ENLACE} href={REGISTRO}>
                  aisafetycolombia.org/defacchackathon/registro
                </a>
                . Toma un minuto y basta con que lo haga una persona por equipo.
              </Parrafo>
              <Parrafo>
                <strong>El registro abre a las 10:00 a. m. y cierra a las 11:00 a. m. en punto.</strong>{" "}
                Con esa lista sorteamos el orden de los pitches y lo publicamos a
                las 2:00 p. m. Al registrarse les llega un correo con un enlace
                a la página de entregas, con sus datos ya puestos.
              </Parrafo>

              <H2 id="frentes">Frentes temáticos</H2>
              <Parrafo>
                Cada equipo escoge uno de estos seis frentes:
              </Parrafo>
              <Lista items={Object.values(NOMBRES_TRACKS)} />
              <Parrafo>
                El Track 5 no exige programar. El detalle de cada frente está en{" "}
                <a className={ENLACE} href="/defacchackathon">
                  la página del evento
                </a>
                .
              </Parrafo>

              <H2 id="entrega">Cómo entregar</H2>
              <Parrafo>
                Se entrega en{" "}
                <a className={ENLACE} href={ENTREGAR}>
                  aisafetycolombia.org/defacchackathon/entregar
                </a>
                . La página abre el sábado a las 7:00 a. m. y cierra a las 5:00
                p. m. en punto.
              </Parrafo>
              <Parrafo>Cada equipo envía una sola entrega con:</Parrafo>
              <Lista
                items={[
                  "Nombre del equipo.",
                  "Integrantes, de 2 a 5, con el correo con el que se postularon.",
                  "Título y frente temático.",
                  "Un resumen de 150 a 250 palabras.",
                  "El enlace al repositorio (GitHub o Colab) o a la demo. En el Track 5 basta la ficha técnica: pongan el enlace a la ficha en Drive.",
                  "La ficha técnica en PDF, de máximo 2 páginas y 10 MB: amenaza, defensa, cómo la evaluaron, resultados, límites y riesgo de uso dual.",
                ]}
              />
              <Parrafo>
                Si les sirve, hay una{" "}
                <a className={ENLACE} href="/defacc/plantilla-ficha-tecnica.pdf" target="_blank" rel="noopener noreferrer">
                  plantilla sugerida para la ficha técnica
                </a>
                . Es opcional: pueden usar el formato que quieran, siempre que
                quepa en 2 páginas y cubra esos puntos.
              </Parrafo>
              <Parrafo>
                <strong>A las 5:00 p. m. se cierra la entrega</strong> y el
                jurado empieza a calificar. Lo que no esté enviado a esa hora no
                cuenta.
              </Parrafo>
              <Parrafo>
                <strong>Solo se envía una vez.</strong> Revisen todo antes de
                enviar. Si necesitan corregir algo, escríbannos a{" "}
                <a className={ENLACE} href={`mailto:${CORREO}`}>
                  {CORREO}
                </a>{" "}
                antes de las 5:00 p. m.
              </Parrafo>
              <Parrafo>
                Nuestro consejo: envíen hacia las 4:00 p. m. y dejen ese margen
                por si algo falla.
              </Parrafo>

              <H2 id="calificacion">Cómo se califica</H2>
              <Parrafo>
                Desde las 5:10 p. m. cada equipo presenta un pitch de{" "}
                <strong>3 minutos</strong>, en el orden del sorteo. Después, el
                jurado puede hacer unas pocas preguntas cortas.
              </Parrafo>
              <Parrafo>
                <strong>No tienen que preparar diapositivas.</strong> Presentan
                su ficha técnica de 2 páginas, que proyectamos en pantalla. Los
                jurados la leen y califican mientras presentan.
              </Parrafo>
              <Parrafo>
                Hay tres criterios. Cada uno va de 1 a 5, y los tres pesan lo
                mismo. El máximo es 15.
              </Parrafo>
              <Tabla cabeceras={["Criterio", "Qué mira el jurado"]} filas={CRITERIOS} />
              <Parrafo>
                Un 3 es trabajo sólido para un día. Un 5 es excepcional.
              </Parrafo>
              <Parrafo>
                En empate gana el proyecto con más puntaje en Impacto. Los tres
                primeros puestos se anuncian a las 7:15 p. m.
              </Parrafo>

              <H3 id="orden">Orden de los pitches</H3>
              {orden && orden.length > 0 ? (
                <ol className={`${COL} ${P} list-decimal pl-6`}>
                  {orden.map((r) => (
                    <li key={r.slug} className="mt-1">
                      <strong>{r.equipo}</strong> · {NOMBRES_TRACKS[r.track] ?? r.track}
                    </li>
                  ))}
                </ol>
              ) : (
                <Parrafo>
                  Lo publicamos a las 2:00 p. m., aquí y en el grupo de WhatsApp.
                </Parrafo>
              )}

              <H2 id="reglas">Reglas de uso responsable</H2>
              <Lista
                items={[
                  "No ataques, escanees ni pruebes sistemas reales de terceros sin permiso escrito. Es delito (Ley 1273 de 2009). Trabaja con benchmarks, laboratorios o datos sintéticos.",
                  "No publiques exploits funcionales ni malware. Si encuentras una vulnerabilidad real, repórtala en privado y déjala fuera de la entrega.",
                  "Usa datos públicos anonimizados o sintéticos. Nada de voces, rostros ni correos de personas reales.",
                  "Cita todo el código, los datos y lo que generaste con IA.",
                  "Un proyecto que sobre todo facilita ataques, sin mitigación, no puede ganar premio.",
                ]}
              />

              <H2 id="contacto">Contacto y mentores</H2>
              <Parrafo>
                <strong>Contactos del día:</strong> Jose Gelves (AI Safety
                Colombia) y Daniel Diab (IEEE Computer Society Uniandes). Nos
                encuentras en el ML 607 durante toda la jornada.
              </Parrafo>
              <Parrafo>
                <strong>Mentores:</strong> Jairo Torregrosa (Mercado Libre),
                Robert Gómez (AIMEDIC) y Pablo Pastrana (Dapper). Pasan por el
                salón durante el sprint, sin horario fijo. Cuando estén,
                acércate y pregúntales por tu proyecto.
              </Parrafo>
              <Parrafo>
                Antes del sábado puedes escribirnos a{" "}
                <a className={ENLACE} href={`mailto:${CORREO}`}>
                  {CORREO}
                </a>
                .
              </Parrafo>
              <Parrafo>
                <strong>Nos vemos el sábado a las 8:00 a. m.</strong>
              </Parrafo>
            </div>
          </MarcoConIndice>
        </BodyMain>
      </article>
      <SiteFooter />
    </main>
  );
}
