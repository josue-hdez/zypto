import "swiper/css";
import { Swiper } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slider({ prevRef, nextRef, children }) {
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
      {children}
    </Swiper>
  );
}

export default Slider;
