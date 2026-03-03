"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPageClient() {
  const { items, updateQty, removeItem, subtotal, clearCart, getKey } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-[#f5f0e8]">
        <h1 className="font-playfair text-4xl italic text-[#2d2a26] mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-[#8a8070] mb-8">
          Add some botanical essentials to get started.
        </p>
        <Link
          href="/shop"
          className="bg-[#2d2a26] text-[#f5f0e8] px-10 py-4 text-xs uppercase tracking-widest hover:bg-[#8b6b14] transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="px-[5%] py-16 max-w-5xl mx-auto bg-[#f5f0e8] min-h-[60vh]">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-playfair text-4xl text-[#2d2a26]">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs uppercase tracking-wider text-[#8a8070] hover:text-[#2d2a26] transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
        {/* Cart Items */}
        <div className="border-t border-[#e4ddd2]">
          {items.map((item) => {
            const key = getKey(item.productId, item.shape);
            return (
              <div
                key={key}
                className="flex gap-6 py-6 border-b border-[#e4ddd2]"
              >
                <Link
                  href={`/shop/${item.slug}`}
                  className="w-24 h-24 bg-[#ede8e0] flex-shrink-0 overflow-hidden relative"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#ede8e0]" />
                  )}
                </Link>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="font-playfair text-lg italic text-[#8b6b14] hover:opacity-80 transition-opacity"
                      >
                        {item.name}
                      </Link>
                      {item.shape && (
                        <p className="text-xs text-[#8a8070] mt-0.5">
                          Shape: {item.shape}
                        </p>
                      )}
                      <p className="text-[#8a8070] text-sm mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-playfair text-lg text-[#2d2a26]">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-[#e4ddd2]">
                      <button
                        onClick={() => updateQty(key, item.qty - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#ede8e0] transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center text-sm border-x border-[#e4ddd2]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(key, item.qty + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#ede8e0] transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(key)}
                      className="text-xs uppercase tracking-wider text-[#8a8070] hover:text-[#2d2a26] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-[#faf7f2] border border-[#e4ddd2] p-8 h-fit">
          <h2 className="font-playfair text-xl mb-6 text-[#2d2a26]">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-[#8a8070]">Subtotal</span>
              <span className="text-[#2d2a26]">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8a8070]">Shipping</span>
              <span className="text-[#8a8070]">Calculated at checkout</span>
            </div>
          </div>

          <div className="border-t border-[#e4ddd2] pt-4 mb-6">
            <div className="flex justify-between font-semibold">
              <span className="text-[#2d2a26]">Total</span>
              <span className="font-playfair text-xl text-[#2d2a26]">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>

          <button
            disabled
            className="w-full bg-[#e4ddd2] text-[#8a8070] py-4 text-xs uppercase tracking-widest cursor-not-allowed mb-3"
            title="Checkout coming soon"
          >
            Checkout (Coming Soon)
          </button>

          <Link
            href="/shop"
            className="block text-center text-xs uppercase tracking-widest text-[#8a8070] hover:text-[#2d2a26] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
