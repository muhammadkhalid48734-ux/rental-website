// =============================================================================
// ALL business details live in this one file.
//
// Anything that starts with "TODO" is a placeholder. The site builds and runs
// with placeholders, shows them as plain text, and leaves them out of
// JSON-LD, the OG image and mailto/whatsapp links until you fill them in.
// Prices, plan features, add-ons and first-year costs on the page are all
// rendered from this file, so the page cannot contradict itself.
// =============================================================================

export const config = {
  // ---- Who you are --------------------------------------------------------
  studioName: "TODO: studio name",
  ownerName: "TODO: owner name",
  ownerRole: "TODO: owner role", // for example: Founder
  ownerPhoto: "", // optional. Path under /public, e.g. "/owner.webp". Empty = placeholder box.
  // One honest sentence about you, in your own words. Shown in "Who you're dealing with".
  ownerBio: "TODO: ownerBio",
  country: "Pakistan",
  countryCode: "PK", // ISO code, used only in JSON-LD
  areaServed: "United States",

  // ---- Where the site lives ----------------------------------------------
  // Full URL with https://, no trailing slash. Needed for canonical links,
  // OG tags and the sitemap. Until you set it, the build uses a stand-in.
  siteUrl: "TODO: siteUrl", // e.g. https://your-domain.com

  // ---- How people reach you ----------------------------------------------
  email: "TODO: email",
  whatsapp: "TODO: whatsapp number", // country code + digits only, e.g. 15551234567
  calendarUrl: "", // optional booking link (Cal.com, Calendly...). Empty = not shown.
  // Contact form endpoint (Formspree, Getform, Basin...). Must accept a JSON POST.
  formEndpoint: "TODO: formEndpoint", // e.g. https://formspree.io/f/xxxxxxxx
  formProvider: "TODO: form service name", // shown on the privacy page

  // ---- Hours --------------------------------------------------------------
  // IANA timezone you work in. Pakistan is Asia/Karachi.
  timezone: "Asia/Karachi",
  supportHours: {
    daysLabel: "TODO: support days", // for example: Monday to Saturday
    start: "TODO: start", // 24-hour HH:MM in `timezone`, e.g. "09:00". Needs a real value to convert to US times.
    end: "TODO: end" // e.g. "18:00"
  },
  // How quickly you reply to a normal message during support hours.
  replyTime: "TODO: replyTime", // for example: within 2 hours
  // Used word for word in the hero, "How it works", the FAQ and the form success message.
  demoTurnaround:
    "usually within the hour during our support hours, otherwise by the next morning (US time)",

  // ---- Money --------------------------------------------------------------
  currency: "$",
  domainEstimatePerYear: 12, // shown as "about $12/year" for the Website plan
  paymentMethod: "TODO: PAYMENT_METHOD", // how you take payment, e.g. invoice paid by card or bank transfer
  // Set true once text reminders really work. While false, every place that
  // mentions text reminders shows a "Coming soon" tag and the FAQ says so.
  smsAvailable: false,

  packages: [
    {
      id: "website",
      name: "Website",
      tagline: "A clean site that sends you booking requests.",
      setup: 247,
      monthly: 0,
      recommended: false,
      revisionRounds: 1,
      editsPerMonth: null, // minutes. null = none included
      features: [
        "Modern mobile site with your items and photos",
        "Photo gallery",
        "Booking request form (requests arrive by email)",
        "Your domain connected",
        "1 round of revisions",
        "Hosted on a free static host, in your own account",
        "Later changes billed per task"
      ]
    },
    {
      id: "books",
      name: "Website that books for you",
      tagline: "Shows open dates, blocks booked ones, and follows up for you.",
      setup: 297,
      monthly: 33,
      recommended: true,
      revisionRounds: 2,
      editsPerMonth: 30,
      features: [
        "Everything in Website",
        "Availability calendar that blocks booked dates",
        "Booking confirmation email",
        "Reminder before the event",
        "Review request after the event",
        "Hosting and uptime checks",
        "Reminder and follow-up upkeep",
        "30 minutes of edits per month",
        "2 rounds of revisions"
      ]
    },
    {
      id: "full",
      name: "Book, pay & sign online",
      tagline: "Customers book, pay a deposit and sign the waiver from their phone.",
      setup: 597,
      monthly: 79,
      recommended: false,
      revisionRounds: 3,
      editsPerMonth: 120,
      features: [
        "Everything in Website that books for you",
        "Online deposit payment",
        "Rental waiver customers sign on their phone",
        { text: "Text message reminders (customer must opt in; provider cost may apply)", sms: true },
        "Google Business Profile setup",
        "Short monthly report",
        "2 hours of edits per month, 24-hour turnaround",
        "3 rounds of revisions"
      ]
    }
  ],

  // Comparison table. Each row: one value per plan, in the order of `packages`.
  // true = included, false = not included, or a short text.
  compare: [
    { label: "Mobile site with your items, photos and gallery", values: [true, true, true] },
    { label: "Booking request form (by email)", values: [true, true, true] },
    { label: "Your domain connected", values: [true, true, true] },
    { label: "Availability calendar that blocks booked dates", values: [false, true, true] },
    { label: "Booking confirmation email", values: [false, true, true] },
    { label: "Reminder before the event", values: [false, true, true] },
    { label: "Review request after the event", values: [false, true, true] },
    { label: "Hosting and uptime checks", values: ["Free host, your account", true, true] },
    { label: "Online deposit payment", values: [false, false, true] },
    { label: "Rental waiver signed on the phone", values: [false, false, true] },
    { label: "Text message reminders", values: [false, false, true], sms: true },
    { label: "Google Business Profile setup", values: [false, false, true] },
    { label: "Monthly report", values: [false, false, true] },
    { label: "Edits included per month", values: ["Billed per task", "30 minutes", "2 hours, 24-hour turnaround"] },
    { label: "Rounds of revisions", values: ["1", "2", "3"] }
  ],

  addons: [
    { name: "Online deposit link", price: 90 },
    { name: "Waiver e-sign", price: 70 },
    { name: "SMS reminders setup", price: 70, extra: "plus provider cost", sms: true },
    { name: "Google Business Profile", price: 80 },
    { name: "Extra page", price: 40 },
    { name: "Extra reminder or follow-up", price: 50 },
    { name: "Logo and colour refresh", price: 60 },
    { name: "Extra edits", price: 30, per: "30 min" }
  ],
  addonCreditNote:
    "Want the Book, pay & sign online features later? What you already paid for add-ons counts toward the upgrade.",

  // ---- Promises and policies ---------------------------------------------
  policies: {
    stopPaying:
      "Your domain and photos stay yours. If you stop the monthly plan, we send you your website files or move the site to your own hosting account, and the calendar, reminders and edits stop.",
    outreachDisclosure:
      "We found your public page and sent one message. Reply STOP or tell us to stop and we won't write again.",
    // How a customer's booking turns into a blocked date on the calendar plans.
    markBooked: "TODO: markBooked", // e.g. "Message us the date and we block it."
    invoiceAgreement: "TODO: invoiceAgreement", // what you can send and when: invoice, written agreement
    // Set true ONLY if you really promise one rental business per town.
    exclusivity: false,
    exclusivityText: ""
  },

  // ---- Testimonials -------------------------------------------------------
  // Leave empty until you have real quotes with written permission. Each entry:
  //   { quote: "...", name: "First name L.", business: "Business name, City", permission: true }
  // Entries without permission: true are ignored. Empty = the section does not render.
  testimonials: [],

  // ---- Analytics (off by default) ----------------------------------------
  analytics: {
    enabled: false,
    // Privacy-friendly, cookie-free, e.g. Plausible. Only used when enabled is true.
    domain: "", // the domain you registered with the analytics provider
    scriptSrc: "https://plausible.io/js/script.js"
  },

  // ---- Sample sites ---------------------------------------------------------
  // The three /samples/ pages are made-up businesses. By default they ask search engines not to
  // index them, so nobody finds a fictional business in search results. Set true to allow indexing.
  indexSampleSites: false,

  // ---- Legal pages --------------------------------------------------------
  legalLastUpdated: "TODO: date"
};

export default config;
