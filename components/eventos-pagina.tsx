import { COLUMNA, LINK, TENUE } from "@/components/eventos-estilos";
import EventosListado, { type EventoVista, type Grupo, type TextosListado } from "@/components/eventos-listado";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { type Evento, type Idioma, type Parrafo, type Tipo, LUMA_PERFIL, LUMA_WEBCAL, anio, cargarEventos, partirEventos } from "@/lib/eventos";

/* La página de eventos en los tres idiomas, calcada de la de MAIA
   (aialignment.mit.edu/events): los próximos en una línea de tiempo, los
   destacados con foto y cuánta gente
   se inscribió, y los pasados plegados por año. Los eventos salen de Luma y
   de lib/eventos.ts. */

const WHATSAPP = "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF";

const LOCALES: Record<Idioma, string> = { es: "es-CO", en: "en-US", pt: "pt-BR" };
const ZONA = "America/Bogota";

const TIPO: Record<Tipo, Record<Idioma, string>> = {
  Charla: { es: "Charla", en: "Talk", pt: "Palestra" },
  Cena: { es: "Cena de diálogo", en: "Dinner conversation", pt: "Jantar de diálogo" },
  Panel: { es: "Panel", en: "Panel", pt: "Painel" },
  Conversatorio: { es: "Conversatorio", en: "Conversation", pt: "Conversa" },
  Taller: { es: "Taller", en: "Workshop", pt: "Oficina" },
};

const GRUPO: Record<Tipo, Grupo> = {
  Charla: "charla",
  Taller: "charla",
  Cena: "cena",
  Panel: "panel",
  Conversatorio: "panel",
};

type Textos = {
  titulo: string;
  descripcion: string;
  intro: string;
  listado: TextosListado;
  inscritos: (n: number) => string;
  enlace: { luma: string; instagram: string; otro: string };
  /** La nota del final, como la de MAIA: qué recoge el archivo y dónde está todo. */
  pie: { nota: string; calendario: string; whatsapp: string };
};

