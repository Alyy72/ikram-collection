import { formatPrice, getProductById, getProductName, LUXURY_TAX_RATE, WHATSAPP_NUMBER } from "@/lib/products";
import type { CartItem, Locale } from "@/types";

export function generateOrderRef() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `IK-${stamp}-${rand}`;
}

export function calcTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);
  const tax = Math.round(subtotal * LUXURY_TAX_RATE);
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

export function buildWhatsAppUrl(params: {
  items: CartItem[];
  locale: Locale;
  orderRef: string;
  customerName: string;
  customerPhone: string;
  note?: string;
}) {
  const { items, locale, orderRef, customerName, customerPhone, note } = params;
  const { subtotal, tax, total } = calcTotals(items);
  const lines: string[] = [];

  if (locale === "ar") {
    lines.push("✦ طلب جديد — دار إكرام للمجوهرات والعطور");
    lines.push(`المرجع: ${orderRef}`);
    lines.push(`الاسم: ${customerName}`);
    lines.push(`الهاتف: ${customerPhone}`);
    if (note) lines.push(`ملاحظة: ${note}`);
    lines.push("");
    lines.push("القطع:");
    items.forEach((item, i) => {
      const product = getProductById(item.productId);
      if (!product) return;
      lines.push(
        `${i + 1}. ${getProductName(product, "ar")} (${product.sku}) × ${item.quantity} — ${formatPrice(product.price * item.quantity, "ar")}`,
      );
    });
    lines.push("");
    lines.push(`المجموع الفرعي: ${formatPrice(subtotal, "ar")}`);
    lines.push(`الضريبة: ${formatPrice(tax, "ar")}`);
    lines.push(`الإجمالي: ${formatPrice(total, "ar")}`);
  } else {
    lines.push("✦ New Concierge Order — IKRAM Haute Joaillerie & Parfums");
    lines.push(`Reference: ${orderRef}`);
    lines.push(`Guest: ${customerName}`);
    lines.push(`Phone: ${customerPhone}`);
    if (note) lines.push(`Note: ${note}`);
    lines.push("");
    lines.push("Pieces:");
    items.forEach((item, i) => {
      const product = getProductById(item.productId);
      if (!product) return;
      lines.push(
        `${i + 1}. ${getProductName(product, "en")} (${product.sku}) × ${item.quantity} — ${formatPrice(product.price * item.quantity, "en")}`,
      );
    });
    lines.push("");
    lines.push(`Subtotal: ${formatPrice(subtotal, "en")}`);
    lines.push(`Luxury Tax: ${formatPrice(tax, "en")}`);
    lines.push(`Total: ${formatPrice(total, "en")}`);
  }

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
