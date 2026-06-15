import http from 'node:http';
import { watch } from 'node:fs';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';

const PORT = 5183;
const FLYERS_DIR = path.join(PROJECT_ROOT, 'scripts', 'flyers');
const OUT_DIR = path.join(FLYERS_DIR, 'dist', 'serie-hackathon', '_latam');
const FILE = '_v5a-01-latam-pin.ts';
const OUT_FILE = path.join(OUT_DIR, 'pin.png');

const state = { version: 0, rendering: false, pending: false, error: null as string | null };

async function renderPin() {
  if (state.rendering) { state.pending = true; return; }
  state.rendering = true;
  const t0 = Date.now();
  try {
    const modPath = path.join(FLYERS_DIR, FILE);
    const url = `file://${modPath.replace(/\\/g, '/')}?v=${Date.now()}`;
    const mod: any = await import(url);
    const result = await mod.default('portrait');
    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(OUT_FILE, result.png);
    state.version++;
    state.error = null;
    console.log(`[pin v${state.version}] ${(result.png.length / 1024).toFixed(0)}KB in ${Date.now() - t0}ms`);
  } catch (e: any) {
    state.error = e?.message ?? String(e);
    console.error(`[pin error] ${state.error}`);
  } finally {
    state.rendering = false;
    if (state.pending) { state.pending = false; renderPin(); }
  }
}

function debounce<T extends (...a: any[]) => any>(fn: T, ms: number) {
  let t: NodeJS.Timeout | null = null;
  return (...a: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

const trigger = debounce(renderPin, 150);

watch(path.join(FLYERS_DIR, FILE), () => {
  console.log(`[change] ${FILE}`);
  trigger();
});
watch(path.join(FLYERS_DIR, 'lib.ts'), () => {
  console.log('[change] lib.ts');
  trigger();
});

const PAGE = `<!doctype html>
<html><head><meta charset="utf-8"><title>01-lanzamiento A4 pin</title>
<style>
  html,body{margin:0;background:#1a1a1a;color:#eee;font-family:system-ui;min-height:100vh}
  .wrap{padding:24px;max-width:720px;margin:0 auto}
  .bar{display:flex;justify-content:space-between;align-items:center;font-size:12px;opacity:.85;margin-bottom:8px}
  .bar .label{font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:.6}
  .bar .meta{display:flex;gap:10px;opacity:.7}
  img{width:100%;display:block;border-radius:4px;background:#000}
  .err{color:#ff8c7a;background:#2a1414;padding:10px 12px;border-radius:6px;font-family:monospace;font-size:11px;white-space:pre-wrap;max-height:120px;overflow:auto;margin-bottom:8px}
</style></head>
<body><div class="wrap">
  <div class="bar"><span class="label">A4 · LATAM-centered globe · 1080×1350</span><span class="meta"><span id="v">v—</span><span id="t">—</span></span></div>
  <div id="err"></div>
  <img id="img" alt="A4 pin" />
</div>
<script>
let cur = -1;
async function poll() {
  try {
    const r = await fetch('/state', { cache: 'no-store' });
    const s = await r.json();
    document.getElementById('v').textContent = 'v' + s.version;
    document.getElementById('t').textContent = s.rendering ? 'rendering…' : 'idle';
    const errEl = document.getElementById('err');
    errEl.className = s.error ? 'err' : '';
    errEl.textContent = s.error || '';
    if (s.version !== cur) {
      cur = s.version;
      document.getElementById('img').src = '/img?v=' + cur;
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
  if (req.url?.startsWith('/img')) {
    try {
      const buf = await readFile(OUT_FILE);
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
  console.log(`pin preview at http://localhost:${PORT}/`);
  console.log(`watching ${FILE} and lib.ts`);
  renderPin();
});