export const TEXTOS: Record<Idioma, Textos> = {
  es: {
    titulo: "Eventos",
    descripcion:
      "Charlas abiertas, cenas de diálogo y paneles sobre seguridad y gobernanza de la inteligencia artificial en Bogotá y en línea, con los próximos eventos y el archivo por año.",
    intro: "Charlas abiertas, cenas de diálogo y paneles de AI Safety Colombia, en Bogotá y en línea.",
    listado: {
      categoria: "Categoría",
      filtros: [
        { id: "todos", label: "Todos los eventos" },
        { id: "charla", label: "Charlas" },
        { id: "cena", label: "Cenas de diálogo" },
        { id: "panel", label: "Paneles y conversatorios" },
      ],
      verCalendario: "Ver calendario",
      suscribirse: "Suscribirse al calendario",
      navProximos: "Próximos",
      navPasados: "Eventos pasados",
      proximos: "Próximos eventos",
      zonaHoraria: "Horas en hora de Colombia",
      sinProximos: "No hay eventos anunciados por ahora. Se anuncian primero en el grupo de WhatsApp y en Luma.",
      sinFiltro: "No hay eventos de este tipo.",
      detalles: "Detalles del evento",
      inscribirse: "Inscribirse en Luma",
      pasados: "Eventos pasados",
      pasadosIntro: "Charlas, cenas de diálogo y paneles anteriores.",
      destacados: "Destacados",
      verEvento: "Ver el evento",
      anio: "Pasados",
      grabaciones: "Grabaciones",
      ampliar: "Ampliar la imagen",
      cerrar: "Cerrar",
    },
    inscritos: (n) => `${n} inscritos`,
    enlace: { luma: "Ver en Luma", instagram: "Ver en Instagram", otro: "Ver el evento" },
    pie: {
      nota: "Este archivo recoge los eventos con registro público, no todos los que ha hecho AI Safety Colombia.",
      calendario: "Ver el calendario en Luma",
      whatsapp: "Entrar al grupo de WhatsApp, donde se anuncia todo primero",
    },
  },
  en: {
    titulo: "Events",
    descripcion:
      "Open talks, dinner conversations and panels on AI safety and governance in Bogotá and online, with upcoming events and the archive by year.",
    intro: "Open talks, dinner conversations and panels by AI Safety Colombia, in Bogotá and online. Most events are in Spanish.",
    listado: {
      categoria: "Category",
      filtros: [
        { id: "todos", label: "All events" },
        { id: "charla", label: "Talks" },
        { id: "cena", label: "Dinner conversations" },
        { id: "panel", label: "Panels and conversations" },
      ],
      verCalendario: "View calendar",
      suscribirse: "Subscribe to the calendar",
      navProximos: "Upcoming",
      navPasados: "Past events",
      proximos: "Upcoming events",
      zonaHoraria: "Times in Colombia time",
      sinProximos: "No events announced yet. They are announced first in the WhatsApp group and on Luma.",
      sinFiltro: "No events of this type.",
      detalles: "Event details",
      inscribirse: "Register on Luma",
      pasados: "Past events",
      pasadosIntro: "Previous talks, dinner conversations and panels.",
      destacados: "Highlights",
      verEvento: "View event",
      anio: "Past",
      grabaciones: "Recordings",
      ampliar: "Enlarge image",
      cerrar: "Close",
    },
    inscritos: (n) => `${n} registered`,
    enlace: { luma: "View on Luma", instagram: "View on Instagram", otro: "View event" },
    pie: {
      nota: "This archive lists events with public registration, not every event AI Safety Colombia has run.",
      calendario: "View the calendar on Luma",
      whatsapp: "Join the WhatsApp group, where everything is announced first",
    },
  },
  pt: {
    titulo: "Eventos",
    descripcion:
      "Palestras abertas, jantares de diálogo e painéis sobre segurança e governança da inteligência artificial em Bogotá e online, com os próximos eventos e o arquivo por ano.",
    intro: "Palestras abertas, jantares de diálogo e painéis da AI Safety Colombia, em Bogotá e online. A maioria dos eventos é em espanhol.",
    listado: {
      categoria: "Categoria",
      filtros: [
        { id: "todos", label: "Todos os eventos" },
        { id: "charla", label: "Palestras" },
        { id: "cena", label: "Jantares de diálogo" },
        { id: "panel", label: "Painéis e conversas" },
      ],
      verCalendario: "Ver calendário",
      suscribirse: "Assinar o calendário",
      navProximos: "Próximos",
      navPasados: "Eventos anteriores",
      proximos: "Próximos eventos",
      zonaHoraria: "Horários no fuso da Colômbia",
      sinProximos: "Ainda não há eventos anunciados. Eles são anunciados primeiro no grupo de WhatsApp e no Luma.",
      sinFiltro: "Não há eventos deste tipo.",
      detalles: "Detalhes do evento",
      inscribirse: "Inscrever-se no Luma",
      pasados: "Eventos anteriores",
      pasadosIntro: "Palestras, jantares de diálogo e painéis anteriores.",
      destacados: "Destaques",
      verEvento: "Ver o evento",
      anio: "Anteriores",
      grabaciones: "Gravações",
      ampliar: "Ampliar a imagem",
      cerrar: "Fechar",
    },
    inscritos: (n) => `${n} inscritos`,
    enlace: { luma: "Ver no Luma", instagram: "Ver no Instagram", otro: "Ver o evento" },
    pie: {
      nota: "Este arquivo reúne os eventos com inscrição pública, não todos os que a AI Safety Colombia já realizou.",
      calendario: "Ver o calendário no Luma",
      whatsapp: "Entrar no grupo de WhatsApp, onde tudo é anunciado primeiro",
    },
  },
};

function formato(idioma: Idioma, opciones: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(LOCALES[idioma], { ...opciones, timeZone: ZONA });
}

/* «7 oct», «Oct 7», «7 out»: sin el «de» ni el punto de las abreviaturas. */
function fecha(iso: string, idioma: Idioma, conAnio: boolean) {
  const texto = formato(idioma, { day: "numeric", month: "short", ...(conAnio ? { year: "numeric" } : {}) }).format(new Date(iso));
  return idioma === "en" ? texto : texto.replace(/ de /g, " ").replace(/\./g, "");
}

