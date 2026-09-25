"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, LogOut, ShieldCheck } from "lucide-react";
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">
              Alex Rivera
            </h1>
            <p className="text-xs text-neutral-500">alex@example.com • Member since 2026</p>
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
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
            activeTab === "orders"
              ? "border-black text-black"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({MOCK_ORDERS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
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
          {MOCK_ORDERS.map((order) => (
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
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 max-w-xl space-y-6">
          <h2 className="font-bold text-lg text-black">Personal Information</h2>
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Alex Rivera"
                className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="alex@example.com"
                className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none"
              />
            </div>
            <button className="px-8 py-3 bg-black text-white rounded-full font-semibold text-xs hover:bg-neutral-800">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
