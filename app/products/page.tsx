import { Suspense } from "react";
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
  if (resolvedParams.category) {
    const matchingCat = categories.find((c) => c.slug === resolvedParams.category);
    if (matchingCat) {
      categoryId = matchingCat.id;
    }
  }

  const products = await getProducts({
    categoryId,
    search: resolvedParams.search,
    sortBy: resolvedParams.sort,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Product Catalog
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Explore all our available items. Filter by category, sort by price, or search instantly.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Suspense fallback={<div className="h-16 glass-panel rounded-2xl animate-pulse" />}>
        <ProductsFilter
          categories={categories}
          currentCategory={resolvedParams.category || ""}
          currentSearch={resolvedParams.search || ""}
          currentSort={resolvedParams.sort || "featured"}
        />
      </Suspense>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl border border-zinc-800 space-y-4">
          <p className="text-lg font-semibold text-zinc-300">No products found</p>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your category filters to find what you are looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
