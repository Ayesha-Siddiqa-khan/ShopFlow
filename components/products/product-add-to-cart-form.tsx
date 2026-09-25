"use client";

import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";

interface ProductAddToCartFormProps {
  product: Product;
}

export function ProductAddToCartForm({ product }: ProductAddToCartFormProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState("Olive");
  const [isAdded, setIsAdded] = useState(false);
  const isOutOfStock = product.stock_quantity <= 0;
  const maxStock = product.stock_quantity || 1;

  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const colors = [
    { name: "Olive", hex: "#4F583E" },
    { name: "Forest", hex: "#314F40" },
    { name: "Navy", hex: "#31344F" },
  ];

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
    <form onSubmit={handleSubmit} className="space-y-6 pt-4 border-t border-neutral-200">
      {/* Select Colors */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
          Select Colors
        </span>
        <div className="flex items-center gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedColor(c.name)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                selectedColor === c.name ? "ring-2 ring-offset-2 ring-black" : ""
              }`}
              style={{ backgroundColor: c.hex }}
              aria-label={c.name}
            >
              {selectedColor === c.name && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Choose Size */}
      <div className="space-y-3 pt-2 border-t border-neutral-200">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
          Choose Size
        </span>
        <div className="flex flex-wrap gap-2.5">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedSize(s)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
                selectedSize === s
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector + Add To Cart Pill */}
      <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between bg-[#F0F0F0] rounded-full px-4 py-2.5 w-36">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1 || isOutOfStock}
            className="p-1 text-black hover:opacity-60 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="font-bold text-sm text-black">
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= maxStock || isOutOfStock}
            className="p-1 text-black hover:opacity-60 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          type="submit"
          disabled={isOutOfStock}
          className={`flex-1 py-3.5 rounded-full font-semibold text-sm transition-all shadow-md ${
            isOutOfStock
              ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              : isAdded
              ? "bg-emerald-600 text-white"
              : "bg-black hover:bg-neutral-800 text-white hover:scale-[1.01]"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </form>
  );
}
