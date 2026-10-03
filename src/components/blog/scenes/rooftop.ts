// The blog's band under the header: someone reading on a rooftop between two
// stretches of skyline. Positions are in the scene's viewBox units. The reader
// sits in the middle third, which is all a phone shows (see BlogLayout.astro).
// By day it's a sunny afternoon in the homepage's pastels: a parasol, a mug,
// potted plants and a pigeon. At night the floor lamp, the windows and the
// stars come on, with the northern lights over the telescope.
// Usage: <Fragment set:html={sceneSvg(rooftop, "w-full")} />
import airplane from "@images/doodles/airplane.svg?raw";
import antenna from "@images/doodles/antenna.svg?raw";
import apartments from "@images/doodles/apartment-buildings.svg?raw";
import bird from "@images/doodles/bird.svg?raw";
import building2 from "@images/doodles/building2.svg?raw";
import butterfly from "@images/doodles/butterfly.svg?raw";
import cat from "@images/doodles/cat.svg?raw";
import townhouse from "@images/doodles/european-townhouse.svg?raw";
import balloon from "@images/doodles/hot-air-baloon.svg?raw";
import mug from "@images/doodles/mug.svg?raw";
import pigeon from "@images/doodles/pigeon.svg?raw";
import pottedPlant from "@images/doodles/potted-plant.svg?raw";
import reader from "@images/doodles/reclined-reading.svg?raw";
import satellite from "@images/doodles/satelite.svg?raw";
import telescope from "@images/doodles/telescope.svg?raw";
import floorLamp from "@images/doodles/tolomeo-floor-lamp.svg?raw";
import umbrella from "@images/doodles/umbrella.svg?raw";
import aurora from "@images/scenes/city/aurora.svg?raw";
import { glow } from "@/components/home/scenes/glow";
import { place, pointIn } from "@/lib/scene/place";
import type { Placement, Scene } from "@/lib/scene/scene";

// The roof's edge, which is also where the page starts.
const GROUND = 190;
// Widest stroke in scene units: the rooftop up close, the skyline further off.
const LINE = { near: 4.6, far: 3.4, sky: 2.4 } as const;

// Day fills, written as the pack colours themeColors() maps to the homepage's
// tokens (grass, bramble, doodle-peach).
const PASTEL = {
  roof: "#B9FBC0",
  pink: "#FFADAD",
  peach: "#FFE3C7",
} as const;

// Day-only props. Beyond `show`, they leave the page at night: hidden groups
// still shift Chrome's anti-aliasing of the roof line.
const dayOnly = { show: "day", className: "dark:hidden" } as const;

// A hand-drawn line along the roof, in the pack's black so it takes the line colour.
const roofEdge = `<svg viewBox="0 0 1440 200"><path d="M3 ${GROUND + 1}C180 ${GROUND - 1} 420 ${GROUND + 2} 720 ${GROUND}C1000 ${GROUND - 2} 1260 ${GROUND + 2} 1437 ${GROUND}" stroke="#000000" stroke-width="${LINE.near}" stroke-linecap="round"/></svg>`;

// The green roof under the line by day, down to the band's bottom edge.
// roofBase below continues it.
const roofFill = `<svg viewBox="0 0 1440 200"><path d="M0 ${GROUND}H1440V200H0Z" fill="${PASTEL.roof}"/></svg>`;

// The homepage's four-pointed star, in the pack's yellow so it takes the star colour.
const starSvg = `<svg viewBox="0 0 24 24"><path d="M12 3c.5 5 1 7.5 8 9-6.5 1-7.4 3-8 9-.6-6-1.5-8-8-9 6.5-1 7.5-3.5 8-9" fill="#FACC15" fill-opacity="0.35" stroke="#FACC15" stroke-width="2" stroke-linejoin="round"/></svg>`;

// Night-only stars. Unlike the homepage's, they're simply there, with no
// pop-in animation.
const stars = [
  { x: 60, y: 22, size: 0.6 },
  { x: 178, y: 54, size: 0.45 },
  { x: 262, y: 14, size: 0.7 },
  { x: 392, y: 40, size: 0.5 },
  { x: 510, y: 12, size: 0.55 },
  { x: 596, y: 50, size: 0.4 },
  { x: 788, y: 18, size: 0.65 },
  { x: 868, y: 58, size: 0.45 },
  { x: 1340, y: 66, size: 0.5 },
  { x: 1402, y: 20, size: 0.6 },
].map(
  ({ x, y, size }): Placement => ({
    svg: starSvg,
    x,
    y,
    scale: size,
    show: "night",
  }),
);

// A flat day colour under some of a placed icon's paths (1-based): the paths
// themselves, filled and unstroked, drawn just before the icon's ink.
function fillUnder(
  icon: Placement,
  paths: readonly number[],
  color: string,
): Placement {
  const shapes = Array.from(
    icon.svg.matchAll(/<path\b[^>]*?\sd="([^"]*)"/g),
    ([, d]) => d,
  );
  const body = paths
    .map((n) => {
      const d = shapes[n - 1];
      if (d === undefined) throw new Error(`fillUnder: no path ${n}`);
      return `<path d="${d}" fill="${color}"/>`;
    })
    .join("");
  const { x, y, scale, rotate, flip } = icon;
  return {
    svg: `<svg viewBox="0 0 400 400">${body}</svg>`,
    x,
    y,
    scale,
    rotate,
    flip,
    ...dayOnly,
  };
}

