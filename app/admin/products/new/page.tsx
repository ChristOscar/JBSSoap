import ProductForm from "@/components/admin/ProductForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Product | JBS Admin" };

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-playfair text-3xl text-[#2d3436] mb-8">
        Add New Product
      </h1>
      <ProductForm mode="new" />
    </div>
  );
}
