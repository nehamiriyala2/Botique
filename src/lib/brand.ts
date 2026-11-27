export const BRAND_CONFIG = {
  name: "ALIVELI VASTHRALAYA",
  shortName: "Aliveli Vasthralaya",
  tagline: "CELEBRATING INDIAN ELEGANCE",
  email: "enquiries@alivelivasthralaya.example", // Replace with official store email
  phonePlaceholder: "+91 [Store Phone Pending]",
  whatsappNumber: "", // Add digits with country code (e.g., "919XXXXXXXXX") once confirmed
  instagramUrl: "", // Add official Instagram profile URL once supplied
  instagramHandle: "@alivelivasthralaya",
  address: {
    line1: "122-03/1, Ice Factory Road,",
    line2: "Ratnagar Nagar,",
    city: "Guntur,",
    statePin: "Andhra Pradesh – 522006, India.",
    full: "122-03/1, Ice Factory Road, Ratnagar Nagar, Guntur, Andhra Pradesh – 522006, India.",
  },
  storeHours: "Store hours to be updated",
  logoOverridePath: "/images/aliveli-logo-full.jpg", // Official full logo (crest + wordmark on emerald)
  crestPath: "/images/aliveli-crest.png", // Round "AV" peacock-feather crest
  wordmarkPath: "/images/aliveli-wordmark.png", // Gold "ALIVELI VASTHRALAYA" wordmark (for dark backgrounds)
} as const;

export function buildWhatsAppEnquiryUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  if (BRAND_CONFIG.whatsappNumber) {
    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encoded}`;
  }
  return `https://wa.me/?text=${encoded}`;
}

export function buildGoogleMapsDirectionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    BRAND_CONFIG.address.full
  )}`;
}

export function buildGoogleMapsEmbedUrl(): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    BRAND_CONFIG.address.full
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
