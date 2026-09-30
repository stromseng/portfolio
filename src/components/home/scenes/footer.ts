// The end of the page. Positions are in the scene's viewBox units.
import cat from "@images/doodles/cat.svg?raw";
import sleeping from "@images/doodles/sleeping.svg?raw";
import cleaningMan from "@images/cleaning-man.svg?raw";
import zzz from "@images/scenes/footer/zzz.svg?raw";
import { place } from "@/lib/scene/place";
import type { Scene } from "@/lib/scene/scene";

// The cleaning man and a cat by day, fast asleep by night.
export const footer = {
  id: "footer",
  width: 600,
  height: 400,
  items: [
    { svg: cleaningMan, x: 100, show: "day" },
    place(cat, {
      left: 449.8,
      bottom: 374.8,
      scale: 0.45,
      show: "day",
    }),
    place(sleeping, { left: 154, bottom: 339, scale: 1, show: "night" }),
    { svg: zzz, x: 380, y: 30, show: "night" },
  ],
} satisfies Scene;
