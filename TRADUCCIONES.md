# Cómo se mantienen los tres idiomas

El sitio existe en español, inglés y portugués. El español es el original: es el
que está indexado y el que reciben los enlaces que circulan. Los otros dos son
traducciones suyas y no tienen vida propia.

De ahí sale la única regla: **un cambio en español no está terminado hasta que
está en los tres idiomas.** No se publica una corrección en una página y se
dejan las otras dos para después, porque una traducción vieja no se nota
mirando el sitio. La página carga, se ve bien y dice otra cosa.

## Lo que impide que se olvide

`pnpm build` corre primero `scripts/idiomas.mjs`, que guarda la huella de cada
página en español en `lib/traducciones.lock.json`. Si un archivo en español
cambió y su huella no, el build se detiene y nombra las páginas que quedaron
atrás. Vercel corre el mismo `pnpm build`, así que nada llega a producción a
medias.

    pnpm idiomas              ver el estado
    pnpm idiomas --sellar     guardar las huellas, ya con las tres al día

Sellar es lo último que se hace después de traducir, nunca lo primero para que
el build pase. La única excepción legítima es un cambio que no toca el texto
—una clase de Tailwind, un import, una corrección de tipos—: ahí se sella y ya.

## Dónde vive cada cosa

`lib/idiomas.ts` es la tabla única. Cada página aparece una sola vez, con su
dirección en los tres idiomas. De ahí salen el menú, el salto del selector, los
hreflang y la lista que revisa el guardián. **Una página nueva empieza acá**: se
agrega su fila y después se escriben los tres archivos.

Los archivos de página son tres por ruta, escritos a mano:

| español | inglés | portugués |
|---|---|---|
| `app/page.tsx` | `app/en/page.tsx` | `app/pt/page.tsx` |
| `app/seguridad-de-la-ia/` | `app/en/ai-safety/` | `app/pt/seguranca-da-ia/` |
| `app/sprint/` | `app/en/sprint/` | `app/pt/sprint/` |
| `app/sprint/aplicar/` | `app/en/sprint/apply/` | `app/pt/sprint/inscricao/` |
| `app/investigacion/` | `app/en/research/` | `app/pt/pesquisa/` |
| `app/recursos/` | `app/en/resources/` | `app/pt/recursos/` |
| `app/unete/` | `app/en/join/` | `app/pt/participe/` |
| `app/quienes-somos/` | `app/en/about/` | `app/pt/quem-somos/` |

Hay una segunda clase de archivo, la que lleva los tres idiomas adentro en un
`Record<Idioma, …>`: `components/charts.tsx` (los rótulos de las gráficas),
`components/indice-ensayo.tsx`, `lib/textos-aplicar.ts` (el formulario) y
`app/sprint/datos.ts` (la fecha de cierre). Esos no necesitan guardián:
TypeScript no compila si falta un idioma. Cuando algo cambie seguido —una
fecha, una lista de mentores— conviene que viva ahí y no en las tres páginas.

## Lo que no se traduce

Los números y los enlaces del ensayo son los mismos en los tres idiomas y se
copian carácter por carácter. Lo que cambia es el rótulo y el separador
decimal. Por eso los datos de las gráficas viven una sola vez en
`components/charts.tsx`: corregir un dato no puede dejar las tres versiones
diciendo cosas distintas.

Los identificadores que viajan a Supabase desde el formulario (`containment`,
`solo`, `bogota`) tampoco se traducen nunca. Lo traducido es la etiqueta que ve
quien aplica.
