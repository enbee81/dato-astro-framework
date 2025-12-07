// @ts-check
import { defineConfig, envField } from "astro/config";
import { generateVarUtils } from "./src/utils/build-scripts/generate-variables-utilities.ts";
import { replaceSvgBlackIntegration } from "./src/utils/build-scripts/svg-black-to-currentcolor.js";

import icon from "astro-icon";

import netlify from "@astrojs/netlify";

const isLivePreview = !!process.env.LIVE_PREVIEW;

// https://astro.build/config
export default defineConfig({
  output: isLivePreview ? "server" : "static",
  adapter: isLivePreview ? netlify() : undefined,
  scopedStyleStrategy: "where",

  env: {
    schema: {
      DATOCMS_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      LIVE_PREVIEW: envField.boolean({
        context: "client",
        access: "public",
        default: isLivePreview,
      }),
      ENDPOINT_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://graphql.datocms.com",
      }),
    },
  },

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
