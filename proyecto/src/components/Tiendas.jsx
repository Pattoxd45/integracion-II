import React, { useState } from "react";
import DetTiendas from "./DetTiendas";

// Función para importar todas las imágenes de una carpeta
const importAllImages = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item); // Guardar en un objeto
  });
  return images;
};

// Usar require.context para importar imágenes
const images = importAllImages(
  require.context("../images/imgTiendas", false, /\.(png|jpe?g|svg|webp)$/),
);

// Cargar datos de tiendas desde archivos JSON
const physicalStoresData = require("../info/ListTFisicas.json");
const onlineStoresData = require("../info/ListTonline.json");

const Tiendas = () => {
  const [view, setView] = useState("all");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Puedes asumir que los datos JSON tienen la estructura correcta
  const physicalStores = physicalStoresData; // Datos de tiendas físicas
  const onlineStores = onlineStoresData; // Datos de tiendas online

  const regions = [...new Set(physicalStores.map((store) => store.region))];

  const displayedStores =
    view === "all"
      ? [...physicalStores, ...onlineStores]
      : view === "physical"
        ? physicalStores.filter(
            (store) =>
              selectedRegion === "all" || store.region === selectedRegion,
          )
        : onlineStores;

  const openModal = (store) => {
    setSelectedStore(store);
  };

  const closeModal = () => {
    setSelectedStore(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 space-y-8">
      <div>
        <h1 className="text-xl font-bold text-[#e2e7eb]">
          Seleccionar Tiendas:
        </h1>
        <button
          className={`mr-4 p-2 rounded ${view === "all" ? "bg-[#3b3b3b]" : "bg-[#12171E]"} text-[#e2e7eb]`}
          onClick={() => {
            setView("all");
            setSelectedRegion("all"); // Resetear región al mostrar todas
          }}
        >
          Todas
        </button>
        <button
          className={`mr-4 p-2 rounded ${view === "physical" ? "bg-[#3b3b3b]" : "bg-[#12171E]"} text-[#e2e7eb]`}
          onClick={() => {
            setView("physical");
            setSelectedRegion("all"); // Resetear región al mostrar tiendas físicas
          }}
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

      {/* Filtro por región para tiendas físicas */}
      {view === "physical" && (
        <div className="my-4">
          <label className="text-[#e2e7eb] mr-2">Filtrar por región:</label>
          <select
            className="p-2 rounded bg-[#2a2a2a] text-[#e2e7eb]"
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">Todas</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Vista previa de tiendas */}
      <div
        className={`grid ${displayedStores.length === 1 ? "flex justify-center" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"} gap-4`}
      >
        {displayedStores.map((store, index) => (
          <StoreCard key={index} store={store} onClick={openModal} />
        ))}
      </div>

      {/* Modal con detalles de la tienda */}
      {selectedStore && (
        <DetTiendas store={selectedStore} onClose={closeModal} />
      )}
      <br />
    </div>
  );
};

const StoreCard = ({ store, onClick }) => (
  <div
    onClick={() => onClick(store)} // Manejar clic en la tienda
    className="bg-[#12171E] rounded-lg overflow-hidden shadow-lg flex flex-col cursor-pointer max-h-[300px] max-w-[300px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#2d5980]/50" // Clases de Tailwind para efectos
  >
    <img
      src={images[store.imgUrl]} // Accediendo a la imagen usando el objeto de imágenes
      alt={store.name}
      className="object-cover w-full h-[60%] max-h-[180px]"
    />
    <div className="p-4 flex-grow">
      <h2 className="text-lg font-bold text-[#e2e7eb]">{store.name}</h2>
      <p className="text-[#e2e7eb]">{store.description}</p>
    </div>
  </div>
);

export default Tiendas;
