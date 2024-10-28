import React, { useState } from "react";

// Función para importar todas las imágenes de una carpeta
const importAll = (r) => {
  return r.keys().map(r);
};

// Importar imágenes de las tiendas (ajusta el nombre de la carpeta según tu estructura)
const images = importAll(require.context('../images/imgNews', false, /\.(png|jpe?g|svg|webp)$/));

// Datos de las tiendas físicas con regiones
const physicalStores = [
  {
    name: "Tienda Física 1",
    description: "Tienda oficial de mercancía de Magic.",
    imgUrl: images[0],
    region: "Santiago",
  },
  {
    name: "Tienda Física 2",
    description: "Tienda en Valparaíso con una gran variedad de cartas.",
    imgUrl: images[1],
    region: "Valparaíso",
  },
  {
    name: "Tienda Física 3",
    description: "Encuentra todos los productos de Magic en Concepción.",
    imgUrl: images[2],
    region: "Biobío",
  },
  {
    name: "Tienda Física 4",
    description: "Tienda en Antofagasta con productos exclusivos.",
    imgUrl: images[3],
    region: "Antofagasta",
  },
  {
    name: "Tienda Física 5",
    description: "Tienda en La Serena con todo lo necesario.",
    imgUrl: images[4],
    region: "Coquimbo",
  },
  // Agregar otras tiendas físicas según corresponda
];

// Lista de todas las regiones de Chile
const regions = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "Libertador General Bernardo O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén del General Carlos Ibáñez del Campo",
  "Magallanes y de la Antártica Chilena",
];

// Datos de las tiendas online
const onlineStores = [
  {
    name: "Tienda Online 1",
    description: "Compra cartas de Magic en línea.",
    imgUrl: images[5],
  },
  {
    name: "Tienda Online 2",
    description: "Envíos a todo el mundo de productos de Magic.",
    imgUrl: images[6],
  },
  {
    name: "Tienda Online 3",
    description: "Encuentra cartas raras en esta tienda online.",
    imgUrl: images[7],
  },
];

const Tiendas = () => {
  const [view, setView] = useState("all"); // Estado para el tipo de tienda
  const [selectedRegion, setSelectedRegion] = useState("Todas"); // Estado para la región seleccionada

  // Filtrar tiendas físicas según la región seleccionada
  const filteredPhysicalStores =
    selectedRegion === "Todas"
      ? physicalStores
      : physicalStores.filter((store) => store.region === selectedRegion);

  return (
    <div className="max-w-[1200px] mx-auto px-4 space-y-8">
      {/* Filtro de tipo de tienda */}
      <div>
        <h1 className="text-xl font-bold text-[#e2e7eb]">Seleccionar Tiendas:</h1>
        <button
          className={`mr-4 p-2 rounded ${view === "all" ? "bg-[#3b3b3b]" : "bg-[#12171E]"} text-[#e2e7eb]`}
          onClick={() => setView("all")}
        >
          Todas
        </button>
        <button
          className={`mr-4 p-2 rounded ${view === "physical" ? "bg-[#3b3b3b]" : "bg-[#12171E]"} text-[#e2e7eb]`}
          onClick={() => setView("physical")}
        >
          Tiendas Físicas
        </button>
        <button
          className={`p-2 rounded ${view === "online" ? "bg-[#3b3b3b]" : "bg-[#12171E]"} text-[#e2e7eb]`}
          onClick={() => setView("online")}
        >
          Tiendas Online
        </button>
      </div>

      {/* Filtro de región (solo para tiendas físicas) */}
      {view === "physical" && (
        <div>
          <label htmlFor="regionFilter" className="text-lg text-[#e2e7eb] font-bold">
            Filtrar por Región:
          </label>
          <select
            id="regionFilter"
            className="ml-2 p-2 bg-[#12171E] text-[#e2e7eb] rounded"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="Todas">Todas</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Mostrar tiendas según la vista seleccionada */}
      {view === "all" && (
        <div>
          <h1 className="text-xl font-bold text-[#e2e7eb]">Todas las Tiendas</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...physicalStores, ...onlineStores].map((store, index) => (
              <div key={index} className="bg-[#12171E] rounded-lg overflow-hidden shadow-lg flex flex-col">
                <img
                  src={store.imgUrl}
                  alt={store.name}
                  className="object-cover w-full h-[200px]"
                />
                <div className="p-4 flex-grow">
                  <h2 className="text-lg font-bold text-[#e2e7eb]">{store.name}</h2>
                  <p className="text-[#e2e7eb]">{store.description}</p>
                </div> 
              </div>
            ))}
          </div><br></br>
        </div>
      )}

      {/* Sección de Tiendas Físicas */}
      {view === "physical" && (
        <div>
          <h1 className="text-xl font-bold text-[#e2e7eb]">Tiendas Físicas</h1>
          {filteredPhysicalStores.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhysicalStores.map((store, index) => (
                <div key={index} className="bg-[#12171E] rounded-lg overflow-hidden shadow-lg flex flex-col">
                  <img
                    src={store.imgUrl}
                    alt={store.name}
                    className="object-cover w-full h-[200px]"
                  />
                  <div className="p-4 flex-grow">
                    <h2 className="text-lg font-bold text-[#e2e7eb]">{store.name}</h2>
                    <p className="text-[#e2e7eb]">{store.description}</p>
                  </div> 
                  </div> 
              ))}
            </div> 
          ) : (
            <p className="text-[#e2e7eb]">Lo siento, no hay tiendas físicas en tu Región :c</p>
          )}
        <br></br></div>
      )}

      {/* Sección de Tiendas Online */}
      {view === "online" && (
        <div>
          <h1 className="text-xl font-bold text-[#e2e7eb]">Tiendas Online</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {onlineStores.map((store, index) => (
              <div key={index} className="bg-[#12171E] rounded-lg overflow-hidden shadow-lg flex flex-col">
                <img
                  src={store.imgUrl}
                  alt={store.name}
                  className="object-cover w-full h-[200px]"
                />
                <div className="p-4 flex-grow">
                  <h2 className="text-lg font-bold text-[#e2e7eb]">{store.name}</h2>
                  <p className="text-[#e2e7eb]">{store.description}</p>
                </div>
              </div>
            ))}
          </div> <br></br>
        </div>
      )}
    </div> 
  );
};

export default Tiendas;
