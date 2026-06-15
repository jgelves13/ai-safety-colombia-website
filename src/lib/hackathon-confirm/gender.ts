// Best-effort gender inference from a first name, to pick "seleccionado" vs
// "seleccionada" instead of the clunky "seleccionado/a". Tuned for Colombian /
// Latino names. When we are not confident, we return null and callers fall back
// to the neutral "seleccionado/a" form, so a wrong guess never reaches anyone.
//
// This same logic is mirrored (compactly) in the inline script of
// HackathonConfirmForm.astro, because that runs client-side on the decoded
// token. Keep the two in sync if you extend the name lists.

const FEMALE = new Set([
  'sofia', 'maria', 'maria jose', 'valentina', 'isabella', 'camila', 'daniela',
  'valeria', 'mariana', 'gabriela', 'luciana', 'sara', 'paula', 'andrea',
  'laura', 'natalia', 'carolina', 'diana', 'catalina', 'juliana', 'alejandra',
  'ana', 'adriana', 'angela', 'patricia', 'claudia', 'sandra', 'monica', 'lina',
  'manuela', 'antonia', 'salome', 'ximena', 'tatiana', 'carmen', 'luisa',
  'elena', 'rosa', 'martha', 'marcela', 'viviana', 'johana', 'yuliana', 'wendy',
  'karen', 'jessica', 'paola', 'liliana', 'luz', 'esperanza', 'beatriz', 'clara',
  'veronica', 'melissa', 'michelle', 'nicole', 'emily', 'estefania', 'fernanda',
  'guadalupe', 'mercedes', 'pilar', 'dolores', 'consuelo', 'amparo', 'rocio',
  'soledad', 'milena', 'yesica', 'leidy', 'angie', 'brigitte', 'geraldine',
  'maritza', 'yenny', 'jenny', 'kelly', 'ingrid', 'lucia', 'julia', 'silvia',
]);

const MALE = new Set([
  'juan', 'carlos', 'andres', 'santiago', 'sebastian', 'david', 'daniel',
  'jose', 'luis', 'diego', 'alejandro', 'mateo', 'samuel', 'nicolas', 'felipe',
  'miguel', 'manuel', 'fernando', 'jorge', 'ricardo', 'javier', 'oscar',
  'cristian', 'julian', 'camilo', 'esteban', 'gabriel', 'tomas', 'emanuel',
  'victor', 'hector', 'raul', 'pedro', 'pablo', 'jhon', 'john', 'brayan',
  'kevin', 'anderson', 'edwin', 'wilson', 'german', 'alberto', 'mario', 'ivan',
  'gustavo', 'rafael', 'sergio', 'hernan', 'cesar', 'alvaro', 'jaime', 'gonzalo',
  'ramiro', 'arturo', 'enrique', 'rodrigo', 'marcos', 'adrian', 'angel', 'bryan',
  'jean', 'jhonatan', 'jonathan', 'leonardo', 'leandro', 'martin', 'simon',
  'joaquin', 'benjamin', 'emiliano', 'maximiliano', 'dylan', 'damian', 'matias',
  'tobias', 'elias', 'jonas', 'lucas', 'josue', 'jesus', 'francisco', 'antonio',
  'ramon', 'fabian', 'mauricio', 'wilmer', 'duvan', 'yeison', 'maicol', 'harold',
]);

function firstToken(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .toLowerCase()
    .trim()
    .split(/\s+/)[0] || '';
}

export function guessGender(name: string | null | undefined): 'm' | 'f' | null {
  if (!name) return null;
  const n = firstToken(String(name));
  if (!n) return null;
  if (FEMALE.has(n)) return 'f';
  if (MALE.has(n)) return 'm';
  // Ending heuristics for names not in the lists.
  if (/(a|ela|ina|ana|ia)$/.test(n)) return 'f';
  if (/(o|os|el|in|or|ar|er|on|us)$/.test(n)) return 'm';
  return null;
}

// "seleccionado" | "seleccionada" | "seleccionado/a"
export function selectedWordEs(name: string | null | undefined): string {
  const g = guessGender(name);
  if (g === 'm') return 'seleccionado';
  if (g === 'f') return 'seleccionada';
  return 'seleccionado/a';
}
