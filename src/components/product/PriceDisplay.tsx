"use client";

import type { Locale, Product } from "@/types";
import { formatPrice, summerSavings } from "@/lib/products";
import { useLanguageStore } from "@/store/useLanguageStore";

export function PriceDisplay({
  product,
  quantity = 1,
  size = "md",
  className = "",
}: {
  product: Product;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const locale = useLanguageStore((s) => s.locale);
  const sale = product.price * quantity;
  const list =
    product.isSummerOffer && product.originalPrice
      ? product.originalPrice * quantity
      : null;

  const saleCls =
    size === "lg"
      ? "text-xl font-semibold"
      : size === "sm"
        ? "text-sm font-semibold"
        : "text-base font-semibold";
  const listCls =
    size === "lg" ? "text-sm" : size === "sm" ? "text-xs" : "text-sm";

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-2 ${className}`}>
      {list != null && (
        <span className={`line-through text-gray-400 ${listCls}`}>
          {formatPrice(list, locale)}
        </span>
      )}
      <span className={`text-gold ${saleCls}`}>
        {formatPrice(sale, locale)}
      </span>
    </span>
  );
}

export function SummerOfferBanner({
  locale: localeProp,
  compact = false,
}: {
  locale?: Locale;
  compact?: boolean;
}) {
  const storeLocale = useLanguageStore((s) => s.locale);
  const locale = localeProp ?? storeLocale;
  const label =
    locale === "ar"
      ? "عرض الصيف • ساري حتى 20 سبتمبر 2026"
      : "Summer Offer • Valid until September 20, 2026";

  return (
    <div
      className={`border border-gold/45 bg-gradient-to-r from-champagne/35 via-gold/15 to-champagne/35 text-ink/80 tracking-[0.08em] ${
        compact
          ? "px-2.5 py-1 text-[9px] uppercase"
          : "px-4 py-2 text-[10px] md:text-[11px] uppercase text-center"
      }`}
    >
      {label}
    </div>
  );
}

export function SummerSaveBadge({ product }: { product: Product }) {
  const locale = useLanguageStore((s) => s.locale);
  if (!product.isSummerOffer) return null;
  const save = summerSavings(product);
  const label =
    locale === "ar"
      ? save
        ? `وفّري ${formatPrice(save, "ar")}`
        : "عرض الصيف"
      : save
        ? `Save ${formatPrice(save, "en")}`
        : "Summer Special";

  return (
    <span className="absolute bottom-3 end-3 z-10 border border-gold/50 bg-white/90 backdrop-blur-md px-2 py-1 text-[9px] tracking-[0.12em] uppercase text-gold shadow-sm">
      {label}
    </span>
  );
}
