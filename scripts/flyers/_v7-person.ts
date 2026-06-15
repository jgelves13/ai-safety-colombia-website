import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { render, html } from './lib';
import { WORLD_DOTS_DATAURL } from './_world-dots-data';
import type { FlyerFormat } from './_v3-apart';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');

export type PersonVariant = 'AP';
export type RoleKind = 'ponente' | 'jurado';

export type PersonRole = {
  kind: RoleKind;
  mode?: 'Remoto' | 'Presencial';
  topic: string;
};
export type Person = {
  slug: string;
  name: string;
  aff: string;
  photoPath: string;
  roles: PersonRole[];
};

export const PEOPLE: Record<string, Person> = {
  'juan-felipe': {
    slug: 'juan-felipe',
    name: 'Juan Felipe Cerón',
    aff: 'OpenAI',
    photoPath: 'public/people/juan-felipe.jpg',
    roles: [
      { kind: 'ponente', mode: 'Remoto', topic: 'Adversarial robustness: defensas contra ataques a sistemas de IA.' },
      { kind: 'jurado', topic: 'Inyección de prompts y jailbreaks.' },
    ],
  },
  'alejandro': {
    slug: 'alejandro',
    name: 'Alejandro Toro',
    aff: 'Congreso de la República',
    photoPath: 'public/people/alejandro.jpg',
    roles: [
      { kind: 'ponente', mode: 'Presencial', topic: 'Proyecto de Ley 368/2025: regulación de armas autónomas letales.' },
    ],
  },
  'melissa': {
    slug: 'melissa',
    name: 'Melissa Robles',
    aff: 'BID Lab · Quantil',
    photoPath: 'public/people/melissa.jpg',
    roles: [
      { kind: 'jurado', topic: 'Auditoría de comportamiento (multilingüe, intercultural).' },
    ],
  },
};

async function photoDataUrl(rel: string, size: number): Promise<string> {
  const buf = await readFile(path.join(projectRoot, rel));
  const out = await sharp(buf).resize(size, size, { fit: 'cover' }).jpeg({ quality: 88 }).toBuffer();
  return `data:image/jpeg;base64,${out.toString('base64')}`;
}

// Tokens lifted verbatim from src/styles/global.css
const SITE = {
  bgPrimary:    '#FBF6EC',
  bgSecondary:  '#F1E8D6',
  bgElevated:   '#FFFBF2',
  textPrimary:  '#211A12',
  textSecondary:'#5A5044',
  forest:       '#1F4D32',
  forestDeep:   '#143620',
  coral:        '#E5604D',
  sage:         '#4A8466',
  yellow:       '#F2B705',
  border:       '#E4D9C4',
  hairline:     '#EDE3D0',
};

