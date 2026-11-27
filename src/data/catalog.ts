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
    image: "/images/saree-mul-cotton-2.webp",
    accentLabel: "Airy & Refined",
  },
  {
    id: "col-2",
    slug: "georgette",
    name: "Georgette Sarees",
    tagline: "Fluid Drape & Modern Poise",
    description:
      "Gracefully cascading georgette silhouettes finished with delicate borders for contemporary celebrations and gatherings.",
    image: "/images/saree-georgette-1.webp",
    accentLabel: "Graceful Movement",
  },
  {
    id: "col-3",
    slug: "semi-pattu",
    name: "Semi Pattu Sarees",
    tagline: "Lustrous Festive Heritage",
    description:
      "Richly woven semi pattu sarees celebrating traditional motifs, luminous borders, and festive splendor.",
    image: "/images/saree-semi-pattu-1.webp",
    accentLabel: "Festive Splendor",
  },
  {
    id: "col-4",
    slug: "designer",
    name: "Designer Sarees",
    tagline: "Curated Statement Silhouettes",
    description:
      "Distinctive designer sarees pairing classic Indian draping with refined palettes and sculpted contemporary detailing.",
    image: "/images/saree-designer-1.webp",
    accentLabel: "Statement Edit",
  },
  {
    id: "col-5",
    slug: "work-sarees",
    name: "Work Sarees",
    tagline: "Intricate Embellished Artistry",
    description:
      "Ornate work sarees featuring detailed border and pallu craftsmanship created for milestone celebrations and evening occasions.",
    image: "/images/saree-work-1.webp",
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
    image: "/images/saree-georgette-3.webp",
  },
  {
    id: "occ-2",
    slug: "festive-wear",
    name: "Festive Wear",
    subtitle: "Celebratory Hues & Radiance",
    description:
      "Luminous silhouettes crafted to shine across pujas, festive evenings, and auspicious gatherings.",
    image: "/images/saree-georgette-2.webp",
  },
  {
    id: "occ-3",
    slug: "traditional-wear",
    name: "Traditional Wear",
    subtitle: "Rooted in Cultural Grace",
    description:
      "Timeless weaves and classic border compositions honoring enduring South Indian tradition.",
    image: "/images/saree-semi-pattu-2.webp",
  },
  {
    id: "occ-4",
    slug: "everyday-elegance",
    name: "Everyday Elegance",
    subtitle: "Effortless Daytime Poise",
    description:
      "Soft, breathable drapes made for daily sophistication, workdays, and intimate lunches.",
    image: "/images/saree-mul-cotton-3.webp",
  },
  {
    id: "occ-5",
    slug: "special-occasions",
    name: "Special Occasions",
    subtitle: "Receptions & Evening Soirees",
    description:
      "Statement sarees with refined shimmer and poised silhouettes for memorable evenings.",
    image: "/images/saree-designer-2.webp",
  },
];

/**
 * SAMPLE PRODUCT CATALOG
 * ----------------------
 * Clearly marked sample catalog items intended for layout, filtering, cart,
 * and checkout verification. Photos are the boutique-supplied saree images.
 * Replace this array (or connect a database via `src/lib/db/repository.ts`)
 * with actual Aliveli Vasthralaya inventory. Items with `price: null` show
 * "Price on enquiry" so no price is invented.
 */
const CARE: Record<string, string[]> = {
  "mul-cotton": [
    "Gentle hand wash separately in cold water with mild detergent.",
    "Dry in shade to preserve colour and print.",
    "Steam or press on a low cotton setting.",
  ],
  georgette: [
    "Dry clean recommended to keep the border finish and fluid fall.",
    "Store folded in a breathable muslin cloth away from moisture.",
  ],
  "semi-pattu": [
    "Dry clean only to preserve the lustre of the weave and zari.",
    "Refold periodically along new creases and store in a cotton saree bag.",
  ],
  designer: [
    "Specialist dry clean only.",
    "Fold flat with tissue paper between embellished panels.",
  ],
  "work-sarees": [
    "Dry clean only; keep perfume and sprays away from the embroidery.",
    "Wrap in soft muslin inside a cool, dry wardrobe.",
  ],
};

