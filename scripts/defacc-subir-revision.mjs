/* Sube a Supabase las revisiones que dejó Claude Code en
   .defacc-revision/revision-ia/{slug}.json. Reemplazan la de Gemini y
   aparecen en el panel del jurado y en resultados con "Revisó: claude-code".

   Uso:
     node scripts/defacc-subir-revision.mjs

   Valida la forma antes de subir: si un archivo no tiene los campos que
   espera el panel, lo salta y lo dice. */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { CARPETA, subir } from "./defacc-storage.mjs";

const dir = join(CARPETA, "revision-ia");
if (!existsSync(dir)) {
  console.error(`No existe ${dir}. Corre primero defacc-exportar.mjs y la revisión.`);
  process.exit(1);
}

const SLUG = /^[a-z0-9][a-z0-9-]{0,59}$/;
const BOOLEANOS = ["fueraDeTema", "inyeccionPrompt", "infoPeligrosa"];
const TEXTOS = ["motivoFueraDeTema", "evidenciaInyeccion", "evidenciaInfoPeligrosa", "resumen", "modelo", "fecha"];

let ok = 0;
for (const n of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const slug = n.replace(/\.json$/, "");
  if (!SLUG.test(slug)) {
    console.error(`Salto ${n}: nombre inválido`);
    continue;
  }
  let r;
  try {
    r = JSON.parse(readFileSync(join(dir, n), "utf8"));
  } catch {
    console.error(`Salto ${n}: JSON inválido`);
    continue;
  }
  const malos = [
    ...BOOLEANOS.filter((k) => typeof r[k] !== "boolean"),
    ...TEXTOS.filter((k) => typeof r[k] !== "string"),
    ...(Array.isArray(r.hallazgosRegex) ? [] : ["hallazgosRegex"]),
  ];
  if (malos.length) {
    console.error(`Salto ${n}: campos faltantes o mal tipados: ${malos.join(", ")}`);
    continue;
  }
  const limpio = {
    fueraDeTema: r.fueraDeTema,
    motivoFueraDeTema: r.motivoFueraDeTema.slice(0, 600),
    inyeccionPrompt: r.inyeccionPrompt,
    evidenciaInyeccion: r.evidenciaInyeccion.slice(0, 600),
    infoPeligrosa: r.infoPeligrosa,
    evidenciaInfoPeligrosa: r.evidenciaInfoPeligrosa.slice(0, 600),
    hallazgosRegex: r.hallazgosRegex.map(String).slice(0, 20),
    resumen: r.resumen.slice(0, 600),
    modelo: r.modelo.slice(0, 60),
    fecha: r.fecha,
  };
  await subir(`revision-ia/${slug}.json`, JSON.stringify(limpio), "application/json");
  ok++;
}
console.log(`${ok} revisiones subidas`);
