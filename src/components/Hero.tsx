import { business } from '../data/business';
import { useEnquiry } from '../lib/enquiry';
import { Img } from '../lib/Img';
import { delay } from '../lib/delay';
import { ArrowIcon, InstagramIcon, SparkleIcon } from './Icons';

export function Hero() {
  const { open } = useEnquiry();
  return (
    <section id="top" className="relative overflow-hidden bg-ivory" aria-labelledby="hero-title">
      {/* soft brand glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blush blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-52 -left-32 h-[28rem] w-[28rem] rounded-full bg-sand blur-3xl" aria-hidden="true" />

      <div className="container-lux relative grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28 lg:pt-16">
        <div>
          <p className="eyebrow rise">Makeup Studio &amp; Academy · Ghaziabad</p>
          <h1 id="hero-title" className="rise mt-6 text-[2.9rem] leading-[0.98] sm:text-7xl lg:text-[5.4rem]" style={delay(120)}>
            Bridal artistry,
            <br />
            <span className="italic text-wine">worn with grace</span>
            <span className="text-gold">.</span>
          </h1>
          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted" style={delay(240)}>
            Bridal and occasion makeup, hair and draping by makeup artist {business.artist} — plus hands-on makeup courses for
            those who want to learn the craft.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={delay(360)}>
            <button type="button" className="btn btn-primary" onClick={() => open('bridal')}>
              Book your bridal look <ArrowIcon width={18} height={18} />
            </button>
            <a href="#academy" className="btn btn-ghost">Explore courses</a>
          </div>
          <a
            href={business.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rise mt-10 inline-flex items-center gap-3 text-sm text-muted hover:text-wine"
            style={delay(480)}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
              <InstagramIcon width={18} height={18} />
            </span>
            See the latest looks on <strong className="font-semibold text-ink">@{business.instagram.handle}</strong>
          </a>
        </div>

        <div className="rise relative mx-auto w-full max-w-md lg:max-w-none" style={delay(200)}>
          <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[2rem] border border-gold/50" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_40px_80px_-30px_rgb(43_20_32/0.55)]">
            <Img name="hero" alt="Bride in a red lehenga with gold kundan jewellery and soft glam bridal makeup" sizes="(min-width: 1024px) 40vw, 90vw" priority />
          </div>
          <div className="float-slow absolute left-2 bottom-10 flex items-center gap-3 rounded-2xl bg-white/95 p-4 pr-6 shadow-xl backdrop-blur sm:-left-10">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-wine text-gold-light">
              <SparkleIcon />
            </span>
            <span className="text-sm leading-tight">
              <strong className="block font-display text-xl font-semibold">Studio + Academy</strong>
              <span className="text-muted">Get the look, or learn it</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = ['Bridal Makeup', 'Engagement', 'Reception', 'Party Glam', 'HD & Airbrush', 'Hair Styling', 'Saree Draping', 'Makeup Courses'];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-gold/30 bg-ink py-5 text-gold-light" aria-hidden="true">
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl italic">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <span className="text-base not-italic text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
