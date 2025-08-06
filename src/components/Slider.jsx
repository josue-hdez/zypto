import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import TrendingSearchCryptoCard from "./TrendingSearchCryptoCard";
import TrendingSearchCryptoCardLoader from "./TrendingSearchCryptoCardLoader";

function Slider({ trendingSearchList, prevRef, nextRef }) {
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView={1}
      breakpoints={{
        425: {
          slidesPerView: 2,
        },

        596: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
      modules={[Navigation]}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }}
    >
      {trendingSearchList.length
        ? trendingSearchList.map((trendingCryto) => (
            <SwiperSlide>
              <TrendingSearchCryptoCard trendingCryto={trendingCryto} />
            </SwiperSlide>
          ))
        : [1, 2, 3, 4, 5].map((id) => (
            <SwiperSlide key={id}>
              <TrendingSearchCryptoCardLoader />
            </SwiperSlide>
          ))}
    </Swiper>
  );
}

export default Slider;
