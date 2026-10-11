/* Lo que necesita la página de confirmación de los seminarios: las fechas, el
   cierre y la cuadrícula semanal donde cada persona marca cuándo puede.

   La cuadrícula es como la de when2meet, pero cada casilla es una sesión
   entera de dos horas, para que quede claro desde ya qué espacio se aparta.
   Las sesiones salen del when2meet que llenaron quienes facilitan
   (when2meet.com/?38943082-hSryD): dentro de cada ventana se escogió un bloque
   de dos horas, alineados entre días para que la cuadrícula tenga pocas filas.
   El técnico lo facilitan Andrés y Helen, que nunca coinciden, así que sus
   bloques se suman; el de futuro y riesgos lo facilita Tomás. Con lo marcado
   y la modalidad se arman las cohortes. En el técnico son tres, una de ellas
   solo en línea.

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

export const DIA_CORTO: Record<Dia, string> = {
  lun: "Lun",
  mar: "Mar",
  mie: "Mié",
  jue: "Jue",
  vie: "Vie",
  sab: "Sáb",
  dom: "Dom",
};

const DURACION_MIN = 120;

type Seminario = {
  nombre: string;
  /** Del lunes de arranque al domingo de cierre. */
  fechas: string;
  semanas: string;
  facilitan: string;
  /** Hora de inicio, en 24 h y hora de Bogotá, de cada sesión de dos horas posible. */
  horarios: Partial<Record<Dia, string[]>>;
};

export const DATOS_SEMINARIO: Record<SeminarioId, Seminario> = {
  tecnico: {
    nombre: "Seminario técnico de seguridad de la IA",
    fechas: "Del 19 de octubre al 29 de noviembre",
    semanas: "seis semanas",
    facilitan: "Andrés Mosquera y Helen Penagos",
    /* Helen: martes y jueves de 1:00 a 4:00, sábado de 1:30 a 5:00. Andrés:
       miércoles de 3:45 a 6:45, viernes de 3:30 a 6:30, sábado de 8:00 a 10:00
       y domingo de 1:00 a 6:30. Helen también puede lunes y miércoles de 10:15
       a 12:00, pero no alcanza para dos horas. */
    horarios: {
      mar: ["14:00"],
      mie: ["16:00"],
      jue: ["14:00"],
      vie: ["16:00"],
      sab: ["08:00", "14:00"],
      dom: ["14:00", "16:00"],
    },
  },
  futuro: {
    nombre: "Seminario de futuro y riesgos de la IA",
    fechas: "Del 19 de octubre al 22 de noviembre",
    semanas: "cinco semanas",
    facilitan: "Tomás Antolinez",
    /* Tomás: de 10:00 a 1:00 todos los días, y de 2:00 a 5:00 todos menos
       martes y miércoles. */
    horarios: {
      lun: ["10:00", "14:00"],
      mar: ["10:00"],
      mie: ["10:00"],
      jue: ["10:00", "14:00"],
      vie: ["10:00", "14:00"],
      sab: ["10:00", "14:00"],
      dom: ["10:00", "14:00"],
    },
  },
};

/** El id de una sesión: día y hora de inicio, p. ej. "sab-14:00". */
export function idHorario(dia: Dia, inicio: string): string {
  return `${dia}-${inicio}`;
}

export function horariosValidos(s: SeminarioId): Set<string> {
  const ids = new Set<string>();
  for (const dia of DIAS)
    for (const inicio of DATOS_SEMINARIO[s].horarios[dia] ?? []) ids.add(idHorario(dia, inicio));
  return ids;
}

/** Los días que tienen alguna sesión, de lunes a domingo: las columnas. */
export function diasDe(s: SeminarioId): Dia[] {
  return DIAS.filter((d) => DATOS_SEMINARIO[s].horarios[d]?.length);
}

/** Las horas de inicio que aparecen en algún día, en orden: las filas. */
export function filasDe(s: SeminarioId): string[] {
  const todas = Object.values(DATOS_SEMINARIO[s].horarios).flat() as string[];
  return [...new Set(todas)].sort((a, b) => aMinutos(a) - aMinutos(b));
}

function aMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function hora12(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")}`;
}

const sufijo = (min: number) => (min < 12 * 60 ? "a. m." : "p. m.");

/** "2:00 a 4:00 p. m.", "11:00 a. m. a 1:00 p. m." */
export function rangoHorario(inicio: string): string {
  const a = aMinutos(inicio);
  const b = a + DURACION_MIN;
  return sufijo(a) === sufijo(b)
    ? `${hora12(a)} a ${hora12(b)} ${sufijo(b)}`
    : `${hora12(a)} ${sufijo(a)} a ${hora12(b)} ${sufijo(b)}`;
}

/** "Sábado, 2:00 a 4:00 p. m." */
export function etiquetaHorario(id: string): string {
  const [dia, inicio] = id.split("-") as [Dia, string];
  return NOMBRE_DIA[dia] ? `${NOMBRE_DIA[dia]}, ${rangoHorario(inicio)}` : id;
}

/** Ordena ids de lunes a domingo y de la mañana a la tarde. */
export function ordenarHorarios(ids: string[]): string[] {
  const clave = (id: string) => {
    const [dia, inicio] = id.split("-");
    return DIAS.indexOf(dia as Dia) * 24 * 60 + aMinutos(inicio);
  };
  return [...ids].sort((x, y) => clave(x) - clave(y));
}

export const MODALIDADES = [
  { id: "presencial", label: "Presencial, en Bogotá." },
  { id: "en-linea", label: "En línea. No puedo ir en persona." },
  { id: "cualquiera", label: "Me sirve cualquiera de las dos." },
] as const;

export type ModalidadId = (typeof MODALIDADES)[number]["id"];
