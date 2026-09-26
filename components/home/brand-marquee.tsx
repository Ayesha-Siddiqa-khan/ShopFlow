"use client";

import Link from "next/link";
import { Sparkle } from "lucide-react";

const BRANDS = [
  { name: "VERSACE", slug: "versace" },
  { name: "ZARA", slug: "zara" },
  { name: "GUCCI", slug: "gucci" },
  { name: "PRADA", slug: "prada" },
  { name: "CALVIN KLEIN", slug: "calvin-klein" },
  { name: "BALENCIAGA", slug: "balenciaga" },
  { name: "SAINT LAURENT", slug: "saint-laurent" },
  { name: "BURBERRY", slug: "burberry" },
  { name: "DIOR", slug: "dior" },
  { name: "CHANEL", slug: "chanel" },
];

export function BrandMarquee() {
  // Duplicate array for seamless infinite scroll
  const marqueeList = [...BRANDS, ...BRANDS];

  return (
    <div className="relative bg-black py-7 sm:py-9 overflow-hidden select-none border-y border-neutral-900">
      {/* Left & Right Subtle Fade Gradients for Luxury depth */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Ticker Track */}
      <div className="animate-marquee flex items-center gap-10 sm:gap-16 whitespace-nowrap">
        {marqueeList.map((brand, idx) => (
          <Link
            key={`${brand.name}-${idx}`}
            href={`/products?search=${encodeURIComponent(brand.name)}`}
            className="flex items-center gap-10 sm:gap-16 group"
          >
            <span className="font-integral text-xl sm:text-3xl text-neutral-300 tracking-widest uppercase transition-colors duration-200 group-hover:text-white group-hover:scale-105 inline-block">
              {brand.name}
            </span>
            <Sparkle className="w-4 h-4 text-neutral-600 fill-neutral-600 transition-colors group-hover:text-amber-400 group-hover:fill-amber-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
