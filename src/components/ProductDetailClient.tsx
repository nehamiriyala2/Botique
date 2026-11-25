"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Product } from "@/lib/db/schema";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { buildWhatsAppEnquiryUrl } from "@/lib/brand";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isSaved, toggleSaved } = useWishlist();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const activeColor = product.colors[selectedColorIdx] ?? product.colors[0];
  const saved = isSaved(product.id);

  const whatsappUrl = buildWhatsAppEnquiryUrl(
    `Hello Aliveli Vasthralaya, I am interested in "${product.name}" (SKU: ${product.sku}, Color: ${activeColor?.name ?? "Default"}, Qty: ${quantity}). Could you please share availability and further details?`
  );

  const handleAddToCart = () => {
    addItem(product, {
      colorName: activeColor?.name,
      colorHex: activeColor?.hex,
      quantity,
      openCart: true,
    });
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, {
      colorName: activeColor?.name,
      colorHex: activeColor?.hex,
      quantity,
      openCart: false,
    });
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Left: Multi-Image Gallery */}
      <div className="lg:col-span-6 space-y-4">
        <div className="relative aspect-[3/4] overflow-hidden border border-gold/30 bg-ivory">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[activeImageIdx] ?? product.images[0]}
            alt={`${product.name} — view ${activeImageIdx + 1}`}
            className="w-full h-full object-cover"
          />
          {product.isSample && (
            <span className="absolute top-4 left-4 bg-maroon/90 text-ivory text-[10px] uppercase tracking-[0.2em] px-3 py-1">
              Sample Catalog Item
            </span>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`aspect-[3/4] overflow-hidden border transition-all ${
                  idx === activeImageIdx
                    ? "border-maroon ring-2 ring-gold/60"
                    : "border-gold/25 opacity-75 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Details & Purchase Actions */}
      <div className="lg:col-span-6 space-y-6">
        <div className="border-b border-gold/25 pb-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={`/shop?collection=${product.collectionSlug}`}
              className="text-xs uppercase tracking-[0.24em] text-gold-muted hover:text-maroon transition-colors"
            >
              {product.collectionName}
            </Link>
            <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              SKU: {product.sku}
            </span>
          </div>

          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-maroon font-normal leading-tight">
            {product.name}
          </h1>

          <div className="mt-4">
            {product.price !== null ? (
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-ink font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.priceLabel && (
                  <span className="text-xs uppercase tracking-[0.16em] text-ink-muted bg-ivory px-2.5 py-0.5 border border-gold/30">
                    {product.priceLabel}
                  </span>
                )}
              </div>
            ) : (
              <div className="inline-block bg-ivory border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-maroon">
                Price Available on Personal Enquiry
              </div>
            )}
          </div>
        </div>

        {/* Fabric & Blouse Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-ivory/70 border border-gold/25 p-4 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold-muted">
              Fabric
            </p>
            <p className="font-medium text-ink mt-1">{product.fabric}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold-muted">
              Blouse Note
            </p>
            <p className="text-ink-muted mt-1 text-xs leading-relaxed">
              {product.blouseIncludedNote}
            </p>
          </div>
        </div>

        {/* Color Availability */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink mb-2.5">
            Color Availability:{" "}
            <span className="text-maroon font-medium">
              {activeColor?.name ?? "As Shown"}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColorIdx(idx)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs transition-colors ${
                  idx === selectedColorIdx
                    ? "border-maroon bg-ivory text-maroon font-medium"
                    : "border-gold/30 bg-white text-ink-muted hover:border-maroon/50"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-ink/20"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Buttons */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.18em] text-ink">
              Quantity
            </span>
            <div className="inline-flex items-center border border-gold/40 bg-ivory/40">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2.5 text-ink hover:text-maroon"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-sm font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2.5 text-ink hover:text-maroon"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleSaved(product.id)}
              className={`ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 border text-xs uppercase tracking-[0.15em] transition-colors ${
                saved
                  ? "border-maroon bg-maroon/5 text-maroon"
                  : "border-gold/35 text-ink-muted hover:text-maroon"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="py-3.5 px-6 bg-maroon text-ivory text-xs uppercase tracking-[0.2em] hover:bg-maroon-dark transition-colors inline-flex items-center justify-center gap-2"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="py-3.5 px-6 bg-gold text-ink font-semibold text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition-colors"
            >
              Buy Now
            </button>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 border border-maroon text-maroon text-xs uppercase tracking-[0.2em] hover:bg-ivory transition-colors inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>

        {/* Description, Care & Shipping */}
        <div className="pt-4 space-y-6 border-t border-gold/25">
          <div>
            <h2 className="font-serif text-xl text-maroon">
              About This Saree
            </h2>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-ivory/50 border border-gold/25 p-4">
              <h3 className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-maroon font-medium">
                <ShieldCheck className="w-4 h-4 text-gold-muted" />
                <span>Care Instructions</span>
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-ink-muted leading-relaxed list-disc pl-4">
                {product.careInstructions.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="bg-ivory/50 border border-gold/25 p-4">
              <h3 className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-maroon font-medium">
                <Truck className="w-4 h-4 text-gold-muted" />
                <span>Shipping Information</span>
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-ink-muted leading-relaxed list-disc pl-4">
                {product.shippingInfo.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
