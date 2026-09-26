"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";

export interface CartItemEntry {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItemEntry[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemEntry[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("shopflow_cart");
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error("Failed to load cart from localStorage", e);
      }
    }
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("shopflow_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1, size = "Large", color = "White") => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.product.id === product.id &&
          (i.size || "Large") === size &&
          (i.color || "White") === color
      );
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock_quantity || 99);
        return prev.map((i) =>
          i.product.id === product.id &&
          (i.size || "Large") === size &&
          (i.color || "White") === color
            ? { ...i, quantity: newQty }
            : i
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: Math.min(quantity, product.stock_quantity || 99),
          size,
          color,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        const match =
          i.product.id === productId &&
          (size === undefined || i.size === size) &&
          (color === undefined || i.color === color);
        if (match) {
          const max = i.product.stock_quantity > 0 ? i.product.stock_quantity : 99;
          return { ...i, quantity: Math.min(quantity, max) };
        }
        return i;
      })
    );
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.product.id === productId &&
            (size === undefined || i.size === size) &&
            (color === undefined || i.color === color)
          )
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% estimated tax
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.0; // Free shipping over $150
  const total = subtotal + tax + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        subtotal,
        tax,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
