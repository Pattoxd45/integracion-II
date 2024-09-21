import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importa las imágenes directamente
import imagen1 from "../images/imagen_1.jpg";
import imagen2 from "../images/imagen_2.jpg";
import imagen3 from "../images/imagen_3.jpg";
import imagen4 from "../images/imagen_4.jpg";
import imagen5 from "../images/imagen_5.jpg";
import imagen6 from "../images/imagen_6.jpg";
import imagen7 from "../images/imagen_7.jpg";
import imagen8 from "../images/imagen_8.jpg";
import imagen9 from "../images/imagen_9.jpg";
import imagen10 from "../images/imagen_10.jpg";

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
    { name: "Tolarian Community College", imgSrc: imagen1, link: "https://www.youtube.com/@TolarianCommunityCollege", description: "Enfocado en educación sobre cartas, estrategias y revisiones de productos." },
    { name: "The Command Zone", imgSrc: imagen2, link: "https://www.youtube.com/@commandcast", description: "Enfocado en el formato Commander, con análisis de cartas y estrategias" },
    { name: "Unsleeved Media", imgSrc: imagen3, link: "https://www.youtube.com/@mtgheadquarters", description: "Contenido sobre una variedad de formatos y estrategias de MTG." },
    { name: "Kraken Packs", imgSrc: imagen4, link: "https://www.youtube.com/@KrakenPacksOFFICIAL", description: "Contenido de unboxing, packs y contenido relacionado con coleccionismo." },
    { name: "MTGGoldfish", imgSrc: imagen5, link: "https://www.youtube.com/@MTGGoldfish", description: "Contenido de metajuego, deck techs y análisis de cartas." },
    { name: "ChannelFireball", imgSrc: imagen6, link: "https://www.youtube.com/@ChannelFireball", description: "Contenido educativo y competitivo sobre estrategias y análisis de cartas." },
    { name: "Good Morning Magic", imgSrc: imagen7, link: "https://www.youtube.com/@GoodMorningMagic", description: "Programa diario de noticias y análisis de MTG." },
    { name: "Limited Resources", imgSrc: imagen8, link: "https://www.youtube.com/@LimitedResourcesPodcast", description: "Enfocado en el juego limitado y la estrategia de sellos." },
    { name: "MTGNerdGirl", imgSrc: imagen9, link: "https://www.youtube.com/@MTGNerdGirl", description: "Enfocada en varios aspectos de MTG, incluyendo juegos competitivos y casuales." },
    { name: "Luis Scott-Vargas", imgSrc: imagen10, link: "https://www.youtube.com/@LSVargas", description: "Pro jugador y creador de contenido que comparte su experiencia y estrategias sobre MTG." },
  ];

  return (
    <div className="max-w-[1200px] mx-auto my-6 flex items-center" style={{ height: '450px' }}>
      <div className="p-10 rounded-lg text-white w-full">
        <Slider {...settings}>
          {creators.map((creator, index) => (
            <div key={index} className="px-6">
              <a href={creator.link} target="_blank" rel="noopener noreferrer">
                <div className="card w-[200px] h-[380px] bg-[#000] flex flex-col rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438] transition-all duration-300 transform hover:translate-y-[-10px] hover:shadow-[0_0_20px_rgba(232,52,17,0.8)]">
                  <div className="flex-1">
                    <img
                      src={creator.imgSrc}
                      alt={creator.name}
                      className="w-full h-[80%] object-cover rounded-t-lg border-b-4 border-[#E83411]"
                    />
                  </div>
                  <div className="h-[20%] flex flex-col justify-center text-center p-2">
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
