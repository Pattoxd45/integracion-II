import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Cards = () => {
  const [viewedCards, setViewedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchViewedCards = async () => {
      if (!userId) {
        console.error("No user ID found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://magicarduct.online:3000/api/ultimascartasvistas/${userId}`,
        );
        const data = await response.json();

        if (response.ok && data.length > 0) {
          const uniqueCards = filterUniqueCards(data); // Filtrar cartas únicas
          fetchCardImages(uniqueCards);
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
            const response = await fetch(
              `https://api.scryfall.com/cards/${card.IDcarta}`,
            );
            const data = await response.json();
            return { ...card, imageUrl: data.image_uris?.normal };
          } catch (error) {
            console.error("Error al obtener la imagen de la carta:", error);
            return { ...card, imageUrl: null };
          }
        }),
      );
      setViewedCards(updatedCards);
      setLoadingImages(false);
    };

    // Función para filtrar cartas únicas por IDcarta
    const filterUniqueCards = (cards) => {
      const seenIds = new Set();
      return cards.filter((card) => {
        if (seenIds.has(card.IDcarta)) {
          return false;
        }
        seenIds.add(card.IDcarta);
        return true;
      });
    };

    fetchViewedCards();
  }, [userId]);

  const handleCardClick = (cardId) => {
    localStorage.setItem("selectedCardId", cardId);
    navigate("/cartas");
  };

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

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCards(1); // Una carta centrada para pantallas muy pequeñas
      } else if (width < 800) {
        setVisibleCards(2); // Dos cartas centradas para pantallas pequeñas
      } else if (width < 1024) {
        setVisibleCards(3); // Tres cartas en pantallas medianas
      } else {
        setVisibleCards(4); // Cuatro cartas en pantallas grandes
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto my-6 flex flex-col items-center">
      <div className="relative w-full">
        {loading || loadingImages ? (
          <div className="flex justify-center items-center h-[320px]">
            <PropagateLoader color="#e1e6ea" />
          </div>
        ) : (
          <div className="relative flex items-center">
            {/* Flecha izquierda */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-4 bg-[#2a5880] text-[#e2e7eb] p-2 rounded-full shadow-lg hover:bg-[#244c6e] transition disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <FaChevronLeft size={16} />
            </button>

            {/* Carrusel */}
            <div
              className="grid gap-6 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${visibleCards}, 1fr)`,
                justifyContent: "center", // Centra las cartas
              }}
            >
              {viewedCards
                .slice(currentIndex, currentIndex + visibleCards)
                .map((card) => (
                  <div
                    key={card.IDcarta}
                    className="flex flex-col cursor-pointer transition-transform transform duration-500 ease-in-out"
                    onClick={() => handleCardClick(card.IDcarta)}
                  >
                    <div className="card bg-[#12181E] rounded-lg shadow-xl">
                      {card.imageUrl ? (
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <p className="text-white text-center">
                          Imagen no disponible
                        </p>
                      )}
                    </div>
                    <p className="mt-2 text-white font-bold text-center">
                      {card.name}
                    </p>
                  </div>
                ))}
            </div>

            {/* Flecha derecha */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= viewedCards.length - visibleCards}
              className="absolute right-4 bg-[#2a5880] text-[#e2e7eb] p-2 rounded-full shadow-lg hover:bg-[#244c6e] transition disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
