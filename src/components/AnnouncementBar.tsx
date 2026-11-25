import React from "react";

const MESSAGES = [
  "Celebrating Indian elegance",
  "Mul Cotton · Georgette · Semi Pattu · Designer · Work",
  "Visit our boutique in Guntur",
  "Enquire personally on WhatsApp",
];

/** Slim dark ticker — loops a quiet line of brand messages. */
export function AnnouncementBar() {
  const row = (hidden: boolean) => (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {[...MESSAGES, ...MESSAGES].map((msg, i) => (
        <span key={i} className="micro flex items-center gap-8 pr-8 whitespace-nowrap">
          {msg}
          <span className="inline-block w-1 h-1 rounded-full bg-rose/70" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="bg-dark text-sand h-9 flex items-center">
      <div className="marquee w-full" style={{ ["--marquee-duration" as string]: "48s" }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
