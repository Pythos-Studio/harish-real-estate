import { img } from "./images";

export type Listing = "Rent" | "Sale";
export type Segment = "Residential" | "Commercial";

export interface Property {
  id: string;
  title: string;
  segment: Segment;
  listing: Listing;
  propertyType: string;
  locality: string; // must match a neighborhood name for map filtering
  image: string;
  imageAlt: string;
  bedrooms?: number;
  furnishing?: string;
  areaSqFt?: number; // only when verified
  price?: string; // only when verified
  sample: boolean;
}

// ─────────────────────────────────────────────────────────────
// SAMPLE LISTINGS — demonstration only.
// Replace with real listings from the agency. Leave price / area /
// furnishing undefined unless verified.
// ─────────────────────────────────────────────────────────────
export const properties: Property[] = [
  { id: "s1", title: "Contemporary Apartment", segment: "Residential", listing: "Rent", propertyType: "Apartment", locality: "Chembur", image: img.apartment1, imageAlt: "Sample modern apartment living room", bedrooms: 2, sample: true },
  { id: "s2", title: "Family Home with Natural Light", segment: "Residential", listing: "Sale", propertyType: "Apartment", locality: "Tilak Nagar", image: img.apartment3, imageAlt: "Sample bright residential interior", bedrooms: 3, sample: true },
  { id: "s3", title: "Compact City Studio", segment: "Residential", listing: "Rent", propertyType: "Studio", locality: "Wadala", image: img.apartment2, imageAlt: "Sample studio apartment interior", bedrooms: 1, sample: true },
  { id: "s4", title: "Investor-Ready Residence", segment: "Residential", listing: "Sale", propertyType: "Apartment", locality: "Ghatkopar", image: img.house, imageAlt: "Sample contemporary residence exterior", bedrooms: 2, sample: true },
  { id: "s5", title: "Professional Office Space", segment: "Commercial", listing: "Rent", propertyType: "Office", locality: "Kanjurmarg", image: img.office, imageAlt: "Sample open-plan office space", sample: true },
  { id: "s6", title: "Street-Facing Retail Unit", segment: "Commercial", listing: "Sale", propertyType: "Shop", locality: "Deonar", image: img.shop, imageAlt: "Sample retail shopfront", sample: true },
  { id: "s7", title: "Quiet Apartment near Campus", segment: "Residential", listing: "Rent", propertyType: "Apartment", locality: "Vidyavihar", image: img.interior, imageAlt: "Sample calm apartment interior", bedrooms: 2, sample: true },
  { id: "s8", title: "Business Floor Opportunity", segment: "Commercial", listing: "Rent", propertyType: "Office", locality: "Chembur", image: img.tower, imageAlt: "Sample commercial tower facade", sample: true },
];
