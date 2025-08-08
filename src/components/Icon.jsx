const colors = {
  charcoal: "#36454f",
  positive: "#098551",
  negative: "#cf202f",
  transparent: "transparent",
  blue: "#0052ff",
  ["light-gray"]: "#eef0f3",
  ["light-gray-disabled"]: "#eef0f359",
};

function Icon({ size = "24px", color = "charcoal", children }) {
  return (
    <svg
      className="inline"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill={colors[color]}
    >
      {children}
    </svg>
  );
}

export default Icon;
