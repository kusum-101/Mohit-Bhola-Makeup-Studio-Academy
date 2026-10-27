// Single source of truth for business facts.
// Anything not verified from a public source is `null` and must be confirmed by the owner
// (see OWNER_CHECKLIST.md). Env values override the empty defaults at build time.

const env = import.meta.env;

const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

export const business = {
  // Verified: exact title of the Google Maps listing (maps.app.goo.gl/qdrLcg74DCBFLMgX6).
  name: 'Mohit Bhola Makeup Studio & Academy',
  shortName: 'Mohit Bhola',
  // Verified: Google category "Makeup artist"; listing surfaced for the query "makeup academy".
  category: 'Makeup artist · Makeup academy',
  artist: 'Mohit Bhola',

  // Verified: listing pin coordinates and Google CID.
  geo: { lat: 28.6454613, lng: 77.4186186 },
  googleCid: '5020510435656025361',
  mapsShareUrl: 'https://maps.app.goo.gl/qdrLcg74DCBFLMgX6',

  // Verified at city level (OpenStreetMap reverse geocode of the listing pin).
  // Street address is NOT verified – set VITE_STREET_ADDRESS once the owner confirms it.
  address: {
    street: clean(env.VITE_STREET_ADDRESS),
    locality: 'Ghaziabad',
    region: 'Uttar Pradesh',
    postalCode: clean(env.VITE_POSTAL_CODE),
    country: 'IN',
  },

  // Verified: official Instagram supplied by the client.
  instagram: {
    handle: 'muamohit_bhola',
    url: 'https://www.instagram.com/muamohit_bhola/',
  },

  // Unverified – supplied by owner via env. Links/buttons only render when present.
  phone: clean(env.VITE_PHONE), // E.164, e.g. +919XXXXXXXXX
  whatsapp: clean(env.VITE_WHATSAPP_NUMBER), // digits only incl. country code, e.g. 919XXXXXXXXX
  email: clean(env.VITE_EMAIL),
  // Opening hours were not readable from the public listing. Owner to confirm.
  // Format: [["Mon–Sat", "11:00 AM – 8:00 PM"], ["Sun", "By appointment"]]
  hours: parseHours(env.VITE_OPENING_HOURS),
} as const;

function parseHours(raw: string | undefined): [string, string][] | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) && v.length ? (v as [string, string][]) : null;
  } catch {
    return null;
  }
}

export const links = {
  // Coordinates of the verified listing pin, so directions always land on the studio.
  directions: `https://www.google.com/maps/dir/?api=1&destination=${business.geo.lat},${business.geo.lng}`,
  googleListing: `https://maps.google.com/?cid=${business.googleCid}`,
  mapEmbed: `https://www.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=16&output=embed`,
  whatsapp: business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
        'Hi Mohit Bhola Makeup Studio & Academy, I would like to enquire about ',
      )}`
    : null,
  tel: business.phone ? `tel:${business.phone}` : null,
  mailto: business.email ? `mailto:${business.email}` : null,
};

export const site = {
  url: clean(env.VITE_SITE_URL)?.replace(/\/$/, '') ?? null,
  enquiryEndpoint: clean(env.VITE_ENQUIRY_ENDPOINT),
};
