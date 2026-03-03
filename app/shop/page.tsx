import ShopClient from "./ShopClient";
import { createClient } from "@/lib/supabase/server";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Botanical Shop",
  description:
    "Browse JBS Soaps & Co's full collection of handcrafted, small-batch botanical soaps and scrubs.",
};

export default async function ShopPage() {
  let products = SEED_PRODUCTS.filter((p) => p.is_active);

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (data && data.length > 0) products = data;
    } catch {
      // Fall back to seed data
    }
  }

  return <ShopClient initialProducts={products} />;
}
