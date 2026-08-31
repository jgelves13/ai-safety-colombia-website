export const SPRINT_MENTOR_ORDER = [
  "Diego Gómez",
  "Luis Cosio",
  "Camila Beltrán",
  "Christian Urcuqui",
  "Luis Montoya",
  "Liliana Fernández",
  "Leidy Aldana",
  "Manuela Chacón",
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
