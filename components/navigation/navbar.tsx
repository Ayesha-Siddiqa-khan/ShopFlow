"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-xs py-2 px-4 text-center font-normal flex items-center justify-center gap-2">
        <span>Sign up and get 20% off to your first order.</span>
        <Link href="/register" className="underline font-semibold hover:text-neutral-300">
          Sign Up Now
        </Link>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-10">
            
            {/* Mobile menu trigger + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1 text-black"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="font-integral text-2xl sm:text-3xl text-black tracking-tighter">
                SHOP.CO
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-normal text-black whitespace-nowrap">
              <div className="relative group flex items-center gap-1 cursor-pointer hover:text-neutral-600">
                <span>Shop</span>
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              </div>
              <Link href="/products?category=casual" className="hover:text-neutral-600 transition-colors">
                On Sale
              </Link>
              <Link href="/products" className="hover:text-neutral-600 transition-colors">
                New Arrivals
              </Link>
              <Link href="/products?category=formal" className="hover:text-neutral-600 transition-colors">
                Brands
              </Link>
            </nav>

            {/* Search Bar matching SHOP.CO */}
            <div className="hidden sm:flex flex-1 max-w-xl relative items-center">
              <div className="absolute left-4 text-neutral-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-[#f0f0f0] text-black text-sm rounded-full pl-11 pr-4 py-2.5 outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-4 text-black">
              <button className="sm:hidden p-1 text-black" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>

              <Link href="/cart" className="relative p-1 hover:opacity-75 transition-opacity" aria-label="Shopping Cart">
                <ShoppingCart className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                    {totalCount}
                  </span>
                )}
              </Link>

              <Link href="/account" className="p-1 hover:opacity-75 transition-opacity" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-200 bg-white px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-4 text-base font-medium text-black">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>Shop All</Link>
              <Link href="/products?category=casual" onClick={() => setMobileMenuOpen(false)}>On Sale</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
              <Link href="/products?category=formal" onClick={() => setMobileMenuOpen(false)}>Brands</Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-neutral-500 pt-2 border-t">Admin Dashboard</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
