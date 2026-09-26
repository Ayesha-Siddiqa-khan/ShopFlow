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
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        if (!searchQuery.trim()) {
          setSearchExpanded(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Banner - Luxury Black Announcement Bar */}
      <div className="bg-gradient-to-r from-neutral-950 via-black to-neutral-950 text-white text-xs py-2.5 border-b border-neutral-800 shadow-xs select-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-center">
          <span className="flex items-center gap-2 font-normal text-neutral-300 text-xs sm:text-[13px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Sign up and get <span className="font-bold text-white">20% off</span> your first order.
          </span>
          <Link
            href="/register"
            className="inline-flex items-center gap-1 font-semibold text-white underline decoration-neutral-400 hover:decoration-white hover:text-white transition-all ml-1 text-xs sm:text-[13px] group"
          >
            <span>Sign Up Now</span>
            <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Main Luxury Glass Navbar */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-neutral-200/70 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
            
            {/* Mobile menu trigger + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <span className="font-integral text-2xl sm:text-3xl text-black tracking-tighter transition-opacity group-hover:opacity-85">
                  SHOP.CO
                </span>
                <span className="hidden sm:inline-flex items-center text-[9px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/80 shadow-2xs group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                  LUXE
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links - Modern Pill Dock */}
            <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-neutral-100/80 border border-neutral-200/70 shadow-2xs backdrop-blur-xs text-sm font-medium text-neutral-700 whitespace-nowrap">
              
              {/* Interactive Shop Dropdown (Hovers and Opens) */}
              <div
                ref={dropdownRef}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
                    shopDropdownOpen
                      ? "bg-white text-black shadow-xs font-semibold"
                      : "text-neutral-700 hover:text-black hover:bg-white/70"
                  }`}
                  aria-expanded={shopDropdownOpen}
                >
                  <span>Shop</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${shopDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu Modal */}
                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2.5 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-200/80 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1.5">
                      Curated Collections
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/products"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-black group-hover:text-black">All Products</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Explore full catalog</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=casual"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                          <Shirt className="w-4 h-4" />
                        </div>
                        <div>
                          <div>Casual Wear</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Tees, denim & everyday</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=formal"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div>Formal Attire</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Tailored shirts & blazers</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=party"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                          <Flame className="w-4 h-4" />
                        </div>
                        <div>
                          <div>Party & Night</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Bold statements & jackets</div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=gym"
                        onClick={() => setShopDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-black transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                          <Dumbbell className="w-4 h-4" />
                        </div>
                        <div>
                          <div>Gym & Active</div>
                          <div className="text-[11px] text-neutral-400 font-normal">Athletic fits & runners</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* On Sale Link with HOT badge */}
              <Link
                href="/products?category=casual"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-neutral-700 hover:text-black hover:bg-white/70 transition-all duration-200"
              >
                <span>On Sale</span>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 px-1.5 py-0.2 rounded-full">
                  HOT
                </span>
              </Link>

              {/* New Arrivals Link with live pulse indicator */}
              <Link
                href="/products"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-neutral-700 hover:text-black hover:bg-white/70 transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>New Arrivals</span>
              </Link>

              {/* Brands Link */}
              <Link
                href="/products?category=formal"
                className="px-4 py-2 rounded-full text-neutral-700 hover:text-black hover:bg-white/70 transition-all duration-200"
              >
                <span>Brands</span>
              </Link>
            </nav>

            {/* Right Side Actions: Harmonious Luxury Suite (Search + Cart + Account) */}
            <div className="flex items-center gap-2 sm:gap-2.5 text-black">
              {/* Expandable Search Input (Touches or Hovers and Expands) */}
              <div
                ref={searchContainerRef}
                onMouseEnter={() => setSearchExpanded(true)}
                onMouseLeave={() => {
                  if (!isSearchFocused && !searchQuery.trim()) {
                    setSearchExpanded(false);
                  }
                }}
                className="relative flex items-center justify-end"
              >
                <form
                  onSubmit={handleSearch}
                  onClick={() => {
                    setSearchExpanded(true);
                    searchInputRef.current?.focus();
                  }}
                  className={`flex items-center rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                    searchExpanded
                      ? "w-64 sm:w-80 md:w-96 lg:w-[380px] px-4 py-2.5 bg-white border border-black/30 shadow-lg ring-4 ring-black/5"
                      : "w-10 h-10 justify-center bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/70 hover:scale-105 shadow-2xs"
                  }`}
                >
                  <button
                    type="submit"
                    className="text-neutral-600 hover:text-black transition-colors shrink-0 p-0.5 focus:outline-none cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>

                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setSearchExpanded(true);
                    }}
                    onBlur={() => {
                      setIsSearchFocused(false);
                      if (!searchQuery.trim()) {
                        setSearchExpanded(false);
                      }
                    }}
                    placeholder="Search clothing, brands, styles..."
                    className={`bg-transparent text-black text-sm outline-none transition-all duration-300 placeholder:text-neutral-400 ${
                      searchExpanded
                        ? "ml-2.5 w-full opacity-100"
                        : "w-0 p-0 ml-0 opacity-0 pointer-events-none"
                    }`}
                  />

                  {searchExpanded && searchQuery && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery("");
                        searchInputRef.current?.focus();
                      }}
                      className="p-1 text-neutral-400 hover:text-black shrink-0 cursor-pointer transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>
              </div>

              {/* Cart Icon - Luxury Circular Pill */}
              <Link
                href="/cart"
                className="relative w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/70 flex items-center justify-center text-neutral-700 hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xs"
                aria-label="Shopping Cart"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white shadow-md animate-in zoom-in-75">
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* Account Icon - Luxury Circular Pill */}
              <Link
                href="/account"
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/70 flex items-center justify-center text-neutral-700 hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xs"
                aria-label="Account"
                title="My Account"
              >
                <User className="w-4.5 h-4.5" />
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
