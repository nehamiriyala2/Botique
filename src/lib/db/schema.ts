export type CollectionSlug =
  | "mul-cotton"
  | "georgette"
  | "semi-pattu"
  | "designer"
  | "work-sarees";

export type OccasionSlug =
  | "wedding-wear"
  | "festive-wear"
  | "traditional-wear"
  | "everyday-elegance"
  | "special-occasions";

export interface SareeColor {
  name: string;
  hex: string;
}

export interface SareeCollection {
  id: string;
  slug: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accentLabel: string;
}

export interface OccasionCategory {
  id: string;
  slug: OccasionSlug;
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  isSample: boolean;
  name: string;
  collectionSlug: CollectionSlug;
  collectionName: string;
  occasions: OccasionSlug[];
  fabric: string;
  colors: SareeColor[];
  /**
   * Null indicates price is available strictly on enquiry (not fabricated).
   * Non-null values on sample records are illustrative placeholders for cart/checkout testing.
   */
  price: number | null;
  currency: "INR";
  priceLabel?: string;
  images: string[];
  shortDescription: string;
  description: string;
  blouseIncludedNote: string;
  careInstructions: string[];
  shippingInfo: string[];
  featured: boolean;
  sortOrder: number;
}

export interface ProductFilterQuery {
  collection?: string;
  occasion?: string;
  color?: string;
  search?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "name-asc";
}

export interface TestimonialItem {
  id: string;
  isPlaceholder: boolean;
  quote: string;
  authorLabel: string;
  occasionLabel: string;
}
