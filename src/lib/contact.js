import { config } from "../config.js";
import { isTodo } from "./pricing.js";

export const emailOk = () => !isTodo(config.email);
export const waOk = () => /^\d{7,15}$/.test(String(config.whatsapp || "").replace(/\D/g, "")) && !isTodo(config.whatsapp);
export const emailHref = (subject) =>
  emailOk() ? `mailto:${config.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}` : null;
/** Instagram / Facebook links from config.social, in that order. Empty or placeholder values are left out. */
const SOCIAL = [
  ["instagram", "Instagram"],
  ["facebook", "Facebook"]
];
export const socialLinks = () =>
  SOCIAL.map(([key, label]) => ({ key, label, href: String(config.social?.[key] ?? "").trim() })).filter(
    (l) => /^https:\/\//.test(l.href) && !isTodo(l.href)
  );
export const waHref = (text) =>
  waOk() ? `https://wa.me/${String(config.whatsapp).replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;
