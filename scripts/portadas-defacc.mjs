/* Saca la primera página del informe de cada proyecto publicado del
   Defensive Acceleration Hackathon y la deja en
   `public/aisc/hackathon/defacc-<slug>.jpg`, y reescribe `lib/defacc-portadas.ts`
   con la lista de los que tienen portada. Así la tarjeta del listado, la página
   de cada proyecto y el bloque de Investigación la muestran sin tocar nada más.

   Lee el listado y los PDF del sitio publicado (o de otro con --sitio), así que
   no necesita llaves. Hay que correrlo cuando entre o cambie un informe:

     node scripts/portadas-defacc.mjs [--sitio http://localhost:3124] [--todas]

   Sin --todas solo genera las que faltan. Necesita `pdftoppm` (poppler). */

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const i = args.indexOf("--sitio");
const SITIO = (i >= 0 ? args[i + 1] : "https://aisafetycolombia.org").replace(/\/$/, "");
const TODAS = args.includes("--todas");
const CARPETA = "public/aisc/hackathon";
const RUTA = "/defacchackathon/proyectos";

const html = await (await fetch(`${SITIO}/defacchackathon`)).text();
/* El listado pinta solo los primeros; los demás van en los datos del
   componente con buscador, como "slug":"…" (escapado dentro del HTML). */
const slugs = [...new Set([...html.matchAll(/\\?"slug\\?":\\?"([a-z0-9-]+)/g)].map((m) => m[1]))].sort();
if (!slugs.length) throw new Error("No encontré proyectos en el listado.");

const tmp = mkdtempSync(join(tmpdir(), "portadas-defacc-"));
try {
  for (const slug of slugs) {
    const destino = join(CARPETA, `defacc-${slug}.jpg`);
    if (!TODAS && existsSync(destino)) continue;
    const r = await fetch(`${SITIO}${RUTA}/${slug}/informe`);
    if (!r.ok || !(r.headers.get("content-type") ?? "").includes("pdf")) {
      console.log(`sin informe: ${slug}`);
      continue;
    }
    const pdf = join(tmp, `${slug}.pdf`);
    writeFileSync(pdf, Buffer.from(await r.arrayBuffer()));
    const base = join(tmp, slug);
    execFileSync("pdftoppm", ["-jpeg", "-jpegopt", "quality=85", "-f", "1", "-l", "1", "-singlefile", "-scale-to-x", "900", "-scale-to-y", "-1", pdf, base]);
    writeFileSync(destino, readFileSync(`${base}.jpg`));
    console.log(`portada: ${slug}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

/* La lista sale de los archivos que hay, no solo de los de esta corrida. */
const con = readdirSync(CARPETA)
  .map((f) => /^defacc-(.+)\.jpg$/.exec(f)?.[1])
  .filter((s) => s && slugs.includes(s))
  .sort();

writeFileSync(
  "lib/defacc-portadas.ts",
  `/* Generado por scripts/portadas-defacc.mjs: los proyectos del Defensive
   Acceleration Hackathon que tienen la primera página de su informe en
   \`public/aisc/hackathon/defacc-<slug>.jpg\`. No editar a mano. */
export const CON_PORTADA: ReadonlySet<string> = new Set([
${con.map((s) => `  "${s}",`).join("\n")}
]);

export function portadaDefAcc(slug: string): string | null {
  return CON_PORTADA.has(slug) ? \`/aisc/hackathon/defacc-\${slug}.jpg\` : null;
}
`,
);
console.log(`${con.length} de ${slugs.length} con portada.`);
