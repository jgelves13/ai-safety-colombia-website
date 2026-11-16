"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* Las piezas con estado de las páginas de proyectos, al modo de Apart: el
   buscador con filtros del listado, los comentarios largos que se abren, la
   cita BibTeX y los botones para compartir. Todo lo demás se pinta en el
   servidor. */

export type TarjetaProyecto = {
  slug: string;
  titulo: string;
  autores: string;
  track: string;
  resumen: string;
  puesto: string | null;
};

function normal(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function Medalla({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 13.9 7 22l5-3 5 3-1.5-8.1" />
    </svg>
  );
}

/* La pastilla del puesto como el "1st place" de Apart: verde clara, texto
   oscuro y la medalla en verde. */
export function Puesto({ texto }: { texto: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#d3e5d7] py-1 pr-2.5 pl-2 text-[0.875rem] leading-[1.4] font-medium text-aisc-ink">
      <Medalla className="size-4 text-aisc-sage" />
      {texto}
    </span>
  );
}

/* Una sola tarjeta en caja para todo: el track arriba como antetítulo, el
   título, quiénes lo hicieron, el resumen corto y un pie con el enlace. Las
   de los ganadores van sobre verde pálido. */
export function Tarjeta({
  p,
  ruta,
  destacada = false,
}: {
  p: TarjetaProyecto;
  ruta: string;
  destacada?: boolean;
}) {
  return (
    <li className="flex">
      <Link
        href={`${ruta}/${p.slug}`}
        className={`group flex w-full flex-col rounded-[var(--radius)] border p-6 transition-[border-color,box-shadow] hover:border-aisc-forest/45 hover:shadow-[0_14px_34px_-22px_rgba(19,32,26,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aisc-forest ${
          destacada ? "border-aisc-forest/20 bg-aisc-sand" : "border-aisc-line bg-white"
        }`}
      >
        <div className="flex min-h-6 items-start justify-between gap-3">
          <span className="pt-0.5 text-[0.75rem] leading-snug font-medium tracking-[0.06em] text-aisc-muted uppercase">
            {p.track}
          </span>
          {p.puesto ? <Puesto texto={p.puesto} /> : null}
        </div>
        <h3 className="font-display mt-4 text-[1.25rem] leading-[1.25] font-medium tracking-[-0.015em] text-balance text-aisc-forest-deep">
          {p.titulo}
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.875rem] leading-snug text-aisc-ink/80">{p.autores}</p>
        <p className="mt-4 line-clamp-3 text-[0.9375rem] leading-relaxed text-aisc-muted">{p.resumen}</p>
        <div className="mt-auto pt-6">
          <div
            className={`flex items-center justify-between border-t pt-4 text-[0.875rem] font-medium text-aisc-forest ${
              destacada ? "border-aisc-forest/15" : "border-aisc-line"
            }`}
          >
            <span className="group-hover:text-aisc-forest-deep">Ver proyecto</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

/* Una entrada de la lista, copiada de las de Apart: toda la tarjeta es el
   enlace, blanca y separada solo por un filete arriba; el puesto en pastilla
   verde clara, el título, quiénes lo hicieron, el resumen en cuatro líneas y
   "Ver proyecto" abajo del todo. */
function Fila({ p, ruta }: { p: TarjetaProyecto; ruta: string }) {
  return (
    <li className="flex">
      <Link
        href={`${ruta}/${p.slug}`}
        className="group flex w-full flex-col border-t border-aisc-line bg-white px-5 py-6 transition-colors hover:bg-[#f7faf7] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aisc-forest md:px-6 md:py-8"
      >
        {p.puesto ? (
          <div className="pb-4">
            <Puesto texto={p.puesto} />
          </div>
        ) : null}
        <h3 className="font-display text-[1.25rem] leading-[1.3] font-medium tracking-[-0.01em] text-aisc-ink transition-colors group-hover:text-aisc-forest">
          {p.titulo}
        </h3>
        <p className="mt-2 text-[1rem] leading-[1.6] text-aisc-muted/90">{p.autores}</p>
        <p className="mt-3 line-clamp-4 text-[1rem] leading-[1.6] text-aisc-ink/75">{p.resumen}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[1.125rem] font-medium text-aisc-ink">
          Ver proyecto
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </li>
  );
}

const POR_PAGINA = 12;

/* Como la pestaña Entries de Apart: un buscador a todo lo ancho y las
   entradas en dos columnas, con los ganadores primero y un botón para ver
   más cuando no caben. Sin filtros, conteos ni secciones aparte. */
export function ListaConBuscador({
  proyectos,
  ruta,
}: {
  proyectos: TarjetaProyecto[];
  ruta: string;
}) {
  const [q, setQ] = useState("");
  const [cuantos, setCuantos] = useState(POR_PAGINA);

  const visibles = useMemo(() => {
    const n = normal(q.trim());
    if (!n) return proyectos;
    return proyectos.filter((p) => normal(`${p.titulo} ${p.autores} ${p.track} ${p.resumen}`).includes(n));
  }, [q, proyectos]);

  const quedan = visibles.length - cuantos;

  return (
    <div className="rounded-[var(--radius)] bg-aisc-sand px-4 py-6 md:px-8 md:py-10">
      <label className="relative block w-full">
        <span className="sr-only">Buscar proyectos</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-aisc-muted">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setCuantos(POR_PAGINA);
          }}
          placeholder={`Buscar ${proyectos.length} proyectos…`}
          className="h-12 w-full rounded-[var(--radius)] border border-aisc-line bg-white pr-4 pl-12 text-[1rem] text-aisc-ink placeholder:text-aisc-muted/80 transition-colors focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/30"
        />
      </label>

      <p className="sr-only" aria-live="polite">
        {`${visibles.length} de ${proyectos.length} proyectos`}
      </p>

      {visibles.length ? (
        <>
          <ul className="mt-6 grid grid-cols-1 gap-x-5 md:mt-8 md:grid-cols-2">
            {visibles.slice(0, cuantos).map((p) => (
              <Fila key={p.slug} p={p} ruta={ruta} />
            ))}
          </ul>
          {quedan > 0 ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setCuantos((c) => c + POR_PAGINA)}
                className="inline-flex h-11 items-center rounded-full border border-aisc-line bg-white px-6 text-[0.9375rem] font-medium text-aisc-ink transition-colors hover:border-aisc-forest hover:text-aisc-forest-deep"
              >
                {`Mostrar ${Math.min(POR_PAGINA, quedan)} más (quedan ${quedan})`}
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-6 border-t border-aisc-line bg-white px-6 py-12 text-center">
          <p className="text-[1rem] text-aisc-ink">Ningún proyecto coincide con esa búsqueda.</p>
          <button
            type="button"
            onClick={() => setQ("")}
            className="mt-3 text-[0.9375rem] font-medium text-aisc-forest underline decoration-aisc-forest/35 underline-offset-4 hover:decoration-aisc-forest"
          >
            Ver todos los proyectos
          </button>
        </div>
      )}
    </div>
  );
}

