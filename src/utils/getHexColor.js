const COLORS = {
  charcoal: "#36454f",
  steel: "#adb5bd",
  "light-steel": " #dee2e6",
  positive: "#00a63e",
  negative: "#e7000b",
  white: "#ffffff",
  black: "#000000",
  transparent: "trasnparent",
};

export function getHexColor(color) {
  return COLORS[color];
}
