import { formatNumber } from "../utils/formatNumber";
import Icon from "./Icon";

function ChangePercentageIndicator({ change, iconSize, fontSize }) {
  return (
    <span className="space-x-1">
      {change && (
        <Icon size={iconSize} color={change > 0 ? "positive" : "negative"}>
          {change > 0 ? (
            <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
          ) : (
            <path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z" />
          )}
        </Icon>
      )}
      <span
        className={`${fontSize} ${
          !change
            ? "text-charcoal"
            : change > 0
            ? "text-positive"
            : "text-negative"
        }`}
      >
        {formatNumber(Math.abs(change), "percent")}
      </span>
    </span>
  );
}

export default ChangePercentageIndicator;
