/** Eventos pasados de AI Safety Colombia. `type` alimenta los filtros. */
export type PastEvent = {
  date: string;
  type: string;
  title: string;
  desc: string;
  venue: string;
  url: string | null;
};

export const PAST_EVENTS: PastEvent[] = [
  {
    date: "17 de abril de 2026, 6:00 p. m.",
    type: "Cena",
    title: "Colombia e IA: la política detrás de la tecnología",
    desc: "Cena de diálogo con Viviana Vanegas (consultora TIC de la Unión Europea, ex-directora de Desarrollo Digital del DNP) y Hugo Arenas (asesor del despacho de la Ministra TIC, ex-coordinador del CONPES de IA), sobre cómo se construyó la política nacional de IA de Colombia.",
    venue: "Restaurante Origen Bistro, Bogotá",
    url: "https://www.instagram.com/aisafetycolombia/p/DXNOo7DljSh/",
  },
  {
    date: "15 de agosto de 2025, 5:00 p. m.",
    type: "Charla",
    title: "Del algoritmo a la ley: beneficios, riesgos y cómo auditar la IA",
    desc: "Conversatorio sobre los beneficios, riesgos técnicos y efectos legales del uso de la IA, con Catalina Bernal y Melissa Robles (Quantil) y Natalia Alarcón (Posse Herrera Ruiz).",
    venue: "Salón Aulas 203, Universidad de los Andes",
    url: "https://www.instagram.com/aisafetycolombia/p/DNOyrukPEnp/",
  },
  {
    date: "30 de mayo de 2025",
    type: "Conversatorio",
    title: "AI Safety Connect: Latinoamérica y más allá",
    desc: "Discusión en línea con Luis E. Urtubey (Good Judgement) sobre gobernanza de IA en Brasil y Nikolaus Howe (Mila / FAR AI) sobre cómo el escalamiento de modelos afecta la seguridad de la IA. Evento en inglés, 14:00 GMT.",
    venue: "En línea",
    url: "https://www.instagram.com/aisafetycolombia/p/DKIQoQhvoQN/",
  },
  {
    date: "7 de marzo de 2025, 5:30 p. m.",
    type: "Cena",
    title: "Cena con Juan David Gutiérrez",
    desc: "Cena de diálogo con Juan David Gutiérrez, profesor de la Escuela de Gobierno de Uniandes, PhD de Oxford y miembro del Global Partnership on AI, sobre regulación de la IA y política pública.",
    venue: "Restaurante Mangiamo, Bogotá",
    url: "https://www.instagram.com/aisafetycolombia/p/DGysBZPvyUb/",
  },
  {
    date: "8 de noviembre de 2024, 6:00 p. m.",
    type: "Panel",
    title: "Panel: Gobernanza de la Inteligencia Artificial en Colombia",
    desc: "Panel sobre el desarrollo ético y responsable de la IA en Colombia, con María Antonia Carvajal (IN SITU), María Paula Mujica (UNDP) y Valeria Soler (Women in AI).",
    venue: "Salón ML-510, Universidad de los Andes",
    url: "https://www.instagram.com/aisafetycolombia/p/DCAiVLnvGpN/",
  },
  {
    date: "7 de octubre de 2024, 6:00 p. m.",
    type: "Cena",
    title: "Cena con María Paula Mujica",
    desc: "Cena de diálogo con María Paula Mujica, asesora de políticas de IA en el UNDP y autora del Marco Ético para la Inteligencia Artificial en Colombia.",
    venue: "Crepes & Waffles, Bogotá",
    url: "https://www.instagram.com/aisafetycolombia/p/DAttjF_Ro76/",
  },
  {
    date: "20 de septiembre de 2024, 6:00 p. m.",
    type: "Charla",
    title: "El valor de la humanidad ante la superinteligencia artificial",
    desc: "Charla con Said Saillant, PhD en Filosofía del MIT e investigador postdoctoral en Harvard, sobre los dilemas éticos del desarrollo de superinteligencias.",
    venue: "Universidad de los Andes",
    url: "https://www.instagram.com/aisafetycolombia/p/C_0sc3mOlfX/",
  },
];
