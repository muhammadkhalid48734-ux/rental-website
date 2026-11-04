import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { config } from "./src/config.js";

// Until config.siteUrl is a real URL, the build uses a stand-in so it still works.
const real = /^https?:\/\//.test(config.siteUrl);
if (!real) {
  console.warn("[config] siteUrl is still a TODO. Using https://example.com for canonical/OG/sitemap URLs.");
}

// These must be confirmed and accurate before anything ships.
// Production build: fails. Dev: warns (and shows a banner on the page).
// Draft build for checks only:  ALLOW_PLACEHOLDERS=1 npm run build
const MUST_BE_REAL = ["locationAnswer", "governingLaw"];
const placeholderGuard = () => ({
  name: "placeholder-guard",
  hooks: {
    "astro:config:setup": ({ command, logger }) => {
      const open = MUST_BE_REAL.filter((k) => String(config[k]).includes("TODO"));
      if (open.length === 0) return;
      const msg = `src/config.js still contains "TODO" in: ${open.join(", ")}. Confirm the wording is accurate and remove the TODO.`;
      if (command === "build" && process.env.ALLOW_PLACEHOLDERS !== "1") {
        throw new Error(`${msg}\n(To build a draft anyway, for checks only: ALLOW_PLACEHOLDERS=1 npm run build)`);
      }
      logger.warn(msg);
    }
  }
});

export default defineConfig({
  site: real ? config.siteUrl.replace(/\/$/, "") : "https://example.com",
  trailingSlash: "ignore",
  build: { format: "directory", inlineStylesheets: "always" },
  integrations: [placeholderGuard(), sitemap({ filter: (page) => config.indexSampleSites || !page.includes("/samples/") })],
  devToolbar: { enabled: false }
});
