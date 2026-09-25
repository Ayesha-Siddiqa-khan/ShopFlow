import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { getProductBySlug } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ProductAddToCartForm } from "@/components/products/product-add-to-cart-form";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductBySlug(id);

  if (!product) {
    notFound();
  }

  const isOutOfStock = product.stock_quantity <= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden glass-panel border border-zinc-800 bg-zinc-900">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-500">
              No Image Available
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
              <span className="px-4 py-2 bg-rose-950/90 text-rose-300 border border-rose-800 rounded-full font-semibold text-sm">
                Currently Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-8">
          <div className="space-y-3">
            {product.category?.name && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-950/70 text-indigo-300 border border-indigo-800/60">
                {product.category.name}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-white tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  isOutOfStock
                    ? "bg-rose-950/80 text-rose-300 border border-rose-800/50"
                    : product.stock_quantity < 5
                    ? "bg-amber-950/80 text-amber-300 border border-amber-800/50"
                    : "bg-emerald-950/80 text-emerald-300 border border-emerald-800/50"
                }`}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : `${product.stock_quantity} units available`}
              </span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Add to Cart Form */}
          <ProductAddToCartForm product={product} />

          {/* Guarantees */}
          <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Free delivery over $150</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>30-Day Hassle Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>2-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
