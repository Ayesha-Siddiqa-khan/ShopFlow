import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, RefreshCw, Box, Truck } from "lucide-react";
import { getProducts, getCategories } from "@/lib/db";
import { ProductCard } from "@/components/products/product-card";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Next.js 16 + Supabase + Docker Powered</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Crafted for speed. <br />
            <span className="gradient-text drop-shadow-[0_0_25px_rgba(217,70,239,0.35)]">Engineered for scale.</span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore curated modern electronics, minimalist apparel, and artisan homeware. Complete with instant checkout, live order tracking, and production DevOps instrumentation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white gradient-accent shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-[1.03] transition-all"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/admin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-zinc-200 bg-slate-900/90 border border-purple-500/30 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-panel glow-card space-y-3 border-t-2 border-t-cyan-500/50">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm tracking-wide">Swift Express Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complimentary expedited tracking on all qualifying orders over $150.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glow-card space-y-3 border-t-2 border-t-fuchsia-500/50">
            <div className="w-11 h-11 rounded-xl bg-fuchsia-950/80 border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.3)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm tracking-wide">Supabase Row-Level Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Granular cryptographic database policies isolate user carts and orders.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glow-card space-y-3 border-t-2 border-t-purple-500/50">
            <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm tracking-wide">Containerized Deployment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-stage Alpine Docker container ready for AWS and Kubernetes.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glow-card space-y-3 border-t-2 border-t-emerald-500/50">
            <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm tracking-wide">Automated CI/CD Quality</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              GitHub Actions build, lint, and test validation on every git push.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Curated Collections
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Select a category to browse precision-selected pieces.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
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
              className="group p-6 rounded-2xl glass-panel glow-card flex flex-col justify-between h-44"
            >
              <div>
                <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase">
                  Collection
                </span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:text-white pt-4">
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
            <div className="inline-block text-xs font-mono uppercase tracking-widest text-indigo-400 mb-1">
              Trending Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Highlights
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
          >
            <span>View Full Catalog ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to action section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-indigo-500/20 p-8 sm:p-14 text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to test and deploy ShopFlow?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Spin up with Docker Compose, run production health diagnostics, or integrate the Supabase PostgreSQL database schema with automated RLS.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/products"
                className="px-6 py-3 rounded-xl font-semibold text-white gradient-accent shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-transform text-sm"
              >
                Shop Now
              </Link>
              <Link
                href="/api/health"
                target="_blank"
                className="px-6 py-3 rounded-xl font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 hover:text-white transition-all text-sm"
              >
                Test Health Endpoint
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
