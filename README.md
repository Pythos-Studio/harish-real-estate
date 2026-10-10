# Harish Real Estate Agency — Cinematic Website Demo
Website concept by [Pythos Studio](https://github.com/PythosX).

React + Vite + TypeScript · Tailwind CSS 3 · Framer Motion · GSAP ScrollTrigger · Lucide.

## Run locally
```bash
npm install
cp .env.example .env     # then fill in the verified numbers
npm run dev              # http://localhost:5173
npm run build            # type-check + production build into /dist
npm run preview
```

## Push to GitHub
```bash
git init && git add . && git commit -m "Harish Real Estate demo"
git branch -M main
git remote add origin https://github.com/<you>/harish-real-estate.git
git push -u origin main
```

## Deploy to Vercel
1. Vercel → **Add New → Project** → import the GitHub repo (Vite is auto-detected).
2. Under **Environment Variables** add:
   - `VITE_WHATSAPP_NUMBER` — digits with country code, e.g. `91XXXXXXXXXX`
   - `VITE_PHONE_NUMBER` — e.g. `+91XXXXXXXXXX`
3. Deploy. Re-deploy after changing env vars (they are baked in at build time).

Until the WhatsApp number is set, the enquiry button is disabled and clearly says so. Until the phone number is set, the call button scrolls to the form.

## Where to edit things
| What | File |
|---|---|
| Name, locality, numbers, maps link, credit | `src/config/business.ts` |
| Property listings (all sample data) | `src/data/properties.ts` |
| Service areas / map pins | `src/data/neighborhoods.ts` |
| Photos | `src/data/images.ts` |
| Real testimonials (empty = FAQ shown) | `src/data/testimonials.ts` |

## Verify with the owner before launch
- Verified WhatsApp and phone numbers
- Exact address (footer shows "Chembur, Mumbai", subject to verification) and Google Maps link
- Which localities are actually served (Chembur, Deonar, Tilak Nagar, Wadala, Ghatkopar, Vidyavihar, Kanjurmarg are candidates)
- Which services are actually offered (the four service cards are proposed)
- Real listings, with price / area / furnishing only when verified, then set `sample: false`
- Approved testimonials with permission to publish
- Photography rights: images currently load from Unsplash for the demo; replace them with the agency's own or licensed photos (put files in `public/images` and update `src/data/images.ts`)
- Replace `public/og-image.svg` with a 1200×630 PNG/JPG (many social platforms ignore SVG)
- Add LocalBusiness structured data (JSON-LD) only once details are verified; it is deliberately not included
