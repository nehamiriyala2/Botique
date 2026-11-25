"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll reveal. Any element with `data-reveal` (optionally
 * `="curtain" | "label" | "fade" | "rule"`) animates in the first time it
 * enters the viewport. A stagger delay can be passed with style={{"--d": "120ms"}}.
 * The `has-motion` class is applied before first paint by an inline script
 * in the root layout, so content is never hidden when JS or motion is off.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("has-motion")) return;

    // Curtain elements are clipped to zero area before revealing, which the
    // IntersectionObserver reports as never intersecting — so we watch their
    // parent instead and reveal every element mapped to that sentinel.
    const targets = new Map<Element, Element[]>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (targets.get(entry.target) ?? []).forEach((el) =>
              el.setAttribute("data-revealed", "")
            );
            targets.delete(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    const scan = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-revealed]):not([data-observed])")
        .forEach((el) => {
          el.setAttribute("data-observed", "");
          const sentinel =
            el.getAttribute("data-reveal") === "curtain" && el.parentElement
              ? el.parentElement
              : el;
          const list = targets.get(sentinel);
          if (list) list.push(el);
          else {
            targets.set(sentinel, [el]);
            io.observe(sentinel);
          }
        });
    };

    scan();

    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: never leave content hidden.
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) el.setAttribute("data-revealed", "");
        });
    }, 2500);

    return () => {
      io.disconnect();
      targets.clear();
      mo.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      document
        .querySelectorAll("[data-observed]")
        .forEach((el) => el.removeAttribute("data-observed"));
    };
  }, [pathname]);

  return null;
}
