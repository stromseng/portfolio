// The hill above the timeline, in front of NTNU. Positions are in the scene's
// viewBox units.
import bat from "@images/doodles/bat.svg?raw";
import couple from "@images/doodles/couple-sitting-on-bench.svg?raw";
import cyclist from "@images/doodles/cyclist.svg?raw";
import dalmatian from "@images/doodles/dalmatian.svg?raw";
import directionSign from "@images/doodles/direction-sign.svg?raw";
import flame from "@images/doodles/flame.svg?raw";
import fox from "@images/doodles/fox.svg?raw";
import guitarist from "@images/doodles/guitarist.svg?raw";
import handsUp from "@images/doodles/handsup.svg?raw";
import hedgehog from "@images/doodles/hedgehog.svg?raw";
import owl from "@images/doodles/owl.svg?raw";
import reclinedReading from "@images/doodles/reclined-reading.svg?raw";
import relaxedSitting3 from "@images/doodles/relaxed-sitting-3.svg?raw";
import sadSitting from "@images/doodles/sad-sitting.svg?raw";
import soccer from "@images/doodles/soccer.svg?raw";
import academicCap from "@images/doodles/square-academic-cap.svg?raw";
import squirrel from "@images/doodles/squirrel.svg?raw";
import telescope from "@images/doodles/telescope.svg?raw";
import tent from "@images/doodles/tent.svg?raw";
import treePose from "@images/doodles/tree-pose.svg?raw";
import tree from "@images/doodles/tree.svg?raw";
import tree2 from "@images/doodles/tree-2.svg?raw";
import tree5 from "@images/doodles/tree-5.svg?raw";
import tree6 from "@images/doodles/tree-6.svg?raw";
import weightlifting from "@images/doodles/weightlifting.svg?raw";
import wolf from "@images/doodles/wolf.svg?raw";
import bench from "@images/scenes/meadow/bench.svg?raw";
import ground from "@images/scenes/meadow/ground.svg?raw";
import school from "@images/scenes/meadow/school.svg?raw";
import swingKid from "@images/scenes/meadow/swing-kid.svg?raw";
import swing from "@images/scenes/meadow/swing.svg?raw";
import { place, pointIn } from "@/lib/scene/place";
import type { Scene } from "@/lib/scene/scene";
import { glow } from "./glow";

// Widest stroke in scene units: figures and objects, small animals.
const LINE = { figure: 2.5, small: 2.2 } as const;

// swing.svg (tree, ropes and seat) and swing-kid.svg share one placement,
// scaled around the trunk base, which stays on the ground at x = 100.
const swingSpot = { x: -52.1, y: -97.5, scale: 1.45 } as const;
// The couple by day; by night bench.svg, the same bench without them.
const coupleOnBench = place(couple, {
  left: 761.3,
  bottom: 172.7,
  scale: 0.19,
  line: 2.6752,
  show: "day",
});
// Top of the bench's seat, where the fox stands at night.
const benchSeat = pointIn(coupleOnBench, [0, 243]).y;

// Foreground figures stand on the lawn below the ground line (which runs
// from y 228 at the left edge to 163 under the tree on the right), so they
// read as closer and never cross the drawings on the horizon.
const graduate = place(handsUp, {
  left: 1382,
  bottom: 222,
  scale: 0.125,
  line: LINE.figure,
  show: "day",
});

// The centres of the school's lit windows: its `.window-light` rects, the
// only ones that start with x and y.
const litWindows = Array.from(
  school.matchAll(
    /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g,
  ),
  ([, x, y, width, height]) => ({
    x: Number(x) + Number(width) / 2,
    y: Number(y) + Number(height) / 2,
  }),
);

