export const SPRINT_MENTOR_ORDER = [
  "Diego Gómez",
  "Luis Cosio",
  "Camila Beltrán",
  "Christian Urcuqui",
  "Luis Montoya",
  "María Lorena Flórez",
  "Liliana Fernández",
  "Gerson Quintero",
  "Roberto García Alonso",
  "Leidy Aldana",
  "Manuela Chacón",
  "Juan Cortés",
  "Robert Gómez",
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
