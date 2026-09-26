"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, User, Menu, X, ChevronDown, Sparkles, Shirt, Award, Flame, Dumbbell } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const router = useRouter();
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/products");
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Banner - standard and clean, always visible */}
      <div className="bg-black text-white text-xs py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 font-normal">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            Sign up and get 20% off to your first order.
          </span>
          <Link href="/register" className="underline font-semibold hover:text-neutral-300 ml-1">
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-neutral-100 shadow-xs">
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
              
              {/* Interactive Shop Dropdown (Hovers and Opens) */}
              <div
                ref={dropdownRef}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
                className="relative py-2"
              >
                <button
                  type="button"
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  className="flex items-center gap-1 cursor-pointer font-medium text-black hover:text-neutral-600 focus:outline-none"
                  aria-expanded={shopDropdownOpen}
                >
                  <span>Shop</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${shopDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu Modal */}
                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="space-y-1">
                      <Link
                        href="/products"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-neutral-700" />
                        <div>
                          <div>All Products</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Explore full catalog</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=casual"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-colors"
                      >
                        <Shirt className="w-4 h-4 text-neutral-700" />
                        <div>
                          <div>Casual Wear</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Tees, denim & everyday</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=formal"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-colors"
                      >
                        <Award className="w-4 h-4 text-neutral-700" />
                        <div>
                          <div>Formal Attire</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Tailored shirts & blazers</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=party"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-colors"
                      >
                        <Flame className="w-4 h-4 text-neutral-700" />
                        <div>
                          <div>Party & Night</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Bold statements & jackets</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=gym"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-colors"
                      >
                        <Dumbbell className="w-4 h-4 text-neutral-700" />
                        <div>
                          <div>Gym & Active</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Athletic fits & runners</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
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
            <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl relative items-center">
              <button
                type="submit"
                className="absolute left-4 text-neutral-400 hover:text-black transition-colors focus:outline-none"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-[#f0f0f0] text-black text-sm rounded-full pl-11 pr-4 py-2.5 outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-black"
              />
            </form>

            {/* Action Icons */}
            <div className="flex items-center gap-4 text-black">
              <Link href="/products" className="sm:hidden p-1 text-black" aria-label="Search">
                <Search className="w-5 h-5" />
              </Link>

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
              <div className="font-bold text-xs uppercase tracking-wider text-neutral-400">Collections</div>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="pl-2">All Products</Link>
              <Link href="/products?category=casual" onClick={() => setMobileMenuOpen(false)} className="pl-2">Casual</Link>
              <Link href="/products?category=formal" onClick={() => setMobileMenuOpen(false)} className="pl-2">Formal</Link>
              <Link href="/products?category=party" onClick={() => setMobileMenuOpen(false)} className="pl-2">Party</Link>
              <Link href="/products?category=gym" onClick={() => setMobileMenuOpen(false)} className="pl-2">Gym</Link>
              <div className="border-t border-neutral-100 pt-3">
                <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>My Cart ({totalCount})</Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
