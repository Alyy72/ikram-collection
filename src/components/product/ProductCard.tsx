"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import {
  getProductCategory,
  getProductName,
  getSecondaryImage,
  storyExcerpt,
} from "@/lib/products";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useUIStore } from "@/store/useUIStore";
import { t } from "@/lib/i18n";
import {
  PriceDisplay,
  SummerSaveBadge,
} from "@/components/product/PriceDisplay";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const locale = useLanguageStore((s) => s.locale);
  const toggleFav = useFavoritesStore((s) => s.toggle);
  const isFav = useFavoritesStore((s) => s.ids.includes(product.id));
  const openProduct = useUIStore((s) => s.openProduct);
  const secondary = getSecondaryImage(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${!product.inStock ? "opacity-70" : ""}`}
    >
      <div
        className="art-frame relative overflow-hidden p-3 md:p-4 cursor-pointer"
        onClick={() => openProduct(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openProduct(product);
        }}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-pearl">
          <Image
            src={product.image}
            alt={getProductName(product, locale)}
            fill
            className="object-cover transition-opacity duration-700 group-hover:opacity-0"
            sizes="(max-width:768px) 50vw, 25vw"
          />
          <Image
            src={secondary}
            alt=""
            fill
            className="object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
            sizes="(max-width:768px) 50vw, 25vw"
          />

          <span className="absolute top-3 start-3 z-10 max-w-[70%] border border-gold/50 bg-white/85 backdrop-blur-md px-2.5 py-1 text-[9px] tracking-[0.16em] uppercase text-ink/80 shadow-sm">
            {getProductCategory(product, locale)}
          </span>

          {!product.inStock && (
            <span className="absolute top-3 start-3 translate-y-8 z-10 border border-ink/20 bg-white/90 px-2 py-1 text-[9px] tracking-[0.14em] uppercase text-ink/60">
              {locale === "ar" ? "غير متوفر" : "Sold Out"}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFav(product.id);
            }}
            className="absolute top-3 end-3 z-10 text-ink/50 hover:text-gold transition-colors bg-white/70 backdrop-blur-sm p-1.5"
            aria-label="Favorite"
          >
            <Heart
              size={16}
              strokeWidth={1.4}
              className={isFav ? "fill-gold text-gold" : ""}
            />
          </button>

          <div className="absolute bottom-3 start-3 z-10 border border-gold/40 bg-white/90 backdrop-blur-md px-2.5 py-1">
            <PriceDisplay product={product} size="sm" />
          </div>

          <SummerSaveBadge product={product} />

          <div className="absolute inset-x-4 bottom-12 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
            <div className="border border-gold/40 bg-white/75 backdrop-blur-md py-2.5 text-center text-[10px] tracking-[0.28em] uppercase text-ink">
              {t(locale, "shop.quickView")}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => openProduct(product)}
        className="mt-5 w-full text-start px-1"
      >
        <p className="text-[10px] tracking-[0.2em] uppercase text-ink/35">
          {product.sku}
        </p>
        <h3 className="mt-1 font-display text-2xl leading-snug text-ink group-hover:text-gold transition-colors">
          {getProductName(product, locale)}
        </h3>
        <div className="mt-2">
          <PriceDisplay product={product} />
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/50 italic line-clamp-2">
          “{storyExcerpt(product, locale, 100)}”
        </p>
      </button>
    </motion.article>
  );
}
