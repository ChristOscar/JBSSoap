import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";

export default function RecommendedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="py-16 px-[5%] border-t border-[#e0e0e0] bg-[#fdfbf7]">
      <h2 className="font-playfair text-3xl text-center mb-10 text-[#2d3436]">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
