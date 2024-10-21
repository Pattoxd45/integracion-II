import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    axios.get("https://magicarduct.online:3001/api/events2") // Cambié la ruta
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      })
      .finally(() => {
        setLoading(false); // Cambiar estado de carga a false después de la llamada
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [ // Ajustes responsivos para el slider
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 space-y-6 mb-6 text-white">
      {loading && ( // Mostrar spinner solo cuando está cargando
        <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      )}
      {!loading && ( // Mostrar contenido solo cuando loading sea false
        <>
          {events.length === 0 ? (
            <div className="bg-gradient-to-b from-[#8A3B1C] via-[#E83411] to-[#E83411] text-white text-center p-4 rounded-lg"> {/* Degradado hacia el centro */}
              No hay eventos disponibles.
            </div>
          ) : (
            <Slider {...settings}>
              {events.map((event, index) => (
                <div 
                  key={index} 
                  className="relative w-[calc(33.33%-1rem)] bg-black overflow-hidden h-[200px] shadow-xl flex flex-col items-center justify-center mx-2 border border-black"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orange-500 to-transparent pointer-events-none"></div>
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-lg md:text-xl sm:text-base font-bold">{event.title}</h2> {/* Tamaño dinámico */}
                    <p className="mt-1 text-base md:text-lg sm:text-sm">{event.date}</p> {/* Cambiado a dinámico */}
                    <p className="mt-1 text-base md:text-lg sm:text-sm">{event.location}</p> {/* Cambiado a dinámico */}
                    <a 
                      href={event.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-2 px-4 py-2 bg-orange-500 text-black text-base md:text-lg sm:text-sm rounded"
                    >
                      Más información
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </>
      )}
    </div>
  );
};

export default Events;