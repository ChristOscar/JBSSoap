import ProductForm from "@/components/admin/ProductForm";

export default function ProductNew() {
  return (
    <div>
      <h1 className="font-playfair text-3xl text-[#2d3436] mb-8">
        Add New Product
      </h1>
      <ProductForm mode="new" />
    </div>
  );
}
