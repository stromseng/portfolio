// A night-only pool of lamp light centred on a point, shared by the scenes.
// It flickers on when night falls (`lamp-on` in home.css); `soft` ones stay
// dimmer. An [x, y] radius flattens it into an ellipse, which keeps light near
// a band's edge from being cut off.
import glowSvg from "@images/scenes/glow.svg?raw";
import type { Point } from "@/lib/scene/place";
import type { Placement } from "@/lib/scene/scene";

export const glow = (
  { x, y }: Point,
  radius: number | readonly [number, number],
  { soft = false } = {},
): Placement => ({
  svg: glowSvg,
  x,
  y,
  scale: radius,
  show: "night",
  className: soft ? "glow soft-glow" : "glow",
});
