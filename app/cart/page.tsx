import CartPageClient from "./CartPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your JBS Soaps & Co cart before checkout.",
};

export default function CartPage() {
  return <CartPageClient />;
}
