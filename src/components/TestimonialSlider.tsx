"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PLACEHOLDER_TESTIMONIALS } from "@/data/catalog";

const DURATION = 7000;

/**
 * Client stories carousel: large crossfading serif quote, autoplay with a
 * drawn progress hairline, counter, and an aside listing the other stories.
 */
export function TestimonialSlider() {
  const items = PLACEHOLDER_TESTIMONIALS;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(1), DURATION);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  const others = items
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => i !== index);

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] gap-x-[9%] gap-y-14 ${
        paused ? "story-paused" : ""
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Main quote */}
      <div className="flex flex-col" aria-roledescription="carousel" aria-label="Client stories">
        <div className="grid" aria-live="polite">
          {items.map((t, i) => (
            <figure
              key={t.id}
              className={`story-quote ${i === index ? "is-active" : ""}`}
              aria-hidden={i !== index}
            >
              <blockquote className="font-serif text-[clamp(28px,2.85vw,44px)] leading-[1.18] tracking-[-0.035em] text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-9 flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-maroon text-paper font-serif text-lg flex items-center justify-center">
                  {t.authorLabel.charAt(0)}
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-ink">{t.authorLabel}</span>
                  <span className="block micro text-ink-muted mt-0.5">{t.occasionLabel}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-14 flex items-center gap-6">
          <span className="micro text-ink tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="text-ink-muted"> / {String(items.length).padStart(2, "0")}</span>
          </span>
          <span className="relative flex-1 max-w-[220px] h-px bg-line overflow-hidden">
            <span
              key={index}
              className="story-progress absolute inset-0 bg-maroon"
              style={{ ["--story-duration" as string]: `${DURATION}ms` }}
            />
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 stroke-[1.4]" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-300"
            >
              <ArrowRight className="w-4 h-4 stroke-[1.4]" />
            </button>
          </div>
        </div>
      </div>

      {/* Aside previews */}
      <div key={index} style={{ animation: "caption-in .65s var(--ease) both" }}>
        {others.map(({ item, i }) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            className="block w-full text-left py-6 border-b border-line last:border-b-0 first:pt-0 group"
          >
            <span className="font-serif italic text-[clamp(19px,1.6vw,25px)] leading-[1.3] tracking-[-0.02em] text-ink/80 group-hover:text-ink transition-colors line-clamp-3">
              “{item.quote}”
            </span>
            <span className="mt-4 block micro text-ink-muted">{item.authorLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
