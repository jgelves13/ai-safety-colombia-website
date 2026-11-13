/* Borra todo lo de prueba del bucket del DefAcc: entregas, fichas, registros,
   revisiones y puntajes cuyo slug empieza con "prueba-". No toca nada real.

   Uso:
     node scripts/defacc-limpiar-prueba.mjs */

import { borrar, carpetas, listar } from "./defacc-storage.mjs";

const rutas = [];
for (const pref of ["entregas/", "fichas/", "revision-ia/", "registros/"]) {
  for (const n of await listar(pref)) if (n.startsWith("prueba-")) rutas.push(`${pref}${n}`);
}
for (const juez of await carpetas("puntajes/")) {
  for (const n of await listar(`puntajes/${juez}/`)) if (n.startsWith("prueba-")) rutas.push(`puntajes/${juez}/${n}`);
}

if (rutas.some((r) => !r.split("/").pop().startsWith("prueba-"))) {
  console.error("Ruta inesperada, no borro nada");
  process.exit(1);
}
await borrar(rutas);
console.log(`${rutas.length} objetos de prueba borrados`);
