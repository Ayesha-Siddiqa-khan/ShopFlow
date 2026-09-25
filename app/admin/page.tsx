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
    price: 99.0,
    stock: 25,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    description: "High quality premium minimalist item.",
  });

  const [orders, setOrders] = useState([
    {
      id: "SF-883921",
      customer: "Alex Rivera",
      date: "Sep 24, 2026",
      total: 289.99,
      status: "processing",
    },
    {
      id: "SF-774012",
      customer: "Elena Rostova",
      date: "Sep 12, 2026",
      total: 174.0,
      status: "delivered",
    },
    {
      id: "SF-662914",
      customer: "Marcus Vance",
      date: "Sep 09, 2026",
      total: 349.5,
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
      category: SAMPLE_CATEGORIES.find((c) => c.slug === newProduct.category) || SAMPLE_CATEGORIES[0],
    };
    setProducts([created, ...products]);
    setShowAddModal(false);
    setNewProduct({
      name: "",
      price: 99.0,
      stock: 25,
      category: "electronics",
      imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
      description: "High quality premium minimalist item.",
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-indigo-500/20">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                ShopFlow Admin Center
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Live Admin Mode
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Manage inventory, update stock levels, review order status, and inspect health metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/api/health"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            <span>/api/health</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white gradient-accent shadow-md shadow-indigo-600/20 hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-4 h-4" />
            <span>Create Product</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-1">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Total Inventory
          </div>
          <div className="text-2xl font-extrabold text-white">
            {products.length} Products
          </div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 pt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active Catalog Synced</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-1">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Active Orders
          </div>
          <div className="text-2xl font-extrabold text-white">
            {orders.length} Orders
          </div>
          <div className="text-xs text-indigo-400 pt-1">
            1 Processing • 1 Shipped • 1 Delivered
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-1">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Supabase Security
          </div>
          <div className="text-2xl font-extrabold text-white">RLS Enabled</div>
          <div className="text-xs text-zinc-400 pt-1">
            Admin role verification active
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
            activeTab === "products"
              ? "border-indigo-500 text-white"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Manage Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
            activeTab === "orders"
              ? "border-indigo-500 text-white"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Manage Orders ({orders.length})</span>
        </button>
      </div>

      {/* Products Table */}
      {activeTab === "products" && (
        <div className="glass-panel rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                  <th className="py-3.5 px-4">Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                        {p.image_url && (
                          <Image
                            src={p.image_url}
                            alt={p.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{p.name}</div>
                        <div className="text-[11px] text-zinc-500 font-mono truncate max-w-xs">
                          {p.slug}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-zinc-300">
                      {p.category?.name || "General"}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-white">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          p.stock_quantity === 0
                            ? "bg-rose-950/80 text-rose-300 border border-rose-800/50"
                            : p.stock_quantity < 5
                            ? "bg-amber-950/80 text-amber-300 border border-amber-800/50"
                            : "bg-emerald-950/80 text-emerald-300 border border-emerald-800/50"
                        }`}
                      >
                        {p.stock_quantity} in stock
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/products/${p.slug}`}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                          title="View"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
        <div className="glass-panel rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {o.id}
                    </td>
                    <td className="py-3 px-4 text-zinc-300">{o.customer}</td>
                    <td className="py-3 px-4 text-zinc-400">{o.date}</td>
                    <td className="py-3 px-4 font-mono font-bold text-indigo-400">
                      {formatPrice(o.total)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          o.status === "delivered"
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/50"
                            : o.status === "shipped"
                            ? "bg-blue-950/80 text-blue-300 border border-blue-800/50"
                            : "bg-indigo-950/80 text-indigo-300 border border-indigo-800/50"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 max-w-lg w-full space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-white">Create New Product</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Ergonomic Mechanical Keyboard"
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
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
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Category
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home-living">Home & Living</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white gradient-accent shadow-md"
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