export default async function (
  person: Person,
  format: FlyerFormat = 'portrait',
  _variant: PersonVariant = 'AP',
) {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  // ── Scale tokens ────────────────────────────────────────────────
  const padX = isPort ? 64 : 56;
  const padT = isPort ? 60 : 52;
  const padB = isPort ? 60 : 52;

  // Lockups
  const lockupSz = isPort ? 18 : 16;

  // Photo
  const photoSize = isPort ? 380 : 320;
  const ringW = 7;

  // Hero text
  const kickerSz = isPort ? 15 : 14;
  const nameSz   = isPort ? 100 : 84;
  const affSz    = isPort ? 18 : 16;

  // Topic block
  const topicLabelSz = isPort ? 12 : 11;
  const topicSz      = isPort ? 24 : 21;

  // Footer
  const footerSz = isPort ? 13 : 12;

  const photoUrl = await photoDataUrl(person.photoPath, 800);

  // ── Geometry (asymmetric: text-left, photo-right) ─────────────
  const heroY = isPort ? 470 : 380;
  const photoX = W - padX - photoSize + 12;     // small bleed right
  const photoY = heroY - photoSize / 2;
  const textColW = photoX - padX - 24;
  const textTopY = isPort ? 270 : 230;

  // ── World map (forest land + coral LATAM, on cream) ──────────
  // Full-bleed, low opacity so it reads as ambient texture, not content.
  const mapW = W + 200;
  const mapH = Math.round(mapW * (720 / 1200));
  const mapX = -100;
  const mapY = Math.round(H * 0.18);
  const worldMap = `
    <img src="${WORLD_DOTS_DATAURL}" style="display:flex;position:absolute;top:${mapY}px;left:${mapX}px;width:${mapW}px;height:${mapH}px;opacity:0.35"/>`;

  // ── Yellow corner bleed (top-right, ~18% opacity) ─────────────
  // Borrows the soft yellow circle motif from hackathon hero. Sits ON TOP of map
  // so the LATAM coral dots remain readable against it.
  const yellowR = isPort ? 460 : 380;
  const yellowBleed = `
    <div style="display:flex;position:absolute;top:${-yellowR * 0.55}px;right:${-yellowR * 0.40}px;width:${yellowR * 2}px;height:${yellowR * 2}px;border-radius:9999px;background:${SITE.yellow};opacity:0.18"></div>`;

  // ── Header lockups (text, forest ink, JetBrains Mono) ─────────
  const header = `
    <div style="display:flex;position:absolute;top:${padT}px;left:${padX}px;right:${padX}px;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:baseline;font-family:Inter;font-weight:900;font-size:${lockupSz}px;letter-spacing:-0.04em;color:${SITE.forest}">
        <span style="display:flex">A</span><span style="display:flex;color:${SITE.coral};padding:0 1px">✱</span><span style="display:flex">PART</span>
      </div>
      <div style="display:flex;align-items:center;gap:${Math.round(lockupSz * 0.55)}px">
        <svg width="${Math.round(lockupSz * 1.2)}" height="${Math.round(lockupSz * 1.2)}" viewBox="0 0 24 24" style="display:flex">
          <polygon points="12,3 22,20 2,20" fill="${SITE.forest}"/>
          <polygon points="12,8 18,18 6,18" fill="${SITE.bgPrimary}"/>
        </svg>
        <div style="display:flex;font-family:Inter;font-weight:800;font-size:${lockupSz}px;letter-spacing:-0.01em;color:${SITE.forest}">AI SAFETY COLOMBIA</div>
      </div>
    </div>`;

  // ── Kicker (mono coral, with rule mark — website hackathon hero style) ─
  const kickerText = person.roles
    .map(r => r.kind === 'ponente' ? 'Ponente inaugural' : 'Jurado')
    .join(' + ')
    .toUpperCase();
  const kicker = `
    <div style="display:flex;align-items:center;gap:14px">
      <div style="display:flex;width:28px;height:2px;background:${SITE.coral}"></div>
      <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:${kickerSz}px;letter-spacing:0.22em;color:${SITE.coral};text-transform:uppercase">${kickerText}</div>
    </div>`;

  // ── Name (Bricolage, last word coral, single column wrap) ─────
  const words = person.name.trim().split(' ');
  const lastWord = words.pop() ?? '';
  const headWords = words.join(' ');
  const nameBlock = `
    <div style="display:flex;flex-wrap:wrap;font-family:Bricolage Grotesque;font-weight:800;font-size:${nameSz}px;line-height:0.92;letter-spacing:-0.045em;color:${SITE.textPrimary};width:${textColW}px">
      <span style="display:flex;margin-right:0.22em">${headWords}</span><span style="display:flex;color:${SITE.coral}">${lastWord}</span>
    </div>`;

  // ── Affiliation (mono forest, all-caps tracked — site treatment) ─
  const aff = `
    <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:${affSz}px;letter-spacing:0.20em;color:${SITE.forest};text-transform:uppercase">${person.aff}</div>`;

  // ── Photo (forest ring, lifted card vibe) ──────────────────────
  const photoBlock = `
    <div style="display:flex;position:absolute;top:${photoY}px;left:${photoX}px;width:${photoSize}px;height:${photoSize}px;border-radius:50%;border:${ringW}px solid ${SITE.forest};box-sizing:border-box;overflow:hidden;background:${SITE.bgPrimary}">
      <img src="${photoUrl}" style="display:flex;width:${photoSize - ringW * 2}px;height:${photoSize - ringW * 2}px;object-fit:cover;border-radius:50%"/>
    </div>`;

  // ── Topic card (cream-elevated, 4px coral left bar — site card pattern) ─
  const topicRows = person.roles.map((r, i) => {
    const labelTxt = r.kind === 'ponente' ? 'En su ponencia' : 'En el track que juzga';
    return `
      ${i === 0 ? '' : `<div style="display:flex;height:1px;background:${SITE.hairline};margin:18px 0;width:100%"></div>`}
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:${topicLabelSz}px;letter-spacing:0.22em;color:${SITE.forest};text-transform:uppercase">${labelTxt}</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:600;font-size:${topicSz}px;line-height:1.32;letter-spacing:-0.012em;color:${SITE.textPrimary}">${r.topic}</div>
      </div>`;
  }).join('');

  const cardY = isPort ? 800 : 670;
  const cardPad = isPort ? 28 : 24;
  const topicCard = `
    <div style="display:flex;position:absolute;top:${cardY}px;left:${padX}px;right:${padX}px;background:${SITE.bgElevated};border:1px solid ${SITE.border};border-radius:14px;overflow:hidden">
      <div style="display:flex;width:5px;background:${SITE.coral}"></div>
      <div style="display:flex;flex-direction:column;padding:${cardPad}px ${cardPad + 4}px;flex:1">${topicRows}</div>
    </div>`;

  // ── Footer (hairline + mono row) ───────────────────────────────
  const footerY = H - padB - 32;
  const footer = `
    <div style="display:flex;position:absolute;left:${padX}px;right:${padX}px;top:${footerY - 20}px;flex-direction:column;gap:14px">
      <div style="display:flex;height:1px;background:${SITE.hairline};width:100%"></div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:${footerSz}px;letter-spacing:0.22em;color:${SITE.forest};text-transform:uppercase">19–21 Jun · Bogotá + Online</div>
        <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:${footerSz}px;letter-spacing:0.12em;color:${SITE.textSecondary}">aisafetycolombia.org/hackathon</div>
      </div>
    </div>`;

  // ── Compose ─────────────────────────────────────────────────────
  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${SITE.bgPrimary};font-family:Inter;position:relative;overflow:hidden">
      ${worldMap}
      ${yellowBleed}
      ${header}
      ${photoBlock}
      <div style="display:flex;flex-direction:column;position:absolute;top:${textTopY}px;left:${padX}px;width:${textColW}px;gap:${isPort ? 24 : 20}px">
        ${kicker}
        ${nameBlock}
        ${aff}
      </div>
      ${topicCard}
      ${footer}
    </div>`;

  const png = await render(html(source), W, H);
  return { filename: `_v7-${person.slug}-${_variant}-${format}.png`, png };
}
