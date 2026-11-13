import { esFrente, type Participante } from "./datos";

/* Arma la lista de participantes desde Supabase. Entran quienes confirmaron que
   vienen y aceptaron salir en la lista (defacc_confirmations con attending y
   listed). El frente sale de su aplicación más reciente. Afiliación y problema
   se escriben a mano en AJUSTES: el texto crudo de la aplicación no se muestra.
   Al cliente solo llegan nombre, afiliación, frente y problema: nunca el correo. */

type Confirmacion = { name: string | null; email: string | null };
type Aplicacion = { email: string | null; preferred_track: string | null };

type Ajuste = { afiliacion?: string; problema?: string; sinFrente?: boolean };

const AJUSTES: Record<string, Ajuste> = {
  "adrian alejandro espinosa zambrano": {
    afiliacion: "Netdata",
    problema:
      "Un auditor sencillo que revise las descripciones de herramientas MCP antes de que el agente las vea, para detectar órdenes ocultas que lo lleven a leer secretos, alterar argumentos o enviar datos a terceros.",
  },
  "adriana durand": {
    afiliacion: "Derecho",
    problema:
      "El riesgo que aparece cuando un agente acumula demasiados permisos y autorizaciones.",
  },
  "adriana la rotta": {
    afiliacion: "Bet365",
    problema:
      "Un monitor independiente que revise las decisiones de agentes de QA sobre código y detecte rechazos falsos o recomendaciones que debiliten la seguridad.",
  },
  "ana maria vargas murcia": {
    afiliacion: "Neo Plano Producciones",
    problema:
      "Clarity Web, una extensión de navegador que detecta estafas, suplantaciones e información engañosa y las explica en lenguaje sencillo para personas con necesidades cognitivas diversas.",
  },
  "andres botero ruiz": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Trazabilidad criptográfica para agentes, con firmas y una bitácora encadenada que permita saber si una acción vino del usuario o de una herramienta maliciosa.",
  },
  "brandon jahir cabra bulla": {
    afiliacion: "Iberoamericana",
    problema:
      "Detectar el ciberbullying con IA a partir de patrones de acoso, amenazas y exclusión, no solo de palabras ofensivas, y darle a la víctima opciones de apoyo y reporte sin caer en vigilancia invasiva.",
  },
  "bryan bobadilla": {
    afiliacion: "Independiente",
    problema:
      "Llevar el modelo de confianza cero a los agentes y a los secretos que manejan.",
  },
  "carlos andres romero orduz": {
    afiliacion: "COEM",
    problema:
      "Detectar y bloquear la inyección de instrucciones y los jailbreaks en agentes empresariales conectados a APIs y datos sensibles, sin quitarles utilidad.",
  },
  "cesar rivas": {
    afiliacion: "Niawi Tech",
    problema:
      "Agentes de ciberdefensa para servidores VPS sin monitoreo, que no solo alerten temprano sino que contengan la amenaza antes de que el servidor quede comprometido.",
  },
  "david orlando bastos castillejo": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Un servicio de IA generativa para uso pedagógico en universidades, que adapte modelos comerciales para hacer más transparente su uso frente al fraude estudiantil.",
  },
  "esteban alejandro hernandez sulvara": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Usar IA para la ciberdefensa automatizada y la verificación formal de software, para encontrar vulnerabilidades antes de que comprometan los sistemas.",
  },
  "eva julio caro": {
    afiliacion: "Auditoría",
    problema:
      "Que un agente no se salga de los límites de las instrucciones que se le dieron.",
  },
  "hermann galvis": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Cómo asegurar una aplicación con agentes conectada a WhatsApp, Google Workspace, Supabase y su propio RAG, desde la infraestructura hasta las herramientas externas.",
  },
  "jhon david bedoya munoz": {
    afiliacion: "Universidad Externado",
    problema:
      "Qué tanto resiste un modelo la inyección de instrucciones sin apartarse de lo que se le pidió, y si herramientas como JEV detectan contenido malicioso antes de que entre al contexto del agente.",
  },
  "jose carlos guerra martinez": {
    afiliacion: "Axmos Technologies",
    problema:
      "La inyección indirecta en sistemas de varios agentes con herramientas externas, donde un solo dato malicioso de un tercero puede autorizar acciones no deseadas.",
  },
  "jose leonardo pinilla zamora": {
    afiliacion: "Universidad Nacional",
    problema:
      "Un sistema con varias capas de guardas contra la inyección de instrucciones en agentes y RAG, con monitoreo de la seguridad del modelo.",
  },
  "josue david briceno urquijo": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Comprobar que el código escrito con IA por personas sin formación técnica sea seguro antes de llegar a producción.",
  },
  "juan felipe jimenez pacheco": {
    afiliacion: "Inetum",
    problema:
      "Clarity Web, una extensión de navegador que detecta estafas, suplantaciones e información engañosa y las explica en lenguaje sencillo para personas con necesidades cognitivas diversas.",
  },
  "juan felipe leon barrero": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Limitar el daño de la inyección indirecta separando un agente que lee contenido no confiable de otro que actúa, con una capa que valida lo que pasa entre ambos.",
  },
  "juan sebastian herrera corzo": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Un monitor que asigne un puntaje de sospecha a las acciones de un agente con permisos reales, para detectar sabotaje sutil con un modelo más pequeño y confiable que revise al más capaz.",
  },
  "juan trivino": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Defender a los agentes de la inyección indirecta de instrucciones.",
  },
  "julian andres restrepo castano": {
    afiliacion: "Kidar · Universidad EAN",
    problema:
      "MCP Guard, que audita los manifiestos de herramientas MCP en busca de instrucciones ocultas y cambios después de aprobados, y agrega un control de mínimo privilegio mientras el agente corre.",
  },
  "julian lizcano": {
    afiliacion: "Independiente",
    problema:
      "Ataques de denegación de servicio a modelos de IA: entradas diseñadas para consumir la mayor cantidad posible de cómputo.",
  },
  "juliana alexandra capador ochoa": {
    afiliacion: "Ingeniería de Sistemas",
    problema:
      "Un modelo de gobernanza y evaluación de riesgos para agentes que acceden a información interna de las empresas, con una guía de controles de seguridad y casos de prueba.",
  },
  "julio alfonso rodriguez buelvas": {
    afiliacion: "Pragma",
    problema:
      "Tener certeza de cómo razona el modelo y de si está configurado para filtrar información.",
  },
  "laura isabel zabaleta manrique": {
    afiliacion: "Universidad Nacional",
    problema:
      "La seguridad y el control de agentes basados en LLMs, cuya autonomía para ejecutar código, usar APIs y modificar bases de datos multiplica la superficie de ataque.",
  },
  "larry francisco aguirre junco": {
    afiliacion: "Universidad Nacional de Colombia",
    problema:
      "Ataques hechos por colmenas de agentes de IA que actúan de forma coordinada.",
  },
  "laura sofia londono perez": {
    afiliacion: "Universidad Sergio Arboleda",
    problema:
      "Un escáner que revise plugins y contenido antes de que un agente los use, y alerte sobre instrucciones ocultas o destinos sospechosos.",
  },
  "luis angel nunez pinzon": {
    afiliacion: "NeuronKids",
    problema:
      "Medir cuántas veces la inyección de instrucciones engaña a un clasificador de leads por WhatsApp y probar defensas en código, no solo en el prompt.",
  },
  "manuel santiago figueroa gomez": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Detectar cuándo un agente de programación hace algo distinto a lo que se le pidió, revisando los archivos que toca, los comandos que ejecuta y las dependencias que instala.",
  },
  "maria jose sierra barreto": {
    afiliacion: "Universidad Externado",
    problema: "Entender cómo se puede vulnerar el entrenamiento de los modelos de IA.",
  },
  "marlon naranjo": {
    afiliacion: "MNaranjo Consultoría",
    problema:
      "Un banco de pruebas de inyección indirecta en agentes que operan sistemas de pymes como ERP, correo y WhatsApp, que mida el éxito de los ataques antes y después de cada defensa.",
  },
  "michael david rodriguez beltran": {
    afiliacion: "SmartSoft Colombia",
    problema:
      "Cruzar automáticamente cada CVE nueva del NIST con el inventario de software de la empresa, avisar a los afectados y proponer los pasos para parchear.",
  },
  "miguel ariza": {
    afiliacion: "Business Support",
    problema:
      "Un asistente que resuma documentos sin confundir su texto con instrucciones y pida confirmación antes de compartir información fuera del chat.",
  },
  "sadid romero": {
    afiliacion: "BASF",
    problema:
      "Clarity Web, una extensión de navegador que detecta estafas, suplantaciones e información engañosa y las explica en lenguaje sencillo para personas con necesidades cognitivas diversas.",
  },
  "samuel fonseca": {
    afiliacion: "Universidad de los Andes",
    problema:
      "DÉDALO, una defensa contra agentes que automatizan el abuso de credenciales: señuelos para rastrearlos, un entorno falso con datos sintéticos que se adapta a lo que hacen y controles que revocan sesiones y limitan permisos.",
  },
  "santiago ramos grateron": {
    problema:
      "Comprobar que el código escrito con IA por personas sin formación técnica sea seguro antes de llegar a producción.",
  },
  "sergio alejandro castano arcila": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Agentes de ciberdefensa que generen parches y los verifiquen formalmente antes de que las vulnerabilidades sean explotadas.",
  },
  "sonia viviana cano guerrero": {
    afiliacion: "SENA · CUN",
    problema:
      "Una capa que filtre el contenido externo antes de que llegue al agente, para frenar instrucciones ocultas, y que se evalúe con casos de ataque reales.",
  },
  "thomas chisica londono": {
    afiliacion: "Universidad del Rosario",
    problema:
      "Medir qué tan estables son las decisiones de los monitores en protocolos de control de IA cuando cambia el monitor, la instrucción o se repite la misma consulta, y llevarlo a ControlArena.",
  },
  "tomas galeano espinosa": {
    afiliacion: "Universidad Nacional",
    problema:
      "Qué tan vulnerables son los modelos de frontera a la inyección de instrucciones a través de repositorios de skills contaminados.",
  },
  "valentina rodriguez nino": {
    afiliacion: "Ciencia de Datos",
    problema:
      "Medir qué tan bien resisten distintos modelos la inyección indirecta de instrucciones, sobre todo con contenido en español, y probar Jev como filtro antes de que el contenido llegue al agente.",
  },
  "yohan felipe gaitan carvajal": {
    afiliacion: "Universidad de los Andes",
    problema:
      "Un monitor por capas contra la inyección indirecta en agentes con herramientas, evaluado con benchmarks públicos en tasa de detección y falsos positivos.",
  },
};

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

