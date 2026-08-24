/* Guarda que ninguna página salga al aire en un idioma y en los otros dos no.

   El sitio tiene tres árboles de páginas escritos a mano. Nada obliga a que la
   versión en inglés cambie cuando cambia la española, y una traducción vieja no
   se nota mirando el sitio: la página carga, se ve bien y dice otra cosa.

   Esto lo hace imposible de publicar sin darse cuenta. Cada página en español
   tiene su huella guardada en `lib/traducciones.lock.json`, tomada el día en
   que sus traducciones quedaron al día. Si el archivo en español cambió y la
   huella no, el build se detiene y dice cuáles páginas quedaron atrás.

   Se corre solo antes de cada build, en esta máquina y en Vercel.

     pnpm idiomas              ver el estado
     pnpm idiomas --sellar     guardar las huellas, ya con las tres al día

   Sellar es lo último que se hace después de traducir, nunca lo primero para
   que el build pase. La única excepción legítima es un cambio que no toca el
   texto (una clase de Tailwind, un import): ahí se sella y ya.

   Lo que esta guarda NO cubre, porque TypeScript ya lo cubre: los archivos que
   llevan los tres idiomas adentro (`components/charts.tsx`, `lib/idiomas.ts`,
   `lib/textos-aplicar.ts`, `app/sprint/datos.ts`). Son `Record<Idioma, …>`, así
   que dejar un idioma sin escribir no compila. */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TABLA = join(RAIZ, "lib", "idiomas.ts");
const CANDADO = join(RAIZ, "lib", "traducciones.lock.json");

/** Las direcciones de cada página en los tres idiomas, leídas de la tabla única
    para que esto no sea una segunda lista que se pueda desincronizar. */
function filas() {
  const fuente = readFileSync(TABLA, "utf8");
  const patron =
    /ruta:\s*\{\s*es:\s*"([^"]+)",\s*en:\s*"([^"]+)",\s*pt:\s*"([^"]+)"\s*,?\s*\}/g;
  const salida = [];
  for (const m of fuente.matchAll(patron)) {
    salida.push({ es: m[1], en: m[2], pt: m[3] });
  }
  if (salida.length === 0) {
    throw new Error(
      "No se pudo leer ninguna ruta de lib/idiomas.ts. ¿Cambió el formato de PAGINAS?",
    );
  }
  return salida;
}

/** La convención del App Router: /sprint/aplicar vive en app/sprint/aplicar/page.tsx */
function archivo(ruta) {
  return join(RAIZ, "app", ruta === "/" ? "" : ruta, "page.tsx");
}

function huella(ruta) {
  return createHash("sha256")
    .update(readFileSync(archivo(ruta), "utf8"), "utf8")
    .digest("hex")
    .slice(0, 16);
}

const sellar = process.argv.includes("--sellar");

let candado = {};
try {
  candado = JSON.parse(readFileSync(CANDADO, "utf8")).paginas ?? {};
} catch {
  /* la primera vez no existe */
}

const atrasadas = [];
const nuevas = {};

for (const fila of filas()) {
  const actual = huella(fila.es);
  nuevas[fila.es] = actual;
  if (candado[fila.es] !== actual) {
    atrasadas.push({ ...fila, guardada: candado[fila.es] });
  }
}

if (sellar) {
  writeFileSync(
    CANDADO,
    `${JSON.stringify(
      {
        nota: "Huella de cada página en español el día en que sus traducciones quedaron al día. Lo escribe `pnpm idiomas --sellar`; no se edita a mano.",
        paginas: nuevas,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  console.log(
    atrasadas.length === 0
      ? "idiomas: ya estaba todo sellado, no cambió nada."
      : `idiomas: selladas ${atrasadas.length} página(s). Los tres idiomas quedan declarados al día.`,
  );
  process.exit(0);
}

if (atrasadas.length === 0) {
  console.log("idiomas: las tres versiones de cada página están al día.");
  process.exit(0);
}

console.error("");
console.error(
  `Estas ${atrasadas.length} página(s) cambiaron en español y sus traducciones no:`,
);
console.error("");
for (const f of atrasadas) {
  const estado = f.guardada ? "cambió" : "sin sellar";
  console.error(`  ${f.es}  (${estado})`);
  console.error(`    inglés     ${archivo(f.en).slice(RAIZ.length + 1)}`);
  console.error(`    portugués  ${archivo(f.pt).slice(RAIZ.length + 1)}`);
}
console.error("");
console.error("Traduce el cambio a las otras dos y después:  pnpm idiomas --sellar");
console.error("Si el cambio no toca el texto, sella y ya.");
console.error("");
process.exit(1);
