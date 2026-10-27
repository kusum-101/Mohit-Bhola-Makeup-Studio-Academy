import { useEffect, useState } from 'react';
import { business, links } from '../data/business';
import { useEnquiry } from '../lib/enquiry';
import { CloseIcon, InstagramIcon, MenuIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons';
import { Wordmark } from './Wordmark';

export const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#bridal', label: 'Bridal' },
  { href: '#academy', label: 'Academy' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  return (
    <>
      <div className="bg-ink text-[0.72rem] text-white/80">
        <div className="container-lux flex h-9 items-center justify-between gap-4">
          <a href={links.googleListing} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gold-light">
            <PinIcon width={14} height={14} /> Ghaziabad, Uttar Pradesh
          </a>
          <div className="flex items-center gap-5">
            {links.whatsapp && (
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gold-light">
                <WhatsAppIcon width={14} height={14} /> <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}
            {links.tel && (
              <a href={links.tel} className="hidden items-center gap-1.5 hover:text-gold-light sm:flex">
                <PhoneIcon width={14} height={14} /> {links.phoneDisplay}
              </a>
            )}
            <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gold-light">
              <InstagramIcon width={14} height={14} /> @{business.instagram.handle}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-ivory/90 shadow-[0_8px_30px_-18px_rgb(43_20_32/0.5)] backdrop-blur-md' : 'bg-ivory'
        }`}
      >
        <div className={`container-lux flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          <a href="#top" aria-label={`${business.name} – home`}>
            <Wordmark />
          </a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="relative py-2 text-ink/80 transition hover:text-wine after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" className="btn btn-primary hidden min-h-11 sm:inline-flex" onClick={() => open()}>
              Book now
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-ink text-white transition-[opacity,visibility] duration-500 lg:hidden ${
          menu ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!menu}
        inert={!menu}
      >
        <div className="container-lux flex h-20 items-center justify-between">
          <Wordmark light />
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-white/25" aria-label="Close menu" onClick={() => setMenu(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-lux flex-1 overflow-y-auto pt-6">
          <ul className="space-y-1">
            {NAV.map((n, i) => (
              <li key={n.href} style={{ transitionDelay: menu ? `${80 + i * 50}ms` : '0ms' }} className={`transition duration-500 ${menu ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <a href={n.href} onClick={() => setMenu(false)} className="block border-b border-white/10 py-4 font-display text-4xl italic hover:text-gold-light">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-gold mt-8 w-full" onClick={() => { setMenu(false); open(); }}>
            Book a consultation
          </button>
        </nav>
      </div>
    </>
  );
}
