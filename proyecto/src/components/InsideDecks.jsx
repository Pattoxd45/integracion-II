import React, { useEffect, useRef, useState, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosOptions } from "react-icons/io";
import { MdEdit, MdEditOff } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import CardDetails from "./CardDetails"; // Importar CardDetails

const InsideDecks = ({ closeModal, deckName }) => {
  const modalRef = useRef(null);

  // Cartas de ejemplo (placeholder)
  const cards = useMemo(
    () => [
      { id: 1, name: "Carta 1", image: "https://via.placeholder.com/150", mana: "1G", type: "Criatura", power: 3, toughness: 2 },
      { id: 2, name: "Carta 2", image: "https://via.placeholder.com/150", mana: "2U", type: "Hechizo", power: null, toughness: null },
      { id: 3, name: "Carta 3", image: "https://via.placeholder.com/150", mana: "3R", type: "Enchantment", power: null, toughness: null },
      // Más cartas...
    ],
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);
  const [editMode, setEditMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);

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
    setSelectedCardDetails(null);
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
        <div className={`w-${selectedCardDetails ? "[35%]" : "[100%]"} transition-all duration-500`}>
          <h2 className="text-white text-2xl font-bold mb-4">{deckName}</h2>

          {/* Barra de búsqueda, opciones y botón de editar */}
          <div className="flex items-center mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cartas..."
              className="w-full h-[46px] px-4 text-black bg-white rounded-md focus:outline-none"
            />
            <button
              className="ml-[5px] w-[91px] h-[46px] bg-[#E83411] text-white font-semibold rounded-md"
            >
              Buscar
            </button>
            <button
              className="ml-[5px] bg-[#E83411] text-white rounded-[10px] p-[10px] hover:bg-[#b52e0e] transition-colors flex items-center justify-center"
              style={{ width: "46px", height: "46px" }}
            >
              <IoIosOptions className="text-white text-[24px]" />
            </button>
            <button
              className={`ml-[5px] rounded-[10px] p-[10px] transition-colors flex items-center justify-center ${
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
          <div className="overflow-y-auto max-h-[70vh] pr-4">
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
                      <p className="text-gray-400 mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
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
                <p className="text-white">No se encontraron cartas.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-[#E83411] text-[#ddd] rounded-full hover:bg-[#b52e0e] transition-colors p-4">
                <IoIosAdd className="text-[32px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Detalles de la carta seleccionada */}
        {selectedCardDetails && (
          <CardDetails
            selectedCard={selectedCardDetails}
            closeDetails={closeCardDetails}
          />
        )}
      </div>
    </div>
  );
};

export default InsideDecks;
