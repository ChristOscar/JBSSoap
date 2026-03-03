"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Get to Know Me", href: "/get-to-know-me" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#fdfbf7] z-50 shadow-xl mobile-menu flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e0e0e0]">
          <span className="font-playfair text-lg font-bold uppercase tracking-wide">
            JBS Soaps & Co
          </span>
          <button
            onClick={onClose}
            className="text-[#95a5a6] hover:text-[#2d3436] text-2xl leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 gap-6">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="text-sm uppercase tracking-widest text-[#2d3436] hover:text-[#6b8e23] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
