import React from 'react';

const Favorites = ({ favorites, toggleFavorite }) => {
  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl mb-4">Favoritos</h2>
      <div className="bg-gray-800 p-4 rounded-lg">
        {favorites.length === 0 ? (
          <p className="text-gray-400">No hay cartas favoritas.</p>
        ) : (
          favorites.map((card) => (
            <div
              key={card.IDcarta}
              className="flex justify-between items-center p-2 hover:bg-gray-700 rounded transition"
            >
              <span className="text-white">{card.IDcarta}</span>
              <button
                className="text-red-500"
                onClick={() => toggleFavorite(card)} // Asegúrate de que `card` tiene el ID correcto
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
