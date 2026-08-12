"use client";

import Image from "next/image";
import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageTransition, FadeIn } from "@/components/ui/PageTransition";
import { ProductCard } from "@/components/product/ProductCard";
import {
  categories,
  categoryIdFromProduct,
  getCategoryLabel,
  getCategoryTagline,
  PRODUCTS,
} from "@/lib/products";
import { useLanguageStore } from "@/store/useLanguageStore";
import { t } from "@/lib/i18n";
import type { CategoryId } from "@/types";
import { MagneticButton } from "@/components/ui/MagneticButton";

function CollectionsContent() {
  const locale = useLanguageStore((s) => s.locale);
  const searchParams = useSearchParams();
  const initial = (searchParams.get("category") as CategoryId | null) ?? null;
  const [category, setCategory] = useState<CategoryId | null>(initial);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (category && categoryIdFromProduct(p) !== category) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });
  }, [category, inStockOnly]);

  return (
    <PageTransition>
      <section className="pt-28 md:pt-32 pb-20 bg-pearl-wash">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-gold">
              {t(locale, "tagline")}
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-ink">
              {t(locale, "collections.title")}
            </h1>
            <p className="mt-4 max-w-xl text-ink/50">
              {t(locale, "collections.subtitle")}
            </p>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() =>
                    setCategory(category === cat.id ? null : cat.id)
                  }
                  className={`group relative block w-full aspect-[3/4] overflow-hidden art-frame p-3 text-start ${
                    category === cat.id ? "ring-1 ring-gold" : ""
                  }`}
                >
                  <div className="relative h-full w-full overflow-hidden bg-pearl">
                    <Image
                      src={cat.image}
                      alt={getCategoryLabel(cat, locale)}
                      fill
                      className="img-zoom object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                      <h2 className="font-display text-2xl md:text-3xl">
                        {getCategoryLabel(cat, locale)}
                      </h2>
                      <p className="mt-2 text-xs text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {getCategoryTagline(cat, locale)}
                      </p>
                    </div>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>

          <div className="mt-14 flex flex-col lg:flex-row gap-8 lg:gap-14">
            <aside className="lg:w-52 shrink-0">
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3">
                {locale === "ar" ? "التوفر" : "Availability"}
              </p>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <FilterChip
                  active={!inStockOnly}
                  onClick={() => setInStockOnly(false)}
                  label={t(locale, "collections.all")}
                />
                <FilterChip
                  active={inStockOnly}
                  onClick={() => setInStockOnly(true)}
                  label={locale === "ar" ? "متوفر فقط" : "In Stock Only"}
                />
              </div>
            </aside>

            <div className="flex-1">
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-ink/40 text-center py-16">
                  {locale === "ar"
                    ? "لا توجد قطع مطابقة."
                    : "No pieces match these filters."}
                </p>
              )}
              <div className="mt-14 text-center">
                <MagneticButton href="/shop">
                  {t(locale, "collections.viewShop")}
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-[11px] tracking-[0.12em] border transition-colors ${
        active
          ? "border-gold text-gold bg-gold/10"
          : "border-gold/25 text-ink/50 hover:border-gold/50 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="pt-32 px-8 text-ink/40">…</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
