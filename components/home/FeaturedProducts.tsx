import Link from "next/link";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-20 px-[5%] bg-[#f5f0e8]">
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-[4px] text-[#8b6b14] mb-3">
          Hand-Poured · Botanically Crafted
        </p>
        <h2 className="font-playfair text-4xl text-[#2d2a26]">
          The Essentials
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="text-center mt-14">
        <Link
          href="/shop"
          className="inline-block border border-[#2d2a26] px-10 py-4 text-xs uppercase tracking-widest hover:bg-[#2d2a26] hover:text-[#f5f0e8] transition-colors"
        >
          View Full Collection
        </Link>
      </div>
    </section>
  );
}
