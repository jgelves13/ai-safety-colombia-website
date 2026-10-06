import { PORTADAS } from "@/lib/portadas";

/* Los proyectos premiados de un hackathon, al modo de los «Highlighted papers»
   de MAIA: la primera página del reporte casi entera arriba, dentro de una
   tarjeta de fondo suave, y debajo solo el título, el premio y el equipo, sin
   resumen. En pantalla ancha van los cinco en una fila. */

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
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {premiados.map((p) => (
        <li key={p.href} className="flex">
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full flex-col rounded-[var(--radius)] bg-aisc-sand p-5 transition-colors hover:bg-aisc-sand/60"
          >
            {PORTADAS[p.href] ? (
              <img
                src={PORTADAS[p.href]}
                alt=""
                aria-hidden="true"
                width={900}
                height={1165}
                loading="lazy"
                className="aspect-[4/5] w-full bg-white object-cover object-top ring-1 ring-aisc-forest-deep/10 transition-transform duration-300 group-hover:-translate-y-1"
              />
            ) : null}
            <h3 className="font-display mt-5 text-[1.2rem] leading-snug font-semibold text-balance text-aisc-forest transition-colors group-hover:text-aisc-coral">
              {p.titulo}
            </h3>
            <p className="text-body-sm mt-1.5 font-semibold text-aisc-ink">{p.premio}</p>
            <p className="text-meta mt-auto line-clamp-2 pt-4 text-aisc-muted" title={p.equipo}>
              {p.equipo}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
