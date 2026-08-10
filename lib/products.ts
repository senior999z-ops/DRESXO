export type Category = 'tracksuits' | 'shirts' | 'trousers';

export interface Product {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  badge?: string;
  notes: string[];
  fabric: string;
  size: string;
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'tracksuits', label: 'Tracksuits' },
  { value: 'shirts', label: 'Shirts' },
  { value: 'trousers', label: 'Trousers' },
];

export const products: Product[] = [
  {
    id: 'vx01-apex-tracksuit',
    name: 'Apex Tracksuit',
    code: 'DX01',
    tagline: 'Two-Piece Performance Set',
    description:
      'A tapered-fit tracksuit built from brushed poly-cotton with a matte finish. Zip-through jacket with ribbed cuffs, paired with jogger-cut bottoms and side pockets.',
    price: 5900,
    category: 'tracksuits',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'New',
    notes: ['Brushed Poly-Cotton', 'Zip-Through', 'Tapered Fit'],
    fabric: 'Brushed Poly-Cotton Jacket & Joggers',
    size: 'S — XXL',
  },
  {
    id: 'vx02-onyx-oxford-shirt',
    name: 'Onyx Oxford Shirt',
    code: 'DX02',
    tagline: 'Structured Everyday Shirt',
    description:
      'A crisp oxford-weave shirt with a reinforced collar and mother-of-pearl buttons. Cut slim through the body with a clean, drape-friendly finish.',
    price: 3200,
    category: 'shirts',
    image: 'https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=800',
    notes: ['Oxford Cotton', 'Reinforced Collar', 'Slim Cut'],
    fabric: '100% Combed Oxford Cotton',
    size: 'S — XXL',
  },
  {
    id: 'vx03-drift-trousers',
    name: 'Drift Trousers',
    code: 'DX03',
    tagline: 'Tailored Stretch Trousers',
    description:
      'Mid-rise trousers with a touch of stretch for all-day movement. Clean front, hidden hook closure, and a sharp tapered leg that holds its line.',
    price: 3800,
    category: 'trousers',
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800',
    notes: ['Stretch Twill', 'Mid-Rise', 'Tapered Leg'],
    fabric: 'Cotton-Blend Stretch Twill',
    size: '30 — 40',
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPKR(amount: number): string {
  return 'Rs ' + amount.toLocaleString('en-PK');
}
