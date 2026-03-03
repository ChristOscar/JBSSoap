"use client";

import { useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative bg-white max-w-lg w-full mx-4 p-8",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#95a5a6] hover:text-[#2d3436] text-xl leading-none"
        >
          ×
        </button>
        {title && (
          <h2 className="font-playfair text-2xl mb-6">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
