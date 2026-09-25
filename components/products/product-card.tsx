"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // calculate simulated discount for SHOP.CO look
  const originalPrice = product.price > 150 ? product.price * 1.25 : null;
  const discountPercent = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : null;

  return (
    <div className="group flex flex-col space-y-3">
      {/* Product Image on #F0EEED rounded background */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden product-img-bg flex items-center justify-center p-4 transition-transform group-hover:scale-[1.02] duration-300"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400 text-xs">
            No Image
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="space-y-1 text-left">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-black text-sm sm:text-base line-clamp-1 uppercase hover:underline">
            {product.name}
          </h3>
        </Link>

        {/* Rating like 4.5/5 */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-medium text-black">4.5/<span className="text-neutral-500">5</span></span>
        </div>

        {/* Price & Discount Tag */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-lg sm:text-xl font-extrabold text-black">
            {formatPrice(product.price)}
          </span>
          {originalPrice && (
            <span className="text-sm font-bold text-neutral-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {discountPercent && (
            <span className="text-[11px] font-bold text-[#FF3333] bg-[#FF3333]/10 px-2 py-0.5 rounded-full">
              -{discountPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
