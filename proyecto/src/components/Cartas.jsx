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
    cmc: '',
    power: '',
    toughness: '',
  });

  useEffect(() => {
    fetchCards();
  }, [searchQuery, filter]);

  const fetchCards = () => {
    setLoading(true);
    const colorsQuery = filter.colors.length ? `+color:${filter.colors.join(',')}` : '';
    const cmcQuery = filter.cmc ? `+cmc=${filter.cmc}` : '';
    const powerQuery = filter.power ? `+pow=${filter.power}` : '';
    const toughnessQuery = filter.toughness ? `+tou=${filter.toughness}` : '';

    fetch(
      `https://api.scryfall.com/cards/search?q=${encodeURIComponent(searchQuery)}${colorsQuery}${cmcQuery}${powerQuery}${toughnessQuery}&order=${filter.order}&dir=${filter.dir}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setCards(data.data);
        } else {
          setCards([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
        setLoading(false);
        setCards([]);
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOrderChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({ ...prev, order: value }));
  };

  const handleDirChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({ ...prev, dir: value }));
  };

  const handleColorsChange = (event) => {
    const { value, checked } = event.target;
    setFilter((prev) => ({
      ...prev,
      colors: checked ? [...prev.colors, value] : prev.colors.filter((color) => color !== value),
    }));
  };

  const handleCmcChange = (event) => {
    setFilter((prev) => ({ ...prev, cmc: event.target.value }));
  };

  const handlePowerChange = (event) => {
    setFilter((prev) => ({ ...prev, power: event.target.value }));
  };

  const handleToughnessChange = (event) => {
    setFilter((prev) => ({ ...prev, toughness: event.target.value }));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen">
      <h1 className="text-white text-2xl sm:text-4xl mb-6 sm:mb-8">Magic the Gathering Cards</h1>

      <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="w-full sm:w-auto flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar cartas..."
            className="p-2 w-full sm:w-auto rounded border border-gray-500"
          />
          <FaSearch className="ml-2 text-white" />
        </div>

        <select onChange={handleOrderChange} className="p-2 w-full sm:w-auto rounded border border-gray-500">
          <option value="name">Ordenar por Nombre</option>
          <option value="set">Ordenar por Set</option>
          <option value="released">Ordenar por Fecha de Lanzamiento</option>
          <option value="cmc">Ordenar por CMC</option>
        </select>

        <select onChange={handleDirChange} className="p-2 w-full sm:w-auto rounded border border-gray-500">
          <option value="auto">Dirección Automática</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <label className="text-white">Colores:</label>
        <div className="flex flex-wrap gap-2">
          {['White', 'Blue', 'Black', 'Red', 'Green'].map((color) => (
            <label key={color} className="text-white">
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
      </div>

      <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="w-full sm:w-auto">
          <label className="text-white">CMC:</label>
          <input
            type="number"
            value={filter.cmc}
            onChange={handleCmcChange}
            placeholder="Coste de maná"
            className="p-2 w-full sm:w-auto rounded border border-gray-500"
          />
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-white">Poder:</label>
          <input
            type="number"
            value={filter.power}
            onChange={handlePowerChange}
            placeholder="Poder"
            className="p-2 w-full sm:w-auto rounded border border-gray-500"
          />
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-white">Resistencia:</label>
          <input
            type="number"
            value={filter.toughness}
            onChange={handleToughnessChange}
            placeholder="Resistencia"
            className="p-2 w-full sm:w-auto rounded border border-gray-500"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-white">Cargando cartas...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(cards) && cards.length > 0 ? (
            cards.map((card) => (
              <div key={card.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <img
                  src={card.image_uris?.border_crop}
                  alt={card.name}
                  className="w-full h-auto rounded-lg transition-transform transform hover:scale-105"
                />
                <div className="mt-4">
                  <h2 className="text-white text-lg font-bold">{card.name}</h2>
                  <p className="text-gray-400">{card.type_line}</p>
                  {card.power && <p className="text-gray-400">Power: {card.power}</p>}
                  {card.toughness && <p className="text-gray-400">Toughness: {card.toughness}</p>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No se encontraron cartas.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cartas;
