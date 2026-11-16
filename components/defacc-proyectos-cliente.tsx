"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* Las piezas con estado de las páginas de proyectos: el buscador del listado,
   los comentarios largos que se abren, la cita BibTeX y los botones para
   compartir. Todo lo demás se pinta en el servidor. */

const BOTON_BORDE =
  "text-meta inline-flex min-h-9 items-center rounded-full border border-aisc-ink/40 px-4 font-medium text-aisc-ink transition-colors hover:border-aisc-ink hover:bg-aisc-ink hover:text-aisc-cream";

export type TarjetaProyecto = {
  slug: string;
  titulo: string;
  equipo: string;
  track: string;
  resumen: string;
  puesto: string | null;
};

function normal(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function Tarjeta({ p, ruta }: { p: TarjetaProyecto; ruta: string }) {
  return (
    <li className="flex">
      <Link
        href={`${ruta}/${p.slug}`}
        className="group flex w-full flex-col rounded-[var(--radius)] bg-aisc-sand p-5 transition-colors hover:bg-aisc-sand/60 md:p-6"
      >
        <div className="flex flex-wrap items-center gap-2">
          {p.puesto ? (
            <span className="text-meta rounded-full bg-aisc-coral px-3 py-1 font-semibold text-aisc-cream">
              {p.puesto}
            </span>
          ) : null}
          <span className="text-meta text-aisc-muted">{p.track}</span>
        </div>
        <h3 className="font-display mt-3 text-[1.25rem] leading-snug font-semibold text-balance text-aisc-forest transition-colors group-hover:text-aisc-coral">
          {p.titulo}
        </h3>
        <p className="text-body-sm mt-1 text-aisc-ink/80">Equipo {p.equipo}</p>
        <p className="text-body-sm mt-3 line-clamp-4 text-aisc-ink">{p.resumen}</p>
        <span className="text-body-sm mt-auto pt-4 font-medium text-aisc-forest group-hover:text-aisc-coral">
          Ver proyecto →
        </span>
      </Link>
    </li>
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
  const visibles = useMemo(() => {
    const n = normal(q.trim());
    if (!n) return proyectos;
    return proyectos.filter((p) =>
      normal(`${p.titulo} ${p.equipo} ${p.track} ${p.resumen}`).includes(n),
    );
  }, [q, proyectos]);

  return (
    <div>
      <label className="flex max-w-[460px] flex-col gap-2">
        <span className="text-body-sm font-medium text-aisc-ink">Buscar proyectos</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Título, equipo, track o tema"
          className="text-body-sm w-full rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 text-aisc-ink transition-colors focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/35"
        />
      </label>
      <p className="text-meta mt-3 text-aisc-muted" aria-live="polite">
        {visibles.length === proyectos.length
          ? `${proyectos.length} proyectos`
          : `${visibles.length} de ${proyectos.length} proyectos`}
      </p>
      {visibles.length ? (
        <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visibles.map((p) => (
            <Tarjeta key={p.slug} p={p} ruta={ruta} />
          ))}
        </ul>
      ) : (
        <p className="text-body mt-6 text-aisc-ink">Ningún proyecto coincide con esa búsqueda.</p>
      )}
    </div>
  );
}

/* Como en Apart: los comentarios largos se cortan y se abren con un botón. */
export function Comentario({ numero, texto }: { numero: number; texto: string }) {
  const largo = texto.length > 520;
  const [abierto, setAbierto] = useState(false);
  return (
    <li className="rounded-[var(--radius)] border border-aisc-ink/12 bg-white/60 p-5 md:p-6">
      <p className="text-kicker text-aisc-forest-deep">Comentario {numero}</p>
      <p
        className={`text-body mt-2 whitespace-pre-line text-aisc-ink ${
          largo && !abierto ? "line-clamp-6" : ""
        }`}
      >
        {texto}
      </p>
      {largo ? (
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="text-body-sm mt-3 font-medium text-aisc-forest underline decoration-aisc-forest/40 underline-offset-4 hover:decoration-aisc-forest"
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
    <div className="mt-5">
      <pre className="overflow-x-auto rounded-[var(--radius)] bg-aisc-forest-deep p-5 text-[0.8125rem] leading-relaxed text-aisc-sand">
        <code>{bibtex}</code>
      </pre>
      <button type="button" onClick={() => copiar(bibtex)} className={`${BOTON_BORDE} mt-3`}>
        {copiado ? "Copiado" : "Copiar BibTeX"}
      </button>
    </div>
  );
}

export function Compartir({ url, titulo }: { url: string; titulo: string }) {
  const [copiado, copiar] = useCopiado();
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(titulo);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={() => copiar(url)} className={BOTON_BORDE}>
        {copiado ? "Enlace copiado" : "Copiar enlace"}
      </button>
      <a
        className={BOTON_BORDE}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        className={BOTON_BORDE}
        href={`https://x.com/intent/post?url=${u}&text=${t}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className={BOTON_BORDE}
        href={`https://wa.me/?text=${t}%20${u}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  );
}
