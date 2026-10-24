// JSON-LD of type ProfessionalService. Only fields that really exist in config are included.
import { config } from "../config.js";
import { isTodo } from "./pricing.js";

export function professionalService(siteUrl) {
  const o = { "@context": "https://schema.org", "@type": "ProfessionalService" };
  if (!isTodo(config.studioName)) o.name = config.studioName;
  if (!isTodo(config.siteUrl)) o.url = siteUrl;
  if (!isTodo(config.email)) o.email = config.email;
  if (!isTodo(config.whatsapp)) o.telephone = `+${String(config.whatsapp).replace(/\D/g, "")}`;
  o.description =
    "A small remote web design studio that builds booking websites for bounce house and party rental businesses in the US.";
  if (config.countryCode) o.address = { "@type": "PostalAddress", addressCountry: config.countryCode };
  if (config.areaServed) o.areaServed = config.areaServed;
  return o;
}
