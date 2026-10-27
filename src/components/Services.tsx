import { useState } from 'react';
import { filters, offerings } from '../data/offerings';
import { useEnquiry } from '../lib/enquiry';
import { Img } from '../lib/Img';
import { delay } from '../lib/delay';
import { ArrowIcon } from './Icons';

export function Services() {
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const { open } = useEnquiry();
  const shown = offerings.filter((o) => o.listed !== false && (active === 'All' || o.category === active));

  return (
    <section id="services" className="bg-blush/50 py-24 lg:py-32" aria-labelledby="services-title">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow reveal">Services &amp; courses</p>
            <h2 id="services-title" className="section-title reveal mt-5" style={delay(80)}>
              Choose your <span className="italic text-wine">look</span>
            </h2>
          </div>
          <div role="group" aria-label="Filter services" className="reveal -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" style={delay(160)}>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={active === f}
                onClick={() => setActive(f)}
                className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition ${
                  active === f ? 'bg-ink text-white' : 'bg-white text-ink/70 hover:text-wine'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {shown.map((o, i) => (
            <li key={o.id} className="reveal is-in" style={delay((i % 3) * 70)}>
              <article className="img-zoom group relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-ink sm:rounded-[1.8rem]">
                <Img name={o.image} alt={`${o.title} – representative image`} sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 48vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-wine sm:left-4 sm:top-4">
                  {o.kind === 'course' ? 'Course' : o.category === 'Makeup' ? 'Makeup' : 'Styling'}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                  <h3 className="text-xl leading-tight sm:text-[1.7rem]">{o.title}</h3>
                  <p className="mt-1.5 hidden truncate text-sm text-white/75 sm:block">{o.line}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-4">
                    <button
                      type="button"
                      onClick={() => open(o.id)}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-gold px-4 text-xs font-bold text-ink transition hover:bg-gold-light"
                      aria-label={`Book ${o.title}`}
                    >
                      {o.kind === 'course' ? 'Enrol' : 'Book now'}
                    </button>
                    {o.detailHref && (
                      <a href={o.detailHref} className="hidden items-center gap-1 text-xs font-semibold text-white/85 hover:text-gold-light sm:inline-flex">
                        Details <ArrowIcon width={14} height={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-xs text-muted">
          Images are representative. Packages and prices are shared on enquiry.
        </p>
      </div>
    </section>
  );
}
