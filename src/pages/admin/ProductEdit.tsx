import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import { createClient } from "@/lib/supabase/client";
import ProductForm from "@/components/admin/ProductForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Product } from "@/types";

export default function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    const seedProduct = SEED_PRODUCTS.find((p) => p.id === id) ?? null;

    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          setProduct(data ?? seedProduct);
        });
    } else {
      setProduct(seedProduct);
    }
  }, [id]);

  if (product === undefined) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (product === null) {
    return <Navigate to="/admin/products" replace />;
  }

  return (
    <div>
      <h1 className="font-playfair text-3xl text-[#2d3436] mb-8">
        Edit: {product.name}
      </h1>
      <ProductForm mode="edit" initialData={product} productId={id} />
    </div>
  );
}
