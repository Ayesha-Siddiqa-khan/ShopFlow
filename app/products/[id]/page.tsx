import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
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

  const originalPrice = product.price > 150 ? product.price * 1.25 : null;
  const discountPercent = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs matching SHOP.CO */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-500">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-black transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-black uppercase">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Gallery Thumbnail Strip + Main Image */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-start">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 w-full sm:w-28 overflow-x-auto sm:overflow-visible">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="relative aspect-square w-24 sm:w-full rounded-2xl overflow-hidden product-img-bg border-2 border-black p-2 cursor-pointer flex-shrink-0"
              >
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="100px"
                    className="object-cover object-center"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Big Image */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden product-img-bg flex items-center justify-center p-6">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
            ) : (
              <div className="text-neutral-400 text-sm">No Image Available</div>
            )}
          </div>
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
              <span className="font-bold text-black text-sm">4.5/<span className="text-neutral-500 font-normal">5</span></span>
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
      <div className="pt-12 border-t border-neutral-200">
        <div className="flex border-b border-neutral-200 text-sm font-semibold">
          <button className="flex-1 py-4 text-center border-b-2 border-black text-black">
            Rating &amp; Reviews (45)
          </button>
          <button className="flex-1 py-4 text-center text-neutral-500 hover:text-black">
            Product Details
          </button>
          <button className="flex-1 py-4 text-center text-neutral-500 hover:text-black">
            FAQs
          </button>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <div className="border border-neutral-200 rounded-3xl p-6 space-y-2">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="flex items-center gap-1.5 font-bold text-black text-sm">
              <span>Samantha D.</span>
              <span className="w-4 h-4 bg-emerald-500 rounded-full text-white flex items-center justify-center text-[10px]">✓</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              &quot;I absolutely love this product! The quality exceeded all expectations, and the fabric feels amazingly soft and structured.&quot;
            </p>
            <p className="text-[11px] text-neutral-400 pt-2">Posted on August 14, 2026</p>
          </div>

          <div className="border border-neutral-200 rounded-3xl p-6 space-y-2">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="flex items-center gap-1.5 font-bold text-black text-sm">
              <span>Ethan R.</span>
              <span className="w-4 h-4 bg-emerald-500 rounded-full text-white flex items-center justify-center text-[10px]">✓</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              &quot;Fit is true to size and the cut is exactly what I was searching for. Fast delivery and premium packaging!&quot;
            </p>
            <p className="text-[11px] text-neutral-400 pt-2">Posted on August 19, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
