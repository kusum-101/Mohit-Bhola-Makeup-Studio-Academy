import { courses } from '../data/offerings';
import { useEnquiry } from '../lib/enquiry';
import { Img } from '../lib/Img';
import { delay } from '../lib/delay';
import { ArrowIcon } from './Icons';

export function Academy() {
  const { open } = useEnquiry();
  return (
    <section id="academy" className="py-24 lg:py-32" aria-labelledby="academy-title">
      <div className="container-lux">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow reveal">The academy</p>
            <h2 id="academy-title" className="section-title reveal mt-5" style={delay(80)}>
              Learn the craft, <span className="italic text-wine">brush</span> in hand.
            </h2>
          </div>
          <p className="reveal text-lg leading-relaxed text-muted" style={delay(160)}>
            Practical, hands-on training for aspiring artists and for anyone who wants to do their own makeup with
            confidence. Batch dates, duration and fees are shared on enquiry.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {courses.map((c, i) => (
            <article key={c.id} className="reveal group flex flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(43_20_32/0.45)]" style={delay(i * 100)}>
              <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                <Img name={c.image} alt={`${c.title} – representative image`} sizes="(min-width: 768px) 32vw, 92vw" />
                <span className="absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-wine">
                  {c.audience}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-3xl">{c.title}</h3>
                <div className="gold-rule my-5" />
                <ul className="flex-1 space-y-2.5 text-[0.95rem] text-muted">
                  {c.learn.map((l) => (
                    <li key={l} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => open(c.id)}
                  className="mt-7 inline-flex items-center gap-2 self-start font-semibold text-wine hover:gap-3 transition-all"
                >
                  Ask about the next batch <ArrowIcon width={18} height={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
