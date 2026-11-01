"use client";

import { useEffect, useRef, useState } from "react";

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

/* Cada entrada lleva su propio tramo de riel a la izquierda; juntos forman la
   linea continua y el tramo de la seccion en pantalla se pinta de coral. La
   jerarquia la marcan la sangria, el peso y el color: el tamano no sirve, porque
   entre un titulo y un subtitulo solo habia un pixel de diferencia. */
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
  return (
    <ol id={id} className={className}>
      {items.map((item) => {
        const sub = item.nivel === 3;
        const encendido = activo === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={encendido ? "true" : undefined}
              className={[
                "block border-l-2 transition-colors",
                compacta ? "text-meta py-1 leading-snug" : "text-body-sm py-2",
                sub ? (compacta ? "pl-7" : "pl-8") : "pl-4",
                encendido
                  ? "border-aisc-coral font-medium text-aisc-forest"
                  : "border-aisc-ink/10 hover:text-aisc-ink",
                encendido ? "" : sub ? "text-aisc-muted" : "text-aisc-ink/75",
              ].join(" ")}
            >
              {compacta && item.corto ? item.corto : item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/* lo unico que cambia de idioma en el riel */
const TEXTOS: Record<
  Idioma,
  {
    ensayo: string;
    pagina: string;
    enEsta: string;
    plegar: string;
    ocultar: string;
    mostrar: string;
  }
> = {
  es: {
    ensayo: "Contenido del ensayo",
    pagina: "Contenido de la página",
    enEsta: "En esta página",
    plegar: "Mostrar u ocultar el índice",
    ocultar: "Ocultar el índice",
    mostrar: "Mostrar el índice",
  },
  en: {
    ensayo: "Contents of the essay",
    pagina: "Contents of the page",
    enEsta: "On this page",
    plegar: "Show or hide the contents",
    ocultar: "Hide the contents",
    mostrar: "Show the contents",
  },
  pt: {
    ensayo: "Conteúdo do ensaio",
    pagina: "Conteúdo da página",
    enEsta: "Nesta página",
    plegar: "Mostrar ou ocultar o índice",
    ocultar: "Ocultar o índice",
    mostrar: "Mostrar o índice",
  },
};

/* El galon que abre y cierra, y que gira media vuelta segun el estado.

   Apunta a donde se mueve la cosa, no a otro lado. En el cuerpo el indice se
   despliega hacia abajo, asi que el galon es vertical y es el de siempre. En el
   riel la columna entera se guarda hacia la izquierda: ahi el galon es
   horizontal, abierto senala a la izquierda («guardalo») y cerrado a la derecha
   («traelo»). Se queda quieto si el sistema pide menos movimiento. */
function Galon({
  abierto,
  lateral = false,
  className = "",
}: {
  abierto: boolean;
  /** horizontal en vez de vertical: el riel no se despliega, se guarda */
  lateral?: boolean;
  className?: string;
}) {
  /* Sin girar, el trazo vertical mira hacia abajo y el lateral hacia la
     izquierda: por eso el mismo estado pide giros contrarios. */
  const girado = lateral ? !abierto : abierto;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 text-aisc-muted transition-transform duration-200 motion-reduce:transition-none ${
        girado ? "rotate-180" : "rotate-0"
      } ${className}`}
    >
      <path
        d={lateral ? "M15 6l-6 6 6 6" : "M6 9l6 6 6-6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Columna izquierda del ensayo: el indice se queda pegado mientras el texto
 * corre por la derecha. Solo existe de escritorio en adelante; mas abajo de
 * eso el indice va en el cuerpo, plegado, y de eso se encarga IndiceEnsayo.
 *
 * Cuando el riel se puede guardar, cerrado no desaparece: se asoma con solo
 * pasar el mouse por la manija, flotando encima del texto, y se vuelve a
 * esconder al salir. Es la mejor idea del panel de Notion, y sirve todavia mas
 * en un indice, donde muchas veces uno solo quiere mirar donde va. El clic es
 * lo que lo deja fijo.
 *
 * El panel asomado arranca debajo de la manija a proposito. Si empieza a su
 * altura, se le monta encima y el clic que iba a fijar el indice se lo lleva el
 * panel: se ve el indice pero no hay forma de abrirlo.
 */
export function IndiceColumna({
  items,
  idioma = "es",
  abierto = true,
  alPlegar,
}: {
  items: ItemIndice[];
  idioma?: Idioma;
  /** solo cuenta cuando el riel se puede guardar */
  abierto?: boolean;
  /* Si viene, el riel se puede guardar, y quien manda es MarcoConIndice. El
     estado no puede vivir aca porque lo que se encoge es la columna de la
     rejilla, que es del padre; si viviera aca, cerrar el indice dejaria 236px
     en blanco y el texto no ganaria nada. */
  alPlegar?: () => void;
}) {
  const t = TEXTOS[idioma];
  const activo = useSeccionActiva(items);
  const riel = useRef<HTMLElement>(null);
  /* Asomarse no cambia la rejilla, solo dibuja: por eso si vive aca. */
  const [asomado, setAsomado] = useState(false);
  const plegable = Boolean(alPlegar);
  const visible = !plegable || abierto;
  const asomando = plegable && !abierto && asomado;

  /* El atajo es el de Notion. Se nombra con la tecla de la maquina de quien
     lee, que en Mac no es Ctrl. */
  const [tecla, setTecla] = useState("Ctrl");
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setTecla("\u2318");
  }, []);
  const rotulo = `${abierto ? t.ocultar : t.mostrar} (${tecla} + \\)`;

  /* El riel tiene techo de alto: en una guia larga la seccion encendida puede
     quedar fuera de su propia ventana. Esto la trae de vuelta moviendo solo el
     riel, nunca la pagina. */
  useEffect(() => {
    const caja = riel.current;
    const marca = caja?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!caja || !marca || !visible) return;
    const rc = caja.getBoundingClientRect();
    const rm = marca.getBoundingClientRect();
    const aire = 16;
    if (rm.top < rc.top + aire) caja.scrollTop -= rc.top + aire - rm.top;
    else if (rm.bottom > rc.bottom - aire)
      caja.scrollTop += rm.bottom - rc.bottom + aire;
  }, [activo, visible]);

  return (
    <nav
      ref={riel}
      aria-label={t.ensayo}
      onMouseEnter={plegable ? () => setAsomado(true) : undefined}
      onMouseLeave={plegable ? () => setAsomado(false) : undefined}
      /* al saltar a una seccion desde el panel asomado, el panel se recoge */
      onClick={plegable ? () => setAsomado(false) : undefined}
      className={`sticky top-24 hidden max-h-[calc(100vh-7rem)] flex-col self-start pt-12 pb-6 lg:flex ${
        visible
          ? "overflow-y-auto overscroll-contain [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-aisc-ink/15 [&::-webkit-scrollbar]:w-1"
          : "relative overflow-visible"
      }`}
    >
      {alPlegar ? (
        /* La manija tiene el mismo aspecto abierta que cerrada: un circulo con
           borde que se prende al pasar el mouse. Antes, abierta era un galon
           pelado pegado al borde de la columna y el boton era el renglon
           entero, rotulo incluido; nada de eso decia «esto se oprime». El
           rotulo vuelve a ser texto y el unico blanco es el circulo. */
        <div
          className={`flex items-center gap-3 ${
            abierto ? "w-full justify-between pr-1" : "justify-center"
          }`}
        >
          {abierto ? (
            <p className="text-kicker pl-4 text-aisc-muted">{t.enEsta}</p>
          ) : null}
          <button
            type="button"
            onClick={alPlegar}
            aria-expanded={abierto}
            aria-controls="indice-columna"
            aria-label={rotulo}
            title={rotulo}
            className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-aisc-ink/15 bg-aisc-cream transition-colors hover:border-aisc-forest/40 hover:bg-aisc-forest/5"
          >
            <Galon
              abierto={abierto}
              lateral
              className="group-hover:text-aisc-forest"
            />
          </button>
        </div>
      ) : (
        <p className="text-kicker pl-4 text-aisc-muted">{t.enEsta}</p>
      )}
      <Lista
        items={items}
        activo={activo}
        compacta
        id={alPlegar ? "indice-columna" : undefined}
        className={
          visible
            ? "mt-4 flex flex-col"
            : `absolute top-[5.5rem] left-0 z-20 flex max-h-[70vh] w-[248px] flex-col overflow-y-auto overscroll-contain rounded-2xl border border-aisc-ink/12 bg-aisc-cream py-2 pr-3 shadow-[0_16px_40px_rgba(20,32,28,0.14)] transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none ${
                asomando
                  ? "visible translate-x-0 opacity-100"
                  : "invisible -translate-x-2 opacity-0"
              }`
        }
      />
    </nav>
  );
}

/**
 * El mismo indice para pantallas angostas, dentro del cuerpo del texto:
 * plegado en movil, abierto de tablet en adelante. De escritorio en adelante
 * lo reemplaza la columna de la izquierda.
 */
export default function IndiceEnsayo({
  items,
  idioma = "es",
  plegable = false,
}: {
  items: ItemIndice[];
  idioma?: Idioma;
  /** deja plegarlo tambien de tablet en adelante, no solo en movil */
  plegable?: boolean;
}) {
  const t = TEXTOS[idioma];
  const activo = useSeccionActiva(items);
  const [abierto, setAbierto] = useState(false);

  /* Sin bandera manda el ancho: cerrado en movil y abierto de tablet en
     adelante, que es como estaba. Con bandera el boton vale a cualquier ancho,
     asi que el estado arranca en lo que ese ancho mostraria y de ahi en
     adelante decide quien lee. */
  useEffect(() => {
    if (!plegable) return;
    setAbierto(window.matchMedia("(min-width: 48rem)").matches);
  }, [plegable]);

  return (
    <nav aria-label={t.pagina} className="mt-10 w-full lg:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="indice-ensayo"
        title={t.plegar}
        className={`flex w-full items-center justify-between gap-3 text-left ${
          plegable ? "" : "md:pointer-events-none"
        }`}
      >
        <span className="text-kicker pl-4 text-aisc-muted">{t.enEsta}</span>
        <Galon abierto={abierto} className={plegable ? "" : "md:hidden"} />
      </button>
      <Lista
        items={items}
        activo={activo}
        id="indice-ensayo"
        className={`mt-4 flex-col ${
          plegable
            ? abierto
              ? "flex"
              : "hidden"
            : abierto
              ? "flex"
              : "hidden md:flex"
        }`}
      />
    </nav>
  );
}
