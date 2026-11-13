/* Baja las entregas del DefAcc a .defacc-revision/ para revisarlas con
   Claude Code (ver scripts/revision-claude-code.md).

   Uso:
     node scripts/defacc-exportar.mjs            solo entregas reales
     node scripts/defacc-exportar.mjs --prueba   solo entregas de prueba

   Deja:
     .defacc-revision/entregas/{slug}.json
     .defacc-revision/fichas/{slug}.pdf
     .defacc-revision/revision-ia/          (vacía, ahí escribe Claude Code)

   La carpeta está en .gitignore: tiene datos de los equipos. */

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CARPETA, bajar, listar } from "./defacc-storage.mjs";

const prueba = process.argv.includes("--prueba");

rmSync(join(CARPETA, "entregas"), { recursive: true, force: true });
rmSync(join(CARPETA, "fichas"), { recursive: true, force: true });
for (const d of ["entregas", "fichas", "revision-ia"]) mkdirSync(join(CARPETA, d), { recursive: true });

const nombres = (await listar("entregas/")).filter((n) => n.endsWith(".json"));
let total = 0;
let pdfs = 0;
for (const n of nombres) {
  const slug = n.replace(/\.json$/, "");
  if (slug.startsWith("prueba-") !== prueba) continue;
  const crudo = await bajar(`entregas/${n}`);
  if (!crudo) continue;
  const e = JSON.parse(crudo.toString("utf8"));
  /* El hash del código de edición no le sirve a la revisión. */
  delete e.codigoHash;
  writeFileSync(join(CARPETA, "entregas", `${slug}.json`), JSON.stringify(e, null, 2));
  total++;
  if (e.pdf?.ruta) {
    const pdf = await bajar(e.pdf.ruta);
    if (pdf) {
      writeFileSync(join(CARPETA, "fichas", `${slug}.pdf`), pdf);
      pdfs++;
    }
  }
}

console.log(`${total} entregas${prueba ? " de prueba" : ""} y ${pdfs} fichas en ${CARPETA}/`);
