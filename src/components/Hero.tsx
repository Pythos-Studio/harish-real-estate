import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { img } from "../data/images";
import { ease, scrollToId } from "../lib/motion";
import SmartImg from "./SmartImg";

const lines = ["Your Next Chapter", "Begins at Home."];

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);
  const state = ready ? "show" : "hidden";

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-ivory">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: reduce ? 1 : 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <SmartImg src={img.hero} alt="Contemporary Mumbai apartment building with warm natural light" eager className="h-[115%] w-full object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/30" />

      <motion.div style={{ y: textY }} className="container-x relative pb-24 pt-40 sm:pb-28">
        <motion.p
          className="eyebrow !text-champagne"
          initial="hidden" animate={state}
          variants={{ hidden: { opacity: 0, letterSpacing: "0.6em" }, show: { opacity: 1, letterSpacing: "0.28em", transition: { duration: 1.2, ease } } }}
        >
          Real Estate · Chembur, Mumbai
        </motion.p>

        <h1 className="display mt-6 text-[clamp(2.8rem,8.5vw,8rem)]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block ${i === 1 ? "italic text-champagne" : ""}`}
                initial="hidden" animate={state}
                variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1.1, delay: 0.15 + i * 0.15, ease } } }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg"
          initial="hidden" animate={state}
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.9, ease } } }}
        >
          Discover homes and property opportunities across Mumbai with a more personal, straightforward approach.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row"
          initial="hidden" animate={state}
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.9, ease } } }}
        >
          <button className="btn btn-gold" onClick={() => scrollToId("properties")}>Explore Properties</button>
          <button className="btn btn-ghost" onClick={() => scrollToId("contact")}>Let's Talk</button>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ivory/70 sm:absolute sm:bottom-28 sm:right-12 sm:mt-0"
          initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.2, duration: 1 }}
        >
          <MapPin size={14} className="text-champagne" /> Chembur · Mumbai
        </motion.div>
      </motion.div>

      <motion.button
        aria-label="Scroll to next section"
        onClick={() => scrollToId("discover")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/70 sm:flex"
        initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.4 }}
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-ivory/20">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-champagne" animate={reduce ? undefined : { y: [-16, 40] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} />
        </span>
        <ArrowDown size={12} className="sr-only" />
      </motion.button>
    </section>
  );
}
