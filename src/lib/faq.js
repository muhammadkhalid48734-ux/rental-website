// FAQ content. Every number, price, policy and contact detail comes from config, so the page can't contradict itself.
import { config } from "../config.js";
import { money, minutesText } from "./pricing.js";
import { termsOwn, noDemo } from "./terms.js";
import { emailHref, waHref, waOk } from "./contact.js";

const email = () => (emailHref() ? `<a href="${emailHref()}">${config.email}</a>` : config.email);
const whatsappLink = () => `<a href="${waHref()}" target="_blank" rel="noopener">WhatsApp</a>`;
/** Ways to reach us: email, Instagram/Facebook messages, and WhatsApp only once it is set. */
const reachUs = () =>
  `email at ${email()} or on Instagram or Facebook${waOk() ? `, or on ${whatsappLink()}` : ""}`;

export function buildFaq() {
  const [found, booked, paid] = config.packages;
  const p = config.policies;
  const n = config.minimumMonths;
  const hold = config.pendingHoldHours;
  const setup = `set up within ${config.setupDays} working days after you sign up`;

  const smsAnswer = config.smsAvailable
    ? `Yes, when it is set up the right way. Customers tick a box to agree to texts when they book, every text lets them reply STOP to opt out, and we only text about their booking. Text reminders come with ${paid.name}, and provider costs may apply. This is not legal advice, so check the rules for your state.`
    : `Text reminders are coming soon. They come with ${paid.name}, and when they launch they will only go to customers who agree to get texts when they book. Until then, reminders go by email.`;

  return [
    {
      q: "Why not Wix, Square or just Facebook?",
      a: "Those are good tools, and if you like building and running your own site, one of them may cost less. We build yours for you from your page and set up the inquiry form, reminders and follow-ups, so you do not spend your weekends learning a builder. A Facebook page on its own is not made to show open dates or follow up with customers."
    },
    {
      q: "Why a monthly fee?",
      a: `The website build is free, so the monthly plan is how we are paid. It covers hosting, keeping your inquiry form, reminders, calendar and follow-ups working, and the edits included in your plan.`
    },
    {
      q: `What does the ${n}-month minimum mean?`,
      a: `You pay the monthly plan for at least ${n} months. After that you can cancel anytime. If you leave before the ${n} months are up, the months left in the minimum are still due.`
    },
    {
      q: "Is it really free?",
      a: `The demo is free and private, and so is the website build. You pay only the monthly plan if you want your site live, with a ${n}-month minimum. ${noDemo()}`
    },
    {
      q: "Do I own the site and domain?",
      a: `${termsOwn()} The calendar, reminders and edits are part of the monthly plan, so they stop when you leave.`
    },
    {
      q: "What if I want to leave?",
      a: `After the ${n}-month minimum you can cancel anytime. Email us at ${email()} and tell us. ${p.stopPaying}`
    },
    {
      q: "I already have a website and domain. What happens to them?",
      a: "Nothing changes until you decide. We build your demo privately, and we only connect it to your domain if you say yes. If you do, we tell you exactly what to change at your domain company."
    },
    {
      q: "Will it work with how I take bookings now?",
      a: "Whether you take bookings by text, DMs, phone calls or a notebook, inquiries from the site reach you as an instant alert, and you can keep confirming bookings the way you do now. If you use another booking tool, tell us in the form and we will say honestly whether it fits."
    },
    {
      q: "How does double-booking protection work?",
      a: `A date is blocked when you confirm a booking or when the deposit arrives. Pending requests show as pending and do not block the date, unless you set a ${hold}-hour hold, which blocks it for ${hold} hours. It comes with ${booked.name} and ${paid.name}, and it is ${setup}.`
    },
    {
      q: "How do I mark a date as booked?",
      a: p.markBooked
    },
    {
      q: "How does deposit tracking work?",
      a: `On ${booked.name}, we track which bookings have a deposit and which do not, and customers with an unpaid deposit get reminders. You collect the deposit the way you do now and mark it paid, the same way you confirm a booking. On ${paid.name}, customers pay the deposit online through your own Square or Stripe account, and it is marked paid when the payment arrives.`
    },
    {
      q: "Who processes payments?",
      a: `Your own Square or Stripe account, never us. Your customers' deposits go straight into your account, and we never receive or hold your customers' money. Online deposits come with ${paid.name}.`
    },
    {
      q: "How do reviews work?",
      a: "After each event we ask every customer for a review and give everyone the Google link. We never filter or block low ratings, and we never pay for reviews. Review requests come with every plan."
    },
    {
      q: "Can I change prices and photos myself?",
      a: `You send us the change and we make it. ${found.name} includes ${minutesText(found.editMinutes)} of edits per month, ${booked.name} includes ${minutesText(booked.editMinutes)}, and ${paid.name} includes ${minutesText(paid.editMinutes)}.`
    },
    {
      q: "What if something breaks, and who answers?",
      a: `Message us by ${reachUs()}. A person on our small team answers during support hours (shown above), and we reply ${config.replyTime}.`
    },
    {
      q: "How fast will I have the demo?",
      a: `Your demo is ready ${config.demoTurnaround}, after you send your page. We message you when it is ready, or sooner if we have a question.`
    },
    {
      q: "When is everything set up?",
      a: `After you sign up, we set up the features in your plan within ${config.setupDays} working days. Until then, the demo only shows how they will look. Nothing on this page is running for you today.`
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
      q: "What about my slow winter months?",
      a: `Plans are monthly. After the ${n}-month minimum you can cancel anytime, but then the calendar, reminders and edits stop, and we send you your site files. ${found.name} is the lowest-cost plan, at ${money(found.monthly)} a month.`
    },
    {
      q: "How do we work together?",
      a: "Everything is done online, by email and by message on Instagram or Facebook, so you never need to meet or call."
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
