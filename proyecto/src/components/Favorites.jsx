import React from 'react';

const Favorites = ({ favorites, toggleFavorite }) => {
  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl mb-4">Favoritos</h2>
      <div className="bg-[#12181E] p-4 rounded-lg">
        {favorites.length === 0 ? (
          <p className="text-gray-400">No hay cartas favoritas.</p>
        ) : (
          favorites.map((card) => (
            <div
              key={card.id}
              className="flex justify-between items-center p-2 hover:bg-gray-700 rounded transition"
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
