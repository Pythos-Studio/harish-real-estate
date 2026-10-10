import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { img } from "../data/images";
import type { Category } from "./PropertyFilters";
import SmartImg from "./SmartImg";

gsap.registerPlugin(ScrollTrigger);

const scenes: { n: string; title: string; copy: string; image: string; alt: string; cat: Category; cta: string }[] = [
  { n: "01", title: "The City Home", copy: "Contemporary apartments and comfortable residential spaces.", image: img.interior, alt: "Bright contemporary apartment interior", cat: "Residential", cta: "Explore homes" },
  { n: "02", title: "The Right Investment", copy: "Property opportunities for buyers and investors.", image: img.house, alt: "Contemporary residence exterior at dusk", cat: "For Sale", cta: "Explore for sale" },
  { n: "03", title: "Space to Grow", copy: "Commercial properties and business spaces.", image: img.tower, alt: "Glass commercial tower facade", cat: "Commercial", cta: "Explore commercial" },
];

export default function PropertyShowcase({ onExplore }: { onExplore: (c: Category) => void }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".scene").forEach((scene) => {
          const wrap = scene.querySelector(".mask");
          const inner = scene.querySelector(".parallax");
          const head = scene.querySelectorAll(".rise");
          gsap.fromTo(wrap, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: scene, start: "top 75%", once: true } });
          gsap.fromTo(head, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: scene, start: "top 70%", once: true } });
          gsap.fromTo(inner, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
    }, root);
    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return (
    <section id="discover" ref={root} className="bg-charcoal py-24 text-ivory sm:py-32">
      <div className="container-x">
        <p className="eyebrow !text-champagne">Discover</p>
        <h2 className="display mt-4 text-[clamp(2.6rem,7vw,6.5rem)]">More Than <em className="text-champagne">Four Walls.</em></h2>

        <div className="mt-20 space-y-28 sm:space-y-40">
          {scenes.map((s, i) => (
            <div key={s.n} className="scene grid items-center gap-10 lg:grid-cols-12">
              <div className={`mask relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <SmartImg src={s.image} alt={s.alt} className="parallax absolute left-0 top-[-8%] h-[116%] w-full object-cover" />
              </div>
              <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                <p className="rise font-serif text-7xl text-champagne/70">{s.n}</p>
                <h3 className="rise display mt-2 text-4xl sm:text-5xl">{s.title}</h3>
                <p className="rise mt-4 text-lg text-ivory/75">{s.copy}</p>
                <button className="rise link-u mt-8 inline-flex min-h-[44px] items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-champagne" onClick={() => onExplore(s.cat)}>
                  {s.cta} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
