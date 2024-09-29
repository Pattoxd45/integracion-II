import React, { useEffect, useRef, useState, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosOptions } from "react-icons/io";
import { MdEdit, MdEditOff } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io"; // Importar el ícono de agregar

const InsideDecks = ({ closeModal, deckName }) => {
  const modalRef = useRef(null);

  // Cartas de ejemplo (placeholder)
  const cards = useMemo(
    () => [
      { id: 1, name: "Carta 1", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Carta 2", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Carta 3", image: "https://via.placeholder.com/150" },
      { id: 4, name: "Carta 4", image: "https://via.placeholder.com/150" },
      { id: 5, name: "Carta 5", image: "https://via.placeholder.com/150" },
      { id: 6, name: "Carta 6", image: "https://via.placeholder.com/150" },
      { id: 7, name: "Carta 7", image: "https://via.placeholder.com/150" },
    ],
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);
  const [editMode, setEditMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    setSelectedCards([]); // Limpiar la selección cuando se cambia el modo
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="relative w-[1150px] h-[95vh] max-h-[95vh] p-5 bg-[#000] rounded-lg border-[4px] border-[#E83411] border-opacity-65 overflow-hidden"
      >
        {/* Botón de cerrar */}
        <button
          className="absolute top-2 right-2 text-white hover:text-red-500"
          onClick={closeModal}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Título del modal */}
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
        <div className="overflow-y-auto max-h-[80vh] pr-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="relative flex bg-[#333] p-3 rounded-md"
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
        </div>

        {/* Botones flotantes para eliminar y agregar cartas */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          {editMode && selectedCards.length > 0 && (
            <button
              className="bg-[#E83411] text-white rounded-full p-3 hover:bg-[#b52e0e] transition-colors"
              onClick={handleDelete}
            >
              <FaTrashCan className="text-[24px]" />
            </button>
          )}
          <button className="bg-[#E83411] text-[#ddd] rounded-full hover:bg-[#b52e0e] transition-colors">
            <IoIosAdd className="text-[48px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsideDecks;
