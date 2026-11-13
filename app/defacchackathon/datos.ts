import type { Idioma } from "@/lib/idiomas";

export const FECHA_EVENTO_ISO = "2026-11-14T08:00:00-05:00";
export const CIERRE_INSCRIPCIONES_ISO = "2026-11-10T23:59:59-05:00";
/* Cierre real, interno y sin mostrar en ningún texto: el sitio sigue diciendo
   23:59, pero el formulario y la API aceptan postulaciones hasta la 1:00 a. m. */
export const CIERRE_REAL_INSCRIPCIONES_ISO = "2026-11-11T01:00:00-05:00";

export const GRUPO_COMUNIDAD_WHATSAPP = "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF";
export const CORREO_HACKATHON = "equipo@aisafetycolombia.org";

export const INSCRIPCIONES_INICIADAS = true;

export function inscripcionesIniciadas(): boolean {
  return INSCRIPCIONES_INICIADAS;
}

export function inscripcionesCerradas(ahora: Date = new Date()): boolean {
  return ahora.getTime() > Date.parse(CIERRE_REAL_INSCRIPCIONES_ISO);
}

export type TrackItem = {
  id: string;
  numero: string;
  titulo: string;
  subtitulo?: string;
  resumen: string;
  paraEmpezar: string;
  conExperiencia: string;
  paraIrMasLejos?: string;
  recursos: { label: string; url: string }[];
};

export type StarterKit = {
  nivel: string;
  etiqueta: string;
  audiencia: string;
  ejemplos: string;
};

export type Criterio = {
  nombre: string;
  peso: string;
  descripcion: string;
  niveles?: { n1: string; n3: string; n5: string };
};

