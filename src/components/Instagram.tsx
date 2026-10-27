import { business } from '../data/business';
import { Img } from '../lib/Img';
import { delay } from '../lib/delay';
import { InstagramIcon } from './Icons';

// Instagram doesn't allow embedding a profile feed without the Graph API.
// Tiles link to the official profile; swap `image` for the studio's own post photos when supplied.
const TILES = ['gallery-7', 'party', 'gallery-1', 'draping', 'gallery-5', 'hd-makeup'];

export function Instagram() {
  return (
    <section id="instagram" className="bg-ink py-24 text-white lg:py-28" aria-labelledby="ig-title">
      <div className="container-lux">
        <div className="flex flex-col items-center text-center">
          <span className="reveal grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
            <InstagramIcon width={26} height={26} />
          </span>
          <h2 id="ig-title" className="reveal mt-6 text-4xl sm:text-5xl" style={delay(80)}>
            Follow <span className="italic text-gold-light">@{business.instagram.handle}</span>
          </h2>
          <p className="reveal mt-4 max-w-lg text-white/65" style={delay(160)}>
            Fresh bridal looks, behind-the-scenes and academy moments — straight from the studio’s Instagram.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {TILES.map((t, i) => (
            <li key={t} className="reveal" style={delay(i * 60)}>
              <a
                href={business.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="img-zoom group relative block aspect-square overflow-hidden rounded-xl sm:rounded-2xl"
                aria-label={`View @${business.instagram.handle} on Instagram`}
              >
                <Img name={t} alt="" sizes="(min-width: 1024px) 16vw, 32vw" />
                <span className="absolute inset-0 grid place-items-center bg-wine/0 opacity-0 transition duration-500 group-hover:bg-wine/60 group-hover:opacity-100">
                  <InstagramIcon width={28} height={28} />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-center gap-3">
          <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            <InstagramIcon /> Follow on Instagram
          </a>
          <p className="text-xs text-white/45">Preview tiles are representative images; open Instagram for the studio’s actual posts.</p>
        </div>
      </div>
    </section>
  );
}
