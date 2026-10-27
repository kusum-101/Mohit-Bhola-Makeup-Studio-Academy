# Business Research — Mohit Bhola Makeup Studio & Academy

Research date: **27 Oct 2026**. Every fact used on the website is listed here with its source and verification status.
Anything marked **Unverified** is either left out of the site or shown only through owner-supplied configuration.

## 1. Identity: verified

| Fact | Value | Source | Status |
|---|---|---|---|
| Listing name | **Mohit Bhola Makeup Studio & Academy** | Google Maps short link `maps.app.goo.gl/qdrLcg74DCBFLMgX6` redirects to `google.com/maps/place/Mohit+Bhola+Makeup+Studio+%26+Academy/…` | ✅ Verified |
| Google category | Makeup artist (`makeup_artist`). The listing surfaced for the query "makeup academy" | Encoded category data in the Maps redirect URL | ✅ Verified |
| Pin coordinates | 28.6454613, 77.4186186 | Maps redirect URL (`!3d…!4d…`) | ✅ Verified |
| Google feature ID / CID | `0x390cf176218a774f:0x45ac6fa4346b4511` → CID `5020510435656025361` | Maps redirect URL | ✅ Verified |
| City / state | Ghaziabad, Uttar Pradesh (OSM postcode 201001 for the pin) | OpenStreetMap Nominatim reverse geocode of the pin | ✅ City verified · postcode **not used** until the owner confirms it |
| Official Instagram | `@muamohit_bhola` · https://www.instagram.com/muamohit_bhola/ | Supplied by the client | ✅ Verified (client-supplied) |
| Artist name | Mohit Bhola (in the business name; "MUA" = makeup artist in the handle) | Listing name + Instagram handle | ✅ Verified |

## 2. Not verified / missing

| Item | Why it's missing | What the site does |
|---|---|---|
| **Google rating & review count** | Maps renders this client-side, so it isn't in the public HTML. Fetching Google's internal endpoints was blocked as access circumvention, which is correct, so it wasn't attempted again. | Reviews section shows **clearly labelled placeholders** and a "Read reviews" link to the real listing. No rating is shown and none is in the JSON-LD. `npm run reviews:fetch` (official Places API) fills in genuine data. |
| **Review excerpts** | Same as above | Same as above. No reviews were written or paraphrased. |
| **Phone / WhatsApp number** | Not on any accessible public page; **supplied by the client on 27 Oct 2026: 099712 60049** | Used for the call link, WhatsApp buttons and WhatsApp enquiries (`src/data/business.ts`). The owner should confirm it is the studio’s WhatsApp number. |
| **Street address** | Not in public HTML | Shows "Ghaziabad, Uttar Pradesh" plus pin-accurate **Get directions**. `VITE_STREET_ADDRESS` adds the full line. |
| **Opening hours** | Not in public HTML | Shows "Hours on request – check current timings on Google". `VITE_OPENING_HOURS` adds a table. |
| **Official logo** | Instagram requires login, so the profile picture and bio couldn't be read. No other web presence found. | A **proposed concept** wordmark and "MB" monogram (`src/components/Wordmark.tsx`, `public/brand/wordmark-concept.svg`, `public/favicon.svg`). Each is commented as a concept, to be replaced. |
| **Instagram bio, follower count, posts** | Login wall | Showcase tiles link to the profile. Nothing is quoted from the profile. |
| **Exact service list, prices, course durations/fees** | No public menu found | A typical offer for a "Makeup Studio & Academy" is shown, with "packages and prices on enquiry". The owner must confirm it (checklist §2). |
| **Real portfolio photos** | Instagram login wall; no permission obtained | Licensed Unsplash images, labelled on the page as **representative**. |
| **Years of experience, students trained, brand associations** | Not verifiable | **Not shown.** No statistics on the site. |

### Unconfirmed lead (NOT used on the site)
- Search results mention a "Mohit Bhola" working as a Regional Makeup Trainer in Ghaziabad, with past MAC / INGLOT / Lakmé roles. The sources were a LinkedIn snippet and the aggregator ZoomInfo.
- **Nothing ties this person to this business**, so none of it is used.
- If the owner confirms it, it would be a strong credential for the About section.

## 3. Sources consulted
- Google Maps listing (via the supplied short link). Name, category, coordinates and CID come from the redirect URL.
- Instagram profile URL (supplied). The page is behind a login, so no content was readable.
- OpenStreetMap Nominatim reverse geocoding (one request, public API).
- Web searches for "Mohit Bhola Makeup Studio & Academy", "muamohit_bhola" and Ghaziabad directories (Justdial, WedMeGood, WeddingWire, Sulekha, DreamWeddingHub). No listing with contact details or reviews was found.
- Design reference supplied by the client: https://nupurguptaacademy.com/. Only its **structure** was adapted: separate services and courses grids, "Book Now" opening an enquiry popup with the item preselected, a "why choose" block, a closing CTA band, local-SEO footer link columns and a floating contact button. Its branding, copy, imagery and unverifiable stats/brand strip were **not** copied.

## 4. Brand direction (proposed, no official brand assets available)
- **Personality:** Indian bridal luxury, warm and artistic. A working artist who also teaches.
- **Palette ("Wine & Champagne"):**

  | Name | Hex | Role |
  |---|---|---|
  | Ink | `#2b1420` | Text, dark sections |
  | Wine | `#6e1d3b` | Primary |
  | Rose | `#b5466a` | Accent |
  | Champagne gold | `#c39a5c` | Details |
  | Ivory | `#fbf7f2` | Background |
  | Blush | `#f4e4e0` | Background |

  Taken from bridal reds and kundan gold. If the real logo uses different colours, update the `@theme` tokens in `src/index.css`.
- **Type:** Cormorant Garamond (display, italic accents) with Manrope (UI/body). Both are self-hosted via Fontsource (OFL licence).

## 5. Image licensing
All photos are from **Unsplash** under the [Unsplash License](https://unsplash.com/license): free for commercial use, no attribution required. They are **not** the studio's work and are labelled as representative on the page.

| Slot | Unsplash photo |
|---|---|
| hero | https://unsplash.com/photos/ohENjR9w0bk |
| bridal | https://unsplash.com/photos/VPwSJhu5uhs |
| engagement | https://unsplash.com/photos/inlZbiU4apA |
| party | https://unsplash.com/photos/_hAaFD1ucfk |
| hd-makeup | https://unsplash.com/photos/tKUG1Ckuryw |
| hairstyling | https://unsplash.com/photos/g0cSOCHaHiY |
| draping | https://unsplash.com/photos/Uv0BoKKdxos |
| photoshoot | https://unsplash.com/photos/KxHcyNOIO_M |
| pro-course | https://unsplash.com/photos/I3y-aJ4DWng |
| self-course | https://unsplash.com/photos/Bv8pYo9RJno |
| about | https://unsplash.com/photos/5JvL0u4gjko |
| gallery-1 | https://unsplash.com/photos/N9hRh86R4T0 |
| gallery-2 | https://unsplash.com/photos/4raRmmjLD80 |
| gallery-3 | https://unsplash.com/photos/so9uf7y3p5Y |
| gallery-4 | https://unsplash.com/photos/YL4xphQzZrw |
| gallery-5 | https://unsplash.com/photos/27pGOj-JyX4 |
| gallery-6 | https://unsplash.com/photos/T-PUQaJ8YEw |
| gallery-7 | https://unsplash.com/photos/zW7hVlt6Oa0 |
| gallery-8 | https://unsplash.com/photos/Po-nggQqplE |
