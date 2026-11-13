// Resumen fiel de la rúbrica oficial (Google Doc). Si el doc cambia, actualizar aquí.
export const RUBRICA_URL = "https://docs.google.com/document/d/19xVIiadLqi-bJ-bxQ71gn37vAGWBYqJ-EvvBQYueU6c/edit";

export type ClaveCriterio = "impacto" | "ejecucion" | "presentacion";

export const NIVELES: Record<ClaveCriterio, string[]> = {
  impacto: ["Insignificante", "Limitado", "Moderado", "Significativo", "Excepcional"],
  ejecucion: ["Con fallas graves", "Débil", "Competente", "Sólido", "Excepcional"],
  presentacion: ["Incomprensible", "Difícil de seguir", "Suficientemente claro", "Bien presentado", "Excepcionalmente claro"],
};

export const NOMBRES_CRITERIO: Record<ClaveCriterio, string> = {
  impacto: "Impacto e innovación",
  ejecucion: "Ejecución",
  presentacion: "Presentación",
};

export const GUIA_RUBRICA = [
  "Evalúa cada dimensión por separado.",
  "3 es trabajo sólido de hackatón, no un aprobado mínimo.",
  "Reserva el 5 para lo excepcional: como mucho 5 a 10 % de los proyectos.",
  "Un proyecto fuera de tema se califica por sus méritos pero no recibe premio.",
];
