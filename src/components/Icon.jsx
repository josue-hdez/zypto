import { getColor } from "../utils/getColor";

function Icon({ size = "24px", color = "charcoal", children }) {
  return (
    <svg
      className="inline"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill={getColor(color)}
    >
      {children}
    </svg>
  );
}

export default Icon;
