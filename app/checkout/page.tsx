"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Lock,
  Sparkles,
  Fingerprint,
  RefreshCw,
  X,
  Check,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

type PaymentMethodType = "visa" | "mastercard" | "paypal" | "applepay" | "googlepay";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Valued Customer",
    email: "customer@example.com",
    address: "742 Evergreen Terrace",
    city: "San Francisco",
    state: "CA",
    postalCode: "94107",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("visa");

  // Visa card state
  const [visaDetails, setVisaDetails] = useState({
    number: "4532 8920 1204 8892",
    expiry: "12/28",
    cvc: "345",
    name: "Valued Customer",
  });

  // Mastercard state
  const [mcDetails, setMcDetails] = useState({
    number: "5412 7534 8901 6621",
    expiry: "08/29",
    cvc: "789",
    name: "Valued Customer",
  });

  // Active CVV highlight state for virtual card
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  // Interactive Modals State
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [payPalProcessing, setPayPalProcessing] = useState(false);
  const [payPalFundingSource, setPayPalFundingSource] = useState<"balance" | "bank">("balance");

  const [showApplePaySheet, setShowApplePaySheet] = useState(false);
  const [applePayBiometricActive, setApplePayBiometricActive] = useState(false);
  const [applePayDone, setApplePayDone] = useState(false);

  const [showGooglePaySheet, setShowGooglePaySheet] = useState(false);
  const [googlePayProcessing, setGooglePayProcessing] = useState(false);
  const [googlePayDone, setGooglePayDone] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [confirmedPaymentLabel, setConfirmedPaymentLabel] = useState("");

  const discount = subtotal > 100 ? subtotal * 0.2 : 0;
  const finalTotal = total - discount;

  // Prefill customer profile from session
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("shopflow_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.email) {
            setFormData((prev) => ({
              ...prev,
              email: parsed.email,
              fullName: parsed.name || prev.fullName,
            }));
            setVisaDetails((prev) => ({
              ...prev,
              name: parsed.name || prev.name,
            }));
            setMcDetails((prev) => ({
              ...prev,
              name: parsed.name || prev.name,
            }));
          }
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCardNumberChange = (val: string, type: "visa" | "mastercard") => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
    if (type === "visa") {
      setVisaDetails((prev) => ({ ...prev, number: formatted }));
    } else {
      setMcDetails((prev) => ({ ...prev, number: formatted }));
    }
  };

  const handleCardExpiryChange = (val: string, type: "visa" | "mastercard") => {
    let raw = val.replace(/\D/g, "").slice(0, 4);
    if (raw.length > 2) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    if (type === "visa") {
      setVisaDetails((prev) => ({ ...prev, expiry: raw }));
    } else {
      setMcDetails((prev) => ({ ...prev, expiry: raw }));
    }
  };

  const handleCardCvcChange = (val: string, type: "visa" | "mastercard") => {
    const raw = val.replace(/\D/g, "").slice(0, 4);
    if (type === "visa") {
      setVisaDetails((prev) => ({ ...prev, cvc: raw }));
    } else {
      setMcDetails((prev) => ({ ...prev, cvc: raw }));
    }
  };

  const fillDemoVisa = () => {
    setVisaDetails({
      number: "4532 8920 1204 8892",
      expiry: "12/28",
      cvc: "345",
      name: formData.fullName || "Valued Customer",
    });
  };

  const fillDemoMastercard = () => {
    setMcDetails({
      number: "5412 7534 8901 6621",
      expiry: "08/29",
      cvc: "789",
      name: formData.fullName || "Valued Customer",
    });
  };

  const getPaymentLabel = (method: PaymentMethodType = paymentMethod) => {
    switch (method) {
      case "visa": {
        const last4 = visaDetails.number.replace(/\s/g, "").slice(-4) || "8892";
        return `Visa (•••• ${last4})`;
      }
      case "mastercard": {
        const last4 = mcDetails.number.replace(/\s/g, "").slice(-4) || "6621";
        return `Mastercard (•••• ${last4})`;
      }
      case "paypal":
        return `PayPal (${formData.email || "customer@shopflow.com"})`;
      case "applepay":
        return "Apple Pay (Apple Card •••• 4021)";
      case "googlepay":
        return "Google Pay (•••• 9924)";
    }
  };

  // Complete and save order helper
  const finalizeOrder = async (customLabel?: string) => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      const generatedId = "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();
      const paymentLabel = customLabel || getPaymentLabel();

      const newOrder = {
        id: generatedId,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        total: finalTotal,
        status: "processing",
        paymentMethod: paymentLabel,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };

      try {
        const existing = JSON.parse(localStorage.getItem("shopflow_orders") || "[]");
        localStorage.setItem("shopflow_orders", JSON.stringify([newOrder, ...existing]));
      } catch {}

      setOrderId(generatedId);
      setConfirmedPaymentLabel(paymentLabel);
      clearCart();
      setOrderComplete(true);
    } catch {
      alert("Failed to place simulated order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "paypal") {
      setShowPayPalModal(true);
      return;
    }

    if (paymentMethod === "applepay") {
      setShowApplePaySheet(true);
      return;
    }

    if (paymentMethod === "googlepay") {
      setShowGooglePaySheet(true);
      return;
    }

    // Default card submission
    finalizeOrder();
  };

  // PayPal Sandbox Approval Simulation
  const handleApprovePayPal = async () => {
    setPayPalProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setPayPalProcessing(false);
    setShowPayPalModal(false);
    await finalizeOrder(`PayPal Sandbox (${payPalFundingSource === "balance" ? "Wallet Balance" : "Chase •••• 8192"})`);
  };

  // Apple Pay Biometric Simulation
  const handleTriggerApplePayBiometric = async () => {
    setApplePayBiometricActive(true);
    await new Promise((r) => setTimeout(r, 1100));
    setApplePayDone(true);
    await new Promise((r) => setTimeout(r, 700));
    setApplePayBiometricActive(false);
    setShowApplePaySheet(false);
    setApplePayDone(false);
    await finalizeOrder("Apple Pay (Apple Card •••• 4021)");
  };

  // Google Pay Simulation
  const handleApproveGooglePay = async () => {
    setGooglePayProcessing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setGooglePayDone(true);
    await new Promise((r) => setTimeout(r, 600));
    setGooglePayProcessing(false);
    setShowGooglePaySheet(false);
    setGooglePayDone(false);
    await finalizeOrder("Google Pay (GPay •••• 9924)");
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 animate-in zoom-in-75 duration-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Payment Verified &amp; Order Confirmed
          </span>
          <h1 className="font-integral text-3xl sm:text-4xl text-black">
            THANK YOU FOR YOUR ORDER!
          </h1>
          <p className="text-sm text-neutral-600">
            Order Reference: <span className="font-mono text-black font-bold">{orderId}</span>
          </p>
          {confirmedPaymentLabel && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs text-black font-medium">
              <span>Paid via:</span>
              <span className="font-bold">{confirmedPaymentLabel}</span>
            </div>
          )}
          <p className="text-xs text-neutral-500 max-w-md mx-auto pt-2">
            A confirmation receipt and simulated shipment tracking details have been generated for <span className="text-black font-semibold">{formData.email}</span>. You can inspect this order anytime in your account.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/account")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-black hover:bg-neutral-800 shadow-md text-sm transition-colors cursor-pointer"
          >
            View Account Orders
          </button>
          <button
            onClick={() => router.push("/products")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-black bg-neutral-100 hover:bg-neutral-200 text-sm transition-colors cursor-pointer"
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
          Select your preferred payment method and complete your order instantly.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Shipping & Payment Methods */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Form */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-5">
            <h2 className="font-bold text-lg text-black">1. Shipping Information</h2>

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

          {/* Payment Method Section with 5 Distinct Options */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div>
                <h2 className="font-bold text-lg text-black">2. Payment Method</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Choose from 5 verified payment gateways
                </p>
              </div>
              <span className="text-[11px] font-medium text-neutral-600 flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1 rounded-full border border-neutral-200/60">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>256-Bit SSL Encrypted</span>
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Option 1: VISA */}
              <div
                onClick={() => setPaymentMethod("visa")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "visa"
                    ? "border-black bg-neutral-50/60 ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "visa"}
                      onChange={() => setPaymentMethod("visa")}
                      className="w-4 h-4 text-black accent-black cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-black">Visa Card</span>
                      <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        Zero Fee
                      </span>
                    </div>
                  </div>
                  {/* Visa Badge */}
                  <div className="h-7 px-2.5 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="Visa">
                    <svg className="h-2.5 w-auto" viewBox="0 0 36 12" fill="none">
                      <path d="M14.6 0.2L9.6 11.8H6.3L3.8 2.6C3.7 2 3.5 1.7 3.1 1.5C2.4 1.1 1.1 0.7 0.1 0.4L0.2 0.2H5.5C6.2 0.2 6.8 0.7 6.9 1.5L8.2 8.8L11.5 0.2H14.6ZM27.4 8.1C27.4 5.2 23.6 5 23.7 3.6C23.7 3.2 24.1 2.7 25 2.6C25.4 2.5 26.6 2.5 27.9 3.1L28.5 0.4C27.7 0.1 26.7 -0.2 25.5 -0.2C22.4 -0.2 20.2 1.5 20.2 4C20.1 5.9 21.7 6.9 22.9 7.5C24.1 8.1 24.6 8.5 24.6 9.1C24.5 9.9 23.6 10.3 22.7 10.3C21.1 10.4 20.1 9.9 19.4 9.5L18.8 12.3C19.6 12.7 21 13 22.4 13C25.7 13 27.8 11.3 27.4 8.1ZM35.5 11.8H38.4L35.9 0.2H33.2C32.6 0.2 32.1 0.6 31.9 1.1L27.3 11.8H30.8L31.5 9.7H35.8L36.2 11.8H35.5ZM32.5 7L33.9 2.7L34.7 7H32.5ZM19.6 0.2L17 11.8H13.8L16.4 0.2H19.6Z" fill="#1434CB"/>
                    </svg>
                  </div>
                </div>

                {paymentMethod === "visa" && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 space-y-4 animate-in fade-in duration-200">
                    {/* Interactive 3D Virtual Visa Card */}
                    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-tr from-[#0b1b3d] via-[#1434CB] to-[#2563EB] text-white shadow-xl overflow-hidden border border-white/20 select-none">
                      {/* Subtle card glow overlay */}
                      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                      <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

                      <div className="relative z-10 flex flex-col justify-between h-full">
                        {/* Top: Chip & Visa Logo */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* EMV Chip */}
                            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-400 shadow-inner flex items-center justify-center">
                              <div className="w-6 h-4 border border-amber-600/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                                <span className="border-r border-amber-600/40" />
                                <span />
                              </div>
                            </div>
                            {/* Contactless Icon */}
                            <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                              <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                              <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                            </svg>
                          </div>
                          {/* Visa Wordmark White */}
                          <span className="font-bold italic tracking-tighter text-xl text-white font-sans">
                            VISA
                          </span>
                        </div>

                        {/* Middle: Card Number */}
                        <div className="py-2">
                          <p className="font-mono text-base sm:text-xl tracking-[0.2em] font-semibold text-white/95 drop-shadow-md">
                            {visaDetails.number || "•••• •••• •••• ••••"}
                          </p>
                        </div>

                        {/* Bottom: Cardholder, Expiry & CVV */}
                        <div className="flex items-end justify-between text-xs">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-white/60 block">Cardholder</span>
                            <p className="font-medium tracking-wide uppercase truncate max-w-[170px] text-white">
                              {visaDetails.name || formData.fullName || "VALUED CUSTOMER"}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-right">
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-white/60 block">Expires</span>
                              <p className="font-mono font-medium text-white">{visaDetails.expiry || "MM/YY"}</p>
                            </div>
                            <div className={`transition-all px-2 py-0.5 rounded ${isCvvFocused ? "bg-amber-400/30 ring-1 ring-amber-300" : ""}`}>
                              <span className="text-[9px] uppercase tracking-wider text-white/60 block">CVV</span>
                              <p className="font-mono font-medium text-white">{visaDetails.cvc ? "•••" : "345"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auto-fill Helper */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-neutral-500">Live Interactive Visa Card</span>
                      <button
                        type="button"
                        onClick={fillDemoVisa}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-fill Demo Visa</span>
                      </button>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-3.5 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                          Visa Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4532 8920 1204 8892"
                          value={visaDetails.number}
                          onChange={(e) => handleCardNumberChange(e.target.value, "visa")}
                          maxLength={19}
                          className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-mono text-black outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={visaDetails.expiry}
                            onChange={(e) => handleCardExpiryChange(e.target.value, "visa")}
                            maxLength={5}
                            className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-mono text-black outline-none focus:ring-1 focus:ring-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                            Security Code (CVV)
                          </label>
                          <input
                            type="text"
                            placeholder="345"
                            value={visaDetails.cvc}
                            onChange={(e) => handleCardCvcChange(e.target.value, "visa")}
                            onFocus={() => setIsCvvFocused(true)}
                            onBlur={() => setIsCvvFocused(false)}
                            maxLength={4}
                            className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-mono text-black outline-none focus:ring-1 focus:ring-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="Valued Customer"
                          value={visaDetails.name}
                          onChange={(e) => setVisaDetails({ ...visaDetails, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm text-black outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    {/* Direct Pay with Visa Action */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => finalizeOrder()}
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-full font-semibold text-white bg-[#1434CB] hover:bg-[#0f28a3] shadow-md text-sm transition-all hover:scale-[1.005] active:scale-[0.995] cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Pay {formatPrice(finalTotal)} with Visa</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: MASTERCARD */}
              <div
                onClick={() => setPaymentMethod("mastercard")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "mastercard"
                    ? "border-black bg-neutral-50/60 ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "mastercard"}
                      onChange={() => setPaymentMethod("mastercard")}
                      className="w-4 h-4 text-black accent-black cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-black">Mastercard</span>
                      <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Identity Check
                      </span>
                    </div>
                  </div>
                  {/* Mastercard Badge */}
                  <div className="h-7 px-2 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="Mastercard">
                    <svg className="h-4 w-auto" viewBox="0 0 32 20" fill="none">
                      <circle cx="10" cy="10" r="9" fill="#EB001B"/>
                      <circle cx="22" cy="10" r="9" fill="#F79E1B"/>
                      <path d="M16 3.6A8.99 8.99 0 0013 10c0 2.58 1.1 4.9 2.85 6.4A8.99 8.99 0 0019 10c0-2.58-1.1-4.9-2.85-6.4z" fill="#FF5F00"/>
                    </svg>
                  </div>
                </div>

                {paymentMethod === "mastercard" && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 space-y-4 animate-in fade-in duration-200">
                    {/* Interactive 3D Virtual Mastercard */}
                    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-tr from-[#121212] via-[#211d1d] to-[#3a1b1b] text-white shadow-xl overflow-hidden border border-white/20 select-none">
                      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-red-500/15 blur-2xl pointer-events-none" />
                      <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

                      <div className="relative z-10 flex flex-col justify-between h-full">
                        {/* Top: Chip & Mastercard Logo */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-400 shadow-inner flex items-center justify-center">
                              <div className="w-6 h-4 border border-amber-600/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                                <span className="border-r border-amber-600/40" />
                                <span />
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                              <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                              <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                            </svg>
                          </div>
                          {/* Mastercard Circles */}
                          <div className="flex items-center">
                            <svg className="h-6 w-auto" viewBox="0 0 32 20" fill="none">
                              <circle cx="10" cy="10" r="9" fill="#EB001B"/>
                              <circle cx="22" cy="10" r="9" fill="#F79E1B"/>
                              <path d="M16 3.6A8.99 8.99 0 0013 10c0 2.58 1.1 4.9 2.85 6.4A8.99 8.99 0 0019 10c0-2.58-1.1-4.9-2.85-6.4z" fill="#FF5F00"/>
                            </svg>
                          </div>
                        </div>

                        {/* Middle: Card Number */}
                        <div className="py-2">
                          <p className="font-mono text-base sm:text-xl tracking-[0.2em] font-semibold text-white/95 drop-shadow-md">
                            {mcDetails.number || "•••• •••• •••• ••••"}
                          </p>
                        </div>

                        {/* Bottom: Cardholder, Expiry & CVV */}
                        <div className="flex items-end justify-between text-xs">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-white/60 block">Cardholder</span>
                            <p className="font-medium tracking-wide uppercase truncate max-w-[170px] text-white">
                              {mcDetails.name || formData.fullName || "VALUED CUSTOMER"}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-right">
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-white/60 block">Expires</span>
                              <p className="font-mono font-medium text-white">{mcDetails.expiry || "MM/YY"}</p>
                            </div>
                            <div className={`transition-all px-2 py-0.5 rounded ${isCvvFocused ? "bg-amber-400/30 ring-1 ring-amber-300" : ""}`}>
                              <span className="text-[9px] uppercase tracking-wider text-white/60 block">CVV</span>
                              <p className="font-mono font-medium text-white">{mcDetails.cvc ? "•••" : "789"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auto-fill Helper */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-neutral-500">Live Interactive Mastercard</span>
                      <button
                        type="button"
                        onClick={fillDemoMastercard}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-fill Demo Mastercard</span>
                      </button>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-3.5 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                          Mastercard Number
                        </label>
                        <input
                          type="text"
                          placeholder="5412 7534 8901 6621"
                          value={mcDetails.number}
                          onChange={(e) => handleCardNumberChange(e.target.value, "mastercard")}
                          maxLength={19}
                          className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-mono text-black outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={mcDetails.expiry}
                            onChange={(e) => handleCardExpiryChange(e.target.value, "mastercard")}
                            maxLength={5}
                            className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-mono text-black outline-none focus:ring-1 focus:ring-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                            Security Code (CVC)
                          </label>
                          <input
                            type="text"
                            placeholder="789"
                            value={mcDetails.cvc}
                            onChange={(e) => handleCardCvcChange(e.target.value, "mastercard")}
                            onFocus={() => setIsCvvFocused(true)}
                            onBlur={() => setIsCvvFocused(false)}
                            maxLength={4}
                            className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-mono text-black outline-none focus:ring-1 focus:ring-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="Valued Customer"
                          value={mcDetails.name}
                          onChange={(e) => setMcDetails({ ...mcDetails, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm text-black outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    {/* Direct Pay with Mastercard Action */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => finalizeOrder()}
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-full font-semibold text-white bg-black hover:bg-neutral-800 shadow-md text-sm transition-all hover:scale-[1.005] active:scale-[0.995] cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Pay {formatPrice(finalTotal)} with Mastercard</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: PAYPAL */}
              <div
                onClick={() => setPaymentMethod("paypal")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "paypal"
                    ? "border-black bg-neutral-50/60 ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="w-4 h-4 text-black accent-black cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-black">PayPal</span>
                      <span className="text-[10px] uppercase font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                        Buyer Protection
                      </span>
                    </div>
                  </div>
                  {/* PayPal Badge */}
                  <div className="h-7 px-2.5 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="PayPal">
                    <svg className="h-3.5 w-auto" viewBox="0 0 28 20" fill="none">
                      <path d="M9.8 18.5H6.2C5.9 18.5 5.7 18.3 5.6 18L3 2.5C2.9 2.2 3.1 1.9 3.4 1.9H11.5C14.8 1.9 17.1 2.6 18 4.2C18.6 5.1 18.7 6.3 18.2 7.7C17.6 9.7 16.1 11.2 14.2 11.8C13.6 12 12.8 12.1 11.9 12.1H9.9L8.6 18.2C8.6 18.4 8.8 18.5 9 18.5H9.8Z" fill="#003087"/>
                      <path d="M12.3 6.8H8.8C8.6 6.8 8.4 7 8.3 7.2L6.6 18C6.5 18.2 6.7 18.4 6.9 18.4H10.1C10.3 18.4 10.5 18.2 10.6 18L11.5 12.8C11.5 12.6 11.7 12.4 12 12.4H13.6C16.5 12.4 18.8 11.2 19.4 7.7C19.7 6 19.3 4.6 18.3 3.6C17.7 5.2 15.6 6.8 12.3 6.8Z" fill="#0079C1"/>
                    </svg>
                  </div>
                </div>

                {paymentMethod === "paypal" && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 space-y-4 animate-in fade-in duration-200">
                    <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#003087] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                        P
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-black">Sandbox Verified Buyer Account</span>
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">Active</span>
                        </div>
                        <p className="text-neutral-600">
                          Account: <span className="font-mono font-medium text-black">ayesha.siddiqa@sandbox.paypal.com</span>
                        </p>
                        <p className="text-neutral-500">
                          Available PayPal Balance: <span className="font-bold text-black">$3,450.00 USD</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {/* Official PayPal Button */}
                      <button
                        type="button"
                        onClick={() => setShowPayPalModal(true)}
                        className="w-full py-3.5 rounded-full font-bold text-[#003087] bg-[#FFC439] hover:bg-[#f4b82d] shadow-sm text-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="h-4 w-auto" viewBox="0 0 28 20" fill="none">
                          <path d="M9.8 18.5H6.2C5.9 18.5 5.7 18.3 5.6 18L3 2.5C2.9 2.2 3.1 1.9 3.4 1.9H11.5C14.8 1.9 17.1 2.6 18 4.2C18.6 5.1 18.7 6.3 18.2 7.7C17.6 9.7 16.1 11.2 14.2 11.8C13.6 12 12.8 12.1 11.9 12.1H9.9L8.6 18.2C8.6 18.4 8.8 18.5 9 18.5H9.8Z" fill="#003087"/>
                          <path d="M12.3 6.8H8.8C8.6 6.8 8.4 7 8.3 7.2L6.6 18C6.5 18.2 6.7 18.4 6.9 18.4H10.1C10.3 18.4 10.5 18.2 10.6 18L11.5 12.8C11.5 12.6 11.7 12.4 12 12.4H13.6C16.5 12.4 18.8 11.2 19.4 7.7C19.7 6 19.3 4.6 18.3 3.6C17.7 5.2 15.6 6.8 12.3 6.8Z" fill="#0079C1"/>
                        </svg>
                        <span>Pay with PayPal ({formatPrice(finalTotal)})</span>
                      </button>

                      <p className="text-[11px] text-center text-neutral-400">
                        Clicking launches the interactive simulated PayPal payment confirmation window.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 4: APPLE PAY */}
              <div
                onClick={() => setPaymentMethod("applepay")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "applepay"
                    ? "border-black bg-neutral-50/60 ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "applepay"}
                      onChange={() => setPaymentMethod("applepay")}
                      className="w-4 h-4 text-black accent-black cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-black">Apple Pay</span>
                      <span className="text-[10px] uppercase font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                        1-Touch Biometric
                      </span>
                    </div>
                  </div>
                  {/* Apple Pay Badge */}
                  <div className="h-7 px-2.5 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="Apple Pay">
                    <svg className="h-3.5 w-auto" viewBox="0 0 36 15" fill="black">
                      <path d="M4.6 0.1C4.3 0.6 3.9 1.1 3.4 1.4C2.9 1.8 2.3 2 1.8 2C1.7 1.4 1.9 0.8 2.3 0.4C2.7 0.1 3.4 -0.1 4.6 0.1ZM4.7 2.2C4.1 2.2 3.6 2.5 3.3 2.5C3 2.5 2.5 2.2 2 2.2C1.1 2.2 0.3 2.8 0 3.8C-0.3 5.4 0.6 7.9 1.7 9.8C2.1 10.4 2.5 11 3.1 11C3.6 11 3.8 10.7 4.5 10.7C5.1 10.7 5.3 11 5.9 11C6.5 11 7 10.4 7.4 9.8C7.9 9 8.2 8.3 8.3 8C7.4 7.6 6.8 6.6 6.8 5.6C6.8 4.3 7.8 3.4 8.8 3.1C8.2 2.4 7.3 2.2 6.6 2.2C5.9 2.2 5.3 2.5 4.7 2.2Z"/>
                      <path d="M12.5 2.3H10V11H11.5V7.9H12.5C14.4 7.9 15.7 6.8 15.7 5.1C15.7 3.4 14.4 2.3 12.5 2.3ZM12.4 6.6H11.5V3.6H12.4C13.5 3.6 14.1 4.2 14.1 5.1C14.1 6 13.5 6.6 12.4 6.6ZM19.7 11V5.7H18.3V6.7C18 6 17.2 5.5 16.3 5.5C15 5.5 14 6.6 14 8.3C14 10 15 11.1 16.3 11.1C17.2 11.1 18 10.6 18.3 9.9V11H19.7ZM16.8 9.9C15.9 9.9 15.4 9.2 15.4 8.3C15.4 7.4 15.9 6.7 16.8 6.7C17.7 6.7 18.3 7.4 18.3 8.3C18.3 9.2 17.7 9.9 16.8 9.9ZM21 13.5C22.6 13.5 23.4 12.8 23.9 11.3L26.5 5.7H25L23.3 9.9L21.6 5.7H20L22.2 10.8L21.7 12.2C21.4 12.5 21.1 12.6 20.8 12.6C20.6 12.6 20.3 12.6 20.1 12.5L20 13.4C20.3 13.5 20.6 13.5 21 13.5Z"/>
                    </svg>
                  </div>
                </div>

                {paymentMethod === "applepay" && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 space-y-4 animate-in fade-in duration-200">
                    <div className="p-4 rounded-xl bg-neutral-900 text-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-neutral-200 to-white text-black font-semibold text-[10px] flex items-center justify-center shadow-xs">
                          Card
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Apple Card (•••• 4021)</p>
                          <p className="text-[11px] text-neutral-400">{formData.fullName || "Valued Customer"} • Default</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        Ready
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Official Apple Pay Button */}
                      <button
                        type="button"
                        onClick={() => setShowApplePaySheet(true)}
                        className="w-full py-3.5 rounded-full font-semibold text-white bg-black hover:bg-neutral-800 shadow-md text-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="text-base"></span>
                        <span>Pay with Apple Pay ({formatPrice(finalTotal)})</span>
                      </button>
                      <p className="text-[11px] text-center text-neutral-400">
                        Click to activate the simulated iOS Touch ID / Face ID payment sheet.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 5: GOOGLE PAY */}
              <div
                onClick={() => setPaymentMethod("googlepay")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "googlepay"
                    ? "border-black bg-neutral-50/60 ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "googlepay"}
                      onChange={() => setPaymentMethod("googlepay")}
                      className="w-4 h-4 text-black accent-black cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-black">Google Pay</span>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Google Protected
                      </span>
                    </div>
                  </div>
                  {/* Google Pay Badge */}
                  <div className="h-7 px-2.5 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="Google Pay">
                    <svg className="h-3.5 w-auto" viewBox="0 0 38 16" fill="none">
                      <path d="M7.7 8.1V6.3H4V9.8H6.2C5.9 10.9 4.9 11.6 3.8 11.4C2.5 11.2 1.6 10 1.6 8.7C1.6 7.4 2.5 6.2 3.8 6C4.4 5.9 5.1 6.1 5.6 6.5L6.9 5.2C6 4.4 4.8 4 3.6 4.1C1.6 4.3 0 6 0 8C0 10.2 1.8 12 4 12C6.1 12 7.7 10.4 7.7 8.1Z" fill="#4285F4"/>
                      <path d="M12.8 5.5H10.5V12H11.8V9.8H12.8C14.3 9.8 15.5 8.9 15.5 7.6C15.5 6.3 14.3 5.5 12.8 5.5ZM12.7 8.6H11.8V6.6H12.7C13.6 6.6 14.2 7 14.2 7.6C14.2 8.2 13.6 8.6 12.7 8.6ZM19.2 12V7.7H18V8.5C17.7 7.9 17 7.5 16.3 7.5C15.1 7.5 14.2 8.5 14.2 9.8C14.2 11.1 15.1 12.1 16.3 12.1C17 12.1 17.7 11.7 18 11.1V12H19.2ZM16.7 11.1C15.9 11.1 15.4 10.5 15.4 9.8C15.4 9.1 15.9 8.5 16.7 8.5C17.5 8.5 18 9.1 18 9.8C18 10.5 17.5 11.1 16.7 11.1ZM20.7 14.1C22 14.1 22.8 13.5 23.3 12.3L25.5 7.7H24.1L22.7 11.1L21.3 7.7H19.9L21.8 11.9L21.4 13C21.1 13.3 20.8 13.4 20.6 13.4C20.4 13.4 20.2 13.4 20 13.3L19.9 14C20.1 14.1 20.4 14.1 20.7 14.1Z" fill="#5F6368"/>
                    </svg>
                  </div>
                </div>

                {paymentMethod === "googlepay" && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 space-y-4 animate-in fade-in duration-200">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center font-bold text-xs shadow-xs">
                          <span className="text-blue-600">G</span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-black">Google Wallet Card (•••• 9924)</p>
                          <p className="text-[11px] text-neutral-500">{formData.email || "customer@gmail.com"}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                        Linked
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Official Google Pay Button */}
                      <button
                        type="button"
                        onClick={() => setShowGooglePaySheet(true)}
                        className="w-full py-3.5 rounded-full font-semibold text-black bg-white hover:bg-neutral-50 border border-neutral-300 shadow-sm text-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="text-xs font-bold text-neutral-500">Buy with</span>
                        <svg className="h-4 w-auto" viewBox="0 0 38 16" fill="none">
                          <path d="M7.7 8.1V6.3H4V9.8H6.2C5.9 10.9 4.9 11.6 3.8 11.4C2.5 11.2 1.6 10 1.6 8.7C1.6 7.4 2.5 6.2 3.8 6C4.4 5.9 5.1 6.1 5.6 6.5L6.9 5.2C6 4.4 4.8 4 3.6 4.1C1.6 4.3 0 6 0 8C0 10.2 1.8 12 4 12C6.1 12 7.7 10.4 7.7 8.1Z" fill="#4285F4"/>
                          <path d="M12.8 5.5H10.5V12H11.8V9.8H12.8C14.3 9.8 15.5 8.9 15.5 7.6C15.5 6.3 14.3 5.5 12.8 5.5ZM12.7 8.6H11.8V6.6H12.7C13.6 6.6 14.2 7 14.2 7.6C14.2 8.2 13.6 8.6 12.7 8.6ZM19.2 12V7.7H18V8.5C17.7 7.9 17 7.5 16.3 7.5C15.1 7.5 14.2 8.5 14.2 9.8C14.2 11.1 15.1 12.1 16.3 12.1C17 12.1 17.7 11.7 18 11.1V12H19.2ZM16.7 11.1C15.9 11.1 15.4 10.5 15.4 9.8C15.4 9.1 15.9 8.5 16.7 8.5C17.5 8.5 18 9.1 18 9.8C18 10.5 17.5 11.1 16.7 11.1ZM20.7 14.1C22 14.1 22.8 13.5 23.3 12.3L25.5 7.7H24.1L22.7 11.1L21.3 7.7H19.9L21.8 11.9L21.4 13C21.1 13.3 20.8 13.4 20.6 13.4C20.4 13.4 20.2 13.4 20 13.3L19.9 14C20.1 14.1 20.4 14.1 20.7 14.1Z" fill="#5F6368"/>
                        </svg>
                        <span>({formatPrice(finalTotal)})</span>
                      </button>
                      <p className="text-[11px] text-center text-neutral-400">
                        Click to activate the simulated Google Pay 1-tap confirmation sheet.
                      </p>
                    </div>
                  </div>
                )}
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

        {/* Right Column: Order Summary */}
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

          {/* Sticky Checkout Place Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-white bg-black hover:bg-neutral-800 shadow-md text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Order...</span>
              </span>
            ) : paymentMethod === "visa" ? (
              `Pay with Visa (${formatPrice(finalTotal)})`
            ) : paymentMethod === "mastercard" ? (
              `Pay with Mastercard (${formatPrice(finalTotal)})`
            ) : paymentMethod === "paypal" ? (
              `Open PayPal Checkout (${formatPrice(finalTotal)})`
            ) : paymentMethod === "applepay" ? (
              `Pay with Pay (${formatPrice(finalTotal)})`
            ) : (
              `Pay with Google Pay (${formatPrice(finalTotal)})`
            )}
          </button>
        </div>
      </form>

      {/* ========================================================= */}
      {/* 1. PAYPAL CHECKOUT SANDBOX MODAL */}
      {/* ========================================================= */}
      {showPayPalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* PayPal Header */}
            <div className="bg-[#003087] px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#003087] font-bold text-sm">
                  P
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">PayPal Checkout</h3>
                  <p className="text-[10px] text-blue-200 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-300" />
                    <span>Sandbox Sandbox Mode • 256-Bit SSL</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPayPalModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <p className="text-xs text-neutral-500">Merchant</p>
                  <p className="font-bold text-sm text-black">ShopFlow Fashion Global</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500">Total Due</p>
                  <p className="font-extrabold text-lg text-[#003087]">{formatPrice(finalTotal)}</p>
                </div>
              </div>

              {/* Funding Source Selector */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-neutral-700">Select Funding Source</p>
                <div className="space-y-2">
                  <label
                    onClick={() => setPayPalFundingSource("balance")}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      payPalFundingSource === "balance"
                        ? "border-[#003087] bg-blue-50/40 ring-1 ring-[#003087]"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={payPalFundingSource === "balance"}
                        onChange={() => setPayPalFundingSource("balance")}
                        className="text-[#003087] accent-[#003087]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-black">PayPal Balance ($3,450.00)</p>
                        <p className="text-[11px] text-neutral-500">Instant transfer • Preferred</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">Recommended</span>
                  </label>

                  <label
                    onClick={() => setPayPalFundingSource("bank")}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      payPalFundingSource === "bank"
                        ? "border-[#003087] bg-blue-50/40 ring-1 ring-[#003087]"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={payPalFundingSource === "bank"}
                        onChange={() => setPayPalFundingSource("bank")}
                        className="text-[#003087] accent-[#003087]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-black">Chase Premier Checking (•••• 8192)</p>
                        <p className="text-[11px] text-neutral-500">Backup payment method</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                <span className="text-[10px] text-neutral-500 font-semibold uppercase">Ship To:</span>
                <p className="font-semibold text-black">{formData.fullName}</p>
                <p className="text-neutral-600">{formData.address}, {formData.city}, {formData.postalCode}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleApprovePayPal}
                  disabled={payPalProcessing}
                  className="w-full py-3.5 rounded-full font-bold text-white bg-[#0070BA] hover:bg-[#005ea6] shadow-md text-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {payPalProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authorizing PayPal Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Purchase ({formatPrice(finalTotal)})</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowPayPalModal(false)}
                  className="w-full py-2.5 text-xs text-neutral-500 hover:text-black transition-colors"
                >
                  Cancel and return to ShopFlow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. APPLE PAY INTERACTIVE BIOMETRIC SHEET */}
      {/* ========================================================= */}
      {showApplePaySheet && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#1C1C1E] text-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Sheet Handle */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 sm:hidden" />

            <div className="p-6 space-y-6">
              {/* Apple Pay Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold">Pay</span>
                  <span className="text-xs text-neutral-400">ShopFlow</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowApplePaySheet(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-neutral-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Card Thumbnail */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 rounded-lg bg-gradient-to-tr from-neutral-300 to-white text-black font-semibold text-[9px] flex items-center justify-center shadow-inner">
                    Card
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Apple Card</p>
                    <p className="text-[11px] text-neutral-400">Mastercard (•••• 4021)</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-white">{formatPrice(finalTotal)}</span>
              </div>

              {/* Contact & Shipping Details */}
              <div className="space-y-2 text-xs divide-y divide-white/10">
                <div className="flex justify-between py-1.5 text-neutral-400">
                  <span>Contact</span>
                  <span className="text-white font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between py-1.5 text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-white font-medium truncate max-w-[220px]">
                    {formData.address}, {formData.city}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 text-neutral-400">
                  <span>Subtotal + Tax</span>
                  <span className="text-white font-medium">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Interactive Biometric Trigger */}
              <div className="pt-2 text-center space-y-4">
                <button
                  type="button"
                  onClick={handleTriggerApplePayBiometric}
                  disabled={applePayBiometricActive || applePayDone}
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    applePayDone
                      ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30"
                      : applePayBiometricActive
                      ? "bg-blue-600 text-white animate-pulse ring-4 ring-blue-400/40"
                      : "bg-white/10 text-white hover:bg-white/20 active:scale-95"
                  }`}
                >
                  {applePayDone ? (
                    <Check className="w-10 h-10 animate-in zoom-in-75 duration-200" />
                  ) : (
                    <Fingerprint className="w-10 h-10" />
                  )}
                </button>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-white">
                    {applePayDone
                      ? "Payment Verified!"
                      : applePayBiometricActive
                      ? "Verifying Biometric Touch / Face ID..."
                      : "Tap Sensor or Click Below to Pay"}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Double-click side button or touch sensor to approve
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleTriggerApplePayBiometric}
                  disabled={applePayBiometricActive || applePayDone}
                  className="w-full py-3.5 rounded-full font-semibold text-black bg-white hover:bg-neutral-100 shadow-md text-sm transition-all cursor-pointer"
                >
                  Confirm with Apple Pay ({formatPrice(finalTotal)})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. GOOGLE PAY PAYMENT SHEET MODAL */}
      {/* ========================================================= */}
      {showGooglePaySheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Google Pay Header */}
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-auto" viewBox="0 0 38 16" fill="none">
                  <path d="M7.7 8.1V6.3H4V9.8H6.2C5.9 10.9 4.9 11.6 3.8 11.4C2.5 11.2 1.6 10 1.6 8.7C1.6 7.4 2.5 6.2 3.8 6C4.4 5.9 5.1 6.1 5.6 6.5L6.9 5.2C6 4.4 4.8 4 3.6 4.1C1.6 4.3 0 6 0 8C0 10.2 1.8 12 4 12C6.1 12 7.7 10.4 7.7 8.1Z" fill="#4285F4"/>
                  <path d="M12.8 5.5H10.5V12H11.8V9.8H12.8C14.3 9.8 15.5 8.9 15.5 7.6C15.5 6.3 14.3 5.5 12.8 5.5ZM12.7 8.6H11.8V6.6H12.7C13.6 6.6 14.2 7 14.2 7.6C14.2 8.2 13.6 8.6 12.7 8.6ZM19.2 12V7.7H18V8.5C17.7 7.9 17 7.5 16.3 7.5C15.1 7.5 14.2 8.5 14.2 9.8C14.2 11.1 15.1 12.1 16.3 12.1C17 12.1 17.7 11.7 18 11.1V12H19.2ZM16.7 11.1C15.9 11.1 15.4 10.5 15.4 9.8C15.4 9.1 15.9 8.5 16.7 8.5C17.5 8.5 18 9.1 18 9.8C18 10.5 17.5 11.1 16.7 11.1ZM20.7 14.1C22 14.1 22.8 13.5 23.3 12.3L25.5 7.7H24.1L22.7 11.1L21.3 7.7H19.9L21.8 11.9L21.4 13C21.1 13.3 20.8 13.4 20.6 13.4C20.4 13.4 20.2 13.4 20 13.3L19.9 14C20.1 14.1 20.4 14.1 20.7 14.1Z" fill="#5F6368"/>
                </svg>
                <span className="text-xs text-neutral-400">• ShopFlow Store</span>
              </div>
              <button
                type="button"
                onClick={() => setShowGooglePaySheet(false)}
                className="w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Google Pay Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-sm">
                    G
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-black">{formData.fullName}</p>
                    <p className="text-[11px] text-neutral-500">{formData.email}</p>
                  </div>
                </div>
                <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                  1-Tap Pay
                </span>
              </div>

              {/* Linked Card */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-neutral-800 text-white font-mono text-[9px] flex items-center justify-center">
                    ••••
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-black">Google Pay Virtual Card (•••• 9924)</p>
                    <p className="text-[11px] text-neutral-500">Fast checkout • No CVV required</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>

              {/* Delivery Address */}
              <div className="p-3 bg-[#F9F9F9] rounded-xl text-xs space-y-0.5">
                <p className="text-neutral-500 text-[10px] uppercase font-semibold">Deliver to</p>
                <p className="font-semibold text-black">{formData.address}, {formData.city}</p>
              </div>

              {/* Total & Action */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm font-bold text-black px-1">
                  <span>Total Due</span>
                  <span className="text-lg">{formatPrice(finalTotal)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleApproveGooglePay}
                  disabled={googlePayProcessing || googlePayDone}
                  className="w-full py-4 rounded-full font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] shadow-md text-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {googlePayDone ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Google Pay Approved!</span>
                    </>
                  ) : googlePayProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authorizing with Google...</span>
                    </>
                  ) : (
                    <span>Pay {formatPrice(finalTotal)} with Google Pay</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowGooglePaySheet(false)}
                  className="w-full py-2 text-xs text-neutral-500 hover:text-black transition-colors"
                >
                  Cancel and return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
