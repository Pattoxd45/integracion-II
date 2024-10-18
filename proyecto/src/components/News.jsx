import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imagen8 from '../images/imgNews/imagen8.webp'; // Cargar la imagen estática

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

  // Obtener noticias aleatorias de la API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://magicarduct.online:3001/api/news");
        const newsArray = response.data;

        // Mezclamos las noticias y seleccionamos las primeras 3
        const shuffledNews = newsArray.sort(() => 0.5 - Math.random());
        const selectedNews = shuffledNews.slice(0, 3);

        setNewsItems(selectedNews); // Guardamos las 3 noticias seleccionadas
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 mb-[20px] text-[#e2e7eb]">
      {newsItems.map((news, index) => (
        <div key={index} className="flex bg-[#12181E] rounded-lg overflow-hidden h-[152px] shadow-xl">
          {/* Imagen de la noticia */}
          <div className="max-w-[320px] min-w-[180px]">
            <img
              src={imagen8} // Por ahora usamos una imagen estática
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido de la noticia */}
          <div className="p-4 flex flex-col justify-center flex-grow">
            <h2 className="text-2xl font-bold">{news.title}</h2>
            <p className="mt-2 line-clamp-2 sm:line-clamp-3">
              {/* Descripción con "Ver más..." al final */}
              {news.description.length > 150
                ? `${news.description.substring(0, 150)}...`
                : news.description}{" "}
              <span
                onClick={() => navigate("/noticias")} // Redirige a /noticias
                className="text-[#b8b8b8] cursor-pointer hover:opacity-70"
              >
                Ver más...
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
