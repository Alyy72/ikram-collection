"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { t } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function OrderConfirmModal() {
  const locale = useLanguageStore((s) => s.locale);
  const { showOrderModal, orderRef, setShowOrderModal, setOrderRef } =
    useCartStore();

  const close = () => {
    setShowOrderModal(false);
    setOrderRef(null);
  };

  return (
    <AnimatePresence>
      {showOrderModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/35 backdrop-blur-md px-5"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            className="relative w-full max-w-lg overflow-hidden border border-gold/40 bg-white p-10 text-center shadow-[0_24px_60px_rgba(26,24,20,0.12)]"
          >
            <div className="pointer-events-none absolute inset-0 shimmer-gold opacity-30" />
            <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
              <Check size={28} strokeWidth={1.5} />
            </div>
            <h2 className="relative font-display text-3xl text-ink text-balance">
              {t(locale, "order.title")}
            </h2>
            <p className="relative mt-5 text-sm leading-relaxed text-ink/60">
              {t(locale, "order.body")}
            </p>
            {orderRef && (
              <p className="relative mt-6 text-[11px] tracking-[0.28em] uppercase text-champagne">
                {t(locale, "order.ref")}
                <span className="mt-2 block text-base tracking-[0.12em] text-gold normal-case">
                  {orderRef}
                </span>
              </p>
            )}
            <div className="relative mt-8">
              <MagneticButton href="/" onClick={close}>
                {t(locale, "order.close")}
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
