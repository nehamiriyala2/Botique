import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { COLLECTIONS } from "@/data/catalog";
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from "@/lib/brand";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Stories", href: "/#stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Bag", href: "/cart" },
];

const POLICIES = [
  { label: "Privacy", href: "/policies/privacy" },
  { label: "Terms", href: "/policies/terms" },
  { label: "Shipping", href: "/policies/shipping" },
  { label: "Returns", href: "/policies/returns" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppEnquiryUrl(
    "Hello Aliveli Vasthralaya, I would like to enquire about your saree collections."
  );

  return (
    <footer className="bg-dark text-paper pt-[clamp(70px,8vw,130px)] pb-6 overflow-hidden">
      <div className="shell">
        <p
          data-reveal
          className="font-serif text-[clamp(54px,9.6vw,172px)] leading-[0.98] tracking-[-0.055em] text-[#eadfd5] mb-[clamp(48px,6vw,96px)]"
        >
          Celebrating Indian <em className="!text-rose">elegance.</em>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-12 pb-12 border-b border-[#65464a]">
          <div className="space-y-6">
            <BrandLogo variant="light" />
            <p className="micro text-sand max-w-[260px]">Saree boutique · Guntur, Andhra Pradesh</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-link !text-paper min-w-[220px]">
              WhatsApp the boutique
              <ArrowUpRight className="w-4 h-4 stroke-[1.4]" />
            </a>
          </div>

          <div>
            <p className="micro text-sand mb-5">Collections</p>
            <ul className="space-y-2.5">
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/shop?collection=${c.slug}`}
                    className="font-serif text-[20px] tracking-[-0.02em] text-[#eadfd5] hover:text-rose transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="micro text-sand mb-5">Visit</p>
            <address className="not-italic text-[14px] leading-[1.8] text-[#ded2c8]">
              {BRAND_CONFIG.address.line1}
              <br />
              {BRAND_CONFIG.address.line2} {BRAND_CONFIG.address.city}
              <br />
              {BRAND_CONFIG.address.statePin}
            </address>
            <p className="mt-4 text-[14px] text-[#ded2c8]">{BRAND_CONFIG.phonePlaceholder}</p>
            {BRAND_CONFIG.instagramUrl && (
              <a href={BRAND_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="quiet-link text-sand">
                {BRAND_CONFIG.instagramHandle}
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-1 py-6 border-b border-[#65464a]">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="min-h-[44px] inline-flex items-center text-[11px] font-semibold tracking-[0.12em] uppercase text-paper/90 hover:text-rose transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-5 text-[10px] tracking-[0.06em] text-sand">
          <p>
            © {year} {BRAND_CONFIG.shortName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6">
            {POLICIES.map((p) => (
              <Link key={p.href} href={p.href} className="min-h-[36px] inline-flex items-center hover:text-paper transition-colors">
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
