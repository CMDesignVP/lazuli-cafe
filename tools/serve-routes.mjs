/**
 * Mini szerver, ami leutánozza a cafe.lazuli.hu .htaccess átírásait,
 * hogy a tiszta URL-eken (/etlap, /menu, /en, ...) lehessen tesztelni.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const PORT = 8778;

const ROUTES = {
  '/': 'index.html',
  '/en': 'en.html',
  '/de': 'de.html',
  '/etlap': 'etlap.html',
  '/menu': 'menu.html',
  '/speisekarte': 'speisekarte.html',
  '/aszf': 'dokumentum.html',
  '/terms': 'dokumentum.html',
  '/agb': 'dokumentum.html',
  '/adatkezeles': 'dokumentum.html',
  '/privacy': 'dokumentum.html',
  '/datenschutz': 'dokumentum.html',
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0]).replace(/\/+$/, '') || '/';
  const target = ROUTES[path] || path.slice(1);
  try {
    const buf = await readFile(join(ROOT, target));
    res.writeHead(200, { 'Content-Type': MIME[extname(target)] || 'application/octet-stream' });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('404');
  }
}).listen(PORT, '127.0.0.1', () => console.log('fut a ' + PORT + ' porton'));
