import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SEED_PRODUCTS } from "@/lib/seed-products";

export async function GET() {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (!error && data) {
        return NextResponse.json(data);
      }
    } catch {
      // Fall back to seed data
    }
  }

  return NextResponse.json(SEED_PRODUCTS.filter((p) => p.is_active));
}
