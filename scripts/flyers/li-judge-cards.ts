import { render, html, BRAND } from './lib';

const W = 1080;
const H = 1350;

function c(left: number, top: number, size: number, color: string, opacity = 1): string {
  return `<div style="display:flex;position:absolute;left:${left}px;top:${top}px;width:${size}px;height:${size}px;border-radius:9999px;background:${color};opacity:${opacity}"></div>`;
}

function ring(left: number, top: number, size: number, thickness: number, color: string, opacity = 1): string {
  return `<div style="display:flex;position:absolute;left:${left}px;top:${top}px;width:${size}px;height:${size}px;border-radius:9999px;border:${thickness}px solid ${color};opacity:${opacity}"></div>`;
}

function rect(left: number, top: number, w: number, h: number, color: string, opacity = 1): string {
  return `<div style="display:flex;position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;background:${color};opacity:${opacity}"></div>`;
}

function frame(left: number, top: number, w: number, h: number, thickness: number, color: string, opacity = 1): string {
  return `<div style="display:flex;position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;border:${thickness}px solid ${color};opacity:${opacity}"></div>`;
}

function card(bg: string, elements: string[]): string {
  return `<div style="display:flex;width:${W}px;height:${H}px;background:${bg};position:relative;overflow:hidden">${elements.join('')}</div>`;
}

const cards: { filename: string; source: string }[] = [
  // 1. Cream — Sage half-disc bleeding bottom-right + coral accent top-left
  {
    filename: 'li-judge-01-cream.png',
    source: card(BRAND.cream, [
      c(420, 920, 940, BRAND.sage, 0.26),
      c(-120, -120, 300, BRAND.coral, 0.22),
    ]),
  },

  // 2. Deep Forest — Sage bleeds: stronger top-right, weaker bottom-left
  {
    filename: 'li-judge-02-forest.png',
    source: card('#143620', [
      c(700, -220, 650, BRAND.sage, 0.22),
      c(-200, 1080, 550, BRAND.sage, 0.14),
    ]),
  },

  // 3. Burnt Coral — Two overlapping darker-coral discs forming Venn in top-right + accent
  {
    filename: 'li-judge-03-coral.png',
    source: card('#C24937', [
      c(660, -200, 580, '#8F3527', 0.55),
      c(440, 60, 460, '#8F3527', 0.45),
      c(-120, 1200, 280, '#8F3527', 0.45),
    ]),
  },

  // 4. Dusty Sage — Single cream half-disc rising from top edge + small accent bottom-right
  {
    filename: 'li-judge-04-sage.png',
    source: card('#4C7060', [
      c(80, -700, 920, BRAND.cream, 0.22),
      c(800, 1130, 240, BRAND.cream, 0.18),
    ]),
  },

  // 5. Ink — Symmetric right-edge pair + small left-middle accent (triangular balance)
  {
    filename: 'li-judge-05-ink.png',
    source: card(BRAND.ink, [
      c(820, -200, 460, '#3D3020', 0.65),
      c(820, 1080, 460, '#3D3020', 0.65),
      c(-100, 540, 260, '#3D3020', 0.50),
    ]),
  },

  // 6. Burnished Gold — Large darker-amber half-disc bleeding off right edge + accent
  {
    filename: 'li-judge-06-yellow.png',
    source: card('#B88A0A', [
      c(580, 180, 1100, '#7A5908', 0.55),
      c(-120, -120, 320, '#7A5908', 0.48),
    ]),
  },
];

export default async function (): Promise<{ filename: string; png: Buffer }[]> {
  return Promise.all(
    cards.map(async ({ filename, source }) => {
      const png = await render(html(source), W, H);
      return { filename, png };
    }),
  );
}
