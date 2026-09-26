"use client";

import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "August 14, 2026",
    comment:
      "I am blown away by the quality and style of the clothes I received from SHOP.CO. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    date: "August 18, 2026",
    comment:
      "Finding clothes that align with my personal style used to be a challenge until I discovered SHOP.CO. The range of options they offer is truly remarkable and on-trend.",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    date: "August 20, 2026",
    comment:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon SHOP.CO. The selection of clothes is not only diverse but also on-point with trends.",
  },
  {
    id: 4,
    name: "Olivia T.",
    rating: 5,
    date: "August 24, 2026",
    comment:
      "The stitching and fabric weight are top-tier luxury grade. Everything fits true to size and arrived within 48 hours in immaculate packaging. 10/10 shopping experience!",
  },
  {
    id: 5,
    name: "Liam H.",
    rating: 5,
    date: "September 02, 2026",
    comment:
      "Exceptional customer care and stellar quality. The colors in person match the photos exactly, and the denim washes are deeply rich without any fading after multiple cycles.",
  },
  {
    id: 6,
    name: "Emma W.",
    rating: 5,
    date: "September 10, 2026",
    comment:
      "My new favorite online clothing brand! Minimalist silhouettes, heavy GSM cotton, and effortless styling. I receive compliments every time I wear their pieces out.",
  },
];

export function CustomerReviews() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  // Get current 3 visible reviews (wrapping around)
  const visibleReviews = [
    REVIEWS[startIndex % REVIEWS.length],
    REVIEWS[(startIndex + 1) % REVIEWS.length],
    REVIEWS[(startIndex + 2) % REVIEWS.length],
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-integral text-2xl sm:text-4xl text-black">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 border border-neutral-200 rounded-full hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-90 transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="Previous review"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 border border-neutral-200 rounded-full hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-90 transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="Next review"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <div
            key={`${review.id}-${startIndex}`}
            className="group border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-3 bg-white shadow-xs hover:border-black/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-in fade-in duration-300"
          >
            <div className="flex text-amber-400 gap-1 transition-transform group-hover:scale-105 origin-left duration-200">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <div className="flex items-center gap-1.5 font-bold text-black text-base">
              <span>{review.name}</span>
              <span className="w-4 h-4 bg-emerald-500 rounded-full text-white flex items-center justify-center text-[10px] shadow-xs group-hover:scale-125 transition-transform duration-200">
                ✓
              </span>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed min-h-[4.5rem]">
              &quot;{review.comment}&quot;
            </p>

            <p className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
              {review.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
