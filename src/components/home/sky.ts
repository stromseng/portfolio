// Decorative marks for the homepage's HTML layers, as % of their box. The
// template staggers their animation by list position.

// The hero sky. Marks with `bird` are gulls by day; every mark is a star at night.
export const skyMarks = [
  { x: 6, y: 12, size: 22, bird: true },
  { x: 18, y: 4, size: 14, bird: false },
  { x: 31, y: 9, size: 18, bird: false },
  { x: 44, y: 3, size: 26, bird: true },
  { x: 52, y: 16, size: 12, bird: false },
  { x: 63, y: 6, size: 16, bird: false },
  { x: 73, y: 22, size: 20, bird: true },
  { x: 90, y: 30, size: 14, bird: false },
  { x: 3, y: 58, size: 14, bird: false },
  { x: 48, y: 74, size: 18, bird: false },
  { x: 94, y: 70, size: 16, bird: false },
  { x: 58, y: 44, size: 12, bird: false },
];

// Fireflies over the meadow's timeline, at night.
export const fireflies = [
  { x: 8, y: 20 },
  { x: 15, y: 64 },
  { x: 27, y: 38 },
  { x: 39, y: 82 },
  { x: 47, y: 14 },
  { x: 58, y: 56 },
  { x: 66, y: 30 },
  { x: 74, y: 76 },
  { x: 84, y: 18 },
  { x: 92, y: 52 },
];
