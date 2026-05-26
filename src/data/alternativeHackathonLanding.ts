export type AlternativeHackathonLanding = {
  eyebrow: string;
  hubTitle: string;
  headline: string;
  meta: string;
  lead: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  panelTitle: string;
  panelFacts: string[];
  finalCtaKicker: string;
  finalCtaTitle: string;
  cards: Array<{
    label: string;
    title: string;
    body: string;
    links?: Array<{ label: string; href: string }>;
  }>;
};

export const alternativeHackathonLanding: AlternativeHackathonLanding = {
  eyebrow: "GLOBAL SOUTH",
  hubTitle: "Bogotá Hub",
  headline: "AI Safety Hackathon",
  meta: "19-21 de junio · Bogotá presencial u online",
  lead:
    "Trabaja en equipo, recibe mentoría y convierte un riesgo real de IA en una entrega de investigación.",
  primaryCta: "Aplica antes del 12 de junio",
  primaryCtaHref:
    "https://apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21?utm_source=hub-bogota",
  secondaryCta: "Ver detalles",
  panelTitle: "Claves",
  panelFacts: [
    "Mentores de OpenAI y Congreso de la República",
    "Mejores proyectos invitados al Apart Research Fellowship",
    "USD 3.000 en premios para LATAM",
  ],
  finalCtaKicker: "Cupos limitados",
  finalCtaTitle: "Aplica antes del 12 de junio para postularte al Bogotá Hub.",
  cards: [
    {
      label: "Fecha",
      title: "19-21 de junio",
      body:
        "Hub presencial en Bogotá, con sede por confirmar en zona Usaquén. Comidas incluidas durante el fin de semana.",
    },
    {
      label: "Formato",
      title: "Bogotá u online",
      body:
        "Cupos limitados para el hub presencial, participación online para el Sur Global y posible apoyo de viaje.",
    },
    {
      label: "Entrega",
      title: "Reporte o hallazgo",
      body:
        "El output puede ser un hallazgo técnico, una evaluación, una herramienta o un memo de gobernanza.",
      links: [
        {
          label: "Ejemplo técnico",
          href: "https://apartresearch.com/project/voyager-selfevolving-ai-control-platform-72m9",
        },
        {
          label: "Ejemplo gobernanza",
          href: "https://apartresearch.com/project/technical-ai-governance-via-an-agentic-bill-of-materials-and-risk-tiering-uuts",
        },
      ],
    },
  ],
};
