// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
    name: "portfolio",
    title: "Portolio",
    projectId: "xxc5ksdw",
    dataset: "production",
    plugins: [structureTool()],
    schema: {
        types: schemaTypes,
    },
});
