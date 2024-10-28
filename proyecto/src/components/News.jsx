import React, { useState, useEffect, useCallback } from "react";
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

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Asignar imágenes únicas a las noticias usando useCallback
  const assignImagesToNews = useCallback((newsData) => {
    const shuffledImages = shuffleArray(Object.values(images)); // Barajar las imágenes
    return newsData.map((item, index) => ({
      ...item,
      image: shuffledImages[index % shuffledImages.length] // Asignar imagen única
    }));
  }, []); // La dependencia es vacía, ya que solo depende de 'images'

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://magicarduct.online:3001/api/news2");
        const newsWithImages = assignImagesToNews(response.data); // Asignar imágenes a cada noticia
        setNews(newsWithImages);
        if (response.data.length === 0) {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [assignImagesToNews]);  // Ahora solo se ejecuta si cambia 'assignImagesToNews'

  // Función para barajar el array de imágenes
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
  };

  // Definición de las flechas personalizadas
  const CustomArrow = ({ className, style, onClick, children }) => (
    <div
      className={className}
      style={{
        ...style,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro
        borderRadius: '50%', // Hacer las flechas redondas
        height: '16px', // Tamaño de las flechas
        width: '16px', // Tamaño de las flechas
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1 // Asegurar que se muestren por encima
      }}
      onClick={onClick}
    >
      {children} {/* Muestra el icono de flecha por defecto */}
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomArrow className="slick-prev">{'<'}</CustomArrow>, // Personaliza la flecha anterior
    nextArrow: <CustomArrow className="slick-next">{'>'}</CustomArrow> // Personaliza la flecha siguiente
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 space-y-6 mb-6 text-[#e2e7eb]">
      {loading && (
        <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-4 border-[#12171E] border-t-transparent rounded-full animate-spin"></div>
      </div>
      )}
      {!loading && error && (
        <div className="bg-gradient-to-b from-[#12171E] via-[#222b38] to-[#222e3f] text-[#e2e7eb] text-center p-4 rounded-lg">
          No hay noticias disponibles.
        </div>
      )}
      {!loading && !error && (
        <Slider {...settings}>
          {news.map((newsItem, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row bg-[#12171E] rounded-lg overflow-hidden shadow-xl h-auto">
                <div className="flex-shrink-0 w-full md:w-2/5 flex items-center justify-center">
                  <img 
                    src={newsItem.image}  // Usar la imagen asignada
                    alt={newsItem.title} 
                    className="w-full h-auto object-cover" 
                  />
                </div>
                <div className="p-4 flex flex-col justify-center flex-grow">
                  <h2 className="text-2xl font-bold">{newsItem.title}</h2>
                  <p className="mt-2 line-clamp-2 sm:line-clamp-3">
                    {newsItem.description}
                  </p>
                  <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="text-[#bcc1c5] hover:opacity-70">
                    Ver más...
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default News;