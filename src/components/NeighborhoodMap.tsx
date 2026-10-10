import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { neighborhoods, type Neighborhood } from "../data/neighborhoods";
import { ease } from "../lib/motion";
import Reveal from "./Reveal";
import SmartImg from "./SmartImg";

export default function NeighborhoodMap({ onFind }: { onFind: (name: string) => void }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Neighborhood>(neighborhoods[1]);
  const draw = (delay = 0) => ({
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 2, delay, ease },
  });

  return (
    <section id="areas" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Local expertise</p>
          <h2 className="display mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">Mumbai, <em className="text-bronze">neighbourhood by neighbourhood.</em></h2>
          <p className="mt-4 text-sm text-charcoal/60">Candidate service areas, to be confirmed with the agency. The map is an illustration, not to scale.</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-3xl bg-charcoal p-2 lg:col-span-8">
            <svg viewBox="0 0 800 560" className="h-auto w-full" role="group" aria-label="Illustrated map of Mumbai neighbourhoods">
              <motion.path d="M0 500 C 120 470, 180 440, 230 470 S 330 540, 420 520" fill="none" stroke="#C9A96E" strokeOpacity=".35" strokeWidth="2" {...draw()} />
              <motion.path d="M90 120 C 200 160, 260 260, 330 330 S 520 470, 560 520" fill="none" stroke="#F6F1E7" strokeOpacity=".18" strokeWidth="2" strokeDasharray="6 8" {...draw(0.2)} />
              <motion.path d="M170 370 L 360 400 L 430 310 L 520 210 L 640 270 L 670 140" fill="none" stroke="#C9A96E" strokeOpacity=".5" strokeWidth="1.5" {...draw(0.4)} />
              <motion.path d="M360 400 L 540 440 L 640 270" fill="none" stroke="#F6F1E7" strokeOpacity=".12" strokeWidth="1.5" {...draw(0.6)} />
              {[100, 200, 300, 400, 500].map((g) => <line key={g} x1="0" x2="800" y1={g} y2={g} stroke="#F6F1E7" strokeOpacity=".04" />)}
              {neighborhoods.map((n, i) => {
                const on = active.name === n.name;
                return (
                  <motion.g
                    key={n.name}
                    initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.12, duration: 0.6, ease }}
                    style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: "pointer" }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${n.name} neighbourhood`}
                    onMouseEnter={() => setActive(n)}
                    onFocus={() => setActive(n)}
                    onClick={() => setActive(n)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(n); } }}
                  >
                    <circle cx={n.x} cy={n.y} r={on ? 26 : 18} fill="#C9A96E" fillOpacity={on ? 0.25 : 0.12} style={{ transition: "all .4s" }} />
                    <circle cx={n.x} cy={n.y} r={on ? 9 : 6} fill={on ? "#C9A96E" : "#F6F1E7"} style={{ transition: "all .4s" }} />
                    <circle cx={n.x} cy={n.y} r="22" fill="transparent" />
                    <text x={n.x} y={n.y + 34} textAnchor="middle" fill="#F6F1E7" fontSize="15" fontFamily="Inter, sans-serif" letterSpacing="2" style={{ textTransform: "uppercase" }}>{n.name}</text>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden rounded-3xl border border-charcoal/10 bg-ivory"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <SmartImg src={active.image} alt={`${active.name}, Mumbai`} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="eyebrow">Neighbourhood</p>
                  <h3 className="mt-2 font-serif text-3xl">{active.name}</h3>
                  <p className="mt-2 text-charcoal/70">{active.blurb}</p>
                  <button className="btn btn-dark mt-6 w-full" onClick={() => onFind(active.name)}>Find Properties</button>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
              {neighborhoods.map((n) => (
                <button key={n.name} onClick={() => setActive(n)} className={`min-h-[44px] rounded-full border px-4 text-[11px] uppercase tracking-[0.15em] ${active.name === n.name ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25"}`}>{n.name}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
