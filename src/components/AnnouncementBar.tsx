import React from "react";
import { buildWhatsAppEnquiryUrl } from "@/lib/brand";

/** Slim maroon strip with a single, static brand message. */
export function AnnouncementBar() {
  const whatsapp = buildWhatsAppEnquiryUrl(
    "Hello Aliveli Vasthralaya, I would like to enquire about your sarees."
  );

  return (
    <div className="bg-dark text-paper">
      <p className="shell min-h-9 py-2 flex items-center justify-center text-center text-[12.5px] leading-snug tracking-[0.02em]">
        <span>
          Visit our Guntur boutique or{" "}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold underline-offset-4 hover:decoration-paper"
          >
            enquire personally on WhatsApp
          </a>
        </span>
      </p>
    </div>
  );
}
