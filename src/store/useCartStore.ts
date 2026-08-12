"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  orderRef: string | null;
  showOrderModal: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setOrderRef: (ref: string | null) => void;
  setShowOrderModal: (show: boolean) => void;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      orderRef: null,
      showOrderModal: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      addItem: (productId, quantity = 1) => {
        const items = [...get().items];
        const existing = items.find((i) => i.productId === productId);
        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({ productId, quantity });
        }
        set({ items, isOpen: true });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      setOrderRef: (ref) => set({ orderRef: ref }),
      setShowOrderModal: (show) => set({ showOrderModal: show }),
      itemCount: () => get().items.reduce((n, i) => n + i.quantity, 0),
    }),
    {
      name: "ikram-cart",
      partialize: (state) => ({ items: state.items }),
      // Drop legacy cart entries that included metal finishes
      merge: (persisted, current) => {
        const p = persisted as Partial<CartState> | undefined;
        const rawItems = p?.items ?? [];
        const items: CartItem[] = rawItems
          .map((item) => ({
            productId: (item as CartItem).productId,
            quantity: Number((item as CartItem).quantity) || 1,
          }))
          .filter((item) => Boolean(item.productId));
        return { ...current, ...p, items };
      },
    },
  ),
);
