# ALIVELI VASTHRALAYA — Luxury Saree Boutique Web Application

Built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

## Quick Customization Guide

1. **Original Logo (`public/images/aliveli-logo.png`)**
   - Drop your original Aliveli Vasthralaya logo image file at `public/images/aliveli-logo.png` (or update `logoOverridePath` in `src/lib/brand.ts`).
   - `BrandLogo` (`src/components/BrandLogo.tsx`) automatically renders that file if present, and displays a bespoke Aliveli Vasthralaya crest SVG + wordmark fallback otherwise.

2. **Contact Phone, WhatsApp & Instagram (`src/lib/brand.ts`)**
   - Update `phonePlaceholder`, `whatsappNumber`, `instagramUrl`, `instagramHandle`, and `email` in `src/lib/brand.ts`.

3. **Live Inventory & Database Integration (`src/data/catalog.ts` & `src/lib/db/repository.ts`)**
   - Current products in `SAMPLE_PRODUCTS` are clearly marked sample entries (`isSample: true`).
   - Replace `SAMPLE_PRODUCTS` or wire `src/lib/db/repository.ts` to PostgreSQL / Prisma / Supabase without changing UI components.

4. **Payment Gateway Integration (`src/lib/payments/gateway.ts`)**
   - Checkout prepares validated order enquiry drafts and is structured for Razorpay, Cashfree, or Stripe without simulating transactions.
