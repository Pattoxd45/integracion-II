import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [randomCards, setRandomCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomCards = async () => {
      try {
        let randomCardsArray = [];
        while (randomCardsArray.length < 4) {
          const response = await fetch("https://api.scryfall.com/cards/random");
          const data = await response.json();
          const cardAlreadyExists = randomCardsArray.some((card) => card.id === data.id);
          if (!cardAlreadyExists) {
            randomCardsArray.push(data);
          }
        }
        setRandomCards(randomCardsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener cartas aleatorias:", error);
        setLoading(false);
      }
    };
    fetchRandomCards();
  }, []);

  const handleCardClick = (cardId) => {
    localStorage.setItem("selectedCardId", cardId); // Guardar el ID en localStorage
    navigate("/cartas"); // Navegar a Cartas.jsx
  };

  return (
    <div className="max-w-[1200px] mx-auto my-6">
      <div className="p-6 rounded-lg text-[#e1e6ea]">
        {loading ? (
          <div className="flex justify-center items-center h-[320px]">
            <PropagateLoader color="#e1e6ea" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
            {randomCards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card w-[220px] h-[320px] bg-[#12181E] rounded-lg shadow-xl">
                  <img
                    src={card.image_uris?.normal || card.image_uris?.small}
                    alt={card.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-2 text-white font-bold">{card.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
