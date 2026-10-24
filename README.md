# Booking websites for bounce house rentals: marketing site

A one-page, mobile-first marketing site for a small remote web design studio. Built with [Astro](https://astro.build) (static output, no UI framework, a few small vanilla scripts). Deploys to Vercel, Netlify or Cloudflare Pages.

## Run it

Requires Node 20 or newer (`.nvmrc` pins 22).

```bash
npm install
npm run dev       # http://localhost:4321, with dev-only placeholder markers
npm run build     # static site in ./dist
npm run preview   # serve ./dist locally
```

The site builds and runs with every placeholder still in place.

## All business details live in `src/config.js`

Anything starting with `TODO` is a placeholder. Fill them in and rebuild. Everything on the page that shows a price, plan feature, add-on, first-year cost, support hour or contact detail renders from this file, so the page cannot contradict itself.

| Area | Fields |
| --- | --- |
| Who you are | `studioName`, `ownerName`, `ownerRole`, `ownerPhoto`, `ownerBio` |
| Site | `siteUrl` (full `https://` URL, used for canonical, OG tags, sitemap) |
| Contact | `email`, `whatsapp` (digits with country code), `calendarUrl` (optional), `formEndpoint`, `formProvider` |
| Hours | `timezone`, `supportHours` (`daysLabel`, `start`, `end` as `"09:00"`), `replyTime`, `demoTurnaround` |
| Money | `packages`, `compare`, `addons`, `domainEstimatePerYear`, `paymentMethod`, `smsAvailable` |
| Policies | `policies.stopPaying`, `outreachDisclosure`, `markBooked`, `invoiceAgreement`, `exclusivity` |
| Other | `testimonials`, `analytics`, `indexSampleSites`, `legalLastUpdated` |

Notes:

- **Prices.** Change a number in `packages` or `addons` and the plan cards, compare table, add-ons list, first-year cost lines, FAQ and Terms page all update.
- **Text reminders.** While `smsAvailable` is `false`, every mention (plan card, compare table, add-ons, FAQ, Terms) shows "Coming soon". Prices and first-year costs still compute.
- **Testimonials.** The section renders nothing until `testimonials` has entries with `permission: true`.
- **Support hours.** Once `start` and `end` are real `HH:MM` values, US Eastern, Central, Mountain and Pacific times are shown. They are recalculated in the visitor's browser for today's date (daylight saving included), with a build-time fallback if JavaScript is off.
- **Analytics.** Off by default. Set `analytics.enabled: true`, plus `domain` (and `scriptSrc` if you don't use Plausible), for a cookie-free script. The Privacy page text changes to match.
- **Sample sites.** `/samples/...` pages ask search engines not to index them (they are made-up businesses). Set `indexSampleSites: true` to allow it.

Sample site content (fictional names, items, prices, FAQs) is in `src/samples/data.js`.

## The contact form

Set `formEndpoint` to any service that accepts a JSON `POST` and returns a 2xx (Formspree, Getform, Basin...). The form posts `businessName`, `city`, `social`, `email`, `message`, `consent` and `_subject`.

- Validates on the client, never clears typed text on error.
- Loading, success and failure states. Failure shows email and WhatsApp fallbacks, prefilled with what the person typed.
- Hidden honeypot field (`_gotcha`). If a bot fills it, nothing is sent.
- If `formEndpoint` is still a placeholder: `npm run dev` shows a clear banner, and submitting shows the failure state with the fallbacks. It never fails silently. The banner is never in the production build.

## Deploy

All three hosts serve `dist/` as static files. First set `siteUrl` in `src/config.js`.

**Vercel:** import the repo. Framework preset "Astro" is detected. Build command `npm run build`, output directory `dist`.

**Netlify:** import the repo. Build command `npm run build`, publish directory `dist`.

**Cloudflare Pages:** create a project from the repo. Framework preset "Astro", build command `npm run build`, build output directory `dist`.

Or deploy by hand: run `npm run build` and upload the `dist` folder.

## What's generated

- `/og.png`: Open Graph image, rendered at build time from config (`src/pages/og.png.js`).
- `/sitemap-index.xml` and `/robots.txt`.
- JSON-LD `ProfessionalService`, using only fields that are real in config.
- `/privacy` and `/terms`: plain-English drafts, marked "Draft, review before launch". Have them reviewed before launch.

## Performance and accessibility

Self-hosted fonts (Bricolage Grotesque, Figtree, DM Mono for prices) with `font-display: swap` and metric-matched fallbacks. No images to load (the illustrations are inline SVG/CSS), CSS is inlined, no autoplay video. The hero paint animation runs once and is skipped for `prefers-reduced-motion`.

## Before you launch

1. Replace every `TODO` in `src/config.js`.
2. Run a trademark and web search on the three sample names.
3. Have the Privacy and Terms drafts reviewed.
4. Confirm that every promise on the page is one you can keep (turnaround, uptime checks, 24-hour edits, how dates get marked as booked).
5. Submit the form once on the live site to confirm it reaches your inbox.
