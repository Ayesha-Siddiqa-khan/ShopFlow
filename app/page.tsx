import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProducts, getCategories } from "@/lib/db";
import { ProductCard } from "@/components/products/product-card";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { HeroInteractive } from "@/components/home/hero-interactive";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { ValuePillars } from "@/components/home/value-pillars";
import { FlashSaleBanner } from "@/components/home/flash-sale-banner";

export default async function HomePage() {
  const [, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const newArrivals = products.slice(0, 4);
  const topSelling = products.slice(4, 8);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      
      {/* Interactive Luxury Hero Section */}
      <HeroInteractive />

      {/* Infinite Animated Brand Marquee */}
      <BrandMarquee />

      {/* 4-Pillar Luxury Trust & Guarantee Bar */}
      <ValuePillars />

      {/* NEW ARRIVALS Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
            Season Essentials
          </span>
          <h2 className="font-integral text-3xl sm:text-5xl text-black">
            NEW ARRIVALS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-black to-transparent rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 px-14 py-3.5 border border-neutral-300 rounded-full text-sm font-semibold text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Luxury Flash Deal VIP Countdown Banner */}
      <FlashSaleBanner />

      {/* TOP SELLING Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
            Most Popular
          </span>
          <h2 className="font-integral text-3xl sm:text-5xl text-black">
            TOP SELLING
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-black to-transparent rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 px-14 py-3.5 border border-neutral-300 rounded-full text-sm font-semibold text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* BROWSE BY DRESS STYLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shop-hero-bg rounded-[2.5rem] p-6 sm:p-14 shadow-sm border border-neutral-200/50">
          <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">
              Curated Wardrobe
            </span>
            <h2 className="font-integral text-3xl sm:text-5xl text-black">
              BROWSE BY DRESS STYLE
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-black to-transparent rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Casual */}
            <Link
              href="/products?category=casual"
              className="md:col-span-4 category-card-bg relative h-64 overflow-hidden p-6 group rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent z-1 pointer-events-none" />
              <div className="z-10 relative">
                <h3 className="text-2xl font-bold text-black group-hover:translate-x-1 transition-transform duration-300">Casual</h3>
                <span className="text-xs text-neutral-500 font-medium">120+ Products</span>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80"
                alt="Casual Style"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-5 right-5 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Formal */}
            <Link
              href="/products?category=formal"
              className="md:col-span-8 category-card-bg relative h-64 overflow-hidden p-6 group rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent z-1 pointer-events-none" />
              <div className="z-10 relative">
                <h3 className="text-2xl font-bold text-black group-hover:translate-x-1 transition-transform duration-300">Formal</h3>
                <span className="text-xs text-neutral-500 font-medium">85+ Products</span>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
                alt="Formal Style"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-5 right-5 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Party */}
            <Link
              href="/products?category=party"
              className="md:col-span-8 category-card-bg relative h-64 overflow-hidden p-6 group rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent z-1 pointer-events-none" />
              <div className="z-10 relative">
                <h3 className="text-2xl font-bold text-black group-hover:translate-x-1 transition-transform duration-300">Party</h3>
                <span className="text-xs text-neutral-500 font-medium">95+ Products</span>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1000&auto=format&fit=crop&q=80"
                alt="Party Style"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-5 right-5 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Gym */}
            <Link
              href="/products?category=gym"
              className="md:col-span-4 category-card-bg relative h-64 overflow-hidden p-6 group rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent z-1 pointer-events-none" />
              <div className="z-10 relative">
                <h3 className="text-2xl font-bold text-black group-hover:translate-x-1 transition-transform duration-300">Gym</h3>
                <span className="text-xs text-neutral-500 font-medium">60+ Products</span>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
                alt="Gym Style"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-5 right-5 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Customer Reviews Carousel */}
      <CustomerReviews />

    </div>
  );
}
