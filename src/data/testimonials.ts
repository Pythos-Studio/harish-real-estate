export interface Testimonial {
  quote: string;
  name: string;
  source: string; // where / how permission to publish was obtained
}

// Add ONLY real testimonials approved by the agency (with permission to publish).
// While this array is empty, the site shows "Questions Before You Decide?" instead.
export const testimonials: Testimonial[] = [];

export const faqs = [
  { q: "What should I share when I enquire?", a: "Your preferred locality, whether you want to rent, buy or find commercial space, your budget range and any must-haves. The more clear you are, the more useful the conversation." },
  { q: "Are the properties on this site live listings?", a: "No. Listings shown here are sample properties for demonstration. Real availability is discussed directly with the agency." },
  { q: "Can I arrange a visit?", a: "Viewings can be discussed with the agency once you share your requirements, subject to availability." },
  { q: "Do I need to decide quickly?", a: "No. Start with a conversation, explore options and take the time you need to decide." },
];
