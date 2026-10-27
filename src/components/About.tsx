import { business } from '../data/business';
import { Img } from '../lib/Img';
import { delay } from '../lib/delay';
import { BrushIcon, CapIcon, HeartIcon, SparkleIcon } from './Icons';

const PILLARS = [
  { icon: HeartIcon, title: 'Look-led consultations', text: 'Every look starts with your outfit, skin and story.' },
  { icon: SparkleIcon, title: 'Skin-first finish', text: 'Prep and products chosen to stay fresh on camera.' },
  { icon: BrushIcon, title: 'Bridal to everyday', text: 'From wedding mornings to parties and shoots.' },
  { icon: CapIcon, title: 'Learn from an artist', text: 'Courses taught by a practising makeup artist.' },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32" aria-labelledby="about-title">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative order-2 lg:order-1">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Img name="about" alt="Eyeshadow palettes and powders laid out at a makeup station" sizes="(min-width: 1024px) 28vw, 58vw" />
            </div>
            <div className="col-span-2 mt-16 aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Img name="gallery-4" alt="Bride with kundan jewellery and mehendi, side profile" sizes="(min-width: 1024px) 18vw, 38vw" />
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-full bg-wine px-6 py-3 text-sm font-medium text-white shadow-xl">
            <span className="text-gold-light">✦</span> Studio &amp; Academy in Ghaziabad
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow reveal">About the studio</p>
          <h2 id="about-title" className="section-title reveal mt-5" style={delay(80)}>
            Makeup that feels like <span className="italic text-wine">you</span>, only more radiant.
          </h2>
          <p className="reveal mt-6 text-lg leading-relaxed text-muted" style={delay(160)}>
            {business.name} is the Ghaziabad studio of makeup artist {business.artist}. Brides and guests come here for
            polished, long-wearing looks, and aspiring artists come to learn the same techniques in the academy.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal flex gap-4" style={delay(200 + i * 80)}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 text-wine">
                  <Icon />
                </span>
                <span>
                  <strong className="block font-display text-xl font-semibold">{title}</strong>
                  <span className="text-sm text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
