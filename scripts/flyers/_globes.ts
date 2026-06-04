import { Resvg } from '@resvg/resvg-js';
import { geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { createRequire } from 'node:module';
import { BRAND } from './lib';

const require = createRequire(import.meta.url);
const landTopo: any = require('world-atlas/land-110m.json');
const countriesTopo: any = require('world-atlas/countries-110m.json');

export type GlobeVariant = 'A' | 'B' | 'C' | 'D';

const SIZE = 460;

// UN M49 numeric IDs (matching world-atlas country.id) for LATAM:
// Mexico, Central America, Caribbean Hispanic + French Antilles, all South America.
const LATAM_IDS = new Set<number>([
  484, 320,  84, 222, 340, 558, 188, 591,                  // MX + Central Am
  192, 214, 332, 388, 630,                                  // Caribbean (CU/DO/HT/JM/PR)
  170, 862, 328, 740, 254,                                  // CO/VE/GUY/SR/GF
  76,  218, 604,  68, 600, 858,  32, 152,                   // BR/EC/PE/BO/PY/UY/AR/CL
]);

function projection() {
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  return geoOrthographic()
    .scale(r)
    .translate([cx, cy])
    .rotate([74, -10, 0])
    .clipAngle(90);
}

const PATH_GEN = geoPath(projection());

const ALL_LAND_D = (() => {
  const land = feature(landTopo, landTopo.objects.land);
  return PATH_GEN(land as any) || '';
})();

const LATAM_D = (() => {
  const countries: any = feature(countriesTopo, countriesTopo.objects.countries);
  const parts: string[] = [];
  for (const f of countries.features) {
    const id = Number(f.id);
    if (LATAM_IDS.has(id)) {
      const d = PATH_GEN(f);
      if (d) parts.push(d);
    }
  }
  return parts.join(' ');
})();

function classicGlobe(): string {
  // Cream/beige sphere, tan grid; rest of world as soft tan outline ghost; LATAM filled forest.
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  const grid = '#C9B98F';
  const ghost = '#B0A47C';
  return `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="sphere"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#F1E5C8"/>
    <g clip-path="url(#sphere)" stroke="${grid}" stroke-width="1.5" fill="none">
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${Math.round(r * 0.82)}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${Math.round(r * 0.5)}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${Math.round(r * 0.18)}"/>
      <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${Math.round(r * 0.5)}" ry="${r}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${Math.round(r * 0.82)}" ry="${r}"/>
    </g>
    <g clip-path="url(#sphere)">
      <path d="${ALL_LAND_D}" fill="none" stroke="${ghost}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="${LATAM_D}" fill="${BRAND.forest}" stroke="${BRAND.forest}" stroke-width="0.6" stroke-linejoin="round"/>
    </g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BRAND.forest}" stroke-width="2.5"/>
  </svg>`;
}

function minimalGlobe(): string {
  // Sphere outline only; rest of world thin sage ghost; LATAM filled forest.
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  return `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="sphereB"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BRAND.forest}" stroke-width="2.5"/>
    <g clip-path="url(#sphereB)">
      <path d="${ALL_LAND_D}" fill="none" stroke="${BRAND.sage}" stroke-width="1.1" stroke-linejoin="round" opacity="0.55"/>
      <path d="${LATAM_D}" fill="${BRAND.forest}" stroke="${BRAND.forest}" stroke-width="0.6" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

function wireframeGlobe(): string {
  // Dense grid in sage, rest of world sage outline ghost, LATAM filled forest (or coral for contrast).
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  const grid = BRAND.sage;
  const ratios = [0.92, 0.7, 0.4, 0.15];
  const parallels = ratios.map(rr => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${Math.round(r * rr)}"/>`).join('');
  const meridians = ratios.map(rr => `<ellipse cx="${cx}" cy="${cy}" rx="${Math.round(r * rr)}" ry="${r}"/>`).join('');
  return `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="sphereC"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    </defs>
    <g clip-path="url(#sphereC)" stroke="${grid}" stroke-width="1.3" fill="none" opacity="0.55">
      ${parallels}
      ${meridians}
      <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}"/>
      <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}"/>
    </g>
    <g clip-path="url(#sphereC)">
      <path d="${ALL_LAND_D}" fill="none" stroke="${BRAND.sage}" stroke-width="1" stroke-linejoin="round" opacity="0.7"/>
      <path d="${LATAM_D}" fill="${BRAND.coral}" stroke="${BRAND.coral}" stroke-width="0.6" stroke-linejoin="round"/>
    </g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BRAND.forest}" stroke-width="2.5"/>
  </svg>`;
}

function forestOrbGlobe(): string {
  // Forest sphere; rest of world darker forest ghost; LATAM punched as cream.
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  const grid = '#3F6E54';
  const ghost = '#3F6E54';
  return `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="sphereD"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${BRAND.forest}"/>
    <g clip-path="url(#sphereD)" stroke="${grid}" stroke-width="1.3" fill="none">
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${Math.round(r * 0.82)}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${Math.round(r * 0.5)}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${Math.round(r * 0.18)}"/>
      <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${Math.round(r * 0.5)}" ry="${r}"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${Math.round(r * 0.82)}" ry="${r}"/>
    </g>
    <g clip-path="url(#sphereD)">
      <path d="${ALL_LAND_D}" fill="none" stroke="${ghost}" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="${LATAM_D}" fill="${BRAND.cream}" stroke="${BRAND.cream}" stroke-width="0.6" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

const BUILDERS: Record<GlobeVariant, () => string> = {
  A: classicGlobe,
  B: minimalGlobe,
  C: wireframeGlobe,
  D: forestOrbGlobe,
};

export const GLOBE_LABELS: Record<GlobeVariant, string> = {
  A: 'Classic',
  B: 'Minimal',
  C: 'Wireframe (coral LATAM)',
  D: 'Forest orb',
};

export async function buildGlobeDataUrl(variant: GlobeVariant): Promise<string> {
  const svg = BUILDERS[variant]();
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: SIZE * 2 } });
  const png = resvg.render().asPng();
  return `data:image/png;base64,${Buffer.from(png).toString('base64')}`;
}
