import { useCallback, useEffect, useRef, useState } from 'react';
import { business } from '../data/business';
import { Img } from '../lib/Img';
import { delay } from '../lib/delay';
import { ChevronIcon, CloseIcon, InstagramIcon } from './Icons';

// Representative, licensed imagery (Unsplash License) – replace with the studio's own work.
const ITEMS = [
  { name: 'gallery-1', alt: 'Close-up of bridal eye makeup with pink shimmer and a gold nath', tag: 'Bridal' },
  { name: 'gallery-2', alt: 'Bride in a red dupatta against a red backdrop', tag: 'Bridal' },
  { name: 'engagement', alt: 'Bride-to-be in a blush pink lehenga with soft curls', tag: 'Engagement' },
  { name: 'gallery-3', alt: 'Full-length bridal portrait in a red lehenga', tag: 'Bridal' },
  { name: 'gallery-5', alt: 'Bridal bun with red roses and side-swept dupatta', tag: 'Hair' },
  { name: 'gallery-6', alt: 'Bride looking down, gold jewellery and veil', tag: 'Bridal' },
  { name: 'photoshoot', alt: 'Smiling portrait with kundan choker and maang tikka', tag: 'Shoot' },
  { name: 'gallery-8', alt: 'Bride with nath and hand mehendi, soft-glam makeup', tag: 'Bridal' },
];

export function Portfolio() {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i === null ? i : (i + dir + ITEMS.length) % ITEMS.length));
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  const current = index !== null ? ITEMS[index] : null;

  return (
    <section id="portfolio" className="bg-sand/50 py-24 lg:py-32" aria-labelledby="portfolio-title">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow reveal">Portfolio</p>
            <h2 id="portfolio-title" className="section-title reveal mt-5" style={delay(80)}>
              Looks we <span className="italic text-wine">love</span>
            </h2>
          </div>
          <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost reveal">
            <InstagramIcon /> Full portfolio on Instagram
          </a>
        </div>

        <ul className="mt-12 columns-2 gap-3 sm:gap-5 lg:columns-4">
          {ITEMS.map((it, i) => (
            <li key={it.name} className={`reveal mb-3 break-inside-avoid sm:mb-5 ${i % 3 === 1 ? 'lg:mt-10' : ''}`} style={delay((i % 4) * 80)}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="img-zoom group relative block aspect-[4/5] w-full overflow-hidden rounded-[1.4rem]"
                aria-label={`Open image: ${it.alt}`}
              >
                <Img name={it.name} alt={it.alt} sizes="(min-width: 1024px) 23vw, 47vw" />
                <span className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/30" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-wine opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {it.tag}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-muted">
          Representative imagery shown while the studio’s own portfolio photos are being added.
        </p>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialog.current && setIndex(null)}
        aria-label="Image viewer"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/90"
      >
        {current && (
          <figure className="relative flex flex-col items-center">
            <div className="aspect-[4/5] h-[min(80dvh,135vw)] overflow-hidden rounded-2xl">
              <Img name={current.name} alt={current.alt} sizes="80vh" />
            </div>
            <figcaption className="mt-3 max-w-md px-4 text-center text-sm text-white/80">
              {current.alt} · {index! + 1}/{ITEMS.length}
            </figcaption>
            <button type="button" onClick={() => setIndex(null)} className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink" aria-label="Close image viewer">
              <CloseIcon />
            </button>
            <button type="button" onClick={() => go(-1)} className="absolute left-2 top-[45%] grid h-11 w-11 rotate-180 place-items-center rounded-full bg-white/90 text-ink" aria-label="Previous image">
              <ChevronIcon />
            </button>
            <button type="button" onClick={() => go(1)} className="absolute right-2 top-[45%] grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink" aria-label="Next image">
              <ChevronIcon />
            </button>
          </figure>
        )}
      </dialog>
    </section>
  );
}
