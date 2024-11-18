import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [viewedCards, setViewedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4); // Estado para la cantidad de cartas visibles
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchViewedCards = async () => {
      if (!userId) {
        console.error("No user ID found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://magicarduct.online:3000/api/ultimascartasvistas/${userId}`);
        const data = await response.json();

        if (response.ok && data.length > 0) {
          setViewedCards(data);
          fetchCardImages(data);
        } else {
          console.log("No se encontraron cartas vistas para este usuario");
        }
      } catch (error) {
        console.error("Error al obtener cartas vistas:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCardImages = async (cards) => {
      const updatedCards = await Promise.all(
        cards.map(async (card) => {
          try {
            const response = await fetch(`https://api.scryfall.com/cards/${card.IDcarta}`);
            const data = await response.json();
            return { ...card, imageUrl: data.image_uris?.normal };
          } catch (error) {
            console.error("Error al obtener la imagen de la carta:", error);
            return { ...card, imageUrl: null };
          }
        })
      );
      setViewedCards(updatedCards);
      setLoadingImages(false);
    };

    fetchViewedCards();
  }, [userId]);

  const handleCardClick = (cardId) => {
    localStorage.setItem("selectedCardId", cardId);
    navigate("/cartas");
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < viewedCards.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Determinar la cantidad de cartas visibles en función del tamaño de la pantalla
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) { // Pantallas pequeñas (sm)
        setVisibleCards(2); // Mostrar 2 cartas en pantallas pequeñas
      } else if (width < 1024) { // Pantallas medianas (md)
        setVisibleCards(3); // Mostrar 3 cartas en pantallas medianas
      } else { // Pantallas grandes (lg y xl)
        setVisibleCards(4); // Mostrar 4 cartas en pantallas grandes
      }
    };

    // Llamar a la función al cargar y cuando se redimensiona la ventana
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto my-6">
      <div className="p-6 rounded-lg text-[#e1e6ea]">
        {loading || loadingImages ? (
          <div className="flex justify-center items-center h-[320px]">
            <PropagateLoader color="#e1e6ea" />
          </div>
        ) : (
          <div>
            {/* Carrusel de cartas */}
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${visibleCards}, 1fr)`, // Esto ajusta el número de columnas
                gridAutoRows: 'minmax(200px, auto)', // Controla la altura mínima de las cartas
              }}
            >
              {viewedCards.slice(currentIndex, currentIndex + visibleCards).map((card) => (
                <div
                  key={card.IDcarta}
                  className="flex flex-col cursor-pointer transition-transform transform duration-500 ease-in-out"
                  onClick={() => handleCardClick(card.IDcarta)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="card bg-[#12181E] rounded-lg shadow-xl">
                    {card.imageUrl ? (
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <p className="text-white text-center">Imagen no disponible</p>
                    )}
                  </div>
                  <p className="mt-2 text-white font-bold">{card.name}</p>
                </div>
              ))}
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrev}
                className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded hover:bg-[#244c6e]"
              >
                Anterior
              </button>
              <button
                onClick={handleNext}
                className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded hover:bg-[#244c6e]"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;