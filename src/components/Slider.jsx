import "swiper/css";
import { Swiper } from "swiper/react";

function Slider({ options, children }) {
  return <Swiper {...options}>{children}</Swiper>;
}

export default Slider;
