import http from 'node:http';
import { watch } from 'node:fs';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';

const PORT = 5184;
const FLYERS_DIR = path.join(PROJECT_ROOT, 'scripts', 'flyers');
const OUT_DIR = path.join(FLYERS_DIR, 'dist', 'serie-hackathon', '_compare');

type Piece = { order: string; name: string; file: string };

const pieces: Piece[] = [
  { order: '01', name: 'lanzamiento',     file: '_v5a-01-latam-pin.ts' },
  { order: '01b', name: 'illustrated',    file: '_v5b-01-illustrated.ts' },
  { order: '01c', name: 'latam-drawn',    file: '_v5c-01-latam-drawn.ts' },
  { order: '02', name: 'que-es',          file: '_v4-que-es.ts' },
  { order: '03', name: 'tracks',          file: '_v4-tracks.ts' },
  { order: '04', name: 'ponentes',        file: '_v4-ponentes.ts' },
  { order: '05', name: 'jurado',          file: '_v4-jurado.ts' },
  { order: '06', name: 'premio',          file: '_v4-premio.ts' },
  { order: '07', name: 'cierre',          file: '_v4-cierre.ts' },
];

type CardState = { version: number; rendering: boolean; pending: boolean; error: string | null; ms: number };
const state: Record<string, CardState> = Object.fromEntries(
  pieces.map((p) => [p.order, { version: 0, rendering: false, pending: false, error: null, ms: 0 }])
);

async function renderOne(p: Piece) {
  const s = state[p.order];
  if (s.rendering) { s.pending = true; return; }
  s.rendering = true;
  const t0 = Date.now();
  try {
    const modPath = path.join(FLYERS_DIR, p.file);
    const url = `file://${modPath.replace(/\\/g, '/')}?v=${Date.now()}`;
    const mod: any = await import(url);
    const result = await mod.default('portrait');
    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(path.join(OUT_DIR, `${p.order}.png`), result.png);
    s.version++;
    s.error = null;
    s.ms = Date.now() - t0;
    console.log(`[${p.order} v${s.version}] ${(result.png.length / 1024).toFixed(0)}KB in ${s.ms}ms`);
  } catch (e: any) {
    s.error = e?.message ?? String(e);
    console.error(`[${p.order} err] ${s.error}`);
  } finally {
    s.rendering = false;
    if (s.pending) { s.pending = false; renderOne(p); }
  }
}

function debounce<T extends (...a: any[]) => any>(fn: T, ms: number) {
  let t: NodeJS.Timeout | null = null;
  return (...a: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

const triggers: Record<string, () => void> = Object.fromEntries(
  pieces.map((p) => [p.order, debounce(() => renderOne(p), 150)])
);

for (const p of pieces) {
  watch(path.join(FLYERS_DIR, p.file), () => {
    console.log(`[change] ${p.file}`);
    triggers[p.order]();
  });
}

const triggerAll = debounce(() => { for (const p of pieces) renderOne(p); }, 200);
watch(path.join(FLYERS_DIR, 'lib.ts'), () => {
  console.log('[change] lib.ts -> rebuild all');
  triggerAll();
});

const PAGE = `<!doctype html>
<html><head><meta charset="utf-8"><title>Hackathon carousel · serie</title>
<style>
  html,body{margin:0;background:#1a1a1a;color:#eee;font-family:system-ui;min-height:100vh}
  .wrap{padding:24px;max-width:1200px;margin:0 auto;display:flex;flex-direction:column;gap:28px}
  .card{display:flex;flex-direction:column;gap:8px}
  .bar{display:flex;justify-content:space-between;align-items:center;font-size:12px;opacity:.85}
  .bar .label{font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:.7}
  .bar .meta{display:flex;gap:10px;opacity:.7}
  img{width:100%;display:block;border-radius:4px;background:#000;max-width:1080px;margin:0 auto}
  .err{color:#ff8c7a;background:#2a1414;padding:10px 12px;border-radius:6px;font-family:monospace;font-size:11px;white-space:pre-wrap;max-height:160px;overflow:auto}
  .legend{position:sticky;top:0;background:#1a1a1aee;backdrop-filter:blur(6px);padding:10px 0;border-bottom:1px solid #333;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;opacity:.9;z-index:10}
  .legend a{color:#9be8b8;margin-right:14px;text-decoration:none}
  .legend a:hover{text-decoration:underline}
</style></head>
<body><div class="wrap">
  <div class="legend">
    ${pieces.length} cards · 1080×1350 · live preview
    <span style="float:right">
      ${pieces.map((p) => `<a href="#${p.order}">${p.order}</a>`).join('')}
    </span>
  </div>
${pieces.map((p) => `
  <div class="card" id="${p.order}">
    <div class="bar">
      <span class="label">${p.order} · ${p.name} · ${p.file}</span>
      <span class="meta"><span id="v-${p.order}">v—</span><span id="t-${p.order}">—</span></span>
    </div>
    <div id="err-${p.order}"></div>
    <img id="img-${p.order}" alt="${p.order} ${p.name}" />
  </div>`).join('')}
</div>
<script>
const cards = ${JSON.stringify(pieces.map((p) => p.order))};
const cur = Object.fromEntries(cards.map((o) => [o, -1]));
async function poll() {
  try {
    const r = await fetch('/state', { cache: 'no-store' });
    const all = await r.json();
    for (const o of cards) {
      const s = all[o] || {};
      const vEl = document.getElementById('v-' + o);
      const tEl = document.getElementById('t-' + o);
      const errEl = document.getElementById('err-' + o);
      if (vEl) vEl.textContent = 'v' + (s.version || 0);
      if (tEl) tEl.textContent = s.rendering ? 'rendering…' : (s.ms ? s.ms + 'ms' : 'idle');
      if (errEl) {
        errEl.className = s.error ? 'err' : '';
        errEl.textContent = s.error || '';
      }
      if ((s.version || 0) !== cur[o]) {
        cur[o] = s.version || 0;
        const img = document.getElementById('img-' + o);
        if (img) img.src = '/img/' + o + '?v=' + cur[o];
      }
    }
  } catch {}
}
setInterval(poll, 800);
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
  const imgMatch = req.url?.match(/^\/img\/([\w]+)/);
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
  console.log(`series preview at http://localhost:${PORT}/`);
  console.log(`watching ${pieces.length} card files + lib.ts`);
  for (const p of pieces) renderOne(p);
});
