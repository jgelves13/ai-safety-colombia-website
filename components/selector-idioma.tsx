"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BANDERA } from "./banderas";
import {
  ETIQUETA_SELECTOR,
  IDIOMAS_LISTOS,
  NOMBRE_IDIOMA,
  SIGLA_IDIOMA,
  idiomaDe,
  rutaEn,
} from "@/lib/idiomas";

/**
 * El control de idioma del encabezado. Muestra la bandera del idioma en que se
 * está y despliega los otros dos. Cada opción es un enlace de verdad a la misma
 * página en el otro idioma, no un botón que cambia un estado: así se puede
 * abrir en otra pestaña y el buscador la ve.
 */
export default function SelectorIdioma({ className = "" }: { className?: string }) {
  const ruta = usePathname() ?? "/";
  const actual = idiomaDe(ruta);
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const id = useId();

  /* Se cierra al hacer clic afuera y con Escape; sin esto queda un menú
     colgando mientras la página se desplaza. */
  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent) => {
      if (caja.current && !caja.current.contains(e.target as Node)) setAbierto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("mousedown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  /* Con un solo idioma publicado no hay nada que escoger. */
  if (IDIOMAS_LISTOS.length < 2) return null;

  const BanderaActual = BANDERA[actual];

  return (
    <div ref={caja} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        aria-label={ETIQUETA_SELECTOR[actual]}
        aria-haspopup="menu"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((v) => !v)}
        className="text-body-sm flex h-9 items-center gap-1.5 rounded-full border border-aisc-sand/30 px-2.5 text-aisc-sand transition-colors hover:border-aisc-sand/60 hover:bg-aisc-sand/10"
      >
        <BanderaActual />
        <span className="font-medium">{SIGLA_IDIOMA[actual]}</span>
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="currentColor"
          aria-hidden="true"
          className={`transition-transform ${abierto ? "rotate-180" : ""}`}
        >
          <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z" />
        </svg>
      </button>

      {abierto ? (
        <div
          id={id}
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[168px] overflow-hidden rounded-[var(--radius)] border border-aisc-sand/20 bg-aisc-forest-deep py-1 shadow-[0_16px_44px_-14px_rgba(20,54,32,0.75)]"
        >
          {IDIOMAS_LISTOS.map((i) => {
            const Bandera = BANDERA[i];
            const activo = i === actual;
            return (
              <Link
                key={i}
                role="menuitem"
                href={rutaEn(i, ruta)}
                hrefLang={i}
                onClick={() => setAbierto(false)}
                className={`text-body-sm flex items-center gap-2.5 px-3.5 py-2 text-aisc-sand transition-colors hover:bg-aisc-sand/10${activo ? " bg-aisc-sand/10" : ""}`}
              >
                <Bandera />
                <span>{NOMBRE_IDIOMA[i]}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
