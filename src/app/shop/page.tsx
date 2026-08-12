"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageTransition, FadeIn } from "@/components/ui/PageTransition";
import { ProductCard } from "@/components/product/ProductCard";
import { SummerOfferBanner } from "@/components/product/PriceDisplay";
import {
  categories,
  categoryIdFromProduct,
  getCategoryLabel,
  PRODUCTS,
} from "@/lib/products";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useUIStore } from "@/store/useUIStore";
import { t } from "@/lib/i18n";
import type { CategoryId } from "@/types";

const tabs: (CategoryId | "all")[] = [
  "all",
  "joaillerie",
  "fragrances",
  "sets",
];

function ShopContent() {
  const locale = useLanguageStore((s) => s.locale);
  const openProduct = useUIStore((s) => s.openProduct);
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<CategoryId | "all">("all");

  useEffect(() => {
    const highlight = searchParams.get("highlight");
    if (highlight) {
      const product = PRODUCTS.find((p) => p.id === highlight);
      if (product) openProduct(product);
    }
  }, [searchParams, openProduct]);

  const list = useMemo(
    () =>
      tab === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => categoryIdFromProduct(p) === tab),
    [tab],
  );

  return (
    <PageTransition>
      <section className="pt-28 md:pt-32 pb-24 bg-pearl-wash">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-gold">
              {t(locale, "tagline")}
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-ink">
              {t(locale, "shop.title")}
            </h1>
            <p className="mt-4 max-w-xl text-ink/50">
              {t(locale, "shop.subtitle")}
            </p>
            <div className="mt-6 max-w-xl">
              <SummerOfferBanner />
            </div>
          </FadeIn>

          <div className="mt-10 flex flex-wrap gap-2 border-b border-gold/20 pb-4">
            {tabs.map((id) => {
              const label =
                id === "all"
                  ? t(locale, "collections.all")
                  : getCategoryLabel(
                      categories.find((c) => c.id === id)!,
                      locale,
                    );
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors ${
                    tab === id
                      ? "text-gold border-b border-gold"
                      : "text-ink/40 hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-32 px-8 text-ink/40">…</div>}>
      <ShopContent />
    </Suspense>
  );
}
