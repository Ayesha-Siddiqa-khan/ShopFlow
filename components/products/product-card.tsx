"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  // calculate simulated discount for SHOP.CO look
  const originalPrice = product.price > 150 ? product.price * 1.25 : null;
  const discountPercent = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : null;

  return (
    <div className="group flex flex-col space-y-3 transition-transform duration-300 hover:-translate-y-1">
      {/* Product Image on #F0EEED rounded background */}
      <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden product-img-bg flex items-center justify-center p-4 shadow-2xs group-hover:shadow-lg transition-all duration-300">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-neutral-400 text-xs">
              No Image
            </div>
          )}
        </Link>

        {/* Wishlist Heart Button (Appears on hover or stays active if liked) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
            isLiked
              ? "bg-white text-rose-500 scale-100 opacity-100"
              : "bg-white/80 backdrop-blur-xs text-neutral-600 opacity-0 group-hover:opacity-100 hover:scale-115 hover:bg-white hover:text-black"
          }`}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-transform duration-150 ${isLiked ? "fill-rose-500 scale-110" : ""}`} />
        </button>

        {/* Slide-Up Quick View Bar */}
        <div className="absolute bottom-3 inset-x-3 z-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
          <Link
            href={`/products/${product.slug}`}
            className="w-full py-2.5 px-3 rounded-xl sm:rounded-2xl bg-black/85 hover:bg-black text-white backdrop-blur-md text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-[1.02]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </Link>
        </div>
      </div>

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
            <span className="text-[11px] font-bold text-[#FF3333] bg-[#FF3333]/10 px-2 py-0.5 rounded-full group-hover:scale-105 transition-transform">
              -{discountPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