async function consultar<T>(ruta: string): Promise<T[]> {
  const base = process.env.SUPABASE_URL;
  const llave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !llave) return [];
  const respuesta = await fetch(`${base}/rest/v1/${ruta}`, {
    headers: { apikey: llave, Authorization: `Bearer ${llave}` },
    next: { revalidate: 60 },
  });
  if (!respuesta.ok) throw new Error(`Supabase ${respuesta.status}`);
  return (await respuesta.json()) as T[];
}

export async function obtenerParticipantes(): Promise<Participante[]> {
  try {
    const [confirmaciones, aplicaciones] = await Promise.all([
      consultar<Confirmacion>(
        "defacc_confirmations?select=name,email&event=eq.defacc-2026&attending=is.true&listed=is.true",
      ),
      consultar<Aplicacion>(
        "defacc_applications?select=email,preferred_track&order=submitted_at.desc",
      ),
    ]);

    const porCorreo = new Map<string, Aplicacion>();
    for (const a of aplicaciones) {
      const correo = (a.email ?? "").trim().toLowerCase();
      if (correo && !porCorreo.has(correo)) porCorreo.set(correo, a);
    }

    const vistos = new Set<string>();
    const lista: Participante[] = [];
    for (const c of confirmaciones) {
      const nombre = (c.name ?? "").replace(/\s+/g, " ").trim();
      const clave = normalizar(nombre);
      if (!nombre || vistos.has(clave)) continue;
      vistos.add(clave);
      const aplicacion = porCorreo.get((c.email ?? "").trim().toLowerCase());
      const ajuste = AJUSTES[clave] ?? {};
      const frente = aplicacion?.preferred_track;
      lista.push({
        nombre,
        afiliacion: ajuste.afiliacion,
        frente: !ajuste.sinFrente && esFrente(frente) ? frente : undefined,
        problema: ajuste.problema,
      });
    }

    return lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  } catch {
    return [];
  }
}
