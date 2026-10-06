/* Íconos de retícula de puntos, al modo de aisafety.sg: cada uno es un dibujo
   pequeño hecho solo de puntos, en el color del texto que lo rodea. Se escriben
   como renglones: «x» es un punto y «.» un hueco. Todos parten del triángulo
   del logo, que es la figura que repite el sitio. */

const PATRONES = {
  /* un triángulo invertido lleno: estudiar en grupo */
  seminarios: ["x.x.x.x", ".x.x.x.", "..x.x..", "...x..."],
  /* dos triángulos que avanzan: un fin de semana de trabajo */
  sprints: ["x.....x", ".x...x.x", "x.x.x.x.", ".x.x...x", "x...x.x."],
  /* páginas apiladas */
  lectura: ["xxxx...", "x..x...", "x..xxxx", "xxxx..x", "...x..x", "...xxxx"],
  /* ondas desde un punto: alguien habla */
  charlas: ["...x...", "..x.x..", ".x...x.", "x..x..x", ".x...x.", "..x.x..", "...x..."],
  /* un frontón */
  universidades: ["...x...", "..x.x..", ".xxxxx.", ".x.x.x.", ".x.x.x.", "xxxxxxx"],
  /* una balanza */
  gobierno: ["...x...", "xxxxxxx", "x..x..x", "xx.x.xx", "...x...", "..xxx.."],
  /* dos triángulos que se tocan */
  aliados: ["x.x.x.x.x", ".x.x.x.x.", "..x...x..", "...x.x...", "....x...."],
  /* una lupa sobre la retícula */
  investigadores: [".xxx...", "x...x..", "x...x..", ".xxx...", "....x..", ".....x.", "......x"],
} as const;

export type Patron = keyof typeof PATRONES;

const PASO = 4;
const RADIO = 1.25;

export default function Puntos({ patron, className = "size-8" }: { patron: Patron; className?: string }) {
  const filas = PATRONES[patron];
  const columnas = Math.max(...filas.map((f) => f.length));
  const lado = Math.max(columnas, filas.length) * PASO;
  /* centrado en una caja cuadrada, para que todos ocupen lo mismo */
  const dx = (lado - columnas * PASO) / 2 + PASO / 2;
  const dy = (lado - filas.length * PASO) / 2 + PASO / 2;
  return (
    <svg viewBox={`0 0 ${lado} ${lado}`} fill="currentColor" aria-hidden="true" className={className}>
      {filas.flatMap((fila, y) =>
        [...fila].map((c, x) =>
          c === "x" ? <circle key={`${x}-${y}`} cx={dx + x * PASO} cy={dy + y * PASO} r={RADIO} /> : null,
        ),
      )}
    </svg>
  );
}
