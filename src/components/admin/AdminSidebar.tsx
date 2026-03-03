import { Link, useLocation, useNavigate } from "react-router-dom";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
];

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#2d3436] text-white flex flex-col flex-shrink-0 transition-transform duration-200 md:relative md:translate-x-0 md:z-auto md:min-h-screen ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div className="font-playfair text-sm font-bold uppercase tracking-wide">
          JBS Admin
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-white/60 hover:text-white text-2xl leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ label, href }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              onClick={onClose}
              className={`block px-3 py-2.5 text-sm rounded transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
