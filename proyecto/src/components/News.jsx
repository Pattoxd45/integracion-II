import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const NewsCarousel = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/news")
      .then(response => {
        setNews(response.data); // Guardar las noticias obtenidas
      })
      .catch(error => {
        console.error("Error fetching news:", error);
      });
  }, []);

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
        {news.map((item, index) => (
          <div key={index} className="p-4">
            <div className="flex bg-[#000] rounded-lg overflow-hidden h-[400px] shadow-xl">
              {/* Ajusta el ancho del div naranja a 1/4 del contenedor negro */}
              <div className="flex-shrink-0 w-1/4 bg-[#E83411]"></div>
              <div className="p-4 flex flex-col justify-center flex-grow">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="mt-2 line-clamp-2 sm:line-clamp-3">
                  {item.summary}
                </p>
                <a  target="_blank" rel="noopener noreferrer">
                  <p className="text-[#b8b8b8] cursor-pointer hover:text-[#e85438] mt-2">
                    Ver más...
                  </p>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCarousel;
