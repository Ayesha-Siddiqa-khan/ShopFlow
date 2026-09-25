"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const isOutOfStock = product.stock_quantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl glass-panel glow-card overflow-hidden transition-all duration-300">
      {/* Product Image Box */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-zinc-900">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500 text-sm">
            No Image
          </div>
        )}

        {/* Stock status badge */}
        <div className="absolute top-3 left-3 z-10">
          {isOutOfStock ? (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-rose-950/80 text-rose-300 border border-rose-800/60 rounded-full backdrop-blur-md">
              Out of Stock
            </span>
          ) : product.stock_quantity < 5 ? (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-amber-950/80 text-amber-300 border border-amber-800/60 rounded-full backdrop-blur-md">
              Only {product.stock_quantity} left
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-emerald-950/70 text-emerald-300 border border-emerald-800/40 rounded-full backdrop-blur-md">
              In Stock
            </span>
          )}
        </div>

        {/* Category tag */}
        {product.category?.name && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-1 text-[11px] font-medium tracking-wide bg-zinc-900/80 text-zinc-300 border border-zinc-700/60 rounded-full backdrop-blur-md">
              {product.category.name}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/products/${product.slug}`} className="group-hover:text-indigo-400 transition-colors">
          <h3 className="font-semibold text-zinc-100 text-base line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-500 block">Price</span>
            <span className="text-lg font-bold text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/products/${product.slug}`}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-all"
              title="View Details"
              aria-label="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md ${
                isOutOfStock
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-800"
                  : isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 hover:scale-[1.02]"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
