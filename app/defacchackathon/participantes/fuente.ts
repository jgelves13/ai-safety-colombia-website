import { esFrente, type Participante } from "./datos";

/* Arma la lista de participantes desde Supabase. Entran quienes confirmaron que
   vienen y aceptaron salir en la lista (defacc_confirmations con attending y
   listed). Afiliación, frente e idea salen de su aplicación más reciente. Al
   cliente solo llegan nombre, afiliación, frente y problema: nunca el correo.
   Los resúmenes escritos a mano mandan sobre el texto de la aplicación. */

type Confirmacion = { name: string | null; email: string | null };
type Aplicacion = {
  email: string | null;
  affiliation: string | null;
  preferred_track: string | null;
  project_idea: string | null;
};

type Ajuste = { afiliacion?: string; problema?: string; sinFrente?: boolean };

const AJUSTES: Record<string, Ajuste> = {
  "adrian alejandro espinosa zambrano": {
    afiliacion: "Netdata",
    problema:
      "Un auditor sencillo que revise las descripciones de herramientas MCP antes de que el agente las vea, para detectar órdenes ocultas que lo lleven a leer secretos, alterar argumentos o enviar datos a terceros.",
  },
  "cesar rivas": {
    afiliacion: "Niawi Tech",
    problema:
      "Agentes de ciberdefensa para servidores VPS sin monitoreo, que no solo alerten temprano sino que contengan la amenaza antes de que el servidor quede comprometido.",
  },
  "jose leonardo pinilla zamora": {
    afiliacion: "Universidad Nacional",
    problema:
      "Un sistema con varias capas de guardas contra la inyección de instrucciones en agentes y RAG, con monitoreo de la seguridad del modelo.",
  },
  "julian lizcano": {
    afiliacion: "Independiente",
    problema:
      "Ataques de denegación de servicio a modelos de IA: entradas diseñadas para consumir la mayor cantidad posible de cómputo.",
  },
  "julio alfonso rodriguez buelvas": {
    afiliacion: "Pragma",
    problema:
      "Tener certeza de cómo razona el modelo y de si está configurado para filtrar información.",
  },
  "laura sofia londono perez": {
    afiliacion: "Universidad Sergio Arboleda",
    problema:
      "Un escáner que revise plugins y contenido antes de que un agente los use, y alerte sobre instrucciones ocultas o destinos sospechosos.",
  },
  "michael david rodriguez beltran": {
    afiliacion: "SmartSoft Colombia",
    problema:
      "Cruzar automáticamente cada CVE nueva del NIST con el inventario de software de la empresa, avisar a los afectados y proponer los pasos para parchear.",
  },
  "sadid romero": {
    afiliacion: "BASF",
    problema:
      "Clarity Web, una extensión de navegador que detecta estafas, suplantaciones e información engañosa y las explica en lenguaje sencillo para personas con necesidades cognitivas diversas.",
  },
  "sonia viviana cano guerrero": {
    afiliacion: "SENA · CUN",
    problema:
      "Una capa que filtre el contenido externo antes de que llegue al agente, para frenar instrucciones ocultas, y que se evalúe con casos de ataque reales.",
  },
};

const CORREO = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const ENLACE = /https?:\/\/\S+/g;

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function limpiar(texto: string) {
  return texto.replace(CORREO, "").replace(ENLACE, "").replace(/\s+/g, " ").trim();
}

function recortar(texto: string, maximo: number) {
  if (texto.length <= maximo) return texto;
  const corte = texto.slice(0, maximo);
  const espacio = corte.lastIndexOf(" ");
  return (espacio > maximo * 0.6 ? corte.slice(0, espacio) : corte).replace(/[\s,.;:]+$/, "") + "…";
}

function afiliacionCorta(texto: string | null) {
  if (!texto) return undefined;
  const base = limpiar(texto).split(/[(,.;]/)[0].trim();
  return base ? recortar(base, 60) : undefined;
}

function primerParrafo(texto: string | null) {
  if (!texto) return undefined;
  const parrafo = limpiar(texto.split(/\n\s*\n/)[0] ?? "");
  return parrafo ? recortar(parrafo, 220) : undefined;
}

async function consultar<T>(ruta: string): Promise<T[]> {
  const base = process.env.SUPABASE_URL;
  const llave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !llave) return [];
  const respuesta = await fetch(`${base}/rest/v1/${ruta}`, {
    headers: { apikey: llave, Authorization: `Bearer ${llave}` },
    next: { revalidate: 60 },
  });
  if (!respuesta.ok) throw new Error(`Supabase ${respuesta.status}`);
  return (await respuesta.json()) as T[];
}

export async function obtenerParticipantes(): Promise<Participante[]> {
  try {
    const [confirmaciones, aplicaciones] = await Promise.all([
      consultar<Confirmacion>(
        "defacc_confirmations?select=name,email&event=eq.defacc-2026&attending=is.true&listed=is.true",
      ),
      consultar<Aplicacion>(
        "defacc_applications?select=email,affiliation,preferred_track,project_idea&order=submitted_at.desc",
      ),
    ]);

    const porCorreo = new Map<string, Aplicacion>();
    for (const a of aplicaciones) {
      const correo = (a.email ?? "").trim().toLowerCase();
      if (correo && !porCorreo.has(correo)) porCorreo.set(correo, a);
    }

    const vistos = new Set<string>();
    const lista: Participante[] = [];
    for (const c of confirmaciones) {
      const nombre = (c.name ?? "").replace(/\s+/g, " ").trim();
      const clave = normalizar(nombre);
      if (!nombre || vistos.has(clave)) continue;
      vistos.add(clave);
      const aplicacion = porCorreo.get((c.email ?? "").trim().toLowerCase());
      const ajuste = AJUSTES[clave] ?? {};
      const frente = aplicacion?.preferred_track;
      lista.push({
        nombre,
        afiliacion: ajuste.afiliacion ?? afiliacionCorta(aplicacion?.affiliation ?? null),
        frente: !ajuste.sinFrente && esFrente(frente) ? frente : undefined,
        problema: ajuste.problema ?? primerParrafo(aplicacion?.project_idea ?? null),
      });
    }

    return lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  } catch {
    return [];
  }
}
