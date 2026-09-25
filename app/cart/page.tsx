"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    shipping,
    total,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto">
            Looks like you haven&apos;t added any pieces to your cart yet. Explore our latest arrivals to get started.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white gradient-accent shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-transform text-sm"
        >
          <span>Discover Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Review your chosen items before checking out.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-zinc-500 hover:text-rose-400 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl glass-panel border border-zinc-800"
            >
              {/* Image */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <Link
                  href={`/products/${product.slug}`}
                  className="font-semibold text-white hover:text-indigo-400 transition-colors line-clamp-1 text-sm sm:text-base"
                >
                  {product.name}
                </Link>
                <div className="text-xs text-zinc-400 mt-1">
                  Unit: {formatPrice(product.price)}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-semibold text-xs text-zinc-200 px-3">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Item Subtotal */}
              <div className="text-right min-w-20">
                <span className="font-bold text-white text-sm sm:text-base">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(product.id)}
                className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-panel border border-zinc-800 space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-zinc-200">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Estimated Tax (8%)</span>
              <span className="text-zinc-200">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-zinc-200">
                {shipping === 0 ? (
                  <span className="text-emerald-400 font-medium">FREE</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-[11px] text-zinc-500">
                Add {formatPrice(150 - subtotal)} more for free shipping.
              </p>
            )}

            <div className="pt-4 border-t border-zinc-800 flex justify-between font-bold text-base text-white">
              <span>Total</span>
              <span className="text-indigo-400">{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white gradient-accent shadow-lg shadow-indigo-600/30 hover:scale-[1.01] transition-transform text-sm"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
