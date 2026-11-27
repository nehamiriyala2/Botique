import {
  OccasionCategory,
  Product,
  SareeCollection,
  TestimonialItem,
} from "@/lib/db/schema";

export const COLLECTIONS: SareeCollection[] = [
  {
    id: "col-1",
    slug: "mul-cotton",
    name: "Mul Cotton Sarees",
    tagline: "Featherlight Everyday Grace",
    description:
      "Breathable, softly draped mul cotton sarees designed for effortless comfort and understated daytime elegance.",
    image: "/images/col-mul-cotton.jpg",
    accentLabel: "Airy & Refined",
  },
  {
    id: "col-2",
    slug: "georgette",
    name: "Georgette Sarees",
    tagline: "Fluid Drape & Modern Poise",
    description:
      "Gracefully cascading georgette silhouettes finished with delicate borders for contemporary celebrations and gatherings.",
    image: "/images/col-georgette-red.jpg",
    accentLabel: "Graceful Movement",
  },
  {
    id: "col-3",
    slug: "semi-pattu",
    name: "Semi Pattu Sarees",
    tagline: "Lustrous Festive Heritage",
    description:
      "Richly woven semi pattu sarees celebrating traditional motifs, luminous borders, and festive splendor.",
    image: "/images/col-semi-pattu-navy.jpg",
    accentLabel: "Festive Splendor",
  },
  {
    id: "col-4",
    slug: "designer",
    name: "Designer Sarees",
    tagline: "Curated Statement Silhouettes",
    description:
      "Distinctive designer sarees pairing classic Indian draping with refined palettes and sculpted contemporary detailing.",
    image: "/images/col-designer-wine.jpg",
    accentLabel: "Statement Edit",
  },
  {
    id: "col-5",
    slug: "work-sarees",
    name: "Work Sarees",
    tagline: "Intricate Embellished Artistry",
    description:
      "Ornate work sarees featuring detailed border and pallu craftsmanship created for milestone celebrations and evening occasions.",
    image: "/images/col-work-rust.jpg",
    accentLabel: "Detailed Craft",
  },
];

export const OCCASIONS: OccasionCategory[] = [
  {
    id: "occ-1",
    slug: "wedding-wear",
    name: "Wedding Wear",
    subtitle: "Bridal & Muhurtham Elegance",
    description:
      "Regal sarees curated for weddings, ceremonies, and cherished family milestones.",
    image: "/images/occ-wedding.jpg",
  },
  {
    id: "occ-2",
    slug: "festive-wear",
    name: "Festive Wear",
    subtitle: "Celebratory Hues & Radiance",
    description:
      "Luminous silhouettes crafted to shine across pujas, festive evenings, and auspicious gatherings.",
    image: "/images/occ-festive.jpg",
  },
  {
    id: "occ-3",
    slug: "traditional-wear",
    name: "Traditional Wear",
    subtitle: "Rooted in Cultural Grace",
    description:
      "Timeless weaves and classic border compositions honoring enduring South Indian tradition.",
    image: "/images/occ-traditional.jpg",
  },
  {
    id: "occ-4",
    slug: "everyday-elegance",
    name: "Everyday Elegance",
    subtitle: "Effortless Daytime Poise",
    description:
      "Soft, breathable drapes made for daily sophistication, workdays, and intimate lunches.",
    image: "/images/occ-everyday.jpg",
  },
  {
    id: "occ-5",
    slug: "special-occasions",
    name: "Special Occasions",
    subtitle: "Receptions & Evening Soirees",
    description:
      "Statement sarees with refined shimmer and poised silhouettes for memorable evenings.",
    image: "/images/occ-special.jpg",
  },
];