/* Como en Apart: cada comentario en un bloque verde pálido, y los largos se
   cortan y se abren con un botón. */
export function Comentario({ texto }: { texto: string }) {
  const largo = texto.length > 520;
  const [abierto, setAbierto] = useState(false);
  return (
    <li className="rounded-[var(--radius)] bg-aisc-sand px-6 py-5">
      <p
        className={`text-[1rem] leading-[1.7] whitespace-pre-line text-aisc-ink ${
          largo && !abierto ? "line-clamp-6" : ""
        }`}
      >
        {texto}
      </p>
      {largo ? (
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="mt-3 text-[0.875rem] font-medium text-aisc-forest underline decoration-aisc-forest/35 underline-offset-4 hover:decoration-aisc-forest"
          aria-expanded={abierto}
        >
          {abierto ? "Ver menos" : "Leer completo"}
        </button>
      ) : null}
    </li>
  );
}

function useCopiado(): [boolean, (t: string) => void] {
  const [copiado, setCopiado] = useState(false);
  return [
    copiado,
    (t: string) => {
      navigator.clipboard.writeText(t).then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      });
    },
  ];
}

export function Cita({ bibtex }: { bibtex: string }) {
  const [copiado, copiar] = useCopiado();
  return (
    <div className="rounded-[var(--radius)] bg-aisc-sand">
      <div className="flex items-center justify-between gap-4 px-6 pt-5">
        <p className="text-[0.875rem] font-semibold text-aisc-forest-deep">BibTeX</p>
        <button
          type="button"
          onClick={() => copiar(bibtex)}
          className="text-[0.875rem] font-medium text-aisc-forest underline decoration-aisc-forest/35 underline-offset-4 hover:decoration-aisc-forest"
        >
          {copiado ? "Copiado" : "Copiar BibTeX"}
        </button>
      </div>
      <pre className="overflow-x-auto px-6 pt-3 pb-6 font-mono text-[0.8125rem] leading-relaxed text-aisc-ink/85">
        <code>{bibtex}</code>
      </pre>
    </div>
  );
}

const REDONDO =
  "inline-flex size-10 items-center justify-center rounded-full border border-aisc-line bg-white text-aisc-forest-deep transition-colors hover:border-aisc-forest-deep hover:bg-aisc-forest-deep hover:text-white";

export function Compartir({ url, titulo }: { url: string; titulo: string }) {
  const [copiado, copiar] = useCopiado();
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(titulo);
  return (
    <div>
      <p className="text-[0.875rem] font-semibold text-aisc-forest-deep">Compartir</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <a className={REDONDO} href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir en X">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
            <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />
          </svg>
        </a>
        <a className={REDONDO} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir en LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
            <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
          </svg>
        </a>
        <a className={REDONDO} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir por WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.06.89.9-2.98-.2-.31a8.2 8.2 0 1 1 6.84 3.73Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.75 2.75 0 0 0-.86 2.04c0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7 1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
          </svg>
        </a>
        <button type="button" className={REDONDO} onClick={() => copiar(url)} aria-label="Copiar enlace">
          {copiado ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
            </svg>
          )}
        </button>
      </div>
      <p className="mt-2 min-h-5 text-[0.8125rem] text-aisc-muted" aria-live="polite">
        {copiado ? "Enlace copiado" : ""}
      </p>
    </div>
  );
}
