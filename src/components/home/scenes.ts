// The illustrated bands of the homepage, composed from individual
// doodles in src/data/images/doodles (verbatim pack files) and custom shapes in
// src/data/images/scenes. Positions are in each scene's viewBox units.
// Day and night share one scene; `show` keeps an icon to one theme, and the
// `lit` class turns an icon's faint secondary strokes into lamp light at night.
import { pathBounds } from "@/lib/scene/bounds";
import type { Placement, Scene } from "@/lib/scene/scene";
import airplane from "@images/doodles/airplane.svg?raw";
import antenna from "@images/doodles/antenna.svg?raw";
import apartments from "@images/doodles/apartment-buildings.svg?raw";
import bat from "@images/doodles/bat.svg?raw";
import bird from "@images/doodles/bird.svg?raw";
import boat from "@images/doodles/boat.svg?raw";
import building2 from "@images/doodles/building2.svg?raw";
import cab from "@images/doodles/cab.svg?raw";
import car from "@images/doodles/car-side.svg?raw";
import casualWalk from "@images/doodles/casualwalk.svg?raw";
import cat from "@images/doodles/cat.svg?raw";
import chopper from "@images/doodles/chopper.svg?raw";
import church from "@images/doodles/church.svg?raw";
import couple from "@images/doodles/couple-sitting-on-bench.svg?raw";
import cyclist from "@images/doodles/cyclist.svg?raw";
import dalmatian from "@images/doodles/dalmatian.svg?raw";
import dadWithStroller from "@images/doodles/dad-with-stroller.svg?raw";
import directionSign from "@images/doodles/direction-sign.svg?raw";
import dog from "@images/doodles/dog-terrier.svg?raw";
import bus from "@images/doodles/doubledecker.svg?raw";
import townhouse from "@images/doodles/european-townhouse.svg?raw";
import flame from "@images/doodles/flame.svg?raw";
import fox from "@images/doodles/fox.svg?raw";
import guitarist from "@images/doodles/guitarist.svg?raw";
import handsUp from "@images/doodles/handsup.svg?raw";
import hedgehog from "@images/doodles/hedgehog.svg?raw";
import balloon from "@images/doodles/hot-air-baloon.svg?raw";
import lighthouse from "@images/doodles/lighthouse.svg?raw";
import mushroomCloud from "@images/doodles/mushroom-cloud.svg?raw";
import owl from "@images/doodles/owl.svg?raw";
import reclinedReading from "@images/doodles/reclined-reading.svg?raw";
import relaxedSitting3 from "@images/doodles/relaxed-sitting-3.svg?raw";
import sadSitting from "@images/doodles/sad-sitting.svg?raw";
import satellite from "@images/doodles/satelite.svg?raw";
import sleeping from "@images/doodles/sleeping.svg?raw";
import soccer from "@images/doodles/soccer.svg?raw";
import academicCap from "@images/doodles/square-academic-cap.svg?raw";
import squirrel from "@images/doodles/squirrel.svg?raw";
import streetLamp from "@images/doodles/tolomeo-floor-lamp.svg?raw";
import telescope from "@images/doodles/telescope.svg?raw";
import tent from "@images/doodles/tent.svg?raw";
import treePose from "@images/doodles/tree-pose.svg?raw";
import tree from "@images/doodles/tree.svg?raw";
import tree2 from "@images/doodles/tree-2.svg?raw";
import tree5 from "@images/doodles/tree-5.svg?raw";
import tree6 from "@images/doodles/tree-6.svg?raw";
import walkingWoman from "@images/doodles/walking-woman.svg?raw";
import weightlifting from "@images/doodles/weightlifting.svg?raw";
import wolf from "@images/doodles/wolf.svg?raw";
import cleaningMan from "@images/cleaning-man.svg?raw";
import aurora from "@images/scenes/city/aurora.svg?raw";
import zzz from "@images/scenes/footer/zzz.svg?raw";
import glowSvg from "@images/scenes/glow.svg?raw";
import ring from "@images/scenes/marker/ring.svg?raw";
import bench from "@images/scenes/meadow/bench.svg?raw";
import ground from "@images/scenes/meadow/ground.svg?raw";
import school from "@images/scenes/meadow/school.svg?raw";
import swingKid from "@images/scenes/meadow/swing-kid.svg?raw";
import swing from "@images/scenes/meadow/swing.svg?raw";
import bottomWave from "@images/scenes/sea/bottom-wave.svg?raw";
import cloud from "@images/scenes/sea/cloud.svg?raw";
import gullSvg from "@images/scenes/sea/gull.svg?raw";
import lantern from "@images/scenes/sea/lantern.svg?raw";
import topWave from "@images/scenes/sea/top-wave.svg?raw";

