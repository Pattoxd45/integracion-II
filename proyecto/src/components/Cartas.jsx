import React, { useState } from "react";

const Cartas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [filterValue, setFilterValue] = useState("all");

  const cards = [
    { name: "Aetherling", year: 2021, race: "Humano", cost: 3 },
    { name: "Bloodghast", year: 2020, race: "Vampiro", cost: 2 },
    { name: "Carnage Tyrant", year: 2021, race: "Dinosaurio", cost: 6 },
    { name: "Deathrite Shaman", year: 2019, race: "Elfo", cost: 1 },
    { name: "Eidolon of the Great Revel", year: 2021, race: "Espíritu", cost: 2 },
    { name: "Fireblast", year: 2020, race: "Elemental", cost: 0 },
    { name: "Griselbrand", year: 2021, race: "Demonio", cost: 8 },
    { name: "Heliod, Sun-Crowned", year: 2020, race: "Dios", cost: 3 },
    { name: "Inquisition of Kozilek", year: 2021, race: "Conjuro", cost: 1 },
    { name: "Jace, the Mind Sculptor", year: 2019, race: "Planeswalker", cost: 4 },
    { name: "Karn Liberated", year: 2018, race: "Planeswalker", cost: 7 },
    { name: "Liliana of the Veil", year: 2021, race: "Planeswalker", cost: 3 },
    { name: "Mox Opal", year: 2019, race: "Artefacto", cost: 0 },
    { name: "Nicol Bolas, the Ravager", year: 2020, race: "Dragón", cost: 4 },
    { name: "Omnath, Locus of Creation", year: 2021, race: "Elemental", cost: 4 },
  ];

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "none" || filterValue === "all") {
      return matchesSearch; 
    }

    let matchesFilter = true;
    if (selectedFilter === "year") {
      matchesFilter = card.year.toString() === filterValue;
    } else if (selectedFilter === "race") {
      matchesFilter = card.race === filterValue;
    } else if (selectedFilter === "cost") {
      matchesFilter = card.cost.toString() === filterValue;
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-[1200px] mx-auto my-6">
      <div className="flex flex-col mb-6 space-y-4">
        <input
          type="text"
          placeholder="Buscar carta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border-2 border-gray-400 rounded-md w-full"
        />

        <div className="flex space-x-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="p-2 border-2 border-gray-400 rounded-md"
          >
            <option value="none">Seleccionar filtro</option>
            <option value="year">Filtrar por Año</option>
            <option value="race">Filtrar por Raza</option>
            <option value="cost">Filtrar por Coste</option>
          </select>

          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="p-2 border-2 border-gray-400 rounded-md"
            disabled={selectedFilter === "none"}
          >
            <option value="all">Todos</option>
            {selectedFilter === "year" && (
              <>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </>
            )}
            {selectedFilter === "race" && (
              <>
                <option value="Humano">Humano</option>
                <option value="Vampiro">Vampiro</option>
                <option value="Dinosaurio">Dinosaurio</option>
                <option value="Elfo">Elfo</option>
                <option value="Espíritu">Espíritu</option>
                <option value="Elemental">Elemental</option>
                <option value="Demonio">Demonio</option>
                <option value="Dios">Dios</option>
                <option value="Conjuro">Conjuro</option>
                <option value="Planeswalker">Planeswalker</option>
                <option value="Artefacto">Artefacto</option>
                <option value="Dragón">Dragón</option>
              </>
            )}
            {selectedFilter === "cost" && (
              <>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <div
              key={index}
              className="card w-[220px] h-[320px] bg-[#000] text-white relative flex items-center justify-center rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438] transition-all duration-300"
            >
              <div className="absolute top-2 right-2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center">
                {card.cost}
              </div>
              {card.name}
            </div>
          ))
        ) : (
          <p>No se encontraron cartas.</p>
        )}
      </div>
    </div>
  );
};

export default Cartas;