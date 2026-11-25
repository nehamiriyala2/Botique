import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

/**
 * Editorial heading: hairline eyebrow label, large light serif title
 * (wrap one word in <em> for the wine italic accent), muted lede.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <p
          data-reveal="label"
          className={`section-label ${centered ? "justify-center" : ""} ${
            light ? "!text-sand" : ""
          }`}
        >
          <span />
          {eyebrow}
          {centered && <span />}
        </p>
      )}
      <h2
        data-reveal
        style={{ ["--d" as string]: "80ms" }}
        className={`display-md mt-7 ${light ? "text-paper [&_em]:text-rose" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal
          style={{ ["--d" as string]: "160ms" }}
          className={`mt-6 text-[16px] leading-[1.85] max-w-xl ${centered ? "mx-auto" : ""} ${
            light ? "text-[#ded2c8]" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
