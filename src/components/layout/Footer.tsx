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

const PORTFOLIO_URL = "https://github.com/Alyy72";

export function Footer() {
  const locale = useLanguageStore((s) => s.locale);

  const links = [
    { key: "concierge", href: "/cart" },
    { key: "care", href: "/shop" },
    { key: "shipping", href: "/collections" },
    { key: "terms", href: "/" },
  ] as const;

  return (
    <footer className="relative mt-auto w-full border-t border-white/10 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl tracking-[0.3em] text-white md:text-3xl">
              {t(locale, "brand")}
            </p>
            <p className="mt-2 text-[11px] tracking-[0.28em] uppercase text-white/45">
              {t(locale, "tagline")}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-[11px] tracking-[0.2em] uppercase text-white/45 transition-colors hover:text-white"
              >
                {t(locale, `footer.${link.key}`)}
              </Link>
            ))}
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 transition-colors duration-300 hover:text-white"
            aria-label="Instagram"
          >
            <IconInstagram />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-sm text-gray-400 sm:flex-row sm:text-left">
          <p className="text-xs text-gray-400 sm:text-sm">
            {t(locale, "footer.copyright")}
          </p>

          <p className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
            <span>{t(locale, "footer.createdBy")}</span>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold tracking-wide text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all hover:text-red-400 hover:underline"
            >
              AlyyConnect
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
