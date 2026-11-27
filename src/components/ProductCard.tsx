"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Heart, MessageCircle, Plus } from "lucide-react";
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

  const whatsappUrl = buildWhatsAppEnquiryUrl(
    `Hello Aliveli Vasthralaya, I would like to enquire about "${product.name}" (SKU: ${product.sku}, Color: ${activeColor?.name ?? "Default"}).`
  );

  const handleAdd = () => {
    addItem(product, { colorName: activeColor?.name, colorHex: activeColor?.hex, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="card group flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        <Link href={`/products/${product.slug}`} className="block w-full h-full" aria-label={product.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={`${product.name.replace(/\s*\(Sample\)\s*$/, "")} — ${product.collectionName}`}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
          />
        </Link>

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <span className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-paper/95 text-ink text-[11.5px] font-semibold px-3 py-1">{product.fabric}</span>
            {product.isSample && (
              <span className="rounded-full bg-maroon text-paper text-[11.5px] font-semibold px-3 py-1">Sample</span>
            )}
          </span>
          <button
            type="button"
            onClick={() => toggleSaved(product.id)}
            aria-label={saved ? "Remove from saved sarees" : "Save saree"}
            aria-pressed={saved}
            className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              saved ? "bg-maroon text-paper" : "bg-paper/95 text-ink hover:text-maroon"
            }`}
          >
            <Heart className={`w-4 h-4 stroke-[1.6] ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />

      {/* Info */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-ink-muted">
          {typeof index === "number" && <span className="text-gold mr-2">{String(index + 1).padStart(2, "0")}</span>}
          {product.collectionName}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-[21px] leading-[1.25] tracking-[-0.02em] text-ink hover:text-maroon transition-colors">
            {product.name.replace(/\s*\(Sample\)\s*$/, "")}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-4">
          {product.price !== null ? (
            <span className="text-[16px] font-semibold text-ink">
              ₹{product.price.toLocaleString("en-IN")}
              {product.priceLabel && (
                <span className="ml-2 text-[12px] font-normal text-ink-muted">{product.priceLabel}</span>
              )}
            </span>
          ) : (
            <span className="font-serif italic text-[17px] text-maroon">Price on enquiry</span>
          )}

          <div className="flex items-center gap-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                aria-label={`Select colour ${color.name}`}
                aria-pressed={idx === selectedColorIndex}
                className={`w-4 h-4 rounded-full border border-ink/20 transition-transform ${
                  idx === selectedColorIndex ? "ring-[1.5px] ring-gold ring-offset-2 ring-offset-paper" : "hover:scale-110"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto pt-3 grid grid-cols-1 gap-2">
          <button type="button" onClick={handleAdd} className="btn-solid !min-h-[44px] w-full" aria-live="polite">
            {added ? <Check className="w-4 h-4" aria-hidden="true" /> : <Plus className="w-4 h-4" aria-hidden="true" />}
            {added ? "Added to bag" : "Add to bag"}
          </button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !min-h-[44px] w-full">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
