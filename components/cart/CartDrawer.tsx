"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={closeCart} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#faf7f2] z-50 shadow-xl cart-drawer flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4ddd2]">
          <h2 className="font-playfair text-lg text-[#2d2a26]">
            Your Cart{" "}
            {totalItems > 0 && (
              <span className="text-[#8a8070] text-sm font-inter">
                ({totalItems})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="text-[#8a8070] hover:text-[#2d2a26] text-2xl leading-none"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-playfair text-xl italic text-[#8a8070] mb-4">
                Your cart is empty
              </p>
              <p className="text-sm text-[#8a8070] mb-6">
                Add some botanical essentials to get started.
              </p>
              <button
                onClick={closeCart}
                className="text-xs uppercase tracking-widest border border-[#2d2a26] px-6 py-3 hover:bg-[#2d2a26] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={`${item.productId}:${item.shape ?? ""}`}
                item={item}
              />
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-[#e4ddd2]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm uppercase tracking-wider text-[#2d2a26]">
                Subtotal
              </span>
              <span className="font-playfair text-lg text-[#2d2a26]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-[#8a8070] text-xs mb-4">
              Shipping calculated at checkout
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full bg-[#2d2a26] text-[#f5f0e8] text-center py-4 text-xs uppercase tracking-widest hover:bg-[#8b6b14] transition-colors"
            >
              Review Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
