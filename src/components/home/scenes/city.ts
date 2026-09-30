// The skyline above the projects. Positions are in the scene's viewBox units.
import airplane from "@images/doodles/airplane.svg?raw";
import antenna from "@images/doodles/antenna.svg?raw";
import apartments from "@images/doodles/apartment-buildings.svg?raw";
import bird from "@images/doodles/bird.svg?raw";
import building2 from "@images/doodles/building2.svg?raw";
import cab from "@images/doodles/cab.svg?raw";
import car from "@images/doodles/car-side.svg?raw";
import casualWalk from "@images/doodles/casualwalk.svg?raw";
import cat from "@images/doodles/cat.svg?raw";
import chopper from "@images/doodles/chopper.svg?raw";
import church from "@images/doodles/church.svg?raw";
import dadWithStroller from "@images/doodles/dad-with-stroller.svg?raw";
import dog from "@images/doodles/dog-terrier.svg?raw";
import bus from "@images/doodles/doubledecker.svg?raw";
import townhouse from "@images/doodles/european-townhouse.svg?raw";
import balloon from "@images/doodles/hot-air-baloon.svg?raw";
import mushroomCloud from "@images/doodles/mushroom-cloud.svg?raw";
import satellite from "@images/doodles/satelite.svg?raw";
import streetLamp from "@images/doodles/tolomeo-floor-lamp.svg?raw";
import walkingWoman from "@images/doodles/walking-woman.svg?raw";
import aurora from "@images/scenes/city/aurora.svg?raw";
import { place, pointIn } from "@/lib/scene/place";
import type { Scene } from "@/lib/scene/scene";
import { glow } from "./glow";

// The band's bottom edge, where the Projects band starts. Drawn bottoms rest a
// unit above it, so their round caps run into the edge.
const GROUND = 428;
// Widest stroke of each icon in scene units: buildings, street furniture,
// people and cars. Thinner strokes keep their proportion, so the townhouses'
// window frames, drawn at half the width of their walls, come out at 3.75.
const LINE = { building: 7.5, street: 5.5, small: 2.8 } as const;

const cathedral = place(church, {
  left: 740,
  bottom: GROUND,
  scale: 0.75,
  line: LINE.building,
});
const streetLight = place(streetLamp, {
  left: 892,
  bottom: GROUND,
  scale: 0.35,
  line: LINE.street,
  className: "lit",
});
const townhouses = [
  { left: 966, scale: 0.46 },
  { left: 1069, scale: 0.5 },
  { left: 1180, scale: 0.44 },
].map((spot) =>
  place(townhouse, {
    ...spot,
    bottom: GROUND,
    line: LINE.building,
    // The window crosses; not the door lines (19, 20) or the step (27).
    lights: [23, 24, 25, 26, 28, 29],
  }),
);
// Traffic heads left: the icons face right and are flipped.
const taxi = place(cab, {
  left: 911,
  bottom: GROUND,
  scale: 0.16,
  line: LINE.small,
  flip: true,
});
const sedan = place(car, {
  left: 1284,
  bottom: GROUND,
  scale: 0.17,
  line: LINE.small,
  flip: true,
});
const doubledecker = place(bus, {
  left: 1341,
  bottom: GROUND,
  scale: 0.19,
  line: LINE.small,
  flip: true,
});

// Oslo's cathedral and a row of townhouses, with people, traffic and rooftop
// life. At night the blast lights up the left, windows and headlights come on,
// a cat takes the roof and the northern lights and a satellite replace the
// balloon, birds and plane.
export const city = {
  id: "city",
  width: 1435,
  height: 429,
  items: [
    { svg: aurora, show: "night" },
    // The blast's light: a tall pool around the cloud, and a flat one along
    // the street that lights the buildings on either side. Both stay inside
    // the band, so neither is cut off at an edge.
    glow({ x: 331, y: 214 }, [300, 213]),
    glow({ x: 331, y: 338 }, [270, 90]),
    place(mushroomCloud, {
      left: 98.1,
      bottom: 423.2,
      scale: 1.597,
      line: 19.93056,
      className: "blast",
    }),
    // A soft halo around some of the lit windows.
    ...[
      { x: 99, y: 321 },
      { x: 145, y: 342 },
      { x: 526, y: 330 },
      { x: 604, y: 336 },
      { x: 652, y: 314 },
    ].map((at) => glow(at, 20, { soft: true })),
    place(apartments, {
      left: 41.7,
      bottom: 430.9,
      scale: 0.45,
      flip: true,
      className: "lit",
    }),
    place(building2, {
      left: 472.5,
      bottom: 428,
      scale: 0.4526,
      // The window ticks; not the rooftop water tower (4, 6).
      lights: [7, 8, 9, 10, 11, 12, 13],
    }),
    place(apartments, {
      left: 577.5,
      bottom: 428,
      scale: 0.465,
      className: "lit",
    }),
    // Light from the cathedral's open door and rose window.
    glow(pointIn(cathedral, [262, 285]), [14, 16]),
    glow(pointIn(cathedral, [265, 171]), 20, { soft: true }),
    cathedral,
    // Flattened so the pool of light fades out above the ground.
    glow(pointIn(streetLight, [273, 148]), [70, 58]),
    streetLight,
    // The townhouses' arched top-floor windows, whose crosses light up.
    ...townhouses.flatMap((house) =>
      [138, 197, 256].map((u) =>
        glow(pointIn(house, [u, 196]), 18, { soft: true }),
      ),
    ),
    ...townhouses,
    // Street
    place(dadWithStroller, {
      left: 546,
      bottom: GROUND,
      scale: 0.09,
      line: LINE.small,
    }),
    place(walkingWoman, {
      left: 717,
      bottom: GROUND,
      scale: 0.105,
      line: LINE.small,
    }),
    taxi,
    sedan,
    doubledecker,
    place(casualWalk, {
      left: 1403,
      bottom: GROUND,
      scale: 0.1,
      line: LINE.small,
    }),
    place(dog, { left: 1416, bottom: GROUND, scale: 0.05, line: LINE.small }),
    // Headlights, at each vehicle's front bumper.
    glow(pointIn(taxi, [345, 240]), [16, 6]),
    glow(pointIn(sedan, [350, 215]), [16, 6]),
    glow(pointIn(doubledecker, [345, 260]), [16, 6]),
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
    place(chopper, { left: 1011, top: 154.4, scale: 0.2154 }),
    place(airplane, {
      left: 1319.8,
      top: 11.9,
      scale: 0.3011,
      show: "day",
    }),
    place(satellite, {
      left: 1321.2,
      top: 19,
      scale: 0.2,
      show: "night",
    }),
  ],
} satisfies Scene;
