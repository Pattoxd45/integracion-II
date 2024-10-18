import React, { useState, useEffect } from "react";

// Función para importar todas las imágenes de una carpeta
const importAll = (r) => {
  return r.keys().map(r);
};

const images = importAll(require.context('../images/imgNews', false, /\.(png|jpe?g|svg|webp)$/));

// Componente de marcador de posición con un círculo giratorio (spinner) naranja
const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Noticias = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false); // Estado para manejar el tiempo de espera
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
  const newsPerPage = 5; // Número de noticias por página

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/noticias'); // Cambiar a http si estás en local
        if (!response.ok) {
          throw new Error('Error en la conexión');
        }

        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    // Iniciar la carga de noticias
    fetchNews();

    // Temporizador para manejar el tiempo de espera
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeoutError(true); // Cambiar a true si pasa más de 10 segundos
    }, 10000); // 10 segundos

    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  if (loading && !timeoutError) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner />
      </div>
    );
  }

  // Calcular el número total de páginas
  const totalPages = Math.ceil(news.length / newsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber); // Actualiza la página actual
  };

  // Obtener las noticias de la página actual
  const currentNews = news.slice((currentPage - 1) * newsPerPage, currentPage * newsPerPage);

  // Seleccionar una imagen aleatoria si no hay imagen disponible
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 space-y-6 mb-6 text-white">
      {loading && timeoutError && (
        <div className="bg-gradient-to-b from-[#8A3B1C] via-[#E83411] to-[#E83411] text-white text-center p-4 rounded-lg">
          Tiempo de espera excedido. Inténtalo de nuevo más tarde.
        </div>
      )}
      {!loading && error && (
        <div className="bg-gradient-to-b from-[#8A3B1C] via-[#E83411] to-[#E83411] text-white text-center p-4 rounded-lg">
          No hay noticias disponibles.
        </div>
      )}
      {!loading && !error && (
        <>
          {currentNews.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-[#000] rounded-lg overflow-hidden h-auto shadow-xl"
            >
              {/* Imagen que se redimensiona de acuerdo al tamaño de pantalla */}
              <div className="md:w-1/3 w-full bg-[#E83411] flex-shrink-0">
                <img
                  src={item.imgUrl || getRandomImage()}
                  alt={item.title}
                  className="object-cover w-full h-[100px] md:h-[150px] lg:h-[200px]" // Ajusta la altura de la imagen
                />
              </div>
              {/* Texto que también se adapta según el tamaño de pantalla */}
              <div className="p-4 flex flex-col justify-center md:w-2/3 w-full">
                <h2 className="text-sm sm:text-md md:text-lg lg:text-xl font-bold">{item.title}</h2>
                {item.description && (
                  <p className="mt-2 text-xs sm:text-sm md:text-base line-clamp-3">
                    {item.description}
                  </p>
                )}
                <p className="text-[#b8b8b8] cursor-pointer hover:opacity-70 mt-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver más...
                  </a>
                </p>
              </div>
            </div>
          ))}
        </>
      )}
      {/* Paginación responsiva */}
      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`mx-2 ${
              currentPage === index + 1 ? "font-bold underline" : ""
            } text-black text-xs sm:text-sm md:text-base`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
