# Mohit Bhola Makeup Studio & Academy — Website

A premium one-page site for **Mohit Bhola Makeup Studio & Academy** (Ghaziabad, UP). It covers bridal and occasion makeup services plus makeup courses.

- **Stack:** React 19, TypeScript, Vite 6, Tailwind CSS 4.
- **Rendering:** prerendered to static HTML for SEO, then hydrated.
- **Hosting:** any static host works.

> **Not launch-ready until the owner confirms the items in [`OWNER_CHECKLIST.md`](OWNER_CHECKLIST.md).**
> Verified facts, sources and gaps are in [`BUSINESS_RESEARCH.md`](BUSINESS_RESEARCH.md).

## Quick start
```bash
npm install
cp .env.example .env     # fill in owner-confirmed values only
npm run dev              # http://localhost:5173
npm run build            # type-check → client build → SSR build → prerender into dist/
npm run preview          # serve dist/
npm test                 # unit tests + post-build checks (run after build)
```

## What's on the page
| Section | Notes |
|---|---|
| Top bar + sticky header | Blurs on scroll. Full-screen animated mobile menu. "Book now" opens the enquiry popup. |
| Hero | Arched bridal image with a high-priority preload. Primary CTA opens the enquiry popup with **Bridal Makeup** preselected. |
| About | Short intro plus four value pillars. No unverifiable claims or statistics. |
| Services & courses | Image-first 4:5 cards, one-line copy, filters (All / Makeup / Hair & Styling / Academy). **Book now / Enrol** opens the popup with that item preselected. |
| Bridal experience | Detailed 4-step process with an image collage. |
| Academy | Three course cards with "what you'll learn" lists. Fees and batches on enquiry. |
| Portfolio | Masonry gallery with an accessible lightbox (keyboard arrows, Esc, focus-trapped `<dialog>`). |
| Google reviews | Genuine data from `src/data/google-reviews.json` when verified. Until then, a branded "Every review, unedited" panel linking to the real Google listing (no invented testimonials, no rating). |
| Instagram | Tiles plus a follow CTA linking to `@muamohit_bhola`. |
| CTA band, Contact | Enquiry form, click-to-load map, address, hours, directions, WhatsApp (when configured). |
| Footer | Wordmark, nav, local-SEO link columns ("Makeup services/courses in Ghaziabad"), social links. |
| Floating button | WhatsApp when a number is configured, otherwise a mobile "Enquire now" button. |

The layout borrows its **structure** from the client's reference site, nupurguptaacademy.com: separate services/courses grids, "Book Now" opening a preselected enquiry popup, a CTA band and SEO footer columns. Branding, copy and images are original.

## Configuration (`.env`)
See [`.env.example`](.env.example). Every contact item is optional. **The UI only shows a button when its value is set**, so there are never fake numbers or links.

| Variable | Effect |
|---|---|
| `VITE_SITE_URL` | Canonical URL, `og:url`, absolute `og:image`, `sitemap.xml`. Set before deploying. |
| `VITE_ENQUIRY_ENDPOINT` | Form POST target (JSON). Success is shown **only** after a 2xx response. |
| `VITE_WHATSAPP_NUMBER`, `VITE_PHONE`, `VITE_EMAIL` | Show the WhatsApp, phone and email buttons. |
| `VITE_STREET_ADDRESS`, `VITE_POSTAL_CODE`, `VITE_OPENING_HOURS` | Full address and hours table. Also added to the JSON-LD. |

### Enquiry form behaviour
**WhatsApp-first:** when `VITE_WHATSAPP_NUMBER` is set, every enquiry goes to the studio's WhatsApp:
- the form, the "Book now" / "Enrol" popups, the floating button and the top bar all lead there
- after validation, the green **Send enquiry on WhatsApp** button opens WhatsApp (app on mobile, WhatsApp Web on desktop)
- the chat is pre-filled with the visitor's name, phone, service, date and message
- the visitor just taps Send; the site never claims it was sent, it asks them to tap Send

Without a WhatsApp number, the form uses `VITE_ENQUIRY_ENDPOINT` as described below.

1. Client-side validation:
   - name required
   - Indian mobile required (`+91` optional)
   - email optional but checked when given
   - service required
   - consent required
   - honeypot field for bots

   Errors are announced, marked with `aria-invalid`, and focus moves to the first invalid field.
2. **No endpoint configured:** the form says *"Online enquiries aren't connected yet. Your details have not been sent."* It then offers a prefilled WhatsApp message (if a number is set) or an Instagram DM, copying the enquiry text to the clipboard.
3. **Endpoint configured:** the button shows a sending state.
   - On a 2xx response, the form shows the thank-you message.
   - On any error or non-2xx, it shows a retry message.

