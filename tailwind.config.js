/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F1E7",
        paper: "#FBF8F2",
        charcoal: "#17171A",
        ink: "#2A2A2E",
        bronze: "#9C7A45",
        champagne: "#C9A96E",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: { wider2: "0.22em" },
    },
  },
  plugins: [],
};
