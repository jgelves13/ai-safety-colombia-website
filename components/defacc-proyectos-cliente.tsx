"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

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

/* La pastilla del puesto: oscura y pequeña, con medalla, como el "1st place" de Apart. */
export function Puesto({ texto }: { texto: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-aisc-forest-deep px-2.5 py-1 text-[0.75rem] leading-none font-medium text-white">
      <Medalla className="size-3.5" />
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

const CUADRICULA = "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3";

function Seccion({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[0.8125rem] font-semibold tracking-[0.08em] text-aisc-forest-deep uppercase">
        {titulo}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function ListaConBuscador({
  proyectos,
  ruta,
}: {
  proyectos: TarjetaProyecto[];
  ruta: string;
}) {
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState<string>("todos");
  const tracks = useMemo(
    () => [...new Set(proyectos.map((p) => p.track))].sort((a, b) => a.localeCompare(b, "es")),
    [proyectos],
  );
  const hayPodio = proyectos.some((p) => p.puesto);

  const visibles = useMemo(() => {
    const n = normal(q.trim());
    return proyectos.filter((p) => {
      if (filtro === "ganadores" && !p.puesto) return false;
      if (filtro !== "todos" && filtro !== "ganadores" && p.track !== filtro) return false;
      if (!n) return true;
      return normal(`${p.titulo} ${p.autores} ${p.track} ${p.resumen}`).includes(n);
    });
  }, [q, filtro, proyectos]);

  const opciones = [
    { id: "todos", label: "Todos", n: proyectos.length },
    ...(hayPodio ? [{ id: "ganadores", label: "Ganadores", n: proyectos.filter((p) => p.puesto).length }] : []),
    ...tracks.map((t) => ({ id: t, label: t, n: proyectos.filter((p) => p.track === t).length })),
  ];

  const separado = hayPodio && filtro === "todos" && !q.trim();
  const ganadores = visibles.filter((p) => p.puesto);
  const resto = visibles.filter((p) => !p.puesto);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-aisc-line lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div
          className="-mb-px flex gap-6 overflow-x-auto [scrollbar-width:none] md:gap-7"
          role="group"
          aria-label="Filtrar proyectos"
        >
          {opciones.map((o) => {
            const activo = filtro === o.id;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={activo}
                onClick={() => setFiltro(o.id)}
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 pb-3.5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors ${
                  activo
                    ? "border-aisc-forest-deep text-aisc-forest-deep"
                    : "border-transparent text-aisc-muted hover:border-aisc-line hover:text-aisc-ink"
                }`}
              >
                {o.label}
                <span
                  className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.75rem] leading-none tabular-nums ${
                    activo ? "bg-aisc-forest-deep text-white" : "bg-aisc-sand text-aisc-forest-deep"
                  }`}
                >
                  {o.n}
                </span>
              </button>
            );
          })}
        </div>

        <label className="relative mb-4 block w-full lg:max-w-[340px]">
          <span className="sr-only">Buscar proyectos</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-[1.125rem] -translate-y-1/2 text-aisc-muted">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título, participante o tema"
            className="h-11 w-full rounded-[var(--radius)] border border-aisc-line bg-white pr-4 pl-10 text-[0.9375rem] text-aisc-ink placeholder:text-aisc-muted/80 transition-colors focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/30"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {`${visibles.length} de ${proyectos.length} proyectos`}
      </p>

      {!visibles.length ? (
        <div className="mt-10 rounded-[var(--radius)] border border-dashed border-aisc-line px-6 py-14 text-center">
          <p className="text-[1rem] text-aisc-ink">Ningún proyecto coincide con esa búsqueda.</p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setFiltro("todos");
            }}
            className="mt-3 text-[0.9375rem] font-medium text-aisc-forest underline decoration-aisc-forest/35 underline-offset-4 hover:decoration-aisc-forest"
          >
            Ver todos los proyectos
          </button>
        </div>
      ) : separado ? (
        <div className="mt-10 flex flex-col gap-14">
          <Seccion titulo="Ganadores">
            <ul className={CUADRICULA}>
              {ganadores.map((p) => (
                <Tarjeta key={p.slug} p={p} ruta={ruta} destacada />
              ))}
            </ul>
          </Seccion>
          {resto.length ? (
            <Seccion titulo="Todos los proyectos">
              <ul className={CUADRICULA}>
                {resto.map((p) => (
                  <Tarjeta key={p.slug} p={p} ruta={ruta} />
                ))}
              </ul>
            </Seccion>
          ) : null}
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-[0.875rem] text-aisc-muted">
            {visibles.length} de {proyectos.length} proyectos
          </p>
          <ul className={`mt-5 ${CUADRICULA}`}>
            {visibles.map((p) => (
              <Tarjeta key={p.slug} p={p} ruta={ruta} destacada={!!p.puesto} />
            ))}
          </ul>
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
