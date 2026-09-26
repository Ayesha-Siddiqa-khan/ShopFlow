"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Clock, Copy, Check } from "lucide-react";

export function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 48,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("SHOP20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-[2.5rem] bg-gradient-to-r from-black via-neutral-900 to-neutral-800 text-white overflow-hidden p-8 sm:p-14 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-neutral-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Text & Pitch */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs shadow-xs">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
              <span className="tracking-wide">LIMITED VIP AUTUMN DROP</span>
            </div>

            <h3 className="font-integral text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              GET 20% OFF ALL NEW ARRIVALS
            </h3>

            <p className="text-neutral-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Elevate your seasonal wardrobe with premium heavyweight silhouettes. Use voucher code below at checkout.
            </p>

            {/* Voucher Code Box */}
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs hover:border-white/40 transition-colors">
                <span className="text-xs uppercase tracking-wider text-neutral-300 font-medium">Code:</span>
                <span className="font-integral text-base sm:text-lg tracking-wider text-white">SHOP20</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1 rounded hover:bg-white/20 text-neutral-300 hover:text-white transition-all active:scale-90 cursor-pointer"
                  title="Copy code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400 scale-110" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <span className="text-xs font-medium text-emerald-400 animate-in fade-in zoom-in-90">
                  Copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* Right: Countdown & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              <Clock className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>Flash Deal Ends In</span>
            </div>

            {/* Countdown Flip Counters */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center font-integral text-2xl sm:text-3xl text-white shadow-inner transition-transform group-hover:scale-105">
                  {pad(timeLeft.hours)}
                </div>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1.5 font-medium">Hours</span>
              </div>

              <span className="font-integral text-2xl text-neutral-500 -mt-5 animate-pulse">:</span>

              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center font-integral text-2xl sm:text-3xl text-white shadow-inner transition-transform group-hover:scale-105">
                  {pad(timeLeft.minutes)}
                </div>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1.5 font-medium">Minutes</span>
              </div>

              <span className="font-integral text-2xl text-neutral-500 -mt-5 animate-pulse">:</span>

              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-orange-500/40 ring-2 ring-orange-500/20 backdrop-blur-md flex items-center justify-center font-integral text-2xl sm:text-3xl text-orange-400 shadow-inner transition-transform group-hover:scale-105">
                  {pad(timeLeft.seconds)}
                </div>
                <span className="text-[11px] text-orange-400/90 uppercase tracking-wider mt-1.5 font-medium">Seconds</span>
              </div>
            </div>

            <Link
              href="/products"
              className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-100 transition-all hover:scale-105 shadow-xl group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />
              <span>Shop Flash Sale</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
