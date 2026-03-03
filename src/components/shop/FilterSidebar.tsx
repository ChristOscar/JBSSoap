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
  return (
    <aside className="w-full md:w-44 flex-shrink-0">
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
    </aside>
  );
}
