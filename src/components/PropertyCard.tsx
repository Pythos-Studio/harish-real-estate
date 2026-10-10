import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble, Ruler, Sofa } from "lucide-react";
import type { Property } from "../data/properties";
import { ease } from "../lib/motion";
import SmartImg from "./SmartImg";

interface Props { property: Property; index: number; onEnquire: (p: Property) => void }

export default function PropertyCard({ property: p, index, onEnquire }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-paper transition-all duration-500 hover:border-bronze/50 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImg src={p.image} alt={p.imageAlt} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-ivory/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]">For {p.listing}</span>
          {p.sample && <span className="rounded-full bg-charcoal/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-champagne">Sample property</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{p.propertyType} · {p.segment}</p>
        <h3 className="mt-2 font-serif text-2xl leading-tight">{p.title}</h3>
        <p className="mt-1 text-sm text-charcoal/70">{p.locality}, Mumbai</p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal/80">
          {p.bedrooms !== undefined && <li className="flex items-center gap-2"><BedDouble size={16} className="text-bronze" /> {p.bedrooms} BHK</li>}
          {p.furnishing && <li className="flex items-center gap-2"><Sofa size={16} className="text-bronze" /> {p.furnishing}</li>}
          {p.areaSqFt && <li className="flex items-center gap-2"><Ruler size={16} className="text-bronze" /> {p.areaSqFt} sq ft</li>}
        </ul>
        <p className="mt-4 text-sm font-medium">{p.price ?? "Price on request"}</p>

        <button onClick={() => onEnquire(p)} className="mt-6 flex min-h-[48px] items-center justify-between rounded-full border border-charcoal/20 px-5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-charcoal hover:text-ivory">
          Enquire About This Property
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </motion.article>
  );
}
