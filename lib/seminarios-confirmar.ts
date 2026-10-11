/* Lo que necesita la página de confirmación de los seminarios: las fechas, el
   cierre y los horarios que se pueden votar.

   Los horarios salen del when2meet que llenaron quienes facilitan
   (when2meet.com/?38943082-hSryD), recortados a bloques de dos horas que caben
   enteros en la disponibilidad de cada uno. El técnico lo facilitan Andrés y
   Helen, que nunca coinciden, así que sus horarios se suman; el de futuro y
   riesgos lo facilita Tomás. Las cohortes se arman después, con los votos: tres
   en el técnico, una de ellas solo en línea.

   Este módulo lo importa un componente de cliente. La llave de los enlaces vive
   aparte, en lib/firma-seminario.ts. */

export type SeminarioId = "tecnico" | "futuro";

export const SEMINARIOS: SeminarioId[] = ["tecnico", "futuro"];

/** Miércoles 14 de octubre de 2026, 23:59 en Bogotá. */
export const CIERRE_CONFIRMACION_ISO = "2026-10-14T23:59:59-05:00";
export const CIERRE_CONFIRMACION = "el miércoles 14 de octubre a las 11:59 p. m.";

export function confirmacionCerrada(): boolean {
  return Date.now() > Date.parse(CIERRE_CONFIRMACION_ISO);
}

export const DIAS = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"] as const;
export type Dia = (typeof DIAS)[number];

export const NOMBRE_DIA: Record<Dia, string> = {
  lun: "Lunes",
  mar: "Martes",
  mie: "Miércoles",
  jue: "Jueves",
  vie: "Viernes",
  sab: "Sábado",
  dom: "Domingo",
};

type Seminario = {
  nombre: string;
  /** Lo que va en el kicker y en el acuse: del lunes de arranque al domingo de cierre. */
  fechas: string;
  semanas: string;
  facilitan: string;
  /** Hora de inicio de cada bloque, en formato 24 h, por día. */
  horarios: Partial<Record<Dia, string[]>>;
};

export const DATOS_SEMINARIO: Record<SeminarioId, Seminario> = {
  tecnico: {
    nombre: "Seminario técnico de seguridad de la IA",
    fechas: "Del 19 de octubre al 29 de noviembre",
    semanas: "seis semanas",
    facilitan: "Andrés Mosquera y Helen Penagos",
    horarios: {
      mar: ["13:00", "14:00"],
      mie: ["16:00"],
      jue: ["13:00", "14:00"],
      vie: ["15:30", "16:00"],
      sab: ["08:00", "13:30", "14:00", "15:00"],
      dom: ["13:00", "14:00", "15:00", "16:00"],
    },
  },
  futuro: {
    nombre: "Seminario de futuro y riesgos de la IA",
    fechas: "Del 19 de octubre al 22 de noviembre",
    semanas: "cinco semanas",
    facilitan: "Tomás Antolinez",
    horarios: {
      lun: ["10:00", "11:00", "14:00", "15:00"],
      mar: ["10:00", "11:00"],
      mie: ["10:00", "11:00"],
      jue: ["10:00", "11:00", "14:00", "15:00"],
      vie: ["10:00", "11:00", "14:00", "15:00"],
      sab: ["10:00", "11:00", "14:00", "15:00"],
      dom: ["10:00", "11:00", "14:00", "15:00"],
    },
  },
};

/** El id que viaja a la base: día y hora de inicio, p. ej. "sab-13:30". */
export function idHorario(dia: Dia, inicio: string): string {
  return `${dia}-${inicio}`;
}

export function horariosValidos(s: SeminarioId): Set<string> {
  const ids = new Set<string>();
  for (const dia of DIAS)
    for (const inicio of DATOS_SEMINARIO[s].horarios[dia] ?? []) ids.add(idHorario(dia, inicio));
  return ids;
}

function hora12(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}:00` : `${h12}:${String(m).padStart(2, "0")}`;
}

/** "1:30 a 3:30 p. m.", "11:00 a. m. a 1:00 p. m." */
export function rangoHorario(inicio: string): string {
  const [h, m] = inicio.split(":").map(Number);
  const a = h * 60 + m;
  const b = a + 120;
  const sufijo = (min: number) => (min < 12 * 60 ? "a. m." : "p. m.");
  return sufijo(a) === sufijo(b)
    ? `${hora12(a)} a ${hora12(b)} ${sufijo(b)}`
    : `${hora12(a)} ${sufijo(a)} a ${hora12(b)} ${sufijo(b)}`;
}

/** "Sábado, 1:30 a 3:30 p. m." a partir del id. */
export function etiquetaHorario(id: string): string {
  const [dia, inicio] = id.split("-") as [Dia, string];
  return `${NOMBRE_DIA[dia]}, ${rangoHorario(inicio)}`;
}

export const MODALIDADES = [
  { id: "presencial", label: "Presencial, en Bogotá." },
  { id: "en-linea", label: "En línea. No puedo ir en persona." },
  { id: "cualquiera", label: "Me sirve cualquiera de las dos." },
] as const;

export type ModalidadId = (typeof MODALIDADES)[number]["id"];
