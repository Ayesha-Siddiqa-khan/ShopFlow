"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    shipping,
    total,
  } = useCart();

  const discount = subtotal > 100 ? subtotal * 0.2 : 0;
  const finalTotal = total - discount;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="font-integral text-3xl sm:text-4xl text-black">
          YOUR CART IS EMPTY
        </h1>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
          You haven&apos;t added any items yet. Discover our latest collection to get started.
        </p>
        <Link
          href="/products"
          className="inline-block px-10 py-3.5 bg-black text-white rounded-full font-semibold text-sm hover:bg-neutral-800"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-500">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>&gt;</span>
        <span className="font-semibold text-black">Cart</span>
      </nav>

      <h1 className="font-integral text-3xl sm:text-4xl text-black">
        YOUR CART
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-7 border border-neutral-200 rounded-[1.5rem] p-4 sm:p-6 divide-y divide-neutral-200">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="py-5 first:pt-0 last:pb-0 flex gap-4 sm:gap-5 items-center">
              {/* Product Image */}
              <div className="relative aspect-square w-24 sm:w-28 rounded-2xl overflow-hidden product-img-bg flex-shrink-0">
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="120px"
                    className="object-cover object-center"
                  />
                )}
              </div>

              {/* Info & Quantity controls */}
              <div className="flex-1 flex flex-col justify-between min-h-[5.5rem]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-black text-base line-clamp-1 uppercase">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Size: <span className="text-black font-semibold">Large</span></p>
                    <p className="text-xs text-neutral-500">Color: <span className="text-black font-semibold">White</span></p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-extrabold text-black text-lg">
                    {formatPrice(product.price)}
                  </span>

                  <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-full px-3 py-1">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="text-black hover:opacity-60"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-xs text-black">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="text-black hover:opacity-60"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary matching SHOP.CO */}
        <div className="lg:col-span-5 border border-neutral-200 rounded-[1.5rem] p-6 sm:p-8 space-y-6">
          <h2 className="font-bold text-xl text-black">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-bold text-black">{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-neutral-600">
                <span>Discount (-20%)</span>
                <span className="font-bold text-rose-500">-{formatPrice(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-neutral-600">
              <span>Delivery Fee</span>
              <span className="font-bold text-black">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Estimated Tax</span>
              <span className="font-bold text-black">{formatPrice(tax)}</span>
            </div>

            <div className="border-t border-neutral-200 pt-4 flex justify-between text-base">
              <span className="font-bold text-black">Total</span>
              <span className="font-extrabold text-black text-xl">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Promo code input */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Add promo code"
                defaultValue="SHOP20"
                className="w-full bg-[#F0F0F0] text-black text-xs rounded-full pl-10 pr-3 py-3 outline-none"
              />
            </div>
            <button className="px-6 py-3 bg-black text-white text-xs font-semibold rounded-full hover:bg-neutral-800">
              Apply
            </button>
          </div>

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white rounded-full font-semibold text-sm hover:bg-neutral-800 transition-all shadow-md"
          >
            <span>Go to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
