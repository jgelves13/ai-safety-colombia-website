/* Clases compartidas por la página de eventos (servidor) y su listado (cliente).
   La página va oscura, como la de MAIA: fondo noche, texto arena y un solo
   acento, un verde claro que hace de su morado. Los enlaces siguen la regla
   del sitio, verdes y coral al pasar el mouse, sin subrayado ni flecha. */

/** El acento: fechas, línea de tiempo, enlaces. Verde claro para que se lea sobre la noche. */
export const ACENTO = "text-[#8cc9a0]";

export const LINK = "text-[#8cc9a0] transition-colors hover:text-aisc-coral";

export const FOCO = "focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#8cc9a0]";

/** Texto secundario y filetes sobre la noche. */
export const TENUE = "text-aisc-sand/65";
export const FILETE = "border-aisc-sand/15";

/** El triángulo de los <summary>, como en MAIA: apunta a la derecha y gira al abrir el <details>. */
export const SUMMARY =
  "flex cursor-pointer list-none items-center gap-2.5 [&::-webkit-details-marker]:hidden before:h-2.5 before:w-2 before:flex-none before:bg-current before:transition-transform before:content-[''] before:[clip-path:polygon(0_0,100%_50%,0_100%)] [details[open]>&]:before:rotate-90";

/** La columna de MAIA: centrada y de 960 px. */
export const COLUMNA = "mx-auto w-full max-w-[60rem] px-6 md:px-8";
