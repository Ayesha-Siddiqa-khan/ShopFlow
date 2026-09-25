-- Seed Data for ShopFlow (PRD: At least 3 categories, at least 10 products)

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Electronics', 'electronics', 'Cutting-edge gadgets, computing gear, and smart home audio.'),
  ('22222222-2222-2222-2222-222222222222', 'Fashion', 'fashion', 'Contemporary streetwear, premium fabrics, and timeless accessories.'),
  ('33333333-3333-3333-3333-333333333333', 'Home & Living', 'home-living', 'Modern artisanal homeware, ergonomic furniture, and ambient lighting.'),
  ('44444444-4444-4444-4444-444444444444', 'Accessories', 'accessories', 'Handcrafted everyday carry, leather goods, and minimalist watches.')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (id, category_id, name, slug, description, price, stock_quantity, image_url, is_active)
VALUES
  (
    'a0000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Aura Flow Wireless ANC Headphones',
    'aura-flow-wireless-anc-headphones',
    'Audiophile grade wireless over-ear headphones with hybrid active noise cancellation, 40-hour battery life, and spatial acoustic tuning.',
    289.99,
    45,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Apex Chrono Smartwatch Ultra',
    'apex-chrono-smartwatch-ultra',
    'Titanium bezel smartwatch with sapphire crystal glass, health vitals monitoring, GPS tracking, and always-on OLED display.',
    349.50,
    18,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    'Studio Pro 4K Mirrorless Camera',
    'studio-pro-4k-mirrorless-camera',
    'Compact full-frame mirrorless digital camera with rapid eye-autofocus and cinema profile video output.',
    1199.00,
    5,
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000004',
    '22222222-2222-2222-2222-222222222222',
    'Oversized Heavyweight Fleece Hoodie',
    'oversized-heavyweight-fleece-hoodie',
    '500 GSM organic French terry cotton hoodie featuring dropped shoulders, double-layered hood, and minimal silhouette.',
    110.00,
    30,
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000005',
    '22222222-2222-2222-2222-222222222222',
    'Heritage Raw Denim Jacket',
    'heritage-raw-denim-jacket',
    'Japanese selvedge raw denim tailored jacket with copper hardware and reinforced triple-needle stitching.',
    175.00,
    12,
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000006',
    '22222222-2222-2222-2222-222222222222',
    'Monochrome Minimalist Runners',
    'monochrome-minimalist-runners',
    'Lightweight breathable knit sneakers with responsive energy-return foam cushioning and sculpted soles.',
    145.00,
    0,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000007',
    '33333333-3333-3333-3333-333333333333',
    'Nordic Walnut Ambient Table Lamp',
    'nordic-walnut-ambient-table-lamp',
    'Solid hand-turned American walnut base with sandblasted opal glass shade delivering soft, warm diffused light.',
    135.00,
    22,
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000008',
    '33333333-3333-3333-3333-333333333333',
    'Ceramic Pour-Over & Carafe Set',
    'ceramic-pour-over-carafe-set',
    'Artisanal matte stoneware coffee dripper with heat-resistant borosilicate glass server and bamboo lid.',
    64.00,
    40,
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000009',
    '33333333-3333-3333-3333-333333333333',
    'Loom-Woven Merino Wool Throw',
    'loom-woven-merino-wool-throw',
    'Extra-fine ethically sourced merino wool blanket finished with hand-twisted fringing in natural oatmeal.',
    195.00,
    8,
    'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000010',
    '44444444-4444-4444-4444-444444444444',
    'Full Grain Leather Weekender Bag',
    'full-grain-leather-weekender-bag',
    'Vegetable-tanned saddle leather travel duffle with solid brass YKK zips and waterproof nylon lining.',
    320.00,
    15,
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000011',
    '44444444-4444-4444-4444-444444444444',
    'Solar Eclipse Minimalist Watch',
    'solar-eclipse-minimalist-watch',
    'Sunray matte black dial, Japanese quartz movement, sapphire glass, and quick-release Milanese mesh band.',
    180.00,
    3,
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000012',
    '44444444-4444-4444-4444-444444444444',
    'Aerospace Aluminum Cardholder Wallet',
    'aerospace-aluminum-cardholder-wallet',
    'RFID-blocking CNC milled aircraft aluminum wallet with quick card eject trigger and integrated silicone cash strap.',
    75.00,
    0,
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    true
  )
ON CONFLICT (slug) DO NOTHING;
