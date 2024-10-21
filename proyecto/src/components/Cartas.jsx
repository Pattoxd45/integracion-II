import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosAdd } from "react-icons/io";
import Favorites from './Favorites'; 
import { useUser } from './UserContext';

const Cartas = () => {
  const { userId } = useUser(); // Obtener el userId del contexto
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
  const [favorites, setFavorites] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]); // Cartas seleccionadas
  const [selectedCard, setSelectedCard] = useState(null);
  const [decks, setDecks] = useState([]); // Barajas del usuario
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [selectedDeck, setSelectedDeck] = useState(null); // Baraja seleccionada
  const [filtersVisible, setFiltersVisible] = useState(false); // Estado para mostrar u ocultar filtros

  // Cargar sets y subtipos
  useEffect(() => {
    fetch('https://api.scryfall.com/sets')
      .then(response => response.json())
      .then(data => setSets(data.data || []));
      
    fetch('https://api.scryfall.com/catalog/card-types')
      .then(response => response.json())
      .then(data => setSubtypes(data.data || []));
  }, []);

  // Obtener las barajas del usuario
  useEffect(() => {
    const fetchDecks = async () => {
      if (!userId) {
        console.log('No se encontró userId');
        return; // Si no hay usuario, no hacemos nada
      }

      try {
        const response = await fetch(`https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setDecks(data); // Almacenar las barajas en el estado
        } else {
          console.error("Error al obtener las barajas");
        }
      } catch (error) {
        console.error("Error en la petición:", error); // Mostrar error en consola
      }
    };

    fetchDecks();
  }, [userId]);

  // Función para obtener las cartas según los filtros
  const fetchCards = useCallback(() => {
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
  }, [searchQuery, filter]);

  useEffect(() => {
    fetchCards();
  }, [searchQuery, filter, fetchCards]);

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

  const toggleFavorite = (card) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((favorite) => favorite.id === card.id)) {
        return prevFavorites.filter((favorite) => favorite.id !== card.id);
      } else {
        return [...prevFavorites, card];
      }
    });
  };

  const toggleSelectCard = (card) => {
    if (selectedCards.some((selected) => selected.id === card.id)) {
      setSelectedCards([]); // Deselect if clicked again
    } else {
      setSelectedCards([card]); // Only allow one card to be selected at a time
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
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

  const openModal = () => setIsModalOpen(true);
  const closeDeckModal = () => setIsModalOpen(false);

  const handleDeckSelect = (deck) => {
    if (selectedDeck?.idbarajas === deck.idbarajas) {
      setSelectedDeck(null); // Deselecciona si se hace clic de nuevo
    } else {
      setSelectedDeck(deck); // Selecciona la baraja
    }
  };

  // Función que envía la carta seleccionada al mazo a través de la API
  const handleAddCardsToDeck = async () => {
    if (!selectedDeck || selectedCards.length === 0) {
      console.log('No se ha seleccionado ninguna baraja o carta');
      return;
    }

    const selectedCardId = selectedCards[0].id; // Obtener el ID de Scryfall de la primera carta seleccionada

    try {
      const response = await fetch('https://magicarduct.online:3000/api/agregarcartas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IDmazo: selectedDeck.idbarajas, // ID del mazo seleccionado
          IDcarta: selectedCardId, // ID de la carta seleccionada
          cantidad: 1 // Siempre 1
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Carta añadida correctamente:', data);
      } else {
        console.error('Error al añadir la carta al mazo:', await response.json());
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className="p-6 min-h-screen">
      <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />

      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Buscar cartas..."
          className="p-2 rounded border border-gray-500"
        />
        <FaSearch className="ml-2 text-[#e2e7eb]" />
        <button
          onClick={toggleFiltersVisibility}
          className="ml-4 bg-[#2a5880] text-[#e2e7eb] rounded-[10px] p-[10px] hover:opacity-70 transition"
        >
          Filtros
        </button>
      </div>

      {/* Mostrar filtros si están visibles */}
      {filtersVisible && (
        <div className="filters-section mb-4">
          <div className="mb-4">
            <label className="text-[#e2e7eb] mr-4">Colores:</label>
            {['White', 'Blue', 'Black', 'Red', 'Green'].map((color) => (
              <label key={color} className="text-[#e2e7eb] mr-4">
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
              <label className="text-[#e2e7eb] mr-2">CDM:</label>
              <input
                type="number"
                value={filter.cdm}
                onChange={handleFilterChange('cdm')}
                placeholder="Costo de Maná"
                className="p-2 rounded border border-gray-500"
              />
            </div>

            <div className="mr-4">
              <label className="text-[#e2e7eb] mr-2">Poder:</label>
              <input
                type="number"
                value={filter.power}
                onChange={handleFilterChange('power')}
                placeholder="Poder"
                className="p-2 rounded border border-gray-500"
              />
            </div>

            <div className="mr-4">
              <label className="text-[#e2e7eb] mr-2">Resistencia:</label>
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
            <label className="text-[#e2e7eb] mr-4">Tipo:</label>
            <select onChange={handleFilterChange('type')} className="p-2 rounded border border-gray-500">
              <option value="">Cualquier Tipo</option>
              <option value="creature">Criatura</option>
              <option value="artifact">Artefacto</option>
              <option value="enchantment">Encantamiento</option>
              <option value="land">Tierra</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-[#e2e7eb] mr-4">Edición:</label>
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
            <label className="text-[#e2e7eb] mr-4">Subtipo:</label>
            <select onChange={handleFilterChange('subtype')} className="p-2 rounded border border-gray-500">
              <option value="">Seleccionar Subtipo</option>
              {subtypes.map((subtype) => (
                <option key={subtype} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-[#e2e7eb]">Cargando cartas...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(cards) && cards.length > 0 ? (
            cards.map((card) => (
              <div
                key={card.id}
                className="bg-[#12181E] rounded-lg p-4 cursor-pointer relative"
                onClick={() => handleCardClick(card)}
              >
                <img
                  src={card.image_uris?.normal || `${process.env.PUBLIC_URL}/Cartas2.png`}
                  alt={card.name}
                  className="rounded-lg"
                />
                <h3 className="text-[#e2e7eb] text-lg mt-2">{card.name}</h3>
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                  {/* Ícono de favorito */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(card);
                    }}
                    className={`text-3xl ${
                      favorites.some((favorite) => favorite.id === card.id)
                        ? 'text-red-600'
                        : 'text-[#e2e7eb]'
                    }`}
                  >
                    {favorites.some((favorite) => favorite.id === card.id) ? '♥' : '♡'}
                  </button>

                  {/* Círculo de selección */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectCard(card);
                    }}
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedCards.some((selected) => selected.id === card.id)
                        ? 'bg-[#2a5880] border-[#2a5880]'
                        : 'bg-white border-gray-300'
                    } cursor-pointer`}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#e2e7eb]">No se encontraron cartas.</p>
          )}
        </div>
      )}

      {/* Mostrar el botón de añadir si hay cartas seleccionadas */}
      {selectedCards.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[1200px]">
          <div className="flex justify-end">
            <button
              onClick={openModal}
              className="bg-[#2a5880] text-[#e2e7eb] rounded-[10px] p-[10px] hover:opacity-70 transition flex items-center justify-center"
              style={{ width: "50px", height: "50px" }}
            >
              <IoIosAdd className="text-[#e2e7eb] text-[24px]" />
            </button>
          </div>
        </div>
      )}

      {/* Modal para seleccionar la baraja */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div
            className="bg-[#0b0f14] p-6 rounded-lg min-w-[500px]"
            style={{ maxWidth: selectedDeck ? `${selectedDeck.nombre.length + 10}ch` : "400px" }}
          >
            <h2 className="text-[#e2e7eb] text-2xl mb-4">Selecciona una baraja</h2>

            {/* Mostrar las barajas del usuario */}
            {decks.length > 0 ? (
              <ul className="mb-4">
                {decks.map((deck) => (
                  <li
                    key={deck.idbarajas}
                    onClick={() => handleDeckSelect(deck)}
                    className={`text-[#e2e7eb] mb-2 flex items-center cursor-pointer ${
                      selectedDeck?.idbarajas === deck.idbarajas ? "bg-[#2a5880]" : "bg-[#1E1E1E]"
                    } p-2 rounded-lg`}
                  >
                    {deck.nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#e2e7eb]">No tienes barajas disponibles.</p>
            )}

            {/* Botones de cancelar y añadir */}
            <div className="flex justify-between mt-4">
              <button
                onClick={closeDeckModal}
                className="bg-gray-500 text-[#e2e7eb] px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddCardsToDeck}
                className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded hover:bg-[#3587cf] transition"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="flex bg-[#0b0f14] p-6 rounded-lg w-full max-w-4xl flex-col">
            <div className="w-full p-4 flex">
              <div className="w-1/2 p-4">
                <img
                  src={selectedCard.image_uris?.normal || `${process.env.PUBLIC_URL}/Cartas2.png`}
                  alt={selectedCard.name}
                  className="rounded-lg"
                />
              </div>
              <div className="w-1/2 p-4">
                <h2 className="text-[#e2e7eb] text-2xl mb-4">{selectedCard.name}</h2>
                <p className="text-[#e2e7eb]"><strong>Tipo:</strong> {selectedCard.type_line}</p>
                <p className="text-[#e2e7eb]"><strong>Costo de Maná:</strong> {selectedCard.mana_cost || 'N/A'}</p>
                <p className="text-[#e2e7eb]"><strong>Texto:</strong> {selectedCard.oracle_text || 'N/A'}</p>
                <p className="text-[#e2e7eb]"><strong>Rareza:</strong> {selectedCard.rarity}</p>
                <p className="text-[#e2e7eb]"><strong>Edición:</strong> {selectedCard.set_name}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePreviousCard}
                className="bg-[#3587cf] text-[#e2e7eb] px-4 py-2 rounded hover:opacity-60 transition w-full mr-2"
              >
                Anterior
              </button>
              <button
                onClick={handleNextCard}
                className="bg-[#3587cf] text-[#e2e7eb] px-4 py-2 rounded hover:opacity-60 transition w-full ml-2"
              >
                Siguiente
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded hover:opacity-60 transition w-full"
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
