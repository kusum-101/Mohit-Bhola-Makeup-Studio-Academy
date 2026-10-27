// Injects the server-rendered app, canonical/OG URLs and JSON-LD into dist/index.html,
// and writes robots.txt + sitemap.xml. Runs after `vite build` and the SSR build.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

const html = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const appHtml = ssr.render();
const siteUrl = ssr.site.url; // from VITE_SITE_URL, baked into the SSR bundle

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const head = [];
if (siteUrl) {
  head.push(`<link rel="canonical" href="${esc(siteUrl)}/" />`);
  head.push(`<meta property="og:url" content="${esc(siteUrl)}/" />`);
  head.push(`<meta property="og:image" content="${esc(siteUrl)}/og-image.jpg" />`);
  head.push(`<meta name="twitter:image" content="${esc(siteUrl)}/og-image.jpg" />`);
} else {
  // Absolute URLs are required by most crawlers; set VITE_SITE_URL before deploying.
  head.push(`<meta property="og:image" content="/og-image.jpg" />`);
  console.warn('⚠ VITE_SITE_URL not set – canonical URL, og:url and sitemap omitted.');
}
const jsonLd = JSON.stringify(ssr.structuredData()).replace(/</g, '\\u003c');
head.push(`<script type="application/ld+json">${jsonLd}</script>`);

if (!html.includes('<!--app-html-->') || !html.includes('<!--seo-head-->')) {
  throw new Error('Placeholders missing from dist/index.html');
}
await fs.writeFile(
  path.join(dist, 'index.html'),
  html.replace('<!--seo-head-->', head.join('\n    ')).replace('<!--app-html-->', appHtml),
);

const robots = ['User-agent: *', 'Allow: /'];
if (siteUrl) {
  robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
  await fs.writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n</urlset>\n`,
  );
}
await fs.writeFile(path.join(dist, 'robots.txt'), robots.join('\n') + '\n');
await fs.rm('dist-ssr', { recursive: true, force: true });

console.log(`✓ prerendered ${(appHtml.length / 1024).toFixed(1)} kB of HTML`);