const SHIPPING = [
  "Dispatch timelines and courier charges are confirmed when your order is reviewed.",
  "Store pickup in Guntur or domestic shipping available on confirmation.",
];

const COLLECTION_NAMES: Record<Product["collectionSlug"], string> = {
  "mul-cotton": "Mul Cotton Sarees",
  georgette: "Georgette Sarees",
  "semi-pattu": "Semi Pattu Sarees",
  designer: "Designer Sarees",
  "work-sarees": "Work Sarees",
};

type SampleInput = Pick<
  Product,
  "slug" | "sku" | "name" | "collectionSlug" | "occasions" | "fabric" | "colors" | "price" | "images" | "shortDescription" | "featured"
>;

function sample(i: number, p: SampleInput): Product {
  return {
    id: `av-sample-${String(i).padStart(2, "0")}`,
    isSample: true,
    currency: "INR",
    ...(p.price !== null ? { priceLabel: "Sample Price" } : {}),
    collectionName: COLLECTION_NAMES[p.collectionSlug],
    description: `This is a clearly marked sample catalog entry for Aliveli Vasthralaya's ${COLLECTION_NAMES[p.collectionSlug]} collection. Replace with the exact fabric, length, blouse details and live store pricing once inventory is uploaded.`,
    blouseIncludedNote: "Blouse piece details to be confirmed from live inventory.",
    careInstructions: CARE[p.collectionSlug],
    shippingInfo: SHIPPING,
    sortOrder: i,
    ...p,
  };
}

