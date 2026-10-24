// Everything price-related on the page is derived here, from config.
import { config } from "../config.js";

const { currency } = config;

export const money = (n) => `${currency}${n.toLocaleString("en-US")}`;

/** "TODO..." placeholders are never treated as real values. */
export const isTodo = (v) => typeof v !== "string" || v.trim() === "" || v.trim().startsWith("TODO");

export function firstYear(pkg) {
  const total = pkg.setup + pkg.monthly * 12;
  return { total, monthly: pkg.monthly };
}

/** Human line, always built from numbers in config. */
export function firstYearLine(pkg) {
  if (pkg.monthly === 0) {
    return {
      label: "First-year cost",
      math: money(pkg.setup),
      note: `plus a domain, about ${money(config.domainEstimatePerYear)}/year, if you don't have one`
    };
  }
  const { total } = firstYear(pkg);
  return {
    label: "First-year cost",
    math: `${money(pkg.setup)} + ${money(pkg.monthly)} × 12 = ${money(total)}`,
    note: ""
  };
}

export function priceLine(pkg) {
  return pkg.monthly === 0
    ? { setup: money(pkg.setup), monthly: "one time, no monthly fee" }
    : { setup: money(pkg.setup), monthly: `+ ${money(pkg.monthly)}/month` };
}

export function featureText(f) {
  return typeof f === "string" ? f : f.text;
}
export function featureIsSms(f) {
  return typeof f === "object" && f.sms === true;
}

/** Upper-case the first letter, for config strings that start mid-sentence. */
export const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export const byId = (id) => config.packages.find((p) => p.id === id);
