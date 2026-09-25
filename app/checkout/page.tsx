"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Alex Rivera",
    email: "alex@example.com",
    address: "742 Evergreen Terrace",
    city: "San Francisco",
    state: "CA",
    postalCode: "94107",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to create order in Supabase
      const generatedId = "ord_" + Math.random().toString(36).substring(2, 9).toUpperCase();
      await new Promise((res) => setTimeout(res, 1200));

      setOrderId(generatedId);
      clearCart();
      setOrderComplete(true);
    } catch {
      alert("Failed to place simulated order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-800 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Order Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Thank you for your order!
          </h1>
          <p className="text-sm text-zinc-400">
            Order Reference: <span className="font-mono text-white font-semibold">{orderId}</span>
          </p>
          <p className="text-xs text-zinc-500 max-w-md mx-auto pt-2">
            A confirmation receipt has been sent to <span className="text-zinc-300">{formData.email}</span>. You can track simulated delivery status anytime under your customer account.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/account")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white gradient-accent shadow-md text-sm"
          >
            View Account Orders
          </button>
          <button
            onClick={() => router.push("/products")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 hover:text-white text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">No Items in Cart</h1>
        <p className="text-sm text-zinc-400">
          Your cart is currently empty. Add products before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white gradient-accent"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
          Secure Checkout
        </h1>
        <p className="text-sm text-zinc-400">
          Complete your simulated practice order below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4">
            <h2 className="text-lg font-bold text-white">Shipping Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-semibold text-white text-sm">DevOps Practice Checkout</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Per PRD Section 6, this project simulates realistic order creation without requiring real credit cards or external payment gateway credentials.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Order Items ({items.length})</h2>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center text-xs">
                <span className="text-zinc-300 font-medium truncate max-w-[200px]">
                  {product.name} <span className="text-zinc-500">× {quantity}</span>
                </span>
                <span className="font-semibold text-white">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-2.5 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-zinc-200">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Tax</span>
              <span className="text-zinc-200">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-zinc-200">
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>
            <div className="pt-3 border-t border-zinc-800 flex justify-between font-bold text-base text-white">
              <span>Total Due</span>
              <span className="text-indigo-400">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white gradient-accent shadow-lg shadow-indigo-600/30 hover:scale-[1.01] transition-transform text-sm disabled:opacity-50"
          >
            {isSubmitting ? "Processing Order..." : `Place Order (${formatPrice(total)})`}
          </button>
        </div>
      </form>
    </div>
  );
}
