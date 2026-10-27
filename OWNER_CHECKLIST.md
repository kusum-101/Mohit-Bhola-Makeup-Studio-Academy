# Owner Confirmation Checklist — Mohit Bhola Makeup Studio & Academy

Please confirm or correct each item before the site goes live. Items marked ⛔ block launch.

## 1. Identity & brand
- [ ] ⛔ Business name exactly as shown: **Mohit Bhola Makeup Studio & Academy**
- [ ] ⛔ **Logo:** send the official logo (SVG or high-res PNG). The current "MB" wordmark is a *proposed concept*. Approve it or replace it.
- [ ] Brand colours: does Wine `#6e1d3b` + Champagne gold `#c39a5c` suit the studio? Share any existing brand colours.
- [ ] Instagram handle **@muamohit_bhola** is the official account to promote

## 2. Services & courses (shown on site, all need confirmation)
- [ ] ⛔ Services offered: Bridal · Engagement & Reception · Party & Occasion · HD & Airbrush · Pre-wedding/Shoots · Hair Styling · Saree & Dupatta Draping. Remove or add any.
- [ ] ⛔ Courses offered: Professional Makeup Course · Self Makeup Course · Hair Styling Workshop. Remove or add any.
- [ ] Course details to add (optional): duration, batch timings, certificate, fees or "from" price
- [ ] Do you offer on-location / destination bridal makeup? (Currently **not** claimed)
- [ ] The bridal process steps (Consultation → Look design → Skin prep → Wedding-day finish) match how you work

## 3. Contact details
- [ ] ⛔ Confirm **+91 99712 60049** (supplied 27 Oct 2026) is the studio’s WhatsApp number, since all website enquiries go there
- [ ] Confirm **+91 99712 60049** is also the right number for calls
- [ ] Email → `VITE_EMAIL`
- [ ] ⛔ Full street address → `VITE_STREET_ADDRESS`, `VITE_POSTAL_CODE` (map pin already matches your Google listing)
- [ ] ⛔ Opening hours → `VITE_OPENING_HOURS`

## 4. Enquiry form
- [ ] Enquiries open WhatsApp to **+91 99712 60049** with the visitor's details prefilled. Confirm someone checks this WhatsApp regularly.
- [ ] Optional: also collect enquiries by email (Formspree/Getform → `VITE_ENQUIRY_ENDPOINT`). This is only used if the WhatsApp number is removed.

## 5. Google reviews
- [ ] ⛔ Provide a Google Places API key (or let your developer set one up) so the genuine rating, review count and excerpts can be fetched: `npm run reviews:fetch`.
- [ ] Alternatively, approve keeping the "Read reviews on Google" link with labelled placeholders

## 6. Photos (currently licensed stock, labelled "representative")
- [ ] ⛔ Send 15–25 of your best photos **you own the rights to**, with client consent where faces are shown. Ideal: 4:5 portrait, 1600 px+, one or more per service, academy class photos, studio interior.
- [ ] Permission to use selected Instagram posts on the website

## 7. Credentials (optional, only if true and you're happy to publish)
- [ ] Years of experience, number of brides / students, certifications, brands worked with. **Nothing is claimed on the site right now.**
- [ ] Short personal bio / photo of Mohit Bhola for the About section

## 8. Launch
- [ ] ⛔ Domain name → `VITE_SITE_URL` (enables canonical URL, sitemap, absolute share image)
- [ ] Hosting choice (Netlify / Vercel / Cloudflare Pages: static hosting)
- [ ] After launch: add the website URL to the Google Business Profile and Instagram bio
