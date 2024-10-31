import React from "react";

const CardDetails = ({ selectedCard, closeDetails, isVisible }) => {
  if (!selectedCard) return null;

  return (
    <div
      className={`w-[80%] bg-[#222] ml-4 p-5 rounded-lg text-white flex transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      {/* Imagen de la carta */}
      <div className="w-[50%] flex-shrink-0">
        <img
          src={selectedCard.image}
          alt={selectedCard.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Descripciones de la carta */}
      <div className="ml-6 w-[50%] flex flex-col">
        <button
          className="self-end text-white hover:text-red-500 mb-4"
          onClick={closeDetails}
        >
          Cerrar
        </button>
        <h2 className="text-3xl font-bold">{selectedCard.name}</h2>
        <p className="mt-4 text-lg">
          Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="mt-2">Mana: {selectedCard.mana || "Desconocido"}</p>
        <p className="mt-2">Tipo: {selectedCard.type || "Desconocido"}</p>
        <p className="mt-2">
          Poder/Toughness: {selectedCard.power || "N/A"} /{" "}
          {selectedCard.toughness || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default CardDetails;