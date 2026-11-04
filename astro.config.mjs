import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";
import { config } from "./src/config.js";
import { todoKeys } from "./src/lib/todos.js";
import { failOnHits } from "./scripts/location-scan.mjs";

// Until config.siteUrl is a real URL, dev and draft builds use a stand-in so they still work.
const real = /^https?:\/\//.test(config.siteUrl);

// 1) A production build fails while ANY value in src/config.js still contains "TODO".
//    Dev only warns. Draft build for checks:  ALLOW_PLACEHOLDERS=1 npm run build
// 2) Every build (even a draft) scans the built HTML and JSON-LD and fails if it contains any
//    location wording (see scripts/location-scan.mjs).
const buildGuards = () => ({
  name: "build-guards",
  hooks: {
    "astro:config:setup": ({ command, logger }) => {
      const open = todoKeys(config);
      if (open.length === 0) return;
      const msg = `src/config.js still contains "TODO" in: ${open.join(", ")}.`;
      if (command === "build" && process.env.ALLOW_PLACEHOLDERS !== "1") {
        throw new Error(`${msg}\nFill them in. (To build a draft anyway, for checks only: ALLOW_PLACEHOLDERS=1 npm run build)`);
      }
      logger.warn(msg);
    },
    "astro:build:done": ({ dir }) => {
      failOnHits(fileURLToPath(dir));
    }
  }
});

export default defineConfig({
  site: real ? config.siteUrl.replace(/\/$/, "") : "https://example.com",
  trailingSlash: "ignore",
  build: { format: "directory", inlineStylesheets: "always" },
  integrations: [buildGuards(), sitemap({ filter: (page) => config.indexSampleSites || !page.includes("/samples/") })],
  devToolbar: { enabled: false }
});
