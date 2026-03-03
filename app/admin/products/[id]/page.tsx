import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import type { Metadata } from "next";

export const runtime = "edge";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Edit Product | JBS Admin" };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  let product = SEED_PRODUCTS.find((p) => p.id === id);

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (data) product = data;
    } catch {
      // Fall back
    }
  }

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-playfair text-3xl text-[#2d3436] mb-8">
        Edit: {product.name}
      </h1>
      <ProductForm mode="edit" initialData={product} productId={id} />
    </div>
  );
}
