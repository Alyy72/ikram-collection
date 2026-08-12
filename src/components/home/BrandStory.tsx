"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/PageTransition";
import { useLanguageStore } from "@/store/useLanguageStore";
import { t } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function BrandStory() {
  const locale = useLanguageStore((s) => s.locale);

  return (
    <section id="story" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden art-frame p-3">
              <div className="relative h-full w-full overflow-hidden bg-pearl">
                <Image
                  src="/products/p01.jpeg"
                  alt="Ikram atelier"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold">
              {t(locale, "story.eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-balance text-ink">
              {t(locale, "story.title")}
            </h2>
            <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-6 text-base md:text-lg leading-relaxed text-ink/60">
              {t(locale, "story.body")}
            </p>
            <p className="mt-8 text-[11px] tracking-[0.28em] uppercase text-champagne">
              {t(locale, "story.philosophy")}
            </p>
            <div className="mt-10">
              <MagneticButton href="/shop" variant="outline">
                {t(locale, "collections.viewShop")}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
