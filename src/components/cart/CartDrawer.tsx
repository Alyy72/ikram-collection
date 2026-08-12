"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  formatPrice,
  getProductById,
  getProductName,
} from "@/lib/products";
import { calcTotals } from "@/lib/whatsapp";
import { t } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PriceDisplay } from "@/components/product/PriceDisplay";

export function CartDrawer() {
  const locale = useLanguageStore((s) => s.locale);
  const { items, isOpen, closeCart, updateQuantity, removeItem } =
    useCartStore();
  const { subtotal, tax, total } = calcTotals(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink/30 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: locale === "ar" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: locale === "ar" ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className={`fixed top-0 z-[80] flex h-full w-full max-w-md flex-col border-gold/30 bg-white ${
              locale === "ar" ? "start-0 border-e" : "end-0 border-s"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
              <h2 className="font-display text-2xl tracking-wide text-ink">
                {t(locale, "cart.title")}
              </h2>
              <button type="button" onClick={closeCart} aria-label="Close">
                <X size={20} className="text-ink/50 hover:text-gold" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-ink/45">{t(locale, "cart.empty")}</p>
                  <div className="mt-8">
                    <MagneticButton
                      href="/shop"
                      onClick={closeCart}
                      variant="outline"
                    >
                      {t(locale, "cart.continue")}
                    </MagneticButton>
                  </div>
                </div>
              ) : (
                items.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 border-b border-gold/15 pb-5"
                    >
                      <div className="relative h-24 w-20 overflow-hidden bg-pearl shrink-0 border border-gold/20">
                        <Image
                          src={product.image}
                          alt={getProductName(product, locale)}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-lg leading-tight truncate text-ink">
                          {getProductName(product, locale)}
                        </p>
                        <p className="mt-1 text-[10px] tracking-[0.16em] uppercase text-champagne">
                          {product.sku}
                        </p>
                        <div className="mt-2">
                          <PriceDisplay product={product} size="sm" />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-gold/30 px-2 py-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1,
                                )
                              }
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-[10px] tracking-widest uppercase text-ink/35 hover:text-gold"
                          >
                            {t(locale, "cart.remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gold/20 px-6 py-6 space-y-3 bg-cream/50">
                <Row
                  label={t(locale, "cart.subtotal")}
                  value={formatPrice(subtotal, locale)}
                />
                <Row
                  label={t(locale, "cart.tax")}
                  value={formatPrice(tax, locale)}
                />
                <Row
                  label={t(locale, "cart.total")}
                  value={formatPrice(total, locale)}
                  strong
                />
                <div className="pt-3">
                  <MagneticButton
                    href="/cart"
                    onClick={closeCart}
                    className="w-full"
                  >
                    {t(locale, "cart.placeOrder")}
                  </MagneticButton>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="block text-center text-[11px] tracking-[0.2em] uppercase text-ink/40 hover:text-gold pt-1"
                >
                  {t(locale, "cart.continue")}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={strong ? "text-ink" : "text-ink/45"}>{label}</span>
      <span className={strong ? "text-gold font-medium text-base" : "text-ink"}>
        {value}
      </span>
    </div>
  );
}
