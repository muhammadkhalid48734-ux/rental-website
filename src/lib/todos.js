// Finds every config value that still contains "TODO" (e.g. "siteUrl", "supportHours.start").
export function todoKeys(value, prefix = "") {
  if (typeof value === "string") return value.includes("TODO") ? [prefix] : [];
  if (Array.isArray(value)) return value.flatMap((v, i) => todoKeys(v, `${prefix}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => todoKeys(v, prefix ? `${prefix}.${k}` : k));
  }
  return [];
}
