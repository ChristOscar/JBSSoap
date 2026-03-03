-- JBS Soaps & Co — Supabase Schema
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/<id>/sql

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- PRODUCTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  name            text NOT NULL,
  tagline         text,
  description     text NOT NULL,
  price           numeric(10,2) NOT NULL,
  stock_qty       integer NOT NULL DEFAULT 0,
  is_active       boolean DEFAULT true,
  badge           text CHECK (badge IN ('Bestseller', 'Limited', 'New')),
  category        text[] DEFAULT '{}',
  ritual_tags     text[] DEFAULT '{}',
  ingredients     text NOT NULL,
  image_urls      text[] DEFAULT '{}',
  is_featured     boolean DEFAULT false,
  sort_order      integer DEFAULT 0,
  recommended_ids uuid[] DEFAULT '{}',
  shapes          text[] DEFAULT '{}'   CHECK (shapes <@ ARRAY['Square','Rectangle','Circle']::text[]),
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ORDERS TABLE (stubbed — activated with Stripe)
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE,
  customer_email    text NOT NULL,
  customer_name     text NOT NULL,
  shipping_address  jsonb NOT NULL DEFAULT '{}',
  line_items        jsonb NOT NULL DEFAULT '[]',
  total             numeric(10,2) NOT NULL,
  status            text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
  created_at        timestamptz DEFAULT now()
);

-- ============================================================
-- ADMIN PROFILES (maps Supabase Auth users to admin role)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Products: public can read active products only
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active products"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin full access to products"
  ON products FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Orders: admin read + service role insert (Stripe webhook)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read orders"
  ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Admin profiles: admin reads own profile
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read own profile"
  ON admin_profiles FOR SELECT
  USING (id = auth.uid());

-- ============================================================
-- SEED DATA
-- ============================================================
INSERT INTO products (slug, name, tagline, description, price, stock_qty, badge, category, ritual_tags, ingredients, image_urls, shapes, is_featured, sort_order)
VALUES
  (
    'eucalyptus-face-scrub', 'Eucalyptus Face Scrub', 'Clarifying & Cooling',
    'Breathe deeply and let your skin reset. Our Eucalyptus Face Scrub blends pure eucalyptus essential oil, fine sugar exfoliants, and aloe vera to clear impurities while nourishing deeply. Free from sulfates and synthetic fragrances.',
    23.00, 12, 'Bestseller',
    ARRAY['Face & Body Scrubs'], ARRAY['Energizing', 'Detoxifying'],
    'Aqua, Cocos Nucifera (Coconut) Oil, Eucalyptus Globulus Leaf Oil, Aloe Barbadensis Leaf Juice, Sucrose, Kaolin Clay, Glycerin, Citric Acid.',
    ARRAY['/images/products/product-eucalyptus.jpg'],
    ARRAY['Square','Rectangle'], true, 1
  ),
  (
    'cocoa-powder-soap', 'Cocoa Powder Soap', 'Rich Antioxidants',
    'Warm, grounding, and utterly indulgent. Our Cocoa Powder Soap wraps skin in a velvety lather rich with raw cacao and organic oat milk. Antioxidant-packed to fight environmental stressors and support elasticity.',
    25.00, 9, NULL,
    ARRAY['Botanical Bars'], ARRAY['Soothing', 'Unscented'],
    'Saponified Cocos Nucifera (Coconut) Oil, Theobroma Cacao (Cocoa) Powder, Avena Sativa (Oat) Milk, Vanilla Planifolia Extract, Ricinus Communis (Castor) Oil, Butyrospermum Parkii (Shea) Butter.',
    ARRAY['/images/products/product-cocoa.jpg'],
    ARRAY['Rectangle'], true, 2
  ),
  (
    'aloe-vera-soap', 'Aloe Vera Soap', 'Hydrating & Gentle',
    'Gentle enough for the most sensitive skin. Built on fresh aloe vera juice, olive oil, and shea butter to restore the skin''s moisture barrier. Calendula extract adds a soft, anti-inflammatory touch.',
    25.00, 18, NULL,
    ARRAY['Botanical Bars', 'Naturals'], ARRAY['Soothing'],
    'Saponified Olea Europaea (Olive) Oil, Cocos Nucifera (Coconut) Oil, Aloe Barbadensis Leaf Juice, Butyrospermum Parkii (Shea) Butter, Calendula Officinalis Flower Extract.',
    ARRAY['/images/products/product-aloe.jpg'],
    ARRAY['Rectangle','Square'], true, 3
  ),
  (
    'spiral-pop-poe', 'Spiral Pop Poe', 'Playful & Nourishing',
    'Bold, vibrant, and full of joy. This eye-catching circular bar blends coconut and palm oils with an uplifting fragrance. Lathers beautifully, leaves skin soft, and brings color to any bathroom.',
    25.00, 7, 'New',
    ARRAY['Botanical Bars'], ARRAY['Energizing'],
    'Saponified Cocos Nucifera (Coconut) Oil, Elaeis Guineensis (Palm) Oil, Butyrospermum Parkii (Shea) Butter, Fragrance (Skin-Safe), Mica (Colorant), Ricinus Communis (Castor) Oil.',
    ARRAY['https://images.unsplash.com/photo-1607006483120-00971b569238?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Circle'], true, 4
  ),
  (
    'lavender-wild-oat', 'Lavender & Wild Oat', 'Calming Sleep Ritual',
    'Some rituals are worth protecting. French lavender and colloidal wild oat quiet the nervous system while nourishing stressed skin. Our most beloved wind-down bar — rest is not a luxury, it is medicine.',
    25.00, 5, 'Limited',
    ARRAY['Naturals', 'Botanical Bars'], ARRAY['Soothing'],
    'Saponified Olea Europaea (Olive) Oil, Lavandula Angustifolia (Lavender) Essential Oil, Avena Sativa (Wild Oat) Extract, Anthemis Nobilis (Chamomile) Flower Extract, Butyrospermum Parkii (Shea) Butter.',
    ARRAY['https://images.unsplash.com/photo-1546552356-3fae876a61ca?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Square','Rectangle'], false, 5
  ),
  (
    'activated-charcoal-detox', 'Activated Charcoal Detox', 'Deep Pore Cleansing',
    'Give your skin the deep reset it deserves. Activated charcoal draws out toxins and excess sebum from deep within pores, paired with tea tree oil and bentonite clay for a thorough yet balanced detox.',
    25.00, 14, NULL,
    ARRAY['Face & Body Scrubs', 'Naturals'], ARRAY['Detoxifying'],
    'Saponified Cocos Nucifera (Coconut) Oil, Activated Charcoal, Melaleuca Alternifolia (Tea Tree) Leaf Oil, Bentonite Clay, Ricinus Communis (Castor) Oil.',
    ARRAY['https://images.unsplash.com/photo-1626015523023-e63065b2f6b8?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Square','Circle'], false, 6
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- ADMIN USER SETUP
-- ============================================================
-- After creating Admin@JBSsoap.com in Supabase Auth Dashboard, run:
-- INSERT INTO admin_profiles (id, email)
-- VALUES ('<user-uuid-from-auth>', 'Admin@JBSsoap.com');
