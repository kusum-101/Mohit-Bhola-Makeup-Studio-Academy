// Post-build checks on dist/ – run with `npm test` after `npm run build`.
// Verifies prerendered content, SEO tags, structured data, accessibility basics,
// image references and the "no fabricated data" rules.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const reviews = JSON.parse(fs.readFileSync('src/data/google-reviews.json', 'utf8'));
let failed = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` – ${detail}` : ''}`);
  if (!ok) failed++;
};

// Content & sections
check('app is prerendered', html.includes('id="hero-title"') && !html.includes('<!--app-html-->'));
for (const id of ['services', 'bridal', 'academy', 'portfolio', 'reviews', 'instagram', 'contact']) {
  check(`section #${id} present`, html.includes(`id="${id}"`));
}
check('exactly one <h1>', (html.match(/<h1[\s>]/g) || []).length === 1);

// SEO
check('<title> set', /<title>[^<]{20,}<\/title>/.test(html));
check('meta description', /<meta\s+name="description"\s+content="[^"]{80,}"/.test(html));
check('Open Graph title + image', html.includes('og:title') && html.includes('og:image"'));
check('twitter card', html.includes('summary_large_image'));
check('lang attribute', html.includes('<html lang="en-IN">'));
const ld = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
let data = null;
try { data = ld && JSON.parse(ld[1]); } catch { /* reported below */ }
check('JSON-LD parses', !!data);
check('JSON-LD business name', data?.name === 'Mohit Bhola Makeup Studio & Academy');
check('JSON-LD geo matches listing pin', data?.geo?.latitude === 28.6454613 && data?.geo?.longitude === 77.4186186);
check(
  'no unverified rating in JSON-LD',
  reviews.status === 'verified' ? true : !('aggregateRating' in (data ?? {})),
);
check('robots.txt', fs.existsSync(path.join(dist, 'robots.txt')));
check('og-image.jpg', fs.existsSync(path.join(dist, 'og-image.jpg')));

// Images: every referenced file exists, all have alt + dimensions, only hero is eager
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
check('images rendered', imgs.length > 20, `${imgs.length} <img>`);
check('every <img> has alt', imgs.every((t) => /\balt="/.test(t)));
check('every <img> has width/height', imgs.every((t) => /\bwidth="\d+"/.test(t) && /\bheight="\d+"/.test(t)));
const eager = imgs.filter((t) => t.includes('loading="eager"'));
check('only hero loads eagerly', eager.length === 1 && eager[0].includes('hero-'), `${eager.length} eager`);
const refs = new Set([...html.matchAll(/\/images\/[\w-]+\.webp/g)].map((m) => m[0]));
const missing = [...refs].filter((r) => !fs.existsSync(path.join(dist, r)));
check('all referenced images exist', missing.length === 0, missing.join(', '));

// Links
check('Instagram link', html.includes('https://www.instagram.com/muamohit_bhola/'));
check('Google listing link (CID)', html.includes('maps.google.com/?cid=5020510435656025361'));
check('directions link', html.includes('maps/dir/?api=1&amp;destination=28.6454613,77.4186186'));
check('no placeholder/fake wa.me number', !/wa\.me\/(0+|9{10,}|91X+|1234)/i.test(html));
check('map iframe deferred (not in initial HTML)', !html.includes('<iframe'));

// Honesty rules
if (reviews.status !== 'verified') {
  check('unverified reviews panel links to Google, shows no testimonials', html.includes('data-reviews="unverified"') && !html.includes('<blockquote'));
  check('no star rating number shown', !/\d\.\d<\/span>.*Google reviews/s.test(html));
}
check('representative imagery disclosed', html.includes('Representative imagery') || html.includes('representative'));

// Bundle size budget
const assets = fs.readdirSync(path.join(dist, 'assets'));
const js = assets.filter((f) => f.endsWith('.js')).reduce((s, f) => s + fs.statSync(path.join(dist, 'assets', f)).size, 0);
const css = assets.filter((f) => f.endsWith('.css')).reduce((s, f) => s + fs.statSync(path.join(dist, 'assets', f)).size, 0);
check('JS under 300 kB (raw, ~90 kB gzip)', js < 300_000, `${(js / 1024).toFixed(1)} kB`);
check('CSS under 80 kB (raw)', css < 80_000, `${(css / 1024).toFixed(1)} kB`);

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
