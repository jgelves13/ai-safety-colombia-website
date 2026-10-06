"use client";

import { type ReactNode, useEffect, useState } from "react";

import { ACENTO, COLUMNA, FILETE, FOCO, LINK, SUMMARY, TENUE } from "@/components/eventos-estilos";
import type { Parrafo } from "@/lib/eventos";

/* La parte que se mueve de la página de eventos, calcada de la de MAIA
   (aialignment.mit.edu/events): el menú de categoría, la línea de tiempo con
   el detalle plegable de cada evento, los destacados y los años plegados. Las
   fechas llegan ya escritas desde el servidor para que el navegador no las
   vuelva a formatear distinto y rompa la hidratación. */

export type Grupo = "charla" | "cena" | "panel";

export type EventoVista = {
  id: string;
  grupo: Grupo;
  tipo: string;
  titulo: string;
  resumen: string | null;
  /** Lo que se abre en «Detalles del evento»: la descripción de Luma o el resumen. */
  detalle: Parrafo[] | null;
  lugar: string;
  url: string | null;
  /** «Ver en Luma» o «Ver en Instagram», según adónde lleve el enlace. */
  enlace: string | null;
  inscritos: number | null;
  /** «217 inscritos», para el título del contador. */
  inscritosTexto: string | null;
  imagen: string | null;
  destacado: boolean;
  /** Recorte 16:9 que llena la caja del destacado; si no hay, va el flyer entero. */
  portada: string | null;
  /** «7 oct». */
  fecha: string;
  /** «18 ago 2026», para los destacados. */
  fechaConAnio: string;
  /** «6:00–7:30 p. m.», o null si no hay hora. */
  horario: string | null;
  anio: string;
};

export type TextosListado = {
  categoria: string;
  filtros: { id: "todos" | Grupo; label: string }[];
  verCalendario: string;
  suscribirse: string;
  navProximos: string;
  navPasados: string;
  proximos: string;
  zonaHoraria: string;
  sinProximos: string;
  sinFiltro: string;
  detalles: string;
  inscribirse: string;
  pasados: string;
  pasadosIntro: string;
  destacados: string;
  verEvento: string;
  /** «Pasados» en «Pasados · 2026». */
  anio: string;
  ampliar: string;
  cerrar: string;
};

function Icono({ grupo }: { grupo: Grupo }) {
  const comun = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "text-aisc-coral",
  };
  if (grupo === "cena")
    return (
      <svg {...comun}>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    );
  if (grupo === "panel")
    return (
      <svg {...comun}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  return (
    <svg {...comun}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v3" />
    </svg>
  );
}

