"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Lock,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  createCheckoutDraft,
  PaymentIntentDraft,
} from "@/lib/payments/gateway";
import { buildWhatsAppEnquiryUrl } from "@/lib/brand";
import { SectionHeading } from "@/components/SectionHeading";

export default function CheckoutPage() {
  const { items, knownSubtotal, hasEnquiryOnlyItems } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Andhra Pradesh");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [draft, setDraft] = useState<PaymentIntentDraft | null>(null);

  const handlePrepareCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const prepared = createCheckoutDraft(
      items.map((item) => ({
        productId: item.productId,
        slug: item.slug,
        name: item.name,
        selectedColor: item.selectedColor,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      {
        fullName,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        deliveryNotes,
      }
    );
    setDraft(prepared);
  };

  const whatsappDraftMessage = draft
    ? `Hello Aliveli Vasthralaya, I have prepared an order enquiry (${draft.draftReference}):\n` +
      draft.items
        .map(
          (i) =>
            `• ${i.name} (${i.selectedColor}) × ${i.quantity}${
              i.unitPrice !== null
                ? ` — ₹${(i.unitPrice * i.quantity).toLocaleString("en-IN")}`
                : " — Price on Enquiry"
            }`
        )
        .join("\n") +
      `\n\nCustomer: ${draft.customer.fullName}\nPhone: ${draft.customer.phone}\nDelivery Address: ${draft.customer.addressLine1}, ${draft.customer.city}, ${draft.customer.state} - ${draft.customer.postalCode}`
    : "";

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Boutique Checkout"
          title="Review & Prepare Your Order"
          description="Complete your delivery details below. Online payment gateway integration is architected and ready for live merchant activation."
        />

        {items.length === 0 ? (
          <div className="mt-12 max-w-lg mx-auto text-center bg-ivory/60 border border-gold/30 p-10">
            <ShoppingBag className="w-10 h-10 text-maroon mx-auto mb-4 stroke-[1.3]" />
            <p className="font-serif text-2xl text-maroon">
              No Sarees in Your Bag
            </p>
            <p className="text-sm text-ink-muted mt-2">
              Please add a saree to your bag before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block px-7 py-3 bg-maroon text-ivory text-xs uppercase tracking-[0.2em]"
            >
              Browse Sarees
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Shipping Form */}
            <form
              onSubmit={handlePrepareCheckout}
              className="lg:col-span-7 bg-ivory/40 border border-gold/30 p-6 sm:p-8 space-y-5"
            >
              <h2 className="font-serif text-2xl text-maroon border-b border-gold/25 pb-3">
                1. Delivery & Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Recipient full name"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile number"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="House / Flat No., Street, Locality"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                  Landmark / Apartment (Optional)
                </label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Near landmark"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 522006"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-ink mb-1.5">
                  Delivery / Draping Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Any preferred delivery window or boutique pickup request"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
                />
              </div>

              {/* Payment Gateway Readiness Block */}
              <div className="pt-4 border-t border-gold/25 space-y-3">
                <h3 className="font-serif text-xl text-maroon flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gold-muted" />
                  <span>2. Payment Gateway Integration</span>
                </h3>
                <div className="bg-white border border-gold/40 p-4 text-xs text-ink-muted leading-relaxed flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-ink">
                      Payment Gateway Pending Live Activation
                    </p>
                    <p className="mt-1">
                      This checkout architecture (`src/lib/payments/gateway.ts`) is structured for Razorpay, Cashfree, or Stripe. Preparing your order below creates an order enquiry draft without simulating or charging a payment.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-maroon text-ivory text-xs uppercase tracking-[0.2em] hover:bg-maroon-dark transition-colors"
              >
                Prepare Order Draft & Continue
              </button>

              {draft && (
                <div className="bg-white border-2 border-gold p-5 space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold-muted font-semibold">
                    Order Enquiry Draft Prepared • {draft.draftReference}
                  </p>
                  <p className="text-sm text-ink leading-relaxed">
                    {draft.message}
                  </p>
                  <a
                    href={buildWhatsAppEnquiryUrl(whatsappDraftMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-ivory text-xs uppercase tracking-[0.2em] hover:bg-maroon-dark transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order Draft via WhatsApp</span>
                  </a>
                </div>
              )}
            </form>

            {/* Right: Order Summary */}
            <aside className="lg:col-span-5 bg-ivory border border-gold/35 p-6 sm:p-8 space-y-5">
              <h2 className="font-serif text-2xl text-maroon border-b border-gold/25 pb-3">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.selectedColor}`}
                    className="flex gap-3.5 pb-4 border-b border-gold/15"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover border border-gold/25 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-base text-ink leading-snug">
                        {item.name}
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {item.selectedColor} • Qty: {item.quantity}
                      </p>
                      <p className="text-xs text-maroon font-medium mt-1">
                        {item.price !== null
                          ? `₹${(item.price * item.quantity).toLocaleString("en-IN")}`
                          : "Price on Enquiry"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm pt-2">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Known Subtotal</span>
                  <span className="font-medium text-ink">
                    ₹{knownSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Shipping</span>
                  <span className="text-xs text-ink-muted">
                    Confirmed upon availability check
                  </span>
                </div>
                {hasEnquiryOnlyItems && (
                  <p className="text-[11px] text-maroon">
                    Enquiry-priced items will be quoted directly by our boutique.
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gold/25 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-ink">
                  Estimated Total
                </span>
                <span className="font-serif text-2xl text-maroon font-semibold">
                  ₹{knownSubtotal.toLocaleString("en-IN")}
                </span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
