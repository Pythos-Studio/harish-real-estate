import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { business, isWhatsAppConfigured, whatsappLink } from "../config/business";
import { ease, scrollToId } from "../lib/motion";

const links = [
  { label: "Discover", id: "discover" },
  { label: "Properties", id: "properties" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 250 : 0); };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-charcoal/90 py-3 shadow-lg backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <div className="container-x flex items-center justify-between text-ivory">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="font-serif text-lg tracking-[0.18em] sm:text-xl">
            HARISH <span className="text-champagne">REAL ESTATE</span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className={`link-u text-[12px] uppercase tracking-[0.2em] ${active === l.id ? "text-champagne" : ""}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => go("properties")} className="btn btn-gold !min-h-[42px] !px-6">Find a Property</button>
          </nav>

          <button className="grid h-11 w-11 place-items-center lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-charcoal px-8 text-ivory lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <nav className="flex flex-col gap-5" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left font-serif text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, ease }}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <button onClick={() => go("properties")} className="btn btn-gold mt-10 w-full">Find a Property</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* persistent mobile WhatsApp shortcut */}
      <a
        href={isWhatsAppConfigured ? whatsappLink(`Hi ${business.shortName}, I'd like to enquire about a property.`) : "#contact"}
        onClick={(e) => { if (!isWhatsAppConfigured) { e.preventDefault(); scrollToId("contact"); } }}
        target={isWhatsAppConfigured ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-champagne text-charcoal shadow-xl transition-transform active:scale-95 lg:hidden"
      >
        <MessageCircle />
      </a>
    </>
  );
}
