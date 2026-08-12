"use client";

import { create } from "zustand";
import type { Product } from "@/types";

interface UIState {
  selectedProduct: Product | null;
  searchOpen: boolean;
  searchQuery: string;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedProduct: null,
  searchOpen: false,
  searchQuery: "",
  openProduct: (product) => set({ selectedProduct: product }),
  closeProduct: () => set({ selectedProduct: null }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
