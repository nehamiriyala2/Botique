import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/brand";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover Aliveli Vasthralaya's dedication to celebrating Indian sarees, traditional beauty, and attentive personal service.",
};

export default function AboutPage() {
  return (
    <div className="bg-ivory/50">
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={BRAND_CONFIG.name}
          title="Tradition Meets Timeless Elegance"
          description="Celebrating the enduring beauty, grace, and cultural spirit of Indian women through curated sarees."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] border border-gold/35 bg-white overflow-hidden shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand-story.jpg"
                alt="Aliveli Vasthralaya — Celebrating Indian Elegance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm sm:text-base text-ink-muted leading-relaxed">
            <h2 className="font-serif text-3xl text-maroon font-normal">
              Celebrating Indian Elegance
            </h2>
            <p>
              <strong className="text-maroon font-medium">
                Aliveli Vasthralaya
              </strong>{" "}
              is dedicated to presenting Indian sarees that balance timeless cultural charm with poised everyday and festive wearability.
            </p>
            <p>
              Whether you are choosing an airy Mul Cotton saree for serene everyday grace, a fluid Georgette silhouette, a lustrous Semi Pattu weave for auspicious rituals, or an intricate Designer or Work Saree for milestone celebrations, our focus remains personal guidance and thoughtful curation.
            </p>
            <p>
              We welcome patrons to visit our boutique in Guntur or connect directly via WhatsApp for attentive recommendations tailored to your occasion and color preferences.
            </p>

            <div className="pt-4 border-t border-gold/30 space-y-2 text-sm">
              <p className="font-serif text-lg text-maroon">Boutique Location</p>
              <p>{BRAND_CONFIG.address.full}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/collections"
                className="px-6 py-3 bg-maroon text-ivory text-xs uppercase tracking-[0.2em] hover:bg-maroon-dark transition-colors"
              >
                Explore Collections
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-maroon text-maroon text-xs uppercase tracking-[0.2em] hover:bg-maroon/5 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
