import type { CategoryMeta, Locale, Product } from "@/types";
import { PRODUCTS } from "@/data/products";

export { PRODUCTS };

export const WHATSAPP_NUMBER = "971551497911";
export const INSTAGRAM_URL = "https://instagram.com/jewelry._perfume";
export const LUXURY_TAX_RATE = 0.05;

/** @deprecated Prefer PRODUCTS */
export const products = PRODUCTS;

export const categories: CategoryMeta[] = [
  {
    id: "joaillerie",
    nameEn: "Haute Joaillerie",
    nameAr: "المجوهرات الراقية",
    categoryEn: "Haute Joaillerie",
    taglineEn: "Museum-grade jewelry sculpted in champagne gold and pearl light.",
    taglineAr: "مجوهرات بمستوى المتحف منحوتة بذهب شمباني وضوء لؤلؤ.",
    image: "/products/p14.jpeg",
  },
  {
    id: "fragrances",
    nameEn: "Artisanal Fragrances",
    nameAr: "العطور الفاخرة",
    categoryEn: "Artisanal Fragrances",
    taglineEn: "Signature scents and luminous beauty rituals by Maison Ikram.",
    taglineAr: "عطور توقيع وطقوس جمال مضيئة من دار إكرام.",
    image: "/products/q10.jpeg",
  },
  {
    id: "sets",
    nameEn: "Curated Sets & Beauty",
    nameAr: "أطقم ومستحضرات التجميل",
    categoryEn: "Curated Sets & Beauty",
    taglineEn: "Complete beauty ensembles composed as private exhibitions.",
    taglineAr: "أطقم جمال كاملة مؤلفة كمعارض خاصة.",
    image: "/products/q15.jpeg",
  },
];

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductName(product: Product, locale: Locale) {
  return locale === "ar" ? product.nameAr : product.nameEn;
}

export function getProductCategory(product: Product, locale: Locale) {
  return locale === "ar" ? product.categoryAr : product.categoryEn;
}

export function getProductStory(product: Product, locale: Locale) {
  return locale === "ar" ? product.storyAr : product.storyEn;
}

export function getCategoryLabel(cat: CategoryMeta, locale: Locale) {
  return locale === "ar" ? cat.nameAr : cat.nameEn;
}

export function getCategoryTagline(cat: CategoryMeta, locale: Locale) {
  return locale === "ar" ? cat.taglineAr : cat.taglineEn;
}

export function categoryIdFromProduct(product: Product) {
  const map: Record<Product["categoryEn"], CategoryMeta["id"]> = {
    "Haute Joaillerie": "joaillerie",
    "Artisanal Fragrances": "fragrances",
    "Curated Sets & Beauty": "sets",
  };
  return map[product.categoryEn];
}

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicDigits(value: number | string) {
  return String(value).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]);
}

/** English: AED 50 · Arabic: ٥٠ د.إ */
export function formatPrice(amount: number, locale: Locale = "en") {
  return locale === "ar"
    ? `${toArabicDigits(amount)} د.إ`
    : `AED ${amount}`;
}

export function isSummerOffer(product: Product) {
  return Boolean(product.isSummerOffer && product.originalPrice);
}

export function summerSavings(product: Product) {
  if (!isSummerOffer(product) || !product.originalPrice) return 0;
  return product.originalPrice - product.price;
}

export function storyExcerpt(product: Product, locale: Locale, max = 90) {
  const story = getProductStory(product, locale);
  if (story.length <= max) return story;
  return `${story.slice(0, max).trim()}…`;
}

/** Prefer webp sibling for hover secondary when available */
export function getSecondaryImage(product: Product) {
  if (product.image.endsWith(".jpeg")) {
    return product.image.replace(/\.jpeg$/, ".webp");
  }
  return product.image;
}