export type AgendaItem = {
  hora: string;
  actividad: string;
  detalle: string;
  destacado?: boolean;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Jurado = {
  nombre: string;
  rol: string;
  afiliacion: string;
  /** Texto plano o segmentos; los segmentos con url se muestran como enlace. */
  bio: string | (string | { texto: string; url: string })[];
  foto?: string;
  url?: string;
  confirmado: boolean;
};

export type Premio = {
  puesto: string;
  monto: string;
  detalle: string;
};

export type DatosHackathon = {
  badge: string;
  titulo: string;
  subtitulo: string;
  lema: string;
  ctaAplicar: string;
  ctaVerBases: string;
  estadoInscripciones: string;
  premiosPodio: Premio[];
  sidebar: {
    titulo: string;
    fechaRotulo: string;
    fechaValor: string;
    horarioRotulo: string;
    horarioValor: string;
    lugarRotulo: string;
    lugarValor: string;
    formatoRotulo: string;
    formatoValor: string;
    cupoRotulo: string;
    cupoValor: string;
    premiosRotulo: string;
    premiosValor: string;
    comidaRotulo: string;
    comidaValor: string;
    organizanRotulo: string;
  };
  pestañas: {
    resumen: string;
    tracks: string;
    reglas: string;
    cronograma: string;
  };
  resumen: {
    ideaTitulo: string;
    ideaParrafos: string[];
    colombiaTitulo: string;
    colombiaTexto: string;
    retoTitulo: string;
    retoTexto: string;
    cuatroRequisitosTitulo: string;
    cuatroRequisitos: string[];
    quienTitulo: string;
    quienPuntos: string[];
    premiosTitulo: string;
    premiosParrafos: string[];
    mascotaTitulo: string;
    mascotaTexto: string;
  };
  kits: {
    introTitulo: string;
    introTexto: string;
    listaKits: StarterKit[];
    tracksTitulo: string;
    tracksTexto: string;
    listaTracks: TrackItem[];
  };
  reglas: {
    tituloSeguridad: string;
    reglasSeguridad: string[];
    entregablesTitulo: string;
    entregablesHora: string;
    entregables: string[];
    criteriosTitulo: string;
    criteriosTexto: string;
    criterios: Criterio[];
    criteriosNota?: string;
    finalistasTitulo: string;
    finalistasTexto: string;
    juradosTitulo: string;
    juradosTexto: string;
    jurados: Jurado[];
  };
  cronograma: {
    titulo: string;
    subtitulo: string;
    agenda: AgendaItem[];
    calendarioPrevioTitulo: string;
    calendarioPrevio: { fecha: string; hito: string }[];
    faqTitulo: string;
    faqs: FaqItem[];
  };
};

export const TEXTOS_HACKATHON: Record<Idioma, DatosHackathon> = {
  es: {
    badge: "AI Safety Colombia × IEEE Computer Society Uniandes",
    titulo: "Defensive Acceleration Hackathon",
    subtitulo: "Hackatón de IA para la defensa · Bogotá 2026",
    lema: "Un día, un reto: construir una defensa basada en inteligencia artificial contra una amenaza real.",
    ctaAplicar: "Postúlate",
    ctaVerBases: "Ver frentes temáticos",
    estadoInscripciones: "Las postulaciones aún no han iniciado. Próximamente abriremos la convocatoria oficial.",
    premiosPodio: [
      {
        puesto: "Primer puesto",
        monto: "1.000.000",
        detalle: "Proyecto con mayor impacto y rigor evaluado por el jurado",
      },
      {
        puesto: "Segundo puesto",
        monto: "500.000",
        detalle: "Segundo proyecto finalista destacado",
      },
      {
        puesto: "Tercer puesto",
        monto: "500.000",
        detalle: "Tercer proyecto finalista destacado",
      },
    ],
    sidebar: {
      titulo: "Detalles del evento",
      fechaRotulo: "Fecha",
      fechaValor: "Sábado 14 de noviembre de 2026",
      horarioRotulo: "Horario",
      horarioValor: "8:00 a.m. a 8:00 p.m. (8 h de trabajo)",
      lugarRotulo: "Lugar",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Formato",
      formatoValor: "Presencial · Equipos de 2 a 5 o individual",
      cupoRotulo: "Cupo",
      cupoValor: "Cupo limitado por aforo",
      premiosRotulo: "Premios",
      premiosValor: "COP 2.000.000 en total",
      comidaRotulo: "Alimentación",
      comidaValor: "Snacks para el desayuno (hasta agotar existencias) y almuerzo incluidos",
      organizanRotulo: "Organizan",
    },
    pestañas: {
      resumen: "El reto",
      tracks: "Frentes temáticos",
      reglas: "Premios y evaluación",
      cronograma: "Agenda y FAQ",
    },
    resumen: {
      ideaTitulo: "La idea: aceleración defensiva (def/acc)",
      ideaParrafos: [
        "Los sistemas de inteligencia artificial avanzan rápido en capacidad y autonomía: agentes conectados a herramientas reales (terminales, archivos, navegadores o servidores MCP) pueden ser secuestrados mediante inyección indirecta de instrucciones; modelos cada vez más capaces plantean el problema de cómo supervisarlos si ocultan intenciones o intentan sabotear código; y la automatización de ciberataques y suplantación sintética pone a prueba la infraestructura digital y la confianza pública.",
        "La aceleración defensiva (def/acc) en seguridad de la IA propone construir y validar las defensas técnicas e institucionales que inclinen la balanza a favor de quien defiende: arquitecturas de agentes resistentes, protocolos de control y monitoreo de IA (AI Control), ciberdefensa automatizada y verificación formal de software, autenticidad criptográfica y estándares para asegurar pesos de modelos e infraestructura crítica.",
      ],
      colombiaTitulo: "Relevancia directa en nuestro entorno",
      colombiaTexto:
        "En Colombia y América Latina ya enfrentamos riesgos concretos (desde incidentes contra entidades públicas e infraestructura crítica y suplantación con voces clonadas por WhatsApp hasta el despliegue apresurado de agentes autónomos sin guardarraíles), y a la vez contamos con el talento para aportar soluciones empíricas a la frontera global de seguridad de la IA.",
      retoTitulo: "El reto",
      retoTexto:
        "Construir y evaluar, en 8 horas de trabajo continuo, un prototipo defensivo o estándar verificable dentro de uno de los 6 frentes temáticos: seguridad de agentes, control y monitoreo de IA, ciberdefensa y verificación formal, defensa epistémica, seguridad de infraestructura y gobernanza, o riesgos multiagente.",
      cuatroRequisitosTitulo: "Las 4 preguntas clave de cada entrega",
      cuatroRequisitos: [
        "El vector de riesgo: definir con precisión qué ataque, fallo de control o vulnerabilidad de IA busca mitigar el proyecto.",
        "El mecanismo o protocolo defensivo: construir el prototipo, monitor de supervisión, verificador formal o estándar técnico-regulatorio que contiene la amenaza.",
        "Validación empírica: medir la efectividad con benchmarks, casos de prueba o escenarios concretos (ataques neutralizados, tasa de detección, falsos positivos o invariantes verificados).",
        "Límites y riesgo dual: documentar con honestidad dónde falla la defensa y verificar que el trabajo no facilite usos ofensivos.",
      ],
      quienTitulo: "¿Quién puede participar?",
      quienPuntos: [
        "Estudiantes universitarios de cualquier semestre y carrera, investigadores y profesionales de la industria o el sector público.",
        "Solo mayores de edad (18 años o más). No aceptamos menores de edad.",
        "Equipos de 2 a 5 personas. Quien aplique solo podrá conformar equipo durante la sesión de apertura a las 8:30 a.m.",
        "Oracle Academy solo se activa con correo @uniandes.edu.co: el equipo que la quiera necesita un integrante de Uniandes. Si no tienen, les ayudamos a encontrarlo al armar equipos.",
        "No hace falta experiencia previa en seguridad de IA: cada frente ofrece puntos de partida accesibles (resolubles con Python, suites de evaluación guiadas o modelado formal de amenazas y gobernanza sin programar en el Track 5).",
        "Cupo limitado por aforo para garantizar un espacio de trabajo óptimo, conectividad y alimentación.",
      ],
      premiosTitulo: "Premios · COP 2.000.000 en total",
      premiosParrafos: [
        "La organización entrega COP 2.000.000 en premios a los tres primeros lugares (1.000.000 al primer puesto, 500.000 al segundo y 500.000 al tercero).",
        "La deliberación y anuncios de ganadores se realizan al cierre de la jornada tras la evaluación del jurado. El pago se coordina directamente con los representantes designados de los equipos finalistas.",
      ],
      mascotaTitulo: "Nuestra mascota: el oso de anteojos",
      mascotaTexto:
        "El oso de anteojos (Tremarctos ornatus) es el único oso nativo de Suramérica y habita en los páramos y bosques andinos colombianos. Sus 'anteojos' representan la esencia de este hackatón: ver las amenazas antes de que causen daño y proteger nuestro ecosistema digital.",
    },
    kits: {
      introTitulo: "Frentes de investigación",
      introTexto:
        "Cada equipo aborda un vector de amenaza concreto y construye una solución defensiva comprobable. Puedes elegir cualquiera de estos frentes o proponer un reto afín:",
      listaKits: [],
      tracksTitulo: "Los 6 frentes temáticos",
      tracksTexto:
        "Los frentes están diseñados alrededor de las prioridades de aceleración defensiva (def/acc) en seguridad de IA: proteger agentes autónomos, supervisar sistemas no confiables, automatizar la ciberdefensa con código verificable, blindar el ecosistema epistémico, asegurar la infraestructura y gobernanza de IA y evitar que los sistemas multiagente se vuelvan en contra de las personas.",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Seguridad de agentes",
          subtitulo: "Defensa contra la inyección de instrucciones",
          resumen:
            "Cuando los sistemas de IA pasan de conversar a ejecutar acciones con herramientas reales (archivos, navegadores, terminales o servidores MCP), una instrucción oculta en un documento o web puede secuestrar al agente (prompt injection indirecto) para exfiltrar información o ejecutar comandos no autorizados.",
          paraEmpezar:
            "Construir un auditor o filtro que inspeccione manifiestos y llamadas a herramientas MCP para detectar instrucciones maliciosas ocultas o permisos excesivos, evaluado sobre el benchmark MCPTox.",
          conExperiencia:
            "Diseñar una arquitectura defensiva (separación de privilegios, aislamiento de contexto o guardarraíles de flujo de datos) para agentes y medir cuántos ataques neutraliza sin degradar tareas legítimas en AgentDojo o AgentDyn.",
          recursos: [
            { label: "AgentDojo (ETH Zürich)", url: "https://github.com/ethz-spylab/agentdojo" },
            { label: "MCPTox Benchmark", url: "https://github.com/zhiqiangwang4/MCPTox-Benchmark" },
            { label: "AgentDyn Benchmark", url: "https://github.com/SaFo-Lab/AgentDyn" },
          ],
        },
        {
          id: "track-2",
          numero: "02",
          titulo: "Control de IA",
          subtitulo: "Monitoreo y detección de sabotaje",
          resumen:
            "Un problema central de seguridad técnica de IA (impulsado por Redwood Research y UK AISI): si un modelo o agente autónomo actúa de forma engañosa, oculta intenciones en su razonamiento o intenta insertar puertas traseras sutiles en código, ¿cómo diseñamos protocolos de control que lo atrapen a tiempo?",
          paraEmpezar:
            "Escribir con el framework Inspect (UK AISI) una suite de evaluación que detecte cuándo un modelo intenta evadir límites de seguridad, ocultar capacidades o engañar al evaluador.",
          conExperiencia:
            "Implementar un monitor de supervisión en ControlArena (entornos Bash o Apps) o con OpenAI Monitorability Evals que audite las acciones y cadenas de razonamiento de un agente para detectar sabotaje con baja tasa de falsos positivos.",
          recursos: [
            { label: "ControlArena (UK AISI & Redwood)", url: "https://github.com/UKGovernmentBEIS/control-arena" },
            { label: "Inspect Framework (UK AISI)", url: "https://inspect.aisi.org.uk/" },
            { label: "OpenAI Monitorability Evals", url: "https://github.com/openai/monitorability-evals" },
          ],
        },
        {
          id: "track-3",
          numero: "03",
          titulo: "Ciberdefensa automatizada",
          subtitulo: "Verificación formal de software",
          resumen:
            "Los modelos de frontera abaratan encontrar y explotar vulnerabilidades de software a gran escala. Para inclinar la balanza a favor de quien defiende, necesitamos usar IA para detectar fallas automáticamente, generar parches seguros y verificar matemáticamente que el código crítico sea invulnerable.",
          paraEmpezar:
            "Construir un flujo automatizado que analice código inseguro, identifique la vulnerabilidad y genere un parche verificable evaluado contra casos de prueba de CyberSecEval (Purple Llama) o CTIBench.",
          conExperiencia:
            "Usar modelos de lenguaje para sintetizar anotaciones e invariantes formales que demuestren matemáticamente que un programa está libre de errores críticos utilizando Dafny y el benchmark DafnyBench.",
          recursos: [
            { label: "DafnyBench (Verificación formal)", url: "https://github.com/sun-wendy/DafnyBench" },
            { label: "CyberSecEval (Purple Llama)", url: "https://github.com/meta-llama/PurpleLlama" },
            { label: "CTIBench", url: "https://huggingface.co/datasets/AI4Sec/cti-bench" },
          ],
        },
        {
          id: "track-4",
          numero: "04",
          titulo: "Defensa epistémica",
          subtitulo: "Autenticidad criptográfica y detección de suplantación",
          resumen:
            "La IA reduce casi a cero el costo de clonar voces en tiempo real, fabricar evidencia sintética y desplegar campañas de manipulación persuasiva. La aceleración defensiva en el espacio informativo busca proteger la confianza pública mediante pruebas criptográficas de origen y detección resistente en canales reales.",
          paraEmpezar:
            "Implementar un verificador de procedencia criptográfica bajo el estándar C2PA (c2pa-python) que certifique el origen de archivos multimedia, o un detector calibrado con SpaPhish.",
          conExperiencia:
            "Evaluar cómo se degrada la precisión de detectores de voz sintética de última generación (como AASIST) bajo la compresión real de audio de WhatsApp usando el dataset In-the-Wild, y construir un mecanismo de mitigación.",
          recursos: [
            { label: "Librería c2pa-python", url: "https://github.com/contentauth/c2pa-python" },
            { label: "Modelo AASIST", url: "https://github.com/clovaai/aasist" },
            { label: "Dataset In-the-Wild", url: "https://huggingface.co/datasets/mueller91/In-The-Wild" },
            { label: "Dataset SpaPhish", url: "https://data.mendeley.com/datasets/hz2d6gz7pc" },
          ],
        },
        {
          id: "track-5",
          numero: "05",
          titulo: "Infraestructura y gobernanza (sin código)",
          subtitulo: "Seguridad de infraestructura de IA y gobernanza defensiva",
          resumen:
            "Evitar el robo o exfiltración de los pesos de modelos de frontera y garantizar que el despliegue de sistemas autónomos no comprometa servicios esenciales requiere estándares técnicos e institucionales rigurosos. Este frente no exige programar código.",
          paraEmpezar:
            "Realizar un modelado formal de amenazas y brechas de seguridad bajo los niveles SL1 a SL5 de RAND (Securing AI Model Weights) o diseñar un protocolo de respuesta a incidentes de IA.",
          conExperiencia:
            "Formular un estándar técnico y regulatorio verificable con los requisitos mínimos de contención, auditoría y líneas rojas que entidades públicas o infraestructura crítica deben exigir antes de desplegar agentes autónomos.",
          recursos: [
            { label: "Securing Model Weights (RAND)", url: "https://www.rand.org/pubs/research_reports/RRA2849-1.html" },
            { label: "Estándar de Seguridad SL5", url: "https://sl5.org/sl5-standard" },
          ],
        },
        {
          id: "track-6",
          numero: "06",
          titulo: "Riesgos multiagente",
          subtitulo: "Colusión, explotación y resiliencia cooperativa",
          resumen:
            "Cada vez más agentes de IA negocian, compiten y cooperan entre sí sin una persona en el ciclo. Ahí aparecen riesgos que no se ven al evaluar un modelo aislado: agentes que se coluden en contra de los usuarios, modelos fuertes que explotan a otros más débiles en una negociación y grupos que colapsan cuando un solo agente deja de cooperar.",
          paraEmpezar:
            "Montar en NegotiationArena o Concordia una negociación entre agentes de distinta capacidad, medir cuándo el más fuerte explota al más débil y probar una salvaguarda (un árbitro, reglas de transparencia o un monitor) que reduzca ese daño.",
          conExperiencia:
            "Construir un detector de colusión entre agentes, o un mecanismo que sostenga la cooperación de un grupo de agentes cuando entra uno disruptivo (escenarios de Melting Pot o Concordia), y medir su efecto en el bienestar colectivo frente a una línea base sin defensa.",
          recursos: [
            { label: "Concordia (Google DeepMind)", url: "https://github.com/google-deepmind/concordia" },
            { label: "Melting Pot (Google DeepMind)", url: "https://github.com/google-deepmind/meltingpot" },
            { label: "NegotiationArena", url: "https://github.com/vinid/NegotiationArena" },
            { label: "Multi-Agent Risks from Advanced AI (Cooperative AI Foundation)", url: "https://arxiv.org/abs/2502.14143" },
          ],
        },
      ],
    },
    reglas: {
      tituloSeguridad: "Reglas de seguridad y uso responsable (Estrictas)",
      reglasSeguridad: [
        "Prohibido atacar, escanear o probar sistemas reales de terceros sin autorización explícita por escrito. Hacerlo es delito bajo la Ley 1273 de 2009. Todo el trabajo se realiza en entornos de laboratorio, benchmarks públicos o datos sintéticos.",
        "Cero publicación de exploits funcionales, código de malware o herramientas concebidas primordialmente para ofensa. Si un equipo descubre una vulnerabilidad real en una librería existente, debe reportarla en privado y omitirla de su entrega pública.",
        "Protección de datos personales: las muestras de voz, rostros o correos deben provenir de datasets públicos debidamente anonimizados o ser datos sintéticos.",
        "Atribución y transparencia: todo código, dataset, librería o fragmento generado con IA debe estar claramente documentado y citado en la entrega.",
      ],
      entregablesTitulo: "Entregables de cada equipo",
      entregablesHora: "Hora límite estricta: sábado 14 de noviembre a las 5:00 p.m.",
      entregables: [
        "Enlace al repositorio ejecutable (GitHub o Google Colab) con código documentado para los Tracks 1 al 4 y 6, o al documento de modelado formal de amenazas / estándar técnico-regulatorio verificable para el Track 5 (No-Code).",
        "Ficha técnica de hasta 2 páginas (según la plantilla oficial): vector de amenaza, arquitectura o protocolo defensivo, metodología de evaluación, resultados cuantitativos, límites y análisis de riesgo dual.",
      ],
      criteriosTitulo: "Criterios de evaluación y rúbrica",
      criteriosTexto:
        "Cada proyecto es evaluado por al menos 2 jurados independientes, especialistas en seguridad de IA, ciberseguridad y gobernanza tecnológica. Cada criterio se califica de 1 a 5 (3 = trabajo sólido para un día, 5 = excepcional), para un total de 15 puntos. Los tres criterios pesan lo mismo.",
      criterios: [
        {
          nombre: "Impacto potencial e innovación",
          peso: "1–5",
          descripcion: "¿Aborda un riesgo real de IA con una idea nueva? ¿Le da una ventaja neta a quien defiende sobre quien ataca?",
          niveles: {
            n1: "Riesgo vago o genérico, sin vínculo claro con IA; idea ya conocida.",
            n3: "Riesgo concreto y relevante; ventaja defensiva plausible, con algo de novedad.",
            n5: "Riesgo importante y poco atendido; enfoque original con una ventaja clara que un equipo real podría adoptar.",
          },
        },
        {
          nombre: "Calidad de ejecución",
          peso: "1–5",
          descripcion: "¿El prototipo funciona y lo pusieron a prueba? ¿Los resultados respaldan lo que afirman? (En el Track 5: ¿el estándar o modelado de amenazas es técnico y accionable?)",
          niveles: {
            n1: "No corre o es solo una idea; afirmaciones sin pruebas.",
            n3: "Prototipo funcional en al menos un caso, con al menos una prueba concreta; mencionan sus limitaciones.",
            n5: "Funciona de punta a punta y se puede reproducir; evaluado contra una línea base; analizan límites y riesgo de uso dual.",
          },
        },
        {
          nombre: "Presentación y claridad",
          peso: "1–5",
          descripcion: "¿La ficha y la explicación permiten entender rápido qué hicieron y qué encontraron?",
          niveles: {
            n1: "Es difícil entender qué hicieron.",
            n3: "Se entiende qué hicieron y por qué.",
            n5: "Un jurado lo entiende en 2 minutos; ficha concisa con los resultados clave.",
          },
        },
      ],
      criteriosNota:
        "Uso responsable: un proyecto que principalmente facilita ataques sin una mitigación no es elegible para premio. En caso de empate, gana el proyecto con mayor puntaje en Impacto potencial e innovación.",
      finalistasTitulo: "Dinámica de selección de ganadores",
      finalistasTexto:
        "Todos los equipos presentan. Desde las 5:10 p.m., cada equipo hace un pitch en vivo de 3 minutos, en el orden del sorteo, presentando su ficha técnica en pantalla (no hacen falta diapositivas). Los jurados la leen, califican y pueden hacer unas pocas preguntas cortas. De 6:40 a 7:00 p.m. el jurado consolida los puntajes y a las 7:15 p.m. anuncia los tres primeros puestos.",
      juradosTitulo: "Jueces y mentores",
      juradosTexto:
        "Los mentores acompañan a los equipos durante la jornada y los jueces, investigadores y especialistas en seguridad de IA, ciberseguridad y gobernanza, evalúan los entregables al cierre del día.",
      jurados: [
        {
          nombre: "Christian Urcuqui",
          rol: "Juez",
          afiliacion: "TryHackMe · Universidad Icesi",
          foto: "/aisc/mentores/christian-urcuqui.png",
          url: "https://www.linkedin.com/in/christianurcuqui/",
          confirmado: true,
          bio: ["Investigador de ciberseguridad e IA en ", { texto: "TryHackMe", url: "https://tryhackme.com/" }, ". Docente de la ", { texto: "Universidad Icesi", url: "https://www.icesi.edu.co/" }, " y coautor de tres ", { texto: "libros", url: "https://www.icesi.edu.co/editorial/ciberseguridad-datos-caos/" }, " de ciberseguridad. Publicó ", { texto: "AgentBreak", url: "https://github.com/urcuqui/AgentBreak" }, ", un laboratorio de inyección indirecta de prompts en sistemas con LLM."],
        },
        {
          nombre: "Antonio Badilla-Olivas",
          rol: "Juez",
          afiliacion: "SPAR · CRSS",
          foto: "/aisc/mentores/antonio-badilla-olivas.png",
          url: "https://www.linkedin.com/in/antonio-badilla-olivas/",
          confirmado: true,
          bio: ["Investigador en ", { texto: "SPAR", url: "https://sparai.org/" }, ", donde construye entornos de red-teaming en los que ataques y monitores evolucionan juntos. Lead AI/ML Engineer en CRSS y exprofesor de la ", { texto: "Universidad de Costa Rica", url: "https://www.ucr.ac.cr/" }, "."],
        },
        {
          nombre: "Carlos Gorostiza Ibáñez",
          rol: "Juez",
          afiliacion: "SPAR · UANL",
          foto: "/aisc/mentores/carlos-gorostiza.png",
          url: "https://www.linkedin.com/in/carlos-gorostiza-ib%C3%A1%C3%B1ez-68a09b2a8/",
          confirmado: true,
          bio: ["Investigador en ", { texto: "SPAR", url: "https://www.sparai.org/projects/f26/recFN5aycRe5NBe5e" }, ", donde construye un banco de pruebas para medir cómo negocian agentes de IA: cuándo fracasan los acuerdos y cómo escala una crisis entre ellos. Estudia economía en la ", { texto: "Universidad Autónoma de Nuevo León", url: "https://www.uanl.mx/" }, "."],
        },
        {
          nombre: "Jose Felipe Duarte",
          rol: "Juez",
          afiliacion: "LRC · UTP",
          foto: "/aisc/mentores/jose-felipe-duarte.png",
          url: "https://www.linkedin.com/in/josefeldc/",
          confirmado: true,
          bio: ["Investigador en la ", { texto: "Universidad Tecnológica de Pereira", url: "https://www.utp.edu.co/" }, " e ingeniero de IA en el ", { texto: "LRC", url: "https://www.lrc.systems/" }, ". Primer autor de ", { texto: "PsychoAlign", url: "https://github.com/josefdc/psychoalign" }, ", una arquitectura de alineación con tres agentes que negocian, presentada como oral en LatinX in AI @ ICML 2026."],
        },
        {
          nombre: "Manuela Chacón",
          rol: "Jueza",
          afiliacion: "Uniandes",
          foto: "/aisc/mentores/manuela-chacon.png",
          url: "https://www.linkedin.com/in/manuela-viviana-chac%C3%B3n-chamorro-04b0621bb/",
          confirmado: true,
          bio: ["Doctoranda en Ingeniería en la ", { texto: "Universidad de los Andes", url: "https://uniandes.edu.co/" }, " y ", { texto: "becaria de Google DeepMind", url: "https://ingenieria.uniandes.edu.co/es/noticias/ganadores-becas-deepmind-cinfonia" }, ". Primera autora de un ", { texto: "artículo", url: "https://ieeexplore.ieee.org/document/10988739/" }, " de IEEE sobre resiliencia cooperativa en sistemas multiagente; en 2025 participó en la ", { texto: "Cooperative AI Summer School", url: "https://www.cooperativeai.com/summer-school/summer-school-2025" }, "."],
        },
        {
          nombre: "Jairo Torregrosa",
          rol: "Juez y mentor",
          afiliacion: "Mercado Libre",
          foto: "/aisc/mentores/jairo-torregrosa.png",
          url: "https://www.linkedin.com/in/torregrosaj/",
          confirmado: true,
          bio: ["Sr AI Research Engineer en ", { texto: "Mercado Libre", url: "https://www.mercadolibre.com.co/" }, " (GenAI Engineering Research) y Claude Community Ambassador en Bogotá, donde da talleres de agentes con Agent SDK y Managed Agents. Publica herramientas de agentes y ", { texto: "evals abiertos", url: "https://github.com/JairoTorregrosa/sesgo-inspect" }, "."],
        },
        {
          nombre: "Robert Gómez",
          rol: "Mentor",
          afiliacion: "AIMEDIC",
          foto: "/aisc/mentores/robert-gomez.png",
          url: "https://www.linkedin.com/in/robert-gomez-6361571b6/",
          confirmado: true,
          bio: ["CTO de ", { texto: "AIMEDIC", url: "https://www.aimedic.com.co/" }, ", que lleva IA generativa a clínicas y hospitales. Coautor de un estudio de asistentes de salud para adolescentes en la ", { texto: "Universidad Nacional", url: "https://unal.edu.co/" }, " e investiga vacíos tributarios en ", { texto: "LoopholeCheck", url: "https://socampoq.github.io/LoopholeCheck.github.io/" }, ", con el ", { texto: "MIT", url: "https://www.mit.edu/" }, "."],
        },
        {
          nombre: "Pablo Pastrana",
          rol: "Mentor",
          afiliacion: "Dapper",
          foto: "/aisc/mentores/pablo-pastrana.png",
          url: "https://www.linkedin.com/in/pablo-pastrana-vega/",
          confirmado: true,
          bio: ["Product Lead en ", { texto: "Dapper", url: "https://dapperglobal.com" }, ", regtech colombiana que monitorea con IA cambios legislativos y regulatorios en América Latina, entre las más innovadoras de 2026 según Fast Company. Su conector MCP está en el ", { texto: "directorio oficial de Claude", url: "https://claude.ai/directory/dapper" }, "."],
        },
        {
          nombre: "Santiago Calderón",
          rol: "Mentor",
          afiliacion: "Linqia · King's College London",
          foto: "/aisc/mentores/santiago-calderon.png",
          url: "https://www.linkedin.com/in/santiagocalderon1999/",
          confirmado: true,
          bio: ["Ingeniero de software de IA en ", { texto: "Linqia", url: "https://www.linqia.com/" }, " y asistente de investigación en IA explicable en ", { texto: "King's College London", url: "https://www.kcl.ac.uk/" }, ", donde hizo su maestría con distinción. Creó ", { texto: "IncX", url: "https://github.com/santiago-calderon-pena/IncX" }, ", que explica en tiempo real las decisiones de detectores de objetos en video, y es coautor de un artículo sobre IA explicable en resonancias cerebrales (ECAI 2025)."],
        },
      ],
    },
    cronograma: {
      titulo: "Agenda de la jornada",
      subtitulo: "Sábado 14 de noviembre en la Universidad de los Andes, Bogotá",
      agenda: [
        { hora: "08:00 a.m.", actividad: "Registro e ingreso al campus", detalle: "Control de acceso en portería de Uniandes y ubicación de los participantes." },
        { hora: "08:30 a.m.", actividad: "Apertura y presentación del reto", detalle: "Presentación de los frentes temáticos, criterios de evaluación y conformación de equipos." },
        { hora: "09:00 a.m.", actividad: "Inicio del sprint de desarrollo (8 horas)", detalle: "Trabajo continuo de los equipos en sala.", destacado: true },
        { hora: "05:00 p.m.", actividad: "Cierre de entregas", detalle: "Entrega del repositorio con código ejecutable y la ficha técnica de hasta 2 páginas.", destacado: true },
        { hora: "05:10 p.m.", actividad: "Pitches de todos los equipos", detalle: "Cada equipo presenta 3 minutos, en el orden del sorteo, con su ficha técnica proyectada (sin diapositivas). Los jurados califican y pueden hacer unas pocas preguntas cortas.", destacado: true },
        { hora: "06:40 p.m.", actividad: "Deliberación del jurado", detalle: "Los jurados consolidan los puntajes y eligen los tres primeros puestos." },
        { hora: "07:15 p.m.", actividad: "Premiación", detalle: "Anuncio de los tres primeros puestos y entrega de premios.", destacado: true },
        { hora: "07:30 p.m.", actividad: "Cierre de la jornada", detalle: "Cierre del evento hasta las 8:00 p.m." },
      ],
      calendarioPrevioTitulo: "Fechas clave de la convocatoria",
      calendarioPrevio: [
        { fecha: "Jueves 5 de noviembre", hito: "Apertura de postulaciones." },
        { fecha: "Martes 10 de noviembre (11:59 p.m.)", hito: "Cierre de postulaciones. No se reciben postulaciones después de esta hora." },
        { fecha: "Antes del evento", hito: "Correos de confirmación con acceso al campus para los participantes seleccionados." },
        { fecha: "Sábado 14 de noviembre", hito: "Jornada presencial del hackatón en la Universidad de los Andes (8:00 a.m. a 8:00 p.m.)." },
      ],
      faqTitulo: "Preguntas frecuentes",
      faqs: [
        {
          q: "¿Puedo participar si no tengo equipo previo?",
          a: "Sí, absolutamente. Puedes postularte individualmente. Durante la apertura de las 8:30 a.m. realizaremos una dinámica guiada de conformación de equipos interdisciplinarios para que nadie compita solo.",
        },
        {
          q: "¿Tiene algún costo participar?",
          a: "Ninguno. La participación es 100% gratuita e incluye credencial conmemorativa, snacks para el desayuno y almuerzo completo en el campus. El cupo es limitado por aforo para asegurar una experiencia de primer nivel.",
        },
        {
          q: "¿Qué nivel técnico necesito tener?",
          a: "El hackatón está diseñado para todos los niveles: desde estudiantes de primer semestre de cualquier carrera hasta profesionales. Hay opciones que requieren Python elemental y notebooks guiados, e incluso el Track 5 permite abordar gobernanza y modelado de amenazas sin programar.",
        },
        {
          q: "¿Qué debo llevar al evento?",
          a: "Tu computador portátil con cargador, documento de identidad original para el ingreso a la Universidad de los Andes, termo para agua y muchas ganas de construir.",
        },
        {
          q: "¿Cómo se evalúa y premia?",
          a: "Los proyectos se entregan a las 5:00 p.m. (repositorio + ficha técnica de hasta 2 páginas). Desde las 5:10 p.m. todos los equipos presentan un pitch de 3 minutos y a las 7:15 p.m. se anuncian los tres primeros lugares, que reciben COP 1.000.000, COP 500.000 y COP 500.000.",
        },
        {
          q: "¿Cómo llego al salón en Uniandes?",
          a: "Trabajamos todo el día en el salón ML 607 del edificio Mario Laserna. Los pitches y el cierre son en el Auditorio ML C, de 5:00 a 8:00 p. m. El registro de portería te llega por correo antes del evento.",
        },
      ],
    },
  },
  en: {
    badge: "AI Safety Colombia × IEEE Computer Society Uniandes",
    titulo: "Defensive Acceleration Hackathon",
    subtitulo: "AI for Defense Hackathon · Bogotá 2026",
    lema: "One day, one challenge: build an AI-based defense against an active threat.",
    ctaAplicar: "Apply now",
    ctaVerBases: "Research Tracks",
    estadoInscripciones: "Applications have not started yet. Registration will open soon.",
    premiosPodio: [
      {
        puesto: "1st Place",
        monto: "1,000,000",
        detalle: "Top-scoring project based on the judges' evaluation",
      },
      {
        puesto: "2nd Place",
        monto: "500,000",
        detalle: "Runner-up finalist project",
      },
      {
        puesto: "3rd Place",
        monto: "500,000",
        detalle: "Third place finalist project",
      },
    ],
    sidebar: {
      titulo: "Event Details",
      fechaRotulo: "Date",
      fechaValor: "Saturday, November 14, 2026",
      horarioRotulo: "Hours",
      horarioValor: "8:00 AM to 8:00 PM (8h sprint)",
      lugarRotulo: "Venue",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Format",
      formatoValor: "In-person · Teams of 2 to 5 or solo",
      cupoRotulo: "Capacity",
      cupoValor: "Limited capacity · Prior application required",
      premiosRotulo: "Prizes",
      premiosValor: "COP 2,000,000 total",
      comidaRotulo: "Catering",
      comidaValor: "Breakfast snacks (while supplies last) and lunch included on-site",
      organizanRotulo: "Organizers",
    },
    pestañas: {
      resumen: "The Challenge",
      tracks: "Research Tracks",
      reglas: "Prizes & Rules",
      cronograma: "Schedule & FAQ",
    },
    resumen: {
      ideaTitulo: "The Idea: Defensive Acceleration (def/acc)",
      ideaParrafos: [
        "AI systems are rapidly advancing in capability and autonomy: tool-using agents connected to terminals, browsers, and MCP servers can be hijacked via indirect prompt injection; increasingly capable models raise the challenge of how to oversee them if they act deceptively or attempt subtle sabotage; and automated vulnerability discovery and synthetic impersonation strain digital infrastructure and epistemic trust.",
        "Defensive acceleration (def/acc) in AI safety proposes building and validating technical and institutional defenses that tilt the balance back toward defenders: resilient agent architectures, AI control and monitoring protocols, automated cyberdefense and formal software verification, cryptographic provenance, and standards for securing frontier model weights and critical infrastructure.",
      ],
      colombiaTitulo: "Real-World Context",
      colombiaTexto:
        "In Colombia and Latin America, these risks are already concrete (from attacks on public infrastructure and WhatsApp voice-cloning fraud to the rapid deployment of autonomous agents without guardrails), while our technical community has the talent to contribute empirical solutions to the global AI safety frontier.",
      retoTitulo: "The Challenge",
      retoTexto:
        "Build and evaluate, within 8 hours of focused teamwork, a defensive prototype or verifiable standard across one of the 6 research tracks: agent security, AI control & oversight, automated cyberdefense & formal verification, epistemic defense, AI infrastructure security & governance, or multi-agent risks.",
      cuatroRequisitosTitulo: "The 4 Core Questions for Every Submission",
      cuatroRequisitos: [
        "The threat vector: clearly define which attack vector, control failure, or AI vulnerability your project mitigates.",
        "The defensive mechanism or protocol: build the prototype, oversight monitor, formal verifier, or technical-regulatory standard that contains the threat.",
        "Empirical validation: measure effectiveness using benchmarks, test suites, or concrete scenarios (mitigated attacks, detection rate, false positives, or verified invariants).",
        "Limitations & dual-use: honestly document failure modes and ensure the work cannot be weaponized.",
      ],
      quienTitulo: "Who Can Join?",
      quienPuntos: [
        "Undergraduate & graduate students from any discipline, researchers, software engineers, and public policy practitioners.",
        "Participants must be 18 or older. We do not accept minors.",
        "Teams of 2 to 5. Solo applicants are grouped during the opening session at 8:30 AM.",
        "Oracle Academy only activates with an @uniandes.edu.co email: teams that want it need a Uniandes member. If you don't have one, we'll help you find one during team formation.",
        "No prior AI safety research experience required: each track provides accessible entry points (solvable with Python, guided evaluation suites, or formal threat modeling and governance without code in Track 5).",
        "Limited capacity to ensure a good workspace and catering.",
      ],
      premiosTitulo: "Prizes · COP 2,000,000 total",
      premiosParrafos: [
        "The organizers award COP 2,000,000 in total prizes across the top three places (COP 1,000,000 for 1st place, COP 500,000 for 2nd, and COP 500,000 for 3rd).",
        "Judging deliberations and winner announcements take place at the end of the event. Payment is coordinated directly with the designated team representatives.",
      ],
      mascotaTitulo: "Our Mascot: The Andean Spectacled Bear",
      mascotaTexto:
        "The spectacled bear (Tremarctos ornatus) is South America's only native bear species. Its distinctive facial rings reflect our defensive mission: spotting threats before they cause harm.",
    },
    kits: {
      introTitulo: "Research Tracks",
      introTexto:
        "Each team focuses on a concrete threat vector and builds an empirically verifiable defensive prototype. Choose any track or propose a related defensive project:",
      listaKits: [],
      tracksTitulo: "The 6 Research Tracks",
      tracksTexto:
        "These tracks are structured around core Defensive Acceleration (def/acc) priorities in AI Safety: securing autonomous agents, monitoring untrusted systems, automating cyberdefense with formal verification, protecting epistemic integrity, securing AI infrastructure and governance, and keeping multi-agent systems from turning against people.",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Agent Security",
          subtitulo: "Indirect prompt injection defense",
          resumen:
            "As AI systems move from chat to executing actions via external tools (browsers, terminals, files, or MCP servers), hidden instructions embedded in untrusted data can hijack the agent to exfiltrate data or execute unauthorized commands.",
          paraEmpezar:
            "Build a tool auditor or filter inspecting MCP schema descriptions and tool calls for hidden prompt injections or excessive permissions using the MCPTox benchmark.",
          conExperiencia:
            "Design a defensive architecture (privilege separation, data-flow isolation, or intent verification) for tool-using agents and measure mitigated attacks vs. benign task utility on AgentDojo or AgentDyn.",
          recursos: [
            { label: "AgentDojo (ETH Zürich)", url: "https://github.com/ethz-spylab/agentdojo" },
            { label: "MCPTox Benchmark", url: "https://github.com/zhiqiangwang4/MCPTox-Benchmark" },
            { label: "AgentDyn Benchmark", url: "https://github.com/SaFo-Lab/AgentDyn" },
          ],
        },
        {
          id: "track-2",
          numero: "02",
          titulo: "AI Control",
          subtitulo: "Oversight & sabotage detection",
          resumen:
            "A core technical AI safety paradigm (advanced by Redwood Research and UK AISI): if a frontier model or autonomous agent behaves deceptively, conceals unaligned reasoning, or attempts subtle code sabotage, how do we design control protocols that catch it before harm occurs?",
          paraEmpezar:
            "Use UK AISI's Inspect framework to build an evaluation suite detecting when a model attempts to bypass safety bounds, sandbag capabilities, or deceive an overseer.",
          conExperiencia:
            "Build an oversight monitor in ControlArena (Bash/Apps) or using OpenAI Monitorability Evals that audits agent actions and chains of thought to catch sabotage with a low false-positive rate.",
          recursos: [
            { label: "ControlArena (UK AISI & Redwood)", url: "https://github.com/UKGovernmentBEIS/control-arena" },
            { label: "Inspect Framework (UK AISI)", url: "https://inspect.aisi.org.uk/" },
            { label: "OpenAI Monitorability Evals", url: "https://github.com/openai/monitorability-evals" },
          ],
        },
        {
          id: "track-3",
          numero: "03",
          titulo: "Automated Cyberdefense",
          subtitulo: "Formal software verification",
          resumen:
            "Frontier models dramatically lower the cost of discovering and exploiting software vulnerabilities at scale. To tilt the offense-defense balance toward defenders, we need AI systems that automatically find bugs, generate verified patches, and mathematically prove critical code is safe.",
          paraEmpezar:
            "Build an automated pipeline that audits vulnerable code snippets, identifies security flaws, and synthesizes verifiable patches evaluated against CyberSecEval (Purple Llama) or CTIBench.",
          conExperiencia:
            "Use LLMs to synthesize formal specifications and safety invariants that mathematically prove programs free of critical bugs using Dafny and the DafnyBench benchmark.",
          recursos: [
            { label: "DafnyBench (Formal Verification)", url: "https://github.com/sun-wendy/DafnyBench" },
            { label: "CyberSecEval (Purple Llama)", url: "https://github.com/meta-llama/PurpleLlama" },
            { label: "CTIBench", url: "https://huggingface.co/datasets/AI4Sec/cti-bench" },
          ],
        },
        {
          id: "track-4",
          numero: "04",
          titulo: "Epistemic Defense",
          subtitulo: "Cryptographic provenance & impersonation detection",
          resumen:
            "AI reduces the cost of real-time voice cloning, synthetic evidence fabrication, and mass persuasive manipulation to near zero. Defensive acceleration in the information ecosystem protects collective decision-making through cryptographic provenance and resilient detection.",
          paraEmpezar:
            "Implement a cryptographic provenance verifier using the C2PA standard (c2pa-python) to certify media authenticity, or a calibrated phishing detector using SpaPhish.",
          conExperiencia:
            "Evaluate how state-of-the-art synthetic voice detectors (such as AASIST) degrade under real-world WhatsApp audio compression using the In-the-Wild dataset, and build a mitigation layer.",
          recursos: [
            { label: "c2pa-python Library", url: "https://github.com/contentauth/c2pa-python" },
            { label: "AASIST Model", url: "https://github.com/clovaai/aasist" },
            { label: "In-the-Wild Dataset", url: "https://huggingface.co/datasets/mueller91/In-The-Wild" },
            { label: "SpaPhish Dataset", url: "https://data.mendeley.com/datasets/hz2d6gz7pc" },
          ],
        },
        {
          id: "track-5",
          numero: "05",
          titulo: "Infrastructure & Governance (No-Code)",
          subtitulo: "AI infrastructure security & defensive governance",
          resumen:
            "Preventing the theft or exfiltration of frontier model weights and ensuring autonomous AI deployments do not compromise essential public services requires rigorous technical and institutional standards. No programming required.",
          paraEmpezar:
            "Conduct a formal threat model and gap analysis under RAND's Security Levels SL1 to SL5 (Securing AI Model Weights) or design an AI incident response protocol.",
          conExperiencia:
            "Formulate a verifiable technical and regulatory standard specifying mandatory containment, auditing, and red-line requirements before public agencies or critical infrastructure deploy autonomous agents.",
          recursos: [
            { label: "Securing Model Weights (RAND)", url: "https://www.rand.org/pubs/research_reports/RRA2849-1.html" },
            { label: "SL5 Standard", url: "https://sl5.org/sl5-standard" },
          ],
        },
        {
          id: "track-6",
          numero: "06",
          titulo: "Multi-Agent Risks",
          subtitulo: "Collusion, exploitation & cooperative resilience",
          resumen:
            "AI agents increasingly negotiate, compete and cooperate with each other with no human in the loop. That creates risks you cannot see when testing one model on its own: agents colluding against their users, stronger models exploiting weaker ones in a negotiation, and groups that collapse when a single agent stops cooperating.",
          paraEmpezar:
            "Set up a negotiation between agents of different capability in NegotiationArena or Concordia, measure when the stronger one exploits the weaker one, and test a safeguard (a referee, transparency rules or a monitor) that reduces the harm.",
          conExperiencia:
            "Build a detector for collusion between agents, or a mechanism that keeps a group of agents cooperating when a disruptive one joins (Melting Pot or Concordia scenarios), and measure its effect on collective welfare against an undefended baseline.",
          recursos: [
            { label: "Concordia (Google DeepMind)", url: "https://github.com/google-deepmind/concordia" },
            { label: "Melting Pot (Google DeepMind)", url: "https://github.com/google-deepmind/meltingpot" },
            { label: "NegotiationArena", url: "https://github.com/vinid/NegotiationArena" },
            { label: "Multi-Agent Risks from Advanced AI (Cooperative AI Foundation)", url: "https://arxiv.org/abs/2502.14143" },
          ],
        },
      ],
    },
    reglas: {
      tituloSeguridad: "Safety & Responsible Use Ground Rules",
      reglasSeguridad: [
        "Never scan or test unauthorized third-party systems. Violations are punishable under Colombian Law 1273/2009. Work must use local sandboxes, public benchmarks, or synthetic data.",
        "Zero weaponized exploits or offensive malware deliverables. Live vulnerabilities must be privately disclosed and omitted from submissions.",
        "Personal data protection: all test voice, face, or email assets must come from anonymized public datasets or synthetic generators.",
        "Transparent attribution: acknowledge all third-party code, datasets, and AI coding tools.",
      ],
      entregablesTitulo: "Submission Deliverables",
      entregablesHora: "Strict deadline: Saturday, November 14, 5:00 PM COT",
      entregables: [
        "Runnable code repository link (GitHub or Colab) for Tracks 1 to 4 and 6, or a formal threat model / verifiable technical-regulatory standard document for Track 5 (No-Code).",
        "Technical summary sheet of up to 2 pages: threat vector, defensive architecture or protocol, evaluation methodology, quantitative results, limitations, and dual-use analysis.",
        "Optional 2-minute demo recording illustrating the prototype or protocol.",
      ],
      criteriosTitulo: "Evaluation Rubric",
      criteriosTexto: "Each project is scored by at least 2 independent judges. Each criterion is scored 1–5 (3 = solid work for one day, 5 = exceptional), for a total of 15 points. All three criteria weigh the same.",
      criterios: [
        { nombre: "Impact Potential & Innovation", peso: "1–5", descripcion: "Does it tackle a real AI risk with a new idea? Does it give defenders a net advantage over attackers?", niveles: { n1: "Vague or generic risk, no clear link to AI; well-known idea.", n3: "Concrete, relevant risk; plausible defensive advantage with some novelty.", n5: "Important, neglected risk; original approach with a clear advantage a real team could adopt." } },
        { nombre: "Execution Quality", peso: "1–5", descripcion: "Does the prototype work, and did you test it? Do the results back the claims? (Track 5: is the standard or threat model technical and actionable?)", niveles: { n1: "Doesn't run, or is only an idea; untested claims.", n3: "Working prototype on at least one case, with at least one concrete test; limitations mentioned.", n5: "Works end to end and is reproducible; tested against a baseline; limits and dual-use risk analysed." } },
        { nombre: "Presentation & Clarity", peso: "1–5", descripcion: "Can a judge quickly see what you built and what you found?", niveles: { n1: "Hard to tell what was done.", n3: "Clear what was done and why.", n5: "A judge gets it in 2 minutes; concise sheet with the key results." } },
      ],
      criteriosNota: "Responsible use: a project that mainly enables attacks without a mitigation is not eligible for a prize. Ties go to the project with the higher Impact Potential & Innovation score.",
      finalistasTitulo: "Pitches & Winner Selection",
      finalistasTexto:
        "Every team presents. From 5:10 PM, each team gives a 3-minute live pitch, in the drawn order, presenting its summary sheet on screen (no slides needed). The judges read it, score it and may ask a few short questions. From 6:40 to 7:00 PM the judges consolidate scores, and at 7:15 PM they announce the top three teams.",
      juradosTitulo: "Judges and mentors",
      juradosTexto: "Mentors support the teams throughout the day, and judges, researchers and practitioners in AI safety, cybersecurity, and governance, evaluate submissions at the close of the day.",
      jurados: [
        {
          nombre: "Christian Urcuqui",
          rol: "Judge",
          afiliacion: "TryHackMe · Universidad Icesi",
          foto: "/aisc/mentores/christian-urcuqui.png",
          url: "https://www.linkedin.com/in/christianurcuqui/",
          confirmado: true,
          bio: ["Cybersecurity and AI researcher at ", { texto: "TryHackMe", url: "https://tryhackme.com/" }, ". Lecturer at ", { texto: "Universidad Icesi", url: "https://www.icesi.edu.co/" }, " and co-author of three ", { texto: "books", url: "https://www.icesi.edu.co/editorial/ciberseguridad-datos-caos/" }, " on cybersecurity. He published ", { texto: "AgentBreak", url: "https://github.com/urcuqui/AgentBreak" }, ", an indirect prompt injection lab for LLM systems."],
        },
        {
          nombre: "Antonio Badilla-Olivas",
          rol: "Judge",
          afiliacion: "SPAR · CRSS",
          foto: "/aisc/mentores/antonio-badilla-olivas.png",
          url: "https://www.linkedin.com/in/antonio-badilla-olivas/",
          confirmado: true,
          bio: ["Research fellow at ", { texto: "SPAR", url: "https://sparai.org/" }, ", where he builds red-teaming environments in which attacks and monitors co-evolve. Lead AI/ML Engineer at CRSS and former lecturer at the ", { texto: "University of Costa Rica", url: "https://www.ucr.ac.cr/" }, "."],
        },
        {
          nombre: "Carlos Gorostiza Ibáñez",
          rol: "Judge",
          afiliacion: "SPAR · UANL",
          foto: "/aisc/mentores/carlos-gorostiza.png",
          url: "https://www.linkedin.com/in/carlos-gorostiza-ib%C3%A1%C3%B1ez-68a09b2a8/",
          confirmado: true,
          bio: ["Research fellow at ", { texto: "SPAR", url: "https://www.sparai.org/projects/f26/recFN5aycRe5NBe5e" }, ", building a testbed to measure how AI agents negotiate: when deals fail and how a crisis escalates between them. He studies economics at the ", { texto: "Universidad Autónoma de Nuevo León", url: "https://www.uanl.mx/" }, "."],
        },
        {
          nombre: "Jose Felipe Duarte",
          rol: "Judge",
          afiliacion: "LRC · UTP",
          foto: "/aisc/mentores/jose-felipe-duarte.png",
          url: "https://www.linkedin.com/in/josefeldc/",
          confirmado: true,
          bio: ["Researcher at the ", { texto: "Universidad Tecnológica de Pereira", url: "https://www.utp.edu.co/" }, " and AI engineer at ", { texto: "LRC", url: "https://www.lrc.systems/" }, ". First author of ", { texto: "PsychoAlign", url: "https://github.com/josefdc/psychoalign" }, ", an alignment architecture with three negotiating agents, presented as an oral at LatinX in AI @ ICML 2026."],
        },
        {
          nombre: "Manuela Chacón",
          rol: "Judge",
          afiliacion: "Uniandes",
          foto: "/aisc/mentores/manuela-chacon.png",
          url: "https://www.linkedin.com/in/manuela-viviana-chac%C3%B3n-chamorro-04b0621bb/",
          confirmado: true,
          bio: ["PhD student in Engineering at the ", { texto: "Universidad de los Andes", url: "https://uniandes.edu.co/" }, " and a ", { texto: "Google DeepMind scholar", url: "https://ingenieria.uniandes.edu.co/es/noticias/ganadores-becas-deepmind-cinfonia" }, ". First author of an IEEE ", { texto: "paper", url: "https://ieeexplore.ieee.org/document/10988739/" }, " on cooperative resilience in multi-agent systems; in 2025 she took part in the ", { texto: "Cooperative AI Summer School", url: "https://www.cooperativeai.com/summer-school/summer-school-2025" }, "."],
        },
        {
          nombre: "Jairo Torregrosa",
          rol: "Judge and mentor",
          afiliacion: "Mercado Libre",
          foto: "/aisc/mentores/jairo-torregrosa.png",
          url: "https://www.linkedin.com/in/torregrosaj/",
          confirmado: true,
          bio: ["Sr AI Research Engineer at ", { texto: "Mercado Libre", url: "https://www.mercadolibre.com.co/" }, " (GenAI Engineering Research) and Claude Community Ambassador in Bogotá, where they teach agent workshops on the Agent SDK and Managed Agents. Publishes agent tooling and ", { texto: "open evals", url: "https://github.com/JairoTorregrosa/sesgo-inspect" }, "."],
        },
        {
          nombre: "Robert Gómez",
          rol: "Mentor",
          afiliacion: "AIMEDIC",
          foto: "/aisc/mentores/robert-gomez.png",
          url: "https://www.linkedin.com/in/robert-gomez-6361571b6/",
          confirmado: true,
          bio: ["CTO of ", { texto: "AIMEDIC", url: "https://www.aimedic.com.co/" }, ", which brings generative AI to clinics and hospitals. Co-author of a ", { texto: "Universidad Nacional", url: "https://unal.edu.co/" }, " study on health assistants for teenagers and researches tax loopholes with ", { texto: "MIT", url: "https://www.mit.edu/" }, " at ", { texto: "LoopholeCheck", url: "https://socampoq.github.io/LoopholeCheck.github.io/" }, "."],
        },
        {
          nombre: "Pablo Pastrana",
          rol: "Mentor",
          afiliacion: "Dapper",
          foto: "/aisc/mentores/pablo-pastrana.png",
          url: "https://www.linkedin.com/in/pablo-pastrana-vega/",
          confirmado: true,
          bio: ["Product Lead at ", { texto: "Dapper", url: "https://dapperglobal.com" }, ", a Colombian regtech that uses AI to track legislative and regulatory changes in Latin America, named among Fast Company's most innovative companies of 2026. Its MCP connector is in ", { texto: "Claude's official directory", url: "https://claude.ai/directory/dapper" }, "."],
        },
        {
          nombre: "Santiago Calderón",
          rol: "Mentor",
          afiliacion: "Linqia · King's College London",
          foto: "/aisc/mentores/santiago-calderon.png",
          url: "https://www.linkedin.com/in/santiagocalderon1999/",
          confirmado: true,
          bio: ["AI Software Engineer at ", { texto: "Linqia", url: "https://www.linqia.com/" }, " and explainable AI research assistant at ", { texto: "King's College London", url: "https://www.kcl.ac.uk/" }, ", where they earned an MSc with distinction. Built ", { texto: "IncX", url: "https://github.com/santiago-calderon-pena/IncX" }, ", which explains object detector decisions in video in real time, and co-authored an explainable AI paper on brain MRIs (ECAI 2025)."],
        },
      ],
    },
    cronograma: {
      titulo: "Day Agenda",
      subtitulo: "Saturday, November 14, 2026 at Universidad de los Andes, Bogotá",
      agenda: [
        { hora: "08:00 AM", actividad: "Check-in & Campus Access", detalle: "Access control at Uniandes security gates and participant check-in." },
        { hora: "08:30 AM", actividad: "Opening Ceremony & Challenge Brief", detalle: "Presentation of research tracks, evaluation criteria, and team formation." },
        { hora: "09:00 AM", actividad: "Sprint Begins (8 hours)", detalle: "Focused build sprint on site.", destacado: true },
        { hora: "05:00 PM", actividad: "Submission Cutoff", detalle: "Strict deadline: repository with runnable code + summary sheet of up to 2 pages.", destacado: true },
        { hora: "05:10 PM", actividad: "Pitches from Every Team", detalle: "Each team presents for 3 minutes, in the drawn order, with its summary sheet projected (no slides). Judges score and may ask a few short questions.", destacado: true },
        { hora: "06:40 PM", actividad: "Judges' Deliberation", detalle: "Judges consolidate scores and choose the top three." },
        { hora: "07:15 PM", actividad: "Awards", detalle: "Top three announced and prizes awarded.", destacado: true },
        { hora: "07:30 PM", actividad: "Closing", detalle: "Event wraps up by 8:00 PM." },
      ],
      calendarioPrevioTitulo: "Application Key Dates",
      calendarioPrevio: [
        { fecha: "Thursday, Nov 5", hito: "Applications open." },
        { fecha: "Tuesday, Nov 10 (11:59 PM)", hito: "Application deadline. Late applications are not accepted." },
        { fecha: "Before the event", hito: "Confirmation emails with campus access for selected participants." },
        { fecha: "Saturday, Nov 14", hito: "Hackathon day at Universidad de los Andes (8 AM to 8 PM)." },
      ],
      faqTitulo: "Frequently Asked Questions",
      faqs: [
        { q: "Can I apply without a team?", a: "Yes. Solo applicants will join a team during the 8:30 AM opening session." },
        { q: "Is there an entry fee?", a: "None. Attendance, breakfast snacks and lunch are 100% free. Capacity is limited to ensure a high-quality environment." },
        { q: "What technical experience is required?", a: "Beginners to advanced practitioners are welcome. Kits support basic Python to full agent architectures." },
        { q: "What should I bring?", a: "Your laptop, charger, water bottle, and national photo ID for Uniandes campus security." },
      ],
    },
  },
  pt: {
    badge: "AI Safety Colombia × IEEE Computer Society Uniandes",
    titulo: "Defensive Acceleration Hackathon",
    subtitulo: "Hackathon de IA para Defesa · Bogotá 2026",
    lema: "Um dia, um desafio: construir uma defesa baseada em inteligência artificial contra uma ameaça real.",
    ctaAplicar: "Candidate-se",
    ctaVerBases: "Ver frentes de pesquisa",
    estadoInscripciones: "As inscrições ainda não começaram. O formulário oficial será aberto em breve.",
    premiosPodio: [
      {
        puesto: "1º Lugar",
        monto: "1.000.000",
        detalle: "Projeto com a maior pontuação avaliado pelos jurados",
      },
      {
        puesto: "2º Lugar",
        monto: "500.000",
        detalle: "Segundo projeto finalista destacado",
      },
      {
        puesto: "3º Lugar",
        monto: "500.000",
        detalle: "Terceiro projeto finalista destacado",
      },
    ],
    sidebar: {
      titulo: "Detalhes do evento",
      fechaRotulo: "Data",
      fechaValor: "Sábado, 14 de novembro de 2026",
      horarioRotulo: "Horário",
      horarioValor: "8:00 às 20:00 (8 h de trabalho)",
      lugarRotulo: "Local",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Formato",
      formatoValor: "Presencial · Equipes de 2 a 5 ou individual",
      cupoRotulo: "Vagas",
      cupoValor: "Vagas limitadas · Candidatura prévia",
      premiosRotulo: "Prêmios",
      premiosValor: "COP 2.000.000 no total",
      comidaRotulo: "Alimentação",
      comidaValor: "Lanches no café da manhã e almoço inclusos no local",
      organizanRotulo: "Organização",
    },
    pestañas: {
      resumen: "O desafio",
      tracks: "Frentes de pesquisa",
      reglas: "Prêmios e avaliação",
      cronograma: "Agenda e FAQ",
    },
    resumen: {
      ideaTitulo: "A ideia: aceleração defensiva (def/acc)",
      ideaParrafos: [
        "Os sistemas de inteligência artificial avançam rapidamente em capacidade e autonomia: agentes conectados a ferramentas reais (terminais, navegadores, arquivos ou servidores MCP) podem ser sequestrados via injeção indireta de prompts; modelos cada vez mais capazes trazem o desafio de como supervisioná-los caso ocultem intenções ou tentem sabotar código; e a automação de ciberataques e falsificações sintéticas pressiona a infraestrutura digital e a confiança pública.",
        "A aceleração defensiva (def/acc) em segurança de IA propõe construir e validar defesas técnicas e institucionais que inclinem a balança a favor de quem defende: arquiteturas de agentes resilientes, protocolos de controle e monitoramento de IA (AI Control), ciberdefesa automatizada e verificação formal de software, autenticidade criptográfica e padrões para proteger pesos de modelos e infraestrutura crítica.",
      ],
      colombiaTitulo: "Relevância Direta na Região",
      colombiaTexto:
        "Na Colômbia e na América Latina, esses riscos já são concretos (desde incidentes contra órgãos públicos e fraudes com clonagem de voz até a implantação acelerada de agentes autônomos sem salvaguardas), enquanto nossa comunidade técnica tem talento para contribuir diretamente com a fronteira global de segurança de IA.",
      retoTitulo: "O Desafio",
      retoTexto:
        "Construir e avaliar, em 8 horas de trabalho contínuo, um protótipo defensivo ou padrão verificável em um dos 6 frentes de pesquisa: segurança de agentes, controle e supervisão de IA, ciberdefesa e verificação formal, defesa epistêmica, segurança de infraestrutura e governança, ou riscos multiagente.",
      cuatroRequisitosTitulo: "As 4 perguntas essenciais de cada entrega",
      cuatroRequisitos: [
        "O vetor de risco: definir com precisão qual ataque, falha de controle ou vulnerabilidade de IA o projeto busca mitigar.",
        "O mecanismo ou protocolo defensivo: construir o protótipo, monitor de supervisão, verificador formal ou padrão técnico-regulatório que contém a ameaça.",
        "Validação empírica: medir a eficácia com benchmarks, casos de teste ou cenários concretos (ataques bloqueados, taxa de detecção, falsos positivos ou invariantes provados).",
        "Limites e risco dual: documentar com honestidade onde a defesa falha e garantir que o trabalho não facilite usos ofensivos.",
      ],
      quienTitulo: "Quem Pode Participar?",
      quienPuntos: [
        "Estudantes de graduação e pós-graduação, pesquisadores e profissionais de tecnologia ou políticas públicas.",
        "Só maiores de idade (18 anos ou mais). Não aceitamos menores de idade.",
        "Equipes de 2 a 5 integrantes. Candidatos individuais formam grupos na abertura às 8:30.",
        "A Oracle Academy só é ativada com e-mail @uniandes.edu.co: a equipe que quiser usá-la precisa de um integrante da Uniandes. Se não tiverem, ajudamos a encontrar um na formação das equipes.",
        "Não é exigida experiência prévia em segurança de IA: cada frente oferece pontos de partida acessíveis (com Python, suítes de avaliação guiadas ou modelagem formal de ameaças e governança sem código no Track 5).",
        "Vagas limitadas para garantir espaço de trabalho ideal, conectividade e alimentação.",
      ],
      premiosTitulo: "Prêmios · COP 2.000.000 no total",
      premiosParrafos: [
        "A organização distribui COP 2.000.000 em prêmios para os três primeiros lugares (COP 1.000.000 para o 1º lugar, COP 500.000 para o 2º e COP 500.000 para o 3º).",
        "A deliberação dos jurados e o anúncio dos vencedores ocorrem no encerramento da jornada. O pagamento é coordenado diretamente com os representantes das equipes finalistas.",
      ],
      mascotaTitulo: "Nosso Mascote: O Urso-de-Óculos",
      mascotaTexto:
        "O urso-de-óculos (Tremarctos ornatus) é o único urso nativo da América do Sul. Suas manchas ao redor dos olhos simbolizam enxergar as ameaças antes que causem danos.",
    },
    kits: {
      introTitulo: "Frentes de pesquisa",
      introTexto:
        "Cada equipe foca em um vetor concreto de ameaça e constrói uma solução defensiva verificável. Você pode escolher qualquer um destes frentes ou propor um desafio afim:",
      listaKits: [],
      tracksTitulo: "Os 6 Frentes de Pesquisa",
      tracksTexto:
        "Os frentes são estruturados em torno das prioridades de aceleração defensiva (def/acc) em segurança de IA: proteger agentes autônomos, supervisionar modelos não confiáveis, automatizar a ciberdefesa com verificação formal, proteger o ecossistema epistêmico, garantir a governança e infraestrutura de IA e evitar que sistemas multiagente se voltem contra as pessoas.",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Segurança de agentes",
          subtitulo: "Defesa contra injeção de instruções",
          resumen:
            "Quando sistemas de IA passam a executar ações com ferramentas reais (arquivos, navegadores, terminais ou servidores MCP), instruções ocultas em documentos ou páginas podem sequestrar o agente (prompt injection indireto).",
          paraEmpezar:
            "Criar um auditor ou filtro de descrições e chamadas de ferramentas MCP testado no benchmark MCPTox.",
          conExperiencia:
            "Desenvolver arquiteturas defensivas (separação de privilégios ou isolamento de fluxo de dados) para agentes avaliadas nos benchmarks AgentDojo e AgentDyn.",
          recursos: [
            { label: "AgentDojo (ETH Zürich)", url: "https://github.com/ethz-spylab/agentdojo" },
            { label: "MCPTox Benchmark", url: "https://github.com/zhiqiangwang4/MCPTox-Benchmark" },
            { label: "AgentDyn", url: "https://github.com/SaFo-Lab/AgentDyn" },
          ],
        },
        {
          id: "track-2",
          numero: "02",
          titulo: "Controle de IA",
          subtitulo: "Supervisão e detecção de sabotagem",
          resumen:
            "Um pilar central da segurança técnica de IA (Redwood Research e UK AISI): se um modelo ou agente autônomo agir de forma enganosa, ocultar intenções no raciocínio ou tentar inserir backdoors sutis em código, como detectá-lo a tempo?",
          paraEmpezar:
            "Escrever uma suíte de avaliação com o framework Inspect (UK AISI) para detectar evasão de limites de segurança ou ocultação de capacidades.",
          conExperiencia:
            "Construir monitores de supervisão em ControlArena (Bash ou Apps) ou com OpenAI Monitorability Evals para detectar sabotagem de agentes com baixa taxa de falsos positivos.",
          recursos: [
            { label: "ControlArena (UK AISI & Redwood)", url: "https://github.com/UKGovernmentBEIS/control-arena" },
            { label: "Inspect Framework (UK AISI)", url: "https://inspect.aisi.org.uk/" },
            { label: "OpenAI Monitorability Evals", url: "https://github.com/openai/monitorability-evals" },
          ],
        },
        {
          id: "track-3",
          numero: "03",
          titulo: "Ciberdefesa automatizada",
          subtitulo: "Verificação formal de software",
          resumen:
            "Modelos de fronteira barateiam a descoberta e exploração de vulnerabilidades em larga escala. Para inclinar a balança a favor de quem defende, precisamos automatizar a detecção de falhas, gerar patches verificáveis e provar matematicamente que o código crítico é seguro.",
          paraEmpezar:
            "Construir um fluxo automatizado que audite código vulnerável, identifique falhas e proponha patches validados com CyberSecEval (Purple Llama) ou CTIBench.",
          conExperiencia:
            "Usar modelos de linguagem para sintetizar especificações e invariantes formais que provem matematicamente a ausência de erros críticos com Dafny e DafnyBench.",
          recursos: [
            { label: "DafnyBench (Verificação formal)", url: "https://github.com/sun-wendy/DafnyBench" },
            { label: "CyberSecEval (Purple Llama)", url: "https://github.com/meta-llama/PurpleLlama" },
            { label: "CTIBench", url: "https://huggingface.co/datasets/AI4Sec/cti-bench" },
          ],
        },
        {
          id: "track-4",
          numero: "04",
          titulo: "Defesa epistêmica",
          subtitulo: "Autenticidade criptográfica e detecção de fraude",
          resumen:
            "A IA reduz a quase zero o custo de clonar vozes em tempo real, fabricar mídia sintética e executar campanhas de persuasão em massa. A aceleração defensiva protege a tomada de decisão coletiva por meio de procedência criptográfica e detecção robusta.",
          paraEmpezar:
            "Implementar um verificador de procedência criptográfica C2PA (c2pa-python) ou um detector calibrado no dataset SpaPhish.",
          conExperiencia:
            "Avaliar e fortalecer detectores de voz sintética (AASIST) sob a compressão real de áudio do WhatsApp usando o dataset In-the-Wild.",
          recursos: [
            { label: "c2pa-python", url: "https://github.com/contentauth/c2pa-python" },
            { label: "AASIST", url: "https://github.com/clovaai/aasist" },
            { label: "In-the-Wild", url: "https://huggingface.co/datasets/mueller91/In-The-Wild" },
            { label: "SpaPhish", url: "https://data.mendeley.com/datasets/hz2d6gz7pc" },
          ],
        },
        {
          id: "track-5",
          numero: "05",
          titulo: "Infraestrutura e governança (sem código)",
          subtitulo: "Segurança de infraestrutura de IA e governança defensiva",
          resumen:
            "Prevenir o roubo dos pesos de modelos de fronteira e garantir que agentes autônomos não comprometam serviços públicos essenciais exige padrões técnicos e regulatórios rigorosos. Não exige programação.",
          paraEmpezar:
            "Realizar modelagem formal de ameaças sob os níveis SL1 a SL5 da RAND (Securing AI Model Weights) ou desenhar um protocolo de resposta a incidentes de IA.",
          conExperiencia:
            "Formular um padrão técnico-regulatório verificável com exigências mínimas de contenção e auditoria antes da implantação de agentes autônomos em infraestrutura crítica.",
          recursos: [
            { label: "Securing Weights (RAND)", url: "https://www.rand.org/pubs/research_reports/RRA2849-1.html" },
            { label: "Padrão SL5", url: "https://sl5.org/sl5-standard" },
          ],
        },
        {
          id: "track-6",
          numero: "06",
          titulo: "Riscos multiagente",
          subtitulo: "Conluio, exploração e resiliência cooperativa",
          resumen:
            "Cada vez mais agentes de IA negociam, competem e cooperam entre si sem uma pessoa no ciclo. Surgem riscos que não aparecem ao avaliar um modelo isolado: agentes em conluio contra os usuários, modelos fortes explorando outros mais fracos numa negociação e grupos que colapsam quando um único agente deixa de cooperar.",
          paraEmpezar:
            "Montar no NegotiationArena ou no Concordia uma negociação entre agentes de capacidades diferentes, medir quando o mais forte explora o mais fraco e testar uma salvaguarda (um árbitro, regras de transparência ou um monitor) que reduza esse dano.",
          conExperiencia:
            "Construir um detector de conluio entre agentes, ou um mecanismo que mantenha a cooperação de um grupo de agentes quando entra um disruptivo (cenários do Melting Pot ou do Concordia), e medir o efeito no bem-estar coletivo contra uma linha de base sem defesa.",
          recursos: [
            { label: "Concordia (Google DeepMind)", url: "https://github.com/google-deepmind/concordia" },
            { label: "Melting Pot (Google DeepMind)", url: "https://github.com/google-deepmind/meltingpot" },
            { label: "NegotiationArena", url: "https://github.com/vinid/NegotiationArena" },
            { label: "Multi-Agent Risks from Advanced AI (Cooperative AI Foundation)", url: "https://arxiv.org/abs/2502.14143" },
          ],
        },
      ],
    },
    reglas: {
      tituloSeguridad: "Regras de Segurança e Uso Responsável",
      reglasSeguridad: [
        "Proibido atacar sistemas reais de terceiros sem autorização formal (Lei 1273/2009).",
        "Não entregar ferramentas puramente ofensivas ou exploits não remediados.",
        "Dados pessoais sempre anonimizados ou sintéticos.",
        "Citação e transparência obrigatória de todo código e modelos utilizados.",
      ],
      entregablesTitulo: "Entregáveis da Equipe",
      entregablesHora: "Prazo final: Sábado, 14 de novembro, às 17:00",
      entregables: [
        "Repositório executável (GitHub ou Colab) para os Tracks 1 a 4 e 6, ou documento de modelagem formal de ameaças / padrão técnico-regulatório verificável para o Track 5 (No-Code).",
        "Ficha técnica de até 2 páginas: vetor de ameaça, arquitetura ou protocolo defensivo, metodologia de avaliação, resultados quantitativos, limites e risco dual.",
        "Vídeo opcional de até 2 minutos demonstrando o protótipo ou protocolo.",
      ],
      criteriosTitulo: "Critérios de Avaliação",
      criteriosTexto: "Cada projeto é avaliado por pelo menos 2 jurados independentes. Cada critério recebe nota de 1 a 5 (3 = trabalho sólido para um dia, 5 = excepcional), num total de 15 pontos. Os três critérios têm o mesmo peso.",
      criterios: [
        { nombre: "Potencial de Impacto e Inovação", peso: "1–5", descripcion: "Aborda um risco real de IA com uma ideia nova? Dá vantagem líquida a quem defende sobre quem ataca?", niveles: { n1: "Risco vago ou genérico, sem vínculo claro com IA; ideia já conhecida.", n3: "Risco concreto e relevante; vantagem defensiva plausível, com alguma novidade.", n5: "Risco importante e pouco atendido; abordagem original com vantagem clara que uma equipe real poderia adotar." } },
        { nombre: "Qualidade de Execução", peso: "1–5", descripcion: "O protótipo funciona e foi testado? Os resultados sustentam o que afirmam? (No Track 5: o padrão ou modelo de ameaças é técnico e acionável?)", niveles: { n1: "Não roda ou é só uma ideia; afirmações sem testes.", n3: "Protótipo funcional em pelo menos um caso, com pelo menos um teste concreto; mencionam as limitações.", n5: "Funciona de ponta a ponta e é reproduzível; avaliado contra uma linha de base; analisam limites e risco de uso dual." } },
        { nombre: "Apresentação e Clareza", peso: "1–5", descripcion: "Um jurado entende rápido o que fizeram e o que encontraram?", niveles: { n1: "Difícil entender o que fizeram.", n3: "Entende-se o que fizeram e por quê.", n5: "Um jurado entende em 2 minutos; ficha concisa com os resultados-chave." } },
      ],
      criteriosNota: "Uso responsável: um projeto que principalmente facilita ataques sem mitigação não é elegível a prêmio. Em caso de empate, vence o projeto com maior nota em Potencial de Impacto e Inovação.",
      finalistasTitulo: "Pitches e Seleção dos Vencedores",
      finalistasTexto:
        "Todas as equipes apresentam. A partir das 17:10, cada equipe faz um pitch ao vivo de 3 minutos, na ordem do sorteio, apresentando a ficha técnica na tela (não precisa de slides). Os jurados a leem, dão a nota e podem fazer algumas perguntas curtas. Das 18:40 às 19:00 os jurados consolidam as notas e às 19:15 anunciam os três primeiros lugares.",
      juradosTitulo: "Jurados e mentores",
      juradosTexto: "Os mentores acompanham as equipes durante o dia e os jurados, pesquisadores e especialistas em segurança de IA, cibersegurança e governança, avaliam as entregas no encerramento.",
      jurados: [
        {
          nombre: "Christian Urcuqui",
          rol: "Jurado",
          afiliacion: "TryHackMe · Universidad Icesi",
          foto: "/aisc/mentores/christian-urcuqui.png",
          url: "https://www.linkedin.com/in/christianurcuqui/",
          confirmado: true,
          bio: ["Pesquisador de cibersegurança e IA na ", { texto: "TryHackMe", url: "https://tryhackme.com/" }, ". Docente da ", { texto: "Universidad Icesi", url: "https://www.icesi.edu.co/" }, " e coautor de três ", { texto: "livros", url: "https://www.icesi.edu.co/editorial/ciberseguridad-datos-caos/" }, " de cibersegurança. Publicou o ", { texto: "AgentBreak", url: "https://github.com/urcuqui/AgentBreak" }, ", um laboratório de injeção indireta de prompts em sistemas com LLM."],
        },
        {
          nombre: "Antonio Badilla-Olivas",
          rol: "Jurado",
          afiliacion: "SPAR · CRSS",
          foto: "/aisc/mentores/antonio-badilla-olivas.png",
          url: "https://www.linkedin.com/in/antonio-badilla-olivas/",
          confirmado: true,
          bio: ["Pesquisador no ", { texto: "SPAR", url: "https://sparai.org/" }, ", onde constrói ambientes de red-teaming em que ataques e monitores evoluem juntos. Lead AI/ML Engineer na CRSS e ex-professor da ", { texto: "Universidade da Costa Rica", url: "https://www.ucr.ac.cr/" }, "."],
        },
        {
          nombre: "Carlos Gorostiza Ibáñez",
          rol: "Jurado",
          afiliacion: "SPAR · UANL",
          foto: "/aisc/mentores/carlos-gorostiza.png",
          url: "https://www.linkedin.com/in/carlos-gorostiza-ib%C3%A1%C3%B1ez-68a09b2a8/",
          confirmado: true,
          bio: ["Pesquisador no ", { texto: "SPAR", url: "https://www.sparai.org/projects/f26/recFN5aycRe5NBe5e" }, ", onde constrói um ambiente de testes para medir como agentes de IA negociam: quando os acordos falham e como uma crise escala entre eles. Estuda economia na ", { texto: "Universidad Autónoma de Nuevo León", url: "https://www.uanl.mx/" }, "."],
        },
        {
          nombre: "Jose Felipe Duarte",
          rol: "Jurado",
          afiliacion: "LRC · UTP",
          foto: "/aisc/mentores/jose-felipe-duarte.png",
          url: "https://www.linkedin.com/in/josefeldc/",
          confirmado: true,
          bio: ["Pesquisador na ", { texto: "Universidad Tecnológica de Pereira", url: "https://www.utp.edu.co/" }, " e engenheiro de IA no ", { texto: "LRC", url: "https://www.lrc.systems/" }, ". Primeiro autor do ", { texto: "PsychoAlign", url: "https://github.com/josefdc/psychoalign" }, ", uma arquitetura de alinhamento com três agentes que negociam, apresentada como oral no LatinX in AI @ ICML 2026."],
        },
        {
          nombre: "Manuela Chacón",
          rol: "Jurada",
          afiliacion: "Uniandes",
          foto: "/aisc/mentores/manuela-chacon.png",
          url: "https://www.linkedin.com/in/manuela-viviana-chac%C3%B3n-chamorro-04b0621bb/",
          confirmado: true,
          bio: ["Doutoranda em Engenharia na ", { texto: "Universidad de los Andes", url: "https://uniandes.edu.co/" }, " e ", { texto: "bolsista do Google DeepMind", url: "https://ingenieria.uniandes.edu.co/es/noticias/ganadores-becas-deepmind-cinfonia" }, ". Primeira autora de um ", { texto: "artigo", url: "https://ieeexplore.ieee.org/document/10988739/" }, " do IEEE sobre resiliência cooperativa em sistemas multiagente; em 2025 participou da ", { texto: "Cooperative AI Summer School", url: "https://www.cooperativeai.com/summer-school/summer-school-2025" }, "."],
        },
        {
          nombre: "Jairo Torregrosa",
          rol: "Jurado e mentor",
          afiliacion: "Mercado Libre",
          foto: "/aisc/mentores/jairo-torregrosa.png",
          url: "https://www.linkedin.com/in/torregrosaj/",
          confirmado: true,
          bio: ["Sr AI Research Engineer no ", { texto: "Mercado Libre", url: "https://www.mercadolibre.com.co/" }, " (GenAI Engineering Research) e Claude Community Ambassador em Bogotá, onde dá workshops de agentes com Agent SDK e Managed Agents. Publica ferramentas de agentes e ", { texto: "evals abertos", url: "https://github.com/JairoTorregrosa/sesgo-inspect" }, "."],
        },
        {
          nombre: "Robert Gómez",
          rol: "Mentor",
          afiliacion: "AIMEDIC",
          foto: "/aisc/mentores/robert-gomez.png",
          url: "https://www.linkedin.com/in/robert-gomez-6361571b6/",
          confirmado: true,
          bio: ["CTO da ", { texto: "AIMEDIC", url: "https://www.aimedic.com.co/" }, ", que leva IA generativa a clínicas e hospitais. Coautor de um estudo de assistentes de saúde para adolescentes na ", { texto: "Universidad Nacional", url: "https://unal.edu.co/" }, " e pesquisa brechas tributárias no ", { texto: "LoopholeCheck", url: "https://socampoq.github.io/LoopholeCheck.github.io/" }, ", com o ", { texto: "MIT", url: "https://www.mit.edu/" }, "."],
        },
        {
          nombre: "Pablo Pastrana",
          rol: "Mentor",
          afiliacion: "Dapper",
          foto: "/aisc/mentores/pablo-pastrana.png",
          url: "https://www.linkedin.com/in/pablo-pastrana-vega/",
          confirmado: true,
          bio: ["Product Lead na ", { texto: "Dapper", url: "https://dapperglobal.com" }, ", regtech colombiana que monitora com IA mudanças legislativas e regulatórias na América Latina, entre as mais inovadoras de 2026 segundo a Fast Company. Seu conector MCP está no ", { texto: "diretório oficial do Claude", url: "https://claude.ai/directory/dapper" }, "."],
        },
        {
          nombre: "Santiago Calderón",
          rol: "Mentor",
          afiliacion: "Linqia · King's College London",
          foto: "/aisc/mentores/santiago-calderon.png",
          url: "https://www.linkedin.com/in/santiagocalderon1999/",
          confirmado: true,
          bio: ["Engenheiro de software de IA na ", { texto: "Linqia", url: "https://www.linqia.com/" }, " e assistente de pesquisa em IA explicável no ", { texto: "King's College London", url: "https://www.kcl.ac.uk/" }, ", onde fez o mestrado com distinção. Criou o ", { texto: "IncX", url: "https://github.com/santiago-calderon-pena/IncX" }, ", que explica em tempo real as decisões de detectores de objetos em vídeo, e é coautor de um artigo sobre IA explicável em ressonâncias cerebrais (ECAI 2025)."],
        },
      ],
    },
    cronograma: {
      titulo: "Agenda da jornada",
      subtitulo: "Sábado, 14 de novembro na Universidad de los Andes, Bogotá",
      agenda: [
        { hora: "08:00", actividad: "Credenciamento e Entrada no Campus", detalle: "Controle de acesso nas portarias da Uniandes e recepção dos participantes." },
        { hora: "08:30", actividad: "Abertura Oficial e Apresentação do Desafio", detalle: "Apresentação dos frentes de pesquisa, critérios de avaliação e formação de equipes." },
        { hora: "09:00", actividad: "Início do Sprint de Desenvolvimento (8 horas)", detalle: "Trabalho prático das equipes nas salas.", destacado: true },
        { hora: "17:00", actividad: "Encerramento das Entregas", detalle: "Envio do repositório com código executável e ficha técnica de até 2 páginas.", destacado: true },
        { hora: "17:10", actividad: "Pitches de Todas as Equipes", detalle: "Cada equipe apresenta 3 minutos, na ordem do sorteio, com a ficha técnica projetada (sem slides). Os jurados dão a nota e podem fazer algumas perguntas curtas.", destacado: true },
        { hora: "18:40", actividad: "Deliberação dos Jurados", detalle: "Os jurados consolidam as notas e escolhem os três primeiros lugares." },
        { hora: "19:15", actividad: "Premiação", detalle: "Anúncio dos três primeiros lugares e entrega dos prêmios.", destacado: true },
        { hora: "19:30", actividad: "Encerramento", detalle: "Encerramento do evento até as 20:00." },
      ],
      calendarioPrevioTitulo: "Datas Importantes",
      calendarioPrevio: [
        { fecha: "Quinta, 5 nov", hito: "Abertura das candidaturas." },
        { fecha: "Terça, 10 nov (23:59)", hito: "Fim das candidaturas. Não aceitamos candidaturas depois desse horário." },
        { fecha: "Antes do evento", hito: "E-mails de confirmação com acesso ao campus para os selecionados." },
        { fecha: "Sábado, 14 nov", hito: "Hackathon presencial na Uniandes (8:00 às 20:00)." },
      ],
      faqTitulo: "Perguntas Frequentes",
      faqs: [
        { q: "Posso participar sem equipe?", a: "Sim, formaremos equipes de 2 a 5 pessoas durante a abertura às 8:30." },
        { q: "Há algum custo?", a: "Nenhum. Participação 100% gratuita com lanches no café da manhã e almoço completo inclusos. Vagas limitadas por capacidade." },
        { q: "Qual o nível de programação necessário?", a: "Há kits para todos os níveis, incluindo opções sem código no Track 5." },
        { q: "O que devo levar?", a: "Notebook, carregador, documento de identificação original e garrafa de água." },
      ],
    },
  },
};
