// Bounding box of an SVG's path geometry in its own units, stroke width
// excluded. Runs at build time, e.g. to centre pack icons in timeline markers.
// Only absolute M, L, H, V, C and Z commands are supported, which is all the pack
// icons use; anything else throws so a new icon can't silently misplace.
export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

const NUMBER = /-?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?/gi;
// Samples per cubic segment; plenty at marker sizes.
const CURVE_STEPS = 16;

const cubic = (a: number, b: number, c: number, d: number, t: number) =>
  (1 - t) ** 3 * a +
  3 * (1 - t) ** 2 * t * b +
  3 * (1 - t) * t ** 2 * c +
  t ** 3 * d;

export function pathBounds(svg: string): Box {
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
  const add = (x: number, y: number) => {
    [minX, maxX] = [Math.min(minX, x), Math.max(maxX, x)];
    [minY, maxY] = [Math.min(minY, y), Math.max(maxY, y)];
  };

  for (const [, d = ""] of svg.matchAll(/\sd="([^"]*)"/g)) {
    let [x, y] = [0, 0];
    for (const [, command, args = ""] of d.matchAll(
      /([A-Za-z])([^A-Za-z]*)/g,
    )) {
      const n = (args.match(NUMBER) ?? []).map(Number);
      const at = (i: number) => n[i] ?? NaN;
      switch (command) {
        case "M":
        case "L":
          for (let i = 0; i < n.length; i += 2)
            add((x = at(i)), (y = at(i + 1)));
          break;
        case "H":
          for (const value of n) add((x = value), y);
          break;
        case "V":
          for (const value of n) add(x, (y = value));
          break;
        case "C":
          for (let i = 0; i < n.length; i += 6) {
            const [x1, y1, x2, y2, x3, y3] = [0, 1, 2, 3, 4, 5].map((k) =>
              at(i + k),
            );
            for (let s = 1; s <= CURVE_STEPS; s++) {
              const t = s / CURVE_STEPS;
              add(cubic(x, x1, x2, x3, t), cubic(y, y1, y2, y3, t));
            }
            [x, y] = [x3, y3];
          }
          break;
        case "Z":
        case "z":
          break;
        default:
          throw new Error(`pathBounds: unsupported path command "${command}"`);
      }
    }
  }

  if (!Number.isFinite(minX + minY + maxX + maxY)) {
    throw new Error("pathBounds: no usable path data");
  }
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
