import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: vercel(),
    integrations: [
        sanity({
            projectId: "xxc5ksdw",
            dataset: "production",
            // Set useCdn to false if you're building statically.
            useCdn: false,
        }),
        react(),
    ],
});
