"use client";

import React from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    knownSubtotal,
    hasEnquiryOnlyItems,
  } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/45 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <aside
        aria-label="Shopping Bag"
        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl border-l border-gold/30 flex flex-col"
      >
        <div className="px-6 py-5 border-b border-gold/20 bg-ivory flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-maroon stroke-[1.5]" />
            <h2 className="font-serif text-2xl text-maroon tracking-wide">
              Your Shopping Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-1.5 text-ink-muted hover:text-maroon transition-colors"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-ivory border border-gold/35 flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-maroon/70 stroke-[1.4]" />
              </div>
              <p className="font-serif text-xl text-ink">Your bag is currently empty</p>
              <p className="text-sm text-ink-muted mt-2 max-w-xs">
                Explore our Mul Cotton, Georgette, Semi Pattu, Designer, and Work Sarees.
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="mt-6 px-6 py-2.5 bg-maroon text-ivory text-xs tracking-[0.2em] uppercase hover:bg-maroon-dark transition-colors"
              >
                Explore Sarees
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.selectedColor}`}
                className="flex gap-4 pb-5 border-b border-gold/15"
              >
                <Link
                  href={`/products/${item.slug}`}
                  onClick={closeDrawer}
                  className="w-20 h-26 shrink-0 bg-ivory overflow-hidden border border-gold/20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeDrawer}
                        className="font-serif text-base text-ink hover:text-maroon leading-snug line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.selectedColor)}
                        className="text-ink-muted hover:text-maroon p-1 shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] uppercase tracking-[0.14em] text-gold-muted mt-1">
                      {item.collectionName}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-ink-muted">
                      <span
                        className="w-3 h-3 rounded-full border border-ink/20 inline-block"
                        style={{ backgroundColor: item.selectedColorHex }}
                      />
                      <span>{item.selectedColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-gold/35 bg-ivory/60">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="p-1.5 text-ink hover:text-maroon"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium text-ink">
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
                        className="p-1.5 text-ink hover:text-maroon"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      {item.price !== null ? (
                        <p className="text-sm font-medium text-maroon">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      ) : (
                        <p className="text-xs italic text-ink-muted">
                          Price on Enquiry
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gold/25 bg-ivory space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-muted uppercase tracking-[0.14em] text-xs">
                  Estimated Subtotal
                </span>
                <span className="font-serif text-xl text-maroon font-semibold">
                  ₹{knownSubtotal.toLocaleString("en-IN")}
                </span>
              </div>
              {hasEnquiryOnlyItems && (
                <p className="text-[11px] text-ink-muted">
                  Includes item(s) marked “Price on Enquiry” — confirmed directly by our boutique team.
                </p>
              )}
              <p className="text-[11px] text-ink-muted">
                Shipping & final payment details are confirmed at checkout.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="py-3 text-center border border-maroon text-maroon text-xs uppercase tracking-[0.18em] hover:bg-maroon/5 transition-colors"
              >
                View Bag
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="py-3 text-center bg-maroon text-ivory text-xs uppercase tracking-[0.18em] hover:bg-maroon-dark transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
