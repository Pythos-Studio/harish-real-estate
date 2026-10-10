import { X } from "lucide-react";

export type Category = "All Properties" | "For Rent" | "For Sale" | "Residential" | "Commercial";
export const categories: Category[] = ["All Properties", "For Rent", "For Sale", "Residential", "Commercial"];

interface Props {
  active: Category;
  onChange: (c: Category) => void;
  locality: string | null;
  onClearLocality: () => void;
}

export default function PropertyFilters({ active, onChange, locality, onClearLocality }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter properties">
      {categories.map((c) => (
        <button
          key={c}
          role="tab"
          aria-selected={active === c}
          onClick={() => onChange(c)}
          className={`min-h-[44px] rounded-full border px-5 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
            active === c ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 hover:border-charcoal"
          }`}
        >
          {c}
        </button>
      ))}
      {locality && (
        <button onClick={onClearLocality} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-champagne px-5 text-[11px] uppercase tracking-[0.18em] text-charcoal">
          {locality} <X size={14} aria-label="Clear locality filter" />
        </button>
      )}
    </div>
  );
}
