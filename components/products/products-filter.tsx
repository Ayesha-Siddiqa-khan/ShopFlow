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
  const [isPending, startTransition] = useTransition();
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
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between glass-panel p-4 rounded-2xl">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products by keyword..."
            className="w-full pl-10 pr-10 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                applyFilters({ search: null });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sort:</span>
          </div>
          <select
            value={currentSort}
            onChange={(e) => applyFilters({ sort: e.target.value })}
            className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="featured">Featured / Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => applyFilters({ category: null })}
          className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            !currentCategory
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
          }`}
        >
          All Items
        </button>

        {categories.map((cat) => {
          const isSelected = currentCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => applyFilters({ category: isSelected ? null : cat.slug })}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {isPending && (
        <div className="text-xs text-indigo-400 animate-pulse">Updating catalog...</div>
      )}
    </div>
  );
}
