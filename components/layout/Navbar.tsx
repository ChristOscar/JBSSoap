"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/get-to-know-me" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, totalItems } = useCart();
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 z-30 bg-[#f5f0e8] border-b border-[#e4ddd2]">
        <div className="flex items-center justify-between px-[5%] py-3">
          {/* Logo */}
          <Link href="/" aria-label="JBS Soaps & Co home">
            <Image
              src="/logo.png"
              alt="JBS Soaps & Co"
              width={80}
              height={80}
              className="w-16 h-16 object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs uppercase tracking-widest transition-colors ${
                  pathname === href
                    ? "text-[#8b6b14]"
                    : "text-[#2d2a26] hover:text-[#8b6b14]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right: Cart + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative text-xs uppercase tracking-widest text-[#2d2a26] hover:text-[#8b6b14] transition-colors"
              aria-label="Open cart"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#8b6b14] text-white text-[0.6rem] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-6 h-px bg-[#2d2a26] block" />
              <span className="w-6 h-px bg-[#2d2a26] block" />
              <span className="w-4 h-px bg-[#2d2a26] block" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
