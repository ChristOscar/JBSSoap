"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQty, removeItem, getKey } = useCart();
  const key = getKey(item.productId, item.shape);

  return (
    <div className="flex gap-4 py-4 border-b border-[#e4ddd2] last:border-0">
      <div className="w-20 h-20 bg-[#ede8e0] flex-shrink-0 overflow-hidden relative">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#ede8e0]" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-playfair text-sm italic text-[#8b6b14] truncate">
          {item.name}
        </p>
        {item.shape && (
          <p className="text-[#8a8070] text-xs mt-0.5">{item.shape}</p>
        )}
        <p className="text-[#8a8070] text-xs mt-0.5">{formatPrice(item.price)}</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQty(key, item.qty - 1)}
            className="w-6 h-6 border border-[#e4ddd2] flex items-center justify-center text-sm hover:border-[#2d2a26] transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-sm w-4 text-center">{item.qty}</span>
          <button
            onClick={() => updateQty(key, item.qty + 1)}
            className="w-6 h-6 border border-[#e4ddd2] flex items-center justify-center text-sm hover:border-[#2d2a26] transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
          <button
            onClick={() => removeItem(key)}
            className="ml-auto text-[#8a8070] hover:text-[#2d2a26] text-xs uppercase tracking-wider transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
