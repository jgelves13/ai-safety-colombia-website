"use client";

import { useEffect, useState } from "react";

import type { Idioma } from "@/lib/idiomas";

export type ItemIndice = {
  id: string;
  label: string;
  /** version breve para la columna del margen, donde no cabe la frase entera */
  corto?: string;
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

/** Numera solo los titulos de seccion; los subtitulos van sangrados y sin numero. */
function numerar(items: ItemIndice[]) {
  let n = 0;
  return items.map((item) => {
    if (item.nivel === 3) return undefined;
    n += 1;
    return String(n).padStart(2, "0");
  });
}

function Lista({
  items,
  activo,
  compacta,
  id,
  className,
}: {
  items: ItemIndice[];
  activo: string;
  /** en la columna del margen la entrada va corta y con menos aire */
  compacta?: boolean;
  id?: string;
  className?: string;
}) {
  const numeros = numerar(items);
  return (
    <ol id={id} className={className}>
      {items.map((item, i) => {
        const sub = item.nivel === 3;
        const encendido = activo === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={encendido ? "true" : undefined}
              className={[
                "flex gap-2 transition-colors",
                compacta ? "py-1 leading-snug" : "py-1.5",
                sub ? "pl-7 text-meta" : "text-body-sm",
                encendido
                  ? "text-aisc-forest"
                  : "text-aisc-muted hover:text-aisc-ink",
              ].join(" ")}
            >
              {numeros[i] ? (
                <span className="text-meta tabular-nums opacity-50">
                  {numeros[i]}
                </span>
              ) : null}
              <span className={encendido ? "underline decoration-aisc-coral decoration-2 underline-offset-4" : ""}>
                {compacta && item.corto ? item.corto : item.label}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/* lo unico que cambia de idioma en el riel */
const TEXTOS: Record<Idioma, { ensayo: string; pagina: string; enEsta: string }> = {
  es: { ensayo: "Contenido del ensayo", pagina: "Contenido de la página", enEsta: "En esta página" },
  en: { ensayo: "Contents of the essay", pagina: "Contents of the page", enEsta: "On this page" },
  pt: { ensayo: "Conteúdo do ensaio", pagina: "Conteúdo da página", enEsta: "Nesta página" },
};

/**
 * Columna izquierda del ensayo: el indice se queda pegado mientras el texto
 * corre por la derecha. Solo existe de escritorio en adelante; mas abajo de
 * eso el indice va en el cuerpo, plegado, y de eso se encarga IndiceEnsayo.
 */
export function IndiceColumna({ items, idioma = "es" }: { items: ItemIndice[]; idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  const activo = useSeccionActiva(items);

  return (
    <nav aria-label={t.ensayo} className="sticky top-24 hidden self-start pt-12 lg:block">
      <p className="text-kicker text-aisc-muted">{t.enEsta}</p>
      <Lista
        items={items}
        activo={activo}
        compacta
        className="mt-3 flex flex-col border-l border-aisc-ink/15 pl-3"
      />
    </nav>
  );
}

/**
 * El mismo indice para pantallas angostas, dentro del cuerpo del texto:
 * plegado en movil, abierto de tablet en adelante. De escritorio en adelante
 * lo reemplaza la columna de la izquierda.
 */
export default function IndiceEnsayo({ items, idioma = "es" }: { items: ItemIndice[]; idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  const activo = useSeccionActiva(items);
  const [abierto, setAbierto] = useState(false);

  return (
    <nav aria-label={t.pagina} className="mt-10 w-full lg:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="indice-ensayo"
        className="flex w-full items-center justify-between gap-3 text-left md:pointer-events-none"
      >
        <span className="text-kicker text-aisc-muted">{t.enEsta}</span>
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
      <Lista
        items={items}
        activo={activo}
        id="indice-ensayo"
        className={`mt-4 flex-col ${abierto ? "flex" : "hidden md:flex"}`}
      />
    </nav>
  );
}
