"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search, User, Menu, X, Shield, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.4)] group-hover:scale-105 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Shop<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">Flow</span>
              </span>
              <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase font-semibold">
                DevOps Edition
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="/products?category=electronics"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Tech
            </Link>
            <Link
              href="/products?category=fashion"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Apparel
            </Link>
            <Link
              href="/products?category=home-living"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Living
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/products"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/account"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] rounded-lg transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin</span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2.5 bg-slate-900 border border-purple-500/30 hover:border-fuchsia-500 rounded-xl text-zinc-200 hover:text-white transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 text-cyan-400 group-hover:text-fuchsia-400 transition-all" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-[11px] font-bold text-white shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-in zoom-in">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/50 rounded-lg"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/50 rounded-lg"
          >
            All Products
          </Link>
          <Link
            href="/products?category=electronics"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg"
          >
            Electronics
          </Link>
          <Link
            href="/products?category=fashion"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg"
          >
            Fashion
          </Link>
          <Link
            href="/products?category=home-living"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg"
          >
            Home & Living
          </Link>
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-400 hover:text-indigo-300"
            >
              <Shield className="w-4 h-4" /> Admin Console
            </Link>
            <Link
              href="/api/health"
              target="_blank"
              className="text-xs text-zinc-500 hover:text-zinc-400"
            >
              Health Check API ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
