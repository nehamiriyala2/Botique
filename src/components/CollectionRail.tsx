"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SareeCollection } from "@/lib/db/schema";

/** Horizontally scrolling, snap-aligned collection cards with a live counter. */
export function CollectionRail({ collections }: { collections: SareeCollection[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const cards = Array.from(rail.children) as HTMLElement[];
      const left = rail.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - rail.offsetLeft - left);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      // When scrolled to the very end, mark the last card active.
      if (left + rail.clientWidth >= rail.scrollWidth - 4) best = cards.length - 1;
      setActive(best);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const clamped = Math.max(0, Math.min(collections.length - 1, i));
    const card = rail.children[clamped] as HTMLElement;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={railRef}
        className="rail flex gap-5 md:gap-7 overflow-x-auto"
        style={{ paddingInline: "var(--gutter)", scrollPaddingInline: "var(--gutter)" }}
      >
        {collections.map((c, i) => (
          <Link
            key={c.id}
            href={`/shop?collection=${c.slug}`}
            className="group shrink-0 w-[78vw] sm:w-[46vw] lg:w-[31vw] xl:w-[27vw] max-w-[460px]"
          >
            <div
              data-reveal="curtain"
              style={{ ["--d" as string]: `${i * 110}ms` }}
              className="relative aspect-[4/5] overflow-hidden bg-ivory-deep zoom"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover object-[50%_18%]" />
              <span className="absolute top-4 left-4 micro bg-paper/90 px-2.5 py-1 text-ink">
                {c.accentLabel}
              </span>
            </div>
            <div className="pt-5 flex items-baseline gap-5">
              <span className="micro text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-[clamp(26px,2.2vw,34px)] leading-[1.1] tracking-[-0.03em] text-ink group-hover:text-maroon transition-colors">
                  {c.name.replace(" Sarees", "")}
                </h3>
                <p className="mt-1 font-serif italic text-[17px] text-ink-muted">{c.tagline}</p>
              </div>
              <ArrowRight className="w-4 h-4 stroke-[1.4] text-maroon transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="shell mt-10 flex items-center gap-6">
        <span className="micro tabular-nums">
          {String(active + 1).padStart(2, "0")}
          <span className="text-ink-muted"> / {String(collections.length).padStart(2, "0")}</span>
        </span>
        <span className="relative flex-1 h-px bg-line">
          <span
            className="absolute left-0 top-0 h-px bg-maroon transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ width: `${((active + 1) / collections.length) * 100}%` }}
          />
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous collection"
            className="w-11 h-11 rounded-full border border-line flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink disabled:opacity-30 disabled:pointer-events-none transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.4]" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(active + 1)}
            disabled={active === collections.length - 1}
            aria-label="Next collection"
            className="w-11 h-11 rounded-full border border-line flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink disabled:opacity-30 disabled:pointer-events-none transition-colors duration-300"
          >
            <ArrowRight className="w-4 h-4 stroke-[1.4]" />
          </button>
        </div>
      </div>
    </div>
  );
}
