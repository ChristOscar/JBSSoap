import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/product/AddToCartButton";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import type { Metadata } from "next";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();
      if (data) return data;
    } catch {
      // Fall back
    }
  }
  return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

async function getRecommended(ids: string[]): Promise<Product[]> {
  if (!ids.length) return [];
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .in("id", ids)
        .eq("is_active", true);
      if (data) return data;
    } catch {
      // Fall back
    }
  }
  return SEED_PRODUCTS.filter((p) => ids.includes(p.id));
}

export async function generateStaticParams() {
  return SEED_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.tagline ?? product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const recommended = await getRecommended(product.recommended_ids ?? []);

  return (
    <>
      <div className="px-[5%] py-16 max-w-6xl mx-auto bg-[#f5f0e8]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-[#ede8e0] overflow-hidden mb-4 relative">
              {product.image_urls?.[0] ? (
                <Image
                  src={product.image_urls[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
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
                    className="w-20 h-20 relative bg-[#ede8e0] overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={`${product.name} ${i + 2}`}
                      fill
                      sizes="80px"
                      className="object-cover"
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
