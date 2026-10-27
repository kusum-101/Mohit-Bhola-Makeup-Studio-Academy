import { business, links } from '../data/business';
import { offerings } from '../data/offerings';
import { useEnquiry } from '../lib/enquiry';
import { Img } from '../lib/Img';
import { NAV } from './Header';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { Wordmark } from './Wordmark';

export function CtaBand() {
  const { open } = useEnquiry();
  return (
    <section className="relative overflow-hidden bg-wine py-20 text-white" aria-labelledby="cta-title">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 opacity-30 lg:block" aria-hidden="true">
        <Img name="gallery-2" alt="" sizes="33vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine to-transparent" />
      </div>
      <div className="container-lux relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="eyebrow reveal !text-gold-light">Dates fill fast in wedding season</p>
          <h2 id="cta-title" className="reveal mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Ready to look and feel <span className="italic text-gold-light">unforgettable?</span>
          </h2>
        </div>
        <div className="reveal flex flex-wrap gap-3">
          <button type="button" className="btn btn-gold" onClick={() => open()}>Book a consultation</button>
          <button type="button" className="btn btn-ghost-light" onClick={() => open('pro-course')}>Enquire about courses</button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const services = offerings.filter((o) => o.kind === 'service');
  const courses = offerings.filter((o) => o.kind === 'course');
  return (
    <footer className="bg-ink pt-20 text-white/70">
      <div className="container-lux grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Bridal &amp; occasion makeup, hair styling and makeup courses in Ghaziabad, Uttar Pradesh.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold-light">
              <InstagramIcon />
            </a>
            {links.whatsapp && (
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold-light">
                <WhatsAppIcon />
              </a>
            )}
          </div>
        </div>
        <nav aria-label="Footer">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold-light">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-white">{n.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold-light">Makeup services in Ghaziabad</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => <li key={s.id}><a href="#services" className="hover:text-white">{s.title}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold-light">Makeup courses in Ghaziabad</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {courses.map((c) => <li key={c.id}><a href="#academy" className="hover:text-white">{c.title}</a></li>)}
          </ul>
          <h3 className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold-light">Visit</h3>
          <p className="mt-4 text-sm">Ghaziabad, Uttar Pradesh</p>
          <a href={links.directions} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-gold-light hover:text-white">Get directions →</a>
        </div>
      </div>
      <div className="gold-rule opacity-40" />
      <div className="container-lux flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p>Imagery is representative (Unsplash License).</p>
      </div>
    </footer>
  );
}

export function FloatingContact() {
  const { open } = useEnquiry();
  if (links.whatsapp) {
    return (
      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] transition hover:scale-110">
        <WhatsAppIcon width={28} height={28} />
      </a>
    );
  }
  return (
    <button type="button" onClick={() => open()} className="btn btn-primary fixed bottom-5 right-5 z-30 shadow-2xl sm:hidden">
      Enquire now
    </button>
  );
}
