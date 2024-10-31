import React, { useState, useEffect } from "react";
import axios from "axios";
import imagen8 from '../images/imgNews/imagen8.webp'; // Cargar la imagen estática
import { PropagateLoader } from "react-spinners"; // Importamos el loader

const Hero = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  // Obtener una noticia aleatoria desde la API
  useEffect(() => {
    const fetchRandomNews = async () => {
      try {
        const response = await axios.get("https://magicarduct.online:3001/api/news");
        const newsArray = response.data;

        if (newsArray.length > 1) {
          // Seleccionar un índice aleatorio solo una vez
          const randomIndex = Math.floor(Math.random() * newsArray.length);
          
          // Establecer la noticia aleatoria
          setNews(newsArray[randomIndex]);
        }
        setLoading(false); // Desactivar el loader después de cargar la noticia
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false); // Desactivar el loader incluso en caso de error
      }
    };

    // Solo obtener la noticia si aún no se ha cargado
    if (!news) {
      fetchRandomNews();
    }
  }, [news]);

  return (
    <div className="relative max-w-[1200px] mx-auto my-6 bg-[#12181E] h-[56vh] min-h-[56vh] rounded-lg shadow-xl text-white">
      {/* Mostrar el loader si está cargando */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <PropagateLoader color="#ffffff" />
        </div>
      ) : (
        <>
          {/* Imagen de fondo, se muestra solo si las noticias están cargadas */}
          <img 
            src={imagen8} 
            alt="Imagen del Hero" 
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Título de la noticia y descripción */}
          {news && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-0 p-4 rounded-lg w-auto max-w-[75%]">
              <h2 className="text-2xl font-bold">{news.title}</h2>
              <p className="mt-2 text-sm">
                {news.description.length > 150 ? `${news.description.substring(0, 150)}...` : news.description}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;