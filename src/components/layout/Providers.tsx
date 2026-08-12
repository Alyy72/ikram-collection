"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLanguageStore((s) => s.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return <>{children}</>;
}
