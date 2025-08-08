import Icon from "./Icon";

function PercentageChangeIndicator({ change }) {
  const isZero = change === 0;
  const isPositive = change > 0;

  return (
    <span className="text-nowrap space-x-1">
      {isZero ? null : (
        <Icon
          color={isZero ? "charcoal" : isPositive ? "positive" : "negative"}
        >
          {isPositive ? (
            <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
          ) : (
            <path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z" />
          )}
        </Icon>
      )}
      <span
        className={
          isZero
            ? "text-charcoal"
            : isPositive
            ? "text-positive"
            : "text-negative"
        }
      >
        {Math.abs(change).toFixed(2) + "%"}
      </span>
    </span>
  );
}

export default PercentageChangeIndicator;
