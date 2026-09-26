"use client";

import { useState } from "react";
import { Star, ChevronDown, Check, Plus } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    name: "Samantha D.",
    rating: 5,
    date: "August 14, 2026",
    comment:
      "I absolutely love this product! The quality exceeded all expectations, and the fabric feels amazingly soft and structured.",
  },
  {
    id: "r2",
    name: "Alex M.",
    rating: 5,
    date: "August 16, 2026",
    comment:
      "The color is identical to the photos and the fit is perfection. Heavyweight cotton that doesn't lose shape after washing.",
  },
  {
    id: "r3",
    name: "Ethan R.",
    rating: 5,
    date: "August 19, 2026",
    comment:
      "Fit is true to size and the cut is exactly what I was searching for. Fast delivery and premium packaging!",
  },
  {
    id: "r4",
    name: "Liam K.",
    rating: 4,
    date: "August 22, 2026",
    comment:
      "Great garment overall. The stitching is impeccable and feels like a luxury designer piece without the inflated markups.",
  },
];

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<"reviews" | "details" | "faqs">("reviews");
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Accordion open states for FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: ReviewItem = {
      id: "r_" + Date.now(),
      name: newReviewName.trim(),
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setShowReviewModal(false);
    setNewReviewName("");
    setNewReviewComment("");
    setNewReviewRating(5);
  };

  const faqs = [
    {
      q: "How does the sizing run?",
      a: "Our garments run true to size with a tailored, relaxed fit. If you prefer a loose oversized streetwear drape, we recommend ordering one size up.",
    },
    {
      q: "What is your return & exchange policy?",
      a: "We offer a 30-day hassle-free return and exchange policy. Items must be unworn, unwashed, and in their original packaging with tags intact.",
    },
    {
      q: "What are the washing and care instructions?",
      a: "Machine wash cold with like colors inside-out. Avoid chlorine bleach. Tumble dry low or hang dry to preserve garment longevity and color vibrancy.",
    },
    {
      q: "How fast is shipping and delivery?",
      a: "Orders are processed within 24 hours. Standard delivery takes 2-4 business days across all US destinations, and free shipping applies on orders over $150.",
    },
  ];

  return (
    <div className="pt-10 border-t border-neutral-200 space-y-8">
      {/* Tab Navigation Headers */}
      <div className="flex border-b border-neutral-200 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 py-4 text-center transition-all border-b-2 -mb-px ${
            activeTab === "reviews"
              ? "border-black text-black font-bold"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          Rating &amp; Reviews ({reviews.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("details")}
          className={`flex-1 py-4 text-center transition-all border-b-2 -mb-px ${
            activeTab === "details"
              ? "border-black text-black font-bold"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          Product Details
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={`flex-1 py-4 text-center transition-all border-b-2 -mb-px ${
            activeTab === "faqs"
              ? "border-black text-black font-bold"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          FAQs
        </button>
      </div>

      {/* Tab 1: Reviews */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-black">All Reviews</h3>
              <span className="text-xs text-neutral-400">({reviews.length})</span>
            </div>

            <button
              type="button"
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="border border-neutral-200 rounded-3xl p-6 sm:p-7 space-y-3 bg-white shadow-xs"
              >
                <div className="flex text-amber-400 gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 font-bold text-black text-sm">
                  <span>{r.name}</span>
                  <span className="w-4 h-4 bg-emerald-500 rounded-full text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  &quot;{r.comment}&quot;
                </p>

                <p className="text-[11px] text-neutral-400 pt-1">
                  Posted on {r.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Product Details */}
      {activeTab === "details" && (
        <div className="bg-[#F2F0F1] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-base text-black">Specifications</h3>
              <dl className="space-y-2.5 text-xs text-neutral-600">
                <div className="flex justify-between border-b border-neutral-300 pb-2">
                  <dt className="font-semibold text-black">Composition</dt>
                  <dd>100% Combed Heavy Cotton (280 GSM)</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-300 pb-2">
                  <dt className="font-semibold text-black">Fit</dt>
                  <dd>Relaxed Contemporary Silhouette</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-300 pb-2">
                  <dt className="font-semibold text-black">Finish</dt>
                  <dd>Enzyme Washed &amp; Pre-Shrunk</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-300 pb-2">
                  <dt className="font-semibold text-black">Origin</dt>
                  <dd>Ethically Crafted in Portugal</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-base text-black">Garment Care</h3>
              <ul className="space-y-2 text-xs text-neutral-600 list-disc list-inside leading-relaxed">
                <li>Machine wash cold at 30°C (86°F) inside out.</li>
                <li>Do not bleach or dry clean.</li>
                <li>Tumble dry low or lay flat to dry in shade.</li>
                <li>Warm iron on reverse side if desired.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: FAQs */}
      {activeTab === "faqs" && (
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-neutral-200 rounded-2xl bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-black text-sm hover:bg-neutral-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-bold text-lg text-black">Write a Review</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Rating
                </label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReviewRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Jordan P."
                  className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Review Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="What did you like about this product?"
                  className="w-full px-4 py-3 bg-[#F0F0F0] rounded-2xl text-sm text-black outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full text-xs font-semibold text-white bg-black hover:bg-neutral-800 shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
