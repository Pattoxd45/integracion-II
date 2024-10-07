import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// Cargar todas las imágenes de la carpeta 'imgNews'
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(require.context('../images/imgNews', false, /\.(png|jpe?g|svg|webp)$/));

const Noticias = () => {
  const [news, setNews] = useState([]);

  // Función para obtener una imagen aleatoria
  const getRandomImage = () => {
    const imageKeys = Object.keys(images);
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    return images[imageKeys[randomIndex]]; // Devuelve la ruta de la imagen aleatoria
  };

  useEffect(() => {
    axios.get("http://186.64.122.218:3001/api/news") //Cambie la ruta
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

  // Renderiza elementos de noticias o imágenes aleatorias
  const displayItems = news.length > 0 ? news : Array(5).fill(null); // Cambia 5 por el número de imágenes que deseas mostrar

  return (
    <div className="max-w-[1200px] mx-auto my-6 text-white">
      <Slider {...settings}>
        {displayItems.map((item, index) => (
          <div key={index} className="p-4">
            <div className="flex bg-[#000] rounded-lg overflow-hidden h-[400px] shadow-xl">
              <div className="flex-shrink-0 w-2/5 bg-[#E83411] flex items-center justify-center"> {/* Cambié a w-2/5 (40%) */}
                {/* Siempre se muestra una imagen aleatoria */}
                <img 
                  src={getRandomImage()} 
                  alt={item ? item.title : "Imagen aleatoria"} 
                  className="w-full h-full object-cover max-w-full"
                />
              </div>
              <div className="p-4 flex flex-col justify-center flex-grow">
                {item ? (
                  <>
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                    <p className="mt-2 line-clamp-2 sm:line-clamp-3">
                      {item.description}
                    </p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      ver más...
                    </a>
                    <div>
                      <p>{item.author}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-center">No hay noticias disponibles.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Noticias;
