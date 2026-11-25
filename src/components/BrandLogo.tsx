import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/brand";

interface BrandLogoProps {
  /** "dark" = for light backgrounds (header), "light" = for dark backgrounds (footer). */
  variant?: "dark" | "light";
  compact?: boolean;
  href?: string;
}

/**
 * Aliveli Vasthralaya logo.
 * - Light backgrounds: gold crest + dark serif wordmark (the gold wordmark lacks contrast on ivory).
 * - Dark backgrounds: gold crest + the original gold wordmark artwork.
 */
export function BrandLogo({ variant = "dark", compact = false, href = "/" }: BrandLogoProps) {
  const light = variant === "light";

  const content = (
    <span className="inline-flex items-center gap-3 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BRAND_CONFIG.crestPath}
        alt=""
        aria-hidden="true"
        width={320}
        height={340}
        className={`w-auto shrink-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-[-6deg] ${
          compact ? "h-[46px] sm:h-[52px]" : light ? "h-[88px]" : "h-16"
        }`}
      />
      {light ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={BRAND_CONFIG.wordmarkPath}
          alt={BRAND_CONFIG.shortName}
          width={640}
          height={327}
          className={compact ? "h-11 w-auto" : "h-[78px] w-auto"}
        />
      ) : (
        <span className="flex flex-col leading-none">
          <span className={`font-serif tracking-[0.06em] uppercase text-ink ${compact ? "text-[19px] sm:text-[21px]" : "text-[28px]"}`}>
            Aliveli
          </span>
          <span className="mt-1 text-[8px] sm:text-[8.5px] tracking-[0.36em] uppercase font-semibold text-maroon">
            Vasthralaya
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center" aria-label={`${BRAND_CONFIG.shortName} home`}>
      {content}
    </Link>
  );
}
