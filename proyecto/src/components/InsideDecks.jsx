import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosOptions, IoIosAdd } from "react-icons/io";
import { MdEdit, MdEditOff } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import InsideDecksProperties from "./InsideDecksProperties"; // Importamos InsideDecksProperties

const InsideDecks = ({ closeModal, deckName, deckId }) => {
  const navigate = useNavigate(); // Usamos el hook useNavigate para navegar
  const modalRef = useRef(null);

  // Estado para almacenar las cartas en el mazo (inicialmente vacío)
  const [cards, setCards] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);
  const [editMode, setEditMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [activeView, setActiveView] = useState("Cartas"); // Estado para controlar la vista activa (Cartas o Propiedades)

  // Llamada a la API para obtener las cartas del mazo
  useEffect(() => {
    const fetchDeckCards = async () => {
      try {
        const response = await fetch(`https://magicarduct.online:3000/api/mazocartas/${deckId}`);
        if (response.ok) {
          const data = await response.json();
          setCards(data); // Almacenar las cartas del mazo en el estado
        } else {
          console.error("Error al obtener las cartas del mazo");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchDeckCards();
  }, [deckId]);

  useEffect(() => {
    setFilteredCards(cards); // Actualizar las cartas filtradas cuando se actualiza el estado de las cartas
  }, [cards]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [modalRef, closeModal]);

  useEffect(() => {
    const filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchQuery, cards]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedCards([]);
    setSelectedCardDetails(null); // Cerrar detalles de carta si se activa el modo edición
  };

  const toggleSelectCard = (cardId) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleDelete = () => {
    const remainingCards = filteredCards.filter(
      (card) => !selectedCards.includes(card.id)
    );
    setFilteredCards(remainingCards);
    setSelectedCards([]);
  };

  const handleCardClick = (card) => {
    if (!editMode) {
      setSelectedCardDetails(card);
    }
  };

  const closeCardDetails = () => {
    setSelectedCardDetails(null); // Cerrar detalles de carta
  };

  // Función para navegar a la página Cartas.jsx
  const handleAddCardClick = () => {
    navigate("/cartas", { state: { addingCards: true } }); // Navegar a Cartas con la marca de añadir cartas
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="relative w-[1150px] h-[95vh] max-h-[95vh] p-5 bg-[#000] rounded-lg border-[4px] border-[#E83411] border-opacity-65 overflow-hidden flex m-auto"
      >
        {/* Botón de cerrar */}
        <button
          className="absolute top-2 right-2 text-white hover:text-red-500"
          onClick={closeModal}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Contenedor de cartas y detalles */}
        <div className={`relative w-${selectedCardDetails ? "[35%]" : "[100%]"} transition-all duration-500`}>
          <h2 className="text-white text-2xl font-bold mb-4">{deckName}</h2>

          {/* Botones "Cartas" y "Propiedades" */}
          <div className="flex justify-between space-x-2 mb-4">
            <button
              className={`w-full py-3 rounded-md text-xl font-semibold text-center ${
                activeView === "Cartas" ? "bg-[#E83411] text-white" : "bg-[#1E1E1E] text-white"
              }`}
              onClick={() => setActiveView("Cartas")}
            >
              Cartas
            </button>
            <button
              className={`w-full py-3 rounded-md text-xl font-semibold text-center ${
                activeView === "Propiedades" ? "bg-[#E83411] text-white" : "bg-[#1E1E1E] text-white"
              }`}
              onClick={() => setActiveView("Propiedades")}
            >
              Propiedades
            </button>
          </div>

          {/* Contenido de Cartas o Propiedades */}
          {activeView === "Cartas" ? (
            <>
              {/* Barra de búsqueda, opciones y botón de editar */}
              <div className="flex items-center space-x-3 mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar cartas..."
                  className="w-full h-[46px] px-4 text-black bg-white rounded-md focus:outline-none"
                />
                <button
                  className="w-[91px] h-[46px] bg-[#E83411] text-white font-semibold rounded-md text-center"
                >
                  Buscar
                </button>
                <button
                  className="bg-[#E83411] text-white rounded-[10px] p-[10px] hover:bg-[#b52e0e] transition-colors flex items-center justify-center"
                  style={{ width: "46px", height: "46px" }}
                >
                  <IoIosOptions className="text-white text-[24px]" />
                </button>
                <button
                  className={`rounded-[10px] p-[10px] transition-colors flex items-center justify-center ${
                    editMode
                      ? "bg-[#b52e0e] hover:bg-[#8f260c]"
                      : "bg-[#E83411] hover:bg-[#b52e0e]"
                  }`}
                  style={{ width: "46px", height: "46px" }}
                  onClick={toggleEditMode}
                >
                  {editMode ? (
                    <MdEditOff className="text-white text-[24px]" />
                  ) : (
                    <MdEdit className="text-white text-[24px]" />
                  )}
                </button>
              </div>

              {/* Contenedor de cartas con scroll */}
              <div className="overflow-y-auto max-h-[68vh] pr-4 rounded-md">
                <div className="grid grid-cols-1 gap-4">
                  {filteredCards.length > 0 ? (
                    filteredCards.map((card) => (
                      <div
                        key={card.id}
                        className="relative flex bg-[#333] p-3 rounded-md cursor-pointer"
                        onClick={() => handleCardClick(card)}
                      >
                        {/* Imagen a la izquierda */}
                        <div className="w-[150px] flex-shrink-0">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-[120px] object-cover"
                          />
                        </div>

                        {/* Contenido a la derecha */}
                        <div className="ml-4 flex-grow">
                          <h3 className="text-white text-xl font-bold">{card.name}</h3>
                          <p className="text-gray-400 mt-2">{card.type}</p>
                        </div>

                        {/* Circulo de selección */}
                        {editMode && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div
                              className={`relative w-5 h-5 rounded-full border-2 ${
                                selectedCards.includes(card.id)
                                  ? "bg-[#E83411] border-[#E83411]"
                                  : "bg-white border-gray-300"
                              }`}
                              onClick={() => toggleSelectCard(card.id)}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No se han agregado cartas a este mazo.</p>
                  )}
                </div>
              </div>

              {/* Botones de añadir y eliminar cartas */}
              <div className="flex justify-end space-x-4 mt-4">
                {selectedCards.length > 0 && (
                  <button
                    onClick={handleDelete}
                    className="bg-[#E83411] text-[#ddd] rounded-full hover:bg-[#b52e0e] transition-colors p-3 flex items-center justify-center"
                    style={{ width: "46px", height: "46px" }}
                  >
                    <FaTrashCan className="text-[20px]" />
                  </button>
                )}

                <button
                  onClick={handleAddCardClick} // Navega a Cartas.jsx
                  className="bg-[#E83411] text-[#ddd] rounded-full hover:bg-[#b52e0e] transition-colors p-3 flex items-center justify-center"
                  style={{ width: "46px", height: "46px" }}
                >
                  <IoIosAdd className="text-[20px]" />
                </button>
              </div>
            </>
          ) : (
            <InsideDecksProperties />
          )}
        </div>

        {/* Detalles de la carta seleccionada */}
        {selectedCardDetails && (
          <div className="w-[65%] bg-[#222] ml-4 p-5 rounded-lg text-white flex">
            {/* Imagen de la carta */}
            <div className="w-[50%] flex-shrink-0">
              <img
                src={selectedCardDetails.image}
                alt={selectedCardDetails.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Descripciones de la carta */}
            <div className="ml-6 w-[50%] flex flex-col">
              <button
                className="self-end text-white hover:text-red-500 mb-4"
                onClick={closeCardDetails}
              >
                Cerrar
              </button>
              <h2 className="text-3xl font-bold">{selectedCardDetails.name}</h2>
              <p className="mt-4 text-lg">
                Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className="mt-2">Mana: {selectedCardDetails.mana || "Desconocido"}</p>
              <p className="mt-2">Tipo: {selectedCardDetails.type || "Desconocido"}</p>
              <p className="mt-2">
                Poder/Toughness: {selectedCardDetails.power || "N/A"} /{" "}
                {selectedCardDetails.toughness || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsideDecks;
