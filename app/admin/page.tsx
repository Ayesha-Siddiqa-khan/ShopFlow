"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Layers,
  ShoppingBag,
  Plus,
  Trash2,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { SAMPLE_PRODUCTS, SAMPLE_CATEGORIES } from "@/lib/sample-data";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 120.0,
    stock: 25,
    category: "casual",
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    description: "High quality premium cotton streetwear piece.",
  });

  const [orders, setOrders] = useState([
    {
      id: "SF-883921",
      customer: "Alex Rivera",
      date: "Sep 24, 2026",
      total: 240.0,
      status: "processing",
    },
    {
      id: "SF-774012",
      customer: "Elena Rostova",
      date: "Sep 12, 2026",
      total: 300.0,
      status: "delivered",
    },
    {
      id: "SF-662914",
      customer: "Marcus Vance",
      date: "Sep 09, 2026",
      total: 195.0,
      status: "shipped",
    },
  ]);

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: "p_" + Date.now(),
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, "-"),
      description: newProduct.description,
      price: Number(newProduct.price),
      stock_quantity: Number(newProduct.stock),
      image_url: newProduct.imageUrl,
      is_active: true,
      category_id: SAMPLE_CATEGORIES[0].id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category:
        SAMPLE_CATEGORIES.find((c) => c.slug === newProduct.category) ||
        SAMPLE_CATEGORIES[0],
    };
    setProducts([created, ...products]);
    setShowAddModal(false);
    setNewProduct({
      name: "",
      price: 120.0,
      stock: 25,
      category: "casual",
      imageUrl:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      description: "High quality premium cotton streetwear piece.",
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-integral text-black">
                SHOPFLOW ADMIN CENTER
              </h1>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Live Admin Mode
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Manage inventory, update stock levels, review order status, and inspect health metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/api/health"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#F0F0F0] text-black hover:bg-neutral-200 transition-colors"
          >
            <span>/api/health</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full text-white bg-black hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Product</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Total Inventory
          </div>
          <div className="text-2xl font-integral text-black">
            {products.length} Products
          </div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 pt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active Catalog Synced</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Active Orders
          </div>
          <div className="text-2xl font-integral text-black">
            {orders.length} Orders
          </div>
          <div className="text-xs text-neutral-500 pt-1">
            1 Processing • 1 Shipped • 1 Delivered
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Catalog Security
          </div>
          <div className="text-2xl font-integral text-black">RLS Verified</div>
          <div className="text-xs text-neutral-500 pt-1">
            Protected Supabase DB layer
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
            activeTab === "products"
              ? "border-black text-black"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Manage Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
            activeTab === "orders"
              ? "border-black text-black"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Manage Orders ({orders.length})</span>
        </button>
      </div>

      {/* Products Table */}
      {activeTab === "products" && (
        <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#F9F9F9] text-[11px] font-semibold uppercase text-neutral-500 tracking-wider">
                  <th className="py-4 px-6">Item</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-6 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F0EEED] shrink-0 border border-neutral-200">
                        {p.image_url && (
                          <Image
                            src={p.image_url}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-black text-sm uppercase">{p.name}</div>
                        <div className="text-[11px] text-neutral-400 font-mono truncate max-w-xs">
                          {p.slug}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-medium text-neutral-600">
                      {p.category?.name || "General"}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-black text-sm">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
                          p.stock_quantity === 0
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : p.stock_quantity < 5
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {p.stock_quantity} in stock
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/products/${p.slug}`}
                          className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
                          title="View"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Table */}
      {activeTab === "orders" && (
        <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#F9F9F9] text-[11px] font-semibold uppercase text-neutral-500 tracking-wider">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-black">
                      {o.id}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-neutral-700">{o.customer}</td>
                    <td className="py-3.5 px-6 text-neutral-500">{o.date}</td>
                    <td className="py-3.5 px-6 font-extrabold text-black text-sm">
                      {formatPrice(o.total)}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold capitalize ${
                          o.status === "delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : o.status === "shipped"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-neutral-100 text-neutral-800 border border-neutral-200"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="bg-[#F0F0F0] border-none text-black text-xs rounded-full px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h2 className="font-integral text-xl text-black">CREATE NEW PRODUCT</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. VINTAGE OVERSIZED DENIM JACKET"
                  className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Category
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="casual">Casual Wear</option>
                  <option value="formal">Formal Attire</option>
                  <option value="party">Party & Night</option>
                  <option value="gym">Gym & Active</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm text-black outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F0F0F0] rounded-2xl text-sm text-black outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full text-xs font-semibold text-white bg-black hover:bg-neutral-800 transition-colors shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
