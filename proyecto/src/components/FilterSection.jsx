import React from 'react';

const FilterSection = ({ showFilters, toggleFilters, filter, handleFilterChange, handleColorsChange, sets, subtypes }) => {
  return (
    <div>
      <button 
        onClick={toggleFilters} 
        className="bg-blue-500 text-white rounded p-2 mb-4"
      >
        {showFilters ? 'Ocultar Filtros' : 'Filtros'}
      </button>

      {showFilters && (
        <div>
          <div className="mb-4 flex flex-wrap">
            <label className="text-white mr-4">Colores:</label>
            {['White', 'Blue', 'Black', 'Red', 'Green'].map((color) => (
              <label key={color} className="text-white mr-4 flex items-center">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-white mb-1">CDM:</label>
              <input
                type="number"
                value={filter.cdm}
                onChange={handleFilterChange('cdm')}
                placeholder="Costo de Maná"
                className="p-2 rounded border border-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white mb-1">Poder:</label>
              <input
                type="number"
                value={filter.power}
                onChange={handleFilterChange('power')}
                placeholder="Poder"
                className="p-2 rounded border border-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white mb-1">Resistencia:</label>
              <input
                type="number"
                value={filter.toughness}
                onChange={handleFilterChange('toughness')}
                placeholder="Resistencia"
                className="p-2 rounded border border-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-white mb-1">Tipo:</label>
              <select onChange={handleFilterChange('type')} className="p-2 rounded border border-gray-500">
                <option value="">Cualquier Tipo</option>
                <option value="creature">Criatura</option>
                <option value="artifact">Artefacto</option>
                <option value="enchantment">Encantamiento</option>
                <option value="land">Tierra</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-white mb-1">Edición:</label>
              <select onChange={handleFilterChange('edition')} className="p-2 rounded border border-gray-500">
                <option value="">Seleccionar Edición</option>
                {sets.map((set) => (
                  <option key={set.code} value={set.code}>
                    {set.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-white mb-1">Subtipo:</label>
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
        </div>
      )}
    </div>
  );
};

export default FilterSection;
