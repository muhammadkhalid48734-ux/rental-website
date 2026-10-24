import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { config } from "./src/config.js";

// Until config.siteUrl is a real URL, the build uses a stand-in so it still works.
const real = /^https?:\/\//.test(config.siteUrl);
if (!real) {
  console.warn("[config] siteUrl is still a TODO. Using https://example.com for canonical/OG/sitemap URLs.");
}

export default defineConfig({
  site: real ? config.siteUrl.replace(/\/$/, "") : "https://example.com",
  trailingSlash: "ignore",
  build: { format: "directory", inlineStylesheets: "always" },
  integrations: [sitemap({ filter: (page) => config.indexSampleSites || !page.includes("/samples/") })],
  devToolbar: { enabled: false }
});
