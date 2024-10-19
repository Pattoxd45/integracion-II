import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Favorites from './Favorites';

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
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(1); // ID temporal del usuario
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch('https://api.scryfall.com/sets')
      .then(response => response.json())
      .then(data => setSets(data.data || []));

    fetch('https://api.scryfall.com/catalog/card-types')
      .then(response => response.json())
      .then(data => setSubtypes(data.data || []));

    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`/api/cartasfavoritas/${userId}`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error al obtener cartas favoritas:', error);
    }
  };

  const addFavorite = async (card) => {
    try {
      await axios.post('/api/cartasfavoritas', {
        IDusuario: userId,
        IDcarta: card.id,
      });
      fetchFavorites();
    } catch (error) {
      console.error('Error al agregar carta favorita:', error);
    }
  };

  const removeFavorite = async (cardId) => {
    try {
      await axios.delete('/api/cartasfavoritas', {
        data: { idusuario: userId, idcarta: cardId },
      });
      fetchFavorites();
    } catch (error) {
      console.error('Error al eliminar carta favorita:', error);
    }
  };

  const isFavorite = (cardId) => favorites.some((fav) => fav.IDcarta === cardId);

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

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-white text-4xl mb-8">Magic the Gathering Cards</h1>
      
      <Favorites favorites={favorites} toggleFavorite={(card) => {
        isFavorite(card.id) ? removeFavorite(card.id) : addFavorite(card);
      }} />

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
                className="bg-gray-800 rounded-lg p-4 cursor-pointer relative"
                onClick={() => handleCardClick(card)}
              >
                <img
                  src={card.image_uris?.normal || `${process.env.PUBLIC_URL}/Cartas2.png`}
                  alt={card.name}
                  className="rounded-lg"
                />
                <h3 className="text-white text-lg mt-2">{card.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isFavorite(card.id) ? removeFavorite(card.id) : addFavorite(card);
                  }}
                  className={`absolute top-2 right-2 text-3xl ${
                    isFavorite(card.id) ? 'text-red-600' : 'text-white'
                  }`}
                >
                  {isFavorite(card.id) ? '♥' : '♡'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">No se encontraron cartas.</p>
          )}
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
              onClick={closeModal}
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
