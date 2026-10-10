import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, MessageCircle } from "lucide-react";
import { business, isWhatsAppConfigured, whatsappLink } from "../config/business";
import { neighborhoods } from "../data/neighborhoods";
import Reveal from "./Reveal";

export interface Prefill { interest?: string; locality?: string; note?: string; nonce: number }

const interests = ["Rent", "Buy", "Commercial"];
const budgets = ["Not sure yet", "Under ₹25,000 / month", "₹25,000 – ₹60,000 / month", "₹60,000+ / month", "Under ₹1 Cr", "₹1 Cr – ₹2.5 Cr", "₹2.5 Cr+"];

const field = "w-full min-h-[52px] rounded-2xl border border-charcoal/20 bg-paper px-4 text-base outline-none transition-colors focus:border-bronze focus-visible:ring-2 focus-visible:ring-champagne/60";

export default function InquiryForm({ prefill }: { prefill: Prefill | null }) {
  const [v, setV] = useState({ name: "", phone: "", interest: "Rent", locality: "", budget: "Not sure yet", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState<string | null>(null);

  useEffect(() => {
    if (!prefill) return;
    setV((p) => ({ ...p, interest: prefill.interest ?? p.interest, locality: prefill.locality ?? p.locality, notes: prefill.note ?? p.notes }));
    setReady(null);
  }, [prefill]);

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (v.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(v.phone.trim())) er.phone = "Please enter a valid phone number.";
    setErrors(er);
    if (Object.keys(er).length) return;
    if (!isWhatsAppConfigured) return;

    const msg = [
      `Hello ${business.shortName}, I'd like to enquire about a property.`,
      "",
      `Name: ${v.name.trim()}`,
      `Phone: ${v.phone.trim()}`,
      `Interested in: ${v.interest}`,
      `Preferred locality: ${v.locality || "Open"}`,
      `Budget: ${v.budget}`,
      v.notes.trim() ? `Requirements: ${v.notes.trim()}` : "",
    ].filter((l, i, a) => l !== "" || (i > 0 && a[i - 1] !== "")).join("\n");

    const url = whatsappLink(msg);
    setReady(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="bg-paper py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Property enquiry</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.4rem)]">Tell us what <em className="text-bronze">you need.</em></h2>
          <p className="mt-5 text-lg text-charcoal/70">Share a few details and your enquiry will be prepared as a WhatsApp message to the agency.</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={submit} noValidate className="grid gap-5 rounded-3xl border border-charcoal/10 bg-ivory p-6 sm:grid-cols-2 sm:p-10">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.18em]">Name *</label>
              <input id="name" autoComplete="name" className={field} value={v.name} onChange={set("name")} aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1 flex items-center gap-1 text-sm text-red-700"><AlertCircle size={14} />{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-xs uppercase tracking-[0.18em]">Phone number *</label>
              <input id="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} value={v.phone} onChange={set("phone")} aria-invalid={!!errors.phone} />
              {errors.phone && <p className="mt-1 flex items-center gap-1 text-sm text-red-700"><AlertCircle size={14} />{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="interest" className="mb-2 block text-xs uppercase tracking-[0.18em]">Interested in</label>
              <select id="interest" className={field} value={v.interest} onChange={set("interest")}>{interests.map((i) => <option key={i}>{i}</option>)}</select>
            </div>
            <div>
              <label htmlFor="locality" className="mb-2 block text-xs uppercase tracking-[0.18em]">Preferred locality</label>
              <select id="locality" className={field} value={v.locality} onChange={set("locality")}>
                <option value="">Open to suggestions</option>
                {neighborhoods.map((n) => <option key={n.name}>{n.name}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="budget" className="mb-2 block text-xs uppercase tracking-[0.18em]">Budget range</label>
              <select id="budget" className={field} value={v.budget} onChange={set("budget")}>{budgets.map((b) => <option key={b}>{b}</option>)}</select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="notes" className="mb-2 block text-xs uppercase tracking-[0.18em]">Additional requirements</label>
              <textarea id="notes" rows={4} className={`${field} py-3`} value={v.notes} onChange={set("notes")} />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" disabled={!isWhatsAppConfigured} className="btn btn-dark w-full disabled:cursor-not-allowed disabled:opacity-40">
                <MessageCircle size={18} /> Send via WhatsApp
              </button>
              {!isWhatsAppConfigured && (
                <p className="mt-3 rounded-xl bg-champagne/20 p-3 text-sm">Demo mode: the agency's verified WhatsApp number has not been configured yet (set <code>VITE_WHATSAPP_NUMBER</code>), so sending is disabled.</p>
              )}
              {ready && (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-900" role="status">
                  <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
                  <p>Your enquiry is ready to send. WhatsApp should open with your message — press send there to share it with the agency. Nothing has been delivered yet. <a href={ready} target="_blank" rel="noopener noreferrer" className="font-medium underline">Open WhatsApp again</a></p>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
