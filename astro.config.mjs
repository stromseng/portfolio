import { defineConfig } from "astro/config";
import vercelServerless from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercelServerless({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [react(), svelte(), mdx()],
  vite: { plugins: [tailwindcss()] },
});
