"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Search, ShoppingBag, User, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SAMPLE_PRODUCTS } from "@/data/catalog";
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from "@/lib/brand";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Stories", href: "/#stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, openDrawer } = useCart();
  const { savedIds } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Shadow once scrolled; slide away on scroll-down, return on scroll-up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y > 320 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y < 320) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const quickResults = searchQuery.trim()
    ? SAMPLE_PRODUCTS.filter((p) => {
        const q = searchQuery.trim().toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.collectionName.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
        );
      }).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname.startsWith(href);

  const enquireUrl = buildWhatsAppEnquiryUrl(
    "Hello Aliveli Vasthralaya, I would like to enquire about your sarees."
  );

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-ivory border-b border-[#dcd2c6] transition-[transform,box-shadow] duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          hidden && !searchOpen ? "-translate-y-[101%]" : "translate-y-0"
        } ${scrolled && !hidden ? "shadow-[0_14px_34px_-26px_rgba(45,18,23,0.45)]" : ""}`}
      >
        <div
          className="shell grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6"
          style={{ height: "var(--header-height)" }}
        >
          <BrandLogo variant="dark" compact />

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${
                  isActive(link.href) ? "text-maroon" : "text-ink hover:text-maroon"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 right-0 bottom-0.5 h-px bg-current origin-left transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((p) => !p)}
              className="p-2.5 text-ink hover:text-maroon transition-colors"
              aria-label="Search sarees"
              aria-expanded={searchOpen}
            >
              <Search className="w-[18px] h-[18px] stroke-[1.4]" />
            </button>
            <Link
              href="/account"
              className="relative p-2.5 text-ink hover:text-maroon transition-colors hidden sm:inline-flex"
              aria-label="Account and saved sarees"
            >
              <User className="w-[18px] h-[18px] stroke-[1.4]" />
              {savedIds.length > 0 && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-maroon" />
              )}
            </Link>
            <button
              type="button"
              onClick={openDrawer}
              className="relative p-2.5 text-ink hover:text-maroon transition-colors"
              aria-label={`Open shopping bag, ${totalItems} items`}
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.4]" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0 min-w-[17px] h-[17px] px-1 rounded-full bg-maroon text-paper text-[9px] font-semibold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <a
              href={enquireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-4 ml-3 pl-6 border-l border-line min-h-[30px] text-[11px] font-semibold tracking-[0.12em] uppercase text-ink hover:text-maroon transition-colors group"
            >
              Enquire
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden inline-flex items-center gap-3 min-h-[44px] pl-3 text-[11px] tracking-[0.12em] uppercase font-semibold"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              Menu
              <span className="flex flex-col gap-[5px]" aria-hidden="true">
                <span className="block w-5 h-px bg-ink" />
                <span className="block w-3.5 h-px bg-ink ml-auto" />
              </span>
            </button>
          </div>
        </div>

        {/* Search panel */}
        {searchOpen && (
          <div className="border-t border-line/60 bg-paper" style={{ animation: "menu-enter .35s var(--ease) both" }}>
            <div className="shell py-6">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-4 max-w-3xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mul cotton, georgette, semi pattu…"
                  autoFocus
                  className="w-full bg-transparent font-serif text-2xl sm:text-3xl tracking-[-0.03em] text-ink placeholder:text-ink-muted/50 focus:outline-none py-2 border-b border-line focus:border-maroon transition-colors"
                />
                <button type="submit" className="btn-solid shrink-0 !min-h-[44px] !px-5">
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-ink-muted hover:text-maroon"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 stroke-[1.4]" />
                </button>
              </form>

              {quickResults.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl">
                  {quickResults.map((item, i) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="group flex items-center gap-4"
                      style={{ animation: `caption-in .6s var(--ease) ${i * 60}ms both` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.images[0]} alt="" className="w-14 h-[72px] object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="micro text-ink-muted">{item.collectionName}</p>
                        <p className="font-serif text-lg leading-tight text-ink group-hover:text-maroon transition-colors line-clamp-2">
                          {item.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Full-screen menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 bg-ivory text-ink flex flex-col"
          style={{ animation: "menu-enter .3s var(--ease) both" }}
        >
          <div
            className="flex items-center justify-between border-b border-line"
            style={{ minHeight: "var(--header-height)", paddingInline: "var(--gutter)" }}
          >
            <BrandLogo variant="dark" compact />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-3 min-h-[44px] text-[11px] tracking-[0.12em] uppercase font-semibold"
            >
              Close <X className="w-4 h-4 stroke-[1.4]" />
            </button>
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto" style={{ padding: "36px var(--gutter) 24px" }}>
            <p className="section-label">
              <span />A little more Aliveli
            </p>
            <nav className="my-6">
              {[{ label: "Home", href: "/" }, ...NAV_LINKS, { label: "Saved & Account", href: "/account" }].map(
                (link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-5 border-b border-line py-3.5 font-serif text-[clamp(34px,8vw,54px)] tracking-[-0.04em] leading-tight hover:text-maroon transition-colors"
                    style={{ animation: `menu-link .7s var(--ease) ${0.12 + i * 0.07}s both` }}
                  >
                    <span className="font-sans text-[10px] tracking-[0.1em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                    <ArrowUpRight className="ml-auto w-5 h-5 stroke-[1.2]" />
                  </Link>
                )
              )}
            </nav>
            <div className="mt-auto flex items-center justify-between gap-4 text-[13px] text-ink-muted">
              <span>{BRAND_CONFIG.address.city.replace(",", "")}, Andhra Pradesh</span>
              <span>{BRAND_CONFIG.instagramHandle}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
