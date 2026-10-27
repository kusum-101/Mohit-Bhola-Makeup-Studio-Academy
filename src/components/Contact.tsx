import { useState } from 'react';
import { business, links } from '../data/business';
import { delay } from '../lib/delay';
import { EnquiryForm } from './EnquiryForm';
import { ArrowIcon, ClockIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons';

function MapFacade() {
  // The Google Maps iframe (~1 MB of third-party JS) only loads when the visitor asks for it.
  const [load, setLoad] = useState(false);
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-sand">
      {load ? (
        <iframe
          title={`Map showing ${business.name}`}
          src={links.mapEmbed}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setLoad(true)} className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink">
          {/* Decorative map texture */}
          <svg className="absolute inset-0 h-full w-full text-wine/10" aria-hidden="true">
            <defs>
              <pattern id="streets" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
                <path d="M0 40h80M40 0v80" stroke="currentColor" strokeWidth="6" />
                <path d="M0 10h80M10 0v80" stroke="currentColor" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streets)" />
          </svg>
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-wine text-white shadow-xl transition group-hover:scale-110">
            <PinIcon width={28} height={28} />
          </span>
          <span className="relative rounded-full bg-white px-4 py-2 text-sm font-semibold shadow">Load interactive map</span>
        </button>
      )}
    </div>
  );
}

export function Contact() {
  const addressLine = [business.address.street, business.address.locality, business.address.region, business.address.postalCode]
    .filter(Boolean)
    .join(', ');

  return (
    <section id="contact" className="bg-blush/50 py-24 lg:py-32" aria-labelledby="contact-title">
      <div className="container-lux">
        <div className="max-w-2xl">
          <p className="eyebrow reveal">Contact &amp; visit</p>
          <h2 id="contact-title" className="section-title reveal mt-5" style={delay(80)}>
            Let’s plan your <span className="italic text-wine">look</span>
          </h2>
          <p className="reveal mt-5 text-lg text-muted" style={delay(160)}>
            Share your date and what you have in mind. For courses, tell us whether you’re learning for yourself or for a
            career.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="reveal self-start rounded-[2rem] bg-white p-6 shadow-[0_30px_70px_-40px_rgb(43_20_32/0.35)] sm:p-10">
            <EnquiryForm />
          </div>

          <aside className="reveal space-y-6" style={delay(120)} aria-label="Location and contact details">
            <MapFacade />
            <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-8">
              <h3 className="text-3xl">{business.name}</h3>
              <dl className="mt-6 space-y-5 text-sm">
                <div className="flex gap-4">
                  <dt className="text-gold-light"><PinIcon /><span className="sr-only">Address</span></dt>
                  <dd className="text-white/80">
                    {addressLine}
                    {!business.address.street && (
                      <span className="mt-1 block text-xs text-white/50">Use “Get directions” for the exact studio location.</span>
                    )}
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-gold-light"><ClockIcon /><span className="sr-only">Opening hours</span></dt>
                  <dd className="text-white/80">
                    {business.hours ? (
                      <ul className="space-y-1">
                        {business.hours.map(([d, h]) => (
                          <li key={d} className="flex justify-between gap-6"><span>{d}</span><span className="text-white">{h}</span></li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        Hours on request.{' '}
                        <a href={links.googleListing} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/60 underline-offset-4 hover:text-gold-light">
                          Check current timings on Google
                        </a>{' '}
                        before visiting.
                      </>
                    )}
                  </dd>
                </div>
                {links.tel && (
                  <div className="flex gap-4">
                    <dt className="text-gold-light"><PhoneIcon /><span className="sr-only">Phone</span></dt>
                    <dd><a href={links.tel} className="text-white/80 hover:text-gold-light">{links.phoneDisplay}</a></dd>
                  </div>
                )}
              </dl>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href={links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  Get directions <ArrowIcon width={18} height={18} />
                </a>
                {links.whatsapp ? (
                  <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-ink hover:-translate-y-0.5">
                    <WhatsAppIcon /> WhatsApp
                  </a>
                ) : (
                  <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                    <InstagramIcon /> Instagram DM
                  </a>
                )}
                <a href={links.googleListing} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light sm:col-span-2">
                  View on Google Maps
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
