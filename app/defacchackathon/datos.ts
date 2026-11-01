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
    estadoInscripciones: "Inscripciones abiertas hasta el martes 10 de noviembre de 2026 a las 11:59 p. m.",
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
    premioDifusion: {
      puesto: "Premio especial por difusión",
      monto: "Por definir",
      detalle: "Reconocimiento a la mejor cobertura o hilo técnico de divulgación en redes sociales",
    },
    sidebar: {
      titulo: "Detalles del evento",
      fechaRotulo: "Fecha",
      fechaValor: "Sábado 14 de noviembre de 2026",
      horarioRotulo: "Horario",
      horarioValor: "8:00 a. m. a 8:00 p. m. (7 h de trabajo)",
      lugarRotulo: "Lugar",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Formato",
      formatoValor: "Presencial · Equipos de 2 a 4 o individual",
      cupoRotulo: "Cupo",
      cupoValor: "Cupo limitado por aforo",
      premiosRotulo: "Premios",
      premiosValor: "COP 2.000.000 en total",
      comidaRotulo: "Alimentación",
      comidaValor: "Almuerzo incluido en sala",
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
      cuatroRequisitosTitulo: "Las 4 preguntas clave de cada entrega",
      cuatroRequisitos: [
        "La amenaza concreta: definir con precisión qué vector de ataque o riesgo de IA busca mitigar el proyecto.",
        "El mecanismo defensivo: construir la herramienta, filtro o arquitectura diseñada para neutralizar la amenaza.",
        "Validación empírica: probar la efectividad con datos, benchmarks o casos de prueba concretos (tasa de detección, falsos positivos).",
        "Límites y riesgo dual: documentar con honestidad dónde falla la defensa y verificar que la herramienta no pueda ser usada para atacar.",
      ],
      quienTitulo: "¿Quién puede participar?",
      quienPuntos: [
        "Estudiantes universitarios de cualquier semestre y carrera, investigadores y profesionales de la industria o el sector público.",
        "Equipos de 2 a 4 personas. Quien aplique solo podrá conformar equipo durante la dinámica de bienvenida a las 9:40 a. m.",
        "No hace falta ser experto en IA: cada track cuenta con kits de inicio para principiantes (resolubles con Python básico, un notebook en Colab o análisis de política sin programar).",
        "Cupo limitado por aforo para garantizar un espacio de trabajo óptimo, conectividad y alimentación.",
      ],
      premiosTitulo: "Premios · COP 2.000.000 en total",
      premiosParrafos: [
        "La organización entrega COP 2.000.000 en premios a los tres primeros lugares (1.000.000 al primer puesto, 500.000 al segundo y 500.000 al tercero).",
        "La deliberación y anuncios de ganadores se realizan al cierre de la jornada tras la evaluación del jurado. El pago se coordina directamente con los representantes designados de los equipos finalistas.",
        "Premio especial por difusión en redes: la organización definirá un incentivo adicional para el participante o equipo que publique el mejor hilo técnico o reporte de divulgación sobre su prototipo.",
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
      tracksTitulo: "Los 5 frentes temáticos",
      tracksTexto:
        "Los frentes están diseñados alrededor de las prioridades de aceleración defensiva (def/acc) en seguridad de IA: proteger agentes autónomos, supervisar sistemas no confiables, automatizar la ciberdefensa con código verificable, blindar el ecosistema epistémico y asegurar la infraestructura y gobernanza de IA.",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Seguridad de agentes y defensa contra inyección de instrucciones",
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
          titulo: "Control de IA, monitoreo y detección de sabotaje",
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
          titulo: "Ciberdefensa automatizada y verificación formal de software",
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
          titulo: "Defensa epistémica, autenticidad criptográfica y detección de suplantación",
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
          titulo: "Seguridad de infraestructura de IA y gobernanza defensiva (No-Code)",
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
        "A las 7:00 p. m., tras la deliberación técnica de los jurados, se anuncian los 5 mejores proyectos de la jornada. Cada equipo finalista realiza un pitch en vivo de 4 minutos ante el salón completo y a las 7:25 p. m. el jurado anuncia los tres primeros puestos.",
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
      titulo: "Agenda de la jornada",
      subtitulo: "Sábado 14 de noviembre en la Universidad de los Andes, Bogotá",
      agenda: [
        { hora: "08:30 a. m.", actividad: "Registro e ingreso al campus", detalle: "Control de acceso en portería de Uniandes y ubicación de los equipos." },
        { hora: "09:00 a. m.", actividad: "Apertura y presentación del reto", detalle: "Presentación de los frentes de investigación, criterios de evaluación y kits de inicio." },
        { hora: "10:00 a. m.", actividad: "Inicio del sprint de desarrollo", detalle: "Trabajo continuo de los equipos con acompañamiento de mentores en sala.", destacado: true },
        { hora: "05:00 p. m.", actividad: "Cierre de entregas", detalle: "Entrega del repositorio con código ejecutable y la ficha técnica de una página.", destacado: true },
        { hora: "07:00 p. m.", actividad: "Pitches de finalistas y premiación", detalle: "Presentación de los proyectos con mayor puntaje ante el jurado y anuncio de los ganadores.", destacado: true },
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
          a: "Los proyectos se entregan a las 5:00 p. m. (repositorio + ficha técnica de 1 página). Los 5 con mejor puntaje presentan 4 minutos en vivo a las 7:00 p. m. Los tres primeros lugares reciben COP 1.000.000, COP 500.000 y COP 500.000.",
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
    estadoInscripciones: "Applications open until Tuesday, November 10, 2026, 11:59 PM COT.",
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
    premioDifusion: {
      puesto: "Special Outreach Award",
      monto: "TBD",
      detalle: "Recognition for the best technical thread or breakdown on social media",
    },
    sidebar: {
      titulo: "Event Details",
      fechaRotulo: "Date",
      fechaValor: "Saturday, November 14, 2026",
      horarioRotulo: "Hours",
      horarioValor: "8:00 AM – 8:00 PM (7h sprint)",
      lugarRotulo: "Venue",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Format",
      formatoValor: "In-person · Teams of 2 to 4 or solo",
      cupoRotulo: "Capacity",
      cupoValor: "Limited capacity · Prior application required",
      premiosRotulo: "Prizes",
      premiosValor: "COP 2,000,000 total",
      comidaRotulo: "Catering",
      comidaValor: "Lunch included on-site",
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
      cuatroRequisitosTitulo: "The 4 Core Questions for Every Submission",
      cuatroRequisitos: [
        "The concrete threat: clearly define which AI threat or attack vector you are mitigating.",
        "The defensive mechanism: build the working tool, filter, or architecture that contains the threat.",
        "Empirical validation: evaluate effectiveness with benchmarks, simulated attacks, or quantitative tests.",
        "Limitations & dual-use: honestly document failure modes and ensure the defense cannot be weaponized.",
      ],
      quienTitulo: "Who Can Join?",
      quienPuntos: [
        "Undergraduate & graduate students from any discipline, researchers, software engineers, and public policy practitioners.",
        "Teams of 2 to 4. Solo applicants are grouped at the opening mixer at 9:40 AM.",
        "No prior AI research experience required: beginner kits allow progress using basic Python or policy analysis without code.",
        "Limited capacity to ensure high-quality mentoring, space, and catering.",
      ],
      premiosTitulo: "Prizes · COP 2,000,000 total",
      premiosParrafos: [
        "The organizers award COP 2,000,000 in total prizes across the top three places (COP 1,000,000 for 1st place, COP 500,000 for 2nd, and COP 500,000 for 3rd).",
        "Judging deliberations and winner announcements take place at the end of the event. Payment is coordinated directly with the designated team representatives.",
        "Special social outreach award: an additional recognition will be defined for the participant or team publishing the best technical write-up or breakdown.",
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
      tracksTitulo: "The 5 Research Tracks",
      tracksTexto:
        "These tracks are structured around core Defensive Acceleration (def/acc) priorities in AI Safety: securing autonomous agents, monitoring untrusted systems, automating cyberdefense with formal verification, protecting epistemic integrity, and securing AI infrastructure and governance.",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Agent Security & Indirect Prompt Injection Defense",
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
          titulo: "AI Control, Oversight & Sabotage Detection",
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
          titulo: "Automated Cyberdefense & Formal Software Verification",
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
          titulo: "Epistemic Defense, Cryptographic Provenance & Impersonation Detection",
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
          titulo: "AI Infrastructure Security & Defensive Governance (No-Code)",
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
        "At 7:00 PM, the top 5 teams deliver 4-minute live pitches before the assembly, and at 7:25 PM the judges announce the three winning teams.",
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
      titulo: "Day Agenda",
      subtitulo: "Saturday, November 14, 2026 at Universidad de los Andes, Bogotá",
      agenda: [
        { hora: "08:30 AM", actividad: "Check-in & Campus Access", detalle: "Access control at Uniandes security gates and team desk setup." },
        { hora: "09:00 AM", actividad: "Opening Ceremony & Challenge Brief", detalle: "Presentation of research tracks, evaluation criteria, and starter kits." },
        { hora: "10:00 AM", actividad: "Sprint Begins", detalle: "Focused build sprint with on-site mentor support.", destacado: true },
        { hora: "05:00 PM", actividad: "Submission Cutoff", detalle: "Strict deadline: repository with runnable code + one-page summary sheet.", destacado: true },
        { hora: "07:00 PM", actividad: "Finalist Pitches & Awards", detalle: "Top-scoring projects present live to judges, followed by the awards ceremony.", destacado: true },
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
    estadoInscripciones: "Inscrições abertas até terça-feira, 10 de novembro de 2026, às 23:59 (horário de Bogotá).",
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
    premioDifusion: {
      puesto: "Prêmio especial de divulgação",
      monto: "A definir",
      detalle: "Reconhecimento à melhor cobertura ou fio técnico nas redes sociais",
    },
    sidebar: {
      titulo: "Detalhes do evento",
      fechaRotulo: "Data",
      fechaValor: "Sábado, 14 de novembro de 2026",
      horarioRotulo: "Horário",
      horarioValor: "8:00 às 20:00 (7 h de trabalho)",
      lugarRotulo: "Local",
      lugarValor: "Universidad de los Andes, Bogotá",
      formatoRotulo: "Formato",
      formatoValor: "Presencial · Equipes de 2 a 4 ou individual",
      cupoRotulo: "Vagas",
      cupoValor: "Vagas limitadas · Inscrição prévia",
      premiosRotulo: "Prêmios",
      premiosValor: "COP 2.000.000 no total",
      comidaRotulo: "Alimentação",
      comidaValor: "Almoço incluso no local",
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
      cuatroRequisitosTitulo: "As 4 perguntas essenciais de cada entrega",
      cuatroRequisitos: [
        "A ameaça concreta: identificar qual vetor de ataque ou risco de IA se busca mitigar.",
        "O mecanismo defensivo: construir a ferramenta, filtro ou arquitetura que contém a ameaça.",
        "Validação empírica: testar a eficácia com dados, ataques simulados ou métricas concretas.",
        "Limites e risco dual: documentar com honestidade onde a defesa falha e prevenir o uso indevido.",
      ],
      quienTitulo: "Quem Pode Participar?",
      quienPuntos: [
        "Estudantes de graduação e pós-graduação, pesquisadores e profissionais de tecnologia ou políticas públicas.",
        "Equipes de 2 a 4 integrantes. Candidatos individuais formam grupos no início do dia.",
        "Não é exigida experiência prévia em IA: há opções para iniciantes com notebooks prontos.",
        "Vagas limitadas para garantir espaço de trabalho ideal, conectividade e alimentação.",
      ],
      premiosTitulo: "Prêmios · COP 2.000.000 no total",
      premiosParrafos: [
        "A organização distribui COP 2.000.000 em prêmios para os três primeiros lugares (COP 1.000.000 para o 1º lugar, COP 500.000 para o 2º e COP 500.000 para o 3º).",
        "A deliberação dos jurados e o anúncio dos vencedores ocorrem no encerramento da jornada. O pagamento é coordenado diretamente com os representantes das equipes finalistas.",
        "Prêmio especial de divulgação: a organização definirá um reconhecimento adicional para a equipe ou participante que publicar o melhor fio técnico ou artigo sobre seu prototipo.",
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
      tracksTitulo: "Os 5 Frentes de Pesquisa",
      tracksTexto:
        "Os frentes são estruturados em torno das prioridades de aceleração defensiva (def/acc) em segurança de IA: proteger agentes autônomos, supervisionar modelos não confiáveis, automatizar a ciberdefesa com verificação formal, proteger o ecossistema epistêmico e garantir a governança e infraestrutura de IA.",
      listaTracks: [
        {
          id: "track-1",
          numero: "01",
          titulo: "Segurança de Agentes e Defesa contra Injeção de Instruções",
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
          titulo: "Controle de IA, Supervisão e Detecção de Sabotagem",
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
          titulo: "Ciberdefesa Automatizada e Verificação Formal de Software",
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
          titulo: "Defesa Epistêmica, Autenticidade Criptográfica e Detecção de Fraude",
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
          titulo: "Segurança de Infraestrutura de IA e Governança Defensiva (No-Code)",
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
      titulo: "Agenda da jornada",
      subtitulo: "Sábado, 14 de novembro na Universidad de los Andes, Bogotá",
      agenda: [
        { hora: "08:30", actividad: "Credenciamento e Entrada no Campus", detalle: "Controle de acesso nas portarias da Uniandes e acomodação das equipes." },
        { hora: "09:00", actividad: "Abertura Oficial e Apresentação do Desafio", detalle: "Apresentação dos frentes de pesquisa, critérios de avaliação e kits de início." },
        { hora: "10:00", actividad: "Início do Sprint de Desenvolvimento", detalle: "Trabalho prático das equipes com mentoria presencial nas salas.", destacado: true },
        { hora: "17:00", actividad: "Encerramento das Entregas", detalle: "Envio do repositório com código executável e ficha técnica de 1 página.", destacado: true },
        { hora: "19:00", actividad: "Pitches dos Finalistas e Premiação", detalle: "Apresentação dos projetos finalistas perante os jurados e anúncio dos vencedores.", destacado: true },
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
