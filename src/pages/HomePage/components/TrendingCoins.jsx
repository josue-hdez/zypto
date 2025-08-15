import { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getTrendingSearchList } from "../../../services/api/trendingAPI";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import Slider from "../../../components/Slider";
import TrendingCard from "./TrendingCard";

function TrendingCoins() {
  const [trendingSearchList, setTrendingSearchList] = useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTrendingSearchList();
        setTrendingSearchList(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <section className="border-bottom">
      <div className="container space-y-3">
        <div className="flex justify-between items-end gap-3">
          <div>
            <h2 className="text-xl lg:text-3xl">Top Trending Coins Today</h2>
            <p>Discover the top trending coins on Zypto.</p>
          </div>
          <div className="flex gap-1.5">
            <Button ref={prevRef}>
              <Icon size="sm" color="white">
                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
              </Icon>
            </Button>
            <Button ref={nextRef}>
              <Icon size="sm" color="white">
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </Icon>
            </Button>
          </div>
        </div>
        <Slider
          options={{
            modules: [Navigation],
            navigation: {
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            },
            slidesPerView: 1,
            spaceBetween: 12,
            breakpoints: {
              425: {
                slidesPerView: 2,
              },

              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
            },
          }}
        >
          {trendingSearchList.map(({ id, thumb, symbol, data }) => (
            <SwiperSlide key={id}>
              <TrendingCard id={id} thumb={thumb} symbol={symbol} data={data} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TrendingCoins;
