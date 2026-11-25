"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  BRAND_CONFIG,
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  buildWhatsAppEnquiryUrl,
} from "@/lib/brand";

export function ContactEnquirySection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("General Saree Enquiry");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const generalWhatsApp = buildWhatsAppEnquiryUrl(
    "Hello Aliveli Vasthralaya, I would like to enquire about your sarees and store visit."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorNotice(null);
    setSubmittedNotice(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, interest, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorNotice(data.error ?? "Please verify your details and try again.");
      } else {
        setSubmittedNotice(
          data.message ??
            "Your enquiry details have been validated. You may also send them directly via WhatsApp for immediate boutique assistance."
        );
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      }
    } catch {
      setErrorNotice(
        "Unable to submit form right now. Please reach us via WhatsApp enquiry."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full bg-transparent border-0 border-b border-line rounded-none px-0.5 py-3 text-[16px] text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-maroon transition-colors";
  const label = "micro block text-ink-muted mt-6 mb-0.5";

  const channels = [
    { label: "WhatsApp us", href: generalWhatsApp, external: true },
    { label: "Get directions", href: buildGoogleMapsDirectionsUrl(), external: true },
    ...(BRAND_CONFIG.instagramUrl
      ? [{ label: `Instagram ${BRAND_CONFIG.instagramHandle}`, href: BRAND_CONFIG.instagramUrl, external: true }]
      : []),
    { label: "Email the boutique", href: `mailto:${BRAND_CONFIG.email}`, external: false },
  ];

  return (
    <section id="visit-store" className="bg-paper pt-[var(--space)] pb-[clamp(64px,6vw,100px)] overflow-hidden">
      {/* Marquee band */}
      <div className="border-y border-line py-5 mb-[var(--space)]">
        <div className="marquee" style={{ ["--marquee-duration" as string]: "42s" }}>
          {[false, true].map((dup) => (
            <div key={String(dup)} className="marquee__track" aria-hidden={dup || undefined}>
              {["Saree enquiries", "Store visits", "Wedding & festive styling", "Chosen personally. Worn beautifully."].map(
                (t, i) => (
                  <span
                    key={i}
                    className="font-serif italic text-[clamp(26px,3vw,44px)] tracking-[-0.03em] text-ink/85 whitespace-nowrap flex items-center gap-10 pr-10"
                  >
                    {t}
                    <span className="inline-block w-2 h-2 rounded-full bg-maroon/70" />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="shell">
        <p data-reveal="label" className="section-label">
          <span />
          Visit &amp; enquire
        </p>
        <h2
          data-reveal
          style={{ ["--d" as string]: "80ms" }}
          className="mt-9 mb-12 text-[clamp(52px,6.1vw,100px)] leading-[1.04] tracking-[-0.052em] max-w-[14ch]"
        >
          Have something in mind? <em>Let’s find it.</em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-[10%]">
          {/* Left: copy, channels, map */}
          <div data-reveal style={{ ["--d" as string]: "140ms" }}>
            <p className="lede max-w-[510px]">
              Looking for a particular weave, colour, or a drape for a special day? Visit us in Guntur or
              send a message — our team will help you choose.
            </p>

            <div className="mt-8 flex flex-col items-start">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-link min-w-[260px]"
                >
                  {c.label}
                  <ArrowUpRight className="w-4 h-4 stroke-[1.4]" />
                </a>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-line">
              <div>
                <p className="micro text-ink-muted mb-3">The boutique</p>
                <address className="not-italic font-serif text-[22px] leading-[1.35] tracking-[-0.02em]">
                  {BRAND_CONFIG.address.line1}
                  <br />
                  {BRAND_CONFIG.address.line2} {BRAND_CONFIG.address.city}
                  <br />
                  {BRAND_CONFIG.address.statePin}
                </address>
              </div>
              <div>
                <p className="micro text-ink-muted mb-3">Call</p>
                <p className="font-serif text-[22px] leading-[1.35] tracking-[-0.02em]">
                  {BRAND_CONFIG.phonePlaceholder}
                </p>
                <p className="micro text-ink-muted mt-3">{BRAND_CONFIG.storeHours}</p>
              </div>
            </div>

            <div data-reveal="curtain" className="mt-10 aspect-[16/10] w-full overflow-hidden bg-ivory-deep">
              <iframe
                title="Aliveli Vasthralaya store location in Guntur"
                src={buildGoogleMapsEmbedUrl()}
                className="w-full h-full border-0 grayscale-[0.6] sepia-[0.15]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: enquiry form */}
          <div
            data-reveal
            style={{ ["--d" as string]: "220ms" }}
            className="lg:border-l lg:border-line lg:pl-[12%] self-start"
          >
            <h3 className="text-[clamp(30px,3vw,42px)] leading-[1.1] tracking-[-0.035em]">
              Send an <em>enquiry.</em>
            </h3>
            <p className="micro text-ink-muted mt-3">We usually reply on WhatsApp or phone.</p>

            <form onSubmit={handleSubmit} className="mt-2">
              <label htmlFor="enquiry-name" className={label}>Your name *</label>
              <input id="enquiry-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={field} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <div>
                  <label htmlFor="enquiry-phone" className={label}>Phone / WhatsApp *</label>
                  <input id="enquiry-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" className={field} />
                </div>
                <div>
                  <label htmlFor="enquiry-email" className={label}>Email (optional)</label>
                  <input id="enquiry-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={field} />
                </div>
              </div>

              <label htmlFor="enquiry-interest" className={label}>Interested in</label>
              <select id="enquiry-interest" value={interest} onChange={(e) => setInterest(e.target.value)} className={`${field} cursor-pointer`}>
                <option>General Saree Enquiry</option>
                <option>Mul Cotton Sarees</option>
                <option>Georgette Sarees</option>
                <option>Semi Pattu Sarees</option>
                <option>Designer Sarees</option>
                <option>Work Sarees</option>
                <option>Wedding & Bridal Styling</option>
                <option>Store Visit Appointment</option>
              </select>

              <label htmlFor="enquiry-message" className={label}>Your message *</label>
              <textarea id="enquiry-message" rows={3} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Colours, occasion, or sarees you'd like to see…" className={`${field} resize-y min-h-[84px]`} />

              {errorNotice && (
                <p className="mt-5 text-[13px] text-maroon border-l-2 border-maroon pl-3">{errorNotice}</p>
              )}
              {submittedNotice && (
                <p className="mt-5 text-[13px] text-ink flex items-start gap-2" style={{ animation: "caption-in .6s var(--ease) both" }}>
                  <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <span>{submittedNotice}</span>
                </p>
              )}

              <button type="submit" disabled={submitting} className="btn-solid mt-8 w-full sm:w-auto disabled:opacity-60">
                {submitting ? "Sending…" : "Send enquiry"}
                <ArrowRight className="w-4 h-4 stroke-[1.4]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

