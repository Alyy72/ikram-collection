import type { Locale } from "@/types";

export const translations = {
  brand: { en: "IKRAM", ar: "إكرام" },
  tagline: {
    en: "Haute Joaillerie & Beauty",
    ar: "المجوهرات الراقية والجمال",
  },
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    collections: { en: "Collections", ar: "المجموعات" },
    shop: { en: "Shop", ar: "المتجر" },
    cart: { en: "Bag", ar: "الحقيبة" },
    search: { en: "Search", ar: "بحث" },
    favorites: { en: "Favorites", ar: "المفضلة" },
  },
  hero: {
    headline: {
      en: "Where Haute Joaillerie Meets Modern Sculpture",
      ar: "حيث تلتقي المجوهرات الراقية بالنحت المعاصر",
    },
    sub: {
      en: "A luminous maison of champagne gold, curated beauty, and museum-grade craft — founded by Ikram.",
      ar: "دار مضيئة من الذهب الشمباني والجمال المختار والحرفة بمستوى المتحف — أسستها إكرام.",
    },
    cta: { en: "Explore Collection", ar: "استكشف المجموعة" },
  },
  story: {
    eyebrow: { en: "The Maison", ar: "الدار" },
    title: {
      en: "Jewelry & Beauty as modern art",
      ar: "المجوهرات والجمال كفن معاصر",
    },
    body: {
      en: "Ikram composes pieces that behave like sculptures and beauty rituals that linger like signatures — weightless on the body, monumental in presence. Each creation is finished in an editorial language of champagne gold, silk cream, and soft pearl light.",
      ar: "تؤلف إكرام قطعاً تتصرف كمنحوتات وطقوس جمال تبقى كتوقيعات — خفيفة على الجسد، عظيمة في الحضور. كل إبداع يُكمَّل بلغة تحريرية من الذهب الشمباني والكريم الحريري وضوء اللؤلؤ الناعم.",
    },
    philosophy: {
      en: "Design Philosophy",
      ar: "فلسفة التصميم",
    },
  },
  collections: {
    title: { en: "Collections", ar: "المجموعات" },
    subtitle: {
      en: "Three chapters of luminous composition",
      ar: "ثلاثة فصول من التكوين المضيء",
    },
    filterMaterial: { en: "Material", ar: "المادة" },
    filterStyle: { en: "Style", ar: "النمط" },
    all: { en: "All", ar: "الكل" },
    viewShop: { en: "Enter Shop", ar: "ادخل المتجر" },
  },
  shop: {
    title: { en: "The Atelier Shop", ar: "متجر المحترف" },
    subtitle: {
      en: "Curated pieces ready for private acquisition",
      ar: "قطع مختارة جاهزة للاقتناء الخاص",
    },
    quickView: { en: "Quick View", ar: "نظرة سريعة" },
    addToBag: { en: "Add to Bag", ar: "أضف إلى الحقيبة" },
    added: { en: "Added to Bag", ar: "أُضيف إلى الحقيبة" },
    inquire: { en: "Inquire with Concierge", ar: "استفسر عبر الكونسيرج" },
    storyTitle: {
      en: "The Story Behind the Piece",
      ar: "قصة القطعة",
    },
    founderNote: { en: "Founder's Note", ar: "ملاحظة المؤسسة" },
    material: { en: "Material Certification", ar: "شهادة المادة" },
    quantity: { en: "Quantity", ar: "الكمية" },
  },
  cart: {
    title: { en: "Your Concierge Bag", ar: "حقيبة الكونسيرج" },
    empty: {
      en: "Your bag awaits its first sculpture.",
      ar: "حقيبتك تنتظر منحوتتها الأولى.",
    },
    continue: { en: "Continue Shopping", ar: "متابعة التسوق" },
    subtotal: { en: "Subtotal", ar: "المجموع الفرعي" },
    tax: { en: "Luxury Tax (5%)", ar: "ضريبة الفخامة (٥٪)" },
    total: { en: "Total", ar: "الإجمالي" },
    quantity: { en: "Qty", ar: "الكمية" },
    remove: { en: "Remove", ar: "إزالة" },
    placeOrder: {
      en: "Place Order via Concierge",
      ar: "تأكيد الطلب عبر الكونسيرج",
    },
    name: { en: "Full Name", ar: "الاسم الكامل" },
    phone: { en: "Phone", ar: "الهاتف" },
    note: { en: "Special Note", ar: "ملاحظة خاصة" },
    namePh: { en: "Your name", ar: "اسمك" },
    phonePh: { en: "+971 …", ar: "+٩٧١ …" },
    notePh: {
      en: "Sizing, gifting, delivery preference…",
      ar: "المقاس، الإهداء، تفضيل التوصيل…",
    },
  },
  order: {
    title: { en: "Order Received", ar: "تم استلام الطلب" },
    body: {
      en: "Thank you for your order. Founder Ikram and our concierge team have received your selection and will connect with you shortly on WhatsApp to finalize your delivery details.",
      ar: "شكراً لطلبك. لقد استلمت المؤسسة إكرام وفريق الكونسيرج اختياراتك، وسنتواصل معك قريباً عبر الواتساب لإتمام تفاصيل التوصيل.",
    },
    ref: { en: "Order Reference", ar: "مرجع الطلب" },
    close: { en: "Return to Maison", ar: "العودة إلى الدار" },
  },
  footer: {
    concierge: { en: "Concierge", ar: "الكونسيرج" },
    care: { en: "Care Guide", ar: "دليل العناية" },
    shipping: { en: "Shipping & Returns", ar: "الشحن والإرجاع" },
    terms: { en: "Terms of Service", ar: "شروط الخدمة" },
    copyright: {
      en: "All Rights Reserved © 2026 IKRAM Haute Joaillerie & Beauty.",
      ar: "All Rights Reserved © 2026 IKRAM Haute Joaillerie & Beauty.",
    },
  },
} as const;

export function t(locale: Locale, path: string): string {
  const keys = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = translations;
  for (const key of keys) {
    node = node?.[key];
  }
  if (node && typeof node === "object" && "en" in node) {
    return (node as { en: string; ar: string })[locale];
  }
  return path;
}
