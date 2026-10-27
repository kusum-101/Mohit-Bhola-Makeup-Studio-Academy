import { links } from '../data/business';
import raw from '../data/google-reviews.json';
import { delay } from '../lib/delay';
import { Img } from '../lib/Img';
import { ArrowIcon, GoogleIcon, StarIcon } from './Icons';

interface Review {
  author: string;
  authorUri?: string | null;
  rating: number;
  when?: string | null;
  text: string;
  uri?: string | null;
}
interface ReviewData {
  status: 'verified' | 'unverified';
  source: string | null;
  fetchedAt: string | null;
  rating: number | null;
  userRatingCount: number | null;
  reviews: Review[];
}

const data = raw as ReviewData;
const verified = data.status === 'verified' && typeof data.rating === 'number';
const reviews = data.reviews ?? [];
const listingUrl = data.source ?? links.googleListing;

function Stars({ value, size = 18 }: { value: number; size?: number }) {
  return (
    <span className="flex text-gold" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} width={size} height={size} className={n <= Math.round(value) ? '' : 'opacity-25'} />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="py-24 lg:py-32" aria-labelledby="reviews-title">
      <div className="container-lux">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow reveal">Google reviews</p>
            <h2 id="reviews-title" className="section-title reveal mt-5" style={delay(80)}>
              Kind words from <span className="italic text-wine">our clients</span>
            </h2>
          </div>

          {verified ? (
            <div className="reveal flex flex-col gap-5 rounded-[2rem] border border-ink/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8" style={delay(160)}>
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-ivory"><GoogleIcon width={28} height={28} /></span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl font-semibold">{data.rating!.toFixed(1)}</span>
                    <Stars value={data.rating!} />
                  </div>
                  <p className="text-sm text-muted">
                    {data.userRatingCount} Google reviews · as of{' '}
                    {new Date(data.fetchedAt!).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <a href={listingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary shrink-0">
                Read reviews <ArrowIcon width={18} height={18} />
              </a>
            </div>
          ) : (
            <p className="reveal max-w-md text-lg leading-relaxed text-muted lg:justify-self-end" style={delay(160)}>
              Brides, guests and academy students share their experience on our Google listing.
            </p>
          )}
        </div>

        {verified && reviews.length > 0 ? (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((r, i) => (
              <li key={i} className="reveal flex flex-col rounded-[1.8rem] bg-blush/50 p-7" style={delay(i * 80)}>
                <Stars value={r.rating} size={16} />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink/85">
                  “{r.text.length > 320 ? r.text.slice(0, 317).trimEnd() + '…' : r.text}”
                </blockquote>
                <footer className="mt-6 flex items-center justify-between gap-3 text-sm">
                  <span>
                    <strong className="font-semibold">{r.authorUri ? <a href={r.authorUri} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-wine">{r.author}</a> : r.author}</strong>
                    {r.when && <span className="block text-xs text-muted">{r.when}</span>}
                  </span>
                  <GoogleIcon width={18} height={18} />
                </footer>
              </li>
            ))}
          </ul>
        ) : (
          // No verified review data yet (see README → Google reviews): send visitors to the real,
          // unedited reviews on Google instead of showing invented or placeholder testimonials.
          <div data-reviews="unverified" className="reveal relative mt-12 grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative order-2 p-8 sm:p-12 lg:order-1">
              <span className="pointer-events-none absolute right-8 top-2 font-display text-[9rem] leading-none text-gold/15 select-none sm:top-4" aria-hidden="true">
                “
              </span>
              <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">Straight from Google</p>
              <h3 className="relative mt-4 max-w-lg text-4xl leading-tight sm:text-5xl">
                Every review, <span className="italic text-gold-light">unedited</span>.
              </h3>
              <p className="relative mt-5 max-w-lg leading-relaxed text-white/70">
                We don’t rewrite or hand-pick testimonials. Read what brides, guests and students have shared, exactly as
                they posted it on our Google listing.
              </p>
              <ul className="relative mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-3">
                {['Posted by real clients', 'Never edited by us', 'Always up to date'].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10 flex flex-wrap gap-3">
                <a href={listingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  <GoogleIcon width={18} height={18} /> Read reviews on Google
                </a>
                <a href={listingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                  Share your experience <ArrowIcon width={18} height={18} />
                </a>
              </div>
            </div>
            <div className="relative order-1 h-56 sm:h-72 lg:order-2 lg:h-auto">
              <div className="absolute inset-0">
                <Img name="gallery-6" alt="" sizes="(min-width: 1024px) 34vw, 100vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        )}
        {verified && (
          <p className="mt-6 text-center text-xs text-muted">Reviews from Google. Selection provided by Google; not edited.</p>
        )}
      </div>
    </section>
  );
}
