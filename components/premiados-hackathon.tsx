import { PORTADAS } from "@/lib/portadas";

/* Los proyectos premiados de un hackathon, como las tarjetas de investigación
   de la portada: la primera página del reporte como una hoja sobre la mesa y,
   debajo, el premio, el título y el equipo. Los premios de la primera fila
   van de a tres y las menciones de la segunda de a dos, así la grilla queda
   llena en pantalla ancha. */

export type Premiado = {
  titulo: string;
  premio: string;
  ciudad: string;
  equipo: string;
  body: string;
  href: string;
};

export default function PremiadosHackathon({ premiados }: { premiados: Premiado[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {premiados.map((p, i) => {
        /* las dos últimas, en la fila de abajo, toman media fila cada una */
        const abajo = i >= premiados.length - 2 && premiados.length === 5;
        return (
          <li key={p.href} className={`flex ${abajo ? "lg:col-span-3" : "lg:col-span-2"} ${i === premiados.length - 1 && abajo ? "sm:col-span-2" : ""}`}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full flex-col overflow-hidden rounded-[var(--radius)] border border-aisc-forest-deep/25 transition-colors hover:border-aisc-forest-deep/60"
            >
              <div aria-hidden="true" className="relative h-[190px] w-full overflow-hidden border-b border-aisc-forest-deep/25 bg-aisc-sand md:h-[220px]">
                {PORTADAS[p.href] ? (
                  <img
                    src={PORTADAS[p.href]}
                    alt=""
                    width={900}
                    height={1165}
                    loading="lazy"
                    className="absolute top-7 left-1/2 w-[150px] -translate-x-1/2 shadow-[0_10px_30px_-8px_rgba(20,54,32,0.35)] ring-1 ring-aisc-forest-deep/10 transition-transform duration-300 group-hover:-translate-y-1.5 md:top-8 md:w-[172px]"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <span className="text-kicker text-aisc-coral">{p.premio}</span>
                <h3 className="text-display-4 md:text-display-4-lg mt-3 text-balance transition-colors group-hover:text-aisc-forest">
                  {p.titulo}
                </h3>
                <p className="text-body-sm mt-3 text-aisc-ink">{p.body}</p>
                <p className="text-meta mt-auto line-clamp-2 pt-5 text-aisc-muted" title={p.equipo}>
                  {p.ciudad} · {p.equipo}
                </p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
