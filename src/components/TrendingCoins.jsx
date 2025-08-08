import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { SwiperSlide } from "swiper/react";
import { getTrendingSearchList } from "../services/api/trendingService";
import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";
import Button from "./Button";
import Icon from "./Icon";
import Slider from "./Slider";
import PercentageChangeIndicator from "./PercentageChangeIndicator";
import Loader from "./Loader";

function TrendingCoins() {
  const [trendingSearchList, setTrendingSearchList] = useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTrendingSearchList();

        setTrendingSearchList(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="content-block">
      <div className="container space-y-3">
        <div className="space-y-3 xs:space-y-0 xs:flex xs:justify-between xs:items-end xs:gap-3">
          <div className="space-y-3">
            <h2 className="font-medium text-3xl">Top Trending Coins Today</h2>
            <p>Discover the top trending coins on ZYPTO.</p>
          </div>
          <div className="flex justify-center gap-3">
            <Button ref={prevRef}>
              <Icon color="charcoal">
                <path d="M560-280 360-480l200-200v400Z" />
              </Icon>
            </Button>
            <Button ref={nextRef}>
              <Icon color="charcoal">
                <path d="M400-280v-400l200 200-200 200Z" />
              </Icon>
            </Button>
          </div>
        </div>
        <Slider
          trendingSearchList={trendingSearchList}
          prevRef={prevRef}
          nextRef={nextRef}
        >
          {trendingSearchList.length
            ? trendingSearchList.map((coin) => (
                <SwiperSlide>
                  <CoinCard key={coin.id} coin={coin} />
                </SwiperSlide>
              ))
            : [1, 2, 3, 4, 5].map((key) => (
                <SwiperSlide key={key}>
                  <CoinCardLoader />
                </SwiperSlide>
              ))}
        </Slider>
      </div>
    </section>
  );
}

function CoinCard({ coin }) {
  return (
    <div>
      <Link
        className="m-w-52 h-36 py-3 px-6 rounded-3xl bg-light-gray flex flex-col justify-center gap-1 cursor-pointer"
        to={"/" + coin.id}
      >
        <img
          className="size-8 rounded-full"
          src={coin.small}
          alt={`${coin.name} logo`}
        />
        <h3>{coin.symbol}</h3>
        <div className="text-xl flex">
          <PercentageChangeIndicator
            change={coin.data.price_change_percentage_24h.usd}
          />
        </div>
        <span>{formatNumberToCurrency(coin.data.price)}</span>
      </Link>
    </div>
  );
}

function CoinCardLoader() {
  return (
    <div className="m-w-52 h-40 py-3 px-6 rounded-3xl bg-light-gray-disabled flex flex-col justify-center gap-3">
      <Loader className="rounded-full" width="w-8" height="h-8" />
      <Loader width="w-1/5" height="h-3" />
      <Loader width="w-1/2" height="h-3" />
      <Loader width="w-1/4" height="h-3" />
    </div>
  );
}

export default TrendingCoins;
