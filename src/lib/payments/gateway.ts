/**
 * Payment Gateway & Order Architecture
 * -------------------------------------
 * Prepared for future integration with Razorpay, Cashfree, or Stripe.
 * IMPORTANT: No simulated payments or fabricated order confirmations are performed here.
 */

export type SupportedGatewayProvider = "razorpay" | "cashfree" | "stripe" | "unconfigured";

export interface CheckoutCustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryNotes?: string;
}

export interface CheckoutLineItem {
  productId: string;
  slug: string;
  name: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number | null;
}

export interface PaymentIntentDraft {
  draftReference: string;
  provider: SupportedGatewayProvider;
  status: "awaiting_gateway_configuration" | "ready_for_gateway";
  currency: "INR";
  knownSubtotal: number;
  hasEnquiryOnlyItems: boolean;
  items: CheckoutLineItem[];
  customer: CheckoutCustomerDetails;
  createdAtIso: string;
  message: string;
}

export function getConfiguredGatewayProvider(): SupportedGatewayProvider {
  const configured = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY;
  if (configured === "razorpay" || configured === "cashfree" || configured === "stripe") {
    return configured;
  }
  return "unconfigured";
}

export function createCheckoutDraft(
  items: CheckoutLineItem[],
  customer: CheckoutCustomerDetails
): PaymentIntentDraft {
  const provider = getConfiguredGatewayProvider();
  const knownSubtotal = items.reduce((sum, item) => {
    return sum + (item.unitPrice ?? 0) * item.quantity;
  }, 0);
  const hasEnquiryOnlyItems = items.some((item) => item.unitPrice === null);

  const suffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  const draftReference = `AV-DRAFT-${Date.now().toString().slice(-6)}-${suffix}`;

  return {
    draftReference,
    provider,
    status: provider === "unconfigured" ? "awaiting_gateway_configuration" : "ready_for_gateway",
    currency: "INR",
    knownSubtotal,
    hasEnquiryOnlyItems,
    items,
    customer,
    createdAtIso: new Date().toISOString(),
    message:
      provider === "unconfigured"
        ? "Online payment processing is not yet activated. Your order draft has been prepared for direct WhatsApp or boutique confirmation—no payment has been charged and no order has been finalized."
        : `Order draft prepared for ${provider} gateway handoff.`,
  };
}
