import { AnimatePresence, motion } from "framer-motion";
import { properties, type Property } from "../data/properties";
import PropertyCard from "./PropertyCard";
import PropertyFilters, { type Category } from "./PropertyFilters";
import Reveal from "./Reveal";

interface Props {
  category: Category;
  setCategory: (c: Category) => void;
  locality: string | null;
  setLocality: (l: string | null) => void;
  onEnquire: (p: Property) => void;
}

export function filterProperties(category: Category, locality: string | null) {
  return properties.filter((p) => {
    const catOk =
      category === "All Properties" ||
      (category === "For Rent" && p.listing === "Rent") ||
      (category === "For Sale" && p.listing === "Sale") ||
      (category === "Residential" && p.segment === "Residential") ||
      (category === "Commercial" && p.segment === "Commercial");
    return catOk && (!locality || p.locality === locality);
  });
}

export default function PropertyDiscovery({ category, setCategory, locality, setLocality, onEnquire }: Props) {
  const list = filterProperties(category, locality);
  return (
    <section id="properties" className="bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Find the right space</p>
          <h2 className="display mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">Space for Every <em className="text-bronze">Next Step.</em></h2>
          <p className="mt-5 max-w-xl text-lg text-charcoal/70">From your first rental to a place for your business, explore possibilities that fit your plans.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <PropertyFilters active={category} onChange={setCategory} locality={locality} onClearLocality={() => setLocality(null)} />
          <p className="mt-4 text-xs text-charcoal/60">Listings shown are sample properties for demonstration. Real availability is confirmed directly with the agency.</p>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {list.map((p, i) => <PropertyCard key={p.id} property={p} index={i} onEnquire={onEnquire} />)}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-charcoal/25 p-10 text-center">
            <p className="font-serif text-2xl">No sample listings match this combination.</p>
            <p className="mt-2 text-charcoal/70">Tell us what you're looking for and we'll take it from there.</p>
            <button className="btn btn-dark mt-6" onClick={() => { setCategory("All Properties"); setLocality(null); }}>Reset filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
