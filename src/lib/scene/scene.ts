// A Scene is one inline SVG band composed from individual doodles: verbatim
// pack icons (src/data/images/doodles) and custom shapes
// (src/data/images/scenes). Each icon can be moved, tinted or swapped by
// editing data instead of a Figma export. Placements use the scene's viewBox
// units; place() (see place.ts) positions pack icons by their drawn edges.
// Day and night share one scene: `show` keeps an icon to one theme, and at
// night the `lit` class turns all of an icon's faint strokes into lamp light,
// `lights` just the chosen paths (both styled in home.css). Usage:
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
  // Width of the icon's widest stroke in scene units; its other strokes keep
  // their proportions. Omit to keep the drawing's own widths, scaled along.
  line?: number;
  // Omit to show in both themes.
  show?: "day" | "night";
  // CSS hook for per-icon styling (glows, lit windows, animation).
  className?: string;
  // 1-based numbers of the icon's <path> elements that turn into lamp light at
  // night (styled by `.light`), e.g. just the window ticks of a building.
  lights?: readonly number[];
}

export interface Scene {
  // Unique per page; scopes ids inside icons (gradients, clips).
  id: string;
  width: number;
  height: number;
  // Painter's order: the first item is furthest back.
  items: readonly Placement[];
}

const STROKE_WIDTH = /stroke-width="([\d.]+)"/g;

function innerMarkup({ svg, scale = 1, line, lights = [] }: Placement) {
  const paths = svg.match(/<path\b/g)?.length ?? 0;
  const missing = lights.find((n) => n > paths);
  if (missing !== undefined) {
    throw new Error(
      `lights: path ${missing} is past the icon's ${paths} paths`,
    );
  }

  let path = 0;
  const body = themeColors(svg)
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    // Pack icons' paths carry no class, so adding one can't clash.
    .replace(/<path\b/g, (tag) =>
      lights.includes(++path) ? `${tag} class="light"` : tag,
    );
  if (line === undefined) return body;

  const widest = Math.max(
    ...Array.from(svg.matchAll(STROKE_WIDTH), ([, width]) => Number(width)),
  );
  // Stroke widths are drawn in the icon's units, so undo its scale.
  const factor =
    line / (widest * (typeof scale === "number" ? scale : scale[0]));
  return body.replace(
    STROKE_WIDTH,
    (_, width: string) => `stroke-width="${Number(width) * factor}"`,
  );
}

// Leaves out identity parts, so a placement at (0, 0) gets no transform.
function transformOf({
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
  flip = false,
}: Placement) {
  const [sx, sy] = typeof scale === "number" ? [scale, scale] : scale;
  return [
    (x || y) && `translate(${x} ${y})`,
    rotate && `rotate(${rotate})`,
    (sx !== 1 || sy !== 1 || flip) && `scale(${flip ? -sx : sx} ${sy})`,
  ]
    .filter(Boolean)
    .join(" ");
}

// Renders `name="value"` pairs, leaving out empty values.
const attrs = (pairs: Record<string, string>) =>
  Object.entries(pairs)
    .filter(([, value]) => value)
    .map(([name, value]) => ` ${name}="${value}"`)
    .join("");

export function sceneSvg(scene: Scene, className = "band") {
  const items = scene.items
    .map((item, i) => {
      const body = scopeIds(innerMarkup(item), `${scene.id}-${i}`);
      const classes = [item.show && `${item.show}-only`, item.className];
      return `<g${attrs({
        transform: transformOf(item),
        class: classes.filter(Boolean).join(" "),
      })}>${body}</g>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${scene.width} ${scene.height}" fill="none"${attrs({ class: className })} aria-hidden="true" focusable="false">${items}</svg>`;
}
