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
  Zap,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

// Pakistani Payment Gateway Types
type PakistaniPaymentType = "sadapay" | "nayapay" | "paypak" | "jazzcash" | "easypaisa";

function createOrderId(): string {
  return "PK-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000);
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
    address: "House 42, Street 7, F-8/2",
    city: "Islamabad",
    province: "ICT",
    postalCode: "44000",
  });

  const [paymentMethod, setPaymentMethod] = useState<PakistaniPaymentType>("sadapay");

  // SadaPay Card State
  const [sadaDetails, setSadaDetails] = useState({
    number: "4111 8920 7481 9924",
    expiry: "11/29",
    cvc: "831",
    name: "PRO EDITOR",
  });

  // NayaPay Card State
  const [nayaDetails, setNayaDetails] = useState({
    number: "4214 6702 3319 8812",
    expiry: "07/30",
    cvc: "492",
    name: "PRO EDITOR",
  });

  // PayPak (1LINK) Card State
  const [paypakDetails, setPaypakDetails] = useState({
    number: "6038 9201 4458 7720",
    expiry: "05/28",
    cvc: "619",
    name: "PRO EDITOR",
    bank: "Meezan Bank",
  });

  // JazzCash Wallet State
  const [jazzMobile, setJazzMobile] = useState("0300 1234567");
  const [jazzCnic, setJazzCnic] = useState("37405-1234567-1");
  const [showJazzModal, setShowJazzModal] = useState(false);
  const [jazzMpin, setJazzMpin] = useState("");
  const [jazzProcessing, setJazzProcessing] = useState(false);

  // EasyPaisa Wallet State
  const [easyMobile, setEasyMobile] = useState("0345 7654321");
  const [showEasyModal, setShowEasyModal] = useState(false);
  const [easyPin, setEasyPin] = useState("");
  const [easyProcessing, setEasyProcessing] = useState(false);

  // Active CVV highlight state for virtual card
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [confirmedPaymentLabel, setConfirmedPaymentLabel] = useState("");

  const discount = subtotal > 100 ? subtotal * 0.2 : 0;
  const finalTotal = total - discount;

  // Conversion rate: 1 USD ≈ 278.5 PKR
  const pkrRate = 278.5;
  const pkrTotal = Math.round(finalTotal * pkrRate);
  const formatPKR = (amt: number) => "₨ " + amt.toLocaleString("en-PK");

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
            setSadaDetails((prev) => ({ ...prev, name: upper }));
            setNayaDetails((prev) => ({ ...prev, name: upper }));
            setPaypakDetails((prev) => ({ ...prev, name: upper }));
          }
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCardNumberChange = (val: string, type: "sadapay" | "nayapay" | "paypak") => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
    if (type === "sadapay") {
      setSadaDetails((prev) => ({ ...prev, number: formatted }));
    } else if (type === "nayapay") {
      setNayaDetails((prev) => ({ ...prev, number: formatted }));
    } else {
      setPaypakDetails((prev) => ({ ...prev, number: formatted }));
    }
  };

  const handleCardExpiryChange = (val: string, type: "sadapay" | "nayapay" | "paypak") => {
    let raw = val.replace(/\D/g, "").slice(0, 4);
    if (raw.length > 2) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    if (type === "sadapay") {
      setSadaDetails((prev) => ({ ...prev, expiry: raw }));
    } else if (type === "nayapay") {
      setNayaDetails((prev) => ({ ...prev, expiry: raw }));
    } else {
      setPaypakDetails((prev) => ({ ...prev, expiry: raw }));
    }
  };

  const handleCardCvcChange = (val: string, type: "sadapay" | "nayapay" | "paypak") => {
    const raw = val.replace(/\D/g, "").slice(0, 4);
    if (type === "sadapay") {
      setSadaDetails((prev) => ({ ...prev, cvc: raw }));
    } else if (type === "nayapay") {
      setNayaDetails((prev) => ({ ...prev, cvc: raw }));
    } else {
      setPaypakDetails((prev) => ({ ...prev, cvc: raw }));
    }
  };

  const fillDemoSadaPay = () => {
    setSadaDetails({
      number: "4111 8920 7481 9924",
      expiry: "11/29",
      cvc: "831",
      name: formData.fullName ? formData.fullName.toUpperCase() : "PRO EDITOR",
    });
  };

  const fillDemoNayaPay = () => {
    setNayaDetails({
      number: "4214 6702 3319 8812",
      expiry: "07/30",
      cvc: "492",
      name: formData.fullName ? formData.fullName.toUpperCase() : "PRO EDITOR",
    });
  };

  const fillDemoPayPak = () => {
    setPaypakDetails({
      number: "6038 9201 4458 7720",
      expiry: "05/28",
      cvc: "619",
      name: formData.fullName ? formData.fullName.toUpperCase() : "PRO EDITOR",
      bank: "Meezan Bank Pakistan",
    });
  };

  const getPaymentLabel = (method: PakistaniPaymentType = paymentMethod) => {
    switch (method) {
      case "sadapay": {
        const last4 = sadaDetails.number.replace(/\s/g, "").slice(-4) || "9924";
        return `SadaPay Card (•••• ${last4})`;
      }
      case "nayapay": {
        const last4 = nayaDetails.number.replace(/\s/g, "").slice(-4) || "8812";
        return `NayaPay Visa (•••• ${last4})`;
      }
      case "paypak": {
        const last4 = paypakDetails.number.replace(/\s/g, "").slice(-4) || "7720";
        return `PayPak 1LINK (${paypakDetails.bank} •••• ${last4})`;
      }
      case "jazzcash":
        return `JazzCash Mobile Wallet (${jazzMobile})`;
      case "easypaisa":
        return `EasyPaisa Wallet (${easyMobile})`;
    }
  };

  // Complete and save order
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
        pkrTotal: pkrTotal,
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

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "jazzcash") {
      setShowJazzModal(true);
      return;
    }

    if (paymentMethod === "easypaisa") {
      setShowEasyModal(true);
      return;
    }

    // Default card submission (SadaPay, NayaPay, PayPak)
    finalizeOrder();
  };

  // JazzCash Approval Simulation
  const handleApproveJazz = async () => {
    setJazzProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setJazzProcessing(false);
    setShowJazzModal(false);
    await finalizeOrder(`JazzCash Wallet (Account: ${jazzMobile} • Ref #${createRefId("JC")})`);
  };

  // EasyPaisa Approval Simulation
  const handleApproveEasy = async () => {
    setEasyProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setEasyProcessing(false);
    setShowEasyModal(false);
    await finalizeOrder(`EasyPaisa Wallet (Account: ${easyMobile} • TRX #${createRefId("EP")})`);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1.5 rounded-full inline-block">
            Payment Verified &amp; Order Placed
          </span>
          <h1 className="font-integral text-3xl sm:text-4xl text-black">
            SHUKRIYA! ORDER CONFIRMED
          </h1>
          <p className="text-sm text-neutral-600">
            Order Reference: <span className="font-mono text-black font-extrabold">{orderId}</span>
          </p>
          {confirmedPaymentLabel && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200 text-xs text-black font-medium shadow-xs">
              <span className="text-teal-800 font-semibold">Pakistani Gateway:</span>
              <span className="font-bold text-black">{confirmedPaymentLabel}</span>
            </div>
          )}
          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-neutral-200 max-w-md mx-auto text-xs space-y-1">
            <div className="flex justify-between text-neutral-600">
              <span>Paid Amount (USD):</span>
              <span className="font-bold text-black">{formatPrice(finalTotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Settled in PKR:</span>
              <span className="font-extrabold text-emerald-700">{formatPKR(pkrTotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-500 text-[11px] pt-1 border-t border-neutral-200">
              <span>Delivery Address:</span>
              <span className="font-medium text-black">{formData.address}, {formData.city}</span>
            </div>
          </div>
          <p className="text-xs text-neutral-500 max-w-md mx-auto pt-2">
            A confirmation SMS &amp; receipt have been dispatched to <span className="text-black font-semibold">{formData.phone}</span> ({formData.email}).
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-black bg-neutral-100 hover:bg-neutral-200 text-xs uppercase tracking-wider transition-colors cursor-pointer"
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
      {/* Header with Pakistani Flag & Gateway Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <h1 className="font-integral text-3xl sm:text-4xl text-black">
              CHECKOUT
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              🇵🇰 Pakistan Gateway Active
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Official support for SadaPay, NayaPay, PayPak (1LINK), JazzCash, and EasyPaisa.
          </p>
        </div>

        {/* Currency Rate Box */}
        <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 text-right">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 block">
            State Bank Rate
          </span>
          <p className="font-mono text-xs font-extrabold text-black">
            1 USD = {pkrRate.toFixed(2)} PKR
          </p>
          <span className="text-[10px] text-neutral-500 font-medium">
            Zero International Markup
          </span>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Shipping Form & Pakistani Payment Options */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Shipping Information with colorful modern accent */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  1
                </div>
                <div>
                  <h2 className="font-bold text-base text-black">Delivery &amp; Customer Information</h2>
                  <p className="text-xs text-neutral-500">Shipping across all cities in Pakistan</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                TCS / Leopards Courier
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-neutral-200 rounded-2xl text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Phone Number (for OTP &amp; Delivery)
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="0300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-neutral-200 rounded-2xl text-sm font-mono text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-neutral-200 rounded-2xl text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Complete Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="House / Flat #, Street, Sector / Area"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-neutral-200 rounded-2xl text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-neutral-200 rounded-2xl text-sm text-black outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all cursor-pointer"
                >
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Multan">Multan</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Gujranwala">Gujranwala</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-neutral-200 rounded-2xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pakistani Payment Gateways with Vibrant Colors & Authentic Designs */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  2
                </div>
                <div>
                  <h2 className="font-bold text-base text-black">Select Pakistani Payment Gateway</h2>
                  <p className="text-xs text-neutral-500">Fast, 3D secure simulation with Pakistani cards &amp; wallets</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>1LINK / SBP Verified</span>
              </span>
            </div>

            {/* 5 Distinct Pakistani Payment Options */}
            <div className="space-y-4">
              
              {/* Option 1: SADAPAY (Teal & Peach Signature Aesthetic) */}
              <div
                onClick={() => setPaymentMethod("sadapay")}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === "sadapay"
                    ? "border-[#00A896] bg-teal-50/40 shadow-md ring-2 ring-[#00A896]/20"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "sadapay"}
                      onChange={() => setPaymentMethod("sadapay")}
                      className="w-4 h-4 text-[#00A896] accent-[#00A896] cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-black">SadaPay Card</span>
                      <span className="text-[10px] font-extrabold uppercase text-[#007063] bg-[#e0f7f4] px-2.5 py-0.5 rounded-full border border-[#00A896]/30">
                        0% Foreign Fee
                      </span>
                    </div>
                  </div>
                  {/* SadaPay Badge */}
                  <div className="h-8 px-3 rounded-lg bg-[#042A2B] text-white flex items-center justify-center shadow-xs">
                    <span className="font-bold text-xs tracking-tight text-[#00A896]">sada<span className="text-[#FF7A59]">pay</span></span>
                  </div>
                </div>

                {paymentMethod === "sadapay" && (
                  <div className="mt-5 pt-5 border-t border-teal-200/60 space-y-4 animate-in fade-in duration-200">
                    
                    {/* SadaPay 3D Virtual Card */}
                    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-tr from-[#022627] via-[#0B4F50] to-[#00A896] text-white shadow-2xl overflow-hidden border border-teal-300/30 select-none">
                      {/* Trademark SadaPay Peach Accent Glow */}
                      <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#FF7A59]/20 blur-2xl pointer-events-none" />
                      <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-[#00A896]/30 blur-2xl pointer-events-none" />

                      <div className="relative z-10 flex flex-col justify-between h-full">
                        {/* Top: Chip & SadaPay Logo */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Metallic EMV Chip */}
                            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-400 shadow-inner flex items-center justify-center">
                              <div className="w-6 h-4 border border-amber-600/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                                <span className="border-r border-amber-600/40" />
                                <span />
                              </div>
                            </div>
                            {/* Contactless Icon */}
                            <svg className="w-5 h-5 text-teal-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                              <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                              <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                            </svg>
                          </div>
                          {/* SadaPay Wordmark */}
                          <div className="text-right">
                            <span className="font-extrabold text-base tracking-tighter text-white">
                              sada<span className="text-[#FF7A59]">pay</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-widest block text-teal-200/80 font-bold">Debit</span>
                          </div>
                        </div>

                        {/* Middle: Card Number */}
                        <div className="py-1">
                          <p className="font-mono text-base sm:text-xl tracking-[0.22em] font-bold text-white drop-shadow-md">
                            {sadaDetails.number || "•••• •••• •••• ••••"}
                          </p>
                        </div>

                        {/* Bottom: Cardholder, Expiry & CVV */}
                        <div className="flex items-end justify-between text-xs">
                          <div className="max-w-[190px]">
                            <span className="text-[8px] uppercase tracking-wider text-teal-200 block font-bold">CARDHOLDER</span>
                            <p className="font-medium tracking-wide uppercase truncate text-white">
                              {sadaDetails.name || formData.fullName.toUpperCase()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-right">
                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-teal-200 block font-bold">EXPIRES</span>
                              <p className="font-mono font-bold text-white">{sadaDetails.expiry || "11/29"}</p>
                            </div>
                            <div className={`transition-all px-2 py-0.5 rounded ${isCvvFocused ? "bg-[#FF7A59]/40 ring-1 ring-[#FF7A59]" : ""}`}>
                              <span className="text-[8px] uppercase tracking-wider text-teal-200 block font-bold">CVV</span>
                              <p className="font-mono font-bold text-white">{sadaDetails.cvc ? "•••" : "831"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auto-fill Helper */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-neutral-500 font-medium">SadaPay Virtual / Physical Card</span>
                      <button
                        type="button"
                        onClick={fillDemoSadaPay}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007063] hover:text-[#004d44] bg-[#e0f7f4] hover:bg-[#cbf1eb] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-fill Demo SadaPay</span>
                      </button>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          SadaPay 16-Digit Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4111 8920 7481 9924"
                          value={sadaDetails.number}
                          onChange={(e) => handleCardNumberChange(e.target.value, "sadapay")}
                          maxLength={19}
                          className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#00A896]/20 focus:border-[#00A896]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={sadaDetails.expiry}
                            onChange={(e) => handleCardExpiryChange(e.target.value, "sadapay")}
                            maxLength={5}
                            className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#00A896]/20 focus:border-[#00A896]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Security Code (CVC)
                          </label>
                          <input
                            type="text"
                            placeholder="831"
                            value={sadaDetails.cvc}
                            onChange={(e) => handleCardCvcChange(e.target.value, "sadapay")}
                            onFocus={() => setIsCvvFocused(true)}
                            onBlur={() => setIsCvvFocused(false)}
                            maxLength={3}
                            className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#00A896]/20 focus:border-[#00A896]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="PRO EDITOR"
                          value={sadaDetails.name}
                          onChange={(e) => setSadaDetails({ ...sadaDetails, name: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-semibold uppercase text-black outline-none focus:ring-2 focus:ring-[#00A896]/20 focus:border-[#00A896]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => finalizeOrder()}
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full font-bold text-white bg-[#00A896] hover:bg-[#008f80] shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Pay {formatPrice(finalTotal)} ({formatPKR(pkrTotal)}) via SadaPay</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Option 2: NAYAPAY (Sunset Orange & Magenta Aesthetic) */}
              <div
                onClick={() => setPaymentMethod("nayapay")}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === "nayapay"
                    ? "border-[#FF512F] bg-orange-50/40 shadow-md ring-2 ring-[#FF512F]/20"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "nayapay"}
                      onChange={() => setPaymentMethod("nayapay")}
                      className="w-4 h-4 text-[#FF512F] accent-[#FF512F] cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-black">NayaPay Visa</span>
                      <span className="text-[10px] font-extrabold uppercase text-[#b83800] bg-[#ffece6] px-2.5 py-0.5 rounded-full border border-[#FF512F]/30">
                        EMI Verified
                      </span>
                    </div>
                  </div>
                  {/* NayaPay Badge */}
                  <div className="h-8 px-3 rounded-lg bg-gradient-to-r from-[#FF512F] to-[#DD2476] text-white flex items-center justify-center shadow-xs font-bold text-xs tracking-tight">
                    NayaPay
                  </div>
                </div>

                {paymentMethod === "nayapay" && (
                  <div className="mt-5 pt-5 border-t border-orange-200/60 space-y-4 animate-in fade-in duration-200">
                    
                    {/* NayaPay 3D Virtual Card */}
                    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-tr from-[#FF512F] via-[#DD2476] to-[#8E2DE2] text-white shadow-2xl overflow-hidden border border-orange-300/30 select-none">
                      <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-white/20 blur-2xl pointer-events-none" />

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
                          <div className="text-right">
                            <span className="font-extrabold text-base tracking-tight text-white">
                              NayaPay
                            </span>
                            <span className="text-[9px] uppercase tracking-widest block text-orange-100 font-bold">Visa Debit</span>
                          </div>
                        </div>

                        <div className="py-1">
                          <p className="font-mono text-base sm:text-xl tracking-[0.22em] font-bold text-white drop-shadow-md">
                            {nayaDetails.number || "•••• •••• •••• ••••"}
                          </p>
                        </div>

                        <div className="flex items-end justify-between text-xs">
                          <div className="max-w-[190px]">
                            <span className="text-[8px] uppercase tracking-wider text-orange-200 block font-bold">CARDHOLDER</span>
                            <p className="font-medium tracking-wide uppercase truncate text-white">
                              {nayaDetails.name || formData.fullName.toUpperCase()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-right">
                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-orange-200 block font-bold">EXPIRES</span>
                              <p className="font-mono font-bold text-white">{nayaDetails.expiry || "07/30"}</p>
                            </div>
                            <div className={`transition-all px-2 py-0.5 rounded ${isCvvFocused ? "bg-white/40 ring-1 ring-white" : ""}`}>
                              <span className="text-[8px] uppercase tracking-wider text-orange-200 block font-bold">CVV</span>
                              <p className="font-mono font-bold text-white">{nayaDetails.cvc ? "•••" : "492"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auto-fill Helper */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-neutral-500 font-medium">NayaPay Visa Debit Card</span>
                      <button
                        type="button"
                        onClick={fillDemoNayaPay}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b83800] hover:text-[#8f2c00] bg-[#ffece6] hover:bg-[#ffd9cc] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-fill Demo NayaPay</span>
                      </button>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          NayaPay Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4214 6702 3319 8812"
                          value={nayaDetails.number}
                          onChange={(e) => handleCardNumberChange(e.target.value, "nayapay")}
                          maxLength={19}
                          className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#FF512F]/20 focus:border-[#FF512F]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={nayaDetails.expiry}
                            onChange={(e) => handleCardExpiryChange(e.target.value, "nayapay")}
                            maxLength={5}
                            className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#FF512F]/20 focus:border-[#FF512F]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Security Code (CVV)
                          </label>
                          <input
                            type="text"
                            placeholder="492"
                            value={nayaDetails.cvc}
                            onChange={(e) => handleCardCvcChange(e.target.value, "nayapay")}
                            onFocus={() => setIsCvvFocused(true)}
                            onBlur={() => setIsCvvFocused(false)}
                            maxLength={3}
                            className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#FF512F]/20 focus:border-[#FF512F]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="PRO EDITOR"
                          value={nayaDetails.name}
                          onChange={(e) => setNayaDetails({ ...nayaDetails, name: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-semibold uppercase text-black outline-none focus:ring-2 focus:ring-[#FF512F]/20 focus:border-[#FF512F]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => finalizeOrder()}
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:opacity-95 shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Pay {formatPrice(finalTotal)} ({formatPKR(pkrTotal)}) via NayaPay</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Option 3: PAYPAK / 1LINK (Pakistan National Card Scheme - Emerald & Gold) */}
              <div
                onClick={() => setPaymentMethod("paypak")}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === "paypak"
                    ? "border-emerald-600 bg-emerald-50/40 shadow-md ring-2 ring-emerald-600/20"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "paypak"}
                      onChange={() => setPaymentMethod("paypak")}
                      className="w-4 h-4 text-emerald-600 accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-black">PayPak (1LINK Domestic)</span>
                      <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        SBP National Scheme
                      </span>
                    </div>
                  </div>
                  {/* PayPak Badge */}
                  <div className="h-8 px-3 rounded-lg bg-[#004225] border border-amber-400 text-white flex items-center justify-center shadow-xs">
                    <span className="font-extrabold text-xs tracking-wider text-amber-300">PayPak</span>
                  </div>
                </div>

                {paymentMethod === "paypak" && (
                  <div className="mt-5 pt-5 border-t border-emerald-200/60 space-y-4 animate-in fade-in duration-200">
                    
                    {/* PayPak 3D Virtual Card */}
                    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-tr from-[#003822] via-[#0B6623] to-[#15803d] text-white shadow-2xl overflow-hidden border border-amber-300/40 select-none">
                      {/* Pakistani Crescent & Star Watermark */}
                      <div className="absolute right-4 bottom-4 w-32 h-32 rounded-full border-8 border-white/5 opacity-40 pointer-events-none" />

                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-400 shadow-inner flex items-center justify-center">
                              <div className="w-6 h-4 border border-amber-600/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                                <span className="border-r border-amber-600/40" />
                                <span />
                              </div>
                            </div>
                            <span className="font-bold text-xs tracking-wider text-amber-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-amber-300/40">
                              1LINK
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-lg tracking-wider text-amber-300 font-sans">
                              PayPak
                            </span>
                            <span className="text-[9px] uppercase tracking-widest block text-emerald-200 font-bold">{paypakDetails.bank}</span>
                          </div>
                        </div>

                        <div className="py-1">
                          <p className="font-mono text-base sm:text-xl tracking-[0.22em] font-bold text-white drop-shadow-md">
                            {paypakDetails.number || "•••• •••• •••• ••••"}
                          </p>
                        </div>

                        <div className="flex items-end justify-between text-xs">
                          <div className="max-w-[190px]">
                            <span className="text-[8px] uppercase tracking-wider text-emerald-200 block font-bold">CARDHOLDER</span>
                            <p className="font-medium tracking-wide uppercase truncate text-white">
                              {paypakDetails.name || formData.fullName.toUpperCase()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-right">
                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-emerald-200 block font-bold">VALID THRU</span>
                              <p className="font-mono font-bold text-white">{paypakDetails.expiry || "05/28"}</p>
                            </div>
                            <div className={`transition-all px-2 py-0.5 rounded ${isCvvFocused ? "bg-amber-400/40 ring-1 ring-amber-300" : ""}`}>
                              <span className="text-[8px] uppercase tracking-wider text-emerald-200 block font-bold">CVV</span>
                              <p className="font-mono font-bold text-white">{paypakDetails.cvc ? "•••" : "619"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auto-fill Helper */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-neutral-500 font-medium">All Pakistani Commercial Banks</span>
                      <button
                        type="button"
                        onClick={fillDemoPayPak}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-fill Demo PayPak</span>
                      </button>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          Issuing Pakistani Bank
                        </label>
                        <select
                          value={paypakDetails.bank}
                          onChange={(e) => setPaypakDetails({ ...paypakDetails, bank: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                        >
                          <option value="Meezan Bank">Meezan Bank (Islamic Banking)</option>
                          <option value="Habib Bank Limited (HBL)">Habib Bank Limited (HBL)</option>
                          <option value="United Bank Limited (UBL)">United Bank Limited (UBL)</option>
                          <option value="Bank Alfalah">Bank Alfalah</option>
                          <option value="MCB Bank">MCB Bank</option>
                          <option value="Faysal Bank">Faysal Bank</option>
                          <option value="National Bank of Pakistan (NBP)">National Bank of Pakistan (NBP)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          PayPak 16-Digit Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="6038 9201 4458 7720"
                          value={paypakDetails.number}
                          onChange={(e) => handleCardNumberChange(e.target.value, "paypak")}
                          maxLength={19}
                          className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paypakDetails.expiry}
                            onChange={(e) => handleCardExpiryChange(e.target.value, "paypak")}
                            maxLength={5}
                            className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Security Code (CVV)
                          </label>
                          <input
                            type="text"
                            placeholder="619"
                            value={paypakDetails.cvc}
                            onChange={(e) => handleCardCvcChange(e.target.value, "paypak")}
                            onFocus={() => setIsCvvFocused(true)}
                            onBlur={() => setIsCvvFocused(false)}
                            maxLength={3}
                            className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => finalizeOrder()}
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full font-bold text-white bg-[#004225] hover:bg-[#002f1a] shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-amber-300" />
                      <span>Pay {formatPrice(finalTotal)} ({formatPKR(pkrTotal)}) via PayPak</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Option 4: JAZZCASH (Crimson Red & Golden Amber Aesthetic) */}
              <div
                onClick={() => setPaymentMethod("jazzcash")}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === "jazzcash"
                    ? "border-[#EC1C24] bg-red-50/40 shadow-md ring-2 ring-[#EC1C24]/20"
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
                      className="w-4 h-4 text-[#EC1C24] accent-[#EC1C24] cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-black">JazzCash Mobile Wallet</span>
                      <span className="text-[10px] font-extrabold uppercase text-[#9c0f14] bg-[#ffebee] px-2.5 py-0.5 rounded-full border border-[#EC1C24]/30">
                        Instant USSD / MPIN
                      </span>
                    </div>
                  </div>
                  {/* JazzCash Badge */}
                  <div className="h-8 px-3 rounded-lg bg-[#EC1C24] text-white flex items-center justify-center shadow-xs font-bold text-xs tracking-wider">
                    Jazz<span className="text-[#FFC20E]">Cash</span>
                  </div>
                </div>

                {paymentMethod === "jazzcash" && (
                  <div className="mt-5 pt-5 border-t border-red-200/60 space-y-4 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-200/80 flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#EC1C24] text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-sm">
                        JC
                      </div>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-black">Mobilink Microfinance Bank Limited</p>
                        <p className="text-neutral-600">
                          Approve payment directly from your JazzCash wallet via instant mobile authorization prompt.
                        </p>
                        <p className="text-[11px] font-mono text-[#EC1C24] font-bold">
                          Converted Total: {formatPKR(pkrTotal)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          JazzCash Mobile Number
                        </label>
                        <input
                          type="tel"
                          placeholder="0300 1234567"
                          value={jazzMobile}
                          onChange={(e) => setJazzMobile(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#EC1C24]/20 focus:border-[#EC1C24]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          Account CNIC (Last 6 Digits)
                        </label>
                        <input
                          type="text"
                          placeholder="37405-1234567-1"
                          value={jazzCnic}
                          onChange={(e) => setJazzCnic(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#EC1C24]/20 focus:border-[#EC1C24]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowJazzModal(true)}
                      className="w-full py-3.5 rounded-full font-bold text-white bg-[#EC1C24] hover:bg-[#c9141b] shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-[#FFC20E]" />
                      <span>Authorize {formatPKR(pkrTotal)} with JazzCash</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Option 5: EASYPAISA (Electric Green & Forest Aesthetic) */}
              <div
                onClick={() => setPaymentMethod("easypaisa")}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === "easypaisa"
                    ? "border-[#00A551] bg-green-50/40 shadow-md ring-2 ring-[#00A551]/20"
                    : "border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "easypaisa"}
                      onChange={() => setPaymentMethod("easypaisa")}
                      className="w-4 h-4 text-[#00A551] accent-[#00A551] cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-black">EasyPaisa Mobile Wallet</span>
                      <span className="text-[10px] font-extrabold uppercase text-[#007338] bg-[#e6f7ee] px-2.5 py-0.5 rounded-full border border-[#00A551]/30">
                        Telenor Bank
                      </span>
                    </div>
                  </div>
                  {/* EasyPaisa Badge */}
                  <div className="h-8 px-3 rounded-lg bg-[#00A551] text-white flex items-center justify-center shadow-xs font-bold text-xs tracking-tight">
                    easypaisa
                  </div>
                </div>

                {paymentMethod === "easypaisa" && (
                  <div className="mt-5 pt-5 border-t border-green-200/60 space-y-4 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-green-200/80 flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#00A551] text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-sm">
                        EP
                      </div>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-black">Telenor Microfinance Bank</p>
                        <p className="text-neutral-600">
                          Approve payment via EasyPaisa 1-tap USSD prompt or in-app push notification on your device.
                        </p>
                        <p className="text-[11px] font-mono text-[#00A551] font-bold">
                          Converted Total: {formatPKR(pkrTotal)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        EasyPaisa Account Number (03XX-XXXXXXX)
                      </label>
                      <input
                        type="tel"
                        placeholder="0345 7654321"
                        value={easyMobile}
                        onChange={(e) => setEasyMobile(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-sm font-mono text-black outline-none focus:ring-2 focus:ring-[#00A551]/20 focus:border-[#00A551]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowEasyModal(true)}
                      className="w-full py-3.5 rounded-full font-bold text-white bg-[#00A551] hover:bg-[#008f46] shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-white" />
                      <span>Authorize {formatPKR(pkrTotal)} with EasyPaisa</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* SBP Security Seal */}
          <div className="p-6 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3 className="font-bold text-sm">State Bank of Pakistan (SBP) &amp; 1LINK Certified</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              All transactions in this simulation are encrypted using 256-bit SSL and comply with Pakistan National Payment System regulations for SadaPay, NayaPay, PayPak, JazzCash, and EasyPaisa.
            </p>
          </div>
        </div>

        {/* Right Column: Order Summary with PKR conversion */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white space-y-6 shadow-xs">
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
                <span className="text-emerald-700 font-semibold">Special Discount (-20%)</span>
                <span className="font-bold text-emerald-700">-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Fee (Pakistan-wide)</span>
              <span className="font-semibold text-black">
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Sales Tax (FBR 17% simulated)</span>
              <span className="font-semibold text-black">{formatPrice(tax)}</span>
            </div>

            {/* Total in USD and PKR */}
            <div className="pt-3 border-t border-neutral-200 space-y-1">
              <div className="flex justify-between font-bold text-base text-black">
                <span>Total Due (USD)</span>
                <span className="text-xl font-extrabold text-black">{formatPrice(finalTotal)}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-900">Total in Pakistani Rupees</span>
                <span className="text-base font-extrabold text-emerald-800">{formatPKR(pkrTotal)}</span>
              </div>
            </div>
          </div>

          {/* Sticky Checkout Place Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full font-bold text-white bg-black hover:bg-neutral-800 shadow-md text-xs uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Transaction...</span>
              </span>
            ) : paymentMethod === "sadapay" ? (
              `Pay ${formatPrice(finalTotal)} (${formatPKR(pkrTotal)}) with SadaPay`
            ) : paymentMethod === "nayapay" ? (
              `Pay ${formatPrice(finalTotal)} (${formatPKR(pkrTotal)}) with NayaPay`
            ) : paymentMethod === "paypak" ? (
              `Pay ${formatPrice(finalTotal)} (${formatPKR(pkrTotal)}) with PayPak`
            ) : paymentMethod === "jazzcash" ? (
              `Open JazzCash Portal (${formatPKR(pkrTotal)})`
            ) : (
              `Open EasyPaisa Portal (${formatPKR(pkrTotal)})`
            )}
          </button>
        </div>
      </form>

      {/* ========================================================= */}
      {/* 1. JAZZCASH AUTHENTIC SIMULATION MODAL */}
      {/* ========================================================= */}
      {showJazzModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#EC1C24] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white text-[#EC1C24] font-black text-sm flex items-center justify-center shadow-xs">
                  JC
                </div>
                <div>
                  <h3 className="font-bold text-sm">JazzCash Mobile Payment</h3>
                  <p className="text-[10px] text-red-100">State Bank of Pakistan Approved Gateway</p>
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

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200/80 text-center space-y-1">
                <p className="text-xs text-neutral-500 font-semibold uppercase">Total Amount</p>
                <p className="text-2xl font-black text-[#EC1C24]">{formatPKR(pkrTotal)}</p>
                <p className="text-[11px] text-neutral-500">ShopFlow Fashion Global • {formatPrice(finalTotal)} USD</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">JazzCash Account</span>
                  <span className="font-bold text-black font-mono">{jazzMobile}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Customer CNIC</span>
                  <span className="font-bold text-black font-mono">{jazzCnic}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Delivery To</span>
                  <span className="font-semibold text-black">{formData.city}, Pakistan</span>
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
                  className="w-full text-center tracking-[0.5em] text-xl font-mono py-3 bg-[#F8F9FA] border border-neutral-300 rounded-2xl outline-none focus:ring-2 focus:ring-[#EC1C24]/30 focus:border-[#EC1C24]"
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
                  className="w-full py-4 rounded-full font-bold text-white bg-[#EC1C24] hover:bg-[#cf151c] shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {jazzProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying with Jazz Network...</span>
                    </>
                  ) : (
                    <span>Confirm &amp; Pay {formatPKR(pkrTotal)}</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowJazzModal(false)}
                  className="w-full py-2 text-xs text-neutral-500 hover:text-black transition-colors"
                >
                  Cancel and return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. EASYPAISA AUTHENTIC SIMULATION MODAL */}
      {/* ========================================================= */}
      {showEasyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#00A551] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white text-[#00A551] font-black text-sm flex items-center justify-center shadow-xs">
                  EP
                </div>
                <div>
                  <h3 className="font-bold text-sm">EasyPaisa Telenor Wallet</h3>
                  <p className="text-[10px] text-emerald-100">1-Tap Instant USSD Checkout</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEasyModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-center space-y-1">
                <p className="text-xs text-neutral-500 font-semibold uppercase">Payable Total</p>
                <p className="text-2xl font-black text-[#00A551]">{formatPKR(pkrTotal)}</p>
                <p className="text-[11px] text-neutral-500">ShopFlow Fashion Global • {formatPrice(finalTotal)} USD</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">EasyPaisa Mobile</span>
                  <span className="font-bold text-black font-mono">{easyMobile}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Merchant Account</span>
                  <span className="font-bold text-black">ShopFlow Online Pakistan</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Delivery Destination</span>
                  <span className="font-semibold text-black">{formData.city}, Pakistan</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-neutral-700">
                  Enter 5-Digit EasyPaisa Secret PIN
                </label>
                <input
                  type="password"
                  maxLength={5}
                  placeholder="•••••"
                  value={easyPin}
                  onChange={(e) => setEasyPin(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center tracking-[0.5em] text-xl font-mono py-3 bg-[#F8F9FA] border border-neutral-300 rounded-2xl outline-none focus:ring-2 focus:ring-[#00A551]/30 focus:border-[#00A551]"
                />
                <button
                  type="button"
                  onClick={() => setEasyPin("55555")}
                  className="text-[11px] text-[#00A551] font-semibold hover:underline block text-center cursor-pointer"
                >
                  Quick-fill Demo PIN (55555)
                </button>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleApproveEasy}
                  disabled={easyProcessing}
                  className="w-full py-4 rounded-full font-bold text-white bg-[#00A551] hover:bg-[#008f46] shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {easyProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying with Telenor Bank...</span>
                    </>
                  ) : (
                    <span>Approve {formatPKR(pkrTotal)} Payment</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowEasyModal(false)}
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
