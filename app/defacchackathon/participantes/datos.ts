/* Tipos y etiquetas compartidos entre la página (servidor) y la rejilla (cliente). */

export type Frente = "track-1" | "track-2" | "track-3" | "track-4" | "track-5" | "track-6";

export const FRENTES: Record<Frente, string> = {
  "track-1": "Seguridad de agentes",
  "track-2": "Control de IA",
  "track-3": "Ciberdefensa automatizada",
  "track-4": "Defensa epistémica",
  "track-5": "Infraestructura y gobernanza (sin código)",
  "track-6": "Riesgos multiagente",
};

export type Participante = {
  nombre: string;
  afiliacion?: string;
  frente?: Frente;
  problema?: string;
};

export function esFrente(valor: unknown): valor is Frente {
  return typeof valor === "string" && valor in FRENTES;
}
