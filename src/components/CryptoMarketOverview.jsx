import { useEffect, useState } from "react";
import { getCryptoGlobalMarketData } from "../services/api/globalService";
import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";
import PercentageChangeIndicator from "./PercentageChangeIndicator";
import Loader from "./Loader";

function CryptoMarketOverview() {
  const [cryptoGlobalMarketData, setCryptoGlobalMarketData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCryptoGlobalMarketData();

        setCryptoGlobalMarketData(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="content-block">
      <div className="container space-y-3">
        <h2 className="font-medium text-3xl">Coins Prices by Market Cap</h2>
        {cryptoGlobalMarketData ? (
          <p>
            {`The global crypto market cap today is
            ${formatNumberToCurrency(
              cryptoGlobalMarketData.total_market_cap.usd
            )}, a `}
            {
              <PercentageChangeIndicator
                change={
                  cryptoGlobalMarketData.market_cap_change_percentage_24h_usd
                }
              />
            }
            {" change in the last 24 hours."}
          </p>
        ) : (
          <Loader width="w-3/5" height="h-3" />
        )}

        {isOpen &&
          (cryptoGlobalMarketData ? (
            <p>
              {`Total crypto trading volume in the last day is at ${formatNumberToCurrency(
                cryptoGlobalMarketData.total_volume.usd
              )}. Bitcoin dominance is at ${cryptoGlobalMarketData.market_cap_percentage.btc.toFixed(
                2
              )}% and Ethereum dominance is at ${cryptoGlobalMarketData.market_cap_percentage.eth.toFixed(
                2
              )}%. ZYPTO is now tracking ${cryptoGlobalMarketData.active_cryptocurrencies.toLocaleString(
                "en-US"
              )} coins.`}
            </p>
          ) : (
            <Loader width="w-full" height="h-3" />
          ))}
        <span
          className="font-medium cursor-pointer"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          Read {isOpen ? "less" : "more"}
        </span>
      </div>
    </section>
  );
}

export default CryptoMarketOverview;
