import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import ValuesBar from "@/components/home/ValuesBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(
    SEED_PRODUCTS.filter((p) => p.is_featured)
  );

  useEffect(() => {
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("sort_order")
        .then(({ data }) => {
          if (data && data.length > 0) setProducts(data);
        });
    }
  }, []);

  return (
    <>
      <Hero />
      <ValuesBar />
      <FeaturedProducts products={products} />
    </>
  );
}