// A night-only pool of lamp light centred on (x, y). An [x, y] radius flattens
// it into an ellipse, which keeps light near a band's edge from being cut off.
const glow = (
  x: number,
  y: number,
  radius: number | readonly [number, number],
  className = "glow",
): Placement => ({
  svg: glowSvg,
  x,
  y,
  scale: radius,
  show: "night",
  className,
});

// Centres of the school windows that are lit at night (see school.svg).
const litWindows = [
  [878, 94.5],
  [927, 97],
  [1022.5, 97],
  [1059.5, 94],
  [1143, 93.5],
  [877.5, 137.5],
  [925.5, 138],
  [985.5, 137],
  [1092, 135.5],
  [1168, 135],
] as const;

// A seagull like the hero's day birds: a 24-unit stroke, kept at the same
// line weight whatever its size, and gone at night (see `.gull`).
const gull = (x: number, y: number, scale: number): Placement => ({
  svg: gullSvg,
  x,
  y,
  scale,
  strokeScale: 1 / scale,
  className: "gull",
});

// Shoreline under the hero: the sailboat with its lantern, heading for the lighthouse.
export const seaTop = {
  id: "sea-top",
  width: 1440,
  height: 292,
  items: [
    { svg: topWave },
    // Centred on the stern light (lantern.svg), which sits on the boat's transom.
    glow(733.4, 185.5, 36),
    // Centred on the lighthouse's lamp room.
    glow(1383.3, 168.2, 80),
    {
      svg: lighthouse,
      x: 1446,
      y: 133,
      scale: 0.375,
      flip: true,
      className: "lighthouse",
    },
    {
      svg: boat,
      x: 744.7,
      y: 0,
      scale: 0.585,
      rotate: 16.8,
      className: "boat solid",
    },
    { svg: lantern },
    // Seagulls over the water, clear of the boat and the lighthouse.
    gull(300, 38, 1.1),
    gull(352, 62, 0.8),
    gull(548, 54, 1),
    gull(972, 92, 1.2),
    gull(1026, 122, 0.85),
    gull(1192, 58, 1),
    gull(1150, 168, 0.75),
  ],
} satisfies Scene;

// The sea's lower edge and the sky below it.
export const seaBottom = {
  id: "sea-bottom",
  width: 1440,
  height: 519,
  items: [
    { svg: bottomWave },
    { svg: balloon, x: 193, y: 233, scale: 0.21, show: "day" },
    // Stroked to match the balloon's line weight.
    {
      svg: bat,
      // Same size and line weight as the meadow's bats, centred where it was.
      x: 202,
      y: 257,
      scale: 0.08,
      strokeScale: 1.72,
      show: "night",
    },
    ...[
      [58, 114],
      [232, 396],
      [526, 197],
      [866, 302],
      [1197, 194],
    ].map(([x, y]) => ({ svg: cloud, x, y })),
  ],
} satisfies Scene;

// Main stroke width of pack icons, in their 400-unit drawing.
const PACK_STROKE = 16;

// ---------- City ----------

// The city band's bottom edge, where the Projects band starts. Drawn bottoms
// rest a unit above it, so their round caps run into the edge.
const GROUND = 428;
// Stroke widths in scene units: buildings, street furniture, people and cars.
const LINE = { building: 7.5, street: 5.5, small: 2.8 } as const;

type Spot = Omit<Placement, "svg" | "x" | "y" | "strokeScale" | "scale"> & {
  // Left edge of the drawing, stroke excluded.
  left: number;
  // Bottom of the drawing; defaults to the ground. Ignored when `top` is set.
  bottom?: number;
  top?: number;
  scale: number;
  // Main stroke width in scene units.
  line: number;
};

// Places a pack icon by its drawn edges instead of its 400x400 box, so layout
// reads as "stands on the ground from x = 120" and survives icon swaps.
function place(
  svg: string,
  { left, bottom = GROUND, top, scale, line, ...rest }: Spot,
) {
  const box = pathBounds(svg);
  return {
    svg,
    x: rest.flip ? left + (box.x + box.width) * scale : left - box.x * scale,
    y:
      top === undefined
        ? bottom - (box.y + box.height) * scale
        : top - box.y * scale,
    scale,
    strokeScale: line / (PACK_STROKE * scale),
    ...rest,
  } satisfies Placement;
}

// Where a point of a placed icon's own 400-unit drawing lands in the scene,
// e.g. to centre a glow on a window: glow(...pointIn(house, [138, 196]), 18).
function pointIn(
  { x, y, scale, flip }: ReturnType<typeof place>,
  [u, v]: readonly [number, number],
) {
  return [x + (flip ? -scale : scale) * u, y + scale * v] as const;
}

