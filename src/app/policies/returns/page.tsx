import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/brand";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: `Return & Refund Policy for ${BRAND_CONFIG.name}.`,
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeading
          eyebrow="Boutique Policies"
          title="Return & Refund Policy"
          align="left"
        />
        <div className="space-y-4 text-sm text-ink-muted leading-relaxed pt-4">
          <p>
            At {BRAND_CONFIG.shortName}, we take care to inspect every saree prior to dispatch and encourage customers to request close-up visuals or fabric guidance before ordering.
          </p>
          <p>
            To be eligible for an exchange or return consideration in the case of transit damage or an incorrect item received, please contact our boutique promptly upon delivery with unboxing details while keeping the saree unused, unwashed, and with original tags intact.
          </p>
          <p>
            Exact return windows and refund timelines will be updated here upon live payment gateway activation.
          </p>
        </div>
      </div>
    </div>
  );
}
