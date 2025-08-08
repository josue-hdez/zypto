import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCoinDataById } from "../services/api/coinsService";
import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";
import PercentageChangeIndicator from "../components/PercentageChangeIndicator";
import Chart from "../components/Chart";

const timeFrameOptions = [
  { label: "24h", value: 1, key: "price_change_percentage_24h" },
  { label: "7d", value: 7, key: "price_change_percentage_7d" },
  { label: "1m", value: 30, key: "price_change_percentage_30d" },
  { label: "1y", value: 365, key: "price_change_percentage_1y" },
];

function CoinPage() {
  const [coinData, setCoinData] = useState(null);

  const [selectedTimeFrameOption, setSelectedTimeFrameOption] = useState(
    timeFrameOptions[0]
  );

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoinDataById(id);

        setCoinData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    coinData && (
      <main>
        <section className="content-block">
          <div className="container flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img
                className="size-10 rounded-full"
                src={coinData.image.small}
                alt={`${coinData.name} logo`}
              />
              <h2 className="font-medium text-3xl">{coinData.name}</h2>
              <span className="text-3xl uppercase">{coinData.symbol}</span>
            </div>
            <div className="text-xl flex justify-center items-baseline gap-1">
              <span className="text-3xl">
                {formatNumberToCurrency(coinData.market_data.current_price.usd)}
              </span>
              <PercentageChangeIndicator
                change={coinData.market_data[selectedTimeFrameOption.key]}
              />
              <span className="text-base uppercase">
                ({selectedTimeFrameOption.label})
              </span>
            </div>
          </div>
        </section>
        <Chart
          coinId={id}
          change={coinData.market_data[selectedTimeFrameOption.key]}
          timeFrameOptions={timeFrameOptions}
          selectedTimeFrameOption={selectedTimeFrameOption}
          onSelectTimeframeOption={setSelectedTimeFrameOption}
        />
      </main>
    )
  );
}

export default CoinPage;
