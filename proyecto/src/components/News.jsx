import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Noticias = () => {
  const [news, setNews] = useState([]);

  // Lista de imágenes disponibles en la carpeta '/images/imgNews'
  const images = [
    'imagen1.jpg', 'imagen2.jpg', 'imagen3.jpg', 'imagen4.jpg', 'imagen5.webp',
    'imagen6.webp', 'imagen7.webp', 'imagen7.webp', 'imagen8.webp', 'imagen9.webp', 'imagen10.webp',
    'imagen11.webp', 'imagen12.webp', 'imagen13.webp', 'imagen14.webp', 'imagen15.webp',
    'imagen16.webp', 'imagen17.webp', 'imagen18.webp', 'imagen19.webp', 'imagen20.webp',
    'imagen21.webp', 'imagen22.webp'
    // Agrega aquí los nombres de las imágenes que están en '/images/imgNews'
  ];

  // Función para obtener una imagen aleatoria
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return `../images/imgNews/${images[randomIndex]}`; // Ruta hacia '/images/imgNews'
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/news")
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
                {/* Aquí se selecciona una imagen aleatoria desde la carpeta 'imgNews' */}
                <img 
                  src={getRandomImage()} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-center flex-grow">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="mt-2 line-clamp-2 sm:line-clamp-3">
                  {item.description}
                </p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                    ver más...
                </a>
              </div>
              <div>
                <p>
                  {item.author}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Noticias;
