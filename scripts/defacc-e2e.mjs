/* E2E del DefAcc en modo prueba: registro, entregas, jurado, puntajes, resultados.
   Uso: node scripts/defacc-e2e.mjs <base-url>; luego node scripts/defacc-limpiar-prueba.mjs   (corre desde la raíz del repo)
   No imprime tokens ni secretos. */
import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";

const BASE = (process.argv[2] || "http://localhost:3123").replace(/\/$/, "");
let secreto = process.env.CONFIRM_LINK_SECRET;
if (!secreto) {
  const env = readFileSync(".env.local", "utf8");
  const m = env.match(/^CONFIRM_LINK_SECRET=(.*)$/m);
  secreto = m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
}
if (!secreto) throw new Error("sin secreto");
const firma = (t, l = 24) => createHmac("sha256", secreto).update(t).digest("base64url").slice(0, l);
const BYPASS = firma("defacc-prueba");
const JUEZ = `prueba.${firma("jurado:prueba")}`;
const ADMIN = firma("admin:resultados", 32);

let fallas = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`);
  if (!cond) fallas++;
};
const sufijo = Date.now().toString(36);

// 1. Registro
const reg = await fetch(`${BASE}/api/defacc/registro`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    equipo: `E2E Registro ${sufijo}`,
    track: "track-1",
    integrantes: [
      { nombre: "Prueba Uno", correo: "prueba1@example.com" },
      { nombre: "Prueba Dos", correo: "prueba2@example.com" },
    ],
    website: "",
    bypass: BYPASS,
  }),
});
const regJ = await reg.json().catch(() => ({}));
ok(reg.ok && regJ.ok !== false, `registro de prueba (HTTP ${reg.status})`);

// 2. Entregas
const resumen = Array.from({ length: 170 }, (_, i) => `palabra${i}`).join(" ");
const pdf = new Blob([Buffer.from("%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n")], { type: "application/pdf" });
const slugs = {};
for (const nombre of ["Alfa", "Beta", "Gamma"]) {
  const f = new FormData();
  f.set("equipo", `E2E ${nombre} ${sufijo}`);
  f.set("titulo", `Proyecto ${nombre}`);
  f.set("track", "track-2");
  f.set("resumen", resumen);
  f.set("enlace", "https://example.com/repo");
  f.set("integrantes", JSON.stringify([
    { nombre: "Prueba Uno", correo: "prueba1@example.com" },
    { nombre: "Prueba Dos", correo: "prueba2@example.com" },
  ]));
  f.set("pdf", pdf, "ficha.pdf");
  f.set("bypass", BYPASS);
  const r = await fetch(`${BASE}/api/defacc/entregar`, { method: "POST", body: f });
  const j = await r.json().catch(() => ({}));
  slugs[nombre] = j.slug;
  ok(r.ok && typeof j.slug === "string" && j.slug.startsWith("prueba-"), `entrega ${nombre} (HTTP ${r.status})`);
}

// 3. Página del jurado antes de calificar
const pj = await fetch(`${BASE}/defacchackathon/jurados/${JUEZ}`);
const hj = await pj.text();
ok(pj.ok && /\d+ de \d+ calificadas/.test(hj), `página del jurado muestra "N de M calificadas" (HTTP ${pj.status})`);
ok(hj.includes("Proyecto Alfa"), "página del jurado lista la entrega Alfa");

// 4. Puntajes
const puntuar = async (body, msg) => {
  const r = await fetch(`${BASE}/api/defacc/puntaje`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: JUEZ, comentario: "", ...body }),
  });
  ok(r.ok, `${msg} (HTTP ${r.status})`);
};
await puntuar({ slug: slugs.Alfa, impacto: 5, ejecucion: 5, presentacion: 5, comentario: "Muy bien" }, "puntaje 5/5/5 a Alfa");
{
  const r = await fetch(`${BASE}/api/defacc/puntaje`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: JUEZ, slug: slugs.Beta, abstiene: true }),
  });
  ok(r.status === 400, `abstención sin motivo rechazada (HTTP ${r.status})`);
}
await puntuar({ slug: slugs.Beta, abstiene: true, motivoAbstencion: "conflicto" }, "abstención con motivo en Beta");
await puntuar({ slug: slugs.Gamma, impacto: 3, ejecucion: 3, presentacion: 3, noElegible: true }, "puntaje no elegible en Gamma");

// 5. Página del jurado después
const hj2 = await (await fetch(`${BASE}/defacchackathon/jurados/${JUEZ}`)).text();
ok(/3 de \d+ calificadas/.test(hj2), "página del jurado cuenta 3 calificadas");

// 6. Resultados sin cookie: no debe mostrar el ranking
const sin = await (await fetch(`${BASE}/defacchackathon/resultados?prueba=1`)).text();
ok(!sin.includes("Total ajustado") && !sin.includes("Proyecto Alfa"), "resultados sin cookie no muestran ranking");

// 7. Resultados con cookie admin
const rr = await fetch(`${BASE}/defacchackathon/resultados?prueba=1`, { headers: { Cookie: `defacc_admin=${ADMIN}` } });
const h = (await rr.text()).replace(/<!-- -->/g, "");
ok(rr.ok, `resultados admin (HTTP ${rr.status})`);
ok(h.includes("Total ajustado"), 'encabezado "Total ajustado"');
ok(h.includes("12.00") && h.includes("prom. 15.00"), "Alfa: ajustado 12.00 con prom. 15.00 (5/5/5 con 1 nota)");
ok(h.includes("Pocas notas: revisar en la deliberación de las 6:40"), "bandera Pocas notas en top 3");
const iAlfa = h.indexOf("Proyecto Alfa");
const iExcl = h.search(/[Ee]xcluid|no elegible/);
ok(iAlfa >= 0, "Alfa aparece en resultados");
ok(h.includes("Proyecto Gamma"), "Gamma aparece (en excluidas)");
ok(/no elegible/i.test(h), "aparece la marca no elegible");
ok(h.includes("Muy bien"), "comentario visible en detalle admin");
ok(!/de 6 jurados|N de 6/.test(sin), "sin cookie no hay conteo de jurados");
void iExcl;

console.log(fallas === 0 ? "\nTODO OK" : `\n${fallas} FALLAS`);
process.exit(fallas === 0 ? 0 : 1);
