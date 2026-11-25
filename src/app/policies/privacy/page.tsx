import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/brand";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BRAND_CONFIG.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeading
          eyebrow="Boutique Policies"
          title="Privacy Policy"
          align="left"
        />
        <div className="space-y-4 text-sm text-ink-muted leading-relaxed pt-4">
          <p>
            {BRAND_CONFIG.shortName} respects your privacy. Information shared through our enquiry forms or checkout preparation (such as your name, contact details, and delivery address) is used solely to respond to your saree enquiries, confirm availability, and arrange requested deliveries.
          </p>
          <p>
            Shopping bag items and saved saree preferences are stored locally in your browser so your selections remain available across visits.
          </p>
          <p>
            For questions regarding your personal information, please reach our store at{" "}
            {BRAND_CONFIG.address.full}.
          </p>
        </div>
      </div>
    </div>
  );
}
