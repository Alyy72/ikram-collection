"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/ui/PageTransition";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCartStore } from "@/store/useCartStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  formatPrice,
  getProductById,
  getProductName,
} from "@/lib/products";
import { calcTotals, generateOrderRef } from "@/lib/whatsapp";
import { notifyConcierge } from "@/lib/notifyOrder";
import { t } from "@/lib/i18n";
import { PriceDisplay } from "@/components/product/PriceDisplay";

export default function CartPage() {
  const locale = useLanguageStore((s) => s.locale);
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    setOrderRef,
    setShowOrderModal,
  } = useCartStore();
  const { subtotal, tax, total } = calcTotals(items);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    if (!name.trim() || !phone.trim()) {
      setError(
        locale === "ar"
          ? "يرجى إدخال الاسم ورقم الهاتف."
          : "Please enter your name and phone.",
      );
      return;
    }
    setError("");
    const orderRef = generateOrderRef();
    const snapshot = [...items];

    // Stay on-site — confirmation modal only (no WhatsApp redirect)
    setOrderRef(orderRef);
    setShowOrderModal(true);
    clearCart();
    setName("");
    setPhone("");
    setNote("");

    void notifyConcierge({
      type: "order",
      orderRef,
      locale,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      note: note.trim() || undefined,
      items: snapshot,
      total,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <PageTransition>
      <section className="pt-28 md:pt-32 pb-24 bg-pearl-wash">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-6xl text-ink">
              {t(locale, "cart.title")}
            </h1>
          </FadeIn>

          {items.length === 0 ? (
            <FadeIn delay={0.1}>
              <div className="mt-16 text-center py-20 border border-gold/25 bg-white">
                <p className="text-ink/45 text-lg">{t(locale, "cart.empty")}</p>
                <div className="mt-8">
                  <MagneticButton href="/shop">
                    {t(locale, "cart.continue")}
                  </MagneticButton>
                </div>
              </div>
            </FadeIn>
          ) : (
            <div className="mt-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14">
              <FadeIn>
                <ul className="space-y-6">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    return (
                      <li
                        key={item.productId}
                        className="flex gap-5 border-b border-gold/20 pb-6"
                      >
                        <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-pearl border border-gold/20">
                          <Image
                            src={product.image}
                            alt={getProductName(product, locale)}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h2 className="font-display text-xl text-ink">
                                {getProductName(product, locale)}
                              </h2>
                              <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-champagne">
                                {product.sku}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId)}
                              className="text-ink/35 hover:text-gold"
                              aria-label={t(locale, "cart.remove")}
                            >
                              <Trash2 size={16} strokeWidth={1.4} />
                            </button>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-3 border border-gold/30 px-2.5 py-1.5">
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
                              <span className="text-xs w-5 text-center">
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
                            <PriceDisplay
                              product={product}
                              quantity={item.quantity}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </FadeIn>

              <FadeIn delay={0.1}>
                <form
                  onSubmit={onSubmit}
                  className="glass-panel p-6 md:p-8 space-y-5 sticky top-28"
                >
                  <h2 className="font-display text-2xl text-ink">
                    {locale === "ar" ? "تفاصيل الضيف" : "Guest Details"}
                  </h2>

                  <Field
                    label={t(locale, "cart.name")}
                    value={name}
                    onChange={setName}
                    placeholder={t(locale, "cart.namePh")}
                  />
                  <Field
                    label={t(locale, "cart.phone")}
                    value={phone}
                    onChange={setPhone}
                    placeholder={t(locale, "cart.phonePh")}
                  />
                  <Field
                    label={t(locale, "cart.note")}
                    value={note}
                    onChange={setNote}
                    placeholder={t(locale, "cart.notePh")}
                    textarea
                  />

                  <div className="gold-line my-2" />

                  <SummaryRow
                    label={t(locale, "cart.subtotal")}
                    value={formatPrice(subtotal, locale)}
                  />
                  <SummaryRow
                    label={t(locale, "cart.tax")}
                    value={formatPrice(tax, locale)}
                  />
                  <SummaryRow
                    label={t(locale, "cart.total")}
                    value={formatPrice(total, locale)}
                    strong
                  />

                  {error && <p className="text-sm text-gold">{error}</p>}

                  <MagneticButton type="submit" className="w-full mt-2">
                    {t(locale, "cart.placeOrder")}
                  </MagneticButton>
                </form>
              </FadeIn>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  textarea?: boolean;
}) {
  const cls =
    "mt-2 w-full bg-white border border-gold/30 px-3 py-2.5 text-sm outline-none focus:border-gold/70 placeholder:text-ink/30 text-ink";
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.22em] uppercase text-ink/45">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className={strong ? "text-ink" : "text-ink/45"}>{label}</span>
      <span className={strong ? "text-gold text-base" : "text-ink"}>{value}</span>
    </div>
  );
}
