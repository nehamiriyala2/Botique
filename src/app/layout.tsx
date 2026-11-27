import type { Metadata } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/figtree/wght.css";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { BRAND_CONFIG } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    default: `${BRAND_CONFIG.shortName} — Celebrating Indian Elegance`,
    template: `%s | ${BRAND_CONFIG.shortName}`,
  },
  description:
    "Discover timeless Indian sarees at Aliveli Vasthralaya in Guntur. Explore Mul Cotton, Georgette, Semi Pattu, Designer, and Work Sarees celebrating Indian elegance.",
  keywords: [
    "Aliveli Vasthralaya",
    "Indian Sarees",
    "Guntur Saree Boutique",
    "Mul Cotton Sarees",
    "Georgette Sarees",
    "Semi Pattu Sarees",
    "Designer Sarees",
    "Work Sarees",
  ],
};

// Runs before first paint: enables reveal animations only when the visitor
// has not asked for reduced motion, so content is never hidden otherwise.
// LocalBusiness (ClothingStore) structured data for the Guntur boutique.
// Phone is only included once a real number is set in BRAND_CONFIG.
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: BRAND_CONFIG.shortName,
  slogan: "Celebrating Indian elegance",
  description:
    "Saree boutique in Guntur offering Mul Cotton, Georgette, Semi Pattu, Designer and Work Sarees.",
  url: BRAND_CONFIG.siteUrl,
  image: `${BRAND_CONFIG.siteUrl}/images/aliveli-logo-full.webp`,
  logo: `${BRAND_CONFIG.siteUrl}/images/aliveli-logo-full.webp`,
  ...(BRAND_CONFIG.phone ? { telephone: BRAND_CONFIG.phone } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: "122-03/1, Ice Factory Road, Ratnagar Nagar",
    addressLocality: "Guntur",
    addressRegion: "Andhra Pradesh",
    postalCode: "522006",
    addressCountry: "IN",
  },
  areaServed: ["Guntur", "Andhra Pradesh", "Telangana"],
  ...(BRAND_CONFIG.instagramUrl ? { sameAs: [BRAND_CONFIG.instagramUrl] } : {}),
};

const MOTION_FLAG = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('has-motion')}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink antialiased selection:bg-maroon selection:text-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <WishlistProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <CartDrawer />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <RevealObserver />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