// By day: a kid on the swing, a couple on the bench, yoga, a weightlifter, a
// student reading with a dalmatian, a kid with a football, a graduate
// throwing their cap and a cyclist. By night they go home: the swing hangs
// empty, a fox has the bench, and a campfire with a guitarist, an owl, a
// hedgehog, bats, a stargazer on a blanket, a telescope and a howling wolf
// take over. The trees, tent, signpost and school stay.
export const meadow = {
  id: "meadow",
  width: 1440,
  height: 233,
  items: [
    { svg: ground },
    // Wide and low, so the firelight spreads along the ground and fades out
    // before the bottom of the scene.
    glow({ x: 230, y: 194 }, [100, 36]),
    { svg: swing, ...swingSpot, line: 4.091018 },
    { svg: swingKid, ...swingSpot, line: 1.914, show: "day" },
    place(tree5, {
      left: 346,
      bottom: 196.5,
      scale: 0.343,
      line: 3.78672,
    }),
    place(tree6, {
      left: 648.9,
      bottom: 177.3,
      scale: 0.345,
      line: 3.8088,
    }),
    place(owl, {
      left: 668.7,
      bottom: 80.3,
      scale: 0.107,
      line: 2.3968,
      show: "night",
    }),
    place(tree2, {
      left: 483.9,
      bottom: 187.6,
      scale: 0.31,
      line: 3.8192,
    }),
    place(tree, {
      left: 1263.9,
      bottom: 162.3,
      scale: 0.3,
      line: 3.84,
    }),
    coupleOnBench,
    { ...coupleOnBench, svg: bench, show: "night" },
    place(fox, {
      left: 781,
      bottom: benchSeat,
      scale: 0.1,
      line: LINE.small,
      show: "night",
    }),
    place(squirrel, {
      left: 179,
      bottom: 212.1,
      scale: 0.085,
      line: 2.176,
      flip: true,
      show: "day",
    }),
    place(hedgehog, {
      left: 449.1,
      bottom: 191.8,
      scale: 0.08,
      line: 2.176,
      show: "night",
    }),
    place(treePose, {
      left: 449.2,
      bottom: 192.3,
      scale: 0.147,
      show: "day",
    }),
    place(directionSign, {
      left: 595.3,
      bottom: 182.4,
      scale: 0.19,
      line: 2.584,
    }),
    place(sadSitting, {
      left: 416.2,
      bottom: 194,
      scale: 0.095,
      line: 2.432,
      show: "day",
    }),
    place(tent, {
      centre: { x: 292.3, y: 185.1 },
      scale: 0.225,
      line: 3.24,
      rotate: -4.4,
    }),
    place(flame, {
      left: 215.2,
      bottom: 208.4,
      scale: 0.14,
      line: 2.464,
      show: "night",
      className: "lit fire",
    }),
    place(guitarist, {
      left: 177.3,
      bottom: 211.4,
      scale: 0.156,
      show: "night",
    }),
    place(weightlifting, {
      left: 548,
      bottom: 212,
      scale: 0.15,
      line: LINE.figure,
      show: "day",
    }),
    place(reclinedReading, {
      left: 930,
      bottom: 214,
      scale: 0.15,
      line: LINE.figure,
      show: "day",
    }),
    place(dalmatian, {
      left: 988,
      bottom: 214,
      scale: 0.08,
      line: LINE.small,
      flip: true,
      show: "day",
    }),
    place(relaxedSitting3, {
      left: 950,
      bottom: 218,
      scale: 0.18,
      line: LINE.figure,
      show: "night",
    }),
    place(soccer, {
      left: 1222,
      bottom: 219,
      scale: 0.12,
      line: LINE.small,
      show: "day",
    }),
    graduate,
    // Thrown up to celebrate: centred between the raised hands (icon x 200)
    // and about one head-height above the fingertips (icon y 44), tilted as
    // if mid-flight.
    place(academicCap, {
      centre: pointIn(graduate, [200, -80]),
      scale: 0.08,
      line: LINE.small,
      rotate: -12,
      show: "day",
    }),
    place(bat, {
      left: 552,
      top: 32,
      scale: 0.085,
      line: LINE.small,
      show: "night",
    }),
    place(bat, {
      left: 794,
      top: 70,
      scale: 0.07,
      line: LINE.small,
      flip: true,
      rotate: 10,
      show: "night",
    }),
    place(cyclist, {
      left: 1207.2,
      bottom: 162.5,
      scale: 0.155,
      show: "day",
    }),
    place(telescope, {
      left: 1209.2,
      bottom: 162.5,
      scale: 0.155,
      show: "night",
    }),
    place(wolf, {
      centre: { x: 1403.8, y: 144.3 },
      scale: 0.15,
      line: 2.52,
      rotate: 17,
      show: "night",
    }),
    // A soft pool of light around each lit window.
    ...litWindows.map((at) => glow(at, 34, { soft: true })),
    { svg: school },
  ],
} satisfies Scene;
