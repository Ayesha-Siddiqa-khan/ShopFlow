"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, Check, Star } from "lucide-react";
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
    <div className="group relative flex flex-col rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden">
      {/* Product Image Box */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 text-sm">
            No Image
          </div>
        )}

        {/* Stock status badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          {isOutOfStock ? (
            <span className="px-3 py-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-full shadow-sm">
              Out of Stock
            </span>
          ) : product.stock_quantity < 5 ? (
            <span className="px-3 py-1 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-full shadow-sm">
              Only {product.stock_quantity} left
            </span>
          ) : (
            <span className="px-3 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full shadow-sm">
              In Stock
            </span>
          )}
        </div>

        {/* Category tag */}
        {product.category?.name && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="px-3 py-1 text-[11px] font-semibold bg-white/90 text-slate-700 border border-slate-200/80 rounded-full backdrop-blur-md shadow-sm">
              {product.category.name}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-1 text-amber-500 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
          <span className="text-[11px] font-medium text-slate-400 ml-1">(4.9)</span>
        </div>

        <Link href={`/products/${product.slug}`} className="group-hover:text-indigo-600 transition-colors">
          <h3 className="font-bold text-slate-900 text-base line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Price</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="p-2.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              title="View Details"
              aria-label="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm ${
                isOutOfStock
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.02] shadow-indigo-600/20"
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
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
