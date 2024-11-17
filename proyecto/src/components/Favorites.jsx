import React, { useEffect, useState } from 'react';

const Favorites = ({ favorites, toggleFavorite }) => {
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    const fetchFavoriteNames = async () => {
      const cards = await Promise.all(
        favorites.map(async (favorite) => {
          try {
            const response = await fetch(`https://api.scryfall.com/cards/${favorite.IDcarta}`);
            if (!response.ok) throw new Error('Error al obtener la carta');
            const cardData = await response.json();
            return { id: favorite.IDcarta, name: cardData.name };
          } catch (error) {
            console.error(`Error al obtener la carta favorita ${favorite.IDcarta}:`, error);
            return { id: favorite.IDcarta, name: 'Desconocida' }; // En caso de error, mostrar 'Desconocida'
          }
        })
      );
      setFavoriteCards(cards);
    };

    fetchFavoriteNames();
  }, [favorites]);

  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl mb-4">Favoritos</h2>
      <div className="bg-[#12171E] p-4 rounded-lg">
        {favoriteCards.length === 0 ? (
          <p className="text-gray-400">No hay cartas favoritas.</p>
        ) : (
          favoriteCards.map((card) => (
            <div
              key={card.id}
              className="flex justify-between items-center p-2 hover:bg-[#232c3a] rounded transition"
            >
              <span className="text-white">{card.name}</span>
              <button
                className="text-red-500"
                onClick={() => toggleFavorite(card)}
              >
                Quitar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
