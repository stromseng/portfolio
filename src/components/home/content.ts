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
import { sceneSvg } from "@/lib/scene/scene";
import { marker } from "./scenes";

// Markers for entries that get their own icon instead of a shared dot.
const brainDot = sceneSvg(marker("brain", brain), "");
const planeDot = sceneSvg(marker("plane", airplane), "");
const antennaDot = sceneSvg(marker("antenna", antenna), "");
const megaphoneDot = sceneSvg(marker("megaphone", announcement), "");
const footballDot = sceneSvg(marker("football", soccer), "");

export interface TimelineEntry {
  icon: string;
  period: string;
  title: string;
  text: string;
}

export const education: TimelineEntry[] = [
  {
    icon: brainDot,
    period: "2024–2026",
    title: "Norwegian Institute of Technology and Science",
    text: "Master in Informatics",
  },
  {
    icon: planeDot,
    period: "2025",
    title: "Seoul National University",
    text: "Exchange Student",
  },
  {
    icon: uniDot,
    period: "2021–2024",
    title: "Norwegian Institute of Technology and Science",
    text: "Bachelor in Informatics",
  },
  {
    icon: busDot,
    period: "2017–2020",
    title: "Nydalen VGS",
    text: "General Studies",
  },
];

export const work: TimelineEntry[] = [
  { icon: workDot, period: "2026–present", title: "Bekk", text: "Developer" },
  { icon: workDot, period: "2025", title: "Bekk", text: "Summer Internship" },
  {
    icon: antennaDot,
    period: "2024",
    title: "Thales Norway",
    text: "Summer Internship",
  },
  {
    icon: megaphoneDot,
    period: "2021–2023",
    title: "Linderud IL, Camp Linderud",
    text: "Team Leader",
  },
  {
    icon: footballDot,
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
