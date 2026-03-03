import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import { createClient } from "@/lib/supabase/client";
import ProductTable from "@/components/admin/ProductTable";
import { Product } from "@/types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);

  useEffect(() => {
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      supabase
        .from("products")
        .select("*")
        .order("sort_order")
        .then(({ data }) => {
          if (data?.length) setProducts(data);
        });
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-[#2d3436]">Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-[#2d3436] text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          + Add Product
        </Link>
      </div>

      <ProductTable initialProducts={products} />
    </div>
  );
}
