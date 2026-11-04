// The site must never state or imply where the studio or its owner is based.
// This scans every built HTML file (visible text, attributes, inline scripts and JSON-LD) and reports
// any location wording. It runs at the end of every `astro build` and fails the build on a hit.
// Run by hand against an existing build:  npm run check:location
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const FORBIDDEN = [
  [/Pakistan/i, "Pakistan"],
  [/\bPK\b/, "PK"],
  [/\bUSA\b/, "USA"],
  [/based in/i, "based in"],
  [/located in/i, "located in"],
  [/headquartered/i, "headquartered"],
  [/US-based/i, "US-based"],
  [/USA-based/i, "USA-based"],
  [/Asia\/Karachi/i, "Asia/Karachi"],
  [/UTC\s*\+\s*5/i, "UTC+5"],
  [/postalAddress/i, "postalAddress"],
  [/addressCountry/, "addressCountry (JSON-LD)"],
  [/"address"\s*:/, '"address" (JSON-LD)']
];

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? htmlFiles(p) : e.name.endsWith(".html") ? [p] : [];
  });
}

export function scanDir(dir) {
  const hits = [];
  for (const file of htmlFiles(dir)) {
    const html = fs.readFileSync(file, "utf8");
    for (const [re, label] of FORBIDDEN) {
      const m = re.exec(html);
      if (m) {
        const i = m.index;
        hits.push({ file: path.relative(dir, file), label, context: html.slice(Math.max(0, i - 40), i + 60).replace(/\s+/g, " ") });
      }
    }
  }
  return hits;
}

export function failOnHits(dir) {
  const hits = scanDir(dir);
  if (hits.length === 0) return;
  const lines = hits.map((h) => `  - "${h.label}" in ${h.file}: …${h.context}…`);
  throw new Error(`Location wording found in the built site. No page may say or imply where the studio or its owner is based.\n${lines.join("\n")}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const dir = path.resolve(process.argv[2] || "dist");
  try {
    failOnHits(dir);
    console.log(`Location check passed: no location wording in ${dir}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
