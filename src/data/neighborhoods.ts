import { img } from "./images";

export interface Neighborhood {
  name: string;
  blurb: string;
  image: string;
  x: number; // illustrative position in 800x560 map space
  y: number;
}

// Candidate service areas — verify with the agency before publication.
// Positions are illustrative, not geographic.
export const neighborhoods: Neighborhood[] = [
  { name: "Wadala", blurb: "Western edge of the corridor, close to the harbour line.", image: img.tower, x: 150, y: 370 },
  { name: "Chembur", blurb: "The agency's home neighbourhood.", image: img.city, x: 360, y: 400 },
  { name: "Tilak Nagar", blurb: "Established residential streets north of Chembur.", image: img.apartment3, x: 430, y: 310 },
  { name: "Deonar", blurb: "Eastern pocket with a mix of homes and commercial frontage.", image: img.shop, x: 540, y: 440 },
  { name: "Vidyavihar", blurb: "Campus-adjacent living in the northern stretch.", image: img.interior, x: 520, y: 210 },
  { name: "Ghatkopar", blurb: "A busy residential and commercial hub.", image: img.house, x: 640, y: 270 },
  { name: "Kanjurmarg", blurb: "Office-led area at the northern end of the map.", image: img.office, x: 670, y: 140 },
];
