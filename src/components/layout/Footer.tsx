"use client";

import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { t } from "@/lib/i18n";
import { INSTAGRAM_URL } from "@/lib/products";

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const locale = useLanguageStore((s) => s.locale);

  const links = [
    { key: "concierge", href: "/cart" },
    { key: "care", href: "/shop" },
    { key: "shipping", href: "/collections" },
    { key: "terms", href: "/" },
  ] as const;

  return (
    <footer className="relative mt-auto border-t border-gold/25 bg-white">
      <div className="gold-line" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="font-display text-3xl tracking-[0.3em] text-ink">
              {t(locale, "brand")}
            </p>
            <p className="mt-2 text-[11px] tracking-[0.28em] uppercase text-champagne">
              {t(locale, "tagline")}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-[11px] tracking-[0.2em] uppercase text-ink/45 hover:text-gold transition-colors"
              >
                {t(locale, `footer.${link.key}`)}
              </Link>
            ))}
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/40 hover:text-gold transition-colors duration-300"
            aria-label="Instagram"
          >
            <IconInstagram />
          </a>
        </div>

        <div className="mt-12 pt-6 border-t border-gold/15">
          <p className="text-center text-[11px] tracking-[0.1em] text-ink/40">
            {t(locale, "footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
