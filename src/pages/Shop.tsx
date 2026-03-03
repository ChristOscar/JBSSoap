import { useState, useEffect, useMemo } from "react";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types";

export default function Shop() {
  const [allProducts, setAllProducts] = useState<Product[]>(
    SEED_PRODUCTS.filter((p) => p.is_active)
  );
  const [activeCollection, setActiveCollection] = useState("All Products");
  const [activeRitual, setActiveRitual] = useState("");

  useEffect(() => {
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order")
        .then(({ data }) => {
          if (data && data.length > 0) setAllProducts(data);
        });
    }
  }, []);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const collectionMatch =
        activeCollection === "All Products" ||
        p.category.includes(activeCollection);
      const ritualMatch =
        !activeRitual || p.ritual_tags.includes(activeRitual);
      return collectionMatch && ritualMatch;
    });
  }, [allProducts, activeCollection, activeRitual]);

  return (
    <>
      <div className="text-center py-16 px-[10%] bg-[#f5f0e8] border-b border-[#e4ddd2]">
        <h1 className="font-playfair text-5xl font-normal text-[#2d2a26] mb-3">
          Botanical Shop
        </h1>
        <p className="text-[#8a8070]">
          Small-batch formulations for mindful body care.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 px-[10%] py-12 pb-24 bg-[#f5f0e8]">
        <FilterSidebar
          activeCollection={activeCollection}
          activeRitual={activeRitual}
          onCollectionChange={setActiveCollection}
          onRitualChange={setActiveRitual}
        />
        <div className="flex-1 min-w-0">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </>
  );
}
