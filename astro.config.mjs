// @ts-check
import { defineConfig } from "astro/config";
import { generateVarUtils } from "./src/utils/build-scripts/generate-variables-utilities.ts";
import { replaceSvgBlackIntegration } from "./src/utils/build-scripts/svg-black-to-currentcolor.js";

import icon from "astro-icon";

import netlify from "@astrojs/netlify";

const preview = process.env.LIVE_PREVIEW === "true";

// https://astro.build/config
export default defineConfig({
  output: preview ? "server" : "static",
  adapter: preview ? netlify() : undefined,
  scopedStyleStrategy: "where",

  integrations: [
    generateVarUtils(),
    replaceSvgBlackIntegration(),
    icon({
      iconDir: "src/assets/icons/currentColor",
    }),
  ],

  image: {
    // Example: allow processing all images from your aws s3 bucket
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.datocms-assets.com",
      },
    ],
  },
});
