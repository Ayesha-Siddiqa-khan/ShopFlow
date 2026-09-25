import Link from "next/link";
import { Sparkles, Terminal, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/70 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Shop<span className="text-indigo-400">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Production-grade e-commerce application engineered for hands-on modern DevOps, containerization, and automated CI/CD practices.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              Explore Catalog
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="hover:text-white transition-colors">
                  Electronics & Audio
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="hover:text-white transition-colors">
                  Streetwear & Apparel
                </Link>
              </li>
              <li>
                <Link href="/products?category=home-living" className="hover:text-white transition-colors">
                  Artisanal Home Goods
                </Link>
              </li>
            </ul>
          </div>

          {/* DevOps & Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              DevOps & Engineering
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/api/health" target="_blank" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>/api/health Check</span>
                </Link>
              </li>
              <li>
                <a href="https://github.com/Ayesha-Siddiqa-khan/ShopFlow" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  GitHub Repository ↗
                </a>
              </li>
              <li>
                <span className="text-zinc-500">Docker & Compose Ready</span>
              </li>
              <li>
                <span className="text-zinc-500">Supabase Row-Level Security</span>
              </li>
            </ul>
          </div>

          {/* Admin & Security */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              Management
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/admin" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Control Center</span>
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ShopFlow Inc. Built for Next.js & DevOps practice.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> and precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
