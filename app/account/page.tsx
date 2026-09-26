"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Package, LogOut, ShieldCheck, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "SF-883921",
    date: "Sep 24, 2026",
    total: 240.00,
    status: "processing",
    items: [
      { name: "SKINNY FIT JEANS", quantity: 1, price: 240.00 },
    ],
  },
  {
    id: "SF-774012",
    date: "Sep 12, 2026",
    total: 300.0,
    status: "delivered",
    items: [
      { name: "T-SHIRT WITH TAPE DETAILS", quantity: 1, price: 120.0 },
      { name: "CHECKERED SHIRT", quantity: 1, price: 180.0 },
    ],
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [currentUser, setCurrentUser] = useState({
    name: "Pro Editor",
    email: "proeditorpakistanifeeling@gmail.com",
    role: "customer",
  });
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("shopflow_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setCurrentUser({
            name: parsed.name || parsed.email?.split("@")[0] || "Valued Customer",
            email: parsed.email || "customer@example.com",
            role: parsed.role || "customer",
          });
        }
        const storedOrders = localStorage.getItem("shopflow_orders");
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          if (Array.isArray(parsedOrders) && parsedOrders.length > 0) {
            setOrders([...parsedOrders, ...MOCK_ORDERS]);
          }
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    document.cookie = "shopflow_user=; path=/; max-age=0";
    try {
      localStorage.removeItem("shopflow_user");
    } catch {}
    window.location.href = "/login";
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("shopflow_user", JSON.stringify(currentUser));
      const cookieValue = encodeURIComponent(JSON.stringify(currentUser));
      document.cookie = `shopflow_user=${cookieValue}; path=/; max-age=2592000; SameSite=Lax`;
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white shadow-md font-bold text-lg uppercase">
            {currentUser.name.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">
              {currentUser.name}
            </h1>
            <p className="text-xs text-neutral-500">{currentUser.email} • Member since 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full bg-[#F0F0F0] text-black hover:bg-neutral-200"
          >
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>Admin Portal</span>
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 cursor-pointer ${
            activeTab === "orders"
              ? "border-black text-black"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 cursor-pointer ${
            activeTab === "profile"
              ? "border-black text-black"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Details</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "orders" ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-xs text-neutral-400">Order ID</span>
                  <p className="font-bold text-black font-mono">{order.id}</p>
                </div>
                <div>
                  <span className="text-xs text-neutral-400">Date</span>
                  <p className="text-xs font-medium text-black">{order.date}</p>
                </div>
                <div>
                  <span className="text-xs text-neutral-400">Total</span>
                  <p className="font-extrabold text-black">{formatPrice(order.total)}</p>
                </div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      order.status === "delivered"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-neutral-600">
                    <span>
                      {item.quantity}x <span className="font-medium text-black uppercase">{item.name}</span>
                    </span>
                    <span className="font-semibold text-black">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSaveProfile} className="bg-white p-8 rounded-3xl border border-neutral-200 max-w-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-black">Personal Information</h2>
            {savedSuccess && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white rounded-full font-semibold text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
