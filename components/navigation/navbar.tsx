"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, ChevronDown, Sparkles, Shirt, Award, Flame, Dumbbell } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Check user session
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("shopflow_user");
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

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

  const isHomeActive = pathname === "/";
  const isShopActive = pathname.startsWith("/products");

  return (
    <div className="sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-black text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 font-normal text-[11px] sm:text-xs">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Sign up and get 20% off your first order.
          </span>
          <Link href="/register" className="underline font-semibold hover:text-neutral-300 ml-1 text-[11px] sm:text-xs">
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Main Header matching the requested design layout */}
      <header className="bg-white border-b border-neutral-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left: Brand Logo with Arrow Icon */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-black hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                {/* Geometric Arrow / Delta Mark matching the reference design */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L2 20h20L12 3zm0 4.2l6.2 10.8H5.8L12 7.2z" />
                  </svg>
                </div>
                <span className="font-integral text-xl sm:text-2xl text-black tracking-tight font-extrabold">
                  SHOP.CO
                </span>
              </Link>
            </div>

            {/* Center: Navigation Links in Clean Uppercase Design */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-xs font-bold uppercase tracking-widest text-black">
              {/* HOME Link */}
              <Link
                href="/"
                className={`py-1 transition-colors relative ${
                  isHomeActive
                    ? "text-black font-extrabold after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-black"
                    : "text-neutral-500 hover:text-black font-semibold"
                }`}
              >
                HOME
              </Link>

              {/* SHOP Dropdown (Hovers and Opens) */}
              <div
                ref={dropdownRef}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
                className="relative py-1"
              >
                <button
                  type="button"
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  className={`flex items-center gap-1 cursor-pointer transition-colors focus:outline-none uppercase ${
                    isShopActive
                      ? "text-black font-extrabold"
                      : "text-neutral-500 hover:text-black font-semibold"
                  }`}
                  aria-expanded={shopDropdownOpen}
                >
                  <span>SHOP</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${shopDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu Modal */}
                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-3 z-50 animate-in fade-in zoom-in-95 duration-150 normal-case">
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

              {/* ON SALE */}
              <Link
                href="/products?category=casual"
                className="py-1 text-neutral-500 hover:text-black font-semibold transition-colors"
              >
                ON SALE
              </Link>

              {/* NEW ARRIVALS */}
              <Link
                href="/products"
                className="py-1 text-neutral-500 hover:text-black font-semibold transition-colors"
              >
                NEW ARRIVALS
              </Link>

              {/* BRANDS */}
              <Link
                href="/products?category=formal"
                className="py-1 text-neutral-500 hover:text-black font-semibold transition-colors"
              >
                BRANDS
              </Link>

              {/* CONTACT */}
              <Link
                href="/account"
                className="py-1 text-neutral-500 hover:text-black font-semibold transition-colors"
              >
                CONTACT
              </Link>
            </nav>

            {/* Right: Actions matching design (Search + Cart + SIGN UP text link + LOG IN solid button) */}
            <div className="flex items-center gap-3 sm:gap-5">
              
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
                  className={`flex items-center bg-[#f0f0f0] rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                    searchExpanded
                      ? "w-48 sm:w-64 md:w-72 px-3 py-1.5 ring-1 ring-black/20 shadow-xs"
                      : "w-9 h-9 justify-center hover:bg-neutral-200"
                  }`}
                >
                  <button
                    type="submit"
                    className="text-neutral-500 hover:text-black transition-colors shrink-0 p-0.5 focus:outline-none cursor-pointer"
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
                    placeholder="Search products..."
                    className={`bg-transparent text-black text-xs outline-none transition-all duration-300 ${
                      searchExpanded
                        ? "ml-2 w-full opacity-100"
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
                      className="p-1 text-neutral-400 hover:text-black shrink-0 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </form>
              </div>

              {/* Shopping Cart Icon with Badge */}
              <Link
                href="/cart"
                className="relative p-1.5 text-black hover:text-neutral-600 transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white shadow-xs animate-in zoom-in-75">
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* Right Button Group: SIGN UP Text + LOG IN Solid Button */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/account"
                    className="text-xs uppercase font-bold tracking-wider text-black hover:text-neutral-600 transition-colors hidden sm:inline-block"
                  >
                    {user.name?.split(" ")[0] || "MY ACCOUNT"}
                  </Link>
                  <Link
                    href="/account"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-xs flex items-center justify-center"
                  >
                    ACCOUNT
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/register"
                    className="text-xs uppercase font-bold tracking-wider text-black hover:text-neutral-600 transition-colors hidden sm:inline-block"
                  >
                    SIGN UP
                  </Link>
                  <Link
                    href="/login"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-xs flex items-center justify-center"
                  >
                    LOG IN
                  </Link>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-200 bg-white px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 text-xs font-bold uppercase tracking-widest text-black">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-1">
                HOME
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-1">
                SHOP
              </Link>
              <Link href="/products?category=casual" onClick={() => setMobileMenuOpen(false)} className="py-1">
                ON SALE
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-1">
                NEW ARRIVALS
              </Link>
              <Link href="/products?category=formal" onClick={() => setMobileMenuOpen(false)} className="py-1">
                BRANDS
              </Link>
              <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="py-1">
                CONTACT
              </Link>

              <div className="border-t border-neutral-200 pt-4 flex flex-col gap-2.5">
                {user ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-black border border-neutral-200 rounded-lg"
                    >
                      {user.name || "MY ACCOUNT"}
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white bg-black rounded-lg"
                    >
                      VIEW ORDERS
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-black border border-neutral-200 rounded-lg"
                    >
                      SIGN UP
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white bg-black rounded-lg"
                    >
                      LOG IN
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
