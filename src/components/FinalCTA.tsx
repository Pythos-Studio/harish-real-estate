import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import { img } from "../data/images";
import { business, isPhoneConfigured, phoneLink } from "../config/business";
import { ease, scrollToId } from "../lib/motion";
import SmartImg from "./SmartImg";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.12, 1]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-charcoal py-32 text-ivory sm:py-44">
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <SmartImg src={img.cta} alt="Architectural photograph of a modern residential building" className="h-full w-full object-cover opacity-50" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-charcoal/60" />
      <div className="container-x text-center">
        <motion.h2
          className="display mx-auto max-w-4xl text-[clamp(2.6rem,7vw,6rem)]"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease }}
        >
          Let's Find a Place That <em className="text-champagne">Fits Your Future.</em>
        </motion.h2>
        <motion.p className="mx-auto mt-6 max-w-lg text-lg text-ivory/80" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1 }}>
          Tell us what you're looking for. Let's start with a conversation.
        </motion.p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button className="btn btn-gold" onClick={() => scrollToId("contact")}>Discuss Your Requirements</button>
          {isPhoneConfigured ? (
            <a className="btn btn-ghost" href={phoneLink()}><Phone size={16} /> Call the Agency</a>
          ) : (
            <button className="btn btn-ghost" onClick={() => scrollToId("contact")} title="Phone number not configured yet"><Phone size={16} /> Call the Agency</button>
          )}
        </div>
        {!isPhoneConfigured && <p className="mt-4 text-xs text-ivory/50">Phone number to be added after verification with {business.shortName}.</p>}
      </div>
    </section>
  );
}
