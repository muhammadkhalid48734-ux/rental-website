// Generates the Open Graph image (1200x630) at build time from config. No stored image to keep in sync.
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { config } from "../config.js";
import { isTodo } from "../lib/pricing.js";

const font = (pkg, file) => fs.readFileSync(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

const h = (type, style, children) => ({ type, props: { style: { display: "flex", ...style }, children } });

export async function GET() {
  const head = font("bricolage-grotesque", "bricolage-grotesque-latin-800-normal.woff");
  const body = font("figtree", "figtree-latin-700-normal.woff");
  const name = isTodo(config.studioName) ? "" : config.studioName;

  const tree = h("div", { width: 1200, height: 630, background: "#ffffff", position: "relative", fontFamily: "Figtree" }, [
    // right-hand colour block: the "paint pour"
    h("div", { position: "absolute", right: 0, top: 0, width: 400, height: 630, background: "#2447d6" }, ""),
    h("div", { position: "absolute", right: 130, top: 0, width: 90, height: 470, background: "#ffc83d", borderRadius: "0 0 45px 45px" }, ""),
    h("div", { position: "absolute", right: 300, top: 0, width: 60, height: 330, background: "#ffc83d", borderRadius: "0 0 30px 30px" }, ""),
    h("div", { position: "absolute", right: 56, top: 380, width: 260, height: 190, background: "#ffffff", borderRadius: 28, border: "6px solid #0f1a33", flexWrap: "wrap", padding: 22, gap: 12, alignContent: "flex-start" },
      Array.from({ length: 12 }, (_, i) => h("div", { width: 44, height: 36, borderRadius: 8, background: i === 9 ? "#ffc83d" : i % 5 === 1 ? "#dfe4ef" : "#f2f5fb" }, ""))),
    // copy
    h("div", { position: "absolute", left: 64, top: 64, width: 700, flexDirection: "column" }, [
      h("div", { fontFamily: "Figtree", fontWeight: 700, fontSize: 28, color: "#12236b", marginBottom: 28 }, "Booking websites for bounce house and party rental businesses"),
      h("div", { fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: 76, lineHeight: 1.02, letterSpacing: -2, color: "#0f1a33" }, "A booking website, so you stop answering “Is Saturday open?”"),
    ]),
    h("div", { position: "absolute", left: 64, bottom: 56, width: 700, flexDirection: "column" }, [
      h("div", { fontFamily: "Figtree", fontWeight: 700, fontSize: 30, color: "#0f1a33" }, "Free private demo. You only pay if you want it live."),
      name ? h("div", { fontFamily: "Figtree", fontWeight: 700, fontSize: 26, color: "#55617a", marginTop: 10 }, name) : h("div", {}, ""),
    ]),
  ]);

  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Bricolage Grotesque", data: head, weight: 800, style: "normal" },
      { name: "Figtree", data: body, weight: 700, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  return new Response(png, { headers: { "Content-Type": "image/png" } });
}
