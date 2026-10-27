// Converts source photos in raw-images/ into responsive, cropped WebP files in public/images/.
// Every output uses the same aspect ratio per slot so cards never shift layout.
// Usage: node scripts/optimize-images.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = 'raw-images';
const OUT = 'public/images';
const WIDTHS = [480, 800, 1200];

// slot name -> source file. Portrait 4:5 crop for everything except the OG image.
const SLOTS = {
  hero: 'hero.jpg',
  about: 'g9.jpg',
  bridal: 'bridal.jpg',
  engagement: 'g8.jpg',
  party: 'party.jpg',
  'hd-makeup': 'hd-makeup.jpg',
  hairstyling: 'hairstyling.jpg',
  draping: 'saree.jpg',
  photoshoot: 'photoshoot.jpg',
  'pro-course': 'pro-course.jpg',
  'self-course': 'self-course.jpg',
  'gallery-1': 'g1.jpg',
  'gallery-2': 'g2.jpg',
  'gallery-3': 'g3.jpg',
  'gallery-4': 'g4.jpg',
  'gallery-5': 'g5.jpg',
  'gallery-6': 'g6.jpg',
  'gallery-7': 'g7.jpg',
  'gallery-8': 'reception.jpg',
};

await fs.mkdir(OUT, { recursive: true });

for (const [slot, file] of Object.entries(SLOTS)) {
  const input = path.join(SRC, file);
  for (const w of WIDTHS) {
    await sharp(input)
      .resize(w, Math.round((w * 5) / 4), { fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: w <= 480 ? 70 : 74, effort: 5 })
      .toFile(path.join(OUT, `${slot}-${w}.webp`));
  }
  // Tiny blurred placeholder, inlined later as a CSS background.
  const lqip = await sharp(input).resize(12, 15, { fit: 'cover' }).webp({ quality: 40 }).toBuffer();
  SLOTS[slot] = `data:image/webp;base64,${lqip.toString('base64')}`;
  console.log('✓', slot);
}

// Open Graph share image (1200x630 JPEG for widest compatibility).
await sharp(path.join(SRC, 'hero.jpg'))
  .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile('public/og-image.jpg');

await fs.writeFile(
  'src/data/image-placeholders.json',
  JSON.stringify(SLOTS, null, 2) + '\n',
);
console.log('✓ og-image + placeholders');
