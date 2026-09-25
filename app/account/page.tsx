"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, LogOut, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "SF-883921",
    date: "Sep 24, 2026",
    total: 289.99,
    status: "processing",
    items: [
      { name: "Aura Flow Wireless ANC Headphones", quantity: 1, price: 289.99 },
    ],
  },
  {
    id: "SF-774012",
    date: "Sep 12, 2026",
    total: 174.0,
    status: "delivered",
    items: [
      { name: "Oversized Heavyweight Fleece Hoodie", quantity: 1, price: 110.0 },
      { name: "Ceramic Pour-Over & Carafe Set", quantity: 1, price: 64.0 },
    ],
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Alex Rivera
            </h1>
            <p className="text-xs text-zinc-400">alex@example.com • Member since 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Switch to Admin</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 border border-zinc-800 text-rose-400 hover:bg-rose-950/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
            activeTab === "orders"
              ? "border-indigo-500 text-white"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({MOCK_ORDERS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
            activeTab === "profile"
              ? "border-indigo-500 text-white"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Details</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "orders" ? (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div>
                  <div className="text-xs text-zinc-500">Order ID</div>
                  <div className="font-mono text-sm font-bold text-white">{order.id}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Date Placed</div>
                  <div className="text-xs text-zinc-300">{order.date}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Total Amount</div>
                  <div className="font-bold text-sm text-indigo-400">
                    {formatPrice(order.total)}
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      order.status === "delivered"
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/50"
                        : "bg-indigo-950/80 text-indigo-300 border border-indigo-800/50"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Ordered Items
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-zinc-200">
                      {item.name} <span className="text-zinc-500">× {item.quantity}</span>
                    </span>
                    <span className="text-zinc-400 font-mono">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-xl p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4">
          <h3 className="text-base font-bold text-white">Shipping Address</h3>
          <div className="text-xs text-zinc-300 space-y-1">
            <p className="font-medium text-white">Alex Rivera</p>
            <p>742 Evergreen Terrace</p>
            <p>San Francisco, CA 94107</p>
            <p>United States</p>
          </div>
          <div className="pt-4 border-t border-zinc-800">
            <span className="text-xs text-emerald-400">
              Account status: Verified Customer (Supabase Auth)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
