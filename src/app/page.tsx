"use client";

import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { PageTransition, FadeIn } from "@/components/ui/PageTransition";
import { ProductCard } from "@/components/product/ProductCard";
import {
  categories,
  getCategoryLabel,
  getCategoryTagline,
  PRODUCTS,
} from "@/lib/products";
import { useLanguageStore } from "@/store/useLanguageStore";
import { t } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function HomePage() {
  const locale = useLanguageStore((s) => s.locale);
  const featured = PRODUCTS.filter(
    (p) =>
      p.categoryEn === "Haute Joaillerie" ||
      p.categoryEn === "Curated Sets & Beauty",
  ).slice(0, 4);

  return (
    <PageTransition>
      <Hero />
      <BrandStory />

      <section className="py-24 md:py-28 bg-pearl-wash">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-[11px] tracking-[0.35em] uppercase text-gold">
                  {t(locale, "collections.subtitle")}
                </p>
                <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink">
                  {t(locale, "collections.title")}
                </h2>
              </div>
              <MagneticButton href="/collections" variant="outline">
                {t(locale, "hero.cta")}
              </MagneticButton>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5 md:gap-7">
            {categories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.08}>
                <Link
                  href={`/collections?category=${cat.id}`}
                  className="group relative block aspect-[3/4] overflow-hidden art-frame p-3"
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
                      <h3 className="font-display text-3xl">
                        {getCategoryLabel(cat, locale)}
                      </h3>
                      <p className="mt-2 text-xs text-white/75 line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {getCategoryTagline(cat, locale)}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-gold/15">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <FadeIn>
            <h2 className="font-display text-4xl mb-12 text-center text-ink">
              {locale === "ar" ? "مختارات الدار" : "Maison Edit"}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <MagneticButton href="/shop">
              {t(locale, "collections.viewShop")}
            </MagneticButton>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
