import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Orders() {
  const [orders, setOrders] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) setOrders(data);
        });
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-[#2d3436]">Orders</h1>
        <span className="text-xs text-[#95a5a6] uppercase tracking-wider">
          Stripe integration pending
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-[#e0e0e0] p-12 text-center">
          <p className="font-playfair text-2xl italic text-[#95a5a6] mb-3">
            No orders yet
          </p>
          <p className="text-sm text-[#95a5a6]">
            Orders will appear here once Stripe checkout is activated.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#e0e0e0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e0e0e0] bg-[#fdfbf7] text-left">
                  <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                    Total
                  </th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider text-[#95a5a6] font-normal">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={String(order.id)}
                    className="border-b border-[#f4f4f4] hover:bg-[#fdfbf7]"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-[#95a5a6]">
                      {String(order.id).slice(0, 8)}…
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#2d3436]">
                        {String(order.customer_name)}
                      </p>
                      <p className="text-xs text-[#95a5a6]">
                        {String(order.customer_email)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-[#2d3436]">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs uppercase tracking-wider px-2 py-1 ${
                          order.status === "paid"
                            ? "bg-green-50 text-green-700"
                            : order.status === "shipped"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-[#f4f4f4] text-[#95a5a6]"
                        }`}
                      >
                        {String(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#95a5a6] text-xs">
                      {new Date(String(order.created_at)).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
