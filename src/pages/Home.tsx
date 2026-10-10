import { useCallback, useState } from "react";
import AboutAgency from "../components/AboutAgency";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import InquiryForm, { type Prefill } from "../components/InquiryForm";
import NeighborhoodMap from "../components/NeighborhoodMap";
import Navbar from "../components/Navbar";
import ProcessTimeline from "../components/ProcessTimeline";
import PropertyDiscovery from "../components/PropertyDiscovery";
import type { Category } from "../components/PropertyFilters";
import PropertyShowcase from "../components/PropertyShowcase";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import type { Property } from "../data/properties";
import { scrollToId } from "../lib/motion";

export default function Home({ ready }: { ready: boolean }) {
  const [category, setCategory] = useState<Category>("All Properties");
  const [locality, setLocality] = useState<string | null>(null);
  const [prefill, setPrefill] = useState<Prefill | null>(null);

  const explore = useCallback((c: Category) => { setCategory(c); setLocality(null); setTimeout(() => scrollToId("properties"), 50); }, []);
  const findIn = useCallback((name: string) => { setLocality(name); setCategory("All Properties"); setTimeout(() => scrollToId("properties"), 50); }, []);
  const enquire = useCallback((p: Property) => {
    setPrefill({
      nonce: Date.now(),
      interest: p.segment === "Commercial" ? "Commercial" : p.listing === "Rent" ? "Rent" : "Buy",
      locality: p.locality,
      note: `Interested in: ${p.title} (${p.propertyType}, ${p.locality}) — sample listing`,
    });
    setTimeout(() => scrollToId("contact"), 50);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero ready={ready} />
        <PropertyShowcase onExplore={explore} />
        <PropertyDiscovery category={category} setCategory={setCategory} locality={locality} setLocality={setLocality} onEnquire={enquire} />
        <NeighborhoodMap onFind={findIn} />
        <Services />
        <ProcessTimeline />
        <AboutAgency />
        <Testimonials />
        <InquiryForm prefill={prefill} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
