import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io'; // Importamos el icono de añadir
import { useLocation } from 'react-router-dom'; // Importar para detectar el estado de navegación
import { getDecks, addCardsToDeck } from './db'; // Importar la función para obtener barajas y agregar cartas
import Favorites from './Favorites'; // Importamos el componente de favoritos

const Cartas = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({
    order: 'name',
    dir: 'auto',
    colors: [],
    cdm: '',  
    power: '',
    toughness: '',
    type: '',
    edition: '', 
    subtype: '', 
  });
  const [sets, setSets] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [favorites, setFavorites] = useState([]); // Estado de favoritos
  const [selectedCard, setSelectedCard] = useState(null); // Estado para popup de carta seleccionada
  const [selectedCards, setSelectedCards] = useState([]); // Estado para las cartas seleccionadas
  const [decks, setDecks] = useState([]); // Almacenar las barajas
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal de barajas

  const location = useLocation(); // Hook para obtener el estado de navegación
  const addingCards = location.state?.addingCards || false; // Detectar si estamos añadiendo cartas

  useEffect(() => {
    fetch('https://api.scryfall.com/sets')
      .then(response => response.json())
      .then(data => setSets(data.data || []));
      
    fetch('https://api.scryfall.com/catalog/card-types')
      .then(response => response.json())
      .then(data => setSubtypes(data.data || []));
  }, []);

  useEffect(() => {
    fetchCards();
  }, [searchQuery, filter]);

  const fetchCards = () => {
    setLoading(true);
    const colorsQuery = filter.colors.length ? `+color:${filter.colors.join(',')}` : '';
    const cdmQuery = filter.cdm ? `+cmc=${filter.cdm}` : '';  
    const powerQuery = filter.power ? `+pow=${filter.power}` : '';
    const toughnessQuery = filter.toughness ? `+tou=${filter.toughness}` : '';
    const typeQuery = filter.type ? `+type:${filter.type}` : '';
    const editionQuery = filter.edition ? `+set:${filter.edition}` : '';
    const subtypeQuery = filter.subtype ? `+type:${filter.subtype}` : '';

    fetch(
      `https://api.scryfall.com/cards/search?q=${encodeURIComponent(searchQuery)}${colorsQuery}${cdmQuery}${powerQuery}${toughnessQuery}${typeQuery}${editionQuery}${subtypeQuery}&order=${filter.order}&dir=${filter.dir}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCards(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
        setLoading(false);
        setCards([]);
      });
  };

  const handleSearch = (event) => setSearchQuery(event.target.value);
  const handleFilterChange = (field) => (event) => {
    setFilter((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleColorsChange = (event) => {
    const { value, checked } = event.target;
    setFilter((prev) => ({
      ...prev,
      colors: checked ? [...prev.colors, value] : prev.colors.filter((color) => color !== value),
    }));
  };

  // Manejar la selección de cartas (checkbox o círculo)
  const handleSelectCard = (cardId) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  // Manejar la selección de favoritos
  const toggleFavorite = (card) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((favorite) => favorite.id === card.id)) {
        return prevFavorites.filter((favorite) => favorite.id !== card.id);
      } else {
        return [...prevFavorites, card];
      }
    });
  };

  // Manejar el click de la carta (abrir popup)
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModalCard = () => {
    setSelectedCard(null);
  };

  const handleNextCard = () => {
    const currentIndex = cards.findIndex(card => card.id === selectedCard.id);
    const nextIndex = (currentIndex + 1) % cards.length;
    setSelectedCard(cards[nextIndex]);
  };

  const handlePreviousCard = () => {
    const currentIndex = cards.findIndex(card => card.id === selectedCard.id);
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    setSelectedCard(cards[prevIndex]);
  };

  // Abrir el modal y obtener las barajas de IndexedDB
  const openModal = async () => {
    const savedDecks = await getDecks(); // Obtener barajas de IndexedDB
    setDecks(savedDecks || []);
    setShowModal(true); // Mostrar el modal
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Manejar la selección de una baraja para agregar cartas
  const handleSelectDeck = async (deckId) => {
    const selectedCardNames = selectedCards.map(cardId => {
      const card = cards.find(card => card.id === cardId);
      return {
        id: card.id,
        name: card.name,
        image: card.image_uris?.border_crop || `${process.env.PUBLIC_URL}/Cartas2.png`,
        mana: card.mana_cost || "Desconocido",
        type: card.type_line || "Desconocido",
        power: card.power || null,
        toughness: card.toughness || null,
      };
    });

    // Agregar las cartas seleccionadas a la baraja
    await addCardsToDeck(deckId, selectedCardNames);
    setSelectedCards([]); // Limpiar las cartas seleccionadas
    closeModal(); // Cerrar el modal
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-white text-4xl mb-8">Magic the Gathering Cards</h1>
      
      {/* Componente de Favoritos */}
      <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />

      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Buscar cartas..."
          className="p-2 rounded border border-gray-500"
        />
        <FaSearch className="ml-2 text-white" />
        <select onChange={handleFilterChange('order')} className="ml-4 p-2 rounded border border-gray-500">
          <option value="name">Ordenar por Nombre</option>
          <option value="set">Ordenar por Set</option>
          <option value="released">Ordenar por Fecha de Lanzamiento</option>
          <option value="cdm">Ordenar por CDM</option>
        </select>
        <select onChange={handleFilterChange('dir')} className="ml-2 p-2 rounded border border-gray-500">
          <option value="auto">Dirección Automática</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-white mr-4">Colores:</label>
        {['White', 'Blue', 'Black', 'Red', 'Green'].map((color) => (
          <label key={color} className="text-white mr-4">
            <input
              type="checkbox"
              value={color}
              onChange={handleColorsChange}
              className="mr-1"
            />
            {color}
          </label>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="mr-4">
          <label className="text-white mr-2">CDM:</label>
          <input
            type="number"
            value={filter.cdm}
            onChange={handleFilterChange('cdm')}
            placeholder="Costo de Maná"
            className="p-2 rounded border border-gray-500"
          />
        </div>

        <div className="mr-4">
          <label className="text-white mr-2">Poder:</label>
          <input
            type="number"
            value={filter.power}
            onChange={handleFilterChange('power')}
            placeholder="Poder"
            className="p-2 rounded border border-gray-500"
          />
        </div>

        <div className="mr-4">
          <label className="text-white mr-2">Resistencia:</label>
          <input
            type="number"
            value={filter.toughness}
            onChange={handleFilterChange('toughness')}
            placeholder="Resistencia"
            className="p-2 rounded border border-gray-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-white mr-4">Tipo:</label>
        <select onChange={handleFilterChange('type')} className="p-2 rounded border border-gray-500">
          <option value="">Cualquier Tipo</option>
          <option value="creature">Criatura</option>
          <option value="artifact">Artefacto</option>
          <option value="enchantment">Encantamiento</option>
          <option value="land">Tierra</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-white mr-4">Edición:</label>
        <select onChange={handleFilterChange('edition')} className="p-2 rounded border border-gray-500">
          <option value="">Seleccionar Edición</option>
          {sets.map((set) => (
            <option key={set.code} value={set.code}>
              {set.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-white mr-4">Subtipo:</label>
        <select onChange={handleFilterChange('subtype')} className="p-2 rounded border border-gray-500">
          <option value="">Seleccionar Subtipo</option>
          {subtypes.map((subtype) => (
            <option key={subtype} value={subtype}>
              {subtype}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-white">Cargando cartas...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(cards) && cards.length > 0 ? (
            cards.map((card) => (
              <div
                key={card.id}
                className="relative bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleCardClick(card)}
              >
                <img
                  src={card.image_uris?.border_crop || `${process.env.PUBLIC_URL}/Cartas2.png`}
                  alt={card.name}
                  className="w-full h-auto rounded-lg transition-transform transform hover:scale-105"
                />

                <div className="mt-4">
                  <h2 className="text-white text-lg font-bold">{card.name}</h2>
                  <p className="text-gray-400">{card.type_line}</p>
                  {card.power && <p className="text-gray-400">Poder: {card.power}</p>}
                  {card.toughness && <p className="text-gray-400">Resistencia: {card.toughness}</p>}
                </div>

                {/* Botón de favorito */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(card);
                  }}
                  className={`absolute top-2 left-2 text-2xl ${
                    favorites.some((favorite) => favorite.id === card.id) ? 'text-red-600' : 'text-white'
                  }`}
                >
                  {favorites.some((favorite) => favorite.id === card.id) ? '♥' : '♡'}
                </button>

                {/* Mostrar círculo para selección si estamos añadiendo cartas */}
                {addingCards && (
                  <div
                    className={`absolute right-3 top-3 w-5 h-5 rounded-full border-2 ${
                      selectedCards.includes(card.id)
                        ? "bg-orange-500 border-white"
                        : "border-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCard(card.id);
                    }}
                  ></div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white">No se encontraron cartas.</p>
          )}
        </div>
      )}

      {/* Botón flotante: solo visible si hay cartas seleccionadas */}
      {selectedCards.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[1200px]">
          <div className="flex justify-end">
            <button
              className="bg-[#E83411] text-white rounded-[10px] p-[10px] hover:bg-[#b52e0e] transition-colors flex items-center justify-center"
              style={{ width: "50px", height: "50px" }}
              onClick={openModal}
            >
              <IoIosAdd className="text-white text-[24px]" />
            </button>
          </div>
        </div>
      )}

      {/* Modal para seleccionar baraja */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Seleccionar Baraja</h2>
            {decks.length > 0 ? (
              <ul className="mb-4">
                {decks.map((deck) => (
                  <li key={deck.id} className="mb-2">
                    <button
                      className="w-full bg-[#E83411] text-white p-2 rounded-md"
                      onClick={() => handleSelectDeck(deck.id)}
                    >
                      {deck.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No hay barajas disponibles.</p>
            )}
            <button
              className="bg-gray-400 px-4 py-2 rounded-md hover:bg-gray-500"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Popup de detalles de carta seleccionada */}
      {selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="flex bg-gray-900 p-6 rounded-lg w-full max-w-4xl flex-col">
            <div className="w-full p-4 flex">
              <div className="w-1/2 p-4">
                <img
                  src={selectedCard.image_uris?.normal || `${process.env.PUBLIC_URL}/Cartas2.png`}
                  alt={selectedCard.name}
                  className="rounded-lg"
                />
              </div>
              <div className="w-1/2 p-4">
                <h2 className="text-white text-2xl mb-4">{selectedCard.name}</h2>
                <p className="text-white"><strong>Tipo:</strong> {selectedCard.type_line}</p>
                <p className="text-white"><strong>Costo de Maná:</strong> {selectedCard.mana_cost || 'N/A'}</p>
                <p className="text-white"><strong>Texto:</strong> {selectedCard.oracle_text || 'N/A'}</p>
                <p className="text-white"><strong>Rareza:</strong> {selectedCard.rarity}</p>
                <p className="text-white"><strong>Edición:</strong> {selectedCard.set_name}</p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePreviousCard}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors w-full mr-2"
              >
                Anterior
              </button>
              <button
                onClick={handleNextCard}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors w-full ml-2"
              >
                Siguiente
              </button>
            </div>

            <button
              onClick={closeModalCard}
              className="mt-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors w-full"
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
