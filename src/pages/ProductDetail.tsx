import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/product/AddToCartButton";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Product } from "@/types";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    if (!slug) return;

    const seedProduct = SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;

    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single()
        .then(({ data }) => {
          const found = data ?? seedProduct;
          setProduct(found);
          if (found?.recommended_ids?.length) {
            const recIds = found.recommended_ids;
            if (import.meta.env.VITE_SUPABASE_URL) {
              supabase
                .from("products")
                .select("*")
                .in("id", recIds)
                .eq("is_active", true)
                .then(({ data: recData }) => {
                  setRecommended(
                    recData?.length
                      ? recData
                      : SEED_PRODUCTS.filter((p) => recIds.includes(p.id))
                  );
                });
            }
          }
        });
    } else {
      setProduct(seedProduct);
      if (seedProduct?.recommended_ids?.length) {
        setRecommended(
          SEED_PRODUCTS.filter((p) =>
            seedProduct.recommended_ids.includes(p.id)
          )
        );
      }
    }
  }, [slug]);

  if (product === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f5f0e8]">
        <LoadingSpinner />
      </div>
    );
  }

  if (product === null) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <>
      <div className="px-4 md:px-[5%] py-8 md:py-16 max-w-6xl mx-auto bg-[#f5f0e8]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-[#ede8e0] overflow-hidden mb-4">
              {product.image_urls?.[0] ? (
                <img
                  src={product.image_urls[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#ede8e0]" />
              )}
            </div>
            {product.image_urls?.length > 1 && (
              <div className="flex gap-3">
                {product.image_urls.slice(1).map((url, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-[#ede8e0] overflow-hidden"
                  >
                    <img
                      src={url}
                      alt={`${product.name} ${i + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="pt-2">
            {product.badge && (
              <span className="text-[0.65rem] uppercase tracking-widest font-semibold text-[#8b6b14] mb-3 block">
                {product.badge}
              </span>
            )}
            <h1 className="font-playfair text-4xl font-normal italic mb-2 text-[#8b6b14]">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="text-[#8a8070] mb-4">{product.tagline}</p>
            )}
            <p className="font-playfair text-2xl mb-6 text-[#2d2a26]">
              {formatPrice(product.price)}
            </p>

            <p className="text-sm text-[#555] leading-relaxed mb-8">
              {product.description}
            </p>

            <AddToCartButton product={product} />

            {product.stock_qty > 0 && product.stock_qty <= 5 && (
              <p className="text-xs text-[#8b6b14] mt-3 uppercase tracking-wider">
                Only {product.stock_qty} left — order soon
              </p>
            )}

            {/* Ingredients */}
            <div className="mt-10 border-t border-[#e4ddd2] pt-8">
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-3 text-[#2d2a26]">
                Full Ingredient List
              </h3>
              <p className="text-sm text-[#8a8070] leading-relaxed">
                {product.ingredients}
              </p>
            </div>

            {/* Tags */}
            {(product.category?.length > 0 ||
              product.ritual_tags?.length > 0) && (
              <div className="mt-6 flex flex-wrap gap-2">
                {[...product.category, ...product.ritual_tags].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.65rem] uppercase tracking-widest px-3 py-1 border border-[#e4ddd2] text-[#8a8070]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <RecommendedProducts products={recommended} />
    </>
  );
}
