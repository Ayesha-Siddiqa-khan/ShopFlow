import Link from "next/link";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import { getProducts, getCategories } from "@/lib/db";
import { ProductCard } from "@/components/products/product-card";
import { CustomerReviews } from "@/components/home/customer-reviews";

export default async function HomePage() {
  const [, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const newArrivals = products.slice(0, 4);
  const topSelling = products.slice(4, 8);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section exactly like SHOP.CO */}
      <section className="shop-hero-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <h1 className="font-integral text-4xl sm:text-6xl lg:text-7xl text-black leading-[1.05]">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>

              <p className="text-sm sm:text-base text-neutral-600 max-w-lg leading-relaxed">
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
              </p>

              <div>
                <Link
                  href="/products"
                  className="shop-pill-btn inline-block px-14 py-4 text-sm font-semibold tracking-wide"
                >
                  Shop Now
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-6 sm:pt-10 max-w-md divide-x divide-neutral-300">
                <div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-black">200+</h3>
                  <p className="text-xs text-neutral-500 mt-1">International Brands</p>
                </div>
                <div className="pl-6">
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-black">2,000+</h3>
                  <p className="text-xs text-neutral-500 mt-1">High-Quality Products</p>
                </div>
                <div className="pl-6">
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-black">30,000+</h3>
                  <p className="text-xs text-neutral-500 mt-1">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image with Star Accents */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              <div className="relative w-full max-w-lg aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80"
                  alt="Fashion Model Couple"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-top"
                />
              </div>

              {/* Decorative Stars from SHOP.CO template */}
              <Sparkle className="absolute -top-4 right-4 w-14 h-14 text-black fill-black animate-pulse" />
              <Sparkle className="absolute top-1/2 left-0 w-8 h-8 text-black fill-black" />
            </div>

          </div>
        </div>
      </section>

      {/* Brand Logos Bar (VERSACE, ZARA, GUCCI, PRADA, CALVIN KLEIN) */}
      <section className="brand-bar py-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-8 text-white font-integral text-xl sm:text-3xl tracking-widest opacity-90">
            <span>VERSACE</span>
            <span>ZARA</span>
            <span>GUCCI</span>
            <span>PRADA</span>
            <span>Calvin Klein</span>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-12">
          <h2 className="font-integral text-3xl sm:text-5xl text-black">
            NEW ARRIVALS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block px-14 py-3.5 border border-neutral-200 rounded-full text-sm font-semibold text-black hover:bg-neutral-100 transition-colors"
          >
            View All
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-neutral-200" />
      </div>

      {/* TOP SELLING Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-integral text-3xl sm:text-5xl text-black">
            TOP SELLING
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block px-14 py-3.5 border border-neutral-200 rounded-full text-sm font-semibold text-black hover:bg-neutral-100 transition-colors"
          >
            View All
          </Link>
        </div>
      </section>

      {/* BROWSE BY DRESS STYLE (Big Modern Blocks from SHOP.CO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shop-hero-bg rounded-[2.5rem] p-6 sm:p-14">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-integral text-3xl sm:text-5xl text-black">
              BROWSE BY DRESS STYLE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Casual */}
            <Link
              href="/products?category=casual"
              className="md:col-span-4 category-card-bg relative h-64 overflow-hidden p-6 group rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent z-1 pointer-events-none" />
              <h3 className="text-2xl font-bold text-black z-10 relative">Casual</h3>
              <Image
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80"
                alt="Casual Style"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Formal */}
            <Link
              href="/products?category=formal"
              className="md:col-span-8 category-card-bg relative h-64 overflow-hidden p-6 group rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent z-1 pointer-events-none" />
              <h3 className="text-2xl font-bold text-black z-10 relative">Formal</h3>
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
                alt="Formal Style"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Party */}
            <Link
              href="/products?category=party"
              className="md:col-span-8 category-card-bg relative h-64 overflow-hidden p-6 group rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent z-1 pointer-events-none" />
              <h3 className="text-2xl font-bold text-black z-10 relative">Party</h3>
              <Image
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1000&auto=format&fit=crop&q=80"
                alt="Party Style"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Gym */}
            <Link
              href="/products?category=gym"
              className="md:col-span-4 category-card-bg relative h-64 overflow-hidden p-6 group rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent z-1 pointer-events-none" />
              <h3 className="text-2xl font-bold text-black z-10 relative">Gym</h3>
              <Image
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
                alt="Gym Style"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Customer Reviews Carousel */}
      <CustomerReviews />

    </div>
  );
}
