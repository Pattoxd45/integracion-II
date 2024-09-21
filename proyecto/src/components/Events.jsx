import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-[1200px] mx-auto my-6 text-white">
      <Slider {...settings}>
        <div className="p-4">
          <div className="flex bg-[#000] rounded-lg overflow-hidden h-[400px] shadow-xl">
            <div className="flex-1 bg-[#E83411]"></div>
            <div className="flex-1 bg-[#000]"></div>
            <div className="flex-1 bg-[#E83411]"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex bg-[#000] rounded-lg overflow-hidden h-[400px] shadow-xl">
            <div className="flex-1 bg-[#000]"></div>
            <div className="flex-1 bg-[#E83411]"></div>
            <div className="flex-1 bg-[#000]"></div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default EventsCarousel;
