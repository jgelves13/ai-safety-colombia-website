"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

import { IndiceColumna, type ItemIndice } from "@/components/indice-ensayo";
import type { Idioma } from "@/lib/idiomas";

/* La rejilla de una pagina larga con riel a la izquierda, cuando el riel se
   puede guardar.

   El estado vive aca y no dentro del indice porque lo que se pliega no es la
   lista: es la columna. Al cerrarla, la primera pista de la rejilla se encoge a
   una manija y esos pixeles se los queda el texto, que es justamente el punto
   de poder cerrarla. Si el estado viviera dentro del indice, cerrarlo dejaria
   la columna vacia y el texto igual de angosto.

   Debajo de lg no hay rejilla ni riel: ahi el indice va dentro del cuerpo y de
   eso se encarga IndiceEnsayo. */

/** donde se recuerda la decision de quien lee */
const CLAVE = "aisc:riel-del-indice";

export default function MarcoConIndice({
  items,
  idioma = "es",
  className = "",
  children,
}: {
  items: ItemIndice[];
  idioma?: Idioma;
  /** lo propio de la pagina: separacion de arriba y lo que haga falta */
  className?: string;
  children: ReactNode;
}) {
  const [abierto, setAbierto] = useState(true);
  /* Hasta que no leamos lo guardado, el riel no anima: si no, quien lo dejo
     cerrado veria la columna cerrarse sola al cargar. */
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(CLAVE) === "cerrado") setAbierto(false);
    } catch {
      /* navegar en privado no es motivo para romper la pagina */
    }
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      window.localStorage.setItem(CLAVE, abierto ? "abierto" : "cerrado");
    } catch {
      /* igual que arriba */
    }
  }, [abierto, listo]);

  const plegar = useCallback(() => setAbierto((v) => !v), []);

  /* El mismo atajo del panel de Notion, y por lo mismo: quien lee de corrido
     en pantalla ancha abre y cierra sin ir a buscar el boton. */
  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "\\") {
        e.preventDefault();
        plegar();
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [plegar]);

  return (
    <div
      className={`lg:grid lg:items-start lg:gap-12 xl:gap-20 ${
        listo
          ? "lg:transition-[grid-template-columns] lg:duration-300 lg:ease-out motion-reduce:lg:transition-none"
          : ""
      } ${
        abierto
          ? "lg:grid-cols-[236px_minmax(0,1fr)] xl:grid-cols-[264px_minmax(0,1fr)]"
          : "lg:grid-cols-[2rem_minmax(0,1fr)] xl:grid-cols-[2rem_minmax(0,1fr)]"
      } ${className}`}
    >
      <IndiceColumna
        items={items}
        idioma={idioma}
        abierto={abierto}
        alPlegar={plegar}
      />
      {children}
    </div>
  );
}
