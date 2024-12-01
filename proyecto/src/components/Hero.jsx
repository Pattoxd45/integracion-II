import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";

// Función para importar todas las imágenes del directorio `imgNews`
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../images/imgNews", false, /\.(png|jpe?g|svg|webp)$/),
);

const Hero = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para seleccionar una imagen aleatoria de las imágenes importadas
  const assignRandomImage = useCallback((newsItem) => {
    const imageArray = Object.values(images);
    const randomImage =
      imageArray[Math.floor(Math.random() * imageArray.length)];
    return { ...newsItem, image: randomImage };
  }, []);

  // Obtener una noticia aleatoria y asignarle una imagen
  useEffect(() => {
    const fetchRandomNews = async () => {
      try {
        const response = await axios.get(
          "https://magicarduct.online:3001/api/news2",
        );
        const newsArray = response.data;

        if (newsArray.length > 0) {
          const randomIndex = Math.floor(Math.random() * newsArray.length);
          const randomNewsWithImage = assignRandomImage(newsArray[randomIndex]);
          setNews(randomNewsWithImage);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomNews();
  }, [assignRandomImage]);

  return (
    <div className="relative max-w-[1200px] mx-auto my-6 bg-[#12181E] h-[56vh] min-h-[56vh] rounded-lg shadow-xl text-white">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <PropagateLoader color="#ffffff" />
        </div>
      ) : (
        <>
          {/* Imagen de fondo obtenida de la noticia aleatoria */}
          <img
            src={news?.image}
            alt="Imagen del Hero"
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Título y descripción de la noticia */}
          {news && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg w-auto max-w-[75%]">
              <h2 className="text-2xl font-bold">{news.title}</h2>
              <p className="mt-2 text-[15px]">
                {news.description.length > 150
                  ? `${news.description.substring(0, 150)}...`
                  : news.description}
                <a
                  href={"https://magic.wizards.com" + news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#bcc1c5] hover:opacity-70 inline ml-2"
                >
                  Ver más...
                </a>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