// Lit windows: the townhouse's window crosses and building2's window ticks
// (the same paths the homepage's city lights).
const townhouseLights = [23, 24, 25, 26, 28, 29];
const building2Lights = [7, 8, 9, 10, 11, 12, 13];

// A skyline building standing on the roof line, drawn a little finer.
const far = (
  svg: string,
  left: number,
  scale: number,
  extra: Pick<Placement, "flip" | "className" | "lights"> = {},
) => place(svg, { left, bottom: GROUND, scale, line: LINE.far, ...extra });

const skyline = [
  far(apartments, 14, 0.36, { flip: true, className: "lit" }),
  far(townhouse, 134, 0.34, { lights: townhouseLights }),
  far(building2, 222, 0.33, { lights: building2Lights }),
  far(townhouse, 276, 0.28, { lights: townhouseLights }),
  far(apartments, 1086, 0.3, { className: "lit" }),
  far(building2, 1176, 0.36, { lights: building2Lights }),
  far(townhouse, 1232, 0.33, { lights: townhouseLights }),
  far(apartments, 1310, 0.4, { flip: true, className: "lit" }),
];

const lamp = place(floorLamp, {
  left: 586,
  bottom: GROUND,
  scale: 0.46,
  line: LINE.near,
  className: "lit",
  show: "night",
});
const balloonInSky = place(balloon, {
  left: 1150,
  top: 8,
  scale: 0.14,
  line: LINE.sky,
  show: "day",
});
// By day a parasol stands where the lamp does, leaning over the reader; its
// pole's foot lands on the roof near x = 604.
const parasol = place(umbrella, {
  centre: { x: 624, y: 146 },
  scale: 0.5,
  rotate: 24,
  line: LINE.near,
  ...dayOnly,
});
// By day two potted plants stand where the telescope does.
const plants = [
  place(pottedPlant, {
    left: 914,
    bottom: GROUND,
    scale: 0.2,
    line: LINE.near,
    ...dayOnly,
  }),
  place(pottedPlant, {
    left: 956,
    bottom: GROUND,
    scale: 0.15,
    line: LINE.near,
    flip: true,
    ...dayOnly,
  }),
];

export const rooftop = {
  id: "rooftop",
  width: 1440,
  height: 200,
  items: [
    // Sky and roof colour, furthest back. The day sky itself is the blog
    // header's background (BlogLayout.astro), so it runs up behind the header.
    { svg: roofFill, ...dayOnly },
    { svg: aurora, x: 930 - 610 * 0.55, y: -6, scale: 0.55, show: "night" },
    ...stars,
    place(satellite, {
      left: 690,
      top: 16,
      scale: 0.1,
      line: LINE.sky,
      show: "night",
    }),
    place(airplane, {
      left: 96,
      top: 18,
      scale: 0.16,
      line: LINE.sky,
      show: "day",
    }),
    place(bird, {
      left: 800,
      top: 30,
      scale: 0.06,
      line: LINE.sky,
      show: "day",
    }),
    place(bird, {
      left: 826,
      top: 44,
      scale: 0.045,
      line: LINE.sky,
      flip: true,
      show: "day",
    }),
    balloonInSky,
    // A few windows get a halo at night.
    ...[
      { x: 62, y: 128 },
      { x: 170, y: 118 },
      { x: 1166, y: 146 },
      { x: 1392, y: 122 },
    ].map((at) => glow(at, 18, { soft: true })),
    ...skyline,
    // A pigeon on the first townhouse's roof.
    place(pigeon, {
      left: 178,
      bottom: 98,
      scale: 0.1,
      line: LINE.sky,
      ...dayOnly,
    }),
    // The day's rooftop things, behind the rest.
    place(mug, {
      left: 778,
      bottom: GROUND,
      scale: 0.13,
      line: LINE.near,
      ...dayOnly,
    }),
    ...plants.map((pot) => fillUnder(pot, [1], PASTEL.peach)),
    ...plants,
    place(butterfly, {
      left: 944,
      top: 96,
      scale: 0.065,
      line: LINE.sky,
      ...dayOnly,
      rotate: -12,
    }),
    // The rooftop: a dish, the reader under the lamp (by day a parasol), a
    // cat and the telescope. The lamp's pool is flattened so it settles on
    // the roof around the reader.
    glow(pointIn(lamp, [274, 150]), [130, 80]),
    place(antenna, {
      left: 452,
      bottom: GROUND,
      scale: 0.28,
      line: LINE.near,
    }),
    lamp,
    fillUnder(parasol, [1], PASTEL.pink),
    parasol,
    place(reader, {
      left: 640,
      bottom: GROUND,
      scale: 0.42,
      line: LINE.near,
    }),
    place(cat, {
      left: 826,
      bottom: GROUND,
      scale: 0.19,
      line: LINE.near,
    }),
    place(telescope, {
      left: 906,
      bottom: GROUND,
      scale: 0.3,
      line: LINE.near,
      show: "night",
    }),
    { svg: roofEdge },
  ],
} satisfies Scene;

// The green roof's continuation just under the band, by day, with a wavy
// lower edge like the homepage's bands.
export const roofBase = {
  id: "rooftop-base",
  width: 1440,
  height: 22,
  items: [
    {
      svg: `<svg viewBox="0 0 1440 22"><path d="M0 0H1440V12C1250 20 1080 8 900 14C700 21 520 9 340 15C200 20 90 12 0 16Z" fill="${PASTEL.roof}"/></svg>`,
    },
  ],
} satisfies Scene;
