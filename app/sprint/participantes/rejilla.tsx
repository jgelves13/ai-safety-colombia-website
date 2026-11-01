"use client";

/* La rejilla de participantes, con el filtro por frente.

   Es lo unico de la pagina que necesita JavaScript: los botones de arriba dejan
   ver solo a quienes eligieron un frente, que es como se busca companero de
   equipo. Los datos viven aca y no en page.tsx porque el filtro los recorre en
   el navegador. Nada de rayas largas, tampoco en los comentarios. */

import { useState } from "react";

/* Los frentes son los de TRACKS_FORM, con la misma etiqueta que vio quien
   aplicó. El formulario ya avisaba que los demás participantes verían el
   nombre, en qué está trabajando y el frente.

   La etiqueta la pone la propuesta, no la casilla que marcó la persona: varias
   marcaron una cosa y escribieron otra, y el filtro solo sirve para armar equipo
   si agrupa a quienes de verdad van a trabajar en lo mismo. */
type Frente =
  "containment" | "analysis" | "regulatory" | "communication" | "open";

const FRENTES: Record<Frente, string> = {
  containment: "Estándares de contención",
  analysis: "Análisis del incidente",
  regulatory: "Respuesta regulatoria",
  communication: "Estrategia de comunicación",
  open: "Track abierto",
};

type Participante = {
  nombre: string;
  afiliacion?: string;
  frente?: Frente;
  linkedin?: string;
  problema?: string;
  foto?: string;
};

/* Orden alfabético, que es como se busca a alguien en una lista
   larga, pero con quienes no escribieron un problema al final: así las tarjetas
   completas quedan juntas y la rejilla no queda con huecos. */
