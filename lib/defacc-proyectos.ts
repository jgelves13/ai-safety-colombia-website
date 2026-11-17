import { createHash } from "node:crypto";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { portadaDefAcc } from "./defacc-portadas";
import { jueces, puntajesDelJuez, todasLasEntregas, type Entrega } from "./defacc-entregas";

/* Proyectos públicos del Defensive Acceleration Hackathon, al modo de Apart:
   cada entrega tiene su página, con el informe, el código y los comentarios
   del jurado sin nombre, sin nota y sin fecha. Todo sale del bucket, así que
   ni los comentarios ni los datos de los equipos viven en el repositorio, pero
   se guarda una instantánea por diez minutos: leer el bucket entero en cada
   visita agotaba el límite de Storage (429) y la página caía con un 500.
   Nunca sale de acá un correo ni un puntaje. */

export const SITIO = "https://aisafetycolombia.org";
export const RUTA_PROYECTOS = "/defacchackathon/proyectos";
export const FECHA_EVENTO = "14 nov 2026";
export const NOMBRE_EVENTO = "Defensive Acceleration Hackathon";

/* Podio verificado con la regla oficial de resultados (notas corregidas por
   jurado, desempate por impacto). Se fija a mano para que la página pública no
   cambie si alguien vuelve a abrir el panel. */
export const PODIO: Record<string, 1 | 2 | 3> = {
  "ni-de-riesgo": 1,
  dedalus: 2,
  "ecotrace-team": 3,
};

export const NOMBRE_PUESTO: Record<1 | 2 | 3, string> = {
  1: "Primer puesto",
  2: "Segundo puesto",
  3: "Tercer puesto",
};

/* HonestSkills se entregó dos veces con slugs distintos; se publica la versión
   que se presentó en el pitch (cyberelote) y se oculta la otra. */
const OCULTOS = new Set(["cyberelotes"]);

export type ProyectoPublico = {
  slug: string;
  titulo: string;
  equipo: string;
  track: string;
  resumen: string;
  enlace: string;
  autores: string[];
  tienePdf: boolean;
  /* La primera página del informe, si scripts/portadas-defacc.mjs ya la sacó. */
  portada: string | null;
  puesto: 1 | 2 | 3 | null;
};

function publico(e: Entrega): ProyectoPublico {
  return {
    slug: e.slug,
    titulo: e.titulo.trim(),
    equipo: e.equipo.trim(),
    track: e.track,
    resumen: e.resumen.trim(),
    enlace: /^https?:\/\//i.test(e.enlace) ? e.enlace.trim() : "",
    autores: e.integrantes.map((i) => i.nombre.trim()).filter(Boolean),
    tienePdf: !!e.pdf,
    portada: e.pdf ? portadaDefAcc(e.slug) : null,
    puesto: PODIO[e.slug] ?? null,
  };
}

function esPublica(e: Entrega): boolean {
  return !e.prueba && !e.descartada && !e.duplicadoDe && !OCULTOS.has(e.slug);
}

type Instantanea = { entregas: Entrega[]; comentarios: Record<string, string[]> };

/* Las entregas públicas y, por cada una, los comentarios de todos los jurados
   reales (el de prueba no está en jueces()), sin vacíos ni repetidos, en un
   orden que no deja adivinar quién escribió cuál pero que no cambia entre
   visitas. Los jurados se leen de a uno para no saturar Storage. */
