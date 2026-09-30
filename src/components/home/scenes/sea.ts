// The sea band around About: the shoreline under the hero, and the sea's
// lower edge with the sky below it. Positions are in each scene's viewBox units.
import boat from "@images/doodles/boat.svg?raw";
import bat from "@images/doodles/bat.svg?raw";
import balloon from "@images/doodles/hot-air-baloon.svg?raw";
import lighthouse from "@images/doodles/lighthouse.svg?raw";
import bottomWave from "@images/scenes/sea/bottom-wave.svg?raw";
import cloud from "@images/scenes/sea/cloud.svg?raw";
import gullSvg from "@images/scenes/sea/gull.svg?raw";
import lampReflection from "@images/scenes/sea/lamp-reflection.svg?raw";
import lantern from "@images/scenes/sea/lantern.svg?raw";
import topWave from "@images/scenes/sea/top-wave.svg?raw";
import { place, pointIn, type Point } from "@/lib/scene/place";
import type { Placement, Scene } from "@/lib/scene/scene";
import { glow } from "./glow";

// A seagull like the hero's day birds: the same 24-unit drawing and 1.8
// stroke whatever its size, as soft, and gone at night.
const gull = (at: Point & { scale: number }): Placement => ({
  svg: gullSvg,
  ...at,
  line: 1.8,
  className: "opacity-70 dark:opacity-0",
});

// The boat heels over, and its stern light with it.
const BOAT_TILT = 16.8;
const sailboat = place(boat, {
  centre: { x: 823.1, y: 145.6 },
  scale: 0.585,
  rotate: BOAT_TILT,
  className: "boat",
});
// lantern.svg is drawn upright with its (0, 0) on the transom's top corner,
// which lands here on the tilted boat.
const sternLight = {
  svg: lantern,
  x: 739.2,
  y: 204.3,
  rotate: BOAT_TILT,
};

// Shoreline under the hero: the sailboat with its lantern, heading for the lighthouse.
export const seaTop = {
  id: "sea-top",
  width: 1440,
  height: 292,
  items: [
    { svg: topWave },
    // Centred on the stern light's lamp.
    glow(pointIn(sternLight, [-10.9863, -16.3212]), 36),
    // Centred on the lighthouse's lamp room.
    glow({ x: 1383.3, y: 168.2 }, 80),
    place(lighthouse, {
      left: 1320.7,
      bottom: 267.4,
      scale: 0.375,
      flip: true,
      className: "lighthouse",
      // The beams and the lamp room. Its horizon line (17) is hidden in scenes.css.
      lights: [18, 19, 20],
    }),
    sailboat,
    { svg: lampReflection, show: "night" },
    sternLight,
    // Seagulls over the water, clear of the boat and the lighthouse.
    ...[
      { x: 300, y: 38, scale: 1.1 },
      { x: 352, y: 62, scale: 0.8 },
      { x: 548, y: 54, scale: 1 },
      { x: 972, y: 92, scale: 1.2 },
      { x: 1026, y: 122, scale: 0.85 },
      { x: 1192, y: 58, scale: 1 },
      { x: 1150, y: 168, scale: 0.75 },
    ].map(gull),
  ],
} satisfies Scene;

// The sea's lower edge and the sky below it.
export const seaBottom = {
  id: "sea-bottom",
  width: 1440,
  height: 519,
  items: [
    { svg: bottomWave },
    place(balloon, { left: 216.1, top: 246.2, scale: 0.21, show: "day" }),
    // The balloon's night stand-in, sized and stroked like the meadow's bats.
    place(bat, {
      left: 206.5,
      top: 267.2,
      scale: 0.08,
      line: 2.2016,
      show: "night",
    }),
    ...[
      { x: 58, y: 114 },
      { x: 232, y: 396 },
      { x: 526, y: 197 },
      { x: 866, y: 302 },
      { x: 1197, y: 194 },
    ].map((at) => ({ svg: cloud, ...at })),
  ],
} satisfies Scene;
