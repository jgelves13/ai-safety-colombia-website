/* Los íconos de /oportunidades, los mismos que usa aisafety.com/training en
   sus tarjetas (lugar, fechas, estipendio, dedicación, nivel, enfoque, cierre),
   dibujados a trazo para que tomen el color del texto. */

/** La columna de AISafety.com: 1056 px de contenido. */
export const ANCHO = "mx-auto w-full max-w-[69rem] px-4 md:px-6";

export type Icono =
  | "lugar"
  | "fecha"
  | "dinero"
  | "sinDinero"
  | "reloj"
  | "relojMedio"
  | "nivelBajo"
  | "nivelMedio"
  | "nivelAlto"
  | "enfoque"
  | "papel"
  | "flecha"
  | "repetir"
  | "mas"
  | "lapiz"
  | "tabla";

function barras(n: number) {
  return [
    [5, 15],
    [12, 10],
    [19, 4],
  ].map(([x, y], i) => <path key={x} d={`M${x} 20V${y}`} opacity={i < n ? 1 : 0.3} />);
}

const TRAZOS: Record<Icono, React.ReactNode> = {
  lugar: (
    <>
      <path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  fecha: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  dinero: (
    <>
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  sinDinero: (
    <>
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M3 3l18 18" />
    </>
  ),
  reloj: (
    <>
      <path d="M10 2h4M12 14l3-3" />
      <circle cx="12" cy="14" r="8" />
    </>
  ),
  relojMedio: (
    <>
      <path d="M10 2h4" />
      <circle cx="12" cy="14" r="8" />
      <path d="M12 6a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
    </>
  ),
  nivelBajo: <>{barras(1)}</>,
  nivelMedio: <>{barras(2)}</>,
  nivelAlto: <>{barras(3)}</>,
  enfoque: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  papel: (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8M10 9H8" />
    </>
  ),
  flecha: <path d="m6 9 6 6 6-6" />,
  repetir: (
    <>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </>
  ),
  mas: <path d="M5 12h14M12 5v14" />,
  lapiz: <path d="M21.2 6.8a1 1 0 0 0-4-4L3.8 16.2a2 2 0 0 0-.5.8L2 21.4a.5.5 0 0 0 .6.6L7 20.7a2 2 0 0 0 .8-.5z" />,
  tabla: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18M3 15h18M12 3v18" />
    </>
  ),
};

export function Icono({ nombre, className = "size-4" }: { nombre: Icono; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`flex-none ${className}`}
    >
      {TRAZOS[nombre]}
    </svg>
  );
}
