import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Favorites from "./Favorites";
import FilterSection from "./FilterSection";
import { useUser } from "./UserContext";

const Cartas = () => {
  const { userId } = useUser();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    order: "name",
    dir: "auto",
    colors: [],
    cdm: "",
    power: "",
    toughness: "",
    type: "",
    edition: "",
    subtype: "",
  });
  const [sets, setSets] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [cardToAdd, setCardToAdd] = useState(null);
  const [showCardExistsModal, setShowCardExistsModal] = useState(false);
  const modalRef = useRef(null);

  const toggleFilters = () => setShowFilters(!showFilters);

  useEffect(() => {
    fetchFavorites();
    fetchDecks();
    fetch("https://api.scryfall.com/sets")
      .then((res) => res.json())
      .then((data) => setSets(data.data || []));
    fetch("https://api.scryfall.com/catalog/card-types")
      .then((res) => res.json())
      .then((data) => setSubtypes(data.data || []));
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/cartasfavoritas/${userId}`,
      );
      if (!response.ok) throw new Error("Error en la solicitud");
      const data = await response.json();
      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      setFavorites([]);
    }
  };

  const fetchDecks = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`,
      );
      if (!response.ok) throw new Error("Error al obtener las barajas");
      const data = await response.json();
      setDecks(data);
    } catch (error) {
      console.error("Error al obtener barajas:", error);
    }
  };

  const fetchCards = useCallback(() => {
    setLoading(true);
    const colorsQuery = filter.colors.length
      ? `+color:${filter.colors.join(",")}`
      : "";
    const cdmQuery = filter.cdm ? `+cmc=${filter.cdm}` : "";
    const powerQuery = filter.power ? `+pow=${filter.power}` : "";
    const toughnessQuery = filter.toughness ? `+tou=${filter.toughness}` : "";
    const typeQuery = filter.type ? `+type:${filter.type}` : "";
    const editionQuery = filter.edition ? `+set:${filter.edition}` : "";
    const subtypeQuery = filter.subtype ? `+type:${filter.subtype}` : "";

    fetch(
      `https://api.scryfall.com/cards/search?q=${encodeURIComponent(searchQuery)}${colorsQuery}${cdmQuery}${powerQuery}${toughnessQuery}${typeQuery}${editionQuery}${subtypeQuery}&order=${filter.order}&dir=${filter.dir}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        setLoading(false);
        setCards([]);
      });
  }, [searchQuery, filter]);

  useEffect(() => {
    fetchCards();
  }, [searchQuery, filter, fetchCards]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => setSearchQuery(event.target.value);
  const handleFilterChange = (field) => (event) =>
    setFilter((prev) => ({ ...prev, [field]: event.target.value }));
  const handleColorsChange = (event) => {
    const { value, checked } = event.target;
    setFilter((prev) => ({
      ...prev,
      colors: checked
        ? [...prev.colors, value]
        : prev.colors.filter((color) => color !== value),
    }));
  };

  const toggleDeckModal = (card) => {
    if (cardToAdd === card) {
      setShowModal(!showModal);
    } else {
      setCardToAdd(card);
      setShowModal(true);
    }
  };

  const handleDeckSelect = async (deck) => {
    setSelectedDeck(deck);
    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/mazocartas/${deck.idbarajas}`,
      );
      const deckCards = await response.json();
      const cardExistsInDeck = deckCards.some(
        (deckCard) => deckCard.IDcarta === cardToAdd.id,
      );

      if (cardExistsInDeck) {
        setShowCardExistsModal(true);
        setSelectedDeck(null); // Limpiar la selección del mazo
      } else {
        setShowModal(false); // Ocultar el modal de selección
      }
    } catch (error) {
      console.error(
        "Error al verificar si la carta existe en la baraja:",
        error,
      );
    }
  };

  const handleAddCardsToDeck = async () => {
    if (!selectedDeck || !cardToAdd) return;
    try {
      await fetch("https://magicarduct.online:3000/api/agregarcartas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          IDmazo: selectedDeck.idbarajas,
          IDcarta: cardToAdd.id,
          cantidad: 1,
        }),
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error al añadir la carta al mazo:", error);
    }
  };

  const addFavorite = async (card) => {
    try {
      await fetch(`https://magicarduct.online:3000/api/cartasfavoritas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IDusuario: userId, IDcarta: card.id }),
      });
      fetchFavorites();
    } catch (error) {
      console.error("Error al agregar favorito:", error);
    }
  };

  const removeFavorite = async (cardId) => {
    try {
      await fetch(
        `https://magicarduct.online:3000/api/cartasfavoritas/${userId}/${cardId}`,
        {
          method: "DELETE",
        },
      );
      fetchFavorites();
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  const isFavorite = (cardId) =>
    favorites.some((fav) => fav.IDcarta === cardId);
  const toggleFavorite = (card) =>
    isFavorite(card.IDcarta) ? removeFavorite(card.IDcarta) : addFavorite(card);

  return (
    <div className="p-6 min-h-screen">
      <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="relative w-full md:w-1/3 m-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar cartas..."
            className="p-2 rounded border border-gray-500 w-full pr-10"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select
          onChange={handleFilterChange("order")}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto"
        >
          <option value="name">Ordenar por Nombre</option>
          <option value="set">Ordenar por Set</option>
          <option value="released">Ordenar por Fecha de Lanzamiento</option>
          <option value="cdm">Ordenar por CDM</option>
        </select>
        <select
          onChange={handleFilterChange("dir")}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto"
        >
          <option value="auto">Dirección Automática</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <FilterSection
        showFilters={showFilters}
        toggleFilters={toggleFilters}
        filter={filter}
        handleFilterChange={handleFilterChange}
        handleColorsChange={handleColorsChange}
        sets={sets}
        subtypes={subtypes}
      />

      {loading ? (
        <p className="text-[#e2e7eb]">Cargando cartas...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative bg-[#12171E] p-4 rounded-lg shadow-lg"
            >
              <img
                src={
                  card.image_uris?.border_crop ||
                  `${process.env.PUBLIC_URL}/Cartas2.png`
                }
                alt={card.name}
                className="w-full h-auto rounded-lg transition-transform transform hover:scale-105"
                onClick={() => setSelectedCard(card)}
              />
              <div className="mt-4">
                <h2 className="text-[#e2e7eb] text-lg font-bold">
                  {card.name}
                </h2>
                <p className="text-gray-400">{card.type_line}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDeckModal(card);
                }}
                className="absolute bottom-2 right-2 p-1 bg-[#2a5880] text-[#e2e7eb] rounded-md shadow-lg hover:bg-[#244c6e] transition"
              >
                <IoIosAdd size={24} />
              </button>
              {showModal && cardToAdd === card && (
                <div
                  ref={modalRef}
                  className="absolute bottom-12 right-2 bg-[#1b1f23] text-[#e2e7eb] p-2 rounded-md shadow-lg border-[1px] border-[#9ebbd6]"
                >
                  <ul>
                    {decks.map((deck) => (
                      <li
                        key={deck.idbarajas}
                        onClick={() => handleDeckSelect(deck)}
                        className={`hover:bg-[#2a5880] p-2 rounded-md cursor-pointer ${
                          selectedDeck?.idbarajas === deck.idbarajas
                            ? "bg-[#2a5880]"
                            : ""
                        }`}
                      >
                        {deck.nombre}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleAddCardsToDeck}
                    className="mt-2 bg-[#2a5880] text-[#e2e7eb] px-4 py-1 rounded hover:bg-[#3587cf] transition w-full"
                  >
                    Añadir
                  </button>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(card);
                }}
                className={`absolute top-2 left-2 text-2xl ${isFavorite(card.id) ? "text-red-600" : "text-[#e2e7eb]"}`}
              >
                {isFavorite(card.id) ? "♥" : "♡"}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-[#0b0f14] p-6 rounded-lg w-full max-w-4xl">
            <div className="w-full p-4 flex">
              <div className="w-1/2 p-4">
                <img
                  src={
                    selectedCard.image_uris?.normal ||
                    `${process.env.PUBLIC_URL}/Cartas2.png`
                  }
                  alt={selectedCard.name}
                  className="rounded-lg"
                />
              </div>
              <div className="w-1/2 p-4">
                <h2 className="text-[#e2e7eb] text-2xl mb-4">
                  {selectedCard.name}
                </h2>
                <p className="text-[#e2e7eb]">
                  <strong>Tipo:</strong> {selectedCard.type_line}
                </p>
                <p className="text-[#e2e7eb]">
                  <strong>Costo de Maná:</strong>{" "}
                  {selectedCard.mana_cost || "N/A"}
                </p>
                <p className="text-[#e2e7eb]">
                  <strong>Texto:</strong> {selectedCard.oracle_text || "N/A"}
                </p>
                <p className="text-[#e2e7eb]">
                  <strong>Rareza:</strong> {selectedCard.rarity}
                </p>
                <p className="text-[#e2e7eb]">
                  <strong>Edición:</strong> {selectedCard.set_name}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() =>
                  setSelectedCard(
                    cards[
                      (cards.indexOf(selectedCard) - 1 + cards.length) %
                        cards.length
                    ],
                  )
                }
                className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded hover:bg-[#244c6e] w-full mr-2"
              >
                Anterior
              </button>
              <button
                onClick={() =>
                  setSelectedCard(
                    cards[(cards.indexOf(selectedCard) + 1) % cards.length],
                  )
                }
                className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded hover:bg-[#244c6e] w-full ml-2"
              >
                Siguiente
              </button>
            </div>
            <button
              onClick={() => setSelectedCard(null)}
              className="mt-4 bg-[#9ebbd6] text-[#e2e7eb] px-4 py-2 rounded hover:bg-[#859eb4] w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showCardExistsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-[#0b0f14] p-6 rounded-lg max-w-md w-full text-center">
            <h2 className="text-[#e2e7eb] text-2xl mb-4">
              La carta ya existe en el mazo seleccionado
            </h2>
            <button
              onClick={() => setShowCardExistsModal(false)}
              className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded hover:bg-[#244c6e] w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartas;
