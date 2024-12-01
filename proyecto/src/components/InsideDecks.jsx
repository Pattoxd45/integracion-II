import React, { useEffect, useRef, useState, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdEdit, MdEditOff } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { IoMdTrash } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import ScaleLoader from "react-spinners/ScaleLoader";
import InsideDecksProperties from "./InsideDecksProperties";
import { useNavigate } from "react-router-dom";

const InsideDecks = ({ closeModal, deckName, deckId }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [activeView, setActiveView] = useState("Cartas");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [symbols, setSymbols] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1120);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1120);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch color symbols from Scryfall
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch("https://api.scryfall.com/symbology");
        const data = await response.json();
        const colorSymbols = {};

        data.data.forEach((symbol) => {
          if (symbol.colors && symbol.colors.length === 1) {
            colorSymbols[symbol.colors[0]] = symbol.svg_uri;
          }
        });

        setSymbols(colorSymbols);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };

    fetchSymbols();
  }, []);

  const fetchDeckCards = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/mazocartas/${deckId}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener las cartas del mazo");
      }
      const deckCards = await response.json();
      const deckCardsData = [];

      for (const card of deckCards) {
        const cardId = card.IDcarta;
        const cardResponse = await fetch(
          `https://api.scryfall.com/cards/${cardId}`
        );
        if (cardResponse.ok) {
          const cardData = await cardResponse.json();
          deckCardsData.push({
            id: cardData.id,
            name: cardData.name,
            imageUrl:
              cardData.image_uris?.png ||
              `${process.env.PUBLIC_URL}/Cartas2.png`,
            mana_cost: cardData.mana_cost,
            oracle_text: cardData.oracle_text,
            cmc: cardData.cmc,
            type_line: cardData.type_line,
            colors: cardData.colors,
            lang: "en",
          });
        } else {
          console.error(`Error al obtener la carta con ID ${cardId}`);
        }
      }

      setCards(deckCardsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error en la petición:", error);
      setIsLoading(false);
    }
  }, [deckId]); // Aquí `deckId` es la única dependencia

  useEffect(() => {
    fetchDeckCards();
  }, [fetchDeckCards]); // Ahora `fetchDeckCards` está correctamente como dependencia

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  const handleCardClick = (card) => {
    if (!editMode) setSelectedCard(card);
  };

  const closeCardDetails = () => {
    setSelectedCard(null);
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    },
    [closeModal] // `closeModal` debería venir del componente padre
  );

  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleOutsideClick, handleEscapeKey]);

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
    setSelectedCards([]);
  };

  const handleSelectCard = (cardId) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(cardId)
        ? prevSelected.filter((id) => id !== cardId)
        : [...prevSelected, cardId]
    );
  };

  const deleteSelectedCards = async () => {
    for (const cardId of selectedCards) {
      try {
        await fetch(
          `https://magicarduct.online:3000/api/eliminarmazocarta/${deckId}/${cardId}`,
          {
            method: "DELETE",
          }
        );
      } catch (error) {
        console.error(
          `Error al eliminar la carta con ID ${cardId} del mazo:`,
          error
        );
      }
    }
    fetchDeckCards();
    setSelectedCards([]);
  };

  // Function to truncate text
  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  const replaceManaSymbols = (text, symbols) => {
    if (!text) return null;

    const parts = text.split(/(\{.*?\})/); // Dividir por símbolos {X}
    return parts.map((part, index) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        const value = part.replace(/[{}]/g, ""); // Quitar llaves
        return isNaN(value) ? (
          <span
            key={index}
            className="inline-flex items-center"
            style={{
              marginRight: "1px", // Separación de 1px
              verticalAlign: "middle", // Alinear con el texto
            }}
          >
            <img
              src={symbols[value]}
              alt={value}
              className="w-6 h-6 inline-block"
              style={{
                verticalAlign: "middle", // Asegura que esté alineado con texto
              }}
            />
          </span>
        ) : (
          <span
            key={index}
            className="w-6 h-6 inline-flex justify-center items-center rounded-full bg-[#CAC5C0] text-black text-sm font-bold"
            style={{
              lineHeight: "1",
              fontWeight: "bold",
              verticalAlign: "middle", // Alinear con el texto
              marginRight: "1px", // Separación de 1px
            }}
          >
            {value}
          </span>
        );
      }
      return (
        <span
          key={index}
          style={{
            marginRight: "1px", // Asegurar separación de 1px entre partes normales
            verticalAlign: "middle", // Mantener alineado con símbolos
          }}
        >
          {part}
        </span>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="relative w-[1250px] h-[95vh] max-h-[95vh] p-5 bg-[#0b0f14] rounded-lg border-[1px] border-[rgba(255,255,255,0.1)] overflow-hidden flex m-auto"
      >
        <button
          className="absolute top-2 right-2 text-[#e1e6ea] hover:opacity-70 transition"
          onClick={closeModal}
        >
          <AiOutlineClose size={24} />
        </button>

        <div
          className={`relative transition-all duration-500 ${
            selectedCard && !isSmallScreen ? "w-[28%] mr-6" : "w-full"
          }`}
        >
          <h2 className="text-[#e1e6ea] text-2xl font-bold mb-4">{deckName}</h2>

          <div className="flex justify-between space-x-2 mb-4">
            <button
              className={`w-full h-[46px] rounded-md text-lg font-semibold text-center ${
                activeView === "Cartas"
                  ? "bg-[#2a5880] text-[#e1e6ea]"
                  : "bg-[#9ebbd6] text-[#e1e6ea]"
              }`}
              onClick={() => setActiveView("Cartas")}
            >
              Cartas
            </button>
            <button
              className={`w-full h-[46px] rounded-md text-lg font-semibold text-center ${
                activeView === "Propiedades"
                  ? "bg-[#2a5880] text-[#e1e6ea]"
                  : "bg-[#9ebbd6] text-[#e1e6ea]"
              }`}
              onClick={() => {
                closeCardDetails();
                setActiveView("Propiedades");
              }}
            >
              Propiedades
            </button>
          </div>

          {activeView === "Cartas" ? (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar cartas..."
                  className="flex-grow h-[46px] px-4 text-black bg-white rounded-md focus:outline-none min-w-[200px]"
                />
                <button
                  className="h-[46px] bg-[#2a5880] text-[#e1e6ea] font-semibold rounded-md text-center hover:opacity-80 transition"
                  style={{ width: "91px" }}
                >
                  Buscar
                </button>
                <button
                  className="w-[46px] h-[46px] bg-[#2a5880] text-[#e1e6ea] font-semibold rounded-md text-center hover:opacity-80 transition flex items-center justify-center"
                  onClick={() => {
                    toggleEditMode();
                    closeCardDetails();
                  }}
                >
                  {editMode ? <MdEditOff size={20} /> : <MdEdit size={20} />}
                </button>
              </div>

              <div className="overflow-y-auto h-[80%] rounded-md custom-scrollbar mb-4">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <ScaleLoader color="#e1e6ea" height={35} />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    {filteredCards.length > 0 ? (
                      filteredCards.map((card) => (
                        <div
                          key={card.id}
                          onClick={() =>
                            isSmallScreen
                              ? setSelectedCard(card)
                              : handleCardClick(card)
                          }
                          className="mr-[6px] flex items-center bg-[#12171e] rounded-lg cursor-pointer relative"
                          style={{ height: "132px" }}
                        >
                          <img
                            src={card.imageUrl}
                            alt={card.name}
                            className="object-cover rounded-none"
                            style={{
                              width: "165px",
                              height: "100%",
                              objectPosition: "top",
                            }}
                          />
                          <div className="ml-4">
                            <h4 className="text-[#e1e6ea] text-lg truncate">
                              {truncateText(card.name, 15)}
                            </h4>
                            <div className="flex mt-1">
                              {Array.isArray(card.colors) &&
                                card.colors.map((color) => (
                                  <img
                                    key={color}
                                    src={symbols[color]}
                                    alt={color}
                                    className="w-6 h-6 mr-1"
                                  />
                                ))}
                            </div>
                          </div>
                          {editMode && (
                            <input
                              type="checkbox"
                              checked={selectedCards.includes(card.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleSelectCard(card.id);
                              }}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-[#e1e6ea]">
                        No se han encontrado cartas en este mazo.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <InsideDecksProperties cards={cards} />
          )}
        </div>

        {selectedCard && isSmallScreen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
            <div className="relative w-[90%] max-w-[400px] h-[80%] max-h-[600px] bg-[#12171E] rounded-lg p-6 shadow-lg">
              <button
                onClick={closeCardDetails}
                className="absolute top-2 right-2 text-[#e1e6ea] hover:text-gray-400 transition"
              >
                <AiOutlineClose size={24} />
              </button>
              <div className="overflow-y-auto h-full text-[#e1e6ea] flex flex-col items-center">
                <img
                  src={selectedCard.imageUrl}
                  alt={selectedCard.name}
                  className="w-[250px] h-auto object-cover mb-4"
                />
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">{selectedCard.name}</h2>
                  <p className="text-lg flex justify-center items-center gap-1">
                    {replaceManaSymbols(selectedCard.mana_cost, symbols)}
                  </p>
                </div>
                <div className="text-center mb-4">
                  <p className="text-md italic">{selectedCard.type_line}</p>
                </div>
                <div className="text-left mb-4">
                  {selectedCard.oracle_text ? (
                    selectedCard.oracle_text.split("\n").map((line, index) => (
                      <p key={index} className="mb-2">
                        {replaceManaSymbols(line, symbols)}
                      </p>
                    ))
                  ) : (
                    <p className="text-[#e1e6ea] italic">
                      No hay texto disponible.
                    </p>
                  )}
                </div>
                {selectedCard.power && selectedCard.toughness && (
                  <div className="text-center">
                    <p className="text-lg">
                      {selectedCard.power}/{selectedCard.toughness}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedCard && !isSmallScreen && (
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[68.25%] h-[95%] bg-[#12171E] p-6 text-[#e1e6ea] overflow-y-auto flex rounded-lg mr-4 custom-scrollbar">
            <button
              onClick={closeCardDetails}
              className="absolute top-2 left-6 text-[#e1e6ea] hover:text-[#85888b] transition"
            >
              <BiArrowBack size={24} />
            </button>
            <div className="flex items-center w-full justify-center">
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.name}
                className="w-[500px] h-auto object-cover mr-1"
              />
              <div className="ml-4 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold">{selectedCard.name}</h2>
                  <p className="text-xl flex items-center">
                    {replaceManaSymbols(selectedCard.mana_cost, symbols)}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg italic">{selectedCard.type_line}</p>
                </div>
                <div className="mb-4">
                  {selectedCard.oracle_text ? (
                    selectedCard.oracle_text.split("\n").map((line, index) => (
                      <p key={index} className="mb-2">
                        {replaceManaSymbols(line, symbols)}
                      </p>
                    ))
                  ) : (
                    <p className="text-[#e1e6ea] italic">
                      No hay texto disponible.
                    </p>
                  )}
                </div>
                {selectedCard.power && selectedCard.toughness && (
                  <div className="mt-auto">
                    <p className="text-xl font-bold">
                      {selectedCard.power}/{selectedCard.toughness}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 right-4 flex space-x-4">
          {editMode && selectedCards.length > 0 && (
            <button
              onClick={deleteSelectedCards}
              className="bg-[#2a5880] text-white p-3 rounded-md shadow-lg hover:bg-[#1a2c3a] transition"
            >
              <IoMdTrash size={24} />
            </button>
          )}
          <button
            onClick={() => navigate("/cartas")}
            className="bg-[#2a5880] text-white p-3 rounded-md shadow-lg hover:bg-[#1a2c3a] transition"
          >
            <IoIosAdd size={24} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default InsideDecks;
