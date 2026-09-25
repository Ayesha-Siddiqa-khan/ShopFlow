"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Category } from "@/types";
import { useState, useTransition } from "react";

interface ProductsFilterProps {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
  currentSort: string;
}

export function ProductsFilter({
  categories,
  currentCategory,
  currentSearch,
  currentSort,
}: ProductsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(currentSearch);

  const applyFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search: searchInput });
  };

  return (
    <div className="space-y-6">
      {/* Category Pills bar matching SHOP.CO */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => applyFilters({ category: null })}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            !currentCategory
              ? "bg-black text-white shadow-sm"
              : "bg-[#F0F0F0] text-black hover:bg-neutral-200"
          }`}
        >
          All Items
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => applyFilters({ category: cat.slug })}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              currentCategory === cat.slug
                ? "bg-black text-white shadow-sm"
                : "bg-[#F0F0F0] text-black hover:bg-neutral-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search Input & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-2">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products by keyword..."
            className="w-full pl-11 pr-10 py-3 bg-[#F0F0F0] rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-black transition-all"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                applyFilters({ search: null });
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-sm text-neutral-600">
          <SlidersHorizontal className="w-4 h-4 text-black" />
          <span>Sort by:</span>
          <select
            value={currentSort}
            onChange={(e) => applyFilters({ sort: e.target.value })}
            className="bg-transparent font-bold text-black text-sm outline-none cursor-pointer"
          >
            <option value="featured">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
}