// Places a pack icon so the centre of its drawing lands on a point, rotated
// around that centre. place() rotates around the icon's (0, 0) corner, which
// swings a rotated drawing away from where it was aimed.
function centredAt(
  svg: string,
  [cx, cy]: readonly [number, number],
  { scale, line, rotate = 0, ...rest }: Omit<Spot, "left" | "bottom" | "top">,
) {
  const box = pathBounds(svg);
  const [u, v] = [
    (box.x + box.width / 2) * scale,
    (box.y + box.height / 2) * scale,
  ];
  const r = (rotate * Math.PI) / 180;
  return {
    svg,
    x: cx - (u * Math.cos(r) - v * Math.sin(r)),
    y: cy - (u * Math.sin(r) + v * Math.cos(r)),
    scale,
    rotate,
    strokeScale: line / (PACK_STROKE * scale),
    ...rest,
  } satisfies Placement;
}

const cathedral = place(church, {
  left: 740,
  scale: 0.75,
  line: LINE.building,
});
const streetLight = place(streetLamp, {
  left: 892,
  scale: 0.35,
  line: LINE.street,
  className: "lit",
});
const townhouses = [
  [966, 0.46],
  [1069, 0.5],
  [1180, 0.44],
].map(([left = 0, scale = 0]) =>
  place(townhouse, {
    left,
    scale,
    line: LINE.building,
    // The window crosses; not the door lines (19, 20) or the step (27).
    lights: [23, 24, 25, 26, 28, 29],
  }),
);
// Traffic heads left: the icons face right and are flipped.
const taxi = place(cab, {
  left: 911,
  scale: 0.16,
  line: LINE.small,
  flip: true,
});
const sedan = place(car, {
  left: 1284,
  scale: 0.17,
  line: LINE.small,
  flip: true,
});
const doubledecker = place(bus, {
  left: 1341,
  scale: 0.19,
  line: LINE.small,
  flip: true,
});

// The skyline above the projects: Oslo's cathedral and a row of townhouses,
// with people, traffic and rooftop life. At night the blast lights up the
// left, windows and headlights come on, a cat takes the roof and the northern
// lights and a satellite replace the balloon, birds and plane.
export const city = {
  id: "city",
  width: 1435,
  height: 429,
  items: [
    { svg: aurora, show: "night" },
    // The blast's light: a tall pool around the cloud, and a flat one along
    // the street that lights the buildings on either side. Both stay inside
    // the band, so neither is cut off at an edge.
    glow(331, 214, [300, 213]),
    glow(331, 338, [270, 90]),
    {
      svg: mushroomCloud,
      x: 0.6,
      y: -100.5,
      scale: 1.597,
      strokeScale: 0.78,
      className: "blast solid",
    },
    // A soft halo around some of the lit windows.
    ...[
      [99, 321],
      [145, 342],
      [526, 330],
      [604, 336],
      [652, 314],
    ].map(([x = 0, y = 0]) => glow(x, y, 20, "soft-glow")),
    {
      svg: apartments,
      x: 196.5,
      y: 277,
      scale: 0.45,
      flip: true,
      className: "lit",
    },
    {
      svg: building2,
      x: 415,
      y: 269,
      scale: 0.4526,
      // The window ticks; not the rooftop water tower (4, 6).
      lights: [7, 8, 9, 10, 11, 12, 13],
    },
    { svg: apartments, x: 551.5, y: 269, scale: 0.465, className: "lit" },
    // Light from the cathedral's open door and rose window.
    glow(...pointIn(cathedral, [262, 285]), [14, 16]),
    glow(...pointIn(cathedral, [265, 171]), 20, "soft-glow"),
    cathedral,
    // Flattened so the pool of light fades out above the ground.
    glow(...pointIn(streetLight, [273, 148]), [70, 58]),
    streetLight,
    // The townhouses' arched top-floor windows, whose crosses light up.
    ...townhouses.flatMap((house) =>
      [138, 197, 256].map((u) =>
        glow(...pointIn(house, [u, 196]), 18, "soft-glow"),
      ),
    ),
    ...townhouses,
    // Street
    place(dadWithStroller, { left: 546, scale: 0.09, line: LINE.small }),
    place(walkingWoman, { left: 717, scale: 0.105, line: LINE.small }),
    taxi,
    sedan,
    doubledecker,
    place(casualWalk, { left: 1403, scale: 0.1, line: LINE.small }),
    place(dog, { left: 1416, scale: 0.05, line: LINE.small }),
    // Headlights, at each vehicle's front bumper.
    glow(...pointIn(taxi, [345, 240]), [16, 6]),
    glow(...pointIn(sedan, [350, 215]), [16, 6]),
    glow(...pointIn(doubledecker, [345, 260]), [16, 6]),
    // Rooftops
    place(antenna, { left: 682, bottom: 339, scale: 0.1, line: LINE.small }),
    place(bird, { left: 1100, bottom: 225, scale: 0.06, line: LINE.small }),
    place(cat, {
      left: 479,
      bottom: 337,
      scale: 0.07,
      line: LINE.small,
      show: "night",
    }),
    // Sky
    place(balloon, {
      left: 820,
      top: 50,
      scale: 0.18,
      line: LINE.small,
      show: "day",
    }),
    place(bird, {
      left: 640,
      top: 110,
      scale: 0.07,
      line: LINE.small,
      show: "day",
    }),
    place(bird, {
      left: 668,
      top: 128,
      scale: 0.055,
      line: LINE.small,
      flip: true,
      show: "day",
    }),
    { svg: chopper, x: 1002.2, y: 132.9, scale: 0.2154 },
    { svg: airplane, x: 1306.5, y: -28.1, scale: 0.3011, show: "day" },
    { svg: satellite, x: 1310, y: 6, scale: 0.2, show: "night" },
  ],
} satisfies Scene;

