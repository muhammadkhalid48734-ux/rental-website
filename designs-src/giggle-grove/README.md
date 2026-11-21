# Giggle Grove Party Rentals: sample design

A **fictional** business used as a sample design on the Hopbook site. Stock photos (Unsplash).
Served as static files from `public/designs/giggle-grove/`, live at `/designs/giggle-grove/`.

It started as a copy of an earlier demo; every real business detail was removed (names, people,
places, phone numbers, emails, WhatsApp/social links, reviews, ratings, structured data).
Keep it that way: no real names, places, phone numbers, reviews or claims.

## Change it

```bash
cd designs-src/giggle-grove
npm install
npm run dev          # http://localhost:4321/designs/giggle-grove/
npm run build:site   # builds with base /designs/giggle-grove and replaces ../../public/designs/giggle-grove
```

Then rebuild the Hopbook site from the repo root (`npm run build`) and commit both this folder and
`public/designs/giggle-grove/`. If the first screen changes, retake the screenshots in `public/samples/`.

## Rules built in

* `<meta name="robots" content="noindex">` on the page.
* Top banner: "Sample design · fictional business · stock photos".
* The request form never sends anything. Submit shows:
  "This is a sample. In your real site, requests go straight to you."
* Business facts live in `src/data/site.ts`; page markup in `src/pages/index.astro`.
