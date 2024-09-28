import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const NewsCarousel = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("https://magicarduct.online/api/news")
      .then(response => {
        setNews(response.data);
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
              <div className="flex-shrink-0 w-1/4 bg-[#E83411] flex items-center justify-center">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-center flex-grow">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="mt-2 line-clamp-2 sm:line-clamp-3">
                  {item.description} {/* Cambié item.summary a item.description */}
                </p>
                {/* Agregar un enlace si deseas mostrar un enlace */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCarousel;
