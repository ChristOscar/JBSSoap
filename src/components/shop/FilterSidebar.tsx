import { useState } from "react";

const collections = [
  "All Products",
  "Naturals",
  "Botanical Bars",
  "Face & Body Scrubs",
];

const rituals = ["Soothing", "Detoxifying", "Energizing", "Unscented"];

interface FilterSidebarProps {
  activeCollection: string;
  activeRitual: string;
  onCollectionChange: (c: string) => void;
  onRitualChange: (r: string) => void;
}

export default function FilterSidebar({
  activeCollection,
  activeRitual,
  onCollectionChange,
  onRitualChange,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount =
    (activeCollection !== "All Products" ? 1 : 0) + (activeRitual ? 1 : 0);

  const filterContent = (
    <>
      <div className="mb-8">
        <h4 className="text-[0.65rem] uppercase tracking-widest border-b border-[#e4ddd2] pb-2 mb-4 text-[#8a8070]">
          Collections
        </h4>
        <ul className="space-y-2">
          {collections.map((c) => (
            <li key={c}>
              <button
                onClick={() => onCollectionChange(c)}
                className={`text-sm transition-colors text-left ${
                  activeCollection === c
                    ? "text-[#8b6b14] font-semibold"
                    : "text-[#8a8070] hover:text-[#8b6b14]"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[0.65rem] uppercase tracking-widest border-b border-[#e4ddd2] pb-2 mb-4 text-[#8a8070]">
          By Ritual
        </h4>
        <ul className="space-y-2">
          {rituals.map((r) => (
            <li key={r}>
              <button
                onClick={() => onRitualChange(activeRitual === r ? "" : r)}
                className={`text-sm transition-colors text-left ${
                  activeRitual === r
                    ? "text-[#8b6b14] font-semibold"
                    : "text-[#8a8070] hover:text-[#8b6b14]"
                }`}
              >
                {r}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile-only: clear button when filters active */}
      {activeCount > 0 && (
        <div className="md:hidden mt-6 pt-4 border-t border-[#e4ddd2]">
          <button
            onClick={() => {
              onCollectionChange("All Products");
              onRitualChange("");
            }}
            className="text-xs uppercase tracking-widest text-[#8b6b14] hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );

  return (
    <aside className="w-full md:w-44 flex-shrink-0">
      {/* Mobile toggle button */}
      <button
        className="md:hidden w-full flex items-center justify-between border border-[#e4ddd2] bg-white px-4 py-3 text-xs uppercase tracking-widest text-[#2d2a26] mb-3"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
      >
        <span className="flex items-center gap-2">
          Filters
          {activeCount > 0 && (
            <span className="bg-[#8b6b14] text-white text-[0.6rem] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              {activeCount}
            </span>
          )}
        </span>
        <span className="text-[#8a8070] text-base leading-none">
          {mobileOpen ? "−" : "+"}
        </span>
      </button>

      {/* Filter panel — hidden on mobile when closed, always visible on md+ */}
      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:block bg-white md:bg-transparent border md:border-0 border-[#e4ddd2] px-4 md:px-0 py-5 md:py-0 mb-4 md:mb-0`}
      >
        {filterContent}
      </div>
    </aside>
  );
}
