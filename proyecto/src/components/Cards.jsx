import React from "react";

const Cards = () => {
  return (
    // Contenedor principal
    <div className="max-w-[1200px] mx-auto my-6">
      {/* Contenedor del fondo detrás de las cartas y el texto */}
      <div className="p-6 rounded-lg text-white bg-[#cbcbcb]">
        {/* Grid de cartas */}  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
          <div className="w-[220px] h-[320px] bg-[#000] flex items-center justify-center rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438]">
            Carta I
          </div>
          <div className="w-[220px] h-[320px] bg-[#000] flex items-center justify-center rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438]">
            Carta II
          </div>
          <div className="w-[220px] h-[320px] bg-[#000] flex items-center justify-center rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438]">
            Carta III
          </div>
          <div className="w-[220px] h-[320px] bg-[#000] flex items-center justify-center rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438]">
            Carta IV
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
