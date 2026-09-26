"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  mainImageUrl: string;
  productName: string;
}

export function ProductGallery({ mainImageUrl, productName }: ProductGalleryProps) {
  // Use multiple simulated photo angles for rich ecommerce experience
  const images = [
    mainImageUrl,
    mainImageUrl,
    mainImageUrl,
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 items-start w-full">
      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-3 w-full sm:w-28 overflow-x-auto sm:overflow-visible shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`relative aspect-square w-20 sm:w-full rounded-2xl overflow-hidden product-img-bg p-1.5 cursor-pointer transition-all duration-200 focus:outline-none ${
              selectedIndex === idx
                ? "border-2 border-black scale-[1.02] shadow-sm"
                : "border border-neutral-200 opacity-70 hover:opacity-100"
            }`}
          >
            {img && (
              <Image
                src={img}
                alt={`${productName} view ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover object-center rounded-xl"
              />
            )}
          </button>
        ))}
      </div>

      {/* Main Big Image */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden product-img-bg flex items-center justify-center p-6 border border-neutral-100 shadow-xs">
        {images[selectedIndex] ? (
          <Image
            src={images[selectedIndex]}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover object-center transition-all duration-300"
          />
        ) : (
          <div className="text-neutral-400 text-sm">No Image Available</div>
        )}
      </div>
    </div>
  );
}
