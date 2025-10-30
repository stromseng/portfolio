import { defineConfig } from "astro/config";
import vercelServerless from "@astrojs/vercel";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercelServerless({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    sanity({
      projectId: "xxc5ksdw",
      dataset: "production",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: "/admin",
    }),
    react(),
    svelte(),
  ],
  vite: { plugins: [tailwindcss()] },
});
