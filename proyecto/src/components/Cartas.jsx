import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io'; // Importamos el icono de añadir
import { useLocation } from 'react-router-dom'; // Importar para detectar el estado de navegación
import { getDecks, addCardsToDeck } from './db'; // Importar la función para obtener barajas y agregar cartas
import Favorites from './Favorites'; // Importamos el componente de favoritos
import FilterSection from './FilterSection'; // Importa el nuevo componente
import { useUser } from './UserContext';

const Cartas = () => {
  const { userId } = useUser();
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
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };  

  // Obtener cartas favoritas del backend
  const fetchFavorites = async () => {
    try {
      const response = await fetch(`https://magicarduct.online:3000/api/cartasfavoritas/${userId}`);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      console.log(data);
  
      // Verificar si data es un array y tiene elementos
      if (Array.isArray(data) && data.length > 0) {
        setFavorites(data); // Establecer favoritos si hay datos
      } else {
        console.log('No hay cartas favoritas.'); // Mensaje de consola si está vacío
        setFavorites([]); // Establecer un array vacío si no hay favoritos
      }
    } catch (error) {
      console.error('Error al obtener cartas favoritas:', error);
      setFavorites([]);
    }
  };


  // Agregar carta a favoritos
  const addFavorite = async (card) => {
    try {
      const response = await fetch(`https://magicarduct.online:3000/api/cartasfavoritas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IDusuario: userId,  // Suponiendo que userId está disponible en el contexto
          IDcarta: card.id,
        }),
      });

      await response.json();

      fetchFavorites(); // Actualizar lista de favoritos
    } catch (error) {
      console.error('Error al agregar carta favorita:', error);
    }
  };

  // Eliminar carta de favoritos
  const removeFavorite = async (cardId) => {
    try {
      const response = await fetch(`https://magicarduct.online:3000/api/cartasfavoritas/${userId}/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

    } catch (error) {
      console.error('Error al eliminar carta favorita:', error);
    }
  };

  // Verificar si una carta es favorita
  const isFavorite = (cardId) => favorites.some((fav) => fav.IDcarta === cardId);

  useEffect(() => {
    fetchFavorites(); // Cargar cartas favoritas del usuario
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
  const toggleFavorite = async (card) => {
    try {
      if (isFavorite(card.IDcarta)) {
        await removeFavorite(card.IDcarta);
      } else {
        await addFavorite(card);
      }
      fetchFavorites(); // Actualizar después de agregar o eliminar
    } catch (error) {
      console.error('Error al alternar favorito:', error);
    }
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
      <h1 className="text-white text-4xl mb-8 text-center">Magic the Gathering Cards</h1>

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

  <select onChange={handleFilterChange('order')} className="border border-gray-300 rounded-md p-2 mb-4 md:mb-0 w-full md:w-auto">
    <option value="name">Ordenar por Nombre</option>
    <option value="set">Ordenar por Set</option>
    <option value="released">Ordenar por Fecha de Lanzamiento</option>
    <option value="cdm">Ordenar por CDM</option>
  </select>

  <select onChange={handleFilterChange('dir')} className="border border-gray-300 rounded-md p-2 mb-4 md:mb-0 w-full md:w-auto">
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

                <button
                onClick={(e) => {
                  e.stopPropagation();
                  isFavorite(card.id) ? removeFavorite(card.id) : addFavorite(card);
                }}
                className={`absolute top-2 left-2 text-2xl ${
                  isFavorite(card.id) ? 'text-red-600' : 'text-white'
                  }`}
                  >
                    {isFavorite(card.id) ? '♥' : '♡'}
                    </button>

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
