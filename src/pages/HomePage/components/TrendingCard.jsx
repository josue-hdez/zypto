import { formatNumber } from "../../../utils/formatNumber";
import ChangePercentageIndicator from "../../../components/ChangePercentageIndicator";

function TrendingCard({ thumb, symbol, data }) {
  return (
    <div className="p-3 rounded-lg bg-light-steel flex flex-col gap-1 cursor-pointer">
      <img className="size-9 rounded-full" src={thumb} alt={`${symbol} logo`} />
      <h3 className="font-medium">{symbol}</h3>
      <ChangePercentageIndicator
        change={data.price_change_percentage_24h.usd}
        fontSize="text-lg"
      />
      <span>{formatNumber(data.price, "currency")}</span>
    </div>
  );
}

export default TrendingCard;
