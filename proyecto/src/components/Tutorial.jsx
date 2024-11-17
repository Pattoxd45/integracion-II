import React, { useState, useEffect } from "react";
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
      const response = await fetch("https://api.scryfall.com/cards/random");
      const data = await response.json();
      if (data.image_uris) {
        setCardImage(data.image_uris.normal);
      } else {
        console.error("No se encontró imagen para esta carta");
      }
    } catch (error) {
      console.error("Error al obtener la carta:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeckCards = async () => {
    setLoading(true);
    const deckPromises = Array.from({ length: 4 }, () =>
      fetch("https://api.scryfall.com/cards/random"),
    );
    const responses = await Promise.all(deckPromises);
    const deckData = await Promise.all(
      responses.map((response) => response.json()),
    );
    setLoading(false);
    return deckData
      .filter((data) => data.image_uris)
      .map((data) => data.image_uris.normal);
  };

  const areas = [
    {
      name: "Costo de Mana",
      description: "El costo para jugar esta carta.",
      style: { top: "1%", left: "70%", width: "26%", height: "8%" },
    },
    {
      name: "Nombre de la Carta",
      description: "El nombre de esta carta.",
      style: { top: "1%", left: "3%", width: "65%", height: "8%" },
    },
    {
      name: "Supertipo / Tipo / Subtipo",
      description: "Clasificación de la carta.",
      style: { top: "57%", left: "3%", width: "75%", height: "6%" },
    },
    {
      name: "Edición / Rareza",
      description: "La edición y rareza de la carta.",
      style: { top: "57%", left: "79%", width: "18%", height: "6%" },
    },
    {
      name: "Habilidades",
      description: "Los efectos o habilidades de la carta.",
      style: { top: "63%", left: "3%", width: "94%", height: "28%" },
    },
    {
      name: "Texto Decorativo (Flavor)",
      description: "Texto narrativo o de ambiente.",
      style: { top: "90%", left: "3%", width: "60%", height: "8%" },
    },
    {
      name: "Poder / Resistencia",
      description: "La fuerza y resistencia de la carta en combate.",
      style: { top: "90%", left: "77%", width: "20%", height: "8%" },
    },
  ];

  const areasTablero = [
    {
      name: "BattleField",
      description:
        "Descripción: Es la zona principal donde se desarrolla el juego. Incluye todas las cartas permanentes en juego: criaturas, encantamientos, artefactos y planeswalkers. <br> Función: Aquí es donde atacas y defiendes, se resuelven habilidades y efectos, y se llevan a cabo la mayoría de las interacciones del juego.",
      style: { top: "2%", left: "1%", width: "73%", height: "67%" },
    },
    {
      name: "Lands",
      description:
        "Ubicación: Campo de Batalla. <br> Función: Producen maná, que es necesario para jugar otras cartas. Puedes jugar una tierra por turno (a menos que se indique lo contrario) y puedes tener una cantidad ilimitada de tierras en el campo de batalla.",
      style: { top: "70%", left: "1%", width: "73%", height: "28%" },
    },
    {
      name: "Commander Tax",
      description:
        "Descripción: No es una zona en sí, sino una regla que se aplica a las cartas en la zona de comando. <br> Función: Cada vez que lanzas a tu comandante desde la zona de comando después de haberlo hecho previamente, debes pagar 2 manás incoloros adicionales al costo de su lanzamiento.",
      style: { top: "2%", left: "75%", width: "11%", height: "11%" },
    },
    {
      name: "Comand Zone",
      description:
        "Ubicación: Fuera del juego. <br> Función: En formatos como Commander, esta es la zona donde se coloca tu comandante. Puede ser invocado desde aquí, y tiene reglas especiales que lo diferencian de otras cartas.",
      style: { top: "16%", left: "75%", width: "11%", height: "25%" },
    },
    {
      name: "Library",
      description:
        "Ubicación: Invisible hasta que se roba. <br> Función: Es la zona donde se encuentran las cartas no jugadas. Cada jugador comienza con un mazo en su biblioteca, y al inicio de cada turno, robas la carta superior.",
      style: { top: "44%", left: "75%", width: "11%", height: "26%" },
    },
    {
      name: "Exile",
      description:
        "Ubicación: Fuera del juego. <br> Función: Las cartas exiliadas se colocan en esta zona y no se pueden acceder a menos que una carta permita hacerlo. Es común que se exilien criaturas o hechizos como parte de sus efectos.",
      style: { top: "72%", left: "75%", width: "11%", height: "27%" },
    },
    {
      name: "Life Total",
      description:
        "Ubicación: Normalmente se lleva un registro separado. <br> Función: Cada jugador tiene un total de vida que comienza en 20. El objetivo del juego es reducir la vida de tus oponentes a 0. Puedes llevar un contador o anotar en papel.",
      style: { top: "2%", left: "87%", width: "12%", height: "40%" },
    },
    {
      name: "Graveyard",
      description:
        "Ubicación: Fuera de la vista del jugador, pero accesible. <br> Función: Aquí van las cartas que han sido destruidas, utilizadas o descartadas. Muchas cartas pueden interactuar con el cementerio, permitiendo recuperar cartas o utilizar sus efectos.",
      style: { top: "44%", left: "87%", width: "12%", height: "54%" },
    },
    {
      name: "Swamp",
      description:
        "Representa el maná negro. Las tierras de tipo Pantano generan maná negro, usado comúnmente en estrategias de sacrificio, manipulación del cementerio y efectos de drenaje de vida.",
      style: {
        top: "73%",
        left: "4%",
        width: "11%",
        height: "18%",
        borderRadius: "100%",
      },
    },
    {
      name: "Forest",
      description:
        "Representa el maná verde. Los Bosques producen maná verde, que se utiliza para invocar criaturas grandes, ramp (aceleración de maná) y hechizos que fortalecen criaturas.",
      style: {
        top: "72%",
        left: "18%",
        width: "11%",
        height: "19%",
        borderRadius: "100%",
      },
    },
    {
      name: "Plains",
      description:
        "Representa el maná blanco. Las Llanuras generan maná blanco, que se enfoca en estrategias de control, protección, y ganar vida.",
      style: {
        top: "73%",
        left: "32%",
        width: "11%",
        height: "18%",
        borderRadius: "100%",
      },
    },
    {
      name: "Island",
      description:
        "Representa el maná azul. Las Islas producen maná azul, asociado con la manipulación del oponente mediante contrahechizos, robar cartas y control del juego.",
      style: {
        top: "73%",
        left: "46%",
        width: "11%",
        height: "18%",
        borderRadius: "100%",
      },
    },
    {
      name: "Mountain",
      description:
        "Representa el maná rojo. Las Montañas generan maná rojo, que se usa en estrategias agresivas y de daño directo, enfocadas en la rapidez y la destrucción de criaturas oponentes.",
      style: {
        top: "73%",
        left: "60%",
        width: "11%",
        height: "18%",
        borderRadius: "100%",
      },
    },
  ];

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
    } else if (step === 3) {
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
      setSelectedCards(selectedCards.filter((url) => url !== cardUrl));
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
          <h2 className="text-2xl font-semibold mb-6">
            Bienvenido al Tutorial de Cartas
          </h2>
          <p className="mb-4">
            ¡Felicitaciones por dar el primer paso en el increíble mundo de
            Magic: The Gathering!
          </p>
          <p className="mb-4">
            {" "}
            Este juego de cartas coleccionables te permitirá enfrentarte a otros
            jugadores usando un mazo de cartas personalizadas, combinando
            estrategia, táctica y magia.{" "}
          </p>
          <p className="mb-4">
            {" "}
            En este tutorial, aprenderás lo básico para comenzar a jugar: cómo
            construir tu mazo, las reglas esenciales del juego, y algunas
            estrategias para que puedas empezar a disfrutar de la experiencia.
            No te preocupes si al principio parece complicado; aquí te guiamos
            paso a paso para que puedas comenzar a jugar y disfrutar al máximo
            de Magic.{" "}
          </p>
          <p className="mb-4">
            {" "}
            <strong>¿Estás listo para comenzar tu aventura mágica?</strong>{" "}
            ¡Vamos allá!
          </p>
          <button
            onClick={() => setStep(1)}
            className="mt-2 px-4 py-2 bg-[#2a5880] text-white text-base md:text-lg sm:text-sm rounded hover:shadow-[0_0_30px_rgba(45,89,128,1)]"
          >
            Comenzar
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Reglas Básicas</h2>
          <p className="mb-4">
            Antes de explorar este tutorial, es importante entender algunas
            reglas básicas del juego:
          </p>
          <ul className="mb-4 text-left">
            <li>- Cada jugador comienza con un mazo de cartas.</li>
            <li>- El objetivo es reducir la vida del oponente a cero.</li>
            <li>
              - Las cartas tienen diferentes tipos y habilidades que pueden
              afectar el juego.
            </li>
          </ul>
        </div>
      )}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Partes del Tablero
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div
              className={`relative bg-[#12171E] rounded-lg overflow-hidden shadow-xl w-full md:w-[580px] h-[300px] md:h-[340px] transition-transform ${
                shifted && "md:translate-x-[-20%]"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <img
                    src={tablero}
                    alt="Tablero MTG"
                    className="object-contain w-full h-full"
                  />
                  {areasTablero.map((area, index) => (
                    <button
                      key={index}
                      onClick={() => handleAreaClick1(area)}
                      style={{
                        ...area.style,
                        position: "absolute",
                        background: "transparent",
                        border: "2px solid transparent",
                      }}
                      className="rounded cursor-pointer"
                    />
                  ))}
                </>
              )}
            </div>
            {info1 && (
              <div className="relative mt-4 md:mt-0 md:ml-4 p-4 bg-[#12171E] text-blue-200 rounded shadow-lg w-full md:w-[300px] flex flex-col justify-start">
                {/* Botón de cierre */}
                <button
                  onClick={() => setInfo1(null)}
                  className="absolute top-2 right-2 text-blue-200 hover:text-white font-bold text-lg"
                >
                  ×
                </button>
                <h3 className="font-semibold text-center md:text-left">
                  {info1.name}
                </h3>
                <p className="text-center md:text-left">{info1.description}</p>
              </div>
            )}
          </div>
        </>
      )}
      {step === 3 && !showDeck && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Partes de la carta
          </h2>
          <div className="flex flex-col lg:flex-row items-start justify-center">
            <div
              className={`relative bg-[#12171E] rounded-lg overflow-hidden shadow-xl w-full sm:w-[300px] lg:w-[350px] h-[450px] transition-transform ${shifted ? "lg:translate-x-[-20%]" : ""}`}
            >
              {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
              ) : (
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
                        position: "absolute",
                        background: "transparent",
                        border: "2px solid blue",
                      }}
                      className="rounded cursor-pointer"
                    />
                  ))}
                </>
              )}
            </div>
            {info && (
              <div className="ml-0 lg:ml-4 mt-4 p-2 bg-[#12171E] text-blue-200 rounded shadow-lg w-full sm:w-[300px] h-[150px] flex flex-col justify-center">
                <button
                  onClick={() => setInfo1(null)}
                  className="absolute top-2 right-2 text-blue-200 hover:text-white font-bold text-lg"
                >
                  ×
                </button>
                <h3 className="font-semibold">{info.name}</h3>
                <p>{info.description}</p>
              </div>
            )}
          </div>
        </>
      )}
      {showDeck && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Selecciona cartas para tu mazo
          </h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
              {deck.map((cardUrl, index) => (
                <div
                  key={index}
                  onClick={() => handleCardSelect(cardUrl)}
                  className={`cursor-pointer border ${selectedCards.includes(cardUrl) ? "border-4 border-green-500" : "border-2 border-gray-600"}`}
                >
                  <img
                    src={cardUrl}
                    alt={`Carta ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <button
              onClick={handleAddCards}
              disabled={selectedCards.length < 1} // Desactiva el botón si hay menos de 1 carta seleccionada
              className="mt-2 px-4 py-2 bg-[#2a5880] text-white text-base md:text-lg sm:text-sm rounded hover:shadow-[0_0_30px_rgba(45,89,128,1)]"
            >
              Agregar
            </button>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Cartas en tu mazo</h2>
            <div className="flex flex-wrap justify-center space-x-4">
              {addedCards.map((cardUrl, index) => (
                <img
                  key={index}
                  src={cardUrl}
                  alt={`Carta añadida ${index + 1}`}
                  className="w-20 h-auto rounded-lg border-2 border-gray-600 mb-4"
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center space-x-4 mt-4">
        {step > 0 && (
          <button
            onClick={handlePreviousClick}
            className="mt-2 px-4 py-2 bg-[#2a5880] text-white text-base md:text-lg sm:text-sm rounded hover:shadow-[0_0_30px_rgba(45,89,128,1)]"
          >
            Anterior
          </button>
        )}
        {step > 0 && !showDeck && (
          <button
            onClick={handleNextClick}
            className="mt-2 px-4 py-2 bg-[#2a5880] text-white text-base md:text-lg sm:text-sm rounded hover:shadow-[0_0_30px_rgba(45,89,128,1)]"
          >
            Siguiente
          </button>
        )}
        {showDeck && (
          <button
            onClick={handleFinish}
            className="mt-2 px-4 py-2 bg-[#2a5880] text-white text-base md:text-lg sm:text-sm rounded hover:shadow-[0_0_30px_rgba(45,89,128,1)]"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorialCard;
