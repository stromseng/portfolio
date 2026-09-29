// A Scene is one inline SVG band composed from individual doodles, so each
// icon can be moved, tinted or swapped by editing data instead of a Figma export.
// Placements use the scene's viewBox units. Usage:
//   <Fragment set:html={sceneSvg(meadow)} />
import { scopeIds, themeColors } from "./themeSvg";

export interface Placement {
  // SVG file imported with `?raw`, drawn in its own coordinates (pack icons are 400x400).
  svg: string;
  // Where the icon's (0, 0) lands. With `flip`, the icon extends left of x.
  x?: number;
  y?: number;
  // A 400-unit pack icon at 0.25 ends up 100 units wide. Strokes scale along.
  // An [x, y] pair stretches it, e.g. to flatten a glow into an ellipse.
  scale?: number | readonly [number, number];
  // Degrees around the icon's (0, 0).
  rotate?: number;
  flip?: boolean;
  // Multiplies stroke widths, for icons that were drawn thinner or bolder.
  strokeScale?: number;
  // Ink colour as a CSS custom property name. Defaults to the section's "line".
  ink?: string;
  // Omit to show in both themes.
  show?: "day" | "night";
  // CSS hook for per-icon styling (glows, lit windows, animation).
  className?: string;
}

export interface Scene {
  // Unique per page; scopes ids inside icons (gradients, clips).
  id: string;
  width: number;
  height: number;
  // Painter's order: the first item is furthest back.
  items: readonly Placement[];
}

function innerMarkup({ svg, strokeScale = 1 }: Placement) {
  const body = themeColors(svg, "currentColor")
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
  return strokeScale === 1
    ? body
    : body.replace(
        /stroke-width="([\d.]+)"/g,
        (_, width: string) => `stroke-width="${Number(width) * strokeScale}"`,
      );
}

function transformOf({
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
  flip = false,
}: Placement) {
  const [sx, sy] = typeof scale === "number" ? [scale, scale] : scale;
  return `translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -sx : sx} ${sy})`;
}

function classOf({ show, className }: Placement) {
  return [show && `${show}-only`, className].filter(Boolean).join(" ");
}

export function sceneSvg(scene: Scene, className = "band") {
  const items = scene.items
    .map((item, i) => {
      const style = `color: var(--${item.ink ?? "line"})`;
      const body = scopeIds(innerMarkup(item), `${scene.id}-${i}`);
      return `<g transform="${transformOf(item)}" style="${style}" class="${classOf(item)}">${body}</g>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${scene.width} ${scene.height}" fill="none" class="${className}" aria-hidden="true" focusable="false">${items}</svg>`;
}
