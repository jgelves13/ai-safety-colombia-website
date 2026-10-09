"use client";

import { useEffect, useState } from "react";

/* El índice de la política de datos. Se queda fijo al lado del texto, cabe en
   cualquier alto de pantalla (si no, se desplaza por dentro) y marca la
   sección que se está leyendo. */
export default function IndicePolitica({
  titulo,
  secciones,
}: {
  titulo: string;
  secciones: { id: string; titulo: string }[];
}) {
  const [activa, setActiva] = useState(secciones[0]?.id);

  useEffect(() => {
    const elementos = secciones
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => e !== null);
    const marcar = () => {
      /* La activa es la última cuyo comienzo ya pasó bajo el encabezado. */
      const linea = 140;
      let actual = elementos[0]?.id;
      for (const e of elementos) {
        if (e.getBoundingClientRect().top <= linea) actual = e.id;
      }
      /* Al final de la página la última sección puede no llegar arriba. */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        actual = elementos[elementos.length - 1]?.id;
      }
      setActiva(actual);
    };
    marcar();
    window.addEventListener("scroll", marcar, { passive: true });
    window.addEventListener("resize", marcar);
    return () => {
      window.removeEventListener("scroll", marcar);
      window.removeEventListener("resize", marcar);
    };
  }, [secciones]);

  return (
    <nav aria-label={titulo} className="hidden lg:block">
      <div className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col">
        <h2 className="text-kicker text-aisc-muted">{titulo}</h2>
        <ol className="mt-3 flex flex-col overflow-y-auto overscroll-contain border-l border-aisc-line pb-2">
          {secciones.map((s, i) => {
            const esta = s.id === activa;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={esta ? "location" : undefined}
                  className={`text-meta -ml-px flex gap-2.5 border-l-2 py-1 pl-4 leading-snug transition-colors ${
                    esta
                      ? "border-aisc-forest font-medium text-aisc-ink"
                      : "border-transparent text-aisc-muted hover:text-aisc-ink"
                  }`}
                >
                  <span className="w-5 shrink-0 tabular-nums">{i + 1}.</span>
                  <span>{s.titulo}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
