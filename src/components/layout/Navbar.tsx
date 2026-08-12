"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useUIStore } from "@/store/useUIStore";
import { t } from "@/lib/i18n";
import {
  getProductCategory,
  getProductName,
  INSTAGRAM_URL,
  PRODUCTS,
} from "@/lib/products";
import { useEffect, useState } from "react";

const links = [
  { href: "/", key: "home" },
  { href: "/collections", key: "collections" },
  { href: "/shop", key: "shop" },
  { href: "/cart", key: "cart" },
] as const;

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

export function Navbar() {
  const pathname = usePathname();
  const locale = useLanguageStore((s) => s.locale);
  const toggleLocale = useLanguageStore((s) => s.toggleLocale);
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.itemCount());
  const favCount = useFavoritesStore((s) => s.ids.length);
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, openProduct } =
    useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const results = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.includes(searchQuery) ||
          p.sku.toLowerCase().includes(q) ||
          p.categoryEn.toLowerCase().includes(q) ||
          p.categoryAr.includes(searchQuery) ||
          p.storyEn.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/92 backdrop-blur-xl border-b border-gold/25 shadow-[0_8px_30px_rgba(26,24,20,0.04)]"
            : "bg-white/80 backdrop-blur-md border-b border-gold/15"
        }`}
      >
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10 gap-4">
          {/* Far left: language + primary nav */}
          <div className="flex items-center gap-6 md:gap-8 justify-self-start min-w-0">
            <button
              type="button"
              onClick={toggleLocale}
              className="shrink-0 text-[11px] tracking-[0.18em] text-ink/70 hover:text-gold transition-colors border border-gold/30 px-2.5 py-1.5"
              aria-label="Toggle language"
            >
              {locale === "en" ? (
                <span>
                  EN <span className="text-gold/50">|</span>{" "}
                  <span className="opacity-45">عربي</span>
                </span>
              ) : (
                <span>
                  <span className="opacity-45">EN</span>{" "}
                  <span className="text-gold/50">|</span> عربي
                </span>
              )}
            </button>

            <nav className="hidden lg:flex items-center gap-7">
              {links.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] tracking-[0.22em] uppercase transition-colors whitespace-nowrap ${
                    pathname === link.href
                      ? "text-gold"
                      : "text-ink/55 hover:text-gold"
                  }`}
                >
                  {t(locale, `nav.${link.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center brand */}
          <Link
            href="/"
            className="justify-self-center font-display text-2xl md:text-3xl tracking-[0.35em] text-ink px-2"
          >
            {t(locale, "brand")}
          </Link>

          {/* Far right: secondary nav + icons */}
          <div className="flex items-center gap-6 md:gap-8 justify-self-end">
            <nav className="hidden lg:flex items-center gap-7">
              {links.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] tracking-[0.22em] uppercase transition-colors whitespace-nowrap ${
                    pathname === link.href
                      ? "text-gold"
                      : "text-ink/55 hover:text-gold"
                  }`}
                >
                  {t(locale, `nav.${link.key}`)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6 md:gap-8">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/55 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="text-ink/55 hover:text-gold transition-colors"
                aria-label={t(locale, "nav.search")}
              >
                <Search size={18} strokeWidth={1.4} />
              </button>

              <Link
                href="/shop"
                className="relative text-ink/55 hover:text-gold transition-colors"
                aria-label={t(locale, "nav.favorites")}
              >
                <Heart size={18} strokeWidth={1.4} />
                {favCount > 0 && (
                  <span className="absolute -top-2 -end-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] text-white">
                    {favCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openCart}
                className="relative text-ink/55 hover:text-gold transition-colors"
                aria-label={t(locale, "nav.cart")}
              >
                <ShoppingBag size={18} strokeWidth={1.4} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -end-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] text-white">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className="lg:hidden text-ink/60"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
              >
                <span className="block w-5 h-px bg-current mb-1.5" />
                <span className="block w-5 h-px bg-current" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-gold/20 bg-white"
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm tracking-[0.2em] uppercase text-ink/70 hover:text-gold"
                  >
                    {t(locale, `nav.${link.key}`)}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cream/92 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mx-auto mt-28 max-w-2xl px-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-gold/40 pb-3">
                <Search size={20} className="text-gold" strokeWidth={1.4} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t(locale, "nav.search")}
                  className="w-full bg-transparent text-lg outline-none placeholder:text-ink/30 text-ink"
                />
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <X size={20} className="text-ink/40" />
                </button>
              </div>
              <ul className="mt-4 space-y-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className="w-full text-start px-3 py-3 hover:bg-gold/10 transition-colors border border-transparent hover:border-gold/20"
                      onClick={() => {
                        openProduct(p);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <span className="font-display text-lg text-ink">
                        {getProductName(p, locale)}
                      </span>
                      <span className="ms-3 text-xs text-gold tracking-widest uppercase">
                        {getProductCategory(p, locale)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