async function armarInstantanea(): Promise<Instantanea> {
  const entregas = (await todasLasEntregas()).filter(esPublica);
  const vistos: Record<string, Set<string>> = {};
  const comentarios: Record<string, string[]> = {};
  for (const e of entregas) {
    vistos[e.slug] = new Set();
    comentarios[e.slug] = [];
  }
  for (const j of jueces()) {
    const puntajes = await puntajesDelJuez(j.id);
    for (const [slug, p] of Object.entries(puntajes)) {
      const t = p?.comentario?.trim();
      if (!t || !comentarios[slug]) continue;
      const clave = t.replace(/\s+/g, " ").toLowerCase();
      if (vistos[slug].has(clave)) continue;
      vistos[slug].add(clave);
      comentarios[slug].push(t);
    }
  }
  for (const slug of Object.keys(comentarios)) {
    const orden = (t: string) => createHash("sha256").update(`${slug}\n${t}`).digest("hex");
    comentarios[slug].sort((a, b) => orden(a).localeCompare(orden(b)));
  }
  return { entregas, comentarios };
}

const instantaneaGuardada = unstable_cache(armarInstantanea, ["defacc-publico-v1"], { revalidate: 600 });
const instantanea = cache(() => instantaneaGuardada());

export async function entregaPublica(slug: string): Promise<Entrega | null> {
  return (await instantanea()).entregas.find((e) => e.slug === slug) ?? null;
}

/* Podio primero, el resto por título. */
export async function proyectosPublicos(): Promise<ProyectoPublico[]> {
  const lista = (await instantanea()).entregas.map(publico);
  return lista.sort(
    (a, b) => (a.puesto ?? 9) - (b.puesto ?? 9) || a.titulo.localeCompare(b.titulo, "es"),
  );
}

export async function proyectoPublico(slug: string): Promise<ProyectoPublico | null> {
  const e = await entregaPublica(slug);
  return e ? publico(e) : null;
}

export async function comentariosDe(slug: string): Promise<string[]> {
  return [...((await instantanea()).comentarios[slug] ?? [])];
}

/* Clave BibTeX al estilo de Apart: apellido del primer autor, año y primera
   palabra del título, sin tildes ni símbolos. */
function ascii(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]/g, "").toLowerCase();
}

function escaparBib(t: string): string {
  return t.replace(/[{}\\]/g, "");
}

const AUTOR_GENERICO = "Participantes del Defensive Acceleration Hackathon";

/* Los nombres como se leen en español: "A", "A y B", "A, B y C". */
export function nombresAutores(autores: string[]): string {
  if (!autores.length) return AUTOR_GENERICO;
  if (autores.length === 1) return autores[0];
  return `${autores.slice(0, -1).join(", ")} y ${autores[autores.length - 1]}`;
}

export function bibtex(p: ProyectoPublico): string {
  const partes = (p.autores[0] ?? "").split(/\s+/).filter(Boolean);
  const apellido = ascii(partes.length > 2 ? partes[partes.length - 2] : (partes[partes.length - 1] ?? "")) || "defacc";
  const palabra = ascii(p.titulo.split(/\s+/).find((w) => ascii(w).length > 2) ?? p.titulo) || "proyecto";
  const url = `${SITIO}${RUTA_PROYECTOS}/${p.slug}`;
  const autores = p.autores.length ? p.autores.map(escaparBib).join(" and ") : `{${AUTOR_GENERICO}}`;
  return [
    `@misc{${apellido}2026${palabra},`,
    `  title={{${escaparBib(p.titulo)}}},`,
    `  author={${autores}},`,
    `  year={2026},`,
    `  month={November},`,
    `  note={Presentado al ${NOMBRE_EVENTO}, AI Safety Colombia, Bogotá},`,
    `  howpublished={\\url{${url}}},`,
    `  url={${url}}`,
    `}`,
  ].join("\n");
}

/* Tres proyectos más para el pie de cada página: los siguientes en la lista,
   dando la vuelta, para que todos reciban visitas desde algún lado. */
export function masProyectos(todos: ProyectoPublico[], slug: string, n = 3): ProyectoPublico[] {
  const i = todos.findIndex((p) => p.slug === slug);
  const resto = [...todos.slice(i + 1), ...todos.slice(0, Math.max(i, 0))].filter((p) => p.slug !== slug);
  return resto.slice(0, n);
}
