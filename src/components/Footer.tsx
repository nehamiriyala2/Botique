import React from "react";
import Link from "next/link";
import { MessageCircle, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { COLLECTIONS } from "@/data/catalog";
import {
  BRAND_CONFIG,
  buildGoogleMapsDirectionsUrl,
  buildPhoneUrl,
  buildWhatsAppEnquiryUrl,
} from "@/lib/brand";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Stories", href: "/#stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Bag", href: "/cart" },
  { label: "Account", href: "/account" },
];

const POLICIES = [
  { label: "Privacy", href: "/policies/privacy" },
  { label: "Terms", href: "/policies/terms" },
  { label: "Shipping", href: "/policies/shipping" },
  { label: "Returns", href: "/policies/returns" },
];

const heading = "text-[12px] font-semibold tracking-[0.16em] uppercase text-gold mb-5";
const link = "text-[15px] text-paper/85 hover:text-paper underline-offset-4 hover:underline decoration-gold";

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppEnquiryUrl(
    "Hello Aliveli Vasthralaya, I would like to enquire about your saree collections."
  );
  const phoneUrl = buildPhoneUrl();

  return (
    <footer className="bg-dark text-paper">
      <div className="zari" aria-hidden="true" />
      <div className="shell pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
          <div className="space-y-5">
            <BrandLogo variant="light" compact />
            <p className="font-serif italic text-[22px] leading-snug text-paper/90 max-w-[300px]">
              Celebrating Indian elegance.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 min-h-[46px] px-5 rounded-full border-[1.5px] border-gold text-paper text-[13px] font-semibold hover:bg-paper hover:text-maroon hover:border-paper transition-colors">
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          </div>

          <div>
            <p className={heading}>Collections</p>
            <ul className="space-y-3">
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop?collection=${c.slug}`} className={link}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={heading}>Explore</p>
            <ul className="space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={heading}>Visit the boutique</p>
            <address className="not-italic text-[15px] leading-[1.75] text-paper/85 flex gap-3">
              <MapPin className="w-4 h-4 mt-1 shrink-0 text-gold" aria-hidden="true" />
              <span>
                {BRAND_CONFIG.address.line1}
                <br />
                {BRAND_CONFIG.address.line2} {BRAND_CONFIG.address.city}
                <br />
                {BRAND_CONFIG.address.statePin}
              </span>
            </address>
            <a href={buildGoogleMapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" className={`${link} inline-block mt-3 ml-7`}>
              Get directions
            </a>
            <p className="mt-4 text-[15px] text-paper/85 flex gap-3 items-center">
              <Phone className="w-4 h-4 shrink-0 text-gold" aria-hidden="true" />
              {phoneUrl ? (
                <a href={phoneUrl} className={link}>
                  {BRAND_CONFIG.phone}
                </a>
              ) : (
                <span className="italic text-paper/70">{BRAND_CONFIG.phonePlaceholder}</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-gold/40 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px] text-paper/75">
          <p>
            © {year} {BRAND_CONFIG.shortName}. All rights reserved.
          </p>
          <nav aria-label="Policies" className="flex flex-wrap gap-x-6 gap-y-1">
            {POLICIES.map((p) => (
              <Link key={p.href} href={p.href} className="min-h-[36px] inline-flex items-center hover:text-paper hover:underline underline-offset-4 decoration-gold">
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
