import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importa las imágenes directamente
import imagen1 from "../images/imgCreadores/imagen_1.jpg";
import imagen2 from "../images/imgCreadores/imagen_2.jpg";
import imagen3 from "../images/imgCreadores/imagen_3.jpg";
import imagen4 from "../images/imgCreadores/imagen_4.jpg";
import imagen5 from "../images/imgCreadores/imagen_5.jpg";
import imagen6 from "../images/imgCreadores/imagen_6.jpg";
import imagen7 from "../images/imgCreadores/imagen_7.jpg";
import imagen8 from "../images/imgCreadores/imagen_8.jpg";
import imagen9 from "../images/imgCreadores/imagen_9.jpg";
import imagen10 from "../images/imgCreadores/imagen_10.jpg";

const Creadores = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const creators = [
    { name: "Tolarian Community College", imgSrc: imagen1, link: "https://www.youtube.com/@TolarianCommunityCollege", description: "Cartas y estrategias" },
    { name: "The Command Zone", imgSrc: imagen2, link: "https://www.youtube.com/@commandcast", description: "Análisis y estrategias para Commander." },
    { name: "Unsleeved Media", imgSrc: imagen3, link: "https://www.youtube.com/@mtgheadquarters", description: "Estrategias y formatos variados de MTG." },
    { name: "Kraken Packs", imgSrc: imagen4, link: "https://www.youtube.com/@KrakenPacksOFFICIAL", description: "Unboxing y coleccionismo de MTG." },
    { name: "MTGGoldfish", imgSrc: imagen5, link: "https://www.youtube.com/@MTGGoldfish", description: "Análisis de cartas y estrategias de metajuego." },
    { name: "ChannelFireball", imgSrc: imagen6, link: "https://www.youtube.com/@ChannelFireball", description: "Educación competitiva sobre cartas y tácticas." },
    { name: "Good Morning Magic", imgSrc: imagen7, link: "https://www.youtube.com/@GoodMorningMagic", description: "Programa diario de noticias y análisis de MTG." },
    { name: "Limited Resources", imgSrc: imagen8, link: "https://www.youtube.com/@LimitedResourcesPodcast", description: "Estrategias específicas para formatos limitados." },
    { name: "MTGNerdGirl", imgSrc: imagen9, link: "https://www.youtube.com/@MTGNerdGirl", description: "Aborda juegos competitivos y casuales." },
    { name: "Luis Scott-Vargas", imgSrc: imagen10, link: "https://www.youtube.com/@LSVargas", description: "Comparte experiencias y estrategias de MTG" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto my-6 flex items-center">
      <div className="p-10 rounded-lg text-white w-full">
        <Slider {...settings}>
          {creators.map((creator, index) => (
            <div key={index} className="px-6">
              <a href={creator.link} target="_blank" rel="noopener noreferrer">
                <div className="card w-[200px] h-[350px] bg-[#000] flex flex-col rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438] transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,52,17,1)]">
                  <div className="flex-1 w-full h-[30%]">
                    <img
                      src={creator.imgSrc}
                      alt={creator.name}
                      className="w-full object-cover border-b-4 border-[#E83411]"
                    />
                  </div>
                  <div className="h-[40%] flex flex-col justify-center text-center p-2">
                    <div className="font-bold text-[#FF7F50]">{creator.name}</div>
                    <div className="text-[#FFDAB9]">{creator.description}</div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Creadores;
