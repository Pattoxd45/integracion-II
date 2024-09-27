import React, { useState } from "react";

const Decks = () => {
  const [toggleSelection, setToggleSelection] = useState("Baraja");

  const handleToggle = (selection) => {
    setToggleSelection(selection);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Contenedor de los botones */}
      <div className="flex justify-center space-x-[10px]">
        <button className="w-[595px] h-[46px] bg-[#E83411] text-white font-semibold rounded-md">
          Mis Barajas
        </button>
        <button className="w-[595px] h-[46px] bg-[#1E1E1E] text-white font-semibold rounded-md">
          Explorar Barajas
        </button>
      </div>

      {/* Contenedor del buscador, toggle y botón "Buscar" */}
      <div className="flex mt-[20px] space-x-[6px] items-center">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscador..."
          className="w-[873px] h-[46px] bg-[#000] text-white px-4 rounded-md outline-none"
        />

        {/* Toggle Switch */}
        <div className="flex w-[154px] h-[46px] rounded-md border border-[#ddd]">
          <div
            className={`flex-1 flex items-center justify-center cursor-pointer rounded-l-md ${
              toggleSelection === "Baraja" ? "bg-[#E83411] text-white" : "bg-[#1E1E1E] text-white"
            }`}
            onClick={() => handleToggle("Baraja")}
          >
            Baraja
          </div>
          <div
            className={`flex-1 flex items-center justify-center cursor-pointer rounded-r-md ${
              toggleSelection === "Carta" ? "bg-[#E83411] text-white" : "bg-[#1E1E1E] text-white"
            }`}
            onClick={() => handleToggle("Carta")}
          >
            Cartas
          </div>
        </div>

        {/* Botón "Buscar" */}
        <button className="w-[91px] h-[46px] bg-[#E83411] text-white font-semibold rounded-md">
          Buscar
        </button>
      </div>

      {/* Cartas (20px debajo del buscador) */}
      <div className="flex justify-center mt-[20px] space-x-[25px]">
        {/* Carta 1 */}
        <div className="w-[220px] h-[320px] bg-black border-[4px] border-[#E83411] rounded-md"></div>
        {/* Carta 2 */}
        <div className="w-[220px] h-[320px] bg-black border-[4px] border-[#E83411] rounded-md"></div>
        {/* Carta 3 */}
        <div className="w-[220px] h-[320px] bg-black border-[4px] border-[#E83411] rounded-md"></div>
        {/* Carta 4 */}
        <div className="w-[220px] h-[320px] bg-black border-[4px] border-[#E83411] rounded-md"></div>
        {/* Carta 5 */}
        <div className="w-[220px] h-[320px] bg-black border-[4px] border-[#E83411] rounded-md"></div>
      </div>
    </div>
  );
};

export default Decks;
