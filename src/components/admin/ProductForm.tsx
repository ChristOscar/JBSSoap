import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product, SoapShape } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type ProductFormData = Omit<Product, "id" | "created_at" | "updated_at">;

interface ProductFormProps {
  initialData?: Partial<Product>;
  productId?: string;
  mode: "new" | "edit";
}

const defaultData: ProductFormData = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  price: 25,
  stock_qty: 0,
  is_active: true,
  badge: null,
  category: [],
  ritual_tags: [],
  ingredients: "",
  image_urls: [],
  is_featured: false,
  sort_order: 0,
  recommended_ids: [],
  shapes: [],
};

const CATEGORIES = ["Naturals", "Botanical Bars", "Face & Body Scrubs"];
const RITUALS = ["Soothing", "Detoxifying", "Energizing", "Unscented"];
const SHAPES: SoapShape[] = ["Square", "Rectangle", "Circle"];
const BADGES = ["Bestseller", "Limited", "New"] as const;

export default function ProductForm({
  initialData,
  productId,
  mode,
}: ProductFormProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductFormData>({
    ...defaultData,
    ...initialData,
    tagline: initialData?.tagline ?? "",
    badge: initialData?.badge ?? null,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState(
    initialData?.image_urls?.join("\n") ?? ""
  );

  const update = (field: keyof ProductFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleArray = (field: "category" | "ritual_tags", value: string) => {
    const arr = form[field] as string[];
    if (arr.includes(value)) {
      update(field, arr.filter((v) => v !== value));
    } else {
      update(field, [...arr, value]);
    }
  };

  const handleNameChange = (name: string) => {
    update("name", name);
    if (mode === "new") {
      update("slug", slugify(name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const imageUrls = imageUrlInput
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      image_urls: imageUrls,
      updated_at: new Date().toISOString(),
    };

    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      !import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      setError(
        "Supabase is not configured. Add credentials to .env.local to save products."
      );
      setSaving(false);
      return;
    }

    const supabase = createClient();

    if (mode === "new") {
      const { error: insertError } = await supabase.from("products").insert({
        ...payload,
        created_at: new Date().toISOString(),
      });
      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: updateError } = await supabase
        .from("products")
        .update(payload)
        .eq("id", productId);
      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }
    }

    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Basic Info */}
      <div className="bg-white border border-[#e0e0e0] p-6 space-y-5">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#2d3436] border-b border-[#e0e0e0] pb-3">
          Basic Info
        </h2>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
            Product Name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d3436]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            required
            className="w-full border border-[#e0e0e0] px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#2d3436]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
            Tagline
          </label>
          <input
            type="text"
            value={form.tagline ?? ""}
            onChange={(e) => update("tagline", e.target.value)}
            placeholder="e.g. Clarifying & Cooling"
            className="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d3436]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
            Description *
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            required
            rows={4}
            className="w-full border border-[#e0e0e0] px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#2d3436]"
          />
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="bg-white border border-[#e0e0e0] p-6 space-y-5">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#2d3436] border-b border-[#e0e0e0] pb-3">
          Pricing & Inventory
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
              Price ($) *
            </label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={form.price}
              onChange={(e) => update("price", parseFloat(e.target.value) || 0)}
              required
              className="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d3436]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
              Stock Qty *
            </label>
            <input
              type="number"
              min={0}
              value={form.stock_qty}
              onChange={(e) =>
                update("stock_qty", parseInt(e.target.value) || 0)
              }
              required
              className="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d3436]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
              Sort Order
            </label>
            <input
              type="number"
              min={0}
              value={form.sort_order}
              onChange={(e) =>
                update("sort_order", parseInt(e.target.value) || 0)
              }
              className="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d3436]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
              Badge
            </label>
            <select
              value={form.badge ?? ""}
              onChange={(e) =>
                update(
                  "badge",
                  (e.target.value as Product["badge"]) || null
                )
              }
              className="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d3436]"
            >
              <option value="">None</option>
              {BADGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => update("is_active", e.target.checked)}
              className="w-4 h-4"
            />
            Active (visible on site)
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => update("is_featured", e.target.checked)}
              className="w-4 h-4"
            />
            Featured on homepage
          </label>
        </div>
      </div>

      {/* Categories & Rituals */}
      <div className="bg-white border border-[#e0e0e0] p-6 space-y-5">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#2d3436] border-b border-[#e0e0e0] pb-3">
          Taxonomy
        </h2>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-3 text-[#2d3436]">
            Collections
          </label>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleArray("category", c)}
                className={`text-xs px-3 py-1.5 border transition-colors ${
                  (form.category as string[]).includes(c)
                    ? "border-[#2d3436] bg-[#2d3436] text-white"
                    : "border-[#e0e0e0] text-[#95a5a6] hover:border-[#2d3436]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-3 text-[#2d3436]">
            Ritual Tags
          </label>
          <div className="flex flex-wrap gap-3">
            {RITUALS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => toggleArray("ritual_tags", r)}
                className={`text-xs px-3 py-1.5 border transition-colors ${
                  (form.ritual_tags as string[]).includes(r)
                    ? "border-[#6b8e23] bg-[#6b8e23] text-white"
                    : "border-[#e0e0e0] text-[#95a5a6] hover:border-[#6b8e23]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-3 text-[#2d3436]">
            Available Shapes
          </label>
          <div className="flex flex-wrap gap-3">
            {SHAPES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  const arr = form.shapes as SoapShape[];
                  update(
                    "shapes",
                    arr.includes(s) ? arr.filter((v) => v !== s) : [...arr, s]
                  );
                }}
                className={`text-xs px-3 py-1.5 border transition-colors ${
                  (form.shapes as SoapShape[]).includes(s)
                    ? "border-[#8b6b14] bg-[#8b6b14] text-white"
                    : "border-[#e0e0e0] text-[#95a5a6] hover:border-[#8b6b14]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Images & Ingredients */}
      <div className="bg-white border border-[#e0e0e0] p-6 space-y-5">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#2d3436] border-b border-[#e0e0e0] pb-3">
          Images & Ingredients
        </h2>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
            Image URLs (one per line)
          </label>
          <textarea
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            rows={3}
            placeholder="https://your-supabase-project.supabase.co/storage/v1/object/public/..."
            className="w-full border border-[#e0e0e0] px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:border-[#2d3436]"
          />
          <p className="text-xs text-[#95a5a6] mt-1">
            Upload images to Supabase Storage, then paste public URLs here.
          </p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
            Full Ingredient List *
          </label>
          <textarea
            value={form.ingredients}
            onChange={(e) => update("ingredients", e.target.value)}
            required
            rows={3}
            placeholder="Aqua, Cocos Nucifera (Coconut) Oil, ..."
            className="w-full border border-[#e0e0e0] px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#2d3436]"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-3 bg-[#2d3436] text-white px-8 py-3 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-60"
        >
          {saving && <LoadingSpinner className="w-4 h-4" />}
          {saving ? "Saving..." : mode === "new" ? "Create Product" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-8 py-3 text-xs uppercase tracking-widest border border-[#e0e0e0] text-[#95a5a6] hover:border-[#2d3436] hover:text-[#2d3436] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
