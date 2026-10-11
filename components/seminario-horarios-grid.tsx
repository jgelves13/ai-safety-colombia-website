"use client";

import { useEffect, useRef } from "react";

import {
  DATOS_SEMINARIO,
  DIA_CORTO,
  NOMBRE_DIA,
  diasDe,
  etiquetaHorario,
  filasDe,
  idHorario,
  ordenarHorarios,
  rangoHorario,
  type Dia,
  type SeminarioId,
} from "@/lib/seminarios-confirmar";

/* Cuadrícula semanal al modo de when2meet: días en columnas y, en filas, las
   sesiones de dos horas. Se marca con clic o arrastrando, con el mouse o el
   dedo; el primer toque decide si se pinta o se borra, y el arrastre sigue en
   ese modo. Las casillas rayadas son horas en que nadie puede facilitar ese
   día. Con teclado, cada casilla es un botón que se prende y se apaga. */

const RAYADO =
  "bg-[repeating-linear-gradient(135deg,transparent_0_5px,var(--color-aisc-line)_5px_6px)]";

export default function SeminarioHorariosGrid({
  seminario,
  marcados,
  onChange,
}: {
  seminario: SeminarioId;
  marcados: string[];
  onChange: (marcados: string[]) => void;
}) {
  const d = DATOS_SEMINARIO[seminario];
  const dias = diasDe(seminario);
  const filas = filasDe(seminario);

  /* El arrastre vive en una ref y no en el estado: cambia en cada movimiento
     del puntero y no tiene por qué volver a pintar la cuadrícula. */
  const arrastre = useRef<{
    pinta: boolean;
    vistos: Set<string>;
    x: number;
    y: number;
  } | null>(null);
  /* Lo marcado, al día dentro de un mismo arrastre: entre dos movimientos
     React todavía no ha vuelto a pintar con lo nuevo. */
  const actuales = useRef(marcados);
  useEffect(() => {
    actuales.current = marcados;
  }, [marcados]);

  useEffect(() => {
    const soltar = () => {
      arrastre.current = null;
    };
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", soltar);
    return () => {
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
    };
  }, []);

  function aplicar(id: string, pinta: boolean) {
    const ya = actuales.current.includes(id);
    if (pinta === ya) return;
    const nuevos = pinta ? [...actuales.current, id] : actuales.current.filter((h) => h !== id);
    actuales.current = nuevos;
    onChange(nuevos);
  }

  function empezar(evento: React.PointerEvent<HTMLButtonElement>, id: string) {
    if (evento.button !== 0) return;
    /* El navegador captura el puntero en el botón donde empezó el toque; se
       suelta para poder seguir el dedo por las demás casillas. */
    evento.currentTarget.releasePointerCapture?.(evento.pointerId);
    const pinta = !actuales.current.includes(id);
    arrastre.current = { pinta, vistos: new Set([id]), x: evento.clientX, y: evento.clientY };
    aplicar(id, pinta);
  }

  function mover(evento: React.PointerEvent<HTMLDivElement>) {
    const a = arrastre.current;
    if (!a) return;
    /* Un arrastre rápido salta casillas entre dos eventos, así que se revisa
       cada pocos píxeles del trazo desde el punto anterior. */
    const dx = evento.clientX - a.x;
    const dy = evento.clientY - a.y;
    const pasos = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 8));
    for (let i = 1; i <= pasos; i += 1) {
      const bajo = document
        .elementFromPoint(a.x + (dx * i) / pasos, a.y + (dy * i) / pasos)
        ?.closest<HTMLElement>("[data-horario]");
      const id = bajo?.dataset.horario;
      if (!id || a.vistos.has(id)) continue;
      a.vistos.add(id);
      aplicar(id, a.pinta);
    }
    a.x = evento.clientX;
    a.y = evento.clientY;
  }

  function casilla(dia: Dia, inicio: string) {
    if (!d.horarios[dia]?.includes(inicio))
      return (
        <span
          key={`${dia}-${inicio}`}
          aria-hidden
          className={`h-12 rounded-[4px] border border-aisc-line md:h-14 ${RAYADO}`}
        />
      );
    const id = idHorario(dia, inicio);
    const marcado = marcados.includes(id);
    return (
      <button
        key={id}
        type="button"
        data-horario={id}
        aria-pressed={marcado}
        aria-label={etiquetaHorario(id)}
        title={etiquetaHorario(id)}
        onPointerDown={(e) => empezar(e, id)}
        /* Con mouse o dedo ya se marcó en pointerdown; detail 0 es el clic que
           dispara el teclado. */
        onClick={(e) => {
          if (e.detail === 0) aplicar(id, !marcado);
        }}
        className={`h-12 cursor-pointer rounded-[4px] border transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-aisc-forest md:h-14 ${
          marcado
            ? "border-aisc-forest bg-aisc-forest"
            : "border-aisc-forest/35 bg-white hover:bg-aisc-forest/10"
        }`}
      />
    );
  }

  const elegidos = ordenarHorarios(marcados);

  return (
    <div>
      {/* En pantallas anchas, días en columnas como en when2meet. En el
          celular las siete columnas quedan de un dedo de ancho, así que la
          cuadrícula se voltea: días en filas y sesiones en columnas. Las dos
          comparten estado; la que no se ve tiene display: none y no estorba. */}
      <div
        role="group"
        aria-label="Horarios disponibles"
        onPointerMove={mover}
        className="hidden touch-none select-none gap-1 md:grid"
        style={{ gridTemplateColumns: `7rem repeat(${dias.length}, minmax(0, 1fr))` }}
      >
        <span />
        {dias.map((dia) => (
          <span
            key={dia}
            className="text-meta pb-1 text-center font-medium text-aisc-ink"
            title={NOMBRE_DIA[dia]}
          >
            {DIA_CORTO[dia]}
          </span>
        ))}
        {filas.map((inicio) => (
          <div key={inicio} className="contents">
            <Etiqueta inicio={inicio} className="pr-2" />
            {dias.map((dia) => casilla(dia, inicio))}
          </div>
        ))}
      </div>

      <div
        role="group"
        aria-label="Horarios disponibles"
        onPointerMove={mover}
        className="grid touch-none select-none gap-1 md:hidden"
        style={{ gridTemplateColumns: `3rem repeat(${filas.length}, minmax(0, 1fr))` }}
      >
        <span />
        {filas.map((inicio) => (
          <Etiqueta key={inicio} inicio={inicio} className="justify-center pb-1 text-center" />
        ))}
        {dias.map((dia) => (
          <div key={dia} className="contents">
            <span
              className="text-meta flex items-center font-medium text-aisc-ink"
              title={NOMBRE_DIA[dia]}
            >
              {DIA_CORTO[dia]}
            </span>
            {filas.map((inicio) => casilla(dia, inicio))}
          </div>
        ))}
      </div>

      <div className="text-meta mt-4 flex flex-wrap gap-x-5 gap-y-2 text-aisc-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-3.5 rounded-[3px] border border-aisc-forest bg-aisc-forest" />
          Puedo
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3.5 rounded-[3px] border border-aisc-forest/35 bg-white" />
          No puedo
        </span>
        <span className="inline-flex items-center gap-2">
          <span className={`size-3.5 rounded-[3px] border border-aisc-line ${RAYADO}`} />
          Horario no disponible
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius)] border border-aisc-line bg-white px-4 py-3.5">
        {elegidos.length ? (
          <>
            <p className="text-meta text-aisc-muted">
              {elegidos.length === 1 ? "Marcaste una sesión:" : `Marcaste ${elegidos.length} sesiones:`}
            </p>
            <ul className="text-body-sm mt-2 space-y-1 text-aisc-ink">
              {elegidos.map((id) => (
                <li key={id}>{etiquetaHorario(id)}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-meta text-aisc-muted">Todavía no has marcado ninguna sesión.</p>
        )}
      </div>
    </div>
  );
}

function Etiqueta({ inicio, className }: { inicio: string; className: string }) {
  return (
    <span className={`text-meta flex items-center leading-tight text-aisc-muted ${className}`}>
      {/* Espacios duros: que el corte caiga en el «a» del medio y no dentro de «p. m.». */}
      {rangoHorario(inicio).replace(/(\d) ([ap])\. m\./g, "$1 $2. m.")}
    </span>
  );
}
