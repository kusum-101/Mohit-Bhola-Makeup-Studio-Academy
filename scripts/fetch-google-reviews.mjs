// Fetches the genuine Google rating, review count and up to 5 reviews via the official
// Google Places API (New) and writes src/data/google-reviews.json.
//
// Requires: GOOGLE_PLACES_API_KEY (server-side key, never prefixed with VITE_).
// Optional: GOOGLE_PLACE_ID (otherwise resolved by Text Search near the verified map pin).
//
// Google's terms require attribution and limit how long Places content may be cached,
// so re-run this before each deploy (e.g. in CI) rather than keeping old data.
import fs from 'node:fs/promises';

const KEY = process.env.GOOGLE_PLACES_API_KEY;
const NAME = 'Mohit Bhola Makeup Studio & Academy';
const PIN = { latitude: 28.6454613, longitude: 77.4186186 };
const OUT = 'src/data/google-reviews.json';

if (!KEY) {
  console.error('GOOGLE_PLACES_API_KEY is not set. Leaving', OUT, 'unchanged.');
  process.exit(1);
}

async function call(url, init) {
  const res = await fetch(url, init);
  const body = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(body.error ?? body)}`);
  return body;
}

let placeId = process.env.GOOGLE_PLACE_ID;
if (!placeId) {
  const found = await call('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.location',
    },
    body: JSON.stringify({
      textQuery: NAME,
      locationBias: { circle: { center: PIN, radius: 500 } },
    }),
  });
  const match = (found.places ?? []).find((p) =>
    p.displayName?.text?.toLowerCase().startsWith('mohit bhola'),
  );
  if (!match) throw new Error('Listing not found by Text Search – set GOOGLE_PLACE_ID manually.');
  placeId = match.id;
  console.log('Resolved place id:', placeId);
}

const place = await call(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
  headers: {
    'X-Goog-Api-Key': KEY,
    'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews,googleMapsUri',
  },
});

const data = {
  status: 'verified',
  note: 'Fetched from the Google Places API. Reviews are a subset selected by Google.',
  source: place.googleMapsUri,
  placeId: place.id,
  fetchedAt: new Date().toISOString(),
  rating: place.rating ?? null,
  userRatingCount: place.userRatingCount ?? null,
  reviews: (place.reviews ?? [])
    .filter((r) => r.text?.text)
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? 'Google user',
      authorUri: r.authorAttribution?.uri ?? null,
      rating: r.rating,
      when: r.relativePublishTimeDescription ?? null,
      text: r.text.text,
      uri: r.googleMapsUri ?? null,
    })),
};

await fs.writeFile(OUT, JSON.stringify(data, null, 2) + '\n');
console.log(`✓ ${data.rating}★ from ${data.userRatingCount} reviews, ${data.reviews.length} excerpts → ${OUT}`);
