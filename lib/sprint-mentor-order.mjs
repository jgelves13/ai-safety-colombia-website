export const SPRINT_MENTOR_ORDER = [
  "Diego Gómez",
  "Roberto García Alonso",
  "María Lorena Flórez",
  "Camila Beltrán",
  "Liliana Fernández",
  "Luis Cosio",
  "Luis Montoya",
  "Christian Urcuqui",
  "Manuela Chacón",
  "Gerson Quintero",
  "Robert Gómez",
  "Leidy Aldana",
  "Juan Cortés",
];

const positions = new Map(
  SPRINT_MENTOR_ORDER.map((nombre, index) => [nombre, index]),
);

/**
 * @template {{ nombre: string }} T
 * @param {readonly T[]} mentors
 * @returns {T[]}
 */
export function orderSprintMentors(mentors) {
  return mentors.toSorted(
    (a, b) =>
      (positions.get(a.nombre) ?? Number.MAX_SAFE_INTEGER) -
      (positions.get(b.nombre) ?? Number.MAX_SAFE_INTEGER),
  );
}
