// Homepage content: the education and work timelines (with their marker
// icons), the typing taglines and the age helper.
import announcement from "@images/doodles/announcement.svg?raw";
import antenna from "@images/doodles/antenna.svg?raw";
import airplane from "@images/doodles/airplane.svg?raw";
import brain from "@images/doodles/brain.svg?raw";
import soccer from "@images/doodles/soccer.svg?raw";
import busDot from "@images/bus-dot.svg?raw";
import uniDot from "@images/uni-dot.svg?raw";
import workDot from "@images/work-dot.svg?raw";
import ring from "@images/scenes/marker/ring.svg?raw";
import { pathBounds } from "@/lib/scene/bounds";
import { place } from "@/lib/scene/place";
import { sceneSvg } from "@/lib/scene/scene";
import { themeSvg } from "@/lib/scene/themeSvg";

// Marker icons are scaled so their drawn bounding box fits a circle of this
// diameter (the original dots' icons span 38-41 diagonally) and centred in the
// ring. Their widest stroke matches the dots' 1.7-2.8.
const MARKER_ICON_DIAMETER = 40;
const MARKER_LINE = 2.2;
const ringBox = pathBounds(ring);
const ringViewBox = ring.match(/viewBox="([^"]+)"/)?.[1];
if (!ringViewBox) throw new Error("ring.svg needs a viewBox");
const [, , ringWidth, ringHeight] = ringViewBox.split(" ").map(Number);

// A timeline marker: the site's hand-drawn ring around a pack icon.
function marker(id: string, icon: string) {
  const box = pathBounds(icon);
  return sceneSvg(
    {
      id: `marker-${id}`,
      width: ringWidth,
      height: ringHeight,
      items: [
        { svg: ring },
        place(icon, {
          centre: {
            x: ringBox.x + ringBox.width / 2,
            y: ringBox.y + ringBox.height / 2,
          },
          scale: MARKER_ICON_DIAMETER / Math.hypot(box.width, box.height),
          line: MARKER_LINE,
        }),
      ],
    },
    "",
  );
}

export interface TimelineEntry {
  // Finished inline SVG markup.
  icon: string;
  period: string;
  title: string;
  text: string;
}

export const education: TimelineEntry[] = [
  {
    icon: marker("brain", brain),
    period: "2024–2026",
    title: "Norwegian Institute of Technology and Science",
    text: "Master in Informatics",
  },
  {
    icon: marker("plane", airplane),
    period: "2025",
    title: "Seoul National University",
    text: "Exchange Student",
  },
  {
    icon: themeSvg(uniDot, { id: "ntnu-bachelor" }),
    period: "2021–2024",
    title: "Norwegian Institute of Technology and Science",
    text: "Bachelor in Informatics",
  },
  {
    icon: themeSvg(busDot, { id: "nydalen" }),
    period: "2017–2020",
    title: "Nydalen VGS",
    text: "General Studies",
  },
];

export const work: TimelineEntry[] = [
  {
    icon: themeSvg(workDot, { id: "bekk" }),
    period: "2026–present",
    title: "Bekk",
    text: "Developer",
  },
  {
    icon: themeSvg(workDot, { id: "bekk-summer" }),
    period: "2025",
    title: "Bekk",
    text: "Summer Internship",
  },
  {
    icon: marker("antenna", antenna),
    period: "2024",
    title: "Thales Norway",
    text: "Summer Internship",
  },
  {
    icon: marker("megaphone", announcement),
    period: "2021–2023",
    title: "Linderud IL, Camp Linderud",
    text: "Team Leader",
  },
  {
    icon: marker("football", soccer),
    period: "2017–2020",
    title: "Linderud IL, Camp Linderud",
    text: "Camp Staff",
  },
];

export const taglines = [
  "Fullstack developer",
  "Tech enthusiast",
  "E-Sports player",
  "Keyboard builder",
  "Loves animals, allergic to most",
  "I use Nix btw",
  "Can bench press 100kg",
  "Can not do a backflip",
  "Waiting for AI to write this bio",
];

// Age from Magnus's birthday, 19 April 2002.
export function ageOn(date: Date): number {
  const birthday = new Date(2002, 3, 19);
  const hadBirthday =
    date.getMonth() > birthday.getMonth() ||
    (date.getMonth() === birthday.getMonth() &&
      date.getDate() >= birthday.getDate());
  return date.getFullYear() - birthday.getFullYear() - (hadBirthday ? 0 : 1);
}
