import { useState, useEffect } from "react";
import { SEED_PRODUCTS } from "@/lib/seed-products";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [orders, setOrders] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      Promise.all([
        supabase.from("products").select("*").order("sort_order"),
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
      ]).then(([{ data: productsData }, { data: ordersData }]) => {
        if (productsData?.length) setProducts(productsData);
        if (ordersData) setOrders(ordersData);
      });
    }
  }, []);

  const activeProducts = products.filter((p) => p.is_active).length;
  const lowStock = products.filter((p) => p.stock_qty > 0 && p.stock_qty <= 5);
  const outOfStock = products.filter((p) => p.stock_qty === 0);

  return (
    <div>
      <h1 className="font-playfair text-3xl text-[#2d3436] mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Active Products", value: activeProducts },
          { label: "Low Stock Items", value: lowStock.length },
          { label: "Recent Orders", value: orders.length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-[#e0e0e0] p-6">
            <p className="text-xs uppercase tracking-widest text-[#95a5a6] mb-2">
              {label}
            </p>
            <p className="font-playfair text-4xl text-[#2d3436]">{value}</p>
          </div>
        ))}
      </div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-amber-800 mb-3 uppercase tracking-wider">
            Low Stock Alert
          </h2>
          <ul className="space-y-1">
            {lowStock.map((p) => (
              <li key={p.id} className="text-sm text-amber-700">
                {p.name} — {p.stock_qty} remaining
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Out of Stock Alert */}
      {outOfStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-red-800 mb-3 uppercase tracking-wider">
            Out of Stock
          </h2>
          <ul className="space-y-1">
            {outOfStock.map((p) => (
              <li key={p.id} className="text-sm text-red-700">
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* All Products Quick View */}
      <div className="bg-white border border-[#e0e0e0]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0e0e0]">
          <h2 className="font-semibold text-sm uppercase tracking-wider text-[#2d3436]">
            Product Overview
          </h2>
          <a
            href="/admin/products"
            className="text-xs text-[#6b8e23] uppercase tracking-wider hover:underline"
          >
            Manage →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e0e0e0] text-left">
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[#f4f4f4] hover:bg-[#fdfbf7]">
                  <td className="px-6 py-4 font-medium text-[#2d3436]">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 text-[#95a5a6]">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        p.stock_qty === 0
                          ? "text-red-500"
                          : p.stock_qty <= 5
                          ? "text-amber-600"
                          : "text-[#2d3436]"
                      }
                    >
                      {p.stock_qty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs uppercase tracking-wider px-2 py-1 ${
                        p.is_active
                          ? "bg-green-50 text-green-700"
                          : "bg-[#f4f4f4] text-[#95a5a6]"
                      }`}
                    >
                      {p.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
