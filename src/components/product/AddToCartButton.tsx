import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product, SoapShape } from "@/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedShape, setSelectedShape] = useState<SoapShape | undefined>(
    product.shapes?.[0]
  );

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.image_urls?.[0] ?? "",
      shape: selectedShape,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const outOfStock = product.stock_qty <= 0;

  return (
    <div>
      {/* Shape selector */}
      {product.shapes?.length > 0 && (
        <div className="mb-5">
          <p className="text-xs uppercase tracking-widest text-[#2d2a26] mb-3">
            Shape
          </p>
          <div className="flex gap-2">
            {product.shapes.map((shape) => (
              <button
                key={shape}
                onClick={() => setSelectedShape(shape)}
                className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                  selectedShape === shape
                    ? "border-[#8b6b14] bg-[#8b6b14] text-white"
                    : "border-[#e4ddd2] text-[#8a8070] hover:border-[#8b6b14] hover:text-[#8b6b14]"
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={outOfStock}
        className={`w-full py-4 text-xs uppercase tracking-widest transition-all duration-300 ${
          outOfStock
            ? "bg-[#e4ddd2] text-[#8a8070] cursor-not-allowed"
            : added
            ? "bg-[#5c7a2a] text-white"
            : "bg-[#2d2a26] text-[#f5f0e8] hover:bg-[#8b6b14]"
        }`}
      >
        {outOfStock
          ? "Out of Stock"
          : added
          ? "Added to Cart ✓"
          : selectedShape
          ? `Add ${selectedShape} to Cart`
          : "Add to Cart"}
      </button>
    </div>
  );
}
