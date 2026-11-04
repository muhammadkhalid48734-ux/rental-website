// =============================================================================
// ALL business details live in this one file.
//
// Anything that starts with "TODO" is a placeholder. The site builds and runs
// with placeholders, shows them as plain text, and leaves them out of
// JSON-LD, the OG image and mailto/whatsapp links until you fill them in.
// Prices, plan features, statuses, the minimum term and the monthly prices on the page are all
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

  // ---- Offer: free website build, monthly plans ---------------------------
  currency: "$",
  // Minimum number of monthly payments. Used in "3-month minimum, then cancel anytime" everywhere.
  minimumMonths: 3,
  // Working days between sign-up and everything being set up. Shown wherever a feature is
  // marked "after-signup". You have not given a number yet, so it stays a placeholder.
  setupDays: "5", // working days from sign-up until everything in the plan is set up
  // How long a pending request can hold a date if the owner turns the hold on (FAQ + sample).
  pendingHoldHours: 24,
  paymentMethod: "TODO: PAYMENT_METHOD", // how you take payment, e.g. invoice paid by card or bank transfer
  // Set true once text reminders really work. While false, every place that
  // mentions text reminders shows a "Coming soon" tag and the FAQ says so.
  smsAvailable: false,

  packages: [
    {
      id: "found",
      name: "Get Found",
      tagline: "A modern site on your domain that answers every inquiry and asks for reviews.",
      monthly: 59,
      recommended: false,
      editMinutes: 15 // included per month
    },
    {
      id: "booked",
      name: "Get Booked",
      tagline: "Shows open dates, protects against double bookings and follows up for you.",
      monthly: 99,
      recommended: true,
      editMinutes: 30
    },
    {
      id: "paid",
      name: "Get Paid",
      tagline: "Takes deposits through your own account, signs waivers and rebooks customers.",
      monthly: 179,
      recommended: false,
      editMinutes: 120
    }
  ],

  // Every plan feature, once. `plan` = index in `packages` of the first plan that includes it
  // (Get Booked includes everything in Get Found, Get Paid everything in Get Booked).
  // The plan cards and the compare table are both built from this list.
  //
  // status: "ready"        = part of the plan from the start
  //         "after-signup" = set up after the customer signs up. The page says so and never shows
  //                          these as already running. Default for anything involving automation,
  //                          calendar, deposits, reviews.
  features: [
    { text: "Modern mobile site on your domain", plan: 0, status: "ready" },
    { text: "Hosting", plan: 0, status: "ready" },
    { text: "Inquiry form with an instant alert to you", plan: 0, status: "after-signup" },
    { text: "Auto-reply to every inquiry", plan: 0, status: "after-signup" },
    { text: "Review request after each event. Every customer gets your Google link", plan: 0, status: "after-signup" },

    { text: "Availability calendar for each item", plan: 1, status: "after-signup" },
    { text: "Double-booking protection", plan: 1, status: "after-signup" },
    { text: "Deposit tracking, with reminders for unpaid deposits", plan: 1, status: "after-signup" },
    { text: "Follow-up for unbooked inquiries (after 1, 3 and 7 days)", plan: 1, status: "after-signup" },
    { text: "Booking confirmation and a reminder before the event", plan: 1, status: "after-signup" },
    { text: "Short monthly report", plan: 1, status: "after-signup" },

    { text: "Online deposits through your own Square or Stripe account", plan: 2, status: "after-signup" },
    { text: "Rental waiver e-sign", plan: 2, status: "after-signup" },
    { text: "Text reminders (customer opt-in required; provider costs may apply)", plan: 2, status: "after-signup", sms: true },
    { text: "Rebooking reminder a year later", plan: 2, status: "after-signup" },
    { text: "Google Business Profile setup", plan: 2, status: "after-signup" }
  ],

  // One-time add-ons. Empty on purpose: the website build is free and you pay only the monthly
  // plan. If you add items here, an "Add-ons" list appears under the plans again
  // (each: { name, price, per?, extra?, sms? }) and the "pay only the monthly plan" line is no longer true.
  addons: [],

  // ---- Promises and policies ---------------------------------------------
  policies: {
    stopPaying:
      "Your domain, photos and text always belong to you. If you leave, we send you your site files, and the calendar, reminders and edits stop.",
    outreachDisclosure:
      "We found your public page and sent one message. Reply STOP or tell us to stop and we won't write again.",
    // How the owner confirms a booking, or tells us a deposit has arrived (this is what blocks a date).
    markBooked:
      "When an inquiry arrives, reply to the alert email with the word Confirm and the date is blocked. Do the same when a deposit arrives.",
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
