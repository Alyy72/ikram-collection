export type Locale = "en" | "ar";

export type CategoryId = "joaillerie" | "fragrances" | "sets";

export type ProductCategoryEn =
  | "Haute Joaillerie"
  | "Artisanal Fragrances"
  | "Curated Sets & Beauty";

export type ProductCategoryAr =
  | "المجوهرات الراقية"
  | "العطور الفاخرة"
  | "أطقم ومستحضرات التجميل";

export interface Product {
  id: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  categoryEn: ProductCategoryEn;
  categoryAr: ProductCategoryAr;
  price: number; // Retail / sale price in AED
  originalPrice?: number; // Strikethrough list price (e.g. 75 for Summer Offer)
  isSummerOffer?: boolean;
  currency: string;
  image: string;
  inStock: boolean;
  storyEn: string;
  storyAr: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CategoryMeta {
  id: CategoryId;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  image: string;
  categoryEn: ProductCategoryEn;
}
