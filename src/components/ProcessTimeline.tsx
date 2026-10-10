import { motion } from "framer-motion";
import { ease } from "../lib/motion";
import Reveal from "./Reveal";

const steps = [
  { n: "01", t: "Tell Us What You Need", d: "Share your location, budget, property type, and preferences." },
  { n: "02", t: "Explore Options", d: "Discuss potentially suitable properties with the agency." },
  { n: "03", t: "Arrange a Visit", d: "Coordinate a property viewing when available." },
  { n: "04", t: "Move Forward", d: "Discuss the next steps directly with the agency." },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-charcoal py-24 text-ivory sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow !text-champagne">How it works</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,6vw,5rem)]">Four steps, <em className="text-champagne">one conversation.</em></h2>
        </Reveal>
        <div className="relative mt-16">
          <motion.div className="absolute left-[11px] top-0 h-full w-px origin-top bg-champagne/60 md:hidden" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.8, ease }} />
          <motion.div className="absolute left-0 top-[11px] hidden h-px w-full origin-left bg-champagne/60 md:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.8, ease }} />
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <motion.li key={s.n} className="relative pl-10 md:pl-0 md:pt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.25 + i * 0.25, ease }}>
                <span className="absolute left-0 top-1 h-[23px] w-[23px] rounded-full border border-champagne bg-charcoal md:top-0">
                  <span className="absolute inset-[6px] rounded-full bg-champagne" />
                </span>
                <p className="font-serif text-5xl text-champagne/70">{s.n}</p>
                <h3 className="mt-2 text-sm font-medium uppercase tracking-[0.18em]">{s.t}</h3>
                <p className="mt-3 text-ivory/70">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
