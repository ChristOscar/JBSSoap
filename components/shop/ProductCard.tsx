"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Badge from "@/components/ui/Badge";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.image_urls?.[0] ?? "",
      shape: product.shapes?.[0],
    });
  };

  return (
    <Link href={`/shop/${product.slug}`} className="group block text-inherit no-underline">
      {/* Image */}
      <div className="relative aspect-square bg-[#ede8e0] mb-4 overflow-hidden">
        {product.image_urls?.[0] ? (
          <Image
            src={product.image_urls[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#ede8e0]" />
        )}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge
              label={product.badge}
              className="bg-[#f5f0e8] text-[#8b6b14] border border-[#e4ddd2]"
            />
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="font-playfair text-lg italic text-[#8b6b14] mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-[#2d2a26] mb-3">
          {formatPrice(product.price)}
        </p>
        {product.shapes?.length > 0 && (
          <p className="text-xs text-[#8a8070] mb-3">
            {product.shapes.join(" · ")}
          </p>
        )}
        <button
          onClick={handleAddToCart}
          className="text-[0.7rem] uppercase tracking-widest text-[#8b6b14] border border-[#8b6b14] px-5 py-2 hover:bg-[#8b6b14] hover:text-white transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
