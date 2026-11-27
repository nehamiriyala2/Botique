"use client";

import React, { useState } from "react";
import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import {
  BRAND_CONFIG,
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  buildPhoneUrl,
  buildWhatsAppEnquiryUrl,
} from "@/lib/brand";

const INTERESTS = [
  "General saree enquiry",
  "Mul Cotton Sarees",
  "Georgette Sarees",
  "Semi Pattu Sarees",
  "Designer Sarees",
  "Work Sarees",
  "Wedding & bridal sarees",
  "Store visit",
];

/** Visit & enquire: address, map, directions, and a form that opens WhatsApp with a prefilled message. */
export function ContactEnquirySection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [message, setMessage] = useState("");
  const phoneUrl = buildPhoneUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      "Hello Aliveli Vasthralaya,",
      `My name is ${name.trim()}.`,
      `Phone: ${phone.trim()}`,
      `Interested in: ${interest}`,
      message.trim() ? `Message: ${message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppEnquiryUrl(text), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[16px] text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-maroon focus:ring-2 focus:ring-gold/40 transition-colors";
  const label = "block text-[13px] font-semibold text-ink mb-1.5";

  return (
    <section id="visit-store" className="section bg-paper">
      <div className="shell">
        <div className="max-w-[640px]">
          <p className="eyebrow">Visit &amp; enquire</p>
          <h2 className="h-section mt-4 text-ink">
            Come see the sarees <em>in person.</em>
          </h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-muted">
            Looking for a particular weave, colour or a drape for a special day? Visit us in Guntur, or send
            a message and we will help you choose.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Address + map */}
          <div className="card flex flex-col">
            <div className="zari" aria-hidden="true" />
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-gold shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-semibold text-ink mb-1">The boutique</p>
                  <address className="not-italic text-[15px] leading-[1.7] text-ink-muted">
                    {BRAND_CONFIG.address.line1}
                    <br />
                    {BRAND_CONFIG.address.line2} {BRAND_CONFIG.address.city}
                    <br />
                    Andhra Pradesh – 522006
                  </address>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-gold shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-semibold text-ink mb-1">Call</p>
                  {phoneUrl ? (
                    <a href={phoneUrl} className="text-[15px] text-maroon underline decoration-gold underline-offset-4">
                      {BRAND_CONFIG.phone}
                    </a>
                  ) : (
                    <p className="text-[15px] italic text-ink-muted">{BRAND_CONFIG.phonePlaceholder}</p>
                  )}
                  <p className="text-[13px] text-ink-muted mt-1">{BRAND_CONFIG.storeHours}</p>
                </div>
              </div>
            </div>
            <div className="px-6 sm:px-8 flex flex-wrap gap-3">
              <a href={buildGoogleMapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="btn-solid">
                <Navigation className="w-4 h-4" aria-hidden="true" />
                Get directions
              </a>
              {phoneUrl && (
                <a href={phoneUrl} className="btn-ghost">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call the boutique
                </a>
              )}
            </div>
            <div className="m-6 sm:m-8 mt-6 sm:mt-6 flex-1 min-h-[260px] rounded-2xl overflow-hidden border border-line bg-ivory">
              <iframe
                title="Aliveli Vasthralaya store location in Guntur"
                src={buildGoogleMapsEmbedUrl()}
                className="w-full h-full min-h-[260px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Enquiry form */}
          <div className="card">
            <div className="zari" aria-hidden="true" />
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 className="font-serif text-[28px] leading-tight text-ink">Send an enquiry</h3>
                <p className="text-[14px] text-ink-muted mt-1">
                  This opens WhatsApp with your message ready to send.
                </p>
              </div>

              <div>
                <label htmlFor="enquiry-name" className={label}>Your name</label>
                <input id="enquiry-name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={field} />
              </div>
              <div>
                <label htmlFor="enquiry-phone" className={label}>Phone / WhatsApp number</label>
                <input id="enquiry-phone" type="tel" required autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" className={field} />
              </div>
              <div>
                <label htmlFor="enquiry-interest" className={label}>Interested in</label>
                <select id="enquiry-interest" value={interest} onChange={(e) => setInterest(e.target.value)} className={`${field} cursor-pointer`}>
                  {INTERESTS.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="enquiry-message" className={label}>Message</label>
                <textarea id="enquiry-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Colours, occasion, or sarees you would like to see…" className={`${field} resize-y`} />
              </div>

              <button type="submit" className="btn-solid w-full sm:w-auto">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Send on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
