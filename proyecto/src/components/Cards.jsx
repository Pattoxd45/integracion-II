import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners"; // Importamos el loader

const Cards = () => {
  const [randomCards, setRandomCards] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Función para obtener cartas aleatorias de Scryfall
    const fetchRandomCards = async () => {
      try {
        let randomCardsArray = [];
        while (randomCardsArray.length < 4) {
          const response = await fetch("https://api.scryfall.com/cards/random");
          const data = await response.json();

          // Verificar si la carta ya está en el array
          const cardAlreadyExists = randomCardsArray.some(
            (card) => card.id === data.id,
          );

          if (!cardAlreadyExists) {
            randomCardsArray.push(data); // Solo agregamos la carta si no está duplicada
          }
        }

        setRandomCards(randomCardsArray);
        setLoading(false); // Desactivar el loader cuando las cartas se cargan
      } catch (error) {
        console.error("Error al obtener cartas aleatorias:", error);
        setLoading(false); // Desactivar el loader incluso en caso de error
      }
    };

    fetchRandomCards();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto my-6">
      <div className="p-6 rounded-lg text-[#e1e6ea]">
        {loading ? (
          <div className="flex justify-center items-center h-[320px]">
            {" "}
            {/* Loader centrado */}
            <PropagateLoader color="#e1e6ea" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
            {randomCards.map((card, index) => (
              <div key={index} className="flex flex-col">
                {/* Div que contiene la carta con tamaño fijo */}
                <div className="card w-[220px] h-[320px] bg-[#12181E] rounded-lg shadow-xl">
                  <img
                    src={card.image_uris?.normal || card.image_uris?.small}
                    alt={card.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {/* Nombre de la carta fuera del div de la carta */}
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
