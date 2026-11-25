"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppEnquiryUrl } from "@/lib/brand";
import { SectionHeading } from "@/components/SectionHeading";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    knownSubtotal,
    hasEnquiryOnlyItems,
  } = useCart();

  const whatsappBagSummary = items
    .map(
      (i) =>
        `• ${i.name} (${i.selectedColor}) × ${i.quantity}${
          i.price !== null
            ? ` — ₹${(i.price * i.quantity).toLocaleString("en-IN")}`
            : " — Price on Enquiry"
        }`
    )
    .join("\n");

  const whatsappBagUrl = buildWhatsAppEnquiryUrl(
    `Hello Aliveli Vasthralaya, I would like to enquire about my shopping bag:\n${whatsappBagSummary}`
  );

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Aliveli Vasthralaya"
          title="Your Shopping Bag"
          description="Review your selected sarees, adjust quantities, or proceed to checkout or WhatsApp enquiry."
        />

        {items.length === 0 ? (
          <div className="mt-14 max-w-lg mx-auto text-center bg-ivory/60 border border-gold/30 p-10">
            <ShoppingBag className="w-10 h-10 text-maroon mx-auto mb-4 stroke-[1.3]" />
            <h2 className="font-serif text-2xl text-maroon">
              Your Shopping Bag is Empty
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Explore our signature saree collections and add your preferred drapes to your bag.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-7 py-3 bg-maroon text-ivory text-xs uppercase tracking-[0.2em] hover:bg-maroon-dark transition-colors"
            >
              <span>Browse Sarees</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedColor}`}
                  className="flex flex-col sm:flex-row gap-5 p-5 border border-gold/25 bg-ivory/30"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="w-28 h-36 shrink-0 bg-ivory border border-gold/25 overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                          {item.collectionName} • {item.fabric}
                        </p>
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-serif text-xl text-ink hover:text-maroon transition-colors"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-2 flex items-center gap-2 text-xs text-ink-muted">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-ink/20"
                            style={{ backgroundColor: item.selectedColorHex }}
                          />
                          <span>Color: {item.selectedColor}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.selectedColor)
                        }
                        className="p-1.5 text-ink-muted hover:text-maroon"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gold/15">
                      <div className="inline-flex items-center border border-gold/35 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="p-2 text-ink hover:text-maroon"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="p-2 text-ink hover:text-maroon"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        {item.price !== null ? (
                          <div>
                            <p className="font-serif text-xl text-maroon font-medium">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </p>
                            <p className="text-[11px] text-ink-muted">
                              ₹{item.price.toLocaleString("en-IN")} each (Sample)
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs uppercase tracking-[0.16em] text-ink-muted italic">
                            Price on Enquiry
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-[0.18em] text-maroon hover:underline"
                >
                  ← Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs uppercase tracking-[0.18em] text-ink-muted hover:text-maroon"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-4 bg-ivory border border-gold/35 p-6 sm:p-8 space-y-5">
              <h2 className="font-serif text-2xl text-maroon border-b border-gold/25 pb-3">
                Bag Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Known Items Subtotal</span>
                  <span className="font-medium text-ink">
                    ₹{knownSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Shipping</span>
                  <span className="text-xs text-ink-muted">
                    Calculated / confirmed at checkout
                  </span>
                </div>
                {hasEnquiryOnlyItems && (
                  <p className="text-xs text-maroon bg-white border border-gold/30 p-3 leading-relaxed">
                    Your bag includes piece(s) marked “Price on Enquiry.” Total reflects priced sample items only.
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gold/25 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-ink">
                  Estimated Total
                </span>
                <span className="font-serif text-2xl text-maroon font-semibold">
                  ₹{knownSubtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-maroon text-ivory text-xs uppercase tracking-[0.2em] hover:bg-maroon-dark transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={whatsappBagUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-maroon text-maroon text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire Bag on WhatsApp</span>
                </a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
