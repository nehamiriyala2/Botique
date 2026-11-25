import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/data/catalog";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Aliveli Vasthralaya's signature collections: Mul Cotton, Georgette, Semi Pattu, Designer, and Work Sarees.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Signature Weaves & Drapes"
          title="Our Saree Collections"
          description="Five curated expressions of Indian elegance—spanning breathable everyday cottons to luminous celebratory weaves."
        />

        <div className="mt-16 space-y-16">
          {COLLECTIONS.map((col, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={col.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border border-gold/25 bg-ivory/40 p-6 sm:p-10"
              >
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div
                    data-reveal="curtain"
                    className="relative aspect-[4/5] max-w-[520px] mx-auto overflow-hidden bg-ivory-deep zoom"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover object-[50%_18%]"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="inline-block text-[11px] uppercase tracking-[0.26em] text-gold-muted font-medium">
                    0{idx + 1} • {col.accentLabel}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-maroon font-normal">
                    {col.name}
                  </h2>
                  <p className="font-serif italic text-lg text-ink-muted">
                    {col.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                    {col.description}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/shop?collection=${col.slug}`}
                      className="inline-flex items-center gap-2.5 px-7 py-3 bg-maroon text-ivory text-xs uppercase tracking-[0.2em] hover:bg-maroon-dark transition-colors"
                    >
                      <span>Explore {col.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
