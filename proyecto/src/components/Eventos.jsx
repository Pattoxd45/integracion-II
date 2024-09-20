import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImportantEventsCarousel = () => {
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
        {[...Array(5)].map((_, index) => ( // Ajusta la cantidad de divs según necesites
          <div key={index} className="p-4">
            <div className="flex bg-[#000] rounded-lg overflow-hidden h-[400px] shadow-xl">
              {/* Div naranja */}
              <div className="flex-shrink-0 w-1/4 bg-[#E83411] flex items-center justify-center p-2">
                <div className="w-full h-full border-2 border-[#E83411]"></div> {/* Div vacío */}
              </div>
              <div className="p-4 flex flex-col justify-center flex-grow">
                <div className="text-2xl font-bold">Evento {index + 1}</div> {/* Placeholder para el título */}
                <div className="mt-2 line-clamp-2 sm:line-clamp-3">
                  Resumen del evento {index + 1}
                </div>
                <div className="text-[#b8b8b8] cursor-pointer hover:text-[#e85438] mt-2">
                  Ver más...
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImportantEventsCarousel;
