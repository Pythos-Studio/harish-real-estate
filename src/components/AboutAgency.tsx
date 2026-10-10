import { img } from "../data/images";
import { scrollToId } from "../lib/motion";
import Reveal from "./Reveal";
import SmartImg from "./SmartImg";

export default function AboutAgency() {
  return (
    <section id="about" className="overflow-hidden bg-paper py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-6">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl">
            <SmartImg src={img.city} alt="Architectural residential facade" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-2 hidden w-1/2 overflow-hidden rounded-3xl border-8 border-paper sm:block lg:-right-10">
            <SmartImg src={img.interior} alt="Calm residential interior" className="aspect-square w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow">About the agency</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)]">Real Estate Is About <em className="text-bronze">People, First.</em></h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/75">Finding the right property is about more than location. It is about understanding your plans, your priorities, and the kind of space that makes sense for you.</p>
          <p className="mt-4 leading-relaxed text-charcoal/70">Harish Real Estate Agency helps people explore residential and commercial property in Mumbai through direct, straightforward conversation.</p>
          <button className="btn btn-dark mt-8" onClick={() => scrollToId("contact")}>Get in touch</button>
        </Reveal>
      </div>
    </section>
  );
}
