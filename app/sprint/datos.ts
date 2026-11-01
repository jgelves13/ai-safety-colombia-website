import type { Idioma } from "@/lib/idiomas";

/* Datos del sprint que usan la página, el formulario y la ruta de la API.
   Viven acá para que la fecha de cierre no quede escrita en tres lugares. */

export const APART_SPRINT_URL =
  "https://apartresearch.com/sprints/ai-incident-response-sprint-2026-09-11-to-2026-09-13?utm_source=aisafetycolombia";

/* Apart explica ahí la ruta completa: del sprint al Studio y del Studio a la
   beca. Va enlazado cada vez que la página nombra la beca. */
export const APART_FELLOWSHIP_URL =
  "https://apartresearch.com/news/explaining-the-apart-research-fellowships";

/* El grupo de WhatsApp de la comunidad, el mismo que enlazan el inicio y Únete.
   No confundir con GRUPO_WHATSAPP, que es el del sprint y solo para quien quedó.
   Ahora que el hub cerró, este es por donde quien participa en línea arma equipo
   con otra gente en Colombia. */
export const GRUPO_COMUNIDAD = "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF";

/* Cierre de aplicaciones al hub en Bogotá: domingo 6 de septiembre de 2026,
   11:59 p. m. hora de Colombia (UTC-5). Ya pasó, así que el texto anuncia el
   cierre y manda a las dos puertas que siguen abiertas: el registro en línea
   con Apart y el grupo de WhatsApp, que es donde se arma equipo. */
export const CIERRE_ISO = "2026-09-07T04:59:59.999Z";
export const CIERRE_TEXTO_IDIOMA: Record<Idioma, string> = {
  es: "Las aplicaciones al hub de Bogotá ya cerraron. Aún puedes participar en línea con Apart y unirte al grupo de WhatsApp para formar equipo y recibir mentoría de nuestro hub.",
  en: "Applications to the Bogotá hub are closed. You can still take part online with Apart and join the WhatsApp group to form a team and get mentorship from our hub.",
  pt: "As inscrições para o hub de Bogotá já encerraram. Você ainda pode participar on-line com a Apart e entrar no grupo de WhatsApp para formar equipe e receber mentoria do nosso hub.",
};
export const CIERRE_TEXTO = CIERRE_TEXTO_IDIOMA.es;

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

export const EQUIPO_FORM = [
  { id: "solo", label: "Aplico solo y quiero que me ayuden a armar equipo" },
  { id: "equipo", label: "Aplico con un equipo ya armado" },
] as const;

/* El fin de semana solo funciona si el equipo esta completo los tres dias.
   Preguntarlo antes de seleccionar sale mas barato que descubrirlo el viernes. */
export const DISPONIBILIDAD_FORM = [
  { id: "seguro", label: "Seguro: ya lo tengo bloqueado" },
  { id: "casi", label: "Casi seguro: me falta confirmar algo" },
  { id: "parcial", label: "Solo puedo una parte del fin de semana" },
  { id: "no_se", label: "Todavia no lo se" },
] as const;

/* ---------------------------------------------------------------------------
   Confirmación de quienes quedaron seleccionados.

   La página /sprint/confirmar no está enlazada en ningún lado: se llega por el
   enlace firmado que va en el correo de aceptación. Todo lo que la página, la
   ruta de la API y el script de correos necesitan saber sobre fechas y lugar
   vive acá, por la misma razón que el cierre de aplicaciones.
   --------------------------------------------------------------------------- */

/* Los enlaces firmados no caducan. Hubo un cierre por fecha hasta el 9 de
   septiembre de 2026 y se quitó: al vencer, todos los enlaces del correo se
   apagaban a la vez y quien llegaba tarde encontraba una página muerta en vez
   de un formulario. El plazo se comunica por correo, y la fila que entra
   despues trae su propio `confirmed_at` para saber cuándo llegó. */
export const CONFIRMA_LLAMADO = "Confirma tu cupo en el sprint.";

/* El grupo del sprint es distinto del de la comunidad: acá solo entra quien
   quedó seleccionado, y es por donde sale toda la logística del fin de semana. */
export const GRUPO_WHATSAPP = "https://chat.whatsapp.com/K22KSUQeM1158NZBVrPPsB";

/* La dirección no está publicada en /sprint a propósito: sale por correo solo a
   quienes quedaron. El viernes arranca a las 5 p. m.; sábado y domingo son días
   completos. */
export const SEDE = "Calle 98 # 11B-48, Bogotá";
export const ARRANQUE = "viernes 11 de septiembre a las 5:00 p. m.";
export const COMPROMISO_HORARIO =
  "Estaré en el hub el viernes 11 desde las 5:00 p. m., y el sábado 12 y el domingo 13 completos.";

/* Las fechas tal como van en el encabezado de /sprint/confirmar. */
export const FECHAS = "Del viernes 11 al domingo 13 de septiembre de 2026";
