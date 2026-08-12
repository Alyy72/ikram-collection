"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ZoomIn } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useCartStore } from "@/store/useCartStore";
import {
  formatPrice,
  getProductCategory,
  getProductName,
  getProductStory,
  getSecondaryImage,
  WHATSAPP_NUMBER,
} from "@/lib/products";
import { t } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  PriceDisplay,
  SummerOfferBanner,
} from "@/components/product/PriceDisplay";

export function ProductDetailModal() {
  const product = useUIStore((s) => s.selectedProduct);
  const closeProduct = useUIStore((s) => s.closeProduct);
  const locale = useLanguageStore((s) => s.locale);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (product) {
      setQty(1);
      setAdded(false);
      setZoomed(false);
      setActive(0);
    }
  }, [product]);

  const gallery = product
    ? [product.image, getSecondaryImage(product)].filter(
        (img, i, arr) => arr.indexOf(img) === i,
      )
    : [];

  const handleAdd = () => {
    if (!product || !product.inStock) return;
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const inquireUrl = product
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        locale === "ar"
          ? `مرحباً إكرام، أود الاستفسار عن: ${product.nameAr} (${product.sku}) — ${formatPrice(product.price, "ar")}`
          : `Hello Ikram, I would like to inquire about: ${product.nameEn} (${product.sku}) — ${formatPrice(product.price, "en")}`,
      )}`
    : "#";

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-ink/40 backdrop-blur-sm p-3 md:p-8"
          onClick={closeProduct}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col md:flex-row overflow-hidden bg-white border border-gold/40 shadow-[0_30px_80px_rgba(26,24,20,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeProduct}
              className="absolute top-4 end-4 z-20 text-ink/50 hover:text-gold bg-white/80 p-1.5"
            >
              <X size={22} />
            </button>

            <div className="relative md:w-[48%] h-64 md:h-auto bg-pearl shrink-0">
              <Image
                src={gallery[active] ?? product.image}
                alt={getProductName(product, locale)}
                fill
                className={`object-cover transition-transform duration-700 ${
                  zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                }`}
                sizes="50vw"
                onClick={() => setZoomed((z) => !z)}
              />
              <div className="absolute bottom-4 start-4 flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/90 drop-shadow">
                <ZoomIn size={14} /> {locale === "ar" ? "تكبير" : "Zoom"}
              </div>
              {gallery.length > 1 && (
                <div className="absolute bottom-4 end-4 flex gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={img + i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`relative h-14 w-11 overflow-hidden border bg-white ${
                        i === active ? "border-gold" : "border-white/50 opacity-80"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="44px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex flex-1 flex-col overflow-y-auto p-6 md:p-10 pb-36 bg-white">
              <p className="text-[10px] tracking-[0.32em] uppercase text-champagne">
                {getProductCategory(product, locale)}
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink text-balance leading-tight">
                {getProductName(product, locale)}
              </h2>
              <div className="mt-3">
                <PriceDisplay product={product} size="lg" />
              </div>

              {product.isSummerOffer && (
                <div className="mt-4">
                  <SummerOfferBanner compact />
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex border border-gold/40 bg-cream px-3 py-1.5 text-[11px] tracking-[0.12em] text-ink/75">
                  SKU {product.sku}
                </span>
                <span
                  className={`inline-flex border px-3 py-1.5 text-[11px] tracking-[0.12em] ${
                    product.inStock
                      ? "border-gold/40 bg-cream text-ink/75"
                      : "border-ink/20 bg-pearl text-ink/45"
                  }`}
                >
                  {product.inStock
                    ? locale === "ar"
                      ? "متوفر"
                      : "In Stock"
                    : locale === "ar"
                      ? "غير متوفر"
                      : "Sold Out"}
                </span>
              </div>

              <div className="mt-8 border-t border-gold/20 pt-6">
                <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3">
                  {t(locale, "shop.storyTitle")}
                </p>
                <p className="font-display text-lg md:text-xl leading-relaxed text-ink/75 italic">
                  {getProductStory(product, locale)}
                </p>
              </div>

              <div className="mt-8 border border-gold/25 bg-cream/80 p-5">
                <p className="text-[10px] tracking-[0.28em] uppercase text-champagne mb-2">
                  {t(locale, "shop.founderNote")}
                </p>
                <p className="text-sm leading-relaxed text-ink/65">
                  {locale === "ar"
                    ? "— اختارتها المؤسسة إكرام بعناية لدار إكرام. قطعة تعكس الفخامة الهادئة والحضور التحريري."
                    : "— Chosen with care by Founder Ikram for Maison IKRAM. A piece that carries quiet luxury and editorial presence."}
                </p>
                <p className="mt-3 font-display text-base text-gold">Ikram</p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <span className="text-[10px] tracking-[0.22em] uppercase text-ink/45">
                  {t(locale, "shop.quantity")}
                </span>
                <div className="flex items-center gap-3 border border-gold/30 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-gold/20 bg-white/95 backdrop-blur-md p-4 md:p-5 md:start-[48%] flex flex-col sm:flex-row gap-3">
              <MagneticButton
                onClick={handleAdd}
                className={`w-full sm:flex-1 ${!product.inStock ? "opacity-50 pointer-events-none" : ""}`}
              >
                {added
                  ? t(locale, "shop.added")
                  : product.inStock
                    ? t(locale, "shop.addToBag")
                    : locale === "ar"
                      ? "غير متوفر"
                      : "Sold Out"}
              </MagneticButton>
              <a
                href={inquireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 text-[11px] tracking-[0.22em] uppercase border border-gold/50 text-ink hover:bg-gold/10 transition-colors"
              >
                {t(locale, "shop.inquire")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
