import React from "react";

const Hero = () => {
  return (
    // Contenedor principal
    <div className="max-w-[1240px] mx-auto p-4">
      {/* Contenedor del fondo detrás de las cartas y el texto */}
      <div classNam="bg-[#2e2e2e] p-6 pt-4 rounded-lg">
        <h1 className="text-left text-black mb-4 text-[18px]">
          Últimas cartas buscadas:
        </h1>
        
        {/* Grid de cartas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
          <div className="w-[220px] h-[320px] bg-[#1a1a1a] text-white flex items-center justify-center rounded-lg border-4 border-[#ddd]">
            Carta I
          </div>
          <div className="w-[220px] h-[320px] bg-[#1a1a1a] text-white flex items-center justify-center rounded-lg border-4 border-[#ddd]">
            Carta II
          </div>
          <div className="w-[220px] h-[320px] bg-[#1a1a1a] text-white flex items-center justify-center rounded-lg border-4 border-[#ddd]">
            Carta III
          </div>
          <div className="w-[220px] h-[320px] bg-[#1a1a1a] text-white flex items-center justify-center rounded-lg border-4 border-[#ddd]">
            Carta IV
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
