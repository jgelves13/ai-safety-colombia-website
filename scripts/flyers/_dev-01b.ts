import http from 'node:http';
import { watch } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';

const PORT = 5181;
const FLYERS_DIR = path.join(PROJECT_ROOT, 'scripts', 'flyers');
const OUT_DIR = path.join(FLYERS_DIR, 'dist', 'serie-hackathon');
const OUT_FILE = path.join(OUT_DIR, '01-lanzamiento-b.png');

let version = 0;
let rendering = false;
let pending = false;
let lastError: string | null = null;

async function renderOnce() {
  if (rendering) { pending = true; return; }
  rendering = true;
  const t0 = Date.now();
  try {
    const modPath = path.join(FLYERS_DIR, '_v3-apart-b.ts');
    const url = `file://${modPath.replace(/\\/g, '/')}?v=${Date.now()}`;
    const mod: any = await import(url);
    const result = await mod.default('portrait');
    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(OUT_FILE, result.png);
    version++;
    lastError = null;
    console.log(`[B v${version}] ${(result.png.length/1024).toFixed(0)}KB in ${Date.now()-t0}ms`);
  } catch (e: any) {
    lastError = e?.message ?? String(e);
    console.error(`[B error] ${lastError}`);
  } finally {
    rendering = false;
    if (pending) { pending = false; renderOnce(); }
  }
}

function debounce<T extends (...a: any[]) => any>(fn: T, ms: number) {
  let t: NodeJS.Timeout | null = null;
  return (...a: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

const triggerRender = debounce(renderOnce, 150);

for (const f of ['_v3-apart-b.ts', 'lib.ts']) {
  watch(path.join(FLYERS_DIR, f), () => {
    console.log(`[B change] ${f}`);
    triggerRender();
  });
}

const PAGE = `<!doctype html>
<html><head><meta charset="utf-8"><title>01-lanzamiento-B dev</title>
<style>
  html,body{margin:0;background:#1a1a1a;color:#eee;font-family:system-ui;min-height:100vh}
  .wrap{display:flex;flex-direction:column;align-items:center;padding:24px;gap:12px}
  .bar{display:flex;gap:16px;font-size:13px;opacity:.8}
  .tag{background:#2d4a32;color:#c8f5d6;padding:2px 8px;border-radius:4px;font-weight:600}
  img{max-width:min(720px,100%);box-shadow:0 8px 40px rgba(0,0,0,.5);display:block}
  .err{color:#ff8c7a;background:#2a1414;padding:12px 16px;border-radius:6px;max-width:720px;font-family:monospace;font-size:12px;white-space:pre-wrap}
</style></head>
<body><div class="wrap">
  <div class="bar"><span class="tag">VARIANT B</span><span id="v">v—</span><span id="t">—</span></div>
  <div id="err"></div>
  <img id="img" alt="01-lanzamiento-B" />
</div>
<script>
let cur = -1;
async function poll() {
  try {
    const r = await fetch('/state', { cache: 'no-store' });
    const s = await r.json();
    document.getElementById('v').textContent = 'v' + s.version;
    document.getElementById('t').textContent = s.rendering ? 'rendering…' : 'idle';
    document.getElementById('err').className = s.error ? 'err' : '';
    document.getElementById('err').textContent = s.error || '';
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
    res.end(JSON.stringify({ version, rendering, error: lastError }));
    return;
  }
  if (req.url?.startsWith('/img')) {
    try {
      const buf = await (await import('node:fs/promises')).readFile(OUT_FILE);
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
  console.log(`dev preview B at http://localhost:${PORT}/`);
  console.log('watching _v3-apart-b.ts and lib.ts — saves trigger re-render');
  renderOnce();
});
