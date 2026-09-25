import Link from "next/link";
import { Sparkles, Terminal, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-12 text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                Shop<span className="text-indigo-600">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Curated everyday luxury products engineered for modern lifestyles and built with production DevOps standards.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-indigo-600 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="hover:text-indigo-600 transition-colors">
                  Tech & Wireless Audio
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="hover:text-indigo-600 transition-colors">
                  Minimalist Streetwear
                </Link>
              </li>
              <li>
                <Link href="/products?category=home-living" className="hover:text-indigo-600 transition-colors">
                  Artisanal Home Goods
                </Link>
              </li>
            </ul>
          </div>

          {/* DevOps & Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Architecture & Stack
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/api/health" target="_blank" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Health Metrics Endpoint</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  Next.js 16 App Router
                </a>
              </li>
              <li>
                <a href="https://supabase.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  Supabase PostgreSQL + RLS
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Subscribe for new product drops and exclusive promotional discounts.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900"
              />
              <button
                type="button"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 ShopFlow Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for high-performance commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