export const SAMPLE_PRODUCTS: Product[] = [
  sample(1, {
    slug: "sample-mul-cotton-lilac-floral",
    sku: "AV-SAMPLE-MC01",
    name: "Lilac Floral Embroidered Mul Cotton Saree (Sample)",
    collectionSlug: "mul-cotton",
    occasions: ["everyday-elegance", "traditional-wear"],
    fabric: "Mul Cotton",
    colors: [
      { name: "Lilac", hex: "#B97FA8" },
      { name: "White", hex: "#F5F2EE" },
    ],
    price: 2450,
    images: ["/images/saree-mul-cotton-1.webp"],
    shortDescription: "Sample listing: soft lilac mul cotton with white floral embroidery and a scalloped cutwork edge.",
    featured: true,
  }),
  sample(2, {
    slug: "sample-mul-cotton-blue-daisy",
    sku: "AV-SAMPLE-MC02",
    name: "Powder Blue Daisy Print Mul Cotton Saree (Sample)",
    collectionSlug: "mul-cotton",
    occasions: ["everyday-elegance"],
    fabric: "Mul Cotton",
    colors: [
      { name: "Powder Blue", hex: "#6F97CF" },
      { name: "White", hex: "#F5F2EE" },
    ],
    price: 2250,
    images: ["/images/saree-mul-cotton-2.webp"],
    shortDescription: "Sample listing: breathable powder blue mul cotton with large white daisy prints and tassels.",
    featured: false,
  }),
  sample(3, {
    slug: "sample-mul-cotton-indigo-shibori",
    sku: "AV-SAMPLE-MC03",
    name: "Indigo Shibori Tie-Dye Mul Cotton Saree (Sample)",
    collectionSlug: "mul-cotton",
    occasions: ["everyday-elegance"],
    fabric: "Mul Cotton",
    colors: [
      { name: "Indigo", hex: "#1F3F8F" },
      { name: "Sky Blue", hex: "#A9D3EE" },
    ],
    price: null,
    images: ["/images/saree-mul-cotton-3.webp"],
    shortDescription: "Sample listing: indigo and sky blue shibori tie-dye mul cotton, styled with a ruffle-sleeve blouse.",
    featured: false,
  }),
  sample(4, {
    slug: "sample-georgette-wine-plain",
    sku: "AV-SAMPLE-GG04",
    name: "Wine Plain Georgette Saree (Sample)",
    collectionSlug: "georgette",
    occasions: ["special-occasions", "festive-wear"],
    fabric: "Georgette",
    colors: [{ name: "Wine", hex: "#5E1426" }],
    price: 3850,
    images: ["/images/saree-georgette-1.webp"],
    shortDescription: "Sample listing: a fluid, solid wine georgette drape for evenings and receptions.",
    featured: true,
  }),
  sample(5, {
    slug: "sample-georgette-sky-mirror-work",
    sku: "AV-SAMPLE-GG05",
    name: "Sky Blue Mirror-Work Georgette Saree (Sample)",
    collectionSlug: "georgette",
    occasions: ["festive-wear", "special-occasions"],
    fabric: "Georgette",
    colors: [
      { name: "Sky Blue", hex: "#3FA3C8" },
      { name: "Rose Gold", hex: "#C8957A" },
    ],
    price: null,
    images: ["/images/saree-georgette-2.webp"],
    shortDescription: "Sample listing: shimmering sky blue georgette with mirror buttis and a beaded latkan border.",
    featured: false,
  }),
  sample(6, {
    slug: "sample-georgette-burnt-orange-pearl",
    sku: "AV-SAMPLE-GG06",
    name: "Burnt Orange Georgette Saree with Pearl Border (Sample)",
    collectionSlug: "georgette",
    occasions: ["wedding-wear", "special-occasions"],
    fabric: "Georgette",
    colors: [
      { name: "Burnt Orange", hex: "#D2551E" },
      { name: "Pearl White", hex: "#F1ECE2" },
    ],
    price: 4100,
    images: ["/images/saree-georgette-3.webp"],
    shortDescription: "Sample listing: sheer burnt orange georgette with a hand-embellished pearl floral border.",
    featured: false,
  }),
  sample(7, {
    slug: "sample-semi-pattu-olive-coffee-zari",
    sku: "AV-SAMPLE-SP07",
    name: "Olive Green & Coffee Brown Zari Semi Pattu (Sample)",
    collectionSlug: "semi-pattu",
    occasions: ["traditional-wear", "festive-wear", "wedding-wear"],
    fabric: "Semi Pattu",
    colors: [
      { name: "Olive Green", hex: "#6B7A1E" },
      { name: "Coffee Brown", hex: "#3B1E17" },
      { name: "Gold", hex: "#C9962B" },
    ],
    price: 5400,
    images: ["/images/saree-semi-pattu-1.webp"],
    shortDescription: "Sample listing: olive semi pattu with gold zari buttis and a broad coffee brown temple border.",
    featured: true,
  }),
  sample(8, {
    slug: "sample-semi-pattu-sea-green-navy",
    sku: "AV-SAMPLE-SP08",
    name: "Sea Green Semi Pattu with Navy Zari Border (Sample)",
    collectionSlug: "semi-pattu",
    occasions: ["traditional-wear", "festive-wear"],
    fabric: "Semi Pattu",
    colors: [
      { name: "Sea Green", hex: "#8FC1B9" },
      { name: "Navy Blue", hex: "#1F2C8A" },
    ],
    price: 5150,
    images: ["/images/saree-semi-pattu-2.webp"],
    shortDescription: "Sample listing: lustrous sea green semi pattu with a navy and gold zari border.",
    featured: false,
  }),
  sample(9, {
    slug: "sample-semi-pattu-lime-peacock",
    sku: "AV-SAMPLE-SP09",
    name: "Lime Green & Peacock Blue Semi Pattu (Sample)",
    collectionSlug: "semi-pattu",
    occasions: ["festive-wear", "traditional-wear"],
    fabric: "Semi Pattu",
    colors: [
      { name: "Lime Green", hex: "#A3B524" },
      { name: "Peacock Blue", hex: "#1B6A7E" },
    ],
    price: null,
    images: ["/images/saree-semi-pattu-3.webp"],
    shortDescription: "Sample listing: lime green semi pattu with small buttis and a contrast peacock blue border and pallu.",
    featured: false,
  }),
  sample(10, {
    slug: "sample-designer-wine-striped-organza",
    sku: "AV-SAMPLE-DS10",
    name: "Wine Striped Organza Designer Saree (Sample)",
    collectionSlug: "designer",
    occasions: ["wedding-wear", "special-occasions"],
    fabric: "Organza",
    colors: [
      { name: "Wine", hex: "#6E1B3A" },
      { name: "Gold", hex: "#C9962B" },
    ],
    price: null,
    images: ["/images/saree-designer-1.webp"],
    shortDescription: "Sample listing: wine and gold striped organza with a scalloped embroidered border, available on enquiry.",
    featured: true,
  }),
  sample(11, {
    slug: "sample-designer-gold-tissue-sequin",
    sku: "AV-SAMPLE-DS11",
    name: "Gold Tissue Sequin Floral Designer Saree (Sample)",
    collectionSlug: "designer",
    occasions: ["special-occasions", "wedding-wear"],
    fabric: "Tissue Organza",
    colors: [
      { name: "Antique Gold", hex: "#B79B6A" },
      { name: "Teal", hex: "#1F5A5E" },
    ],
    price: null,
    images: ["/images/saree-designer-2.webp"],
    shortDescription: "Sample listing: antique gold tissue saree with large sequin floral motifs, available on enquiry.",
    featured: false,
  }),
  sample(12, {
    slug: "sample-work-saree-red-banarasi-bead",
    sku: "AV-SAMPLE-WS12",
    name: "Red Banarasi Work Saree with Bead Border (Sample)",
    collectionSlug: "work-sarees",
    occasions: ["wedding-wear", "festive-wear", "special-occasions"],
    fabric: "Banarasi Tissue",
    colors: [
      { name: "Bridal Red", hex: "#A3162F" },
      { name: "Gold", hex: "#C9962B" },
    ],
    price: 6900,
    images: ["/images/saree-work-1.webp"],
    shortDescription: "Sample listing: rich red banarasi with gold bead work, a woven border and a beaded latkan edge.",
    featured: true,
  }),
  sample(13, {
    slug: "sample-work-saree-mustard-tissue",
    sku: "AV-SAMPLE-WS13",
    name: "Mustard Tissue Work Saree with Bead Border (Sample)",
    collectionSlug: "work-sarees",
    occasions: ["wedding-wear", "festive-wear"],
    fabric: "Tissue Silk",
    colors: [{ name: "Mustard Gold", hex: "#C9A227" }],
    price: null,
    images: ["/images/saree-work-2.webp"],
    shortDescription: "Sample listing: mustard tissue saree with pearl buttis, a woven gold border and bead latkans.",
    featured: false,
  }),
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
  { id: "ig-1", image: "/images/saree-mul-cotton-1.webp", caption: "Lilac floral embroidered mul cotton", collection: "Mul Cotton Sarees" },
  { id: "ig-2", image: "/images/saree-semi-pattu-3.webp", caption: "Lime & peacock blue semi pattu", collection: "Semi Pattu Sarees" },
  { id: "ig-3", image: "/images/saree-work-2.webp", caption: "Mustard tissue with bead border", collection: "Work Sarees" },
  { id: "ig-4", image: "/images/saree-georgette-2.webp", caption: "Sky blue mirror-work georgette", collection: "Georgette Sarees" },
  { id: "ig-5", image: "/images/saree-designer-1.webp", caption: "Wine striped organza", collection: "Designer Sarees" },
  { id: "ig-6", image: "/images/saree-mul-cotton-2.webp", caption: "Powder blue daisy print", collection: "Mul Cotton Sarees" },
];
