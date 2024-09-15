import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsCarousel = () => {
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
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="p-4">
            <div className="flex bg-[#000] rounded-lg overflow-hidden h-[400px] shadow-xl">
              {/* Ajusta el ancho del div naranja a 1/4 del contenedor negro */}
              <div className="flex-shrink-0 w-1/3 bg-[#E83411]"></div> {/* 1/4 del ancho */}
              <div className="p-4 flex flex-col justify-center flex-grow">
                <h2 className="text-2xl font-bold">Noticia {index + 1}</h2>
                <p className="mt-2 line-clamp-2 sm:line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                  odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                  quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                </p>
                <p className="text-[#b8b8b8] cursor-pointer hover:text-[#e85438] mt-2">
                  Ver más...
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCarousel;