const PARTICIPANTES: Participante[] = [
  {
    nombre: "Alejandro Ortiz Tique",
    afiliacion: "Aurora App",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/alortiztique/",
    problema:
      "Un flight recorder externo para agentes, que registre desde fuera sin que el agente pueda alterarlo, y comparar corridas con monitoreo visible e invisible para detectar si cambia de conducta cuando se sabe observado.",
  },
  {
    nombre: "Angie Paola Giraldo Ramírez",
    afiliacion: "Technovation",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/angiepgiraldo/",
    problema:
      "Una herramienta de triage inicial: recibe la descripción de un incidente y la estructura en sistema involucrado, comportamiento inesperado, impacto, urgencia y qué información falta.",
  },
  {
    nombre: "Brenda Catalina Barahona Pinilla",
    afiliacion: "Kushki",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/brenda-barahona",
    problema:
      "Los límites de los modelos bajo pruebas de estrés: metodologías de contención y de evaluación del comportamiento cuando se simulan interacciones difíciles con usuarios.",
  },
  {
    nombre: "Camilo Andres Cuello Romero",
    afiliacion: "Koral Advanced Technology",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/camilo-cuello/",
    problema:
      "Una herramienta para probar un entorno de contención antes de confiarle un agente: lanza pruebas adversariales de acceso a internet, credenciales, archivos de afuera y persistencia, y con eso califica qué tan seguro es.",
  },
  {
    nombre: "Carlos Andres Romero Orduz",
    afiliacion: "Controles Empresariales",
    frente: "containment",
    linkedin:
      "https://www.linkedin.com/in/carlos-andres-romero-orduz-799b6337b/",
    problema:
      "Por qué fallan los controles que ya existen. Estudiar el incidente por fases y armar una matriz corta de cinco o seis filas: qué control mínimo debería existir en cada una y cómo se comprueba que funciona.",
  },
  {
    nombre: "Carlos Santiago Sandoval Casallas",
    afiliacion: "Electronic Arts",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/csandovalc/",
    problema:
      "Una metodología forense que combine ingeniería inversa, análisis de trazas asistido por LLMs y grafos de conocimiento, para reconstruir incidentes y separar los hechos confirmados de lo que todavía no se puede verificar.",
  },
  {
    nombre: "David Fernando Adames Rondon",
    afiliacion: "Oval Consultoría",
    frente: "open",
    linkedin:
      "https://www.linkedin.com/in/david-fernando-adames-rondon-318963241/",
    problema:
      "Un experimento tipo Golden Gate Claude sobre Gemma: encontrar las características internas que se activan cuando el modelo genera código malicioso y apagarlas en tiempo de ejecución.",
  },
  {
    nombre: "David José Daza Jaimes",
    afiliacion: "Universidad Nacional",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/daviddaza2906",
    problema:
      "Un control de versiones pensado para agentes de IA, que haga sencillo ver sus registros e interpretarlos a gran escala.",
  },
  {
    nombre: "Elkin Rafael Cuello Romero",
    afiliacion: "Banco de Bogotá",
    frente: "analysis",
    linkedin:
      "https://www.linkedin.com/in/elkin-rafael-cuello-romero-551a551b6",
    problema:
      "Unir en una sola línea de tiempo lo que el agente razonó y lo que de verdad ejecutó en el servidor, para detectar incongruencias y explicar en minutos qué barrera de seguridad falló.",
  },
  {
    nombre: "Helen Stefany Penagos Galvis",
    afiliacion: "Mastercard",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/helen-stefany-penagos/",
    problema:
      "Señales tempranas de desviación: qué comportamientos aparecieron antes de la fuga y cómo reconocerlos en otras corridas a partir de los logs, las llamadas a herramientas y los cambios de estrategia.",
  },
  {
    nombre: "Ivan Dario Colmenares",
    afiliacion: "Independiente",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/ivan-dario-colmenares-25b635230/",
    problema:
      "Un proxy de contención entre la orquestación del agente y los endpoints: intercepta los payloads antes de que lleguen a la API de destino, deja registro de auditoría y corta la ejecución cuando la conducta se sale de la política.",
  },
  {
    nombre: "Jairo Torregrosa",
    afiliacion: "Mercado Libre",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/torregrosaj/",
    problema:
      "Monitoreo de activaciones en vez de alineación sobre la cadena de pensamiento, y medir cuánto se adelanta esa señal a la mala intención que aparece en el texto.",
  },
  {
    nombre: "Jhon David Bedoya Muñoz",
    afiliacion: "Universidad Externado",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/jhon-david-bedoya/",
    problema:
      "Detectar cuándo un agente empieza a actuar de forma anómala mirando su contexto, sus logs y su uso de herramientas, y alertar antes de que ejecute algo riesgoso.",
  },
  {
    nombre: "Jhonatan Alejandro Solano Mendoza",
    afiliacion: "Universidad Nacional",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/jhsolanom/",
    problema:
      "Separar qué hechos del incidente sostiene de verdad la evidencia pública, y armar una matriz de indicadores de riesgo con los puntos donde una alerta habría permitido intervenir.",
  },
  {
    nombre: "José Mauricio Saurith Escobar",
    afiliacion: "adidas",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/mauriciosaurith/",
    problema:
      "Una matriz de controles por fase del ataque: modelar el incidente como un grafo de estados y transiciones, y buscar el conjunto mínimo de controles que corta las rutas documentadas, midiendo efectividad y costo.",
  },
  {
    nombre: "Juan Camilo Melgarejo Gomez",
    afiliacion: "NTT DATA",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/juan-camilo-m-6634ab233",
    problema:
      "Estándares de contención para los laboratorios de IA: qué condiciones mínimas debería cumplir un desarrollo para considerarse seguro y alineado.",
  },
  {
    nombre: "Juan Esteban Espitia Leiva",
    afiliacion: "Bavaria",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/juanespitialeiva/",
    problema:
      "En qué momento un agente empieza a desviarse de la tarea: separar en las trayectorias los intentos normales de la persistencia tras un bloqueo, la exploración fuera de alcance y el intento de saltarse una restricción, y armar con eso un detector que alerte temprano.",
  },
  {
    nombre: "Luis Cardenas",
    afiliacion: "Creva y Finara",
    frente: "open",
    linkedin: "https://www.linkedin.com/in/luis-alejandro",
    problema:
      "Medir cuántas tareas forenses legítimas rechazan los modelos hospedados, y cuánta calidad se pierde al tener que bajarse a un modelo abierto autohospedado. Lo segundo casi nadie lo mide y es lo que le importa a quien responde el incidente.",
  },
  {
    nombre: "Maria Jose Beltran Losada",
    afiliacion: "Universidad Nacional",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/maría-josé-beltrán-losada-0003b73b4",
    problema:
      "Cortar a tiempo la ventana de contexto que mantuvo vivos a los agentes durante el ataque, y explorar arquitecturas más simples y desconectadas, con ruido estadístico en los datos, como defensa.",
  },
  {
    nombre: "Mariana Zuluaga Abril",
    afiliacion: "Independiente",
    frente: "regulatory",
    linkedin: "https://www.linkedin.com/in/mariana-zuluaga-abril-8a8113212/",
    problema:
      "Un cuestionario para empresas sobre transparencia, trazabilidad y manejo de trade-offs, convertido en una matriz que califique qué tan seguro es el sistema y señale qué fortalecer.",
  },
  {
    nombre: "Marlon Naranjo",
    afiliacion: "AgentOS",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/mnaranjo-ii",
    problema:
      "Un estándar mínimo de contención que equilibre flexibilidad y rigor, y que cualquier tercero pueda adoptarlo, verificarlo y contrastarlo.",
  },
  {
    nombre: "Maryury Alexandra Muñoz Burbano",
    afiliacion: "Universidad del Cauca",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/maryuryalexandra-mb",
    problema:
      "Una guía de condiciones mínimas para pruebas controladas: qué validar antes de empezar, cómo mantener el control y la visibilidad en manos de una persona, y cómo verificar si un agente está ocultando algo.",
  },
  {
    nombre: "Mateo Acosta Rojas",
    afiliacion: "Slalom",
    frente: "open",
    linkedin: "https://www.linkedin.com/in/mateo-acosta-rojas",
    problema:
      "Un sistema agéntico que evalúe propuestas de reducción de riesgo de IA con criterios explícitos, y que tenga en cuenta qué tan fiable puede ser un evaluador que también es un agente.",
  },
  {
    nombre: "Roberto Aguirre",
    afiliacion: "DigitalHubAssist",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/roberto-javier-aguirre-guardia/",
    problema:
      "Armar el gate humano mínimo que corte la cadena en un punto concreto, por ejemplo antes de usar credenciales de otro servicio o de salir a la red fuera de una lista blanca, con un squad de vigilancia que detecte el riesgo y lo dispare.",
  },
  {
    nombre: "Roger Palomeque",
    afiliacion: "US Army",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/roger-palomeque-a152b013",
    problema:
      "El desarrollo del sandbox, y cómo hacer un perfilamiento de la capacidad de un harness.",
  },
  {
    nombre: "Sadid Romero",
    afiliacion: "BASF",
    frente: "open",
    linkedin:
      "https://www.linkedin.com/in/sadid-alexis-romero-mahecha-2b28865b",
    problema:
      "Una batería de tareas normales de respuesta a incidentes, leer un registro de accesos o explicar un pedazo de código sospechoso, pasada por varios modelos para contar cuántas rechazan y cuánto se degrada el trabajo con el modelo de respaldo.",
  },
  {
    nombre: "Santiago Contreras Bustos",
    afiliacion: "Banco AV Villas",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/santiago-contreras-chillsanto",
    problema:
      "Un agente auditor independiente del sistema que vigila: revisa logs de red y alcance de credenciales en tiempo real, y activa un kill switch determinista cuando se violan los controles de contención.",
  },
  {
    nombre: "Sergio Montoya Ramirez",
    afiliacion: "Universidad de los Andes",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/sergio-montoya-ramirez-775199301",
    problema:
      "Reconstruir el incidente paso a paso, con atención al orden en que el agente aprovechó cada vulnerabilidad y a por qué prefirió unas estrategias sobre otras, para entender su modo de operar.",
  },
  {
    nombre: "Silvana Alvarez Basto",
    afiliacion: "Asociación Latina de Futuros",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/silvana-alvarez-basto/",
    problema:
      "Un análisis causal del incidente, o una propuesta de cómo comunicarlo al público para que quienes toman decisiones actúen.",
  },
  {
    nombre: "Tomas Antolinez",
    afiliacion: "Universidad de los Andes",
    frente: "regulatory",
    linkedin: "https://www.linkedin.com/in/tomas-antolinez-543719193",
    problema:
      "Diligenciar con fuentes públicas el formato europeo del artículo 55 y el portal de California bajo la SB 53, mostrar qué captura y qué se le escapa a cada uno, y proponer un articulado corto de notificación temprana.",
  },
  {
    nombre: "Valentina Rodríguez Niño",
    afiliacion: "Universidad Externado",
    frente: "containment",
    linkedin: "https://www.linkedin.com/in/valentina-rodriguez-nino",
    problema:
      "Qué evidencia basta para afirmar que un agente está contenido durante una evaluación: un protocolo mínimo de pruebas adversariales sobre validez de la tarea, persistencia del scaffold, acceso transitivo por servicios compartidos e integridad de los registros.",
  },
  {
    nombre: "Victor Alfonso Bedoya Mancera",
    afiliacion: "Universidad EAN",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/victorbedoya/",
    problema:
      "Qué pasa cuando una organización que ya tiene respuesta a incidentes suma un LLM interno y este entrega información que no debía: cómo se detecta que hubo incidente, qué evidencia se conserva y cómo se mide la severidad.",
  },
  {
    nombre: "Victor Gelves Cabrera",
    afiliacion: "Independiente",
    frente: "analysis",
    linkedin: "https://www.linkedin.com/in/manueloff14",
    problema:
      "Si la interpretabilidad puede mitigar la pérdida de control: recrear un incidente de forma controlada y analizar el comportamiento del modelo durante el proceso para entender sus decisiones.",
  },
  {
    nombre: "Alejandro Sánchez Poveda",
    afiliacion: "Universidad Nacional",
    linkedin: "https://www.linkedin.com/in/alejandrosanchezpoveda/",
  },
  {
    nombre: "Andres Felipe Mosquera Hernandez",
    afiliacion: "Universidad de los Andes",
    linkedin: "https://www.linkedin.com/in/andresmosqueraw/",
  },
  {
    nombre: "Angie Gutiérrez Trujillo",
    afiliacion: "Universidad de los Andes",
    linkedin:
      "https://www.linkedin.com/in/angie-camila-gutiérrez-trujillo-168bbb2b3",
  },
  {
    nombre: "Daniel Diab",
    afiliacion: "Universidad de los Andes",
    linkedin:
      "https://www.linkedin.com/in/daniel-felipe-diab-gonzalez-427523347",
  },
  {
    nombre: "Daniel Libardo Diaz González",
    afiliacion: "Universidad Nacional",
    linkedin: "https://www.linkedin.com/in/danidiaztech/",
  },
  {
    nombre: "David Santiago Ramos Moreno",
    afiliacion: "Universidad de los Andes",
    linkedin: "https://www.linkedin.com/in/david-ramosm",
  },
  {
    nombre: "Juan Diego Lozano Colmenares",
    afiliacion: "Independiente",
  },
  {
    nombre: "Juan Esteban Triviño Nieves",
    afiliacion: "Universidad de los Andes",
    linkedin: "https://www.linkedin.com/in/juanes-triviño-a45881252",
  },
  {
    nombre: "Michael Patiño",
    afiliacion: "Universidad de los Andes",
  },
  {
    nombre: "Sergio Alejandro Castaño Arcila",
    afiliacion: "Universidad de los Andes",
    linkedin: "https://www.linkedin.com/in/sergio-alejandro-castano-arcila/",
  },
  {
    nombre: "Sofia Rodriguez Chaparro",
    afiliacion: "Universidad de los Andes",
    linkedin: "https://www.linkedin.com/in/sofia-rodriguez-chaparro-222261262/",
  },
];

