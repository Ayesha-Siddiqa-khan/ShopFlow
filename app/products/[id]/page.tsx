import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ProductAddToCartForm } from "@/components/products/product-add-to-cart-form";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductTabs } from "@/components/products/product-tabs";
import { ProductCard } from "@/components/products/product-card";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(id),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const originalPrice = product.price > 150 ? product.price * 1.25 : null;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : null;

  // 4 related items excluding current product
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs matching SHOP.CO */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-500">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-black transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-black uppercase truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery Thumbnail Strip + Main Image */}
        <div className="lg:col-span-6">
          <ProductGallery
            mainImageUrl={product.image_url || ""}
            productName={product.name}
          />
        </div>

        {/* Right: Details, Ratings, Size, Color, Add to Cart */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <h1 className="font-integral text-3xl sm:text-4xl text-black leading-tight">
              {product.name}
            </h1>

            {/* Stars Rating with Score */}
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-black text-sm">
                4.5/<span className="text-neutral-500 font-normal">5</span>
              </span>
            </div>

            {/* Price with Original strike-through and discount badge */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-3xl font-extrabold text-black">
                {formatPrice(product.price)}
              </span>
              {originalPrice && (
                <span className="text-2xl font-bold text-neutral-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs font-bold text-[#FF3333] bg-[#FF3333]/10 px-3 py-1 rounded-full">
                  -{discountPercent}%
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color & Size selection form + Add to cart */}
          <ProductAddToCartForm product={product} />
        </div>
      </div>

      {/* Tabs Section: Product Details / Rating & Reviews / FAQs */}
      <ProductTabs />

      {/* YOU MIGHT ALSO LIKE (SHOP.CO Reference Recommendation Grid) */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-neutral-200">
          <div className="text-center mb-10">
            <h2 className="font-integral text-2xl sm:text-4xl text-black">
              YOU MIGHT ALSO LIKE
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
