import { getHexColor } from "../utils/getHexColor";

const ICON_SIZES = {
  xs: "18px",
  sm: "20px",
  md: "24px",
  lg: "28px",
  xl: "32px",
};

function Icon({ size = "md", color = "charcoal", children }) {
  return (
    <svg
      className="inline"
      xmlns="http://www.w3.org/2000/svg"
      height={ICON_SIZES[size]}
      viewBox="0 -960 960 960"
      width={ICON_SIZES[size]}
      fill={getHexColor(color)}
    >
      {children}
    </svg>
  );
}

export default Icon;
