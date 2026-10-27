import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { business, links, site } from './data/business';
import reviews from './data/google-reviews.json';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// JSON-LD built only from verified facts plus owner-supplied env values.
export function structuredData() {
  const { address, geo } = business;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: business.name,
    description:
      'Makeup studio and makeup academy in Ghaziabad offering bridal and occasion makeup, hair styling and makeup courses.',
    address: {
      '@type': 'PostalAddress',
      ...(address.street && { streetAddress: address.street }),
      addressLocality: address.locality,
      addressRegion: address.region,
      ...(address.postalCode && { postalCode: address.postalCode }),
      addressCountry: address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng },
    hasMap: links.googleListing,
    sameAs: [business.instagram.url],
    founder: { '@type': 'Person', name: business.artist },
  };
  if (site.url) {
    data.url = site.url + '/';
    data.image = site.url + '/og-image.jpg';
  }
  if (business.phone) data.telephone = business.phone;
  if (business.email) data.email = business.email;
  // Only publish a rating when it came from the Places API.
  if (reviews.status === 'verified' && reviews.rating && reviews.userRatingCount) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviews.rating,
      reviewCount: reviews.userRatingCount,
    };
  }
  return data;
}

export { site };
