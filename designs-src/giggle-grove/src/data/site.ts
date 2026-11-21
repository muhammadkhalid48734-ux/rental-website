// SAMPLE DESIGN for a FICTIONAL business. No real business names, people, places,
// phone numbers, emails, social links, reviews or ratings belong in this file.

export const business = {
  name: 'Giggle Grove Party Rentals',
  shortName: 'Giggle Grove',
  kind: 'Party rentals',
  tagline: 'Bounce houses, water slides, games and party add-ons for birthdays and backyard parties.',
};

export const serviceAreas = ['Your town and nearby areas'];

export type Category = 'bounce' | 'games' | 'addons';

export const categories: { id: Category; label: string }[] = [
  { id: 'bounce', label: 'Bounce & Water' },
  { id: 'games', label: 'Games' },
  { id: 'addons', label: 'Add-ons' },
];

export interface Rental {
  id: string;
  name: string;
  price: number;
  category: Category;
  art: string;
  /** Size lines exactly as supplied (capitalization tidied). */
  specs: string[];
  /** Short description as supplied (capitalization tidied). */
  note?: string;
}

export const rentals: Rental[] = [
  {
    id: 'purple-plunge', name: 'Purple Plunge', price: 270, category: 'bounce', art: 'plunge',
    specs: ['15 ft tall', '28 ft long', '16 ft wide'], note: 'Single lane water slide',
  },
  {
    id: 'twinkle-unicorn-combo', name: 'Twinkle Unicorn Combo', price: 250, category: 'bounce', art: 'unicorn',
    specs: [], note: 'Water unit',
  },
  {
    id: 'toxic-splash', name: 'Toxic Splash', price: 260, category: 'bounce', art: 'toxic',
    specs: ['16 ft tall', '11 ft wide'], note: 'Toxic radioactive slide',
  },
  {
    id: 'tropical-plunge', name: 'Tropical Plunge', price: 300, category: 'bounce', art: 'tropical',
    specs: ['17 ft tall', '35 ft long', '18 ft wide'], note: 'Two slides',
  },
  {
    id: 'santas-jump-house', name: "Santa's Jump House", price: 200, category: 'bounce', art: 'santa',
    specs: [], note: 'Holiday unit with a basketball hoop',
  },
  {
    id: 'life-size-jenga', name: 'Life-Size Jenga', price: 15, category: 'games', art: 'jenga',
    specs: [],
  },
  {
    id: 'cotton-candy-machine', name: 'Cotton Candy Machine', price: 60, category: 'addons', art: 'cotton',
    specs: [], note: 'Comes fully stocked',
  },
  {
    id: 'generator', name: 'Generator', price: 60, category: 'addons', art: 'generator',
    specs: [], note: 'Gas powered, for areas without power',
  },
  {
    id: 'water-hose', name: '50 ft Water Hose', price: 10, category: 'addons', art: 'hose',
    specs: [],
  },
];

export const sampleNote = 'Sample availability. In the live version this shows your real bookings.';
export const estimateNote = 'Estimate for rentals only. Final details are confirmed with you.';

// "Often added" row: shown when one of the trigger units is in the request.
export const oftenAdded = {
  triggers: ['purple-plunge', 'twinkle-unicorn-combo', 'toxic-splash', 'tropical-plunge'],
  items: ['generator', 'water-hose', 'cotton-candy-machine'],
};

