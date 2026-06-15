import http from 'node:http';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT, render, BRAND } from './lib';
import { html } from 'satori-html';

const PORT = 5193;
const FLYERS_DIR = path.join(PROJECT_ROOT, 'scripts', 'flyers');
const OUT_DIR = path.join(FLYERS_DIR, 'dist', 'judge-01-variants');

const W = 1080;
const H = 1350;

function c(left: number, top: number, size: number, color: string, opacity = 1): string {
  return `<div style="display:flex;position:absolute;left:${left}px;top:${top}px;width:${size}px;height:${size}px;border-radius:9999px;background:${color};opacity:${opacity}"></div>`;
}

function ring(left: number, top: number, size: number, thickness: number, color: string, opacity = 1): string {
  return `<div style="display:flex;position:absolute;left:${left}px;top:${top}px;width:${size}px;height:${size}px;border-radius:9999px;border:${thickness}px solid ${color};opacity:${opacity}"></div>`;
}

function card(bg: string, elements: string[]): string {
  return `<div style="display:flex;width:${W}px;height:${H}px;background:${bg};position:relative;overflow:hidden">${elements.join('')}</div>`;
}

function safeFrame(): string {
  // visualize the portrait + text safe zone (center column ~720px wide, vertical 1100px)
  return `<div style="display:flex;position:absolute;left:180px;top:120px;width:720px;height:1100px;border:2px dashed rgba(150,150,150,0.35);opacity:0.6;border-radius:24px"></div>`;
}

type Variant = { key: string; label: string; source: string };

const variants: Variant[] = [
  // A — sage half-disc bottom-right + coral accent top-left (asymmetric, brand mix)
  {
    key: 'a',
    label: 'A · sage half-disc BR + coral accent TL',
    source: card(BRAND.cream, [
      c(420, 920, 940, BRAND.sage, 0.26),
      c(-120, -120, 300, BRAND.coral, 0.22),
    ]),
  },
  // B — sage venn cluster top-right + small accent bottom-left (mirror coral 03 on cream)
  {
    key: 'b',
    label: 'B · sage venn TR + accent BL',
    source: card(BRAND.cream, [
      c(660, -220, 600, BRAND.sage, 0.28),
      c(460, 40, 480, BRAND.sage, 0.20),
      c(-120, 1180, 300, BRAND.sage, 0.30),
    ]),
  },
  // C — big sage horizon disc rising from bottom + thin ring TR + small accent
  {
    key: 'c',
    label: 'C · horizon disc + ring TR + accent',
    source: card(BRAND.cream, [
      c(140, 1080, 800, BRAND.sage, 0.24),
      ring(880, -100, 340, 28, BRAND.sage, 0.45),
      c(-80, 540, 180, BRAND.yellow, 0.32),
    ]),
  },
  // D — three-color mosaic: sage BR + coral TL + yellow ML
  {
    key: 'd',
    label: 'D · 3-color mosaic (sage+coral+yellow)',
    source: card(BRAND.cream, [
      c(540, 1020, 820, BRAND.sage, 0.24),
      c(-160, -160, 360, BRAND.coral, 0.20),
      c(-80, 700, 180, BRAND.yellow, 0.32),
    ]),
  },
];

type State = { version: number; rendering: boolean; pending: boolean; error: string | null; ms: number };
const state: Record<string, State> = Object.fromEntries(
  variants.map((v) => [v.key, { version: 0, rendering: false, pending: false, error: null, ms: 0 }]),
);

async function renderOne(v: Variant) {
  const s = state[v.key];
  if (s.rendering) { s.pending = true; return; }
  s.rendering = true;
  const t0 = Date.now();
  try {
    const png = await render(html(v.source), W, H);
    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(path.join(OUT_DIR, `${v.key}.png`), png);
    s.version++;
    s.error = null;
    s.ms = Date.now() - t0;
    console.log(`[${v.key} v${s.version}] ${(png.length / 1024).toFixed(0)}KB in ${s.ms}ms`);
  } catch (e: any) {
    s.error = e?.message ?? String(e);
    console.error(`[${v.key} err] ${s.error}`);
  } finally {
    s.rendering = false;
    if (s.pending) { s.pending = false; renderOne(v); }
  }
}

