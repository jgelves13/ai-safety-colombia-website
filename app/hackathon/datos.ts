/* Datos del sprint que usan la página, el formulario y la ruta de la API.
   Viven acá para que la fecha de cierre no quede escrita en tres lugares. */

export const APART_SPRINT_URL =
  "https://apartresearch.com/sprints/ai-incident-response-sprint-2026-09-11-to-2026-09-13?utm_source=aisafetycolombia";

/* Cierre de aplicaciones al espacio presencial: 6 de septiembre de 2026,
   11:59 p. m. hora de Colombia (UTC-5). */
export const CIERRE_ISO = "2026-09-07T04:59:59.999Z";
export const CIERRE_TEXTO = "Las aplicaciones al espacio presencial cierran el 6 de septiembre, hora de Colombia.";

export function aplicacionesCerradas(ahora: Date = new Date()): boolean {
  return ahora.getTime() > Date.parse(CIERRE_ISO);
}

/* Los cinco frentes del sprint, tal como los define Apart. El id viaja en el
   formulario; la etiqueta es la que ve quien aplica. */
export const TRACKS_FORM = [
  { id: "containment", label: "Estándares de contención" },
  { id: "analysis", label: "Análisis del incidente" },
  { id: "regulatory", label: "Respuesta regulatoria" },
  { id: "communication", label: "Estrategia de comunicación" },
  { id: "open", label: "Track abierto" },
  { id: "either", label: "Todavía no lo tengo claro" },
] as const;

export const VIAJE_FORM = [
  { id: "bogota", label: "Vivo en Bogotá o cerca" },
  { id: "colombia", label: "Vengo de otra ciudad de Colombia" },
  { id: "international", label: "Vengo de fuera de Colombia" },
] as const;