function horario(e: Evento, idioma: Idioma) {
  if (!e.fin) return null;
  return formato(idioma, { hour: "numeric", minute: "2-digit" })
    .formatRange(new Date(e.inicio), new Date(e.fin))
    .replace(/\s*–\s*/, "–")
    .replace(/(\d) a (\d)/, "$1–$2");
}

/* Los flyers de Luma pesan hasta 1,3 MB; su CDN los entrega reducidos. */
function reducida(src: string) {
  const prefijo = "https://images.lumacdn.com/uploads/";
  return src.startsWith(prefijo) ? src.replace(prefijo, "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=scale-down,width=1000,quality=80/uploads/") : src;
}

/* Lo que se abre en «Detalles del evento»: la descripción de Luma, que está en
   español. En un próximo, el resumen ya va en la fila; en un pasado en inglés o
   portugués pesa más el resumen traducido que la descripción en español. */
function detalle(e: Evento, idioma: Idioma, proximo: boolean): Parrafo[] | null {
  const resumen: Parrafo[] | null = e.resumen ? [{ renglones: [[{ texto: e.resumen[idioma] }]] }] : null;
  if (proximo) return e.descripcion ?? null;
  return idioma === "es" ? (e.descripcion ?? resumen) : (resumen ?? e.descripcion ?? null);
}

function vista(e: Evento, idioma: Idioma, t: Textos, proximo: boolean): EventoVista {
  const host = e.url ? new URL(e.url).hostname : "";
  return {
    id: e.id,
    grupo: GRUPO[e.tipo],
    tipo: TIPO[e.tipo][idioma],
    titulo: e.titulo,
    resumen: e.resumen?.[idioma] ?? null,
    detalle: detalle(e, idioma, proximo),
    lugar: e.lugar[idioma],
    url: e.url,
    enlace: !e.url ? null : host.endsWith("luma.com") ? t.enlace.luma : host.endsWith("instagram.com") ? t.enlace.instagram : t.enlace.otro,
    inscritos: e.inscritos,
    inscritosTexto: e.inscritos ? t.inscritos(e.inscritos) : null,
    imagen: e.imagen ? reducida(e.imagen) : null,
    destacado: e.destacado,
    portada: e.portada ?? null,
    grabaciones: e.grabaciones ?? [],
    fecha: fecha(e.inicio, idioma, false),
    fechaConAnio: fecha(e.inicio, idioma, true),
    horario: horario(e, idioma),
    anio: anio(e.inicio),
  };
}

export default async function EventosPagina({ idioma, active }: { idioma: Idioma; active: string }) {
  const t = TEXTOS[idioma];
  const ahora = new Date();
  const { proximos, pasados } = partirEventos(await cargarEventos(), ahora);

  /* .aisc-page pinta crema y tinta fuera de las capas de Tailwind; el estilo en línea le gana. */
  return (
    <main className="aisc-page min-h-screen" style={{ background: "var(--color-aisc-night)", color: "var(--color-aisc-sand)" }}>
      <section className="relative bg-aisc-night pt-32 pb-10 md:pt-40">
        <SiteHeader active={active} />
        <div className={COLUMNA}>
          <h1 className="font-display text-[clamp(2.75rem,7vw,4rem)] leading-[1.05] font-semibold">{t.titulo}</h1>
          <p className={`mt-4 max-w-[640px] text-[1.05rem] leading-relaxed ${TENUE}`}>{t.intro}</p>
        </div>
      </section>

      <EventosListado
        proximos={proximos.map((e) => vista(e, idioma, t, true))}
        pasados={pasados.map((e) => vista(e, idioma, t, false))}
        t={t.listado}
        calendario={LUMA_PERFIL}
        suscripcion={LUMA_WEBCAL}
        pie={
          <>
            <p>{t.pie.nota}</p>
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              <a className={LINK} href={LUMA_PERFIL} target="_blank" rel="noopener noreferrer">
                {t.pie.calendario}
              </a>
              <a className={LINK} href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                {t.pie.whatsapp}
              </a>
            </p>
          </>
        }
      />
      <SiteFooter idioma={idioma} />
    </main>
  );
}
