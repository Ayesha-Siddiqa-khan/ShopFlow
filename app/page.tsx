import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, RefreshCw, Box, Truck, Star, ArrowUpRight } from "lucide-react";
import { getProducts, getCategories } from "@/lib/db";
import { ProductCard } from "@/components/products/product-card";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const featuredProducts = products.slice(0, 6);
  const heroProduct = products[0] || null;

  return (
    <div className="space-y-24 pb-24">
      {/* Modern High-Impact Split Hero */}
      <section className="relative pt-8 md:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Spring 2026 Collection Live</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
              Design that inspires. <br />
              <span className="gradient-text">Engineered to last.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Discover expertly curated lifestyle electronics, minimalist streetwear, and bespoke artisan homeware crafted for modern living.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white gradient-accent shadow-xl shadow-indigo-500/25 hover:scale-[1.02] transition-all"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products?category=electronics"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-slate-700 bg-white border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
              >
                <span>Browse Tech</span>
              </Link>
            </div>

            {/* Social proof trust bar */}
            <div className="pt-8 border-t border-slate-200/70 flex items-center gap-6 text-xs text-slate-500">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center font-bold text-[10px] text-slate-700">AK</div>
                <div className="w-8 h-8 rounded-full bg-indigo-200 border-2 border-white flex items-center justify-center font-bold text-[10px] text-indigo-700">SR</div>
                <div className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-white flex items-center justify-center font-bold text-[10px] text-emerald-700">ML</div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="font-bold text-slate-800 ml-1">4.9/5</span>
                </div>
                <span>Over 12,000+ satisfied worldwide clients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-panel p-4 shadow-2xl border border-slate-200/80">
              {heroProduct && (
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={heroProduct.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"}
                    alt={heroProduct.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold bg-white/95 text-slate-900 rounded-full shadow-md backdrop-blur-md">
                      Featured Pick
                    </span>
                  </div>
                </div>
              )}

              <div className="p-4 pt-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {heroProduct ? heroProduct.name : "Aura Flow Wireless"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Studio sound acoustic tuning & active noise cancellation
                  </p>
                </div>
                <Link
                  href={`/products/${heroProduct?.slug || ""}`}
                  className="p-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl shadow-md transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-panel glow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Swift Express Dispatch</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complimentary expedited tracking on all qualifying orders over $150.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Secure Row-Level Auth</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Granular cryptographic database policies isolate user carts and orders.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Zero-Friction Returns</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enjoy a 30-day money-back guarantee with prepaid return labels included.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Automated CI/CD Quality</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              High-availability Kubernetes deployment on AWS EC2 with continuous integration.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Curated Collections
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select a category to browse precision-selected pieces.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group p-6 rounded-2xl glass-panel glow-card flex flex-col justify-between h-48 border border-slate-200/80"
            >
              <div>
                <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase">
                  Collection
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-indigo-600 pt-4 border-t border-slate-100">
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">
              Trending Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Highlights
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>View Full Catalog ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-14 text-center text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Experience the Future of E-Commerce
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Engineered with modern Next.js 16 App Router, Supabase PostgreSQL with cryptographic RLS policies, and containerized Docker CI/CD on AWS.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/products"
                className="px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all text-sm shadow-lg hover:scale-[1.02]"
              >
                Shop Full Collection
              </Link>
              <Link
                href="/api/health"
                target="_blank"
                className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all text-sm"
              >
                Inspect Health Metrics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
