import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

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

  const toggleFavorite = (card) => { // guardado de cartas como favoritas
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((favorite) => favorite.id === card.id)) {
        return prevFavorites.filter((favorite) => favorite.id !== card.id);
      } else {
        return [...prevFavorites, card];
      }
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-white text-4xl mb-8">Magic the Gathering Cards</h1>
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
              <div key={card.id} className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
                <img
                  src={card.image_uris?.border_crop || `${process.env.PUBLIC_URL}/Cartas2.png`} //aqui es donde se definen las cartas que van a "tapar" las cartas a las que no se les genera la imagen de forma correcta
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
                  onClick={() => toggleFavorite(card)}
                  className={`absolute top-2 right-2 p-2 rounded ${favorites.some(fav => fav.id === card.id) ? 'bg-red-500' : 'bg-blue-500'}`}
                >
                  {favorites.some(fav => fav.id === card.id) ? '❤️' : '🤍'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">No se encontraron cartas.</p>
          )}
        </div>
      )}
      <h2 className="text-white text-3xl mt-8">Cartas Favoritas</h2>  
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img
                src={favorite.image_uris?.border_crop || `${process.env.PUBLIC_URL}/Cartas1.png`}
                alt={favorite.name}
                className="w-full h-auto rounded-lg transition-transform transform hover:scale-105"
              />
              <h2 className="text-white text-lg font-bold">{favorite.name}</h2>
              <p className="text-gray-400">{favorite.type_line}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No hay cartas favoritas guardadas.</p>
      )}
    </div>
  );
};

export default Cartas;