/* Cuantos van por frente. Sirve para ver de una donde hay gente de sobra y
   donde casi nadie, que es lo que uno quiere saber antes de armar equipo. */
const CONTEO = (Object.keys(FRENTES) as Frente[])
  .map((id) => ({
    id,
    label: FRENTES[id],
    total: PARTICIPANTES.filter((p) => p.frente === id).length,
  }))
  .filter((f) => f.total > 0)
  .sort((a, b) => b.total - a.total);

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

/* Un boton del filtro. El activo va relleno; los demas, con borde delgado. */
function Filtro({
  activo,
  etiqueta,
  total,
  onClick,
}: {
  activo: boolean;
  etiqueta: string;
  total?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={
        "text-body-sm flex items-center gap-2 rounded-full border px-4 py-2 transition-colors " +
        (activo
          ? "border-aisc-forest bg-aisc-forest text-aisc-sand"
          : "border-aisc-forest/20 text-aisc-forest hover:border-aisc-forest/60")
      }
    >
      {etiqueta}
      {total === undefined ? null : (
        <span className={activo ? "text-aisc-sand/60" : "text-aisc-muted"}>
          {total}
        </span>
      )}
    </button>
  );
}

export default function RejillaParticipantes() {
  const [frente, setFrente] = useState<Frente | "todos">("todos");
  const visibles =
    frente === "todos"
      ? PARTICIPANTES
      : PARTICIPANTES.filter((p) => p.frente === frente);

  return (
    <div>
      <div className="mt-10 flex flex-col gap-3 md:mt-12">
        <span className="text-kicker text-aisc-muted">Filtrar por frente</span>
        <div className="flex flex-wrap gap-2">
          <Filtro
            activo={frente === "todos"}
            etiqueta="Todos"
            onClick={() => setFrente("todos")}
          />
          {CONTEO.map((f) => (
            <Filtro
              key={f.id}
              activo={frente === f.id}
              etiqueta={f.label}
              total={f.total}
              onClick={() => setFrente(f.id)}
            />
          ))}
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
        {visibles.map((p) => (
          <li className="flex flex-col gap-3" key={p.nombre}>
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
              {p.foto ? (
                <img
                  alt={p.nombre}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                  src={p.foto}
                />
              ) : (
                <span
                  className="text-display-2 md:text-display-2-lg text-aisc-forest"
                  aria-hidden="true"
                >
                  {iniciales(p.nombre)}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              {p.frente ? (
                <span className="text-kicker mb-1 text-aisc-coral">
                  {FRENTES[p.frente]}
                </span>
              ) : null}
              <span className="text-display-4 font-semibold text-aisc-forest">
                {p.linkedin ? (
                  <a
                    className="underline decoration-aisc-forest/30 underline-offset-4 transition-colors hover:text-aisc-coral hover:decoration-aisc-coral"
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.nombre}
                  </a>
                ) : (
                  p.nombre
                )}
              </span>
              {p.afiliacion ? (
                <span className="text-body-sm text-aisc-muted">
                  {p.afiliacion}
                </span>
              ) : null}
              {p.problema ? (
                <p className="text-body-sm mt-2 text-aisc-ink">{p.problema}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
