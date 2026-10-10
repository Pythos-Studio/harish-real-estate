import { motion } from "framer-motion";
import { Building2, Compass, Home, KeyRound } from "lucide-react";
import { img } from "../data/images";
import { ease, scrollToId } from "../lib/motion";
import Reveal from "./Reveal";
import SmartImg from "./SmartImg";

// Proposed service descriptions — confirm the agency's actual offerings before launch.
const services = [
  { n: "01", icon: KeyRound, title: "Property Rentals", copy: "Find residential spaces based on your needs and budget.", image: img.apartment1 },
  { n: "02", icon: Home, title: "Buy & Sell", copy: "Explore buying or selling opportunities with personalized assistance.", image: img.house },
  { n: "03", icon: Building2, title: "Commercial Property", copy: "Discover spaces for offices, shops, and other business requirements.", image: img.office },
  { n: "04", icon: Compass, title: "Property Consultation", copy: "Discuss your requirements and explore suitable next steps.", image: img.interior },
];

export default function Services() {
  return (
    <section id="services" className="bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,6vw,5rem)]">A Clearer <em className="text-bronze">Way Forward.</em></h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 0.1}>
              <article className="group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl border border-charcoal/10 bg-paper p-8 transition-colors duration-500 hover:border-bronze/60">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <SmartImg src={s.image} alt="" className="h-full w-full scale-105 object-cover transition-transform duration-[1400ms] group-hover:scale-100" />
                  <div className="absolute inset-0 bg-charcoal/75" />
                </div>
                <div className="relative flex items-start justify-between transition-colors duration-500 group-hover:text-ivory">
                  <span className="font-serif text-7xl text-bronze/60 group-hover:text-champagne">{s.n}</span>
                  <s.icon strokeWidth={1.2} size={34} />
                </div>
                <div className="relative transition-colors duration-500 group-hover:text-ivory">
                  <motion.div className="mb-6 h-px origin-left bg-current opacity-30" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease }} />
                  <h3 className="font-serif text-3xl">{s.title}</h3>
                  <p className="mt-2 max-w-sm opacity-80">{s.copy}</p>
                  <button onClick={() => scrollToId("contact")} className="link-u mt-6 inline-flex min-h-[44px] items-center text-[12px] uppercase tracking-[0.2em]">Enquire</button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
