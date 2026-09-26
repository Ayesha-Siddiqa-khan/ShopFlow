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
  RefreshCw,
  X,
  CreditCard,
  Truck,
  Zap,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

type PaymentMethodType = "visa" | "mastercard" | "jazzcash" | "paypal" | "cod";

function createOrderId(): string {
  return "ORD-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000);
}

function createRefId(prefix: string): string {
  return prefix + "-" + Math.floor(100000 + Math.random() * 900000);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Pro Editor",
    email: "proeditorpakistanifeeling@gmail.com",
    phone: "0300 1234567",
    address: "742 Evergreen Terrace",
    city: "Islamabad",
    postalCode: "44000",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("visa");

  // Visa & Mastercard card details
  const [visaDetails, setVisaDetails] = useState({
    number: "4532 8920 1204 8892",
    expiry: "12/28",
    cvc: "345",
    name: "PRO EDITOR",
  });

  const [mcDetails, setMcDetails] = useState({
    number: "5412 7534 8901 6621",
    expiry: "08/29",
    cvc: "789",
    name: "PRO EDITOR",
  });

  const [isCvvFocused, setIsCvvFocused] = useState(false);

  // JazzCash State (Pakistani Mobile Wallet)
  const [jazzMobile, setJazzMobile] = useState("0300 1234567");
  const [showJazzModal, setShowJazzModal] = useState(false);
  const [jazzMpin, setJazzMpin] = useState("");
  const [jazzProcessing, setJazzProcessing] = useState(false);

  // PayPal State
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [payPalProcessing, setPayPalProcessing] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [confirmedPaymentLabel, setConfirmedPaymentLabel] = useState("");

  const discount = subtotal > 100 ? subtotal * 0.2 : 0;
  const finalTotal = total - discount;

  // Approximate PKR equivalent for reference: 1 USD ≈ 278 PKR
  const pkrEquivalent = Math.round(finalTotal * 278.5);

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
            const upper = (parsed.name || "PRO EDITOR").toUpperCase();
            setVisaDetails((prev) => ({ ...prev, name: upper }));
            setMcDetails((prev) => ({ ...prev, name: upper }));
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
      name: formData.fullName ? formData.fullName.toUpperCase() : "PRO EDITOR",
    });
  };

  const fillDemoMastercard = () => {
    setMcDetails({
      number: "5412 7534 8901 6621",
      expiry: "08/29",
      cvc: "789",
      name: formData.fullName ? formData.fullName.toUpperCase() : "PRO EDITOR",
    });
  };

  const getPaymentLabel = (method: PaymentMethodType = paymentMethod) => {
    switch (method) {
      case "visa": {
        const last4 = visaDetails.number.replace(/\s/g, "").slice(-4) || "8892";
        return `Visa Card (•••• ${last4})`;
      }
      case "mastercard": {
        const last4 = mcDetails.number.replace(/\s/g, "").slice(-4) || "6621";
        return `Mastercard (•••• ${last4})`;
      }
      case "jazzcash":
        return `JazzCash Wallet (${jazzMobile})`;
      case "paypal":
        return `PayPal (${formData.email})`;
      case "cod":
        return "Cash on Delivery (COD)";
    }
  };

  const finalizeOrder = async (customLabel?: string) => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      const generatedId = createOrderId();
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
      alert("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "jazzcash") {
      setShowJazzModal(true);
      return;
    }
    if (paymentMethod === "paypal") {
      setShowPayPalModal(true);
      return;
    }

    finalizeOrder();
  };

  const handleApproveJazz = async () => {
    setJazzProcessing(true);
    await new Promise((r) => setTimeout(r, 1100));
    setJazzProcessing(false);
    setShowJazzModal(false);
    await finalizeOrder(`JazzCash Wallet (Account: ${jazzMobile} • Ref #${createRefId("JC")})`);
  };

  const handleApprovePayPal = async () => {
    setPayPalProcessing(true);
    await new Promise((r) => setTimeout(r, 1100));
    setPayPalProcessing(false);
    setShowPayPalModal(false);
    await finalizeOrder(`PayPal Sandbox (${formData.email})`);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-black bg-[#F0F0F0] px-3.5 py-1.5 rounded-full inline-block">
            Order Confirmed
          </span>
          <h1 className="font-integral text-3xl sm:text-4xl text-black">
            THANK YOU FOR YOUR ORDER!
          </h1>
          <p className="text-sm text-neutral-600">
            Order Reference: <span className="font-mono text-black font-extrabold">{orderId}</span>
          </p>
          {confirmedPaymentLabel && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0F0F0] text-xs text-black font-medium">
              <span className="text-neutral-500">Payment:</span>
              <span className="font-bold">{confirmedPaymentLabel}</span>
            </div>
          )}
          <p className="text-xs text-neutral-500 max-w-md mx-auto pt-2">
            A confirmation receipt and shipment tracking details have been generated for <span className="text-black font-semibold">{formData.email}</span>.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/account")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white bg-black hover:bg-neutral-800 shadow-md text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            View Account Orders
          </button>
          <button
            onClick={() => router.push("/products")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-black bg-[#F0F0F0] hover:bg-neutral-200 text-xs uppercase tracking-wider transition-colors cursor-pointer"
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
          className="inline-block px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
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
          Complete your order using Visa, Mastercard, JazzCash, EasyPaisa, or PayPal.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Shipping & Payment Method */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Information Form */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-5">
            <h2 className="font-bold text-base text-black">Shipping Information</h2>

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
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="0300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F0F0F0] rounded-full text-sm font-mono text-black placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="sm:col-span-2">
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

          {/* Payment Method Section styled to website color palette */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div>
                <h2 className="font-bold text-base text-black">Payment Method</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Select your preferred payment gateway</p>
              </div>
              <span className="text-[11px] font-medium text-neutral-600 flex items-center gap-1.5 bg-[#F0F0F0] px-3 py-1 rounded-full">
                <Lock className="w-3 h-3 text-black" />
                <span>256-Bit SSL Encrypted</span>
              </span>
            </div>

            <div className="space-y-3">
              {/* Option 1: VISA CARD (Royal Blue Virtual Card that the user loved) */}
              <div
                onClick={() => setPaymentMethod("visa")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "visa"
                    ? "border-black bg-[#FAFAFA] ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
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
                      <CreditCard className="w-4 h-4 text-black" />
                      <span className="font-semibold text-sm text-black">Visa Card</span>
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
                    
                    {/* The Royal Blue Visa Card the user loved */}
                    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-tr from-[#0b1b3d] via-[#1434CB] to-[#2563EB] text-white shadow-xl overflow-hidden border border-white/20 select-none">
                      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

                      <div className="relative z-10 flex flex-col justify-between h-full">
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
                          <span className="font-bold italic tracking-tighter text-xl text-white font-sans">
                            VISA
                          </span>
                        </div>

                        <div className="py-1">
                          <p className="font-mono text-base sm:text-xl tracking-[0.22em] font-semibold text-white drop-shadow-md">
                            {visaDetails.number || "•••• •••• •••• ••••"}
                          </p>
                        </div>

                        <div className="flex items-end justify-between text-xs">
                          <div className="max-w-[190px]">
                            <span className="text-[8px] uppercase tracking-wider text-white/60 block font-semibold">CARDHOLDER</span>
                            <p className="font-medium tracking-wide uppercase truncate text-white">
                              {visaDetails.name || formData.fullName.toUpperCase()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-right">
                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-white/60 block font-semibold">EXPIRES</span>
                              <p className="font-mono font-medium text-white">{visaDetails.expiry || "12/28"}</p>
                            </div>
                            <div className={`transition-all px-2 py-0.5 rounded ${isCvvFocused ? "bg-amber-400/30 ring-1 ring-amber-300" : ""}`}>
                              <span className="text-[8px] uppercase tracking-wider text-white/60 block font-semibold">CVV</span>
                              <p className="font-mono font-medium text-white">{visaDetails.cvc ? "•••" : "345"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-neutral-500">Live Interactive Visa</span>
                      <button
                        type="button"
                        onClick={fillDemoVisa}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-black bg-[#F0F0F0] hover:bg-neutral-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Auto-fill Demo Visa</span>
                      </button>
                    </div>

                    <div className="space-y-3.5">
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
                            placeholder="MM / YY"
                            value={visaDetails.expiry}
                            onChange={(e) => handleCardExpiryChange(e.target.value, "visa")}
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
                          placeholder="PRO EDITOR"
                          value={visaDetails.name}
                          onChange={(e) => setVisaDetails({ ...visaDetails, name: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-semibold uppercase text-black outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: MASTERCARD */}
              <div
                onClick={() => setPaymentMethod("mastercard")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "mastercard"
                    ? "border-black bg-[#FAFAFA] ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
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
                      <CreditCard className="w-4 h-4 text-black" />
                      <span className="font-semibold text-sm text-black">Mastercard</span>
                    </div>
                  </div>
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
                    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-tr from-[#121212] via-[#211d1d] to-[#3a1b1b] text-white shadow-xl overflow-hidden border border-white/20 select-none">
                      <div className="relative z-10 flex flex-col justify-between h-full">
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
                          <svg className="h-6 w-auto" viewBox="0 0 32 20" fill="none">
                            <circle cx="10" cy="10" r="9" fill="#EB001B"/>
                            <circle cx="22" cy="10" r="9" fill="#F79E1B"/>
                            <path d="M16 3.6A8.99 8.99 0 0013 10c0 2.58 1.1 4.9 2.85 6.4A8.99 8.99 0 0019 10c0-2.58-1.1-4.9-2.85-6.4z" fill="#FF5F00"/>
                          </svg>
                        </div>

                        <div className="py-1">
                          <p className="font-mono text-base sm:text-xl tracking-[0.22em] font-semibold text-white drop-shadow-md">
                            {mcDetails.number || "•••• •••• •••• ••••"}
                          </p>
                        </div>

                        <div className="flex items-end justify-between text-xs">
                          <div className="max-w-[190px]">
                            <span className="text-[8px] uppercase tracking-wider text-white/60 block font-semibold">CARDHOLDER</span>
                            <p className="font-medium tracking-wide uppercase truncate text-white">
                              {mcDetails.name || formData.fullName.toUpperCase()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-right">
                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-white/60 block font-semibold">EXPIRES</span>
                              <p className="font-mono font-medium text-white">{mcDetails.expiry || "08/29"}</p>
                            </div>
                            <div className={`transition-all px-2 py-0.5 rounded ${isCvvFocused ? "bg-amber-400/30 ring-1 ring-amber-300" : ""}`}>
                              <span className="text-[8px] uppercase tracking-wider text-white/60 block font-semibold">CVV</span>
                              <p className="font-mono font-medium text-white">{mcDetails.cvc ? "•••" : "789"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-neutral-500">Live Interactive Mastercard</span>
                      <button
                        type="button"
                        onClick={fillDemoMastercard}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-black bg-[#F0F0F0] hover:bg-neutral-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Auto-fill Demo Mastercard</span>
                      </button>
                    </div>

                    <div className="space-y-3.5">
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
                            placeholder="MM / YY"
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
                          placeholder="PRO EDITOR"
                          value={mcDetails.name}
                          onChange={(e) => setMcDetails({ ...mcDetails, name: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-semibold uppercase text-black outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: JAZZCASH (The beloved Pakistani Mobile Wallet option) */}
              <div
                onClick={() => setPaymentMethod("jazzcash")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "jazzcash"
                    ? "border-black bg-[#FAFAFA] ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "jazzcash"}
                      onChange={() => setPaymentMethod("jazzcash")}
                      className="w-4 h-4 text-black accent-black cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-black">JazzCash</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#EC1C24] px-2 py-0.5 rounded-full">
                        Pakistan 🇵🇰
                      </span>
                    </div>
                  </div>
                  <div className="h-7 px-2.5 bg-[#EC1C24] text-white rounded-md flex items-center justify-center shadow-xs font-bold text-xs tracking-wider" title="JazzCash">
                    Jazz<span className="text-[#FFC20E]">Cash</span>
                  </div>
                </div>

                {paymentMethod === "jazzcash" && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 space-y-3.5 animate-in fade-in duration-200">
                    <p className="text-xs text-neutral-600">
                      Pay instantly with your JazzCash mobile account via 1-tap MPIN authorization prompt.
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                        JazzCash Mobile Number
                      </label>
                      <input
                        type="tel"
                        placeholder="0300 1234567"
                        value={jazzMobile}
                        onChange={(e) => setJazzMobile(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-xl text-sm font-mono text-black outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowJazzModal(true)}
                      className="w-full py-3.5 rounded-full font-bold text-white bg-black hover:bg-neutral-800 shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#FFC20E]" />
                      <span>Open JazzCash Portal ({formatPrice(finalTotal)})</span>
                    </button>
                  </div>
                )}
              </div>


              {/* Option 4: PAYPAL */}
              <div
                onClick={() => setPaymentMethod("paypal")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "paypal"
                    ? "border-black bg-[#FAFAFA] ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
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
                    <span className="font-semibold text-sm text-black">PayPal</span>
                  </div>
                  <div className="h-7 px-2.5 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="PayPal">
                    <svg className="h-3.5 w-auto" viewBox="0 0 28 20" fill="none">
                      <path d="M9.8 18.5H6.2C5.9 18.5 5.7 18.3 5.6 18L3 2.5C2.9 2.2 3.1 1.9 3.4 1.9H11.5C14.8 1.9 17.1 2.6 18 4.2C18.6 5.1 18.7 6.3 18.2 7.7C17.6 9.7 16.1 11.2 14.2 11.8C13.6 12 12.8 12.1 11.9 12.1H9.9L8.6 18.2C8.6 18.4 8.8 18.5 9 18.5H9.8Z" fill="#003087"/>
                      <path d="M12.3 6.8H8.8C8.6 6.8 8.4 7 8.3 7.2L6.6 18C6.5 18.2 6.7 18.4 6.9 18.4H10.1C10.3 18.4 10.5 18.2 10.6 18L11.5 12.8C11.5 12.6 11.7 12.4 12 12.4H13.6C16.5 12.4 18.8 11.2 19.4 7.7C19.7 6 19.3 4.6 18.3 3.6C17.7 5.2 15.6 6.8 12.3 6.8Z" fill="#0079C1"/>
                    </svg>
                  </div>
                </div>

                {paymentMethod === "paypal" && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 space-y-3 animate-in fade-in duration-200">
                    <p className="text-xs text-neutral-600">
                      Pay quickly and securely with your PayPal account or PayPal Credit.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowPayPalModal(true)}
                      className="w-full py-3.5 rounded-full font-bold text-[#003087] bg-[#FFC439] hover:bg-[#f4b82d] shadow-sm text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Pay with PayPal ({formatPrice(finalTotal)})</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Option 5: Cash on Delivery (COD) */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-black bg-[#FAFAFA] ring-1 ring-black shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-black accent-black cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-black" />
                      <span className="font-semibold text-sm text-black">Cash on Delivery</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#F0F0F0] px-2.5 py-1 rounded-full">
                    Pay at Doorstep
                  </span>
                </div>

                {paymentMethod === "cod" && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2 animate-in fade-in duration-200">
                    <p className="text-xs text-neutral-600">
                      Pay in cash when your parcel arrives at your address. Please keep exact change ready.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-neutral-200 bg-[#F2F0F1] space-y-2">
            <div className="flex items-center gap-2 text-black">
              <ShieldCheck className="w-5 h-5 text-black" />
              <h3 className="font-bold text-sm">Official Secure Checkout Guarantee</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Your payment information is encrypted and processed with 256-bit SSL security. Transactions simulate instant order processing for customer portfolio testing.
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
            <div className="pt-3 border-t border-neutral-200 space-y-1">
              <div className="flex justify-between font-bold text-base text-black">
                <span>Total Due</span>
                <span className="text-xl font-extrabold text-black">{formatPrice(finalTotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500 font-medium">
                <span>Approximate PKR:</span>
                <span className="font-mono font-bold text-black">₨ {pkrEquivalent.toLocaleString("en-PK")}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full font-bold text-white bg-black hover:bg-neutral-800 shadow-md text-xs uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
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
            ) : paymentMethod === "jazzcash" ? (
              `Pay with JazzCash (${formatPrice(finalTotal)})`
            ) : paymentMethod === "paypal" ? (
              `Pay with PayPal (${formatPrice(finalTotal)})`
            ) : (
              `Confirm Cash on Delivery (${formatPrice(finalTotal)})`
            )}
          </button>
        </div>
      </form>

      {/* JazzCash Modal */}
      {showJazzModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#EC1C24] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white text-[#EC1C24] font-black text-sm flex items-center justify-center shadow-xs">
                  JC
                </div>
                <div>
                  <h3 className="font-bold text-sm">JazzCash Mobile Payment</h3>
                  <p className="text-[10px] text-red-100">Simulated 1-Tap Authorization</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowJazzModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="p-3.5 bg-[#F0F0F0] rounded-2xl text-center space-y-1">
                <p className="text-xs text-neutral-500 font-semibold uppercase text-[10px]">Total Amount</p>
                <p className="text-xl font-black text-[#EC1C24]">₨ {pkrEquivalent.toLocaleString("en-PK")} PKR</p>
                <p className="text-[11px] text-neutral-500">ShopFlow Store • {formatPrice(finalTotal)} USD</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">JazzCash Account</span>
                  <span className="font-bold text-black font-mono">{jazzMobile}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">Customer</span>
                  <span className="font-semibold text-black">{formData.fullName}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-neutral-700">
                  Enter 4-Digit JazzCash MPIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={jazzMpin}
                  onChange={(e) => setJazzMpin(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center tracking-[0.5em] text-xl font-mono py-2.5 bg-[#F0F0F0] rounded-2xl outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setJazzMpin("1234")}
                  className="text-[11px] text-[#EC1C24] font-semibold hover:underline block text-center cursor-pointer"
                >
                  Quick-fill Demo MPIN (1234)
                </button>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleApproveJazz}
                  disabled={jazzProcessing}
                  className="w-full py-3.5 rounded-full font-bold text-white bg-black hover:bg-neutral-800 shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {jazzProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authorizing with JazzCash...</span>
                    </>
                  ) : (
                    <span>Authorize Payment</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowJazzModal(false)}
                  className="w-full py-1.5 text-xs text-neutral-500 hover:text-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* PayPal Modal */}
      {showPayPalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#003087] px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#003087] font-bold text-sm">
                  P
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">PayPal Checkout</h3>
                  <p className="text-[10px] text-blue-200">256-Bit SSL Encrypted</p>
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

            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <p className="text-xs text-neutral-500">Merchant</p>
                  <p className="font-bold text-sm text-black">SHOP.CO Official Store</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500">Total Due</p>
                  <p className="font-extrabold text-base text-black">{formatPrice(finalTotal)}</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#F0F0F0] rounded-2xl text-xs space-y-1">
                <p className="text-neutral-500 font-semibold uppercase text-[10px]">Logged in as</p>
                <p className="font-bold text-black">{formData.email}</p>
                <p className="text-neutral-500 text-[11px]">PayPal Balance Available</p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleApprovePayPal}
                  disabled={payPalProcessing}
                  className="w-full py-3.5 rounded-full font-bold text-white bg-[#0070BA] hover:bg-[#005ea6] shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {payPalProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authorizing PayPal...</span>
                    </>
                  ) : (
                    <span>Complete Purchase ({formatPrice(finalTotal)})</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowPayPalModal(false)}
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
