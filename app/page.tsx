import Hero from "@/components/home/Hero";
import ValuesBar from "@/components/home/ValuesBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { createClient } from "@/lib/supabase/server";
import { SEED_PRODUCTS } from "@/lib/seed-products";

export const runtime = "edge";

export default async function HomePage() {
  let featuredProducts = SEED_PRODUCTS.filter((p) => p.is_featured);

  // Try Supabase if configured
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
        .eq("is_featured", true)
        .order("sort_order");
      if (data && data.length > 0) featuredProducts = data;
    } catch {
      // Fall back to seed data
    }
  }

  return (
    <>
      <Hero />
      <ValuesBar />
      <FeaturedProducts products={featuredProducts} />
    </>
  );
}
