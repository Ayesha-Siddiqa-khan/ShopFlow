"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, Tag, Check, AlertCircle } from "lucide-react";
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

  const [promoInput, setPromoInput] = useState("SHOP20");
  const [promoStatus, setPromoStatus] = useState<{
    applied: boolean;
    discountPercent: number;
    message: string;
  }>({
    applied: true,
    discountPercent: 20,
    message: "20% discount applied (SHOP20)",
  });

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === "SHOP20") {
      setPromoStatus({
        applied: true,
        discountPercent: 20,
        message: "20% discount applied (SHOP20)",
      });
    } else if (code === "SHOP30") {
      setPromoStatus({
        applied: true,
        discountPercent: 30,
        message: "30% VIP discount applied (SHOP30)",
      });
    } else if (code === "WELCOME10") {
      setPromoStatus({
        applied: true,
        discountPercent: 10,
        message: "10% new member discount applied (WELCOME10)",
      });
    } else if (!code) {
      setPromoStatus({
        applied: false,
        discountPercent: 0,
        message: "Please enter a promo code",
      });
    } else {
      setPromoStatus({
        applied: false,
        discountPercent: 0,
        message: `Invalid code "${code}". Try SHOP20.`,
      });
    }
  };

  const discount = promoStatus.applied
    ? subtotal * (promoStatus.discountPercent / 100)
    : 0;
  const finalTotal = Math.max(0, total - discount);

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
          className="inline-block px-10 py-3.5 bg-black text-white rounded-full font-semibold text-sm hover:bg-neutral-800 transition-colors"
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
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>&gt;</span>
        <span className="font-semibold text-black">Cart</span>
      </nav>

      <h1 className="font-integral text-3xl sm:text-4xl text-black">
        YOUR CART
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-7 border border-neutral-200 rounded-[1.5rem] p-4 sm:p-6 divide-y divide-neutral-200 bg-white">
          {items.map(({ product, quantity, size = "Large", color = "White" }) => (
            <div
              key={`${product.id}-${size}-${color}`}
              className="py-5 first:pt-0 last:pb-0 flex gap-4 sm:gap-5 items-center"
            >
              {/* Product Image */}
              <Link
                href={`/products/${product.slug}`}
                className="relative aspect-square w-24 sm:w-28 rounded-2xl overflow-hidden product-img-bg flex-shrink-0 border border-neutral-100"
              >
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="120px"
                    className="object-cover object-center hover:scale-105 transition-transform"
                  />
                )}
              </Link>

              {/* Info & Quantity controls */}
              <div className="flex-1 flex flex-col justify-between min-h-[5.5rem]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-bold text-black text-base line-clamp-1 uppercase hover:underline">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Size: <span className="text-black font-semibold">{size}</span>
                    </p>
                    <p className="text-xs text-neutral-500">
                      Color: <span className="text-black font-semibold">{color}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id, size, color)}
                    className="text-neutral-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
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
                      onClick={() => updateQuantity(product.id, quantity - 1, size, color)}
                      className="text-black hover:opacity-60 transition-opacity p-0.5"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-xs text-black min-w-[1rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1, size, color)}
                      className="text-black hover:opacity-60 transition-opacity p-0.5"
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
        <div className="lg:col-span-5 border border-neutral-200 rounded-[1.5rem] p-6 sm:p-8 space-y-6 bg-white">
          <h2 className="font-bold text-xl text-black">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-bold text-black">{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-neutral-600">
                <span>Discount (-{promoStatus.discountPercent}%)</span>
                <span className="font-bold text-rose-500">-{formatPrice(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-neutral-600">
              <span>Delivery Fee</span>
              <span className="font-bold text-black">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
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

          {/* Promo code input & interactive apply */}
          <div className="space-y-2">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyPromo();
                    }
                  }}
                  placeholder="Add promo code"
                  className="w-full bg-[#F0F0F0] text-black text-xs rounded-full pl-10 pr-3 py-3 outline-none focus:ring-1 focus:ring-black uppercase font-medium"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-6 py-3 bg-black text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-colors"
              >
                Apply
              </button>
            </div>

            {promoStatus.message && (
              <div
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl ${
                  promoStatus.applied
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {promoStatus.applied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                <span>{promoStatus.message}</span>
              </div>
            )}
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
