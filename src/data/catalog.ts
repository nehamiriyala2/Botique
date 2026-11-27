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
    image: "/images/saree-georgette-2.webp",
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
    image: "/images/saree-work-2.webp",
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
    image: "/images/saree-designer-2.webp",
  },
  {
    id: "occ-2",
    slug: "festive-wear",
    name: "Festive Wear",
    subtitle: "Celebratory Hues & Radiance",
    description:
      "Luminous silhouettes crafted to shine across pujas, festive evenings, and auspicious gatherings.",
    image: "/images/saree-georgette-1.webp",
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
    image: "/images/saree-work-1.webp",
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
    slug: "sample-mul-cotton-mustard-madhubani",
    sku: "AV-SAMPLE-MC01",
    name: "Mustard Madhubani Print Mul Cotton Saree (Sample)",
    collectionSlug: "mul-cotton",
    occasions: ["everyday-elegance", "traditional-wear"],
    fabric: "Mul Cotton",
    colors: [
      { name: "Mustard Yellow", hex: "#D9A520" },
      { name: "Charcoal", hex: "#3B3B3B" },
    ],
    price: 2450,
    images: ["/images/saree-mul-cotton-1.webp"],
    shortDescription: "Sample listing: soft mul cotton in mustard yellow with a hand-drawn Madhubani-style print and tassels.",
    featured: true,
  }),
  sample(2, {
    slug: "sample-georgette-teal-zari-border",
    sku: "AV-SAMPLE-GG02",
    name: "Peacock Teal Georgette Saree with Zari Border (Sample)",
    collectionSlug: "georgette",
    occasions: ["festive-wear", "special-occasions"],
    fabric: "Georgette",
    colors: [
      { name: "Peacock Teal", hex: "#0E6F80" },
      { name: "Lime Yellow", hex: "#C9C431" },
    ],
    price: 3850,
    images: ["/images/saree-georgette-1.webp"],
    shortDescription: "Sample listing: fluid teal georgette with an embroidered gold border, paired with a lime blouse.",
    featured: true,
  }),
  sample(3, {
    slug: "sample-semi-pattu-royal-blue",
    sku: "AV-SAMPLE-SP03",
    name: "Royal Blue Semi Pattu Saree with Contrast Border (Sample)",
    collectionSlug: "semi-pattu",
    occasions: ["traditional-wear", "festive-wear"],
    fabric: "Semi Pattu",
    colors: [
      { name: "Royal Blue", hex: "#1F4E79" },
      { name: "Lavender", hex: "#A99BD1" },
    ],
    price: 5400,
    images: ["/images/saree-semi-pattu-1.webp"],
    shortDescription: "Sample listing: lustrous royal blue semi pattu with small woven buttis and a lavender contrast border.",
    featured: true,
  }),
  sample(4, {
    slug: "sample-designer-maroon-mirror-work",
    sku: "AV-SAMPLE-DS04",
    name: "Maroon Mirror-Work Organza Designer Saree (Sample)",
    collectionSlug: "designer",
    occasions: ["wedding-wear", "special-occasions"],
    fabric: "Organza",
    colors: [{ name: "Deep Maroon", hex: "#7B1126" }],
    price: null,
    images: ["/images/saree-designer-1.webp"],
    shortDescription: "Sample listing: maroon organza with mirror and sequin buttis and a scalloped border, available on enquiry.",
    featured: true,
  }),
  sample(5, {
    slug: "sample-work-saree-rust-embroidered",
    sku: "AV-SAMPLE-WS05",
    name: "Rust Brown Embroidered Work Saree (Sample)",
    collectionSlug: "work-sarees",
    occasions: ["wedding-wear", "special-occasions", "festive-wear"],
    fabric: "Embroidered Tissue",
    colors: [
      { name: "Rust Brown", hex: "#8B4A26" },
      { name: "Antique Gold", hex: "#C9962B" },
    ],
    price: 6900,
    images: ["/images/saree-work-2.webp"],
    shortDescription: "Sample listing: rust tissue saree with gold thread embroidery on the border and a matching work blouse.",
    featured: true,
  }),
  sample(6, {
    slug: "sample-mul-cotton-mint-block-print",
    sku: "AV-SAMPLE-MC06",
    name: "Mint Green Block Print Mul Cotton Saree (Sample)",
    collectionSlug: "mul-cotton",
    occasions: ["everyday-elegance"],
    fabric: "Mul Cotton",
    colors: [
      { name: "Mint Green", hex: "#A8E0B8" },
      { name: "Mustard", hex: "#D9A520" },
    ],
    price: 2250,
    images: ["/images/saree-mul-cotton-2.webp"],
    shortDescription: "Sample listing: breathable mint mul cotton with mustard block-print motifs and a zig-zag pallu.",
    featured: false,
  }),
  sample(7, {
    slug: "sample-mul-cotton-lemon-floral",
    sku: "AV-SAMPLE-MC07",
    name: "Lemon Yellow Floral Embroidered Mul Cotton Saree (Sample)",
    collectionSlug: "mul-cotton",
    occasions: ["everyday-elegance"],
    fabric: "Mul Cotton",
    colors: [{ name: "Lemon Yellow", hex: "#F3E58A" }],
    price: null,
    images: ["/images/saree-mul-cotton-3.webp"],
    shortDescription: "Sample listing: light lemon mul cotton with delicate pink floral embroidery.",
    featured: false,
  }),
  sample(8, {
    slug: "sample-georgette-sage-sequin-border",
    sku: "AV-SAMPLE-GG08",
    name: "Sage Green Georgette Saree with Sequin Border (Sample)",
    collectionSlug: "georgette",
    occasions: ["special-occasions", "festive-wear"],
    fabric: "Georgette",
    colors: [{ name: "Sage Green", hex: "#6E9E5E" }],
    price: null,
    images: ["/images/saree-georgette-2.webp"],
    shortDescription: "Sample listing: soft sage georgette with a shimmering sequin border.",
    featured: false,
  }),
  sample(9, {
    slug: "sample-georgette-red-embroidered",
    sku: "AV-SAMPLE-GG09",
    name: "Red Embroidered Georgette Saree (Sample)",
    collectionSlug: "georgette",
    occasions: ["festive-wear", "wedding-wear"],
    fabric: "Georgette",
    colors: [{ name: "Red", hex: "#C0162C" }],
    price: 4100,
    images: ["/images/saree-georgette-3.webp"],
    shortDescription: "Sample listing: red georgette with a floral embroidered border and matching scalloped blouse.",
    featured: false,
  }),
  sample(10, {
    slug: "sample-semi-pattu-parrot-green-zari",
    sku: "AV-SAMPLE-SP10",
    name: "Parrot Green & Red Zari Semi Pattu Saree (Sample)",
    collectionSlug: "semi-pattu",
    occasions: ["wedding-wear", "festive-wear", "traditional-wear"],
    fabric: "Semi Pattu",
    colors: [
      { name: "Parrot Green", hex: "#8DBE3C" },
      { name: "Red", hex: "#C0162C" },
      { name: "Gold", hex: "#C9962B" },
    ],
    price: 5150,
    images: ["/images/saree-semi-pattu-2.webp"],
    shortDescription: "Sample listing: parrot green semi pattu with rich gold zari and a red border.",
    featured: false,
  }),
  sample(11, {
    slug: "sample-designer-blush-embellished",
    sku: "AV-SAMPLE-DS11",
    name: "Blush Pink Embellished Designer Saree (Sample)",
    collectionSlug: "designer",
    occasions: ["wedding-wear", "special-occasions"],
    fabric: "Designer Silk Blend",
    colors: [{ name: "Blush Pink", hex: "#E8A3B4" }],
    price: null,
    images: ["/images/saree-designer-2.webp"],
    shortDescription: "Sample listing: blush pink designer saree with a heavy embellished scalloped border, available on enquiry.",
    featured: false,
  }),
  sample(12, {
    slug: "sample-work-saree-sky-blue",
    sku: "AV-SAMPLE-WS12",
    name: "Sky Blue Work Saree with Embroidered Border (Sample)",
    collectionSlug: "work-sarees",
    occasions: ["special-occasions", "festive-wear"],
    fabric: "Embroidered Silk Blend",
    colors: [
      { name: "Sky Blue", hex: "#9CCFE0" },
      { name: "Pink", hex: "#E58AA6" },
    ],
    price: null,
    images: ["/images/saree-work-1.webp"],
    shortDescription: "Sample listing: sky blue saree with gold thread work on the border and a contrast pink work blouse.",
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
  { id: "ig-1", image: "/images/saree-mul-cotton-1.webp", caption: "Mustard Madhubani print mul cotton", collection: "Mul Cotton Sarees" },
  { id: "ig-2", image: "/images/saree-georgette-2.webp", caption: "Sage georgette with a sequin border", collection: "Georgette Sarees" },
  { id: "ig-3", image: "/images/saree-semi-pattu-2.webp", caption: "Parrot green & red zari semi pattu", collection: "Semi Pattu Sarees" },
  { id: "ig-4", image: "/images/saree-designer-1.webp", caption: "Maroon mirror-work organza", collection: "Designer Sarees" },
  { id: "ig-5", image: "/images/saree-work-1.webp", caption: "Sky blue with embroidered border", collection: "Work Sarees" },
  { id: "ig-6", image: "/images/saree-georgette-3.webp", caption: "Red embroidered georgette", collection: "Georgette Sarees" },
];
