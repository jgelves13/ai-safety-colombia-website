import type { Idioma } from "@/lib/idiomas";

export const FECHA_EVENTO_ISO = "2026-11-14T08:00:00-05:00";
export const CIERRE_INSCRIPCIONES_ISO = "2026-11-10T23:59:59-05:00";

export const GRUPO_COMUNIDAD_WHATSAPP = "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF";
export const CORREO_HACKATHON = "equipo@aisafetycolombia.org";

export function inscripcionesCerradas(ahora: Date = new Date()): boolean {
  return ahora.getTime() > Date.parse(CIERRE_INSCRIPCIONES_ISO);
}

export type TrackItem = {
  id: string;
  numero: string;
  titulo: string;
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
  bio: string;
  confirmado: boolean;
};

export type Premio = {
  posicion: string;
  monto: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: "oro" | "plata" | "bronce" | "coral";
  extra?: string;
};

export type DatosHackathon = {
  badge: string;
  titulo: string;
  subtitulo: string;
  lema: string;
  ctaAplicar: string;
  ctaVerBases: string;
  ctaWhatsapp: string;
  estadoInscripciones: string;
  premiosPodio: Premio[];
  premioDifusion: Premio;
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
    ctaAplicar: "Postularme al hackatón",
    ctaVerBases: "Ver kits y recursos",
    ctaWhatsapp: "Comunidad de WhatsApp",
    estadoInscripciones: "Inscripciones abiertas hasta el martes 10 de noviembre de 2026 a las 11:59 p. m.",
    premiosPodio: [
      {
        posicion: "1.er Lugar",
        monto: "COP $1.500.000",
        titulo: "Prototipo de Mayor Impacto Defensivo",
        descripcion: "Otorgado al proyecto con la más alta calificación combinada en funcionalidad, evidencia empírica demostrable y relevancia para mitigar riesgos de IA.",
        icono: "🥇",
        color: "oro",
        extra: "Trofeo CyberBear + Reconocimiento Institucional de Honor",
      },
      {
        posicion: "2.º Lugar",
        monto: "COP $1.000.000",
        titulo: "Segundo Prototipo Finalista",
        descripcion: "Otorgado al equipo con destacada rigurosidad técnica, benchmarks exhaustivos y defensa activa frente a amenazas.",
        icono: "🥈",
        color: "plata",
        extra: "Certificado de Honor y Acceso Prioritario a Fellowships",
      },
      {
        posicion: "3.er Lugar",
        monto: "COP $500.000",
        titulo: "Tercer Prototipo Destacado",
        descripcion: "Otorgado al equipo con una solución promisoria y sólida defensa de su enfoque técnico o regulatorio.",
        icono: "🥉",
        color: "bronce",
        extra: "Certificado de Honor y Red de Mentoría Técnica",
      },
    ],
    premioDifusion: {
      posicion: "Premio Especial",
      monto: "COP $200.000",
      titulo: "Difusión e Impacto Comunitario",
      descripcion: "Premio al participante o equipo que publique el mejor hilo técnico, video explicativo o artículo de divulgación sobre su prototipo y la seguridad de la IA en redes sociales.",
      icono: "📢",
      color: "coral",
      extra: "Publicación destacada en canales oficiales de AI Safety Colombia",
    },
    sidebar: {
      titulo: "CyberBear Hackathon 2026",
      fechaRotulo: "Fecha",
      fechaValor: "Sábado 14 de noviembre de 2026",
      horarioRotulo: "Horario",
      horarioValor: "8:00 a. m. a 8:00 p. m. (7 h de hackeo)",
      lugarRotulo: "Lugar",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Formato",
      formatoValor: "Presencial · Equipos de 2 a 4 o individual",
      cupoRotulo: "Cupo",
      cupoValor: "Cupo limitado · Registro previo obligatorio",
      premiosRotulo: "Premios",
      premiosValor: "Más de COP 3.200.000 en efectivo",
      comidaRotulo: "Alimentación",
      comidaValor: "Almuerzo completo y refrigerios continuos incluidos",
      organizanRotulo: "Organizan",
    },
    pestañas: {
      resumen: "El reto",
      tracks: "Starter kits y tracks",
      reglas: "Premios y evaluación",
      cronograma: "Agenda y FAQ",
    },
    resumen: {
      ideaTitulo: "La idea: aceleración defensiva (def/acc)",
      ideaParrafos: [
        "La inteligencia artificial abarata atacar: un modelo redacta correos de phishing convincentes en segundos, clona una voz humana con pocos segundos de audio y ayuda a encontrar fallas en software a gran escala. A su vez, los agentes de IA que ya se conectan a correos, archivos y herramientas se pueden engañar con instrucciones escondidas en una página o documento (prompt injection).",
        "La aceleración defensiva propone construir las defensas a la misma velocidad: herramientas que detecten, verifiquen, bloqueen o vigilen de forma automatizada, inclinando la balanza hacia quien defiende. El evento se inspira en el Defensive Acceleration Hackathon de Apart Research, adaptado a una jornada intensiva y presencial en Bogotá.",
      ],
      colombiaTitulo: "Relevancia directa en nuestro entorno",
      colombiaTexto:
        "En Colombia esto ya no es teórico: ataques de ransomware contra entidades públicas e infraestructura crítica, estafas masivas con voces clonadas por WhatsApp y deepfakes en periodos electorales son hechos del presente. Los retos conectan problemáticas reales de la región con la frontera global de investigación en seguridad de IA.",
      retoTitulo: "El reto",
      retoTexto:
        "Construir, en 7 horas de trabajo continuo, una defensa basada en inteligencia artificial contra una amenaza real: ya sea una amenaza que la IA hace posible (fraude, desinformación, intrusión) o una amenaza dirigida a un sistema o agente de IA.",
      cuatroRequisitosTitulo: "Los 4 requisitos que debe cumplir todo proyecto",
      cuatroRequisitos: [
        "Identificar con claridad la amenaza concreta y a quién afecta.",
        "Construir un prototipo defensivo que funcione y sea comprobable.",
        "Medir su efectividad con evidencia o datos, aunque sea con un conjunto pequeño de pruebas o benchmarks.",
        "Explicar honestamente sus límites técnicos y los posibles riesgos de uso dual.",
      ],
      quienTitulo: "¿Quién puede participar?",
      quienPuntos: [
        "Estudiantes universitarios de cualquier semestre y carrera, investigadores y profesionales de la industria o el sector público.",
        "Equipos de 2 a 4 personas. Quien aplique solo podrá conformar equipo durante la dinámica de bienvenida a las 9:40 a. m.",
        "No hace falta ser experto en IA: cada track cuenta con kits de inicio para principiantes (resolubles con Python básico, un notebook en Colab o análisis de política sin programar).",
        "Cupo limitado por aforo para garantizar un espacio de trabajo óptimo, conectividad y alimentación de primer nivel.",
      ],
      premiosTitulo: "Premios en efectivo · COP $3.200.000+",
      premiosParrafos: [
        "Primer lugar: COP $1.500.000 en efectivo + Trofeo CyberBear institucional.",
        "Segundo lugar: COP $1.000.000 en efectivo + Certificado de Honor y acceso prioritario.",
        "Tercer lugar: COP $500.000 en efectivo + Certificado de Honor y red de mentoría.",
        "Premio especial de difusión comunitaria: COP $200.000 para la mejor cobertura o hilo técnico en redes sociales.",
        "Todos los premios se entregan la misma noche tras la deliberación del jurado. Además, los proyectos más destacados recibirán mentoría y postulación prioritaria a becas internacionales de investigación en seguridad de IA (Apart Research y BlueDot Impact).",
      ],
      mascotaTitulo: "Nuestra mascota: el oso de anteojos",
      mascotaTexto:
        "El oso de anteojos (Tremarctos ornatus) es el único oso nativo de Suramérica y habita en los páramos y bosques andinos colombianos. Sus 'anteojos' representan la esencia de este hackatón: ver las amenazas antes de que causen daño y proteger nuestro ecosistema digital.",
    },
    kits: {
      introTitulo: "Un solo ranking con 3 puntos de partida por nivel",
      introTexto:
        "Todos los equipos compiten en un único track y bajo la misma rúbrica. Para que nadie pierda la mañana instalando herramientas, la organización entrega kits listos con notebooks y datasets según el nivel del equipo:",
      listaKits: [
        {
          nivel: "Para primeros semestres y principiantes",
          etiqueta: "Proteger a las personas",
          audiencia: "Equipos que inician o con conocimientos básicos de Python y ML",
          ejemplos: "Detector de phishing o estafas por WhatsApp/SMS en español; verificación de procedencia y credenciales de imágenes (C2PA); detección de voz clonada.",
        },
        {
          nivel: "Para estudiantes intermedios",
          etiqueta: "Proteger la IA",
          audiencia: "Familiarizados con APIs de LLMs, agentes o arquitecturas tipo RAG/MCP",
          ejemplos: "Filtros y detectores de inyección de instrucciones (prompt injection) en herramientas MCP; monitores de razonamiento o evaluación de sabotaje en agentes.",
        },
        {
          nivel: "Para estudiantes avanzados y profesionales",
          etiqueta: "Proteger los sistemas e infraestructura",
          audiencia: "Experiencia en ciberseguridad, ingeniería de software o gobernanza",
          ejemplos: "Triage y clasificación de reportes de amenazas (CTI) en español; generación y validación de reglas Sigma; modelos de amenazas SL1–SL5 para centros de cómputo.",
        },
      ],
      tracksTitulo: "Los 5 frentes temáticos de investigación",
      tracksTexto:
        "Puedes escoger cualquiera de estos 5 frentes para orientar tu proyecto, usar sus benchmarks sugeridos o proponer tu propio reto defensivo con visto bueno de un mentor en la mañana:",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Agentes de IA que no se dejan engañar",
          resumen:
            "Los agentes de IA leen correos, documentos y llamadas a herramientas (MCP) y obedecen instrucciones maliciosas escondidas (prompt injection indirecto).",
          paraEmpezar:
            "Construir un validador que analice descripciones de herramientas MCP y detecte instrucciones maliciosas ocultas, evaluado sobre los casos de prueba de MCPTox.",
          conExperiencia:
            "Diseñar una defensa contra inyección de prompts para agentes y medir cuántos ataques mitiga sin degradar las tareas legítimas en AgentDojo o AgentDyn.",
          recursos: [
            { label: "MCPTox Benchmark", url: "https://github.com/zhiqiangwang4/MCPTox-Benchmark" },
            { label: "AgentDojo (ETH Zürich)", url: "https://github.com/ethz-spylab/agentdojo" },
            { label: "AgentDyn Benchmark", url: "https://github.com/SaFo-Lab/AgentDyn" },
          ],
        },
        {
          id: "track-2",
          numero: "02",
          titulo: "Fraude y desinformación generada con IA",
          resumen:
            "Phishing contextualizado generado por modelos, audios con voz clonada usados en extorsión telefónica y fotografías sintéticas propagadas en redes sociales.",
          paraEmpezar:
            "Entrenar o calibrar un detector de phishing en español con SpaPhish (1.395 correos reales en español), o un verificador de procedencia C2PA que certifique la autenticidad de archivos multimedia.",
          conExperiencia:
            "Evaluar si detectores de voz sintética de última generación (como AASIST) conservan su precisión al degradar el audio con la compresión típica de WhatsApp usando el dataset In-the-Wild, y diseñar una mitigación.",
          recursos: [
            { label: "Dataset SpaPhish", url: "https://data.mendeley.com/datasets/hz2d6gz7pc" },
            { label: "Librería c2pa-python", url: "https://github.com/contentauth/c2pa-python" },
            { label: "Modelo AASIST", url: "https://github.com/clovaai/aasist" },
            { label: "Dataset In-the-Wild", url: "https://huggingface.co/datasets/mueller91/In-The-Wild" },
          ],
        },
        {
          id: "track-3",
          numero: "03",
          titulo: "IA para equipos de ciberdefensa (CTI y SOC)",
          resumen:
            "Los analistas de ciberseguridad sufren sobrecarga de alertas y reportes de amenazas no estructurados. La IA puede acelerar la detección si es rigurosa en su análisis.",
          paraEmpezar:
            "Evaluar el rendimiento comparativo de modelos de frontera en tareas de inteligencia de amenazas (CTI) en español traduciendo y ejecutando muestras del benchmark CTIBench.",
          conExperiencia:
            "Construir un extractor automático que lea reportes de incidentes y genere reglas de detección en estándar Sigma, validándolas con pySigma y contra el repositorio oficial de SigmaHQ.",
          recursos: [
            { label: "CTIBench", url: "https://huggingface.co/datasets/AI4Sec/cti-bench" },
            { label: "Reglas SigmaHQ", url: "https://github.com/SigmaHQ/sigma" },
            { label: "pySigma Parser", url: "https://github.com/SigmaHQ/pySigma" },
          ],
        },
        {
          id: "track-4",
          numero: "04",
          titulo: "Vigilar a la IA: control, monitoreo y alineación",
          resumen:
            "En la frontera de investigación de laboratorios e institutos de seguridad (AISI): si un modelo avanzado o agente busca sabotear su entorno o simular alineación, ¿cómo lo atrapamos a tiempo?",
          paraEmpezar:
            "Escribir con el framework Inspect (UK AISI) una suite de evaluación que mida si un modelo desobedece límites de seguridad o engaña al usuario.",
          conExperiencia:
            "Implementar un monitor en entornos de ControlArena (Apps o Bash) que vigile si un agente comete sabotaje, midiendo tasa de detección y falsos positivos.",
          paraIrMasLejos:
            "Evaluar la legibilidad del razonamiento con OpenAI monitorability-evals o verificar código formalmente con DafnyBench.",
          recursos: [
            { label: "Inspect Framework (UK AISI)", url: "https://inspect.aisi.org.uk/" },
            { label: "ControlArena (UK AISI)", url: "https://github.com/UKGovernmentBEIS/control-arena" },
            { label: "OpenAI Monitorability Evals", url: "https://github.com/openai/monitorability-evals" },
            { label: "DafnyBench", url: "https://github.com/sun-wendy/DafnyBench" },
          ],
        },
        {
          id: "track-5",
          numero: "05",
          titulo: "Seguridad de infraestructura y política pública (No-Code)",
          resumen:
            "Proteger el entrenamiento y los pesos de modelos frontera requiere asegurar centros de datos y regular el acceso estatal. Este track no exige programar código.",
          paraEmpezar:
            "Modelado formal de amenazas para un centro de cómputo en Colombia bajo los niveles de seguridad SL1 a SL5 de RAND: diagnóstico de brechas actuales y requisitos para ascender de nivel.",
          conExperiencia:
            "Propuesta regulatoria y técnica sobre estándares mínimos obligatorios que entidades públicas deben exigir antes de desplegar agentes autónomos en infraestructura crítica.",
          recursos: [
            { label: "Securing Model Weights (RAND)", url: "https://www.rand.org/pubs/research_reports/RRA2849-1.html" },
            { label: "Estándar de Seguridad SL5", url: "https://sl5.org/sl5-standard" },
          ],
        },
      ],
    },
    reglas: {
      tituloSeguridad: "Reglas de seguridad y uso responsable (Estrictas)",
      reglasSeguridad: [
        "Prohibido atacar, escanear o probar sistemas reales de terceros sin autorización explícita por escrito. Hacerlo es delito bajo la Ley 1273 de 2009. Todo el trabajo se realiza en entornos de laboratorio, benchmarks públicos o datos sintéticos.",
        "Cero publicación de exploits funcionales, código de malware o herramientas concebidas primordialmente para ofensa. Si un equipo descubre una vulnerabilidad real en una librería existente, debe reportarla en privado y omitirla de su entrega pública.",
        "Bioseguridad: prohibido cualquier análisis que facilite la obtención o síntesis de agentes químicos o biológicos. La bioseguridad se admite únicamente como análisis regulatorio o de política en el Track 5.",
        "Protección de datos personales: las muestras de voz, rostros o correos deben provenir de datasets públicos debidamente anonimizados o ser datos sintéticos.",
        "Atribución y transparencia: todo código, dataset, librería o fragmento generado con IA debe estar claramente documentado y citado en la entrega.",
      ],
      entregablesTitulo: "Entregables de cada equipo",
      entregablesHora: "Hora límite estricta: sábado 14 de noviembre a las 5:00 p. m.",
      entregables: [
        "Enlace al repositorio (GitHub o Google Colab) con código documentado e instrucciones claras de ejecución para que los jurados puedan replicarlo.",
        "Ficha técnica de una página (según la plantilla oficial): planteamiento del problema, arquitectura defensiva, metodología de pruebas, resultados cuantitativos, límites y análisis de riesgo.",
        "Video de demostración (Opcional): video de hasta 2 minutos mostrando el prototipo en funcionamiento.",
      ],
      criteriosTitulo: "Criterios de evaluación y rúbrica",
      criteriosTexto:
        "Cada proyecto es evaluado de forma cruzada por al menos 2 jurados especialistas en ciberseguridad e inteligencia artificial:",
      criterios: [
        {
          nombre: "Funcionamiento del prototipo",
          peso: "30%",
          descripcion: "¿El prototipo corre correctamente y demuestra una implementación funcional de la defensa?",
        },
        {
          nombre: "Evidencia empírica",
          peso: "25%",
          descripcion: "¿Lo probaron con datos, datasets o benchmarks concretos? ¿Los resultados respaldan la efectividad afirmada?",
        },
        {
          nombre: "Relevancia de la amenaza",
          peso: "20%",
          descripcion: "¿Ataca una amenaza real y plausible? ¿Aporta una ventaja neta a quien defiende sobre quien ataca?",
        },
        {
          nombre: "Uso responsable y límites",
          peso: "15%",
          descripcion: "¿Identifican con honestidad las limitaciones técnicas y mitigan riesgos de uso dual o malicioso?",
        },
        {
          nombre: "Claridad y síntesis",
          peso: "10%",
          descripcion: "¿La ficha y la explicación son claras, concisas y fáciles de entender para los jurados?",
        },
      ],
      finalistasTitulo: "Dinámica de selección de ganadores",
      finalistasTexto:
        "A las 7:00 p. m., tras la deliberación técnica de los jurados, se anuncian los 5 mejores proyectos de la jornada. Cada equipo finalista realiza un pitch en vivo de 4 minutos ante el salón completo. A las 7:25 p. m. el jurado anuncia el podio y se efectúa el pago inmediato de los COP 2.000.000 en premios.",
      juradosTitulo: "Jurados confirmados",
      juradosTexto:
        "El panel de jurados evalúa de forma independiente y ciega:",
      jurados: [
        {
          nombre: "Yuri Andrea Pinto",
          rol: "Jurado técnica",
          afiliacion: "Maestría en Seguridad de la Información (MESI), Universidad de los Andes",
          bio: "Especialista e investigadora en gestión de incidentes y seguridad computacional.",
          confirmado: true,
        },
        {
          nombre: "Carlos Andrés Lozano",
          rol: "Jurado técnico",
          afiliacion: "Representante IEEE Computer Society, Universidad de los Andes",
          bio: "Líder de proyectos estudiantiles y desarrollo de software en IEEE Uniandes.",
          confirmado: true,
        },
        {
          nombre: "Jurados y mentores adicionales",
          rol: "Por anunciar",
          afiliacion: "Industria de ciberseguridad & Laboratorios de IA",
          bio: "Se sumarán mentores presenciales para acompañar las mesas durante las 7 horas de construcción.",
          confirmado: false,
        },
      ],
    },
    cronograma: {
      titulo: "Minuto a minuto del sábado 14 de noviembre",
      subtitulo: "Universidad de los Andes, Bogotá · Salón por confirmar",
      agenda: [
        { hora: "07:00 a. m.", actividad: "Montaje técnico", detalle: "Equipo organizador y voluntarios preparan sonido, red y mesas de trabajo." },
        { hora: "08:00 a. m.", actividad: "Ingreso, credenciales y café", detalle: "Control de acceso al campus, entrega de credenciales con la mascota CyberBear y ubicación en mesas." },
        { hora: "09:00 a. m.", actividad: "Apertura oficial del reto", detalle: "Bienvenida por AI Safety Colombia e IEEE CS Uniandes; presentación de kits, reglas y criterios de evaluación (40 min)." },
        { hora: "09:40 a. m.", actividad: "Dinámica de conformación de equipos", detalle: "Espacio para quienes llegaron sin equipo: conformación de grupos interdisciplinarios de 2 a 4 integrantes (20 min)." },
        { hora: "10:00 a. m.", actividad: "Inicio de la construcción (Hackeo)", detalle: "Entrega de accesos y kits. Los mentores inician rotación por las mesas de trabajo.", destacado: true },
        { hora: "12:30 p. m.", actividad: "Punto de control con mentores", detalle: "Revisión rápida de alcance y viabilidad técnica por equipo." },
        { hora: "01:00 p. m.", actividad: "Almuerzo para participantes", detalle: "Almuerzo completo servido en campus para los participantes sin detener el flujo de trabajo.", destacado: true },
        { hora: "04:30 p. m.", actividad: "Aviso de cierre de entregas", detalle: "Alerta de 30 minutos restantes para empaquetar código y ficha." },
        { hora: "05:00 p. m.", actividad: "Cierre estricto de entregas", detalle: "Envío en el formulario: repositorio + ficha técnica de 1 página (+ video opcional).", destacado: true },
        { hora: "05:00 a 07:00 p. m.", actividad: "Deliberación y charlas de invitados", detalle: "Jurados evalúan en paralelo mientras los equipos asisten a charlas breves de expositores y comunidad." },
        { hora: "07:00 p. m.", actividad: "Presentación de los 5 finalistas", detalle: "Pitches en vivo de 4 minutos cada uno ante los jurados y el público.", destacado: true },
        { hora: "07:20 p. m.", actividad: "Decisión final del jurado", detalle: "Consolidación de puntajes del podio." },
        { hora: "07:25 p. m.", actividad: "Premiación en vivo", detalle: "Entrega formal y transferencia inmediata de los premios en efectivo.", destacado: true },
        { hora: "07:45 p. m.", actividad: "Foto grupal y networking", detalle: "Foto oficial con la mascota CyberBear y despedida de la jornada." },
        { hora: "08:00 p. m.", actividad: "Cierre del evento", detalle: "Desmontaje y salida del campus." },
      ],
      calendarioPrevioTitulo: "Fechas clave de la convocatoria",
      calendarioPrevio: [
        { fecha: "Lunes 2 de noviembre", hito: "Apertura oficial de postulaciones públicas." },
        { fecha: "Martes 10 de noviembre (11:59 p. m.)", hito: "Cierre estricto de inscripciones y publicación de kits de inicio." },
        { fecha: "11 al 13 de noviembre", hito: "Revisión de aplicaciones y envío de correos de confirmación con acceso al campus." },
        { fecha: "Sábado 14 de noviembre", hito: "Jornada presencial del hackatón en la Universidad de los Andes (8:00 a. m. a 8:00 p. m.)." },
      ],
      faqTitulo: "Preguntas frecuentes",
      faqs: [
        {
          q: "¿Puedo participar si no tengo equipo previo?",
          a: "Sí, absolutamente. Puedes postularte individualmente. A las 9:40 a. m. realizaremos una dinámica guiada de conformación de equipos interdisciplinarios para que nadie compita solo.",
        },
        {
          q: "¿Tiene algún costo participar?",
          a: "Ninguno. La participación es 100% gratuita e incluye credencial conmemorativa, almuerzo completo en el campus, refrigerios continuos y acceso a mentores especializados en sala. El cupo es limitado por aforo para asegurar una experiencia de primer nivel.",
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
          a: "Los proyectos se entregan a las 5:00 p. m. (repositorio + ficha técnica de 1 página). Los 5 con mejor puntaje presentan 4 minutos en vivo a las 7:00 p. m. Los tres primeros lugares reciben COP 1.000.000, COP 500.000 y COP 500.000 pagados en el acto.",
        },
        {
          q: "¿Cómo llego al salón en Uniandes?",
          a: "El número exacto del edificio y salón te llegará al correo de aceptación junto con el registro de portería entre el 11 y el 13 de noviembre.",
        },
      ],
    },
  },
  en: {
    badge: "AI Safety Colombia × IEEE Computer Society Uniandes",
    titulo: "Defensive Acceleration Hackathon",
    subtitulo: "AI for Defense Hackathon · Bogotá 2026",
    lema: "One day, one challenge: build an AI-based defense against an active threat.",
    ctaAplicar: "Apply for the Hackathon",
    ctaVerBases: "Starter Kits & Tracks",
    ctaWhatsapp: "WhatsApp Community",
    estadoInscripciones: "Applications open until Tuesday, November 10, 2026, 11:59 PM COT.",
    premiosPodio: [
      {
        posicion: "1st Place",
        monto: "COP $1,500,000",
        titulo: "Highest Defensive Impact Prototype",
        descripcion: "Awarded to the top-scoring project combining functional execution, empirical rigor, and threat mitigation relevance.",
        icono: "🥇",
        color: "oro",
        extra: "CyberBear Trophy + Uniandes Institutional Citation",
      },
      {
        posicion: "2nd Place",
        monto: "COP $1,000,000",
        titulo: "Runner-Up Finalist",
        descripcion: "Awarded to the runner-up team demonstrating technical depth and benchmark evaluations against real threats.",
        icono: "🥈",
        color: "plata",
        extra: "Honor Certificate & Priority Fellowship Access",
      },
      {
        posicion: "3rd Place",
        monto: "COP $500,000",
        titulo: "Distinguished Defensive Solution",
        descripcion: "Awarded to the third finalist displaying innovative tooling and clear risk-reduction evidence.",
        icono: "🥉",
        color: "bronce",
        extra: "Honor Certificate & Mentorship Pipeline",
      },
    ],
    premioDifusion: {
      posicion: "Special Prize",
      monto: "COP $200,000",
      titulo: "Community Outreach & Technical Communication",
      descripcion: "Awarded to the participant or team publishing the most insightful technical thread, video breakdown, or blog post on social media during the event.",
      icono: "📢",
      color: "coral",
      extra: "Featured across official AI Safety Colombia channels",
    },
    sidebar: {
      titulo: "CyberBear Hackathon 2026",
      fechaRotulo: "Date",
      fechaValor: "Saturday, November 14, 2026",
      horarioRotulo: "Hours",
      horarioValor: "8:00 AM – 8:00 PM (7h building sprint)",
      lugarRotulo: "Venue",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Format",
      formatoValor: "In-person · Teams of 2 to 4 or solo",
      cupoRotulo: "Capacity",
      cupoValor: "Limited capacity · Prior application required",
      premiosRotulo: "Prizes",
      premiosValor: "Over COP 3,200,000 in cash prizes",
      comidaRotulo: "Catering",
      comidaValor: "Full lunch and coffee stations included",
      organizanRotulo: "Organizers",
    },
    pestañas: {
      resumen: "The Challenge",
      tracks: "Starter Kits & Tracks",
      reglas: "Prizes & Rules",
      cronograma: "Schedule & FAQ",
    },
    resumen: {
      ideaTitulo: "The Idea: Defensive Acceleration (def/acc)",
      ideaParrafos: [
        "AI makes attacking cheap: a model drafts convincing spear-phishing in seconds, clones human voices from short audio clips, and systematically surfaces software exploits. Furthermore, autonomous AI agents connected to corporate tools can be tricked through hidden prompt injection.",
        "Defensive acceleration proposes scaling defenses at the same speed: building automated detection, verification, and monitoring systems that tilt the advantage back toward defenders. Inspired by Apart Research's Defensive Acceleration Hackathon, adapted to an intensive in-person day in Bogotá.",
      ],
      colombiaTitulo: "Real-World Context",
      colombiaTexto:
        "In Colombia, these risks are already concrete: ransomware attacks against government and critical infrastructure, voice-cloning fraud, and election deepfakes. This event connects real regional threats with the research frontier of AI safety.",
      retoTitulo: "The Challenge",
      retoTexto:
        "Build a functional, AI-based defense against an active threat within 7 hours of teamwork: defending against an AI-enabled attack or protecting AI systems themselves.",
      cuatroRequisitosTitulo: "The 4 Requirements for Every Project",
      cuatroRequisitos: [
        "Clearly identify the specific threat and target audience.",
        "Build a working, demonstrable defensive prototype.",
        "Empirically measure performance with tests or benchmark data.",
        "Honestly document limitations and potential dual-use risks.",
      ],
      quienTitulo: "Who Can Join?",
      quienPuntos: [
        "Undergraduate & graduate students from any discipline, researchers, software engineers, and public policy practitioners.",
        "Teams of 2 to 4. Solo applicants are grouped at the opening mixer at 9:40 AM.",
        "No prior AI research experience required: beginner kits allow progress using basic Python or policy analysis without code.",
        "Limited capacity to ensure high-quality mentoring, space, and catering.",
      ],
      premiosTitulo: "Cash Prizes · COP $3,200,000+",
      premiosParrafos: [
        "1st Place: COP $1,500,000 in cash + Institutional CyberBear Trophy.",
        "2nd Place: COP $1,000,000 in cash + Honor Certificate & priority pipeline access.",
        "3rd Place: COP $500,000 in cash + Honor Certificate & research mentorship.",
        "Special Community Outreach Award: COP $200,000 for the best technical thread or breakdown on social media.",
        "All cash prizes are distributed in person the same evening. Top participants will also be connected with international fellowship opportunities through Apart Research and BlueDot Impact.",
      ],
      mascotaTitulo: "Our Mascot: The Andean Spectacled Bear",
      mascotaTexto:
        "The spectacled bear (Tremarctos ornatus) is South America's only native bear species. Its distinctive facial rings reflect our defensive mission: spotting threats before they cause harm.",
    },
    kits: {
      introTitulo: "A Single Ranking with 3 Level-Based Starter Kits",
      introTexto:
        "All teams compete under the same evaluation rubric. Pre-configured starter kits with notebooks and datasets eliminate morning setup overhead:",
      listaKits: [
        {
          nivel: "Beginner / Early semesters",
          etiqueta: "Protecting People",
          audiencia: "Teams starting out with basic Python and ML literacy",
          ejemplos: "Spanish SMS/WhatsApp phishing detection, C2PA content credential verifiers, cloned voice detection.",
        },
        {
          nivel: "Intermediate",
          etiqueta: "Protecting AI",
          audiencia: "Familiar with LLM APIs, prompt engineering, RAG, and MCP tooling",
          ejemplos: "Prompt injection defenses in MCP tools, agent monitor pipelines, output guardrails.",
        },
        {
          nivel: "Advanced & Professionals",
          etiqueta: "Protecting Systems & Infrastructure",
          audiencia: "Cybersecurity engineers, systems architects, and policy analysts",
          ejemplos: "Threat intelligence triage in Spanish, automated Sigma detection rules, RAND SL1–SL5 data center threat models.",
        },
      ],
      tracksTitulo: "The 5 Research Tracks",
      tracksTexto:
        "Select any track to anchor your project or propose a custom defense with a mentor's morning approval:",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Resilient AI Agents",
          resumen:
            "AI agents parsing emails, webpages, and tool descriptions face indirect prompt injection and poisoned tool manifests.",
          paraEmpezar:
            "Build a tool reviewer checking MCP schema descriptions for hidden prompt injections using the MCPTox benchmark.",
          conExperiencia:
            "Evaluate prompt injection defenses against AgentDojo or AgentDyn, measuring mitigated attacks vs. benign task breakages.",
          recursos: [
            { label: "MCPTox Benchmark", url: "https://github.com/zhiqiangwang4/MCPTox-Benchmark" },
            { label: "AgentDojo (ETH Zürich)", url: "https://github.com/ethz-spylab/agentdojo" },
            { label: "AgentDyn Benchmark", url: "https://github.com/SaFo-Lab/AgentDyn" },
          ],
        },
        {
          id: "track-2",
          numero: "02",
          titulo: "AI Fraud & Disinformation Detection",
          resumen:
            "Phishing, voice-cloning fraud, and synthetic imagery circulating without verification.",
          paraEmpezar:
            "Fine-tune Spanish phishing classifiers on SpaPhish (1,395 real Colombian/Spanish emails) or implement C2PA provenance checkers.",
          conExperiencia:
            "Test AASIST synthetic voice detectors under WhatsApp audio compression using the In-the-Wild dataset and propose corrections.",
          recursos: [
            { label: "SpaPhish Dataset", url: "https://data.mendeley.com/datasets/hz2d6gz7pc" },
            { label: "c2pa-python Library", url: "https://github.com/contentauth/c2pa-python" },
            { label: "AASIST Model", url: "https://github.com/clovaai/aasist" },
            { label: "In-the-Wild Dataset", url: "https://huggingface.co/datasets/mueller91/In-The-Wild" },
          ],
        },
        {
          id: "track-3",
          numero: "03",
          titulo: "AI for Cyber Defense Teams",
          resumen:
            "Cybersecurity operators are overwhelmed by raw threat reports and alert fatigue.",
          paraEmpezar:
            "Benchmark LLM threat-intelligence performance in Spanish vs. English using translated CTIBench tasks.",
          conExperiencia:
            "Generate Sigma detection rules from public threat advisories using LLMs, validated against pySigma and SigmaHQ.",
          recursos: [
            { label: "CTIBench", url: "https://huggingface.co/datasets/AI4Sec/cti-bench" },
            { label: "SigmaHQ Rules", url: "https://github.com/SigmaHQ/sigma" },
            { label: "pySigma Parser", url: "https://github.com/SigmaHQ/pySigma" },
          ],
        },
        {
          id: "track-4",
          numero: "04",
          titulo: "AI Overseers: Control & Monitoring",
          resumen:
            "Frontier safety: detecting agent deception, unfaithful reasoning, or task sabotage before damage occurs.",
          paraEmpezar:
            "Use UK AISI's Inspect framework to code small behavioral evaluation suites measuring dangerous instruction compliance.",
          conExperiencia:
            "Build an overseer monitor in ControlArena (Bash/Apps) detecting agent sabotage, measuring detection rate vs. false positives.",
          paraIrMasLejos:
            "Explore OpenAI monitorability-evals or formal DafnyBench code verification.",
          recursos: [
            { label: "Inspect Framework (UK AISI)", url: "https://inspect.aisi.org.uk/" },
            { label: "ControlArena (UK AISI)", url: "https://github.com/UKGovernmentBEIS/control-arena" },
            { label: "OpenAI Monitorability Evals", url: "https://github.com/openai/monitorability-evals" },
            { label: "DafnyBench", url: "https://github.com/sun-wendy/DafnyBench" },
          ],
        },
        {
          id: "track-5",
          numero: "05",
          titulo: "AI Infrastructure Security & Policy (No-Code)",
          resumen:
            "Securing training clusters, data centers, and public sector adoption standards. No code required.",
          paraEmpezar:
            "Draft a threat model for a Colombian data center mapping against RAND's Security Levels SL1 to SL5.",
          conExperiencia:
            "Formulate a mandatory baseline policy for public agencies deploying autonomous AI agents.",
          recursos: [
            { label: "Securing Model Weights (RAND)", url: "https://www.rand.org/pubs/research_reports/RRA2849-1.html" },
            { label: "SL5 Standard", url: "https://sl5.org/sl5-standard" },
          ],
        },
      ],
    },
    reglas: {
      tituloSeguridad: "Safety & Responsible Use Ground Rules",
      reglasSeguridad: [
        "Never scan or test unauthorized third-party systems. Violations are punishable under Colombian Law 1273/2009. Work must use local sandboxes, public benchmarks, or synthetic data.",
        "Zero weaponized exploits or offensive malware deliverables. Live vulnerabilities must be privately disclosed and omitted from submissions.",
        "No wet-lab biology or chemical syntheses. Biosecurity is permitted solely as governance or policy analysis in Track 5.",
        "Personal data protection: all test voice, face, or email assets must come from anonymized public datasets or synthetic generators.",
        "Transparent attribution: acknowledge all third-party code, datasets, and AI coding tools.",
      ],
      entregablesTitulo: "Submission Deliverables",
      entregablesHora: "Strict deadline: Saturday, November 14, 5:00 PM COT",
      entregables: [
        "Code repository link (GitHub or Colab) with clear setup and demo instructions.",
        "One-page technical summary sheet: threat breakdown, architecture, evaluation results, limitations, and dual-use analysis.",
        "Optional 2-minute demo recording illustrating the prototype.",
      ],
      criteriosTitulo: "Evaluation Rubric",
      criteriosTexto: "Each submission is evaluated by at least 2 independent judges on 5 criteria:",
      criterios: [
        { nombre: "Working Prototype", peso: "30%", descripcion: "Functional demonstration and technical execution." },
        { nombre: "Empirical Evidence", peso: "25%", descripcion: "Quantitative testing with concrete data or benchmarks." },
        { nombre: "Threat Relevance", peso: "20%", descripcion: "Addresses an active, realistic threat giving defenders an advantage." },
        { nombre: "Responsible Use & Limitations", peso: "15%", descripcion: "Honest appraisal of technical limits and dual-use risks." },
        { nombre: "Clarity & Presentation", peso: "10%", descripcion: "Well-structured written sheet and presentation." },
      ],
      finalistasTitulo: "Finalist Presentations",
      finalistasTexto:
        "At 7:00 PM, the top 5 teams deliver 4-minute live pitches before the assembly. Final deliberations conclude at 7:25 PM with cash prizes paid on site.",
      juradosTitulo: "Confirmed Judges",
      juradosTexto: "Independent expert panel:",
      jurados: [
        {
          nombre: "Yuri Andrea Pinto",
          rol: "Technical Judge",
          afiliacion: "MESI Cybersecurity Master's Program, Universidad de los Andes",
          bio: "Cybersecurity researcher specializing in computer security and incident response.",
          confirmado: true,
        },
        {
          nombre: "Carlos Andrés Lozano",
          rol: "Technical Judge",
          afiliacion: "IEEE Computer Society Student Branch, Universidad de los Andes",
          bio: "Software developer and student leader at IEEE Uniandes.",
          confirmado: true,
        },
        {
          nombre: "Additional Mentors & Judges",
          rol: "To Be Announced",
          afiliacion: "Cybersecurity Industry & AI Labs",
          bio: "Mentors supporting tables throughout the build sprint.",
          confirmado: false,
        },
      ],
    },
    cronograma: {
      titulo: "Saturday, November 14 Schedule",
      subtitulo: "Universidad de los Andes, Bogotá",
      agenda: [
        { hora: "08:00 AM", actividad: "Check-in & Badges", detalle: "Campus access, CyberBear badge pickup, and desk setup." },
        { hora: "09:00 AM", actividad: "Opening Ceremony", detalle: "Welcome, rules, track introduction, and evaluation breakdown." },
        { hora: "09:40 AM", actividad: "Team Formation Mixer", detalle: "Forming teams of 2–4 for solo registrants." },
        { hora: "10:00 AM", actividad: "Sprint Begins", detalle: "Kits unlocked; mentors circulate through tables.", destacado: true },
        { hora: "01:00 PM", actividad: "Lunch Served", detalle: "Full catered lunch on campus for all participants without interrupting work.", destacado: true },
        { hora: "05:00 PM", actividad: "Submission Cutoff", detalle: "Strict deadline: repository + one-page sheet + optional demo video.", destacado: true },
        { hora: "05:00 – 07:00 PM", actividad: "Judging & Tech Talks", detalle: "Parallel judging and guest keynote presentations." },
        { hora: "07:00 PM", actividad: "Top 5 Live Pitches", detalle: "4-minute pitches by finalists.", destacado: true },
        { hora: "07:25 PM", actividad: "Awards Ceremony", detalle: "Immediate distribution of cash prizes before the judges.", destacado: true },
        { hora: "07:45 PM", actividad: "Group Photo & Closing", detalle: "Group photo with CyberBear mascot and community wrap-up." },
      ],
      calendarioPrevioTitulo: "Application Key Dates",
      calendarioPrevio: [
        { fecha: "Monday, Nov 2", hito: "Public applications open." },
        { fecha: "Tuesday, Nov 10 (11:59 PM)", hito: "Application deadline & starter kits release." },
        { fecha: "Nov 11 – 13", hito: "Application review and campus entry passes issued." },
        { fecha: "Saturday, Nov 14", hito: "Hackathon day at Universidad de los Andes (8 AM – 8 PM)." },
      ],
      faqTitulo: "Frequently Asked Questions",
      faqs: [
        { q: "Can I apply without a team?", a: "Yes. Solo applicants will join a team during the 9:40 AM mixer." },
        { q: "Is there an entry fee?", a: "None. Attendance, lunch, coffee stations, and mentors are 100% free. Capacity is limited to ensure a high-quality environment." },
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
    ctaAplicar: "Inscrever-se no hackathon",
    ctaVerBases: "Ver kits e tracks",
    ctaWhatsapp: "Comunidade no WhatsApp",
    estadoInscripciones: "Inscrições abertas até terça-feira, 10 de novembro de 2026, às 23:59 (horário de Bogotá).",
    premiosPodio: [
      {
        posicion: "1º Lugar",
        monto: "COP $1.500.000",
        titulo: "Protótipo de Maior Impacto Defensivo",
        descripcion: "Concedido ao projeto com a maior pontuação em funcionalidade, rigor empírico e mitigação de ameaças de IA.",
        icono: "🥇",
        color: "oro",
        extra: "Troféu CyberBear + Menção Honrosa Uniandes",
      },
      {
        posicion: "2º Lugar",
        monto: "COP $1.000.000",
        titulo: "Segundo Finalista",
        descripcion: "Concedido à equipe vice-campeã com destacada profundidade técnica e avaliação comparativa em benchmarks.",
        icono: "🥈",
        color: "plata",
        extra: "Certificado de Honra e Acesso Prioritário a Bolsas",
      },
      {
        posicion: "3º Lugar",
        monto: "COP $500.000",
        titulo: "Terceiro Finalista Destacado",
        descripcion: "Concedido à terceira equipe finalista com abordagem inovadora e sólida evidência técnica.",
        icono: "🥉",
        color: "bronce",
        extra: "Certificado de Honra e Rede de Mentorias",
      },
    ],
    premioDifusion: {
      posicion: "Prêmio Especial",
      monto: "COP $200.000",
      titulo: "Divulgação e Comunicação Técnica",
      descripcion: "Concedido ao participante ou equipe que publicar o melhor fio técnico, vídeo explicativo ou artigo sobre sua solução nas redes sociais.",
      icono: "📢",
      color: "coral",
      extra: "Destaque nos canais da AI Safety Colombia",
    },
    sidebar: {
      titulo: "CyberBear Hackathon 2026",
      fechaRotulo: "Data",
      fechaValor: "Sábado, 14 de novembro de 2026",
      horarioRotulo: "Horário",
      horarioValor: "8:00 às 20:00 (7 h de hackathon)",
      lugarRotulo: "Local",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Formato",
      formatoValor: "Presencial · Equipes de 2 a 4 ou individual",
      cupoRotulo: "Vagas",
      cupoValor: "Vagas limitadas · Inscrição prévia obrigatória",
      premiosRotulo: "Prêmios",
      premiosValor: "Mais de COP 3.200.000 em dinheiro",
      comidaRotulo: "Alimentação",
      comidaValor: "Almoço completo e lanches contínuos inclusos",
      organizanRotulo: "Organização",
    },
    pestañas: {
      resumen: "O desafio",
      tracks: "Starter kits e tracks",
      reglas: "Prêmios e avaliação",
      cronograma: "Agenda e FAQ",
    },
    resumen: {
      ideaTitulo: "A ideia: aceleração defensiva (def/acc)",
      ideaParrafos: [
        "A inteligência artificial barateia o ataque: modelos redigem phishing convincente em segundos, clonam vozes humanas e encontram vulnerabilidades em software em larga escala. Agentes autônomos também podem ser manipulados via injeção indireta de prompts.",
        "A aceleração defensiva propõe construir defesas na mesma velocidade, inclinando a balança a favor de quem defende. O evento é inspirado no Defensive Acceleration Hackathon da Apart Research, adaptado para um dia presencial em Bogotá.",
      ],
      colombiaTitulo: "Relevância Direta na Região",
      colombiaTexto:
        "Na América Latina, ataques de ransomware a órgãos públicos, fraudes com clonagem de voz e desinformação eleitoral são realidades cotidianas. Este evento conecta desafios locais à fronteira global da segurança de IA.",
      retoTitulo: "O Desafio",
      retoTexto:
        "Construir em 7 horas um protótipo funcional de defesa com IA contra uma ameaça real.",
      cuatroRequisitosTitulo: "Os 4 Requisitos de Cada Entrega",
      cuatroRequisitos: [
        "Identificar com clareza a ameaça concreta.",
        "Construir um protótipo funcional demonstrável.",
        "Medir a eficácia com dados e testes concretos.",
        "Explicar limitações técnicas e riscos de uso indevido.",
      ],
      quienTitulo: "Quem Pode Participar?",
      quienPuntos: [
        "Estudantes de graduação e pós-graduação, pesquisadores e profissionais de tecnologia ou políticas públicas.",
        "Equipes de 2 a 4 integrantes. Candidatos individuais formam grupos no início do dia.",
        "Não é exigida experiência prévia em IA: há opções para iniciantes com notebooks prontos.",
        "Vagas limitadas para garantir espaço de trabalho ideal, conectividade e alimentação de qualidade.",
      ],
      premiosTitulo: "Prêmios em Dinheiro · COP $3.200.000+",
      premiosParrafos: [
        "1º Lugar: COP $1.500.000 em dinheiro + Troféu CyberBear institucional.",
        "2º Lugar: COP $1.000.000 em dinheiro + Certificado de Honra e acesso prioritário.",
        "3º Lugar: COP $500.000 em dinheiro + Certificado de Honra e mentoria de pesquisa.",
        "Prêmio especial de divulgação técnica: COP $200.000 para a melhor cobertura ou fio técnico nas redes sociais.",
        "Todos os prêmios em dinheiro são pagos na mesma noite. Projetos destacados recebem conexão prioritária para bolsas de pesquisa na Apart Research e BlueDot Impact.",
      ],
      mascotaTitulo: "Nosso Mascote: O Urso-de-Óculos",
      mascotaTexto:
        "O urso-de-óculos (Tremarctos ornatus) é o único urso nativo da América do Sul. Suas manchas ao redor dos olhos simbolizam enxergar as ameaças antes que causem danos.",
    },
    kits: {
      introTitulo: "Um Único Ranking com 3 Níveis de Partida",
      introTexto:
        "Todos competem sob a mesma régua de avaliação. Kits com notebooks e bases prontas eliminam tempo perdido de instalação:",
      listaKits: [
        {
          nivel: "Para iniciantes",
          etiqueta: "Proteger as Pessoas",
          audiencia: "Equipes com noções básicas de Python",
          ejemplos: "Detecção de phishing em espanhol, verificação de procedência C2PA e detecção de vozes clonadas.",
        },
        {
          nivel: "Intermediário",
          etiqueta: "Proteger a IA",
          audiencia: "Experiência com APIs de LLM e arquiteturas MCP",
          ejemplos: "Defesa contra injeção de prompt em ferramentas MCP e monitores de raciocínio de agentes.",
        },
        {
          nivel: "Avançado",
          etiqueta: "Proteger Sistemas e Infraestrutura",
          audiencia: "Engenheiros de segurança e analistas de políticas",
          ejemplos: "Triagem de ameaças (CTI), geração de regras Sigma e modelos de ameaça SL1–SL5 para data centers.",
        },
      ],
      tracksTitulo: "Os 5 Frentes de Pesquisa",
      tracksTexto:
        "Escolha qualquer um destes temas para guiar seu projeto:",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Agentes de IA Resilientes a Injeção",
          resumen: "Defesas contra prompt injection indireto em ferramentas MCP.",
          paraEmpezar: "Criar validador de descrições MCP testado no benchmark MCPTox.",
          conExperiencia: "Desenvolver defesas avaliadas nos benchmarks AgentDojo e AgentDyn.",
          recursos: [
            { label: "MCPTox Benchmark", url: "https://github.com/zhiqiangwang4/MCPTox-Benchmark" },
            { label: "AgentDojo", url: "https://github.com/ethz-spylab/agentdojo" },
            { label: "AgentDyn", url: "https://github.com/SaFo-Lab/AgentDyn" },
          ],
        },
        {
          id: "track-2",
          numero: "02",
          titulo: "Detecção de Fraude e Desinformação",
          resumen: "Phishing, clones de voz e mídia sintética gerada por modelos.",
          paraEmpezar: "Detector de phishing no dataset SpaPhish ou verificador C2PA.",
          conExperiencia: "Testar detectores de voz sintética AASIST sob compressão de áudio do WhatsApp.",
          recursos: [
            { label: "SpaPhish", url: "https://data.mendeley.com/datasets/hz2d6gz7pc" },
            { label: "c2pa-python", url: "https://github.com/contentauth/c2pa-python" },
            { label: "AASIST", url: "https://github.com/clovaai/aasist" },
            { label: "In-the-Wild", url: "https://huggingface.co/datasets/mueller91/In-The-Wild" },
          ],
        },
        {
          id: "track-3",
          numero: "03",
          titulo: "IA para Equipes de Ciberdefesa",
          resumen: "Apoio a analistas de SOC e inteligência de ameaças.",
          paraEmpezar: "Medir desempenho de LLMs em tarefas de CTI em espanhol com CTIBench.",
          conExperiencia: "Geração de regras Sigma validadas com pySigma.",
          recursos: [
            { label: "CTIBench", url: "https://huggingface.co/datasets/AI4Sec/cti-bench" },
            { label: "SigmaHQ", url: "https://github.com/SigmaHQ/sigma" },
            { label: "pySigma", url: "https://github.com/SigmaHQ/pySigma" },
          ],
        },
        {
          id: "track-4",
          numero: "04",
          titulo: "Monitoramento e Controle de Agentes",
          resumen: "Supervisão e auditoria de modelos na fronteira de pesquisa.",
          paraEmpezar: "Escrever testes com o framework Inspect (UK AISI).",
          conExperiencia: "Construir monitores em ControlArena para detectar sabotagem de agentes.",
          recursos: [
            { label: "Inspect Framework", url: "https://inspect.aisi.org.uk/" },
            { label: "ControlArena", url: "https://github.com/UKGovernmentBEIS/control-arena" },
            { label: "OpenAI Monitorability", url: "https://github.com/openai/monitorability-evals" },
            { label: "DafnyBench", url: "https://github.com/sun-wendy/DafnyBench" },
          ],
        },
        {
          id: "track-5",
          numero: "05",
          titulo: "Infraestrutura de IA e Políticas Públicas",
          resumen: "Padrões de segurança para data centers e regulamentação (No-Code).",
          paraEmpezar: "Modelo de ameaças para data centers usando níveis SL1 a SL5 da RAND.",
          conExperiencia: "Proposta de exigências regulatórias para órgãos públicos.",
          recursos: [
            { label: "Securing Weights (RAND)", url: "https://www.rand.org/pubs/research_reports/RRA2849-1.html" },
            { label: "Padrão SL5", url: "https://sl5.org/sl5-standard" },
          ],
        },
      ],
    },
    reglas: {
      tituloSeguridad: "Regras de Segurança e Uso Responsável",
      reglasSeguridad: [
        "Proibido atacar sistemas reais de terceiros sem autorização formal (Lei 1273/2009).",
        "Não entregar ferramentas puramente ofensivas ou exploits não remediados.",
        "Sem biologia de bancada: biossegurança apenas como proposta regulatória no Track 5.",
        "Dados pessoais sempre anonimizados ou sintéticos.",
        "Citação e transparência obrigatória de todo código e modelos utilizados.",
      ],
      entregablesTitulo: "Entregáveis da Equipe",
      entregablesHora: "Prazo final: Sábado, 14 de novembro, às 17:00",
      entregables: [
        "Repositório no GitHub ou Colab com instruções de execução.",
        "Ficha técnica de uma página com o resumo da solução e resultados.",
        "Vídeo opcional de até 2 minutos demonstrando o protótipo.",
      ],
      criteriosTitulo: "Critérios de Avaliação",
      criteriosTexto: "Avaliação técnica em 5 critérios ponderados:",
      criterios: [
        { nombre: "Funcionamento do Protótipo", peso: "30%", descripcion: "Implementação funcional e operacional." },
        { nombre: "Evidência Empírica", peso: "25%", descripcion: "Métricas e validação com dados concretos." },
        { nombre: "Relevância da Ameaça", peso: "20%", descripcion: "Impacto prático para quem defende." },
        { nombre: "Uso Responsável", peso: "15%", descripcion: "Consciência de limitações e riscos duais." },
        { nombre: "Apresentação e Clareza", peso: "10%", descripcion: "Qualidade da ficha e síntese." },
      ],
      finalistasTitulo: "Finalistas ao Vivo",
      finalistasTexto:
        "Às 19:00, os 5 melhores projetos apresentam pitches de 4 minutos perante a banca. Premiação às 19:25.",
      juradosTitulo: "Jurados Confirmados",
      juradosTexto: "Banca independente de cibersegurança e IA:",
      jurados: [
        {
          nombre: "Yuri Andrea Pinto",
          rol: "Jurada Técnica",
          afiliacion: "Mestrado em Segurança da Informação (MESI), Uniandes",
          bio: "Pesquisadora em gestão de incidentes e segurança computacional.",
          confirmado: true,
        },
        {
          nombre: "Carlos Andrés Lozano",
          rol: "Jurado Técnico",
          afiliacion: "IEEE Computer Society, Uniandes",
          bio: "Desenvolvedor e líder de projetos de software no IEEE Uniandes.",
          confirmado: true,
        },
        {
          nombre: "Mentores e Jurados Adicionais",
          rol: "A confirmar",
          afiliacion: "Indústria & Laboratórios de IA",
          bio: "Mentoria durante toda a jornada.",
          confirmado: false,
        },
      ],
    },
    cronograma: {
      titulo: "Cronograma de Sábado, 14 de Novembro",
      subtitulo: "Universidad de los Andes, Bogotá",
      agenda: [
        { hora: "08:00", actividad: "Credenciamento e Café", detalle: "Recepção, crachás com CyberBear e mesas." },
        { hora: "09:00", actividad: "Abertura Oficial", detalle: "Boas-vindas, regras e apresentação dos kits." },
        { hora: "09:40", actividad: "Formação de Equipes", detalle: "Agrupamento de participantes individuais." },
        { hora: "10:00", actividad: "Início do Hackathon", detalle: "Início da construção com apoio dos mentores.", destacado: true },
        { hora: "13:00", actividad: "Almoço Servido", detalle: "Almoço completo servido no campus para os participantes.", destacado: true },
        { hora: "17:00", actividad: "Encerramento das Entregas", detalle: "Envio do repositório e ficha de 1 página.", destacado: true },
        { hora: "17:00 às 19:00", actividad: "Avaliação e Palestras", detalle: "Avaliação dos jurados e palestras curtas da comunidade." },
        { hora: "19:00", actividad: "Pitches dos 5 Finalistas", detalle: "4 minutos por equipe perante os jurados.", destacado: true },
        { hora: "19:25", actividad: "Premiação", detalle: "Entrega dos prêmios em dinheiro aos vencedores.", destacado: true },
        { hora: "19:45", actividad: "Foto Coletiva e Encerramento", detalle: "Foto com o mascote CyberBear." },
      ],
      calendarioPrevioTitulo: "Datas Importantes",
      calendarioPrevio: [
        { fecha: "Segunda, 2 nov", hito: "Abertura das inscrições públicas." },
        { fecha: "Terça, 10 nov (23:59)", hito: "Fechamento estrito das inscrições." },
        { fecha: "11 a 13 nov", hito: "Seleção e envio de acessos ao campus." },
        { fecha: "Sábado, 14 nov", hito: "Hackathon presencial na Uniandes (8:00 às 20:00)." },
      ],
      faqTitulo: "Perguntas Frequentes",
      faqs: [
        { q: "Posso participar sem equipe?", a: "Sim, formaremos equipes de 2 a 4 pessoas no início do evento." },
        { q: "Há algum custo?", a: "Nenhum. Participação 100% gratuita com almoço completo, lanches e mentores inclusos. Vagas limitadas por capacidade." },
        { q: "Qual o nível de programação necessário?", a: "Há kits para todos os níveis, incluindo opções sem código no Track 5." },
        { q: "O que devo levar?", a: "Notebook, carregador, documento de identificação original e garrafa de água." },
      ],
    },
  },
};
