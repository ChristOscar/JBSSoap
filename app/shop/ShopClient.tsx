"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [activeCollection, setActiveCollection] = useState("All Products");
  const [activeRitual, setActiveRitual] = useState("");

  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      const collectionMatch =
        activeCollection === "All Products" ||
        p.category.includes(activeCollection);
      const ritualMatch =
        !activeRitual || p.ritual_tags.includes(activeRitual);
      return collectionMatch && ritualMatch;
    });
  }, [initialProducts, activeCollection, activeRitual]);

  return (
    <>
      {/* Header */}
      <div className="text-center py-16 px-[10%] bg-[#f5f0e8] border-b border-[#e4ddd2]">
        <h1 className="font-playfair text-5xl font-normal text-[#2d2a26] mb-3">
          Botanical Shop
        </h1>
        <p className="text-[#8a8070]">
          Small-batch formulations for mindful body care.
        </p>
      </div>

      {/* Shop layout */}
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
