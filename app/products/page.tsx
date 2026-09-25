import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategories, getProducts } from "@/lib/db";
import { ProductCard } from "@/components/products/product-card";
import { ProductsFilter } from "@/components/products/products-filter";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const categories = await getCategories();

  // Find category ID if slug provided
  let categoryId: string | undefined = undefined;
  let activeCategoryName = "All Products";
  if (resolvedParams.category) {
    const matchingCat = categories.find((c) => c.slug === resolvedParams.category);
    if (matchingCat) {
      categoryId = matchingCat.id;
      activeCategoryName = matchingCat.name;
    }
  }

  const products = await getProducts({
    categoryId,
    search: resolvedParams.search,
    sortBy: resolvedParams.sort,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb matching SHOP.CO */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-500">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-black transition-colors">Shop</Link>
        {resolvedParams.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-black capitalize">{activeCategoryName}</span>
          </>
        )}
      </nav>

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-4">
        <h1 className="font-integral text-3xl sm:text-4xl text-black">
          {activeCategoryName}
        </h1>
        <span className="text-xs text-neutral-500">
          Showing 1-{products.length} of {products.length} Products
        </span>
      </div>

      {/* Filter and Search Bar */}
      <Suspense fallback={<div className="h-16 bg-[#F0F0F0] rounded-2xl animate-pulse" />}>
        <ProductsFilter
          categories={categories}
          currentCategory={resolvedParams.category || ""}
          currentSearch={resolvedParams.search || ""}
          currentSort={resolvedParams.sort || "featured"}
        />
      </Suspense>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="py-24 text-center bg-[#F0EEED] rounded-3xl p-8 space-y-3">
          <p className="text-xl font-bold text-black font-integral">No products found</p>
          <p className="text-sm text-neutral-600 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your category filters to find what you are looking for.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-black text-white rounded-full text-xs font-semibold hover:bg-neutral-800"
          >
            Clear Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
