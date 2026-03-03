export type SoapShape = "Square" | "Rectangle" | "Circle";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  price: number;
  stock_qty: number;
  is_active: boolean;
  badge: "Bestseller" | "Limited" | "New" | null;
  category: string[];
  ritual_tags: string[];
  ingredients: string;
  image_urls: string[];
  is_featured: boolean;
  sort_order: number;
  recommended_ids: string[];
  shapes: SoapShape[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  stripe_session_id: string | null;
  customer_email: string;
  customer_name: string;
  shipping_address: ShippingAddress;
  line_items: OrderLineItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  created_at: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderLineItem {
  product_id: string;
  name: string;
  price: number;
  qty: number;
  image_url: string;
  shape?: SoapShape;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  qty: number;
  shape?: SoapShape;
}
