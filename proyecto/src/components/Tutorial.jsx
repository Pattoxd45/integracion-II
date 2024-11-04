import React, { useState, useEffect } from 'react';

const TutorialCard = () => {
  const [cardImage, setCardImage] = useState(null);
  const [info, setInfo] = useState(null);
  const [shifted, setShifted] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [deck, setDeck] = useState([]); // Estado para almacenar las cartas del mazo

  useEffect(() => {
    fetchRandomCard();
  }, []);

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

  // Función para obtener 20 cartas para simular un mazo
  const fetchDeckCards = async () => {
    const deckPromises = Array.from({ length: 20 }, () => fetch('https://api.scryfall.com/cards/random'));
    const responses = await Promise.all(deckPromises);
    const deckData = await Promise.all(responses.map(response => response.json()));
    return deckData.filter(data => data.image_uris).map(data => data.image_uris.normal);
  };

  const areas = [
    { name: 'Costo de Mana', description: 'El costo para jugar esta carta.', style: { top: '5%', left: '70%', width: '26%', height: '8%' } },
    { name: 'Nombre de la Carta', description: 'El nombre de esta carta.', style: { top: '5%', left: '3%', width: '65%', height: '8%' } },
    { name: 'Supertipo / Tipo / Subtipo', description: 'Clasificación de la carta.', style: { top: '56%', left: '3%', width: '75%', height: '6%' } },
    { name: 'Edición / Rareza', description: 'La edición y rareza de la carta.', style: { top: '56%', left: '79%', width: '18%', height: '6%' } },
    { name: 'Habilidades', description: 'Los efectos o habilidades de la carta.', style: { top: '62%', left: '3%', width: '94%', height: '28%' } },
    { name: 'Texto Decorativo (Flavor)', description: 'Texto narrativo o de ambiente.', style: { top: '90%', left: '3%', width: '60%', height: '8%' } },
    { name: 'Poder / Resistencia', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '90%', left: '77%', width: '20%', height: '8%' } },
  ];

  const handleAreaClick = (area) => {
    setInfo(area);
    setShifted(true);
  };

  const handleNextClick = async () => {
    if (showDeck) {
      setShowDeck(false);
      fetchRandomCard();
      setInfo(null);
      setShifted(false);
    } else {
      const deckCards = await fetchDeckCards();
      setCardImage(null);
      setShowDeck(true);
      setDeck(deckCards);
    }
  };

  const handlePreviousClick = () => {
    setShowDeck(false); // Oculta el mazo
    setInfo(null); // Resetea la información
    fetchRandomCard(); // Obtiene una nueva carta
    setShifted(false); // Resetea el estado de desplazamiento
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 space-y-6 text-[#e2e7eb] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-center mt-6">Tutorial</h1>
      {!showDeck && <h2 className="text-2xl font-semibold mb-6 text-center">Partes de la carta</h2>}
      {!showDeck && (
        <div className="flex items-start">
          <div className={`relative bg-[#12171E] rounded-lg overflow-hidden shadow-xl w-[300px] h-[450px] transition-transform ${shifted ? 'translate-x-[-20%]' : ''}`}>
            {cardImage && (
              <>
                <img 
                  src={cardImage} 
                  alt="Carta MTG" 
                  className="object-cover w-full h-full"
                />
                {areas.map((area, index) => (
                  <button
                    key={index}
                    onClick={() => handleAreaClick(area)}
                    style={{
                      ...area.style,
                      position: 'absolute',
                      background: 'transparent',
                      border: '2px solid blue',
                    }}
                    className="rounded cursor-pointer"
                  />
                ))}
              </>
            )}
          </div>
          {info && (
            <div className="ml-4 mt-4 p-2 bg-blue-800 text-blue-200 rounded shadow-lg w-[200px] h-[150px] flex flex-col justify-center text-center">
              <h3 className="text-lg font-semibold mb-1">{info.name}</h3>
              <p className="text-sm">{info.description}</p>
              <button onClick={() => { setInfo(null); setShifted(false); }} className="mt-2 bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-1 px-3 rounded">
                Cerrar
              </button>
            </div>
          )}
        </div>
      )}
      {showDeck && (
        <div className="mt-6 relative">
          <h2 className="text-2xl font-semibold mb-4 text-center">Creación de Mazo</h2>
          <div className="flex flex-wrap justify-center relative">
            {deck.map((card, index) => (
              <div 
                key={index} 
                className="relative transition-transform duration-300 hover:scale-105" // Añadido efecto hover
                style={{
                  margin: '0 -20px', // Ajusta el margen para la superposición
                  zIndex: deck.length - index, // Asegura que las cartas se superpongan correctamente
                }}
              >
                <img 
                  src={card} 
                  alt={`Carta ${index + 1}`} 
                  className="w-[100px] h-[150px] object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-center space-x-4">
        {showDeck && ( // Muestra el botón "Anterior" solo cuando se está en la vista del mazo
          <button 
            onClick={handlePreviousClick} 
            className="bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-2 px-4 rounded"
          >
            Anterior
          </button>
        )}
        <button 
          onClick={handleNextClick} 
          className="bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-2 px-4 rounded"
        >
          {showDeck ? 'Siguiente' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
};

export default TutorialCard;
