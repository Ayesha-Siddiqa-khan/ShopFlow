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
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl gradient-accent flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center">
                Shop<span className="text-indigo-600">Flow</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Modern Commerce
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/products?category=electronics"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Tech & Audio
            </Link>
            <Link
              href="/products?category=fashion"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Apparel
            </Link>
            <Link
              href="/products?category=home-living"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Home & Living
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/products"
              className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/account"
              className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 hover:bg-indigo-100 rounded-xl transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Admin</span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-xl text-slate-700 hover:text-indigo-600 transition-all shadow-sm group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white shadow-md">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 px-6 py-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-900 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-700 hover:text-indigo-600"
            >
              All Products
            </Link>
            <Link
              href="/products?category=electronics"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-700 hover:text-indigo-600"
            >
              Tech & Audio
            </Link>
            <Link
              href="/products?category=fashion"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-700 hover:text-indigo-600"
            >
              Apparel
            </Link>
            <Link
              href="/products?category=home-living"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-700 hover:text-indigo-600"
            >
              Home & Living
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-indigo-600 flex items-center gap-2 pt-2 border-t border-slate-100"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