// ---------- Meadow ----------

// Stroke widths in scene units: figures and objects, small animals.
const MEADOW_LINE = { figure: 2.5, small: 2.2 } as const;

// swing.svg (tree, ropes and seat) and swing-kid.svg share one placement,
// scaled around the trunk base, which stays on the ground at x = 100.
const swingSpot = { x: -52.1, y: -97.5, scale: 1.45 } as const;
// The couple by day and the empty bench by night share one placement.
const benchSpot = { x: 757.9, y: 115.3, scale: 0.19, strokeScale: 0.88 };
// Top of the bench's seat, where the fox stands at night.
const benchSeat = benchSpot.y + 243 * benchSpot.scale;

// Foreground figures stand on the lawn below the ground line (which runs
// from y 228 at the left edge to 163 under the tree on the right), so they
// read as closer and never cross the drawings on the horizon.
const graduate = place(handsUp, {
  left: 1382,
  bottom: 222,
  scale: 0.125,
  line: MEADOW_LINE.figure,
  show: "day",
});

// The hill above the timeline, in front of NTNU. By day: a kid on the swing,
// a couple on the bench, yoga, a weightlifter, a student reading with a
// dalmatian, a kid with a football, a graduate throwing their cap and a
// cyclist. By night they go home: the swing hangs empty, a fox has the bench,
// and a campfire with a guitarist, an owl, a hedgehog, bats, a stargazer on a
// blanket, a telescope and a howling wolf take over. The trees, tent, signpost and school stay.
export const meadow = {
  id: "meadow",
  width: 1440,
  height: 233,
  items: [
    { svg: ground },
    // Wide and low, so the firelight spreads along the ground and fades out
    // before the bottom of the scene.
    glow(230, 194, [100, 36]),
    { svg: swing, ...swingSpot, strokeScale: 0.7 },
    { svg: swingKid, ...swingSpot, strokeScale: 1.1, show: "day" },
    {
      svg: tree5,
      x: 308.2,
      y: 83.2,
      scale: 0.343,
      strokeScale: 0.69,
      className: "solid",
    },
    {
      svg: tree6,
      x: 625.6,
      y: 61,
      scale: 0.345,
      strokeScale: 0.69,
      className: "solid",
    },
    {
      svg: owl,
      x: 659,
      y: 44.8,
      scale: 0.107,
      strokeScale: 1.4,
      show: "night",
    },
    {
      svg: tree2,
      x: 467.9,
      y: 82.4,
      scale: 0.31,
      strokeScale: 0.77,
      className: "solid",
    },
    { svg: tree, x: 1251.9, y: 66.5, scale: 0.3, strokeScale: 0.8 },
    { svg: couple, ...benchSpot, show: "day" },
    { svg: bench, ...benchSpot, show: "night" },
    place(fox, {
      left: 781,
      bottom: benchSeat,
      scale: 0.1,
      line: MEADOW_LINE.small,
      show: "night",
    }),
    {
      svg: squirrel,
      x: 206,
      y: 185.8,
      scale: 0.085,
      strokeScale: 1.6,
      flip: true,
      show: "day",
    },
    {
      svg: hedgehog,
      x: 443.9,
      y: 168.3,
      scale: 0.08,
      strokeScale: 1.7,
      show: "night",
    },
    { svg: treePose, x: 429.7, y: 136.1, scale: 0.147, show: "day" },
    {
      svg: directionSign,
      x: 575.3,
      y: 120.7,
      scale: 0.19,
      strokeScale: 0.85,
    },
    {
      svg: sadSitting,
      x: 406.5,
      y: 161.9,
      scale: 0.095,
      strokeScale: 1.6,
      show: "day",
    },
    {
      svg: tent,
      x: 244.1,
      y: 143.6,
      scale: 0.225,
      strokeScale: 0.9,
      rotate: -4.4,
    },
    {
      svg: flame,
      x: 201.9,
      y: 167.9,
      scale: 0.14,
      strokeScale: 1.1,
      show: "night",
      className: "lit fire",
    },
    { svg: guitarist, x: 160.6, y: 155.9, scale: 0.156, show: "night" },
    place(weightlifting, {
      left: 548,
      bottom: 212,
      scale: 0.15,
      line: MEADOW_LINE.figure,
      show: "day",
    }),
    place(reclinedReading, {
      left: 930,
      bottom: 214,
      scale: 0.15,
      line: MEADOW_LINE.figure,
      show: "day",
    }),
    place(dalmatian, {
      left: 988,
      bottom: 214,
      scale: 0.08,
      line: MEADOW_LINE.small,
      flip: true,
      show: "day",
    }),
    place(relaxedSitting3, {
      left: 950,
      bottom: 218,
      scale: 0.18,
      line: MEADOW_LINE.figure,
      show: "night",
    }),
    place(soccer, {
      left: 1222,
      bottom: 219,
      scale: 0.12,
      line: MEADOW_LINE.small,
      show: "day",
    }),
    graduate,
    // Thrown up to celebrate: centred between the raised hands (icon x 200)
    // and about one head-height above the fingertips (icon y 44), tilted as
    // if mid-flight.
    centredAt(academicCap, pointIn(graduate, [200, -80]), {
      scale: 0.08,
      line: MEADOW_LINE.small,
      rotate: -12,
      show: "day",
    }),
    place(bat, {
      left: 552,
      top: 32,
      scale: 0.085,
      line: MEADOW_LINE.small,
      show: "night",
    }),
    place(bat, {
      left: 794,
      top: 70,
      scale: 0.07,
      line: MEADOW_LINE.small,
      flip: true,
      rotate: 10,
      show: "night",
    }),
    { svg: cyclist, x: 1197.3, y: 110.6, scale: 0.155, show: "day" },
    { svg: telescope, x: 1195.6, y: 112.6, scale: 0.155, show: "night" },
    {
      svg: wolf,
      x: 1383.8,
      y: 106.7,
      scale: 0.15,
      strokeScale: 1.05,
      rotate: 17,
      show: "night",
    },
    // A soft pool of light around each lit window.
    ...litWindows.map(([x, y]) => glow(x, y, 34, "soft-glow")),
    { svg: school, className: "school" },
  ],
} satisfies Scene;

