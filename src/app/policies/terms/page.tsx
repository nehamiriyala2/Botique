import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/brand";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms & Conditions for ${BRAND_CONFIG.name}.`,
};

export default function TermsPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeading
          eyebrow="Boutique Policies"
          title="Terms & Conditions"
          align="left"
        />
        <div className="space-y-4 text-sm text-ink-muted leading-relaxed pt-4">
          <p>
            Welcome to {BRAND_CONFIG.shortName}. All sarees displayed on this website are subject to availability and final confirmation prior to order dispatch.
          </p>
          <p>
            Subtle variations in color, handwoven texture, or zari sheen may occur due to photographic lighting and screen calibration. Our team is happy to share additional photos or videos on WhatsApp prior to confirmation.
          </p>
          <p>
            Any sample catalog items marked on the website are placeholder representations until live inventory pricing is finalized.
          </p>
        </div>
      </div>
    </div>
  );
}
