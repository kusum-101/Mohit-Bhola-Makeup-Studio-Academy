import { bridalSteps } from '../data/offerings';
import { useEnquiry } from '../lib/enquiry';
import { Img } from '../lib/Img';
import { delay } from '../lib/delay';

export function Bridal() {
  const { open } = useEnquiry();
  return (
    <section id="bridal" className="grain relative overflow-hidden bg-ink py-24 text-white lg:py-32" aria-labelledby="bridal-title">
      <div className="pointer-events-none absolute right-0 top-0 h-[40rem] w-[40rem] rounded-full bg-wine/50 blur-[120px]" aria-hidden="true" />
      <div className="container-lux relative grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="eyebrow reveal !text-gold-light">The bridal experience</p>
          <h2 id="bridal-title" className="section-title reveal mt-5" style={delay(80)}>
            One day. <span className="italic text-gold-light">Every</span> photograph.
          </h2>
          <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-white/70" style={delay(160)}>
            Bridal makeup is planned, not rushed. Here’s how your look comes together, from the first chat to the final
            setting spray.
          </p>

          <ol className="mt-12 space-y-0">
            {bridalSteps.map((s, i) => (
              <li key={s.title} className="reveal group relative flex gap-6 pb-8 last:pb-0" style={delay(200 + i * 90)}>
                {i < bridalSteps.length - 1 && <span className="absolute left-[1.35rem] top-12 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-gold/60 to-gold/0" aria-hidden="true" />}
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 font-display text-lg italic text-gold-light transition group-hover:bg-gold group-hover:text-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="pt-1.5">
                  <strong className="block font-display text-2xl font-medium">{s.title}</strong>
                  <span className="mt-1 block text-white/65">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="reveal mt-12 flex flex-wrap gap-3">
            <button type="button" className="btn btn-gold" onClick={() => open('bridal')}>Check your date</button>
            <a href="#portfolio" className="btn btn-ghost-light">See bridal looks</a>
          </div>
        </div>

        <div className="reveal relative grid grid-cols-2 gap-4" style={delay(120)}>
          <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl">
            <Img name="bridal" alt="Smiling bride with maang tikka and layered gold necklaces" sizes="(min-width: 1024px) 24vw, 46vw" />
          </div>
          <div className="mt-20 aspect-[4/5] overflow-hidden rounded-3xl">
            <Img name="gallery-7" alt="Bride in red with statement nath and choker" sizes="(min-width: 1024px) 24vw, 46vw" />
          </div>
          <div className="col-span-2 -mt-8 mx-auto aspect-[4/5] w-1/2 overflow-hidden rounded-3xl border-4 border-ink">
            <Img name="hairstyling" alt="Stylist creating a bridal updo in the studio chair" sizes="(min-width: 1024px) 24vw, 46vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
