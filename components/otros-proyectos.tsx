/* El resto de los proyectos colombianos de un hackathon, plegados debajo de los
   premiados. Se abre como un acordeón de filete a filete, con un más que se
   vuelve menos, y adentro van en tarjetas del mismo fondo suave que las de
   arriba pero sin portada: la ciudad como antetítulo, el título y el equipo al
   pie. Al abrir entran escalonadas (`.aisc-desplegar` en globals.css). */

export type OtroProyecto = {
  titulo: string;
  ciudad: string;
  href: string;
  equipo: string;
};

export default function OtrosProyectos({
  etiqueta,
  proyectos,
  className = "",
}: {
  etiqueta: string;
  proyectos: OtroProyecto[];
  className?: string;
}) {
  return (
    <details className={`group/otros border-y border-aisc-line ${className}`}>
      <summary className="group/sumario flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="font-display text-[1.05rem] font-semibold text-aisc-forest transition-colors group-hover/sumario:text-aisc-coral md:text-[1.15rem]">
          {etiqueta}
        </span>
        <span
          aria-hidden="true"
          className="relative grid size-9 shrink-0 place-items-center rounded-full border border-aisc-forest/25 text-aisc-forest transition-colors group-hover/sumario:border-aisc-forest group-hover/sumario:bg-aisc-forest group-hover/sumario:text-aisc-cream"
        >
          <span className="absolute h-px w-3.5 bg-current" />
          <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 group-open/otros:scale-y-0" />
        </span>
      </summary>

      <ul className="aisc-desplegar grid grid-cols-1 gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {proyectos.map((p, i) => (
          <li key={p.href} className="flex" style={{ "--i": i } as React.CSSProperties}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full flex-col rounded-[var(--radius)] bg-aisc-sand p-5 transition-colors hover:bg-aisc-sand/60"
            >
              <span className="text-kicker text-aisc-muted">{p.ciudad}</span>
              <h4 className="font-display mt-3 text-[1.05rem] leading-snug font-semibold text-balance text-aisc-forest transition-colors group-hover:text-aisc-coral">
                {p.titulo}
              </h4>
              <p className="text-meta mt-auto line-clamp-3 pt-5 text-aisc-muted" title={p.equipo}>
                {p.equipo}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