/* El número de inscritos, como el contador de asistentes de MAIA. */
function Asistencia({ evento, className = "" }: { evento: EventoVista; className?: string }) {
  if (!evento.inscritos) return null;
  return (
    <span
      role="img"
      title={evento.inscritosTexto ?? undefined}
      aria-label={evento.inscritosTexto ?? undefined}
      className={`inline-flex w-fit items-center gap-1.5 text-[.8rem] tabular-nums ${TENUE} ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="9" cy="7" r="4" />
        <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1Z" />
        <circle cx="17" cy="8" r="3" opacity=".6" />
        <path d="M17.5 13a5 5 0 0 1 4.5 5v3h-4v-1a7.9 7.9 0 0 0-2.4-5.7 5 5 0 0 1 1.9-1.3Z" opacity=".6" />
      </svg>
      <span>{evento.inscritos}</span>
    </span>
  );
}

/* La descripción de Luma tal cual la escribieron: párrafos, negritas, enlaces y
   titulillos. En un párrafo de varios renglones («1. Laura Gomezjurado…» y abajo
   de qué habla) el primero hace de encabezado. */
function Descripcion({ parrafos }: { parrafos: Parrafo[] }) {
  return (
    <div className="space-y-3 text-[.95rem] leading-[1.7] text-aisc-sand/85">
      {parrafos.map((p, i) =>
        p.rotulo ? (
          <p key={i} className="pt-1 text-[.8rem] font-semibold tracking-[.08em] text-aisc-sand uppercase">
            {p.renglones[0].map((t) => t.texto).join("")}
          </p>
        ) : (
          <p key={i}>
            {p.renglones.map((renglon, j) => (
              <span key={j} className={p.renglones.length > 1 && j === 0 ? "block font-semibold text-aisc-sand" : j > 0 ? "block" : undefined}>
                {renglon.map((t, k) => {
                  const texto = t.negrita ? <strong className="font-semibold text-aisc-sand">{t.texto}</strong> : t.texto;
                  return t.href ? (
                    <a key={k} className={LINK} href={t.href} target="_blank" rel="noopener noreferrer">
                      {texto}
                    </a>
                  ) : (
                    <span key={k}>{texto}</span>
                  );
                })}
              </span>
            ))}
          </p>
        ),
      )}
    </div>
  );
}

function Fila({
  evento,
  t,
  proximo,
  ampliar,
}: {
  evento: EventoVista;
  t: TextosListado;
  proximo: boolean;
  ampliar: (e: EventoVista) => void;
}) {
  const externo = { target: "_blank", rel: "noopener noreferrer" };
  return (
    <article
      id={`evento-${evento.id}`}
      className={`relative grid scroll-mt-28 grid-cols-1 gap-3 border-b ${FILETE} py-5 before:absolute before:top-[1.6rem] before:left-[-1.45rem] before:size-[.6rem] before:-translate-x-1/2 before:rounded-full before:border-2 before:border-[#8cc9a0] before:bg-aisc-night before:content-[''] sm:grid-cols-[8.75rem_minmax(0,1fr)] sm:gap-6 sm:before:left-[-1.75rem]`}
    >
      <div>
        <time className={`block text-[.95rem] font-semibold ${ACENTO}`}>
          {evento.fecha}
          {evento.horario ? <span className="mt-1.5 block">{evento.horario}</span> : null}
        </time>
        <Asistencia evento={evento} className="mt-3" />
      </div>

      <div className="@container min-w-0">
        <div
          className={
            !evento.imagen
              ? ""
              : proximo
                ? "grid grid-cols-1 items-start gap-5 @lg:grid-cols-[minmax(0,1fr)_16rem] @lg:gap-8"
                : "grid grid-cols-[minmax(0,1fr)_5.5rem] items-start gap-4 @md:grid-cols-[minmax(0,1fr)_7.5rem] @md:gap-6"
          }
        >
          <div className="min-w-0">
            <p className="mb-2 inline-flex items-center gap-2 text-[.85rem] font-medium text-aisc-sand">
              <Icono grupo={evento.grupo} /> {evento.tipo}
            </p>
            <h3 className="font-display text-[1.3rem] leading-snug font-semibold text-aisc-sand">{evento.titulo}</h3>
            {proximo && evento.resumen ? (
              <p className={`mt-2.5 max-w-[65ch] text-[.95rem] leading-relaxed ${TENUE}`}>{evento.resumen}</p>
            ) : null}
            {proximo && evento.url ? (
              <a className={`${LINK} mt-2 inline-block text-[.95rem] font-medium`} href={evento.url} {...externo}>
                {t.inscribirse}
              </a>
            ) : null}
          </div>
          {evento.imagen ? (
            <button
              type="button"
              onClick={() => ampliar(evento)}
              aria-label={`${t.ampliar}: ${evento.titulo}`}
              className={`relative block w-full cursor-zoom-in overflow-hidden rounded-lg border ${FILETE} bg-aisc-forest-deep transition-colors hover:border-[#8cc9a0] ${FOCO} ${
                proximo ? "aspect-square max-w-[22rem] shadow-lg shadow-black/30" : "aspect-[4/3]"
              }`}
            >
              {/* El flyer de un próximo va grande y cuadrado: el 4:5 de Luma pierde el aire de arriba y abajo (al ampliarlo se ve entero). En los pasados, una miniatura. */}
              <img src={evento.imagen} alt="" loading={proximo ? "eager" : "lazy"} className={proximo ? "block h-full w-full object-cover object-center" : "block h-full w-full object-contain"} />
            </button>
          ) : null}
        </div>

        <details className="mt-2">
          <summary className={`${SUMMARY} min-h-9 w-fit py-1.5 text-[.85rem] ${ACENTO} ${FOCO}`}>{t.detalles}</summary>
          <div className="max-w-[65ch] pt-2.5 pb-1">
            {evento.detalle ? <Descripcion parrafos={evento.detalle} /> : null}
            <p className={`mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1.5 text-[.85rem] ${TENUE}`}>
              <span className="inline-flex items-baseline gap-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="flex-none self-center text-aisc-coral">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                </svg>
                {evento.lugar}
              </span>
              {evento.url ? (
                <a className={`${LINK} font-medium`} href={evento.url} {...externo}>
                  {evento.enlace}
                </a>
              ) : null}
            </p>
          </div>
        </details>
      </div>
    </article>
  );
}

/* La línea de tiempo: una raya vertical del color del acento, con un punto por evento. */
function Lista({ eventos, children }: { eventos: number; children: ReactNode }) {
  return (
    <div
      className={
        eventos > 0
          ? "relative min-w-0 pl-[1.45rem] before:absolute before:top-[1.6rem] before:bottom-0 before:left-0 before:w-px before:bg-[#8cc9a0]/60 before:content-[''] sm:pl-[1.75rem]"
          : ""
      }
    >
      {children}
    </div>
  );
}

/* Un destacado de MAIA: la imagen a todo lo ancho y abajo fecha, inscritos y título.
   Con recorte, este llena la caja; sin él, el flyer va entero sobre una copia difuminada de sí mismo. */
function Destacado({ evento, t }: { evento: EventoVista; t: TextosListado }) {
  return (
    <a
      href={`#evento-${evento.id}`}
      className={`group block overflow-hidden rounded-xl border ${FILETE} bg-aisc-forest-deep text-aisc-sand transition-colors hover:border-[#8cc9a0]/60 ${FOCO}`}
    >
      <div aria-hidden="true" className="relative aspect-[16/9] w-full overflow-hidden bg-aisc-forest-deep">
        {evento.portada ? (
          <img src={evento.portada} alt="" loading="lazy" className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : evento.imagen ? (
          <>
            <img src={evento.imagen} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-xl" />
            <img src={evento.imagen} alt="" loading="lazy" className="relative block h-full w-full object-contain" />
          </>
        ) : (
          <img src="/aisc/patterns/aisc-wash-lattice.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        )}
      </div>
      <div className="p-5">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
          <p className={`text-[.8rem] ${TENUE}`}>{evento.fechaConAnio}</p>
          <Asistencia evento={evento} />
        </div>
        <h3 className="font-display mb-3.5 text-[1.2rem] leading-snug font-semibold">{evento.titulo}</h3>
        <span className={`text-[.85rem] ${ACENTO} transition-colors group-hover:text-aisc-coral`}>{t.verEvento}</span>
      </div>
    </a>
  );
}

export default function EventosListado({
  proximos,
  pasados,
  t,
  calendario,
  suscripcion,
  pie,
}: {
  proximos: EventoVista[];
  pasados: EventoVista[];
  t: TextosListado;
  calendario: string;
  suscripcion: string;
  /** La nota del final, como la de MAIA bajo el archivo. */
  pie: ReactNode;
}) {
  const [filtro, setFiltro] = useState<"todos" | Grupo>("todos");
  const [ampliada, setAmpliada] = useState<EventoVista | null>(null);

  const pasa = (e: EventoVista) => filtro === "todos" || e.grupo === filtro;
  const proximosVisibles = proximos.filter(pasa);
  const pasadosVisibles = pasados.filter(pasa);
  /* Los pasados llegan del más reciente al más viejo, y así se quedan los destacados. */
  const destacados = pasados.filter((e) => e.destacado).slice(0, 4);
  const anios = [...new Set(pasadosVisibles.map((e) => e.anio))];

  /* Un destacado lleva a su fila: se abren el año y el detalle que la guardan. */
  useEffect(() => {
    function abrir() {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id.startsWith("evento-")) return;
      const el = document.getElementById(id);
      if (!el) return;
      let padre = el.parentElement?.closest("details") ?? null;
      while (padre) {
        padre.open = true;
        padre = padre.parentElement?.closest("details") ?? null;
      }
      const detalle = el.querySelector("details");
      if (detalle) detalle.open = true;
      requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
    }
    abrir();
    window.addEventListener("hashchange", abrir);
    return () => window.removeEventListener("hashchange", abrir);
  }, []);

  useEffect(() => {
    if (!ampliada) return;
    const cerrar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAmpliada(null);
    };
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, [ampliada]);

  return (
    <section className="bg-aisc-night pb-20 text-aisc-sand">
      <div className={COLUMNA}>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="categoria-eventos">{t.categoria}</label>
            <select
              id="categoria-eventos"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value as typeof filtro)}
              className={`min-h-11 max-w-full rounded-lg border border-aisc-sand/25 bg-aisc-forest-deep py-2 pr-8 pl-3 text-aisc-sand [color-scheme:dark] ${FOCO}`}
            >
              {t.filtros.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-x-5">
            <a className={`${LINK} py-2`} href={calendario} target="_blank" rel="noopener noreferrer">
              {t.verCalendario}
            </a>
            <a className={`${LINK} py-2`} href={suscripcion}>
              {t.suscribirse}
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 pb-6 text-[1.05rem]">
          <a className={`font-semibold ${ACENTO} transition-colors hover:text-aisc-coral`} href="#proximos">
            {t.navProximos}
          </a>
          <a className="text-aisc-sand transition-colors hover:text-aisc-coral" href="#pasados">
            {t.navPasados}
          </a>
        </nav>

        <section className="border-t-2 border-[#8cc9a0]/70 pt-7">
          <header className="mb-4">
            <h2 id="proximos" className="font-display scroll-mt-28 text-[clamp(1.75rem,4vw,2.3rem)] leading-tight font-semibold">
              {t.proximos}
            </h2>
            <p className={`mt-1 text-[.85rem] ${TENUE}`}>{t.zonaHoraria}</p>
          </header>
          <Lista eventos={proximosVisibles.length}>
            {proximosVisibles.length > 0 ? (
              proximosVisibles.map((e) => <Fila key={e.id} evento={e} t={t} proximo ampliar={setAmpliada} />)
            ) : (
              <p className={`pt-2 pb-6 text-[.9rem] ${TENUE}`}>{proximos.length === 0 ? t.sinProximos : t.sinFiltro}</p>
            )}
          </Lista>
        </section>

        <header id="pasados" className={`mt-14 scroll-mt-28 border-t ${FILETE} pt-10 md:mt-16`}>
          <h2 className="font-display mb-2 text-[clamp(1.75rem,4vw,2.3rem)] leading-tight font-semibold">{t.pasados}</h2>
          <p className={TENUE}>{t.pasadosIntro}</p>
        </header>

        {filtro === "todos" && destacados.length > 0 ? (
          <section className="mt-9 mb-10">
            <h2 id="destacados" className="font-display mb-4 scroll-mt-28 text-[1.5rem] font-semibold">
              {t.destacados}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {destacados.map((e) => (
                <Destacado key={e.id} evento={e} t={t} />
              ))}
            </div>
          </section>
        ) : null}

        {anios.length === 0 ? <p className={`pt-6 text-[.9rem] ${TENUE}`}>{t.sinFiltro}</p> : null}
        <div className={`border-b ${FILETE}`}>
          {anios.map((anio) => {
            const delAnio = pasadosVisibles.filter((e) => e.anio === anio);
            return (
              <details key={anio} className={`border-t ${FILETE}`}>
                <summary className={`${SUMMARY} py-5 ${FOCO}`}>
                  <h2 id={`anio-${anio}`} className="font-display scroll-mt-28 text-[1.4rem] font-semibold">
                    {t.anio} · {anio}
                  </h2>
                </summary>
                <div className="pb-6">
                  <Lista eventos={delAnio.length}>
                    {delAnio.map((e) => (
                      <Fila key={e.id} evento={e} t={t} proximo={false} ampliar={setAmpliada} />
                    ))}
                  </Lista>
                </div>
              </details>
            );
          })}
        </div>

        <div className={`mt-8 text-[.85rem] leading-relaxed ${TENUE}`}>{pie}</div>
      </div>

      {ampliada?.imagen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ampliada.titulo}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4"
          onClick={() => setAmpliada(null)}
        >
          <img
            src={ampliada.imagen}
            alt={ampliada.titulo}
            className="max-h-[88vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            autoFocus
            onClick={() => setAmpliada(null)}
            className={`absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-aisc-sand text-aisc-night ${FOCO}`}
          >
            <span className="sr-only">{t.cerrar}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : null}
    </section>
  );
}