### Google reviews (genuine data only)
Public review data couldn't be verified during the build, so the site ships with a panel that links to the real listing instead of showing testimonials. **No rating is published and none is in the structured data.** To connect real data:
1. In Google Cloud, enable **Places API (New)** and create an API key. Billing applies under Google's pricing; a few calls per deploy are typically within free usage.
2. Run `GOOGLE_PLACES_API_KEY=... npm run reviews:fetch`. It resolves the listing near the verified pin, or uses `GOOGLE_PLACE_ID`. It writes the rating, count and up to 5 Google-selected reviews, with author attribution and a fetch date.
3. Run `npm run build`. The section switches to the real rating ("as of <month>"), review cards and Google attribution. JSON-LD gets an `aggregateRating`.

Re-run the fetch in CI before each deploy. Google's terms limit how long Places content may be cached. The key is server-side only and is never bundled.

## Images
- `raw-images/` (git-ignored) holds the source photos.
- `npm run images` produces **480 / 800 / 1200 px WebP** files, all cropped 4:5 with sharp's attention crop. It also produces `og-image.jpg` (1200×630) and tiny blurred placeholders (`src/data/image-placeholders.json`).
- Every `<img>` has `width`/`height` (no layout shift), `srcset`/`sizes`, and `loading="lazy"` (except the hero).
- Current photos are **Unsplash-licensed stock, labelled as representative** on the page. Credits are in `BUSINESS_RESEARCH.md §5`.

To swap in the studio's real work, drop photos into `raw-images/` with the filenames mapped in `scripts/optimize-images.mjs`, then run `npm run images` and remove the "representative" notes.

## Performance, accessibility, SEO
- **Prerendered HTML** (`scripts/prerender.mjs`): the full content is crawlable without JS. It injects JSON-LD (`BeautySalon` with verified name, geo, `hasMap`, Instagram `sameAs`), canonical/OG tags and `robots.txt`.
- **Fonts:** self-hosted variable fonts (no Google Fonts request), with `unicode-range` subsetting.
- **Map:** the Google Maps iframe loads only on click (privacy and roughly 1 MB saved).
- **Bundle:** JS 87 kB gzip, CSS 13.5 kB gzip.
- **Accessibility:**
  - skip link
  - semantic landmarks
  - single `<h1>`
  - visible focus rings
  - 44 px touch targets
  - `aria-pressed` filters
  - `aria-expanded` menu
  - native `<dialog>` modals
  - `prefers-reduced-motion` respected
  - content visible without JS (reveal animations only apply once JS has loaded)

## Test results (27 Oct 2026, Windows 10, Node 24.20, Chrome headless)
```
npm run build      ✓ tsc clean · client 2.5 s · SSR 0.5 s · prerendered 87.4 kB HTML
                   assets: index.js 281.4 kB (86.9 kB gzip) · style.css 61.3 kB (13.5 kB gzip)
                   ⚠ VITE_SITE_URL not set – canonical/og:url/sitemap omitted (expected until domain chosen)
npm test           unit (node:test)  7/7 pass   – enquiry validation rules
                   dist checks      35/35 pass – sections, 1×h1, meta/OG/Twitter, JSON-LD validity & geo,
                                                 no unverified rating, alt+dimensions on all 33 <img>,
                                                 only hero eager, all image refs exist, maps/IG/directions links,
                                                 no fake WhatsApp, map deferred, no unverified testimonials, size budgets
scripts/e2e.mjs    20/20 pass (no endpoint)   – hydration w/o errors, filters (2 / 9 cards), popup opens with
                                                 preselected service, empty submit → 3 errors + focus, honest
                                                 "not sent" state, Esc closes, lightbox + arrow keys, map on demand,
                                                 nav anchors resolve, rel=noopener, no overflow at 390 px,
                                                 mobile menu open/close
                   + success path vs local mock (HTTP 200) ✓ · error path vs local mock (HTTP 500) ✓
                     (mock received the expected JSON payload)
```
Run the browser tests yourself with `npm run preview -- --port 4791` and then `node scripts/e2e.mjs http://localhost:4791/`. Set `CHROME_PATH` if Chrome isn't at the default Windows path.

Visual QA: full-page screenshots were taken at 1440 px desktop and 390 px mobile. Fixes made from them:
- services grid changed to 3×3 so no card is orphaned
- one-line card copy shortened so it isn't truncated
- contact button no longer wraps
- hero badge inset on mobile

## Project structure
```
src/
  data/business.ts          verified facts + env-driven contact config (single source of truth)
  data/offerings.ts         services, courses, bridal steps (owner to confirm)
  data/google-reviews.json  review data (unverified placeholder until fetched)
  components/               Header, Hero, About, Services, Bridal, Academy, Portfolio,
                            Reviews, Instagram, Contact, EnquiryForm/Modal, Footer, Wordmark
  lib/                      Img (responsive), validate, enquiry context, reveal hook
scripts/                    optimize-images, prerender, fetch-google-reviews, check-dist, e2e
public/                     images/, og-image.jpg, favicon.svg, brand/wordmark-concept.svg
```

## Deploying (when approved)
The site has not been deployed. When you're ready:
1. Build with `VITE_SITE_URL` set.
2. Upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages).
3. Add long-cache headers for `/assets/*` and `/images/*`.
