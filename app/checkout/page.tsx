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

  const discount = subtotal > 100 ? subtotal * 0.2 : 0;
  const finalTotal = total - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      // Simulate order placement
      const generatedId = "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();
      await new Promise((res) => setTimeout(res, 1000));

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
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Order Confirmed
          </span>
          <h1 className="font-integral text-3xl sm:text-4xl text-black">
            THANK YOU FOR YOUR ORDER!
          </h1>
          <p className="text-sm text-neutral-600">
            Order Reference: <span className="font-mono text-black font-bold">{orderId}</span>
          </p>
          <p className="text-xs text-neutral-500 max-w-md mx-auto pt-2">
            A confirmation receipt has been sent to <span className="text-black font-semibold">{formData.email}</span>. You can track simulated delivery status anytime under your customer account.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/account")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-black hover:bg-neutral-800 shadow-md text-sm transition-colors"
          >
            View Account Orders
          </button>
          <button
            onClick={() => router.push("/products")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-black bg-neutral-100 hover:bg-neutral-200 text-sm transition-colors"
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
        <h1 className="font-integral text-2xl text-black">No Items in Cart</h1>
        <p className="text-sm text-neutral-500">
          Your cart is currently empty. Add products before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-black hover:bg-neutral-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
        <h1 className="font-integral text-3xl sm:text-4xl text-black mt-3">
          SECURE CHECKOUT
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Complete your order with instant simulation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-5">
            <h2 className="font-bold text-lg text-black">Shipping Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F0F0F0] rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F0F0F0] rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F0F0F0] rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F0F0F0] rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F0F0F0] rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-neutral-200 bg-[#F2F0F1] space-y-2">
            <div className="flex items-center gap-2 text-black">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-sm">DevOps Verified Checkout</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              This application seamlessly simulates order transactions for testing and portfolio presentation without requiring real credit cards or external credentials.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
            <ShoppingBag className="w-4 h-4 text-black" />
            <h2 className="font-bold text-base text-black">Order Summary ({items.length} items)</h2>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-neutral-100">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                <span className="text-neutral-800 font-medium truncate max-w-[200px]">
                  {product.name} <span className="text-neutral-400">× {quantity}</span>
                </span>
                <span className="font-bold text-black">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-3 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-semibold text-black">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-neutral-600">
                <span>Discount (-20%)</span>
                <span className="font-semibold text-rose-500">-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Fee</span>
              <span className="font-semibold text-black">
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Estimated Tax</span>
              <span className="font-semibold text-black">{formatPrice(tax)}</span>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex justify-between font-bold text-base text-black">
              <span>Total Due</span>
              <span className="text-xl font-extrabold text-black">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-white bg-black hover:bg-neutral-800 shadow-md text-sm transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Processing Order..." : `Place Order (${formatPrice(finalTotal)})`}
          </button>
        </div>
      </form>
    </div>
  );
}
