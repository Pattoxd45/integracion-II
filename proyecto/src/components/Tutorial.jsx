import React, { useState, useEffect } from 'react';

const TutorialCard = () => {
  const [cardImage, setCardImage] = useState(null);
  const [info, setInfo] = useState(null);

  // Cargar una carta aleatoria al cargar el componente
  useEffect(() => {
    fetchRandomCard();
  }, []);

  // Función para obtener una carta aleatoria de Scryfall
  const fetchRandomCard = async () => {
    try {
      const response = await fetch('https://api.scryfall.com/cards/random');
      const data = await response.json();
      if (data.image_uris) {
        setCardImage(data.image_uris.normal);
      } else {
        console.error('No se encontró imagen para esta carta');
      }
    } catch (error) {
      console.error('Error al obtener la carta:', error);
    }
  };

  // Define las áreas con nombre y descripción
  const areas = [
    { name: 'Costo de Mana', description: 'El costo para jugar esta carta.', style: { top: '5%', left: '85%', width: '10%', height: '10%' } },
    { name: 'Nombre de la Carta', description: 'El nombre de esta carta.', style: { top: '5%', left: '10%', width: '30%', height: '10%' } },
    { name: 'Supertipo / Tipo / Subtipo', description: 'Clasificación de la carta.', style: { top: '30%', left: '10%', width: '30%', height: '10%' } },
    { name: 'Edición / Rareza', description: 'La edición y rareza de la carta.', style: { top: '30%', left: '75%', width: '15%', height: '10%' } },
    { name: 'Habilidades', description: 'Los efectos o habilidades de la carta.', style: { top: '45%', left: '10%', width: '70%', height: '20%' } },
    { name: 'Texto Decorativo (Flavor)', description: 'Texto narrativo o de ambiente.', style: { top: '75%', left: '10%', width: '70%', height: '10%' } },
    { name: 'Poder / Resistencia', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '90%', left: '85%', width: '10%', height: '10%' } },
  ];

  return (
    <div className="flex flex-col items-center  text-blue-300 min-h-screen py-8">
      <h2 className="text-2xl font-bold mb-6">Partes de una Carta de Magic: The Gathering</h2>
      
      {/* Botón para obtener otra carta */}
      <button 
        onClick={fetchRandomCard} 
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-2 px-4 rounded"
      >
        Obtener otra carta
      </button>
      
      {/* Imagen de la carta con áreas clicables */}
      {cardImage && (
        <div className="relative">
          <img src={cardImage} alt="Carta MTG" className="w-96" />
          
          {areas.map((area, index) => (
            <button
              key={index}
              onClick={() => setInfo(area)}
              style={{ ...area.style, position: 'absolute', background: 'rgba(0, 0, 255, 0.3)' }}
              className="border border-blue-400 rounded opacity-0 hover:opacity-50"
            />
          ))}
        </div>
      )}

      {/* Mostrar información de la sección seleccionada */}
      {info && (
        <div className="mt-8 p-4 bg-blue-800 text-blue-200 rounded shadow-lg w-80 text-center">
          <h3 className="text-xl font-semibold mb-2">{info.name}</h3>
          <p>{info.description}</p>
          <button onClick={() => setInfo(null)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-2 px-4 rounded">
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorialCard;
