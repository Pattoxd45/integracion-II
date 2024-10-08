import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { IoIosOptions } from "react-icons/io"; 
import InsideDecks from "./InsideDecks"; // Importamos InsideDecks

const Decks = () => {
  const [toggleSelection, setToggleSelection] = useState("Baraja");
  const [deckView, setDeckView] = useState("Mis Barajas");
  const [selectedDeck, setSelectedDeck] = useState(null); // Estado para la baraja seleccionada
  const [showInsideDecks, setShowInsideDecks] = useState(false); // Controla la visibilidad del modal
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el valor del buscador
  const [filteredDecks, setFilteredDecks] = useState([]); // Estado para las barajas filtradas

  // Lista de barajas
  const decks = [
    { id: 1, name: "Baraja 1" },
    { id: 2, name: "Baraja 2" },
    { id: 3, name: "Baraja 3" },
    { id: 4, name: "Baraja 4" },
    { id: 5, name: "Baraja 5" },
  ];

  // Función para abrir InsideDecks
  const openInsideDecks = (deck) => {
    setSelectedDeck(deck);
    setShowInsideDecks(true);
  };

  // Función para cerrar InsideDecks
  const closeInsideDecks = () => {
    setSelectedDeck(null);
    setShowInsideDecks(false);
  };

  // Función para manejar el cambio en el buscador y filtrar las barajas
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    // Filtramos las barajas según el texto ingresado en el buscador
    const filtered = decks.filter(deck =>
      deck.name.toLowerCase().includes(query)
    );
    
    setFilteredDecks(filtered);
  };

  // Si hay una búsqueda activa, mostramos las barajas filtradas; si no, mostramos todas las barajas
  const displayedDecks = searchQuery ? filteredDecks : decks;

  return (
    <div className="max-w-[1200px] mx-auto relative">
      {/* Contenedor de los botones */}
      <div className="flex justify-center space-x-[10px]">
        <button
          className={`w-[595px] h-[46px] font-semibold rounded-md ${
            deckView === "Mis Barajas" ? "bg-[#E83411] text-white" : "bg-[#1E1E1E] text-white"
          }`}
          onClick={() => setDeckView("Mis Barajas")}
        >
          Mis Barajas
        </button>
        <button
          className={`w-[595px] h-[46px] font-semibold rounded-md ${
            deckView === "Explorar Barajas" ? "bg-[#E83411] text-white" : "bg-[#1E1E1E] text-white"
          }`}
          onClick={() => setDeckView("Explorar Barajas")}
        >
          Explorar Barajas
        </button>
      </div>

      {/* Contenedor del buscador, toggle y botón "Buscar" */}
      <div className="flex mt-[20px] space-x-[6px] items-center">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscador..."
          value={searchQuery}
          onChange={handleSearchChange} // Maneja los cambios en el input
          className="w-[1000px] h-[46px] bg-[#000] text-white px-4 rounded-md outline-none"
        />

        {/* Toggle Switch */}
        <div className="flex w-[154px] h-[46px] rounded-md border border-[#ddd]">
          <div
            className={`flex-1 flex items-center justify-center cursor-pointer rounded-l-md ${
              toggleSelection === "Baraja" ? "bg-[#E83411] text-white" : "bg-[#1E1E1E] text-white"
            }`}
            onClick={() => setToggleSelection("Baraja")}
          >
            Baraja
          </div>
          <div
            className={`flex-1 flex items-center justify-center cursor-pointer rounded-r-md ${
              toggleSelection === "Carta" ? "bg-[#E83411] text-white" : "bg-[#1E1E1E] text-white"
            }`}
            onClick={() => setToggleSelection("Carta")}
          >
            Cartas
          </div>
        </div>

        {/* Botón "Buscar" */}
        <button className="w-[91px] h-[46px] bg-[#E83411] text-white font-semibold rounded-md">
          Buscar
        </button>
      </div>

      {/* Contenedor de barajas y botón */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[25px] justify-center mt-[20px] mb-[25px] items-start">
        {/* Mapeo de las barajas filtradas o completas */}
        {displayedDecks.map((deck) => (
          <div key={deck.id} className="font-bold">
            {/* Representación de la baraja */}
            <div
              className="w-[220px] h-[320px] bg-black border-[4px] border-[#E83411] rounded-md cursor-pointer"
              onClick={() => openInsideDecks(deck)} // Abre InsideDecks al hacer clic en una baraja
            ></div>
            {/* Contenedor para nombre y opciones */}
            <div className="mt-1 text-black flex justify-between items-center">
              {/* Nombre de la baraja */}
              <p>{deck.name}</p>
              {/* Ícono de opciones */}
              <SlOptions className="text-black cursor-pointer hover:text-[#E83411]" />
            </div>
          </div>
        ))}

        {/* Botón para añadir más barajas */}
        <div className="flex w-[220px] h-[320px] justify-center items-center bg-[#4747474b] border-[4px] border-[#00000075] rounded-md">
          <IoMdAddCircleOutline className="text-black text-[80px] cursor-pointer hover:text-[#E83411]" />
        </div>
      </div>

      {/* Renderiza InsideDecks si se selecciona una baraja */}
      {showInsideDecks && (
        <InsideDecks deckName={selectedDeck.name} closeModal={closeInsideDecks} />
      )}

      {/* Contenedor para el botón flotante */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[1200px]">
        <div className="flex justify-end">
          <button
            className="bg-[#E83411] text-white rounded-[10px] p-[10px] hover:bg-[#b52e0e] transition-colors flex items-center justify-center"
            style={{ width: "50px", height: "50px" }} // Tamaño del botón
          >
            <IoIosOptions className="text-white text-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Decks;
