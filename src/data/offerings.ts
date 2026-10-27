// Services and courses shown on the site.
// The business name ("Makeup Studio & Academy") and Google category verify that it offers
// makeup services and makeup training. The individual items below are the typical offer
// for this category and MUST be confirmed by the owner (OWNER_CHECKLIST.md §2).

export type Category = 'Makeup' | 'Hair & Styling' | 'Academy';

export interface Offering {
  id: string;
  title: string;
  line: string; // max one line on cards
  image: string; // slot name in public/images
  category: Category;
  kind: 'service' | 'course';
  detailHref?: string;
  /** false = available in the enquiry form but not shown as a card. */
  listed?: boolean;
}

export const offerings: Offering[] = [
  { id: 'bridal', title: 'Bridal Makeup', line: 'A wedding look built to last all day.', image: 'bridal', category: 'Makeup', kind: 'service', detailHref: '#bridal' },
  { id: 'engagement', title: 'Engagement & Reception', line: 'Soft glam to statement, every ceremony.', image: 'engagement', category: 'Makeup', kind: 'service' },
  { id: 'party', title: 'Party & Occasion', line: 'Glam for sangeet, parties and events.', image: 'party', category: 'Makeup', kind: 'service' },
  { id: 'hd', title: 'HD & Airbrush Makeup', line: 'A seamless, skin-like HD finish.', image: 'hd-makeup', category: 'Makeup', kind: 'service' },
  { id: 'photoshoot', title: 'Pre-Wedding & Shoots', line: 'Looks made for lenses and long shoots.', image: 'photoshoot', category: 'Makeup', kind: 'service' },
  { id: 'hair', title: 'Hair Styling', line: 'Buns, braids, curls and florals.', image: 'hairstyling', category: 'Hair & Styling', kind: 'service' },
  { id: 'draping', title: 'Saree & Dupatta Draping', line: 'Neat, secure drapes that move well.', image: 'draping', category: 'Hair & Styling', kind: 'service' },
  { id: 'pro-course', title: 'Professional Makeup Course', line: 'Train to work as a makeup artist.', image: 'pro-course', category: 'Academy', kind: 'course', detailHref: '#academy' },
  { id: 'self-course', title: 'Self Makeup Course', line: 'Do your own everyday and party looks.', image: 'self-course', category: 'Academy', kind: 'course', detailHref: '#academy' },
  { id: 'hair-course', title: 'Hair Styling Workshop', line: 'Bridal buns, braids and long-wear sets.', image: 'hairstyling', category: 'Academy', kind: 'course', detailHref: '#academy', listed: false },
];

export const filters: ('All' | Category)[] = ['All', 'Makeup', 'Hair & Styling', 'Academy'];

export interface Course {
  id: string;
  title: string;
  image: string;
  audience: string;
  learn: string[];
}

export const courses: Course[] = [
  {
    id: 'pro-course',
    title: 'Professional Makeup Course',
    image: 'pro-course',
    audience: 'For aspiring makeup artists',
    learn: ['Skin prep & colour theory', 'Bridal, HD & party looks', 'Hygiene, kit & client handling', 'Portfolio-building practice'],
  },
  {
    id: 'self-course',
    title: 'Self Makeup Course',
    image: 'self-course',
    audience: 'For brides-to-be & beauty lovers',
    learn: ['Products for your skin type', 'Everyday & evening looks', 'Eyes, base & contour basics', 'Quick hair & finishing tips'],
  },
  {
    id: 'hair-course',
    title: 'Hair Styling Workshop',
    image: 'hairstyling',
    audience: 'Add-on for makeup students',
    learn: ['Tools & heat styling', 'Bridal buns & braids', 'Accessory & floral placement', 'Long-wear set techniques'],
  },
];

export const bridalSteps = [
  { title: 'Consultation', text: 'We talk outfit, jewellery, skin and the look you’ve been saving.' },
  { title: 'Look design', text: 'Shades, finish and hair are planned around your ceremony and lighting.' },
  { title: 'Skin prep', text: 'A calm, hydrated base so makeup sits beautifully for hours.' },
  { title: 'Wedding-day finish', text: 'Makeup, hair and draping completed and set for the long day.' },
];
