// Math.cos/Math.sin can differ in their last bit(s) between the Node.js
// server render and the browser's V8 during hydration, which makes React
// flag a hydration mismatch on SSR-computed SVG coordinates. Rounding to a
// fixed precision collapses that noise so server and client output match.
export function round(value: number, decimals = 3): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
