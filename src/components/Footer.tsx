import { MapPin, MessageCircle, Phone } from "lucide-react";
import { business, isPhoneConfigured, isWhatsAppConfigured, phoneLink, whatsappLink } from "../config/business";
import { scrollToId } from "../lib/motion";

const links = [["Discover", "discover"], ["Properties", "properties"], ["Services", "services"], ["About", "about"], ["Contact", "contact"]];

export default function Footer() {
  return (
    <footer className="bg-charcoal pb-28 pt-20 text-ivory lg:pb-10">
      <div className="container-x">
        <div className="grid gap-12 border-b border-ivory/15 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-3xl">{business.name}</p>
            <p className="mt-2 text-ivory/60">{business.locality} <span className="text-xs">(address subject to verification)</span></p>
            <button className="btn btn-gold mt-6" onClick={() => scrollToId("contact")}>Property Enquiry</button>
          </div>
          <nav className="md:col-span-3" aria-label="Footer">
            <p className="eyebrow !text-champagne">Navigate</p>
            <ul className="mt-4 space-y-2">
              {links.map(([l, id]) => <li key={id}><button onClick={() => scrollToId(id)} className="link-u min-h-[36px] text-ivory/80">{l}</button></li>)}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow !text-champagne">Reach out</p>
            <ul className="mt-4 space-y-3 text-ivory/80">
              <li>{isWhatsAppConfigured ? <a className="link-u inline-flex items-center gap-2" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a> : <span className="inline-flex items-center gap-2 text-ivory/40"><MessageCircle size={16} /> WhatsApp — to be verified</span>}</li>
              <li>{isPhoneConfigured ? <a className="link-u inline-flex items-center gap-2" href={phoneLink()}><Phone size={16} /> {business.phoneNumber}</a> : <span className="inline-flex items-center gap-2 text-ivory/40"><Phone size={16} /> Phone — to be verified</span>}</li>
              <li><a className="link-u inline-flex items-center gap-2" href={business.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> Get directions</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-8 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p><strong className="font-medium text-ivory/70">Privacy:</strong> details you enter in the enquiry form are used only to prepare your WhatsApp message to the agency. This demo does not store them.</p>
          <p>Website concept by <a className="link-u text-champagne" href={business.credit.url} target="_blank" rel="noopener noreferrer">{business.credit.label}</a> · Crafted by {business.credit.label}.</p>
        </div>
      </div>
    </footer>
  );
}
