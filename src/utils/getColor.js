const colors = {
  charcoal: "#36454f",
  positive: "#098551",
  negative: "#cf202f",
  transparent: "transparent",
  blue: "#0052ff",
  ["light-gray"]: "#eef0f3",
  ["light-gray-disabled"]: "#eef0f359",
  white: "#ffffff",
};

export function getColor(colorName) {
  return colors[colorName];
}
