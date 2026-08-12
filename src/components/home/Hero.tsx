"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { t } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const locale = useLanguageStore((s) => s.locale);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-pearl"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/products/p05.jpeg"
          alt="IKRAM Haute Joaillerie & Parfums"
          fill
          priority
          className="object-cover object-[center_18%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/25 to-cream/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(250,248,245,0.55)_100%)]" />
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.85, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[20%] inset-x-[10%] h-px origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent z-10"
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pt-16"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.55em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ delay: 0.15, duration: 1 }}
          className="text-[11px] uppercase text-gold"
        >
          {t(locale, "tagline")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-balance text-ink"
        >
          {t(locale, "hero.headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.75 }}
          className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-ink/60"
        >
          {t(locale, "hero.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10"
        >
          <MagneticButton href="/collections">
            {t(locale, "hero.cta")}
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-px gold-line" />
      <Link
        href="#story"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] uppercase text-ink/35 hover:text-gold transition-colors"
      >
        {locale === "ar" ? "اكتشف" : "Discover"}
      </Link>
    </section>
  );
}
