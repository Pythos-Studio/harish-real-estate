// ─────────────────────────────────────────────────────────────
// CENTRAL BUSINESS CONFIG — edit here (or via .env / Vercel env vars)
// Never publish contact details that have not been verified with the owner.
// ─────────────────────────────────────────────────────────────
const digits = (v?: string) => (v ?? "").replace(/\D/g, "");

export const business = {
  name: "Harish Real Estate Agency",
  shortName: "Harish Real Estate",
  locality: "Chembur, Mumbai", // subject to address verification
  // Set VITE_WHATSAPP_NUMBER (digits with country code, e.g. 91XXXXXXXXXX)
  whatsappNumber: digits(import.meta.env.VITE_WHATSAPP_NUMBER),
  // Set VITE_PHONE_NUMBER (e.g. +91XXXXXXXXXX)
  phoneNumber: (import.meta.env.VITE_PHONE_NUMBER ?? "").replace(/[^\d+]/g, ""),
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Harish+Real+Estate+Agency+Chembur+Mumbai",
  credit: { label: "Pythos Studio", url: "https://github.com/PythosX" },
};

export const isWhatsAppConfigured = business.whatsappNumber.length >= 10;
export const isPhoneConfigured = business.phoneNumber.length >= 8;

export const whatsappLink = (text = "") =>
  `https://wa.me/${business.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const phoneLink = () => `tel:${business.phoneNumber}`;
