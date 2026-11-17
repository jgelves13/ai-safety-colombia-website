import Link from "next/link";
import OtrosProyectos from "@/components/otros-proyectos";
import PremiadosHackathon from "@/components/premiados-hackathon";
import { NOMBRE_EVENTO, RUTA_PROYECTOS, proyectosPublicos } from "@/lib/defacc-proyectos";

/* Los proyectos del Defensive Acceleration Hackathon dentro de Investigación,
   con las mismas piezas que los de Apart: el podio en tarjetas y el resto
   plegado debajo. Se leen del bucket en cada visita, igual que en la página
   del hackatón; si el bucket no responde, el bloque simplemente no sale. */

type Idioma = "es" | "en" | "pt";

const TEXTOS: Record<
  Idioma,
  { fecha: string; evento: string; tracks: Record<string, string>; puestos: Record<1 | 2 | 3, string>; y: string; otros: (n: number) => string; generico: string }
> = {
  es: {
    fecha: "noviembre de 2026",
    evento: "/defacchackathon",
    tracks: {
      "track-1": "Seguridad de agentes",
      "track-2": "Control de IA",
      "track-3": "Ciberdefensa automatizada",
      "track-4": "Defensa epistémica",
      "track-5": "Infraestructura y gobernanza",
      "track-6": "Riesgos multiagente",
    },
    puestos: { 1: "Primer puesto", 2: "Segundo puesto", 3: "Tercer puesto" },
    y: "y",
    otros: (n) => `Ver los otros ${n} proyectos de esta edición`,
    generico: "Participantes del hackathon",
  },
  en: {
    fecha: "November 2026",
    evento: "/en/defacchackathon",
    tracks: {
      "track-1": "Agent security",
      "track-2": "AI control",
      "track-3": "Automated cyberdefense",
      "track-4": "Epistemic defense",
      "track-5": "Infrastructure and governance",
      "track-6": "Multi-agent risks",
    },
    puestos: { 1: "First place", 2: "Second place", 3: "Third place" },
    y: "and",
    otros: (n) => `See the other ${n} projects from this edition`,
    generico: "Hackathon participants",
  },
  pt: {
    fecha: "novembro de 2026",
    evento: "/pt/defacchackathon",
    tracks: {
      "track-1": "Segurança de agentes",
      "track-2": "Controle de IA",
      "track-3": "Ciberdefesa automatizada",
      "track-4": "Defesa epistêmica",
      "track-5": "Infraestrutura e governança",
      "track-6": "Riscos multiagente",
    },
    puestos: { 1: "Primeiro lugar", 2: "Segundo lugar", 3: "Terceiro lugar" },
    y: "e",
    otros: (n) => `Ver os outros ${n} projetos desta edição`,
    generico: "Participantes do hackathon",
  },
};

function nombres(autores: string[], t: (typeof TEXTOS)[Idioma]): string {
  if (!autores.length) return t.generico;
  if (autores.length === 1) return autores[0];
  return `${autores.slice(0, -1).join(", ")} ${t.y} ${autores[autores.length - 1]}`;
}

export default async function DefaccEnInvestigacion({ idioma, className = "" }: { idioma: Idioma; className?: string }) {
  const t = TEXTOS[idioma];
  let proyectos: Awaited<ReturnType<typeof proyectosPublicos>> = [];
  try {
    proyectos = await proyectosPublicos();
  } catch {
    return null;
  }
  if (!proyectos.length) return null;

  const podio = proyectos.filter((p) => p.puesto);
  const resto = proyectos.filter((p) => !p.puesto);

  return (
    <div className={className}>
      <Link className="text-meta text-aisc-muted transition-colors hover:text-aisc-forest" href={t.evento}>
        {NOMBRE_EVENTO} · {t.fecha}
      </Link>
      {podio.length ? (
        <div className="mt-4">
          <PremiadosHackathon
            premiados={podio.map((p) => ({
              titulo: p.titulo,
              premio: t.puestos[p.puesto!],
              ciudad: "Bogotá",
              equipo: nombres(p.autores, t),
              body: p.resumen,
              href: `${RUTA_PROYECTOS}/${p.slug}`,
            }))}
          />
        </div>
      ) : null}
      {resto.length ? (
        <OtrosProyectos
          className="mt-6"
          etiqueta={t.otros(resto.length)}
          proyectos={resto.map((p) => ({
            titulo: p.titulo,
            ciudad: t.tracks[p.track] ?? p.track,
            equipo: nombres(p.autores, t),
            href: `${RUTA_PROYECTOS}/${p.slug}`,
          }))}
        />
      ) : null}
    </div>
  );
}
