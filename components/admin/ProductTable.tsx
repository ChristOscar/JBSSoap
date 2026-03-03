"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";

export default function ProductTable({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockValues, setStockValues] = useState<Record<string, number>>({});

  const startEdit = (id: string, current: number) => {
    setEditingStock(id);
    setStockValues({ ...stockValues, [id]: current });
  };

  const saveStock = async (id: string) => {
    const newQty = stockValues[id];
    if (newQty === undefined) return;

    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const supabase = createClient();
      await supabase
        .from("products")
        .update({ stock_qty: newQty, updated_at: new Date().toISOString() })
        .eq("id", id);
    }

    setProducts(
      products.map((p) => (p.id === id ? { ...p, stock_qty: newQty } : p))
    );
    setEditingStock(null);
  };

  const toggleActive = async (id: string, current: boolean) => {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const supabase = createClient();
      await supabase
        .from("products")
        .update({ is_active: !current, updated_at: new Date().toISOString() })
        .eq("id", id);
    }
    setProducts(
      products.map((p) => (p.id === id ? { ...p, is_active: !current } : p))
    );
  };

  return (
    <div className="bg-white border border-[#e0e0e0] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e0e0e0] bg-[#fdfbf7] text-left">
              <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                Product
              </th>
              <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                Price
              </th>
              <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                Stock
              </th>
              <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                Badge
              </th>
              <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                Status
              </th>
              <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-[#f4f4f4] hover:bg-[#fdfbf7] transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-[#2d3436]">{p.name}</p>
                    {p.tagline && (
                      <p className="text-xs text-[#95a5a6] italic mt-0.5">
                        {p.tagline}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-[#2d3436]">
                  {formatPrice(p.price)}
                </td>
                <td className="px-6 py-4">
                  {editingStock === p.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        value={stockValues[p.id] ?? p.stock_qty}
                        onChange={(e) =>
                          setStockValues({
                            ...stockValues,
                            [p.id]: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-16 border border-[#e0e0e0] px-2 py-1 text-sm focus:outline-none focus:border-[#2d3436]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveStock(p.id);
                          if (e.key === "Escape") setEditingStock(null);
                        }}
                      />
                      <button
                        onClick={() => saveStock(p.id)}
                        className="text-[#6b8e23] text-xs hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingStock(null)}
                        className="text-[#95a5a6] text-xs hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(p.id, p.stock_qty)}
                      className={`hover:underline ${
                        p.stock_qty === 0
                          ? "text-red-500"
                          : p.stock_qty <= 5
                          ? "text-amber-600"
                          : "text-[#2d3436]"
                      }`}
                      title="Click to edit"
                    >
                      {p.stock_qty}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-xs text-[#95a5a6]">
                  {p.badge ?? "—"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(p.id, p.is_active)}
                    className={`text-xs uppercase tracking-wider px-2 py-1 transition-colors ${
                      p.is_active
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-[#f4f4f4] text-[#95a5a6] hover:bg-[#e0e0e0]"
                    }`}
                  >
                    {p.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-xs text-[#6b8e23] uppercase tracking-wider hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
