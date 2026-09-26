"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, ShieldCheck, Flame, ShoppingBag } from "lucide-react";

interface LookItem {
  id: number;
  label: string;
  tag: string;
  badge: string;
  rating: string;
  outfitTitle: string;
  outfitPrice: string;
  imageUrl: string;
  productSlug: string;
}

const LOOKS: LookItem[] = [
  {
    id: 1,
    label: "01. Streetwear Luxe",
    tag: "STREETWEAR CAPSULE",
    badge: "🔥 Trending Drop #1",
    rating: "4.9/5 (12.4k reviews)",
    outfitTitle: "Yellow Heavy Crop Fleece",
    outfitPrice: "$120.00",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80",
    productSlug: "t-shirt-with-tape-details",
  },
  {
    id: 2,
    label: "02. Urban Minimalist",
    tag: "SIGNATURE CASUAL",
    badge: "✨ Most Loved Piece",
    rating: "4.9/5 (8.2k reviews)",
    outfitTitle: "Relaxed Vintage Flannel",
    outfitPrice: "$180.00",
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80",
    productSlug: "checkered-shirt",
  },
  {
    id: 3,
    label: "03. Contemporary Tailored",
    tag: "AUTUMN EDIT",
    badge: "⚡ High-Mobility Layer",
    rating: "5.0/5 (5.1k reviews)",
    outfitTitle: "Wool Blend Heritage Overshirt",
    outfitPrice: "$175.00",
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1000&auto=format&fit=crop&q=80",
    productSlug: "heritage-overshirt",
  },
];

export function HeroInteractive() {
  const [selectedLook, setSelectedLook] = useState<LookItem>(LOOKS[0]);
  const [showHotspot, setShowHotspot] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F0F1] via-[#FAF9F6] to-white pb-16 pt-8 sm:pt-14 sm:pb-24 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-7">
            {/* Top Pill Accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-black animate-in fade-in duration-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tracking-wide uppercase text-[11px] font-bold">2026 Autumn Capsule</span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500 text-[11px] font-normal">Over 2,000+ Designer Pieces</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-integral text-4xl sm:text-6xl lg:text-7xl text-black leading-[1.03] tracking-tight">
              FIND CLOTHES THAT MATCH YOUR STYLE
            </h1>

            {/* Subtitle */}
            <p className="text-base text-neutral-600 max-w-xl leading-relaxed">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style with heavyweight luxury fabrics.
            </p>

            {/* CTAs & Lookbook Selector */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-[1.02] shadow-lg shadow-black/10 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/products?category=casual"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-neutral-200 text-black text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-xs"
              >
                <span>Explore Looks</span>
              </Link>
            </div>

            {/* Interactive Look Switcher Pills */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Featured Styles
              </div>
              <div className="flex flex-wrap gap-2">
                {LOOKS.map((look) => (
                  <button
                    key={look.id}
                    type="button"
                    onClick={() => setSelectedLook(look)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      selectedLook.id === look.id
                        ? "bg-black text-white shadow-sm"
                        : "bg-white border border-neutral-200 text-neutral-600 hover:text-black hover:border-black/50"
                    }`}
                  >
                    {look.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-200/80 max-w-lg">
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-black font-integral">200+</h3>
                <p className="text-xs text-neutral-500 mt-0.5">International Brands</p>
              </div>
              <div className="border-l border-neutral-200 pl-6">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-black font-integral">2,000+</h3>
                <p className="text-xs text-neutral-500 mt-0.5">High-Quality Items</p>
              </div>
              <div className="border-l border-neutral-200 pl-6">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-black font-integral">30,000+</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Featured Photo Box */}
            <div className="relative w-full max-w-md aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-[#F0EEED] group">
              <Image
                key={selectedLook.id}
                src={selectedLook.imageUrl}
                alt={selectedLook.outfitTitle}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-top transition-all duration-700 group-hover:scale-105"
              />

              {/* Subtle Luxury Gradient Overlay at the base */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Interactive Outfit Tag Hotspot */}
              <div className="absolute top-1/2 right-12 z-20">
                <button
                  type="button"
                  onClick={() => setShowHotspot(!showHotspot)}
                  className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-black border border-white hover:scale-110 transition-transform cursor-pointer"
                  title="View outfit details"
                  aria-label="View outfit details"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
                </button>

                {/* Hotspot Card popover */}
                {showHotspot && (
                  <div className="absolute right-0 bottom-10 w-52 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-neutral-200 text-left animate-in fade-in zoom-in-95 duration-150">
                    <p className="text-[10px] uppercase font-bold text-neutral-400">Featured Outfit</p>
                    <p className="font-bold text-black text-xs mt-0.5 line-clamp-1">{selectedLook.outfitTitle}</p>
                    <p className="font-extrabold text-black text-sm mt-1">{selectedLook.outfitPrice}</p>
                    <Link
                      href={`/products/${selectedLook.productSlug}`}
                      className="mt-2 block w-full py-1.5 text-center bg-black text-white text-[11px] font-semibold rounded-full hover:bg-neutral-800"
                    >
                      View Piece
                    </Link>
                  </div>
                )}
              </div>

              {/* Bottom Card Inside Image */}
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                      {selectedLook.tag}
                    </span>
                    <span className="font-bold text-black text-xs sm:text-sm line-clamp-1">
                      {selectedLook.outfitTitle}
                    </span>
                  </div>
                  <Link
                    href={`/products/${selectedLook.productSlug}`}
                    className="p-2 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors shadow-sm"
                    aria-label="View product"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Top Left Luxury Badge */}
            <div className="absolute -top-3 -left-4 sm:-left-6 z-30 bg-white/90 backdrop-blur-md border border-neutral-200/80 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce duration-1000">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-xs font-bold text-black">{selectedLook.badge}</span>
            </div>

            {/* Floating Bottom Right Rating Card */}
            <div className="absolute -bottom-4 -right-4 sm:-right-6 z-30 bg-white/95 backdrop-blur-md border border-neutral-200/80 p-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-[11px] font-bold text-black mt-0.5">{selectedLook.rating}</p>
              </div>
            </div>

            {/* Subtle Luxury Sparkles */}
            <Sparkles className="absolute top-2 right-4 w-10 h-10 text-black/70 animate-pulse pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
