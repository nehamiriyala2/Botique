"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "@/lib/db/schema";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  collectionName: string;
  fabric: string;
  selectedColor: string;
  selectedColorHex: string;
  price: number | null;
  isSample: boolean;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  totalItems: number;
  knownSubtotal: number;
  hasEnquiryOnlyItems: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (
    product: Product,
    options?: { colorName?: string; colorHex?: string; quantity?: number; openCart?: boolean }
  ) => void;
  removeItem: (productId: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedColor: string, quantity: number) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "aliveli_vasthralaya_cart_v1";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore malformed storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota issues
    }
  }, [items, hydrated]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback(
    (
      product: Product,
      options?: {
        colorName?: string;
        colorHex?: string;
        quantity?: number;
        openCart?: boolean;
      }
    ) => {
      const fallbackColor = product.colors[0] ?? {
        name: "As Shown",
        hex: "#741D2B",
      };
      const colorName = options?.colorName ?? fallbackColor.name;
      const colorHex = options?.colorHex ?? fallbackColor.hex;
      const qtyToAdd = Math.max(1, options?.quantity ?? 1);

      setItems((prev) => {
        const existingIdx = prev.findIndex(
          (item) =>
            item.productId === product.id && item.selectedColor === colorName
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + qtyToAdd,
          };
          return updated;
        }
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            collectionName: product.collectionName,
            fabric: product.fabric,
            selectedColor: colorName,
            selectedColorHex: colorHex,
            price: product.price,
            isSample: product.isSample,
            image: product.images[0] ?? "/images/hero-saree.jpg",
            quantity: qtyToAdd,
          },
        ];
      });

      if (options?.openCart !== false) {
        setIsDrawerOpen(true);
      }
    },
    []
  );

  const removeItem = useCallback((productId: string, selectedColor: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.selectedColor === selectedColor)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, selectedColor: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, selectedColor);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId && item.selectedColor === selectedColor
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const knownSubtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (item.price ?? 0) * item.quantity,
        0
      ),
    [items]
  );

  const hasEnquiryOnlyItems = useMemo(
    () => items.some((item) => item.price === null),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isDrawerOpen,
      totalItems,
      knownSubtotal,
      hasEnquiryOnlyItems,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      isDrawerOpen,
      totalItems,
      knownSubtotal,
      hasEnquiryOnlyItems,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
