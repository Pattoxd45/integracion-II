import React, { useState, useEffect } from 'react';
import tablero from "../images/imgFormatos/tablero.jpg";

const TutorialCard = () => {
  const [cardImage, setCardImage] = useState(null);
  const [info, setInfo] = useState(null);
  const [info1, setInfo1] = useState(null);
  const [shifted, setShifted] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [deck, setDeck] = useState([]);
  const [step, setStep] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [addedCards, setAddedCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRandomCard();
  }, []);

  const fetchRandomCard = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.scryfall.com/cards/random');
      const data = await response.json();
      if (data.image_uris) {
        setCardImage(data.image_uris.normal);
      } else {
        console.error('No se encontró imagen para esta carta');
      }
    } catch (error) {
      console.error('Error al obtener la carta:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeckCards = async () => {
    setLoading(true);
    const deckPromises = Array.from({ length: 4 }, () => fetch('https://api.scryfall.com/cards/random'));
    const responses = await Promise.all(deckPromises);
    const deckData = await Promise.all(responses.map(response => response.json()));
    setLoading(false);
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

  const areasTablero = [
    { name: 'BattleField', description: 'El costo para jugar esta carta.', style: { top: '2%', left: '1%', width: '73%', height: '67%' } },
    { name: 'Lands', description: 'El nombre de esta carta.', style: { top: '70%', left: '1%', width: '73%', height: '28%' } },
    { name: 'Commander Tax', description: 'Clasificación de la carta.', style: { top: '2%', left: '75%', width: '11%', height: '11%' } },
    { name: 'Comand Zone', description: 'La edición y rareza de la carta.', style: { top: '16%', left: '75%', width: '11%', height: '25%' } },
    { name: 'Library', description: 'Los efectos o habilidades de la carta.', style: { top: '44%', left: '75%', width: '11%', height: '26%' } },
    { name: 'Exile', description: 'Texto narrativo o de ambiente.', style: { top: '72%', left: '75%', width: '11%', height: '27%' } },
    { name: 'Life Total', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '2%', left: '87%', width: '12%', height: '40%' } },
    { name: 'Graveyard', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '44%', left: '87%', width: '12%', height: '54%' } },
    { name: 'Tierra1', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '73%', left: '4%', width: '11%', height: '18%', borderRadius: '100%'}}, 
    { name: 'Tierra2', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '72%', left: '18%', width: '11%', height: '19%', borderRadius: '100%'}},
    { name: 'Tierra3', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '73%', left: '32%', width: '11%', height: '18%', borderRadius: '100%'}},
    { name: 'Tierra4', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '73%', left: '46%', width: '11%', height: '18%', borderRadius: '100%'}},
    { name: 'Tierra5', description: 'La fuerza y resistencia de la carta en combate.', style: { top: '73%', left: '60%', width: '11%', height: '18%', borderRadius: '100%'}},
  ]

  const handleAreaClick = (area) => {
    setInfo(area);
    setShifted(true);
  };

  const handleAreaClick1 = (area) => {
    setInfo1(area);
    setShifted(true);
  };

  const handleNextClick = async () => {
    if (showDeck) {
      if (addedCards.length < 6) {
        alert("Debes agregar al menos 6 cartas para continuar.");
        return;
      } else if (addedCards.length > 10) {
        alert("No puedes agregar más de 10 cartas.");
        return;
      }
      setShowDeck(false);
      fetchRandomCard();
      setInfo(null);
      setShifted(false);
    } else if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }else if (step === 3) {
      setLoading(true);
      const deckCards = await fetchDeckCards();
      setLoading(false);
      setCardImage(null);
      setShowDeck(true);
      setDeck(deckCards);
      setSelectedCards([]);
      setStep(4); 
    }
  };

  const handlePreviousClick = () => {
    if (step > 0) {
      setStep(step - 1);
      setInfo(null);
      setShowDeck(false);
      setCardImage(null);
      
      if (step === 1) {
        setAddedCards([]);
        setDeck([]);
      }
  
      fetchRandomCard();
      setShifted(false);
    } else {
      setShowDeck(false);
      setInfo(null);
      fetchRandomCard();
      setShifted(false);
      setAddedCards([]);
      setDeck([]);
    }
  };

  const handleCardSelect = (cardUrl) => {
    if (selectedCards.includes(cardUrl)) {
      setSelectedCards(selectedCards.filter(url => url !== cardUrl));
    } else {
      setSelectedCards([...selectedCards, cardUrl]);
    }
  };

  const handleAddCards = async () => {
    if (selectedCards.length === 0) {
      alert("Debes seleccionar al menos una carta para agregar.");
      return;
    }
    if (addedCards.length + selectedCards.length > 10) {
      alert("No puedes agregar más de 10 cartas en total.");
      return;
    }
    setAddedCards([...addedCards, ...selectedCards]);
    setSelectedCards([]);
    const newDeckCards = await fetchDeckCards();
    setDeck(newDeckCards);
  };

  const handleFinish = () => {
    // Restablecer todo el estado a la bienvenida
    setStep(0);
    setAddedCards([]);
    setDeck([]);
    setSelectedCards([]);
    setInfo(null);
    setShowDeck(false);
    fetchRandomCard(); // Opcional: puedes mantener la carta actual o generar una nueva
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 space-y-6 mb-6 text-[#e2e7eb] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-center">Tutorial</h1>
      {step === 0 && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Bienvenido al Tutorial de Cartas</h2>
          <p className="mb-4">En este tutorial, aprenderás sobre las diferentes partes de una carta y cómo usarlas en tu juego.</p>
          <button 
            onClick={() => setStep(1)} 
            className="bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-2 px-4 rounded"
          >
            Comenzar
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Reglas Básicas</h2>
          <p className="mb-4">Antes de explorar este tutorial, es importante entender algunas reglas básicas del juego:</p>
          <ul className="mb-4 text-left">
            <li>- Cada jugador comienza con un mazo de cartas.</li>
            <li>- El objetivo es reducir la vida del oponente a cero.</li>
            <li>- Las cartas tienen diferentes tipos y habilidades que pueden afectar el juego.</li>
          </ul>
        </div>
      )}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center">Partes del Tablero</h2>
          <div className="flex items-start">
            <div className={`relative bg-[#12171E] rounded-lg overflow-hidden shadow-xl w-[580px] h-[340px] transition-transform ${shifted ? 'translate-x-[-20%]' : ''}`}>
              {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
              ) : (
                <>
<img
              src={tablero}
              alt="Tablero MTG"
              className="object-contain w-full h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />                  {areasTablero.map((area, index) => (
                    <button
                      key={index}
                      onClick={() => handleAreaClick1(area)}
                      style={{
                        ...area.style,
                        position: 'absolute',
                        background: 'transparent',
                        border: '2px solid transparent',
                      }}
                      className="rounded cursor-pointer"
                    />
                  ))}
                </>
              )}
            </div>
            {info1 && (
              <div className="ml-4 mt-4 p-2 bg-blue-800 text-blue-200 rounded shadow-lg w-[200px] h-[150px] flex flex-col justify-center">
                <h3 className="font-semibold">{info1.name}</h3>
                <p>{info1.description}</p>
              </div>
            )}
          </div>
        </>
      )}
      {step === 3 && !showDeck && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center">Partes de la carta</h2>
          <div className="flex items-start">
            <div className={`relative bg-[#12171E] rounded-lg overflow-hidden shadow-xl w-[300px] h-[450px] transition-transform ${shifted ? 'translate-x-[-20%]' : ''}`}>
              {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <img src={cardImage} alt="Carta MTG" className="object-cover w-full h-full" />
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
              <div className="ml-4 mt-4 p-2 bg-blue-800 text-blue-200 rounded shadow-lg w-[200px] h-[150px] flex flex-col justify-center">
                <h3 className="font-semibold">{info.name}</h3>
                <p>{info.description}</p>
              </div>
            )}
          </div>
        </>
      )}
      {showDeck && (
        <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Selecciona cartas para tu mazo</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex justify-center space-x-4">
            {deck.map((cardUrl, index) => (
              <div
                key={index}
                onClick={() => handleCardSelect(cardUrl)}
                className={`cursor-pointer border ${selectedCards.includes(cardUrl) ? 'border-4 border-green-500' : 'border-2 border-gray-600'}`}
              >
                <img src={cardUrl} alt={`Carta ${index + 1}`} className="w-33 h-auto rounded-lg" />
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-4">
          <button
            onClick={handleAddCards}
            disabled={selectedCards.length < 1} // Desactiva el botón si hay menos de 1 carta seleccionada
            className="bg-green-600 hover:bg-green-700 text-green-200 font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Agregar
          </button>
        </div>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Cartas en tu mazo</h2>
          <div className="flex justify-center space-x-4">
            {addedCards.map((cardUrl, index) => (
              <img key={index} src={cardUrl} alt={`Carta añadida ${index + 1}`} className="w-20 h-auto rounded-lg border-2 border-gray-600" />
            ))}
          </div>
        </div>
      </div>
      )}
      <div className="flex space-x-4">
        {step > 0 && (
          <button 
            onClick={handlePreviousClick} 
            className="bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-2 px-4 rounded"
          >
            Anterior
          </button>
        )}
        {step > 0 && !showDeck && (
          <button 
            onClick={handleNextClick} 
            className="bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-2 px-4 rounded"
          >
            Siguiente
          </button>
        )}
        {showDeck && (
          <button 
            onClick={handleFinish} 
            className="bg-blue-600 hover:bg-blue-700 text-blue-200 font-bold py-2 px-4 rounded"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorialCard;