import { useEffect, useRef, useState } from "react";
import { getTrendingSearchList } from "../services/api/trendingService";
import Button from "./Button";
import Icon from "./Icon";
import Slider from "./Slider";

function TrendingSearchCryptos() {
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
            <h2 className="font-medium text-3xl">Top Trending Cryptos Today</h2>
            <p>Discover the top trending cryptos on ZYPTO.</p>
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
        />
      </div>
    </section>
  );
}

export default TrendingSearchCryptos;
