// Everything price- and feature-related on the page is derived here, from config.
import { config } from "../config.js";

const { currency } = config;

export const money = (n) => `${currency}${n.toLocaleString("en-US")}`;

/** "TODO..." placeholders are never treated as real values. */
export const isTodo = (v) => typeof v !== "string" || v.trim() === "" || v.trim().startsWith("TODO");

/** Upper-case the first letter, for config strings that start mid-sentence. */
export const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export const minutesText = (m) => (m % 60 === 0 ? `${m / 60} ${m === 60 ? "hour" : "hours"}` : `${m} minutes`);

export const founding = () => config.foundingOffer === true;
export const foundingPeriod = () => (config.foundingMonths === 12 ? "the first year" : `the first ${config.foundingMonths} months`);

export const cheapest = () => config.packages.reduce((a, b) => (b.monthly < a.monthly ? b : a));
export const cheapestFounding = () => config.packages.reduce((a, b) => (b.foundingMonthly < a.foundingMonthly ? b : a));

/** Hero sub line. With the founding offer on, the condition ("for the first year") sits right next to the price. */
export function fromLine() {
  return founding()
    ? `Free website build. Monthly plans from ${money(cheapestFounding().foundingMonthly)} for ${foundingPeriod()}, then from ${money(cheapest().monthly)}.`
    : `Free website build. Monthly plans from ${money(cheapest().monthly)}.`;
}

/** What a plan card / table cell shows for price. */
export function planPrice(pkg) {
  const regular = money(pkg.monthly);
  if (!founding()) return { main: regular, sub: "", regular, founding: null };
  return {
    main: money(pkg.foundingMonthly),
    sub: `for ${foundingPeriod()}, then ${regular}/month`,
    regular,
    founding: money(pkg.foundingMonthly)
  };
}

export const editsText = (pkg) => `${minutesText(pkg.editMinutes)} of edits per month`;

/** Features first included in plan `i` (shown under "Everything in <previous plan>, plus:"). */
export const newFeatures = (i) => config.features.filter((f) => f.plan === i);

export const hasAfterSignup = () => config.features.some((f) => f.status === "after-signup");

/**
 * Rows for the compare table: every feature, then edits.
 * value: "ready" | "after-signup" (included) or false (not included) or a text.
 */
export function compareRows() {
  const rows = config.features.map((f) => ({
    label: f.text,
    sms: f.sms === true,
    values: config.packages.map((_, i) => (i >= f.plan ? f.status : false))
  }));
  rows.push({
    label: "Edits included per month",
    values: config.packages.map((p) => minutesText(p.editMinutes))
  });
  return rows;
}