const PAGE = `<!doctype html>
<html><head><meta charset="utf-8"><title>Judge card 01 · variants</title>
<style>
  html,body{margin:0;background:#1a1a1a;color:#eee;font-family:system-ui;min-height:100vh}
  .wrap{padding:20px;max-width:1480px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .card{display:flex;flex-direction:column;gap:8px;background:#222;border-radius:8px;padding:14px}
  .bar{display:flex;justify-content:space-between;align-items:center;font-size:12px;opacity:.85}
  .bar .label{font-weight:600;letter-spacing:0.04em;text-transform:uppercase;opacity:.85}
  .bar .meta{display:flex;gap:10px;opacity:.7}
  img{width:100%;display:block;border-radius:4px;background:#000}
  .err{color:#ff8c7a;background:#2a1414;padding:10px 12px;border-radius:6px;font-family:monospace;font-size:11px;white-space:pre-wrap;max-height:160px;overflow:auto}
  .legend{position:sticky;top:0;background:#1a1a1aee;backdrop-filter:blur(6px);padding:10px 0;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;opacity:.9;z-index:10;grid-column:1/3}
</style></head>
<body><div class="wrap">
  <div class="legend">Judge card 01 · 4 variants · 1080×1350 (current is the v11a-style ring sweep on cream)</div>
${variants.map((v) => `
  <div class="card" id="${v.key}">
    <div class="bar">
      <span class="label">${v.label}</span>
      <span class="meta"><span id="v-${v.key}">v—</span><span id="t-${v.key}">—</span></span>
    </div>
    <div id="err-${v.key}"></div>
    <img id="img-${v.key}" alt="${v.label}" />
  </div>`).join('')}
</div>
<script>
const keys = ${JSON.stringify(variants.map((v) => v.key))};
const cur = Object.fromEntries(keys.map((k) => [k, -1]));
async function poll() {
  try {
    const r = await fetch('/state', { cache: 'no-store' });
    const all = await r.json();
    for (const k of keys) {
      const s = all[k] || {};
      const vEl = document.getElementById('v-' + k);
      const tEl = document.getElementById('t-' + k);
      const errEl = document.getElementById('err-' + k);
      if (vEl) vEl.textContent = 'v' + (s.version || 0);
      if (tEl) tEl.textContent = s.rendering ? 'rendering…' : (s.ms ? s.ms + 'ms' : 'idle');
      if (errEl) {
        errEl.className = s.error ? 'err' : '';
        errEl.textContent = s.error || '';
      }
      if ((s.version || 0) !== cur[k]) {
        cur[k] = s.version || 0;
        const img = document.getElementById('img-' + k);
        if (img) img.src = '/img/' + k + '?v=' + cur[k];
      }
    }
  } catch {}
}
setInterval(poll, 700);
poll();
</script></body></html>`;

const server = http.createServer(async (req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(PAGE);
    return;
  }
  if (req.url === '/state') {
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    res.end(JSON.stringify(state));
    return;
  }
  const imgMatch = req.url?.match(/^\/img\/([a-z]+)/);
  if (imgMatch) {
    try {
      const buf = await readFile(path.join(OUT_DIR, `${imgMatch[1]}.png`));
      res.writeHead(200, { 'content-type': 'image/png', 'cache-control': 'no-store' });
      res.end(buf);
    } catch {
      res.writeHead(404); res.end();
    }
    return;
  }
  res.writeHead(404); res.end();
});

server.listen(PORT, () => {
  console.log(`judge 01 variants preview at http://localhost:${PORT}/`);
  for (const v of variants) renderOne(v);
});
