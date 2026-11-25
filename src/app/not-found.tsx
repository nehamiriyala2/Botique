import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/brand";

export default function NotFound() {
  return (
    <div className="bg-ivory/40 py-24 sm:py-32 px-4">
      <div className="max-w-xl mx-auto text-center bg-white border border-gold/35 p-10 sm:p-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold-muted">
          {BRAND_CONFIG.name}
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-maroon font-normal">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm text-ink-muted leading-relaxed">
          The saree or page you are looking for may have moved or been updated. Explore our signature collections below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-maroon text-ivory text-xs uppercase tracking-[0.2em] hover:bg-maroon-dark transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 border border-maroon text-maroon text-xs uppercase tracking-[0.2em] hover:bg-maroon/5 transition-colors"
          >
            Explore Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
