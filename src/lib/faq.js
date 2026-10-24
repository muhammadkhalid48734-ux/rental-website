// FAQ content. Every number, price, policy and contact detail comes from config, so the page can't contradict itself.
import { config } from "../config.js";
import { money, byId } from "./pricing.js";
import { emailHref, waHref } from "./contact.js";
import { parseHHMM, format12, tzLongName } from "./hours.js";

const email = () => (emailHref() ? `<a href="${emailHref()}">${config.email}</a>` : config.email);
const whatsapp = () => (waHref() ? `<a href="${waHref()}" target="_blank" rel="noopener">WhatsApp</a>` : "WhatsApp");

export function hoursSentence() {
  const { daysLabel, start, end } = config.supportHours;
  if (parseHHMM(start) && parseHHMM(end)) {
    return `${daysLabel}, ${format12(start)} to ${format12(end)} ${tzLongName(config.timezone).replace(" Standard Time", "")} time`;
  }
  return "TODO: supportHours";
}

const minutesText = (m) => (m % 60 === 0 ? `${m / 60} ${m === 60 ? "hour" : "hours"}` : `${m} minutes`);

export function buildFaq() {
  const [website, books, full] = config.packages;
  const extraEdits = config.addons.find((a) => a.name === "Extra edits");
  const p = config.policies;

  const smsAnswer = config.smsAvailable
    ? "Yes, when it is set up the right way. Customers tick a box to agree to texts when they book, every text lets them reply STOP to opt out, and we only text about their booking. Provider costs may apply. This is not legal advice, so check the rules for your state."
    : "Text reminders are coming soon. When they launch, they will only go to customers who agree to get texts when they book. Until then, reminders go by email.";

  return [
    {
      q: "Why not Wix, Square or just Facebook?",
      a: "Those are good tools, and if you like building your own site, one of them may cost less. We build yours for you from your page, with your items, prices and booking steps already in place. A Facebook page on its own is not made to show open dates or send reminders."
    },
    {
      q: "Do I own the site and domain?",
      a: `Yes. Your website, domain and photos are always yours. On the ${website.name} plan, the site sits in your own hosting account. On a monthly plan we host it, and if you stop you can have your files or a move to your own account.`
    },
    {
      q: "What happens if I stop paying the monthly fee?",
      a: `${p.stopPaying} The ${website.name} plan has no monthly fee.`
    },
    {
      q: "I already have a website and domain. What happens to them?",
      a: "Nothing changes until you decide. We build your demo privately, and we only connect it to your domain if you say yes. If you do, we tell you exactly what to change at your domain company."
    },
    {
      q: "Will it work with how I take bookings now?",
      a: "Whether you take bookings by text, DMs, phone calls or a notebook, requests from the site arrive in your email, and you can keep confirming them the way you do now. If you use another booking tool, tell us in the form and we will say honestly whether it fits."
    },
    {
      q: "Does it stop double bookings?",
      a: "On the plans with a calendar, a date marked as booked is blocked on your site, so nobody can ask for it. The site can't know about a booking you took by phone or text until that date is marked, so close it when you take one."
    },
    {
      q: "How do I mark a date as booked?",
      a: p.markBooked
    },
    {
      q: "Can I change prices and photos myself?",
      a: `You send us the change and we make it. ${books.name} includes ${minutesText(books.editsPerMonth)} of edits per month, ${full.name} includes ${minutesText(full.editsPerMonth)} with 24-hour turnaround, and on the ${website.name} plan changes are billed per task. Extra edits are ${money(extraEdits.price)} per ${extraEdits.per}.`
    },
    {
      q: "What if something breaks, and who answers?",
      a: `Message us by ${email()} or ${whatsapp()}. A person on our small team answers during support hours (${hoursSentence()}), and we reply ${config.replyTime}. The monthly plans include uptime checks.`
    },
    {
      q: "How fast will I have the demo?",
      a: `Your demo is ready ${config.demoTurnaround}, after you send your page. We message you when it is ready, or sooner if we have a question.`
    },
    {
      q: "What do you do with my photos?",
      a: "We ask first. We use a few photos from your own public page to build your private demo, and only you see it. If you decide not to go live, tell us and we delete them. Nothing is published without your OK."
    },
    {
      q: "Do I need to be good with computers?",
      a: "No. You send us a link to your page and tell us what to change in plain words. We do the rest."
    },
    {
      q: "Is the text reminder legal?",
      a: smsAnswer
    },
    {
      q: "Why do you contact me on Instagram, and how do I stop messages?",
      a: `${p.outreachDisclosure} You can also email ${email()} and we will stop.`
    },
    {
      q: "Is it really free?",
      a: "The demo is free and private. You pay only if you want your site live, and if you don't like the demo, you pay nothing. There is no contract."
    },
    {
      q: "What about my slow winter months?",
      a: `The ${website.name} plan has no monthly fee. The monthly plans have no contract, so you can cancel anytime. If you stop, the calendar, reminders and edits stop, and your domain and photos stay yours.`
    },
    {
      q: "Are you in the US, and how do we talk?",
      a: `No. We are a small remote studio based in Pakistan, and we work online. We talk by ${email()} or ${whatsapp()}${config.calendarUrl ? `, or you can <a href="${config.calendarUrl}" rel="noopener">book a call</a>` : ""}. Our support hours are shown above in US time.`
    },
    {
      q: "Can I get an invoice and a written agreement?",
      a: p.invoiceAgreement
    },
    {
      q: "Is anyone else in my town getting this?",
      a: p.exclusivity && p.exclusivityText
        ? p.exclusivityText
        : "We can't promise that. We contact rental businesses through their public pages, so another business in your town may hear from us too. If that matters to you, say so in your message and we will answer honestly."
    }
  ];
}
