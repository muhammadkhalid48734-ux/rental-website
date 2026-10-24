import { config } from "../config.js";
import { isTodo } from "./pricing.js";

export const emailOk = () => !isTodo(config.email);
export const waOk = () => /^\d{7,15}$/.test(String(config.whatsapp || "").replace(/\D/g, "")) && !isTodo(config.whatsapp);
export const emailHref = (subject) =>
  emailOk() ? `mailto:${config.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}` : null;
export const waHref = (text) =>
  waOk() ? `https://wa.me/${String(config.whatsapp).replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;
