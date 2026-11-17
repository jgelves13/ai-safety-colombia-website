/* Generado por scripts/portadas-defacc.mjs: los proyectos del Defensive
   Acceleration Hackathon que tienen la primera página de su informe en
   `public/aisc/hackathon/defacc-<slug>.jpg`. No editar a mano. */
export const CON_PORTADA: ReadonlySet<string> = new Set([
  "ai-guardian",
  "centinela",
  "centinela-z13",
  "colossus",
  "cyberelote",
  "data-insights",
  "dedalus",
  "ecotrace-team",
  "grizzly-piasg",
  "las-newjeans",
  "lighthouse",
  "los-alumnos-de-esteban",
  "ni-de-riesgo",
  "no-prompt-no-party",
  "quorum",
  "sigma-hackers",
  "the-gardeners",
  "vanguardia",
]);

export function portadaDefAcc(slug: string): string | null {
  return CON_PORTADA.has(slug) ? `/aisc/hackathon/defacc-${slug}.jpg` : null;
}
