import React from 'react';

const CardDetails = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="w-full h-full p-4 bg-[#222] text-white rounded-lg">
      {/* Botón para cerrar la vista de detalle */}
      <button
        className="text-white hover:text-red-500 mb-4"
        onClick={onClose}
      >
        Cerrar
      </button>

      {/* Información de la carta */}
      <h2 className="text-3xl font-bold mb-2">{card.name}</h2>
      <img
        src={card.image}
        alt={card.name}
        className="w-[300px] h-[400px] object-cover mb-4"
      />
      <p className="mb-2">Tipo: {card.type || "Tipo no disponible"}</p>
      <p className="mb-2">Mana: {card.mana || "N/A"}</p>
      <p className="mb-2">Descripción: {card.description || "Sin descripción"}</p>
    </div>
  );
};

export default CardDetails;
