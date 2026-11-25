"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Plus } from "lucide-react";
import { Product } from "@/lib/db/schema";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { buildWhatsAppEnquiryUrl } from "@/lib/brand";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const { isSaved, toggleSaved } = useWishlist();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const activeColor = product.colors[selectedColorIndex] ?? product.colors[0];
  const saved = isSaved(product.id);
  const hoverImage = product.images[1];

  const whatsappUrl = buildWhatsAppEnquiryUrl(
    `Hello Aliveli Vasthralaya, I would like to enquire about "${product.name}" (SKU: ${product.sku}, Color: ${activeColor?.name ?? "Default"}).`
  );

  const handleAdd = () => {
    addItem(product, { colorName: activeColor?.name, colorHex: activeColor?.hex, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
        <Link href={`/products/${product.slug}`} className="block w-full h-full" aria-label={product.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.045]"
          />
          {hoverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hoverImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
          <span className="micro bg-paper/90 text-ink px-2.5 py-1">{product.fabric}</span>
          <button
            type="button"
            onClick={() => toggleSaved(product.id)}
            aria-label={saved ? "Remove from saved sarees" : "Save saree"}
            className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              saved ? "bg-maroon text-paper" : "bg-paper/90 text-ink hover:text-maroon"
            }`}
          >
            <Heart className={`w-4 h-4 stroke-[1.4] ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Quick add slides up on hover (always visible on touch) */}
        <button
          type="button"
          onClick={handleAdd}
          className="absolute inset-x-4 bottom-4 min-h-[46px] bg-paper/95 text-ink text-[11px] font-semibold tracking-[0.14em] uppercase inline-flex items-center justify-between px-5 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:translate-y-[calc(100%+20px)] lg:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 hover:bg-maroon hover:text-paper"
        >
          {added ? "Added to bag" : "Add to bag"}
          <Plus className="w-4 h-4 stroke-[1.4]" />
        </button>
      </div>

      {/* Info */}
      <div className="pt-5 flex flex-col gap-2">
        <div className="flex items-baseline gap-3 micro text-ink-muted">
          {typeof index === "number" && <span>{String(index + 1).padStart(2, "0")}</span>}
          <span>{product.collectionName}</span>
          {product.isSample && <span className="ml-auto text-maroon/80">Sample</span>}
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-[23px] leading-[1.2] tracking-[-0.025em] text-ink group-hover:text-maroon transition-colors">
            {product.name.replace(/\s*\(Sample\)\s*$/, "")}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-4 mt-1">
          {product.price !== null ? (
            <span className="text-[14px] text-ink">
              ₹{product.price.toLocaleString("en-IN")}
              {product.priceLabel && (
                <span className="ml-2 text-[11px] text-ink-muted">{product.priceLabel}</span>
              )}
            </span>
          ) : (
            <span className="font-serif italic text-[16px] text-maroon">Price on enquiry</span>
          )}

          <div className="flex items-center gap-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                aria-label={`Select color ${color.name}`}
                aria-pressed={idx === selectedColorIndex}
                className={`w-3.5 h-3.5 rounded-full border border-ink/15 transition-transform ${
                  idx === selectedColorIndex ? "ring-1 ring-ink ring-offset-2 ring-offset-paper" : "hover:scale-110"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link !min-h-[40px] !text-[13px] self-start mt-1"
        >
          Enquire on WhatsApp
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
