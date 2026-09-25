"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";

interface ProductAddToCartFormProps {
  product: Product;
}

export function ProductAddToCartForm({ product }: ProductAddToCartFormProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const isOutOfStock = product.stock_quantity <= 0;
  const maxStock = product.stock_quantity || 1;

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between sm:justify-start bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 w-full sm:w-36">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1 || isOutOfStock}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="font-semibold text-sm text-zinc-100 px-4">
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= maxStock || isOutOfStock}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add Button */}
        <button
          type="submit"
          disabled={isOutOfStock}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
            isOutOfStock
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
              : isAdded
              ? "bg-emerald-600 text-white shadow-emerald-600/30"
              : "gradient-accent text-white shadow-indigo-600/30 hover:scale-[1.01]"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart!</span>
            </>
          ) : isOutOfStock ? (
            <span>Sold Out</span>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
