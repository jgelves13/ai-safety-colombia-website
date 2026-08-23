"use client";

import { useEffect, useState } from "react";

export type ItemIndice = {
  id: string;
  label: string;
  /** 2 = titulo de seccion, 3 = subtitulo dentro de una seccion */
  nivel?: 2 | 3;
};

/** Alto de la franja superior bajo la cual se considera que una seccion ya empezo. */
const UMBRAL = 140;

/** Devuelve el id de la ultima seccion cuyo titulo ya paso por el umbral. */
function useSeccionActiva(items: ItemIndice[]) {
  const [activo, setActivo] = useState<string>("");

  useEffect(() => {
    let pendiente = false;

    const calcular = () => {
      pendiente = false;
      let actual = "";
      for (const item of items) {
        const nodo = document.getElementById(item.id);
        if (!nodo) continue;
        if (nodo.getBoundingClientRect().top <= UMBRAL) actual = item.id;
      }
      // al tocar fondo, marca el ultimo: si no, la seccion final nunca se enciende
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 4
      ) {
        actual = items[items.length - 1]?.id ?? actual;
      }
      setActivo(actual);
    };

    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      window.requestAnimationFrame(calcular);
    };

    calcular();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
    };
  }, [items]);

  return activo;
}

function Entrada({
  item,
  activo,
  numero,
}: {
  item: ItemIndice;
  activo: boolean;
  numero?: string;
}) {
  const sangria = item.nivel === 3 ? "pl-6" : "pl-3";
  const tamano = item.nivel === 3 ? "text-meta" : "text-body-sm";
  const color = activo
    ? "border-aisc-coral text-aisc-forest"
    : "border-aisc-ink/15 text-aisc-muted hover:border-aisc-ink/40 hover:text-aisc-ink";
  return (
    <li>
      <a
        href={`#${item.id}`}
        aria-current={activo ? "true" : undefined}
        className={`flex gap-2 border-l-2 py-1.5 transition-colors ${sangria} ${tamano} ${color}`}
      >
        {numero ? (
          <span className="text-meta tabular-nums opacity-60">{numero}</span>
        ) : null}
        <span className="text-balance">{item.label}</span>
      </a>
    </li>
  );
}

/** Numera solo los titulos de seccion; los subtitulos van sin numero. */
function numerar(items: ItemIndice[]) {
  let n = 0;
  return items.map((item) => {
    if (item.nivel === 3) return undefined;
    n += 1;
    return String(n).padStart(2, "0");
  });
}

/**
 * Indice del ensayo. Aparece de dos formas segun el ancho: en el cuerpo del
 * texto, plegable en movil, y como columna fija a la izquierda cuando la
 * pantalla da para tenerla sin robarle margen a la lectura.
 */
export default function IndiceEnsayo({ items }: { items: ItemIndice[] }) {
  const activo = useSeccionActiva(items);
  const [abierto, setAbierto] = useState(false);
  const numeros = numerar(items);

  return (
    <>
      {/* columna fija: solo cuando sobra margen a la izquierda de la lectura */}
      <nav
        aria-label="Contenido del ensayo"
        style={{ left: "calc((100vw - 980px) / 2 - 240px)" }}
        className={`fixed top-32 z-10 hidden max-h-[calc(100dvh-14rem)] w-[200px] overflow-y-auto transition-opacity duration-300 motion-reduce:transition-none min-[1500px]:block ${
          activo ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="text-kicker text-aisc-muted">En esta página</p>
        <ol className="mt-3 flex flex-col">
          {items.map((item, i) => (
            <Entrada
              key={item.id}
              item={item}
              activo={activo === item.id}
              numero={numeros[i]}
            />
          ))}
        </ol>
      </nav>

      {/* en el cuerpo: se pliega en movil, queda abierto de tablet en adelante */}
      <nav
        aria-label="Contenido de la página"
        className="mx-auto mt-10 w-full max-w-[720px] min-[1500px]:hidden"
      >
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="indice-ensayo"
          className="flex w-full items-center justify-between gap-3 text-left md:pointer-events-none"
        >
          <span className="text-kicker text-aisc-muted">En esta página</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-aisc-muted transition-transform duration-200 motion-reduce:transition-none md:hidden ${
              abierto ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <ol
          id="indice-ensayo"
          className={`mt-4 flex-col ${abierto ? "flex" : "hidden md:flex"}`}
        >
          {items.map((item, i) => (
            <Entrada
              key={item.id}
              item={item}
              activo={activo === item.id}
              numero={numeros[i]}
            />
          ))}
        </ol>
      </nav>
    </>
  );
}
