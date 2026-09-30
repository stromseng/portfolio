// Turns one of the site's hard-coded doodle SVGs into a theme-aware inline SVG.
// Every known palette colour is swapped for a theme colour (the `--color-*`
// tokens in globals.css), so the same drawing recolours itself between day and
// night without a second asset.
// Usage: <Fragment set:html={themeSvg(seaRaw, { id: "sea", className: "w-full" })} />

const inkColors = new Set(["black", "#000000", "#1E1E1E"]);

const colorTokens = {
  white: "var(--color-paper-fill)",
  "#D1ECFF": "var(--color-sea)",
  "#B9FBC0": "var(--color-grass)",
  "#FFADAD": "var(--color-bramble)",
  "#A0C4FF": "var(--color-sky-accent)",
  "#FACC15": "var(--color-star)",
  "#FFDAD6": "var(--color-doodle-rose)",
  "#FFE3C7": "var(--color-doodle-peach)",
} as const satisfies Record<string, string>;

const isToken = (color: string): color is keyof typeof colorTokens =>
  color in colorTokens;

// Strips export noise and swaps palette colours for tokens. Black ink becomes
// the section's line colour.
export function themeColors(raw: string) {
  return raw
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sstyle="mix-blend-mode:[^"]*"/g, "")
    .replace(
      /\s(fill|stroke)="([^"]+)"/g,
      (match, attr: string, color: string) =>
        inkColors.has(color)
          ? ` ${attr}="var(--color-line)"`
          : isToken(color)
            ? ` ${attr}="${colorTokens[color]}"`
            : match,
    );
}

// Suffixes every id (and its url() references) so repeated drawings stay valid HTML.
export function scopeIds(svg: string, suffix: string) {
  const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map(([, name]) => name);
  let scoped = svg;
  for (const name of ids) {
    scoped = scoped
      .replaceAll(`id="${name}"`, `id="${name}-${suffix}"`)
      .replaceAll(`url(#${name})`, `url(#${name}-${suffix})`);
  }
  return scoped;
}

interface ThemeSvgOptions {
  // Suffix for internal mask/clip ids, so repeated drawings stay valid HTML.
  id: string;
  className?: string;
}

export function themeSvg(raw: string, { id, className }: ThemeSvgOptions) {
  const svg = themeColors(raw)
    // Drop fixed pixel sizes on the root so CSS controls the width.
    .replace(
      /<svg([^>]*)>/,
      (_, attrs: string) =>
        `<svg${attrs.replace(/\s(width|height)="[^"]*"/g, "")}${className ? ` class="${className}"` : ""} aria-hidden="true" focusable="false">`,
    );
  return scopeIds(svg, id);
}
