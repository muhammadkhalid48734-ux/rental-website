// Three FICTIONAL sample businesses. Names, items, prices and answers are made up for illustration.
// They are not real businesses. No characters, logos or photos are used; illustrations are original SVG.

export const samples = [
  {
    slug: "brightwick-bounce",
    name: "Brightwick Bounce",
    blurb: "Bounce houses for birthdays and backyard parties.",
    heroLine: "Bounce houses for your next backyard party",
    heroSub: "Pick a date, pick a bounce house, send your request. We confirm by email.",
    hero: "castle",
    theme: { primary: "#2447d6", dark: "#12236b", accent: "#ffc83d", soft: "#eef2ff" },
    items: [
      { name: "Classic Castle", kind: "castle", price: 149, note: "Fits up to 8 kids at a time" },
      { name: "Slide Combo", kind: "combo", price: 199, note: "Bounce area with a slide" },
      { name: "Obstacle Run", kind: "obstacle", price: 229, note: "Tunnels and climbs, great for older kids" },
      { name: "Bubble Dome", kind: "dome", price: 129, note: "Small yard friendly" }
    ],
    faq: [
      ["Do you deliver?", "Yes. This is a sample, so the delivery area is made up. A real site would list the towns you serve."],
      ["What if it rains?", "A real site would show your weather policy here, in your words."],
      ["How much space do I need?", "Each item shows its size. A real site lists the flat space needed for every rental."],
      ["How do I pay?", "A real site would explain your deposit and payment steps here."]
    ]
  },
  {
    slug: "hopscotch-hollow-rentals",
    name: "Hopscotch Hollow Rentals",
    blurb: "Toddler-friendly bounce houses and water slides.",
    heroLine: "Soft, safe bounce for little ones. Big splash for the rest",
    heroSub: "See what is open this weekend and ask for your date in under a minute.",
    hero: "dome",
    theme: { primary: "#0b7a6e", dark: "#07463f", accent: "#ffc83d", soft: "#e8f6f3" },
    items: [
      { name: "Toddler Bounce", kind: "dome", price: 119, note: "Low walls, softer jumping" },
      { name: "Splash Slide", kind: "slide", price: 249, note: "Water slide for hot days" },
      { name: "Party Combo", kind: "combo", price: 189, note: "Bounce and slide together" }
    ],
    faq: [
      ["Is this for toddlers too?", "Sample answer. A real site would say which items suit which ages."],
      ["Can I rent for a whole weekend?", "A real site would show your multi-day pricing here."],
      ["Do you need a power outlet?", "A real site would explain what you need on site, in plain words."],
      ["How do I change my date?", "A real site would tell customers how to reach you. This sample has no contact details."]
    ]
  },
  {
    slug: "pennant-party-co",
    name: "Pennant Party Co.",
    blurb: "Obstacle courses and big-party inflatables.",
    heroLine: "Big inflatables for school fairs, teams and block parties",
    heroSub: "Check open dates, choose your inflatable and send a request. We reply by email.",
    hero: "obstacle",
    theme: { primary: "#c23b22", dark: "#6b1c0e", accent: "#ffc83d", soft: "#fdf0ec" },
    items: [
      { name: "Obstacle Run", kind: "obstacle", price: 259, note: "Two lanes, race your friends" },
      { name: "Grand Castle", kind: "castle", price: 219, note: "Roomy bounce area" },
      { name: "Mega Combo", kind: "combo", price: 289, note: "Castle with a long slide" }
    ],
    faq: [
      ["Do you do school and club events?", "Sample answer. A real site would say what kinds of events you serve."],
      ["Can I book more than one item?", "A real site would explain how to request several items for one date."],
      ["Who sets it up?", "A real site would describe your delivery and setup, in your words."],
      ["What if I need to cancel?", "A real site would show your cancellation rules here."]
    ]
  }
];

export const sampleBySlug = (slug) => samples.find((s) => s.slug === slug);
