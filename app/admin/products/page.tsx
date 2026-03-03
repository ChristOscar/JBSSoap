import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import ProductTable from "@/components/admin/ProductTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products | JBS Admin" };

export default async function AdminProductsPage() {
  let products = SEED_PRODUCTS;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("sort_order");
      if (data?.length) products = data;
    } catch {
      // Fall back
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-[#2d3436]">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-[#2d3436] text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          + Add Product
        </Link>
      </div>

      <ProductTable initialProducts={products} />
    </div>
  );
}
