import { createHash } from "node:crypto";
import { jueces, puntajesDelJuez, todasLasEntregas, type Entrega } from "./defacc-entregas";

/* Proyectos públicos del Defensive Acceleration Hackathon, al modo de Apart:
   cada entrega tiene su página, con el informe, el código y los comentarios
   del jurado sin nombre, sin nota y sin fecha. Todo se lee del bucket en cada
   visita, así que ni los comentarios ni los datos de los equipos viven en el
   repositorio. Nunca sale de acá un correo ni un puntaje. */

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
    puesto: PODIO[e.slug] ?? null,
  };
}

function esPublica(e: Entrega): boolean {
  return !e.prueba && !e.descartada && !e.duplicadoDe && !OCULTOS.has(e.slug);
}

export async function entregaPublica(slug: string): Promise<Entrega | null> {
  const todas = await todasLasEntregas();
  return todas.find((e) => e.slug === slug && esPublica(e)) ?? null;
}

/* Podio primero, el resto por título. */
export async function proyectosPublicos(): Promise<ProyectoPublico[]> {
  const lista = (await todasLasEntregas()).filter(esPublica).map(publico);
  return lista.sort(
    (a, b) => (a.puesto ?? 9) - (b.puesto ?? 9) || a.titulo.localeCompare(b.titulo, "es"),
  );
}

export async function proyectoPublico(slug: string): Promise<ProyectoPublico | null> {
  const e = await entregaPublica(slug);
  return e ? publico(e) : null;
}

/* Los comentarios de todos los jurados reales (el de prueba no está en
   jueces()), sin vacíos ni repetidos, en un orden que no deja adivinar quién
   escribió cuál pero que no cambia entre visitas. */
export async function comentariosDe(slug: string): Promise<string[]> {
  const porJuez = await Promise.all(jueces().map((j) => puntajesDelJuez(j.id)));
  const vistos = new Set<string>();
  const textos: string[] = [];
  for (const puntajes of porJuez) {
    const t = puntajes[slug]?.comentario?.trim();
    if (!t) continue;
    const clave = t.replace(/\s+/g, " ").toLowerCase();
    if (vistos.has(clave)) continue;
    vistos.add(clave);
    textos.push(t);
  }
  const orden = (t: string) => createHash("sha256").update(`${slug}\n${t}`).digest("hex");
  return textos.sort((a, b) => orden(a).localeCompare(orden(b)));
}

/* Clave BibTeX al estilo de Apart: apellido del primer autor, año y primera
   palabra del título, sin tildes ni símbolos. */
function ascii(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]/g, "").toLowerCase();
}

function escaparBib(t: string): string {
  return t.replace(/[{}\\]/g, "");
}

export function bibtex(p: ProyectoPublico): string {
  const primero = p.autores[0] ?? p.equipo;
  const partes = primero.split(/\s+/).filter(Boolean);
  const apellido = ascii(partes.length > 2 ? partes[partes.length - 2] : (partes[partes.length - 1] ?? "equipo"));
  const palabra = ascii(p.titulo.split(/\s+/).find((w) => ascii(w).length > 2) ?? p.titulo) || "proyecto";
  const url = `${SITIO}${RUTA_PROYECTOS}/${p.slug}`;
  const autores = (p.autores.length ? p.autores : [p.equipo]).map(escaparBib).join(" and ");
  return [
    `@misc{${apellido || "equipo"}2026${palabra},`,
    `  title={{${escaparBib(p.titulo)}}},`,
    `  author={${autores}},`,
    `  year={2026},`,
    `  month={November},`,
    `  note={Proyecto presentado al ${NOMBRE_EVENTO}, AI Safety Colombia × IEEE CS Uniandes, Bogotá},`,
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
