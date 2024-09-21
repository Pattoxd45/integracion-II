import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Creadores = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Muestra 4 tarjetas a la vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const creators = [
    { name: "Creador I", imgSrc: "link_a_la_imagen_1.jpg" },
    { name: "Creador II", imgSrc: "link_a_la_imagen_2.jpg" },
    { name: "Creador III", imgSrc: "link_a_la_imagen_3.jpg" },
    { name: "Creador IV", imgSrc: "link_a_la_imagen_4.jpg" },
    { name: "Creador V", imgSrc: "link_a_la_imagen_5.jpg" },
    { name: "Creador VI", imgSrc: "link_a_la_imagen_6.jpg" },
    { name: "Creador VII", imgSrc: "link_a_la_imagen_7.jpg" },
    { name: "Creador VIII", imgSrc: "link_a_la_imagen_8.jpg" },
    { name: "Creador IX", imgSrc: "link_a_la_imagen_9.jpg" },
    { name: "Creador X", imgSrc: "link_a_la_imagen_10.jpg" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto my-6">
      <div className="p-6 rounded-lg text-white">
        <Slider {...settings}>
          {creators.map((creator, index) => (
            <div key={index} className="px-4"> {/* Contenedor para separación */}
              <div className="card w-[180px] h-[320px] bg-[#000] flex flex-col rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438] transition-all duration-300">
                <div className="flex-1">
                  <img src={creator.imgSrc} alt={creator.name} className="w-full h-[66%] object-cover rounded-t-lg" />
                </div>
                <div className="h-[33%] flex items-center justify-center text-center">
                  {creator.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Creadores;
