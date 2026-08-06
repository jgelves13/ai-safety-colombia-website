# AI Safety Colombia — Website

Sitio web de AI Safety Colombia, construido con Next.js 16 (App Router), React 19 y Tailwind CSS 4.

> **Estado:** el diseño es un port fiel de [aisafety.sg](https://www.aisafety.sg). El maquetado, los componentes y la infraestructura están terminados; los textos y las imágenes siguen siendo los del sitio original y están pendientes de reemplazar por contenido de AI Safety Colombia.

---

## Requisitos

- **Node.js** 20 o superior
- **pnpm** 10.33.2 (declarado en `packageManager`)

## Puesta en marcha

```bash
pnpm install
pnpm dev
```

El sitio queda en <http://localhost:3000>.

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con Turbopack |
| `pnpm build` | Build de producción (prerenderiza las entradas del blog) |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | ESLint |

## Estructura

```
app/
  layout.tsx           Layout raíz: fuentes y metadata por defecto
  globals.css          Tokens de diseño y utilidades tipográficas
  page.tsx             Home
  about/               Misión, focus y equipo
  research/            Enfoque, publicaciones destacadas y líneas de trabajo
  events/              Formatos de evento y eventos pasados con filtros
  programs/            Programas activos, pilares y programas pasados
  blog/
    page.tsx           Listado con buscador y filtro por tema
    blog-index.tsx     Cliente: búsqueda y filtrado
    [slug]/            Entrada individual, con índice lateral
components/            Compartidos entre páginas
  site-header.tsx      Header, incluye el header flotante ligado al scroll
  site-footer.tsx      Footer de tres columnas
  cta-panel.tsx        Panel de cierre sobre fondo midnight
  ui.ts                Clases y tokens que se repiten entre páginas
content/blog/          Entradas del blog en Markdown
lib/blog.ts            Lectura de Markdown, render a HTML y extracción del índice
public/
  fonts/               Suisse Works (licencia comercial, ver más abajo)
  sash/                Logos, iconos, patrones, retratos e imágenes del blog
```

Los componentes que solo usa una página viven junto a ella (`app/events/past-events.tsx`, `app/blog/blog-index.tsx`); los que comparten varias están en `components/`. Los imports usan el alias `@/` configurado en `tsconfig.json`.

## Blog

Cada entrada es un archivo Markdown en `content/blog/`. El nombre del archivo define la URL: `content/blog/mi-entrada.md` → `/blog/mi-entrada`.

```markdown
---
title: "Título de la entrada"
description: "Bajada que aparece bajo el título en la cabecera."
date: "2026-07-30T04:11:58.772Z"
dateLabel: "July 2026"
topic: "International Coordination"
---

## Primer encabezado

Texto del cuerpo, con [enlaces](https://example.com), **negritas** e imágenes.

![Texto alternativo](/sash/blog/mi-imagen.png)
```

- `date` ordena el listado (más reciente primero) y alimenta el atributo `datetime`.
- `dateLabel` es lo que se muestra.
- `topic` alimenta el filtro por tema del listado; los temas se derivan de las entradas existentes.
- Los encabezados `##` generan el índice lateral y sus anclas. El resaltado del índice sigue el scroll.

Las imágenes van en `public/sash/blog/` y se referencian con ruta absoluta.

No hace falta registrar la entrada en ningún sitio: `lib/blog.ts` lee el directorio y `generateStaticParams` prerenderiza cada URL en el build.

## Diseño

Los tokens viven en `app/globals.css`:

- **Paleta:** `sash-graphite`, `sash-frost`, `sash-midnight`, `sash-midnight-deep`, `sash-cobalt`, `sash-bluebell`. Se usan como utilidades de Tailwind (`bg-sash-midnight`, `text-sash-frost`).
- **Tipografía:** utilidades `text-display-1…4`, `text-body`, `text-body-sm`, `text-meta`, cada una con su variante `-lg` para pantallas medianas en adelante.
- **Scope:** `.sash-page` aplica el color y la fuente base a cada página.

### Fuentes

- **Suisse Works** (titulares) — fuente comercial de [Swiss Typefaces](https://www.swisstypefaces.com), autoalojada en `public/fonts/`. **Requiere licencia.** El archivo no debe redistribuirse fuera de los términos de esa licencia.
- **Instrument Sans** (cuerpo) — Google Fonts, cargada con `next/font`.

El sitio original usa OT Jubilee Diamond para titulares; este port la sustituye por Suisse Works.

## Notas de implementación

- **Header flotante:** al bajar aparece un header en forma de píldora. No es un interruptor: opacidad, desplazamiento y escala están ligados a la posición del scroll (`components/site-header.tsx`), reproduciendo la curva del sitio original.
- **Imágenes:** el port usa `<img>` en lugar de `next/image` para conservar el marcado del original tal cual. ESLint avisa de ello; es intencional.
- **`AGENTS.md`:** lo regenera `next dev` en cada arranque. Está en `.gitignore`.

## Pendiente

- Reemplazar los textos y retratos de SASH por los de AI Safety Colombia
- Sustituir el logo por `public/ai-safety-logo-text.svg`
- Páginas aún sin crear, enlazadas desde el nav y el footer: `/careers`, `/contact`, `/privacy`, `/programs/singapore-ai-safety-fellowship`
- Menú móvil (el botón existe pero no abre nada)
