import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { faqs, testimonials } from "../data/testimonials";
import { ease } from "../lib/motion";
import Reveal from "./Reveal";

function Carousel() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) => setI((i + d + testimonials.length) % testimonials.length);
  return (
    <div className="mx-auto max-w-3xl text-center" onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}>
      <AnimatePresence mode="wait">
        <motion.figure key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <blockquote className="font-serif text-3xl leading-snug sm:text-4xl">“{t.quote}”</blockquote>
          <figcaption className="mt-6 text-sm uppercase tracking-[0.2em] text-bronze">{t.name}</figcaption>
        </motion.figure>
      </AnimatePresence>
      {testimonials.length > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          <button aria-label="Previous testimonial" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-charcoal/25"><ChevronLeft /></button>
          <button aria-label="Next testimonial" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border border-charcoal/25"><ChevronRight /></button>
        </div>
      )}
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-charcoal/15 border-y border-charcoal/15">
      {faqs.map((f, idx) => (
        <div key={f.q}>
          <button className="flex min-h-[64px] w-full items-center justify-between gap-6 text-left" aria-expanded={open === idx} onClick={() => setOpen(open === idx ? null : idx)}>
            <span className="font-serif text-xl sm:text-2xl">{f.q}</span>
            <Plus className={`shrink-0 transition-transform duration-300 ${open === idx ? "rotate-45" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === idx && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                <p className="pb-6 text-charcoal/70">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const has = testimonials.length > 0;
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">{has ? "In their words" : "Good to know"}</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">{has ? "What clients say." : "Questions Before You Decide?"}</h2>
        </Reveal>
        {has ? <div className="mt-12"><Carousel /></div> : <Faq />}
      </div>
    </section>
  );
}
