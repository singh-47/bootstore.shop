/*
# Create products and categories tables for BootCart

## Summary
Creates the core catalog schema for the BootCart footwear e-commerce landing page.
Two tables — `categories` and `products` — store the footwear styles and product
listings displayed across the page. This is a single-tenant app with no sign-in,
so all policies are open to anon + authenticated (the data is intentionally public).

## 1. New Tables

### `categories`
- `id` (text, primary key) — slug-style identifier (e.g. "formal", "sneakers")
- `title` (text, not null) — display name
- `image` (text, not null) — image URL
- `sort_order` (int, default 0) — display ordering

### `products`
- `id` (text, primary key) — stable product identifier (e.g. "t1", "s2")
- `name` (text, not null) — product name
- `category` (text, not null) — category title (matches categories.title)
- `gender` (text, not null) — "Men", "Women", or "Unisex"
- `price` (integer, not null) — current price in INR
- `original_price` (integer, not null) — original price in INR
- `rating` (numeric, default 0) — average rating (0–5)
- `reviews` (integer, default 0) — review count
- `image` (text, not null) — product image URL
- `badge` (text, nullable) — optional discount badge label
- `section` (text, not null) — "trending" or "top_selling" for display grouping
- `sort_order` (int, default 0) — ordering within a section
- `is_preorder` (boolean, default false) — marks pre-order products
- `release_date` (text, nullable) — pre-order availability date
- `created_at` (timestamptz, default now())

## 2. Indexes
- `products_section_idx` on `products(section)` — filtering by display section
- `products_category_idx` on `products(category)` — filtering by category
- `products_gender_idx` on `products(gender)` — filtering by gender

## 3. Security (RLS)
Both tables have RLS enabled. Since this is a no-auth public catalog, policies
allow anon + authenticated to read all rows. Writes are also open to
anon + authenticated so catalog data can be managed without a service role
in this demo context. The data is intentionally public/shared.

## 4. Seed Data
- 6 categories: Formal, Chunky, Sneakers, Boots, Running, Casual
- 8 products: 4 trending + 4 top-selling
- 1 pre-order product (Aero Glide X1)
*/

-- ── Categories ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  title text NOT NULL,
  image text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

-- ── Products ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  gender text NOT NULL DEFAULT 'Unisex',
  price int NOT NULL,
  original_price int NOT NULL,
  rating numeric(2,1) NOT NULL DEFAULT 0,
  reviews int NOT NULL DEFAULT 0,
  image text NOT NULL,
  badge text,
  section text NOT NULL DEFAULT 'trending',
  sort_order int NOT NULL DEFAULT 0,
  is_preorder boolean NOT NULL DEFAULT false,
  release_date text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

-- ── Indexes ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS products_section_idx ON products(section);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_gender_idx ON products(gender);

-- ── Seed categories ─────────────────────────────────────────
INSERT INTO categories (id, title, image, sort_order) VALUES
  ('formal', 'Formal', 'https://images.pexels.com/photos/4161710/pexels-photo-4161710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1),
  ('chunky', 'Chunky', 'https://images.pexels.com/photos/27204281/pexels-photo-27204281.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 2),
  ('sneakers', 'Sneakers', 'https://images.pexels.com/photos/11513443/pexels-photo-11513443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 3),
  ('boots', 'Boots', 'https://images.pexels.com/photos/2112753/pexels-photo-2112753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 4),
  ('running', 'Running', 'https://images.pexels.com/photos/29342144/pexels-photo-29342144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 5),
  ('casual', 'Casual', 'https://images.pexels.com/photos/4296075/pexels-photo-4296075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 6)
ON CONFLICT (id) DO NOTHING;

-- ── Seed trending products ──────────────────────────────────
INSERT INTO products (id, name, category, gender, price, original_price, rating, reviews, image, badge, section, sort_order) VALUES
  ('t1', 'Cloudstep Pro', 'Sneakers', 'Unisex', 4999, 7999, 4.8, 342, 'https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '-38%', 'trending', 1),
  ('t2', 'Urban Drift LX', 'Chunky', 'Unisex', 6499, 10999, 4.6, 187, 'https://images.pexels.com/photos/27516985/pexels-photo-27516985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '-41%', 'trending', 2),
  ('t3', 'Velocity Runner', 'Running', 'Men', 3799, 5999, 4.7, 256, 'https://images.pexels.com/photos/19577864/pexels-photo-19577864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '-37%', 'trending', 3),
  ('t4', 'Classic Oxford', 'Formal', 'Men', 8999, 12999, 4.9, 412, 'https://images.pexels.com/photos/31785887/pexels-photo-31785887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '-31%', 'trending', 4)
ON CONFLICT (id) DO NOTHING;

-- ── Seed top-selling products ───────────────────────────────
INSERT INTO products (id, name, category, gender, price, original_price, rating, reviews, image, badge, section, sort_order) VALUES
  ('s1', 'Azure Blaze', 'Running', 'Men', 5299, 8499, 4.5, 198, 'https://images.pexels.com/photos/29342147/pexels-photo-29342147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '-38%', 'top_selling', 1),
  ('s2', 'Noir Street', 'Sneakers', 'Unisex', 3999, 6999, 4.6, 273, 'https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '-43%', 'top_selling', 2),
  ('s3', 'Lavender Bloom', 'Casual', 'Women', 3499, 5499, 4.4, 121, 'https://images.pexels.com/photos/29699304/pexels-photo-29699304.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '-36%', 'top_selling', 3),
  ('s4', 'Heritage Loafer', 'Formal', 'Women', 7499, 11999, 4.8, 301, 'https://images.pexels.com/photos/27256413/pexels-photo-27256413.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '-38%', 'top_selling', 4)
ON CONFLICT (id) DO NOTHING;

-- ── Seed pre-order product ──────────────────────────────────
INSERT INTO products (id, name, category, gender, price, original_price, rating, reviews, image, section, sort_order, is_preorder, release_date) VALUES
  ('p1', 'Aero Glide X1', 'Limited Edition', 'Unisex', 12999, 17999, 5.0, 0, 'https://images.pexels.com/photos/18368124/pexels-photo-18368124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'preorder', 1, true, 'October 15, 2026')
ON CONFLICT (id) DO NOTHING;