/**
 * SAMPLE PRODUCT CATALOG
 * ----------------------
 * Clearly marked sample catalog items intended for layout, filtering, cart,
 * and checkout verification. Replace this array (or connect a database via
 * `src/lib/db/repository.ts`) with actual Aliveli Vasthralaya inventory.
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "av-sample-01",
    slug: "sample-mul-cotton-blush-pink",
    sku: "AV-SAMPLE-MC01",
    isSample: true,
    name: "Blush Pink Zari Border Mul Cotton Saree (Sample)",
    collectionSlug: "mul-cotton",
    collectionName: "Mul Cotton Sarees",
    occasions: ["everyday-elegance", "traditional-wear"],
    fabric: "Mul Cotton",
    colors: [
      { name: "Blush Pink", hex: "#F2B8C0" },
      { name: "Beige Gold", hex: "#E8D3A8" },
    ],
    price: 2450,
    currency: "INR",
    priceLabel: "Sample Price",
    images: [
      "/images/prod-mul-rose.jpg",
      "/images/col-mul-cotton.jpg",
    ],
    shortDescription:
      "Sample catalog listing showcasing a lightweight mul cotton saree with a delicate contrast border.",
    description:
      "This is a clearly marked sample catalog entry for Aliveli Vasthralaya's Mul Cotton Sarees collection. Replace with actual garment weave notes, exact length, and live store pricing once inventory is uploaded.",
    blouseIncludedNote: "Blouse piece details to be confirmed from live inventory.",
    careInstructions: [
      "Gentle hand wash separately in cold water with mild detergent.",
      "Dry in shade to preserve color vibrancy and fabric softness.",
      "Steam or press on low cotton heat setting.",
    ],
    shippingInfo: [
      "Dispatch timelines and domestic courier charges are confirmed upon order review.",
      "Available for local store pickup in Guntur or pan-India shipping once confirmed.",
    ],
    featured: true,
    sortOrder: 1,
  },
  {
    id: "av-sample-02",
    slug: "sample-georgette-indigo-floral",
    sku: "AV-SAMPLE-GG02",
    isSample: true,
    name: "Indigo Floral Print Georgette Saree (Sample)",
    collectionSlug: "georgette",
    collectionName: "Georgette Sarees",
    occasions: ["festive-wear", "special-occasions"],
    fabric: "Georgette",
    colors: [
      { name: "Indigo Blue", hex: "#2E3F9E" },
      { name: "Sunset Orange", hex: "#F0642A" },
      { name: "Sky Ombre", hex: "#7EC8F0" },
    ],
    price: 3850,
    currency: "INR",
    priceLabel: "Sample Price",
    images: [
      "/images/prod-georgette-emerald.jpg",
      "/images/col-georgette.jpg",
      "/images/occ-everyday.jpg",
    ],
    shortDescription:
      "Sample catalog listing featuring a lightweight printed georgette drape in bright indigo florals.",
    description:
      "This is a clearly marked sample catalog entry for Aliveli Vasthralaya's Georgette Sarees collection. Replace with verified measurements, border details, and live inventory pricing.",
    blouseIncludedNote: "Blouse piece details to be confirmed from live inventory.",
    careInstructions: [
      "Dry clean recommended to maintain border finish and fluid fall.",
      "Store folded in a breathable muslin cloth away from moisture.",
    ],
    shippingInfo: [
      "Carefully packed in protective boutique wrapping prior to dispatch.",
      "Shipping timeline confirmed prior to final payment.",
    ],
    featured: true,
    sortOrder: 2,
  },
  {
    id: "av-sample-03",
    slug: "sample-semi-pattu-parrot-green",
    sku: "AV-SAMPLE-SP03",
    isSample: true,
    name: "Parrot Green Zari Semi Pattu Saree (Sample)",
    collectionSlug: "semi-pattu",
    collectionName: "Semi Pattu Sarees",
    occasions: ["wedding-wear", "festive-wear", "traditional-wear"],
    fabric: "Semi Pattu",
    colors: [
      { name: "Parrot Green", hex: "#4E9A2A" },
      { name: "Lime Green", hex: "#A6C93A" },
      { name: "Temple Gold", hex: "#D9A21B" },
    ],
    price: 5400,
    currency: "INR",
    priceLabel: "Sample Price",
    images: [
      "/images/prod-semipattu-maroon.jpg",
      "/images/col-designer.jpg",
      "/images/col-work.jpg",
    ],
    shortDescription:
      "Sample catalog listing showcasing a lustrous parrot green semi pattu drape with a rich gold zari border.",
    description:
      "This is a clearly marked sample catalog entry for Aliveli Vasthralaya's Semi Pattu Sarees collection. Update with exact saree specifications, motif descriptions, and verified pricing.",
    blouseIncludedNote: "Blouse piece details to be confirmed from live inventory.",
    careInstructions: [
      "Dry clean only to preserve the lustre of the weave and gold zari accents.",
      "Refold periodically along alternate creases and store in a cotton saree bag.",
    ],
    shippingInfo: [
      "Eligible for insured boutique dispatch or in-store collection at Guntur.",
      "Confirm availability and dispatch timeline via WhatsApp or checkout enquiry.",
    ],
    featured: true,
    sortOrder: 3,
  },
  {
    id: "av-sample-04",
    slug: "sample-designer-wine-organza",
    sku: "AV-SAMPLE-DS04",
    isSample: true,
    name: "Wine Organza Embroidered Designer Saree (Sample)",
    collectionSlug: "designer",
    collectionName: "Designer Sarees",
    occasions: ["special-occasions", "wedding-wear"],
    fabric: "Designer Blend",
    colors: [
      { name: "Burgundy Wine", hex: "#8A1538" },
      { name: "Bridal Red", hex: "#E0261B" },
    ],
    price: null, // Demonstrates authentic "Price on Enquiry" without inventing a price
    currency: "INR",
    images: [
      "/images/col-designer-wine.jpg",
      "/images/occ-wedding.jpg",
    ],
    shortDescription:
      "Sample catalog listing representing bespoke-inspired designer drapes available on personal enquiry.",
    description:
      "This is a clearly marked sample catalog entry for Aliveli Vasthralaya's Designer Sarees collection. Pricing for select designer pieces is shared directly upon personal consultation and availability check.",
    blouseIncludedNote: "Blouse styling options shared upon enquiry.",
    careInstructions: [
      "Specialist dry clean only.",
      "Hang padded or fold flat with tissue paper between embellished panels.",
    ],
    shippingInfo: [
      "Personal styling and measurement guidance available via store visit or WhatsApp.",
    ],
    featured: true,
    sortOrder: 4,
  },
  {
    id: "av-sample-05",
    slug: "sample-work-saree-rust-cutwork",
    sku: "AV-SAMPLE-WS05",
    isSample: true,
    name: "Rust Orange Stone & Cutwork Saree (Sample)",
    collectionSlug: "work-sarees",
    collectionName: "Work Sarees",
    occasions: ["wedding-wear", "special-occasions", "festive-wear"],
    fabric: "Embellished Silk Blend",
    colors: [
      { name: "Rust Orange", hex: "#B8501F" },
      { name: "Antique Gold", hex: "#D9A21B" },
    ],
    price: 6900,
    currency: "INR",
    priceLabel: "Sample Price",
    images: [
      "/images/col-work-rust.jpg",
      "/images/occ-special.jpg",
    ],
    shortDescription:
      "Sample catalog listing featuring intricate antique gold border detailing for celebratory evenings.",
    description:
      "This is a clearly marked sample catalog entry for Aliveli Vasthralaya's Work Sarees collection. Replace with actual embellishment details, weight notes, and store pricing.",
    blouseIncludedNote: "Blouse piece details to be confirmed from live inventory.",
    careInstructions: [
      "Dry clean only; avoid direct contact with perfume or sprays on metallic work.",
      "Wrap in soft muslin inside a cool, dry wardrobe.",
    ],
    shippingInfo: [
      "Dispatched in structured gift-ready packaging once confirmed by our team.",
    ],
    featured: true,
    sortOrder: 5,
  },
  {
    id: "av-sample-06",
    slug: "sample-handloom-cotton-saffron",
    sku: "AV-SAMPLE-MC06",
    isSample: true,
    name: "Saffron & Green Border Handloom Cotton Saree (Sample)",
    collectionSlug: "mul-cotton",
    collectionName: "Mul Cotton Sarees",
    occasions: ["everyday-elegance"],
    fabric: "Mul Cotton",
    colors: [
      { name: "Saffron Orange", hex: "#D9531E" },
      { name: "Bottle Green", hex: "#1E7A3A" },
    ],
    price: 2250,
    currency: "INR",
    priceLabel: "Sample Price",
    images: [
      "/images/prod-work-ivory.jpg",
      "/images/prod-designer-wine.jpg",
    ],
    shortDescription:
      "Sample catalog listing highlighting breathable handloom cotton in bright saffron with a contrast green border.",
    description:
      "This is a clearly marked sample catalog entry showcasing everyday mul cotton elegance. Update with live store inventory details when ready.",
    blouseIncludedNote: "Blouse piece details to be confirmed from live inventory.",
    careInstructions: [
      "Hand wash gently in cool water.",
      "Line dry in shade.",
    ],
    shippingInfo: [
      "Available for domestic shipping or Guntur store pickup upon confirmation.",
    ],
    featured: false,
    sortOrder: 6,
  },
  {
    id: "av-sample-07",
    slug: "sample-semi-pattu-rani-pink",
    sku: "AV-SAMPLE-SP07",
    isSample: true,
    name: "Rani Pink & Green Border Semi Pattu (Sample)",
    collectionSlug: "semi-pattu",
    collectionName: "Semi Pattu Sarees",
    occasions: ["traditional-wear", "festive-wear"],
    fabric: "Semi Pattu",
    colors: [
      { name: "Rani Pink", hex: "#C2185B" },
      { name: "Bottle Green", hex: "#1E7A3A" },
    ],
    price: 5150,
    currency: "INR",
    priceLabel: "Sample Price",
    images: [
      "/images/occ-traditional.jpg",
      "/images/col-semi-pattu.jpg",
    ],
    shortDescription:
      "Sample catalog listing featuring a vibrant rani pink drape paired with a contrast green border.",
    description:
      "This is a clearly marked sample catalog entry for Aliveli Vasthralaya's Semi Pattu Sarees collection.",
    blouseIncludedNote: "Blouse piece details to be confirmed from live inventory.",
    careInstructions: [
      "Dry clean only.",
      "Store wrapped in breathable cotton cloth.",
    ],
    shippingInfo: [
      "Shipping details confirmed upon order enquiry.",
    ],
    featured: false,
    sortOrder: 7,
  },
  {
    id: "av-sample-08",
    slug: "sample-georgette-crimson-red",
    sku: "AV-SAMPLE-GG08",
    isSample: true,
    name: "Crimson Red Plain Georgette Saree (Sample)",
    collectionSlug: "georgette",
    collectionName: "Georgette Sarees",
    occasions: ["festive-wear", "special-occasions"],
    fabric: "Georgette",
    colors: [
      { name: "Crimson Red", hex: "#C8102E" },
    ],
    price: 4100,
    currency: "INR",
    priceLabel: "Sample Price",
    images: [
      "/images/col-georgette-red.jpg",
      "/images/insta-1.jpg",
    ],
    shortDescription:
      "Sample catalog listing with a fluid crimson georgette drape for festive evenings and family celebrations.",
    description:
      "This is a clearly marked sample catalog entry for Aliveli Vasthralaya's festive saree selection.",
    blouseIncludedNote: "Blouse piece details to be confirmed from live inventory.",
    careInstructions: [
      "Dry clean recommended.",
    ],
    shippingInfo: [
      "Shipping details confirmed upon order enquiry.",
    ],
    featured: false,
    sortOrder: 8,
  },
];

export const PLACEHOLDER_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    isPlaceholder: true,
    quote:
      "Placeholder customer review — replace with a genuine review highlighting saree drape quality, border finish, and warm boutique assistance at Aliveli Vasthralaya.",
    authorLabel: "Customer Review Placeholder 01",
    occasionLabel: "Wedding & Festive Shopping (Sample Placeholder)",
  },
  {
    id: "test-2",
    isPlaceholder: true,
    quote:
      "Placeholder customer review — replace with authentic client feedback on our Semi Pattu or Mul Cotton collections and personal styling support.",
    authorLabel: "Customer Review Placeholder 02",
    occasionLabel: "Collection Experience (Sample Placeholder)",
  },
  {
    id: "test-3",
    isPlaceholder: true,
    quote:
      "Placeholder customer review — replace with verified customer words from your Guntur store visitors or WhatsApp saree orders.",
    authorLabel: "Customer Review Placeholder 03",
    occasionLabel: "In-Store & Enquiry Assistance (Sample Placeholder)",
  },
];

export const INSTAGRAM_GALLERY_ITEMS = [
  {
    id: "ig-1",
    image: "/images/insta-1.jpg",
    caption: "Pastel floral print in full twirl",
    collection: "Georgette Sarees",
  },
  {
    id: "ig-2",
    image: "/images/prod-semipattu-maroon.jpg",
    caption: "Parrot green pattu with temple jewellery",
    collection: "Semi Pattu Sarees",
  },
  {
    id: "ig-3",
    image: "/images/insta-3.jpg",
    caption: "Grace in motion — festive celebratory hues",
    collection: "Festive Edit",
  },
  {
    id: "ig-4",
    image: "/images/brand-story.jpg",
    caption: "Red & gold checked cotton drape",
    collection: "Mul Cotton Sarees",
  },
  {
    id: "ig-5",
    image: "/images/occ-wedding.jpg",
    caption: "Bridal & ceremony inspirations",
    collection: "Wedding Wear",
  },
  {
    id: "ig-6",
    image: "/images/col-designer-wine.jpg",
    caption: "Wine organza with gold embroidery",
    collection: "Designer Sarees",
  },
];
