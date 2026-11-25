import type { Metadata } from "next";
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/manrope/wght.css";
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
