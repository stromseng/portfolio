// Positions pack icons by their drawn edges instead of their 400x400 box, so
// layout reads as "stands on y = 428 from x = 120" and survives icon swaps.
// Usage: place(church, { left: 740, bottom: GROUND, scale: 0.75, line: 7.5 })
import { pathBounds } from "./bounds";
import type { Placement } from "./scene";

// A point in scene units.
export interface Point {
  x: number;
  y: number;
}

// Where the drawing goes, stroke excluded. `left` with `bottom` or `top` are
// edges of the unrotated drawing, and `rotate` turns it around the icon's
// (0, 0). `centre` puts the drawing's centre on a point and rotates around it.
export type Anchor =
  | { left: number; bottom: number; top?: never; centre?: never }
  | { left: number; top: number; bottom?: never; centre?: never }
  | { centre: Point; left?: never; bottom?: never; top?: never };

export type Spot = Anchor &
  Omit<Placement, "svg" | "x" | "y" | "scale"> & { scale: number };

export function place(svg: string, spot: Spot): Placement {
  const { left, bottom, top, centre, ...rest } = spot;
  const { scale, rotate = 0, flip = false } = rest;
  const box = pathBounds(svg);
  if (centre) {
    // The drawing's centre in the icon's own frame, flipped and scaled.
    const u = (box.x + box.width / 2) * scale * (flip ? -1 : 1);
    const v = (box.y + box.height / 2) * scale;
    const r = (rotate * Math.PI) / 180;
    return {
      svg,
      x: centre.x - (u * Math.cos(r) - v * Math.sin(r)),
      y: centre.y - (u * Math.sin(r) + v * Math.cos(r)),
      ...rest,
    };
  }
  return {
    svg,
    x: flip ? left + (box.x + box.width) * scale : left - box.x * scale,
    y:
      top === undefined
        ? bottom - (box.y + box.height) * scale
        : top - box.y * scale,
    ...rest,
  };
}

// Where a point of a placement's own drawing lands in the scene, e.g. to
// centre a glow on a window: glow(pointIn(house, [138, 196]), 18).
export function pointIn(
  { x = 0, y = 0, scale = 1, rotate = 0, flip = false }: Placement,
  [u, v]: readonly [number, number],
): Point {
  const [sx, sy] = typeof scale === "number" ? [scale, scale] : scale;
  const [du, dv] = [(flip ? -sx : sx) * u, sy * v];
  const r = (rotate * Math.PI) / 180;
  return {
    x: x + du * Math.cos(r) - dv * Math.sin(r),
    y: y + du * Math.sin(r) + dv * Math.cos(r),
  };
}
