import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { img } from "../data/images";
import { business } from "../config/business";
import { ease } from "../lib/motion";
import SmartImg from "./SmartImg";

interface Props { onDone: () => void }

const TEXT = "FIND YOUR PLACE IN MUMBAI";

export default function Preloader({ onDone }: Props) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 900 : 2300);
    return () => clearTimeout(t);
  }, [onDone, reduce]);

  if (reduce) {
    return (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal px-6 text-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p className="font-serif text-3xl text-ivory">{business.name}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-charcoal px-6"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease } }}
      aria-label="Loading"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{ delay: 0.7, duration: 1.4, ease }}
      >
        <SmartImg src={img.hero} alt="" eager className="h-full w-full object-cover" />
      </motion.div>

      <motion.div
        className="absolute left-0 top-1/2 h-px w-full origin-left bg-champagne"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease }}
      />

      <h2 className="relative mt-10 flex flex-wrap justify-center font-serif text-[clamp(1.5rem,5vw,3.2rem)] tracking-[0.12em] text-ivory" aria-label={TEXT}>
        {TEXT.split("").map((c, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.03, duration: 0.5, ease }}
            className="inline-block"
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        ))}
      </h2>

      <motion.p
        className="relative mt-6 text-[11px] uppercase tracking-[0.35em] text-champagne"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        {business.name}
      </motion.p>
    </motion.div>
  );
}
