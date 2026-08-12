import type { CartItem, Locale } from "@/types";
import { getProductById, getProductName } from "@/lib/products";

export type OrderPayload = {
  type: "order" | "inquiry";
  orderRef: string;
  locale: Locale;
  customerName?: string;
  customerPhone?: string;
  note?: string;
  items?: CartItem[];
  productId?: string;
  productSku?: string;
  productName?: string;
  quantity?: number;
  total?: number;
  createdAt: string;
};

/**
 * Optional background ping for concierge systems.
 * Set NEXT_PUBLIC_ORDER_WEBHOOK_URL to a Formspree / Make / Zapier / Cloudflare Worker URL.
 * Never redirects the buyer — fire-and-forget only.
 */
export async function notifyConcierge(payload: OrderPayload) {
  const endpoint = process.env.NEXT_PUBLIC_ORDER_WEBHOOK_URL;
  if (!endpoint) {
    if (process.env.NODE_ENV === "development") {
      console.info("[IKRAM] Order received (no webhook configured):", payload);
    }
    return;
  }

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (err) {
    console.warn("[IKRAM] Concierge notify failed silently:", err);
  }
}

export function buildOrderSummary(items: CartItem[], locale: Locale) {
  return items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return {
        sku: product.sku,
        name: getProductName(product, locale),
        quantity: item.quantity,
        price: product.price,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter(Boolean);
}
