import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";
import PercentageChangeIndicator from "./PercentageChangeIndicator";

function TrendingSearchCryptoCard({ trendingCryto }) {
  return (
    <div
      className="m-w-52 h-40 py-3 px-6 rounded-3xl bg-light-gray flex flex-col justify-center gap-1 cursor-pointer"
      key={trendingCryto.id}
    >
      <img
        className="size-8 rounded-full"
        src={trendingCryto.small}
        alt={`${trendingCryto.name} logo`}
      />
      <h3>{trendingCryto.symbol}</h3>
      <div className="text-xl flex">
        <PercentageChangeIndicator
          change={trendingCryto.data.price_change_percentage_24h.usd}
        />
      </div>
      <span>{formatNumberToCurrency(trendingCryto.data.price)}</span>
    </div>
  );
}

export default TrendingSearchCryptoCard;
