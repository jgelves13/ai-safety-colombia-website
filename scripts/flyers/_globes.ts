import { Resvg } from '@resvg/resvg-js';
import { geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { createRequire } from 'node:module';
import { BRAND } from './lib';

const require = createRequire(import.meta.url);
const worldTopo: any = require('world-atlas/land-110m.json');

export type GlobeVariant = 'A' | 'B' | 'C' | 'D';

const SIZE = 460;

// Orthographic projection centered on Bogotá (~74°W, ~5°N) so LATAM is front
// and center, with NA, the Atlantic, Greenland, West Europe and West Africa
// visible on the front face of the sphere.
function continentsPath(): string {
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  const projection = geoOrthographic()
    .scale(r)
    .translate([cx, cy])
    .rotate([74, -10, 0])
    .clipAngle(90);
  const path = geoPath(projection);
  const land = feature(worldTopo, worldTopo.objects.land);
  return path(land as any) || '';
}

const CONTINENTS_D = continentsPath();

function classicGlobe(): string {
  // Sphere bg cream/beige, 3 parallels + 3 meridians in soft tan, continents filled forest
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  const grid = '#C9B98F';
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
      <path d="${CONTINENTS_D}" fill="${BRAND.forest}" stroke="${BRAND.forest}" stroke-width="0.6" stroke-linejoin="round"/>
    </g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BRAND.forest}" stroke-width="2.5"/>
  </svg>`;
}

function minimalGlobe(): string {
  // Just sphere outline + continents filled, no grid
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  return `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="sphereB"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BRAND.forest}" stroke-width="2.5"/>
    <g clip-path="url(#sphereB)">
      <path d="${CONTINENTS_D}" fill="${BRAND.forest}" stroke="${BRAND.forest}" stroke-width="0.6" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

function wireframeGlobe(): string {
  // Dense grid (4+4 ellipses) in sage, continents filled forest, no bg fill
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  const grid = BRAND.sage;
  const ratios = [0.92, 0.7, 0.4, 0.15];
  const parallels = ratios.map(rr => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${Math.round(r * rr)}"/>`).join('');
  const meridians = ratios.map(rr => `<ellipse cx="${cx}" cy="${cy}" rx="${Math.round(r * rr)}" ry="${r}"/>`).join('');
  return `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="sphereC"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    </defs>
    <g clip-path="url(#sphereC)" stroke="${grid}" stroke-width="1.3" fill="none" opacity="0.6">
      ${parallels}
      ${meridians}
      <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}"/>
      <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}"/>
    </g>
    <g clip-path="url(#sphereC)">
      <path d="${CONTINENTS_D}" fill="${BRAND.forest}" stroke="${BRAND.forest}" stroke-width="0.6" stroke-linejoin="round"/>
    </g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BRAND.forest}" stroke-width="2.5"/>
  </svg>`;
}

function forestOrbGlobe(): string {
  // Sphere filled forest, continents punched as cream, cream grid
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 3;
  const grid = '#3F6E54';
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
      <path d="${CONTINENTS_D}" fill="${BRAND.cream}" stroke="${BRAND.cream}" stroke-width="0.6" stroke-linejoin="round"/>
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
  C: 'Wireframe',
  D: 'Forest orb',
};

export async function buildGlobeDataUrl(variant: GlobeVariant): Promise<string> {
  const svg = BUILDERS[variant]();
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: SIZE * 2 } });
  const png = resvg.render().asPng();
  return `data:image/png;base64,${Buffer.from(png).toString('base64')}`;
}
