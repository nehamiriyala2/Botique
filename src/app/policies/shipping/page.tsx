import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/brand";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: `Shipping Policy for ${BRAND_CONFIG.name}.`,
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeading
          eyebrow="Boutique Policies"
          title="Shipping Policy"
          align="left"
        />
        <div className="space-y-4 text-sm text-ink-muted leading-relaxed pt-4">
          <p>
            Orders confirmed with {BRAND_CONFIG.shortName} are carefully inspected and packed in protective boutique wrapping prior to dispatch.
          </p>
          <p>
            Applicable courier charges, dispatch schedules, and estimated delivery windows are communicated transparently at the time of order confirmation based on your delivery PIN code.
          </p>
          <p>
            Local patrons may also arrange in-store collection from our Guntur boutique at {BRAND_CONFIG.address.full}.
          </p>
        </div>
      </div>
    </div>
  );
}
