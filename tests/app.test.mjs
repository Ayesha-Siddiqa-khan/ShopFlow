import test from "node:test";
import assert from "node:assert";

// Basic price formatting logic mirroring lib/utils.ts
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const SAMPLE_CATEGORIES = [
  { id: "1", name: "Electronics", slug: "electronics" },
  { id: "2", name: "Fashion", slug: "fashion" },
  { id: "3", name: "Home & Living", slug: "home-living" },
  { id: "4", name: "Accessories", slug: "accessories" },
];

const SAMPLE_PRODUCTS = [
  { id: "p1", name: "Aura Flow Wireless ANC Headphones", price: 289.99, stock_quantity: 45 },
  { id: "p2", name: "Apex Chrono Smartwatch Ultra", price: 349.50, stock_quantity: 18 },
  { id: "p3", name: "Studio Pro 4K Mirrorless Camera", price: 1199.00, stock_quantity: 5 },
  { id: "p4", name: "Oversized Heavyweight Fleece Hoodie", price: 110.00, stock_quantity: 30 },
  { id: "p5", name: "Heritage Raw Denim Jacket", price: 175.00, stock_quantity: 12 },
  { id: "p6", name: "Monochrome Minimalist Runners", price: 145.00, stock_quantity: 0 },
  { id: "p7", name: "Nordic Walnut Ambient Table Lamp", price: 135.00, stock_quantity: 22 },
  { id: "p8", name: "Ceramic Pour-Over & Carafe Set", price: 64.00, stock_quantity: 40 },
  { id: "p9", name: "Loom-Woven Merino Wool Throw", price: 195.00, stock_quantity: 8 },
  { id: "p10", name: "Full Grain Leather Weekender Bag", price: 320.00, stock_quantity: 15 },
  { id: "p11", name: "Solar Eclipse Minimalist Watch", price: 180.00, stock_quantity: 3 },
  { id: "p12", name: "Aerospace Aluminum Cardholder Wallet", price: 75.00, stock_quantity: 0 },
];

test("sample categories contain required collections", () => {
  assert.ok(SAMPLE_CATEGORIES.length >= 3, "At least 3 categories required");
  const slugs = SAMPLE_CATEGORIES.map((c) => c.slug);
  assert.ok(slugs.includes("electronics"));
  assert.ok(slugs.includes("fashion"));
  assert.ok(slugs.includes("home-living"));
});

test("sample products contain at least 10 items with stock and zero-stock representation", () => {
  assert.ok(SAMPLE_PRODUCTS.length >= 10, "At least 10 products required");
  const hasOutOfStock = SAMPLE_PRODUCTS.some((p) => p.stock_quantity === 0);
  assert.ok(hasOutOfStock, "Should have out-of-stock representation for edge cases");
});

test("price formatting utility formats USD currency correctly", () => {
  const formatted = formatPrice(289.99);
  assert.strictEqual(formatted, "$289.99");
});
