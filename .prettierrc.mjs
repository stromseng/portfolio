// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  // Lets the Tailwind plugin sort the site's own theme utilities (bg-page, text-ink) correctly.
  tailwindStylesheet: "./src/styles/globals.css",
};
