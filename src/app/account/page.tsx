"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/data/catalog";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";

export default function AccountPage() {
  const { savedIds } = useWishlist();
  const { totalItems, openDrawer } = useCart();

  const savedProducts = SAMPLE_PRODUCTS.filter((p) => savedIds.includes(p.id));

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Corner"
          title="Saved Sarees & Bag"
          description="Keep track of your favorite drapes on this device while browsing Aliveli Vasthralaya."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <div className="p-6 bg-ivory/70 border border-gold/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-maroon" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                  Saved Sarees
                </p>
                <p className="font-serif text-2xl text-maroon">
                  {savedProducts.length}
                </p>
              </div>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.16em] text-maroon hover:underline"
            >
              Explore
            </Link>
          </div>

          <div className="p-6 bg-ivory/70 border border-gold/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-maroon" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                  In Shopping Bag
                </p>
                <p className="font-serif text-2xl text-maroon">{totalItems}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={openDrawer}
              className="text-xs uppercase tracking-[0.16em] text-maroon hover:underline"
            >
              Open Bag
            </button>
          </div>
        </div>

        <div className="mt-14">
          {savedProducts.length === 0 ? (
            <div className="max-w-lg mx-auto text-center py-12 bg-ivory/40 border border-gold/25 px-6">
              <p className="font-serif text-2xl text-maroon">
                No Saved Sarees Yet
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Tap the heart icon on any saree card to save it here for easy comparison.
              </p>
              <Link
                href="/shop"
                className="mt-5 inline-block px-6 py-2.5 bg-maroon text-ivory text-xs uppercase tracking-[0.18em]"
              >
                Browse Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {savedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