// The end of the page: the cleaning man and a cat by day, fast asleep by night.
export const footer = {
  id: "footer",
  width: 600,
  height: 400,
  items: [
    { svg: cleaningMan, x: 100, show: "day" },
    { svg: cat, x: 408, y: 222, scale: 0.45, show: "day" },
    { svg: sleeping, x: 100, y: 60, show: "night" },
    { svg: zzz, x: 380, y: 30, show: "night", className: "zzz" },
  ],
} satisfies Scene;

// Marker icons are scaled so their drawn bounding box fits a circle of this
// diameter (the original dots' icons span 38-41 diagonally) and centred in the
// ring. Strokes get one fixed width, matching the dots' 1.7-2.8.
const MARKER_ICON_DIAMETER = 40;
const MARKER_STROKE = 2.2;
const ringBox = pathBounds(ring);

// A timeline marker: the site's hand-drawn ring around a pack icon.
export function marker(id: string, icon: string) {
  const box = pathBounds(icon);
  const scale = MARKER_ICON_DIAMETER / Math.hypot(box.width, box.height);
  const centre = (start: number, size: number) => start + size / 2;
  return {
    id: `marker-${id}`,
    width: 54,
    height: 53,
    items: [
      { svg: ring },
      {
        svg: icon,
        x: centre(ringBox.x, ringBox.width) - centre(box.x, box.width) * scale,
        y:
          centre(ringBox.y, ringBox.height) - centre(box.y, box.height) * scale,
        scale,
        strokeScale: MARKER_STROKE / (PACK_STROKE * scale),
      },
    ],
  } satisfies Scene;
}
