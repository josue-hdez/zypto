import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { getCryptoGlobalMarketData } from "../services/api/globalAPI";
import { formatNumber } from "../utils/formatNumber";
import Slider from "../components/Slider";
import ChangePercentageIndicator from "../components/ChangePercentageIndicator";

function MarketStats() {
  const [cryptoGlobalMarketData, setCryptoGlobalMarketData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCryptoGlobalMarketData();
        setCryptoGlobalMarketData(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  const stats = [
    {
      value: cryptoGlobalMarketData?.active_cryptocurrencies,
      style: "decimal",
      label: "Coins:",
    },
    {
      value: cryptoGlobalMarketData?.markets,
      style: "decimal",
      label: "Exchanges:",
    },
    {
      value: cryptoGlobalMarketData?.total_market_cap?.usd,
      change: cryptoGlobalMarketData?.market_cap_change_percentage_24h_usd,
      style: "currency",
      label: "Market Cap:",
    },
    {
      value: cryptoGlobalMarketData?.total_volume?.usd,
      style: "currency",
      label: "Volume:",
    },
    {
      value: cryptoGlobalMarketData?.market_cap_percentage?.btc,
      style: "percent",
      label: "BTC Dominance:",
    },
    {
      value: cryptoGlobalMarketData?.market_cap_percentage?.eth,
      style: "percent",
      label: "ETH Dominance:",
    },
  ];

  return (
    <div className="border-bottom">
      <div className="container">
        <Slider
          options={{
            modules: [Autoplay],
            autoplay: {
              delay: 3000,
            },
            loop: true,
            slidesPerView: 1,
            breakpoints: {
              768: {
                slidesPerView: 3,
              },

              1024: {
                loop: false,
                slidesPerView: 6,
              },
            },
          }}
        >
          {stats.map(({ value, change, style, label }) => (
            <SwiperSlide key={label}>
              <div className="flex md:justify-center gap-1">
                <h3>{label}</h3>
                <span className="font-medium">
                  {formatNumber(value, style)}
                </span>
                {change && (
                  <ChangePercentageIndicator change={change} iconSize="xs" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default MarketStats;
