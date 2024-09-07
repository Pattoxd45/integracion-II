import React from "react";

const Hero = () => {
  return (
    // Contenedor principal
    <div className="max-w-[1240px] mx-auto p-4 bg-[#E0FBFC]">
      {/* Contenedor del fondo detrás de las cartas y el texto */}
      <div className="bg-[#C2DFE3] p-6 rounded-lg shadow-md text-white">
        {/* Grid de cartas */}  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
          <div className="w-[220px] h-[320px] bg-[#5C6B73] flex items-center justify-center rounded-lg border-4 border-[#9DB4C0] shadow-md">
            Carta I
          </div>
          <div className="w-[220px] h-[320px] bg-[#5C6B73] flex items-center justify-center rounded-lg border-4 border-[#9DB4C0] shadow-md">
            Carta II
          </div>
          <div className="w-[220px] h-[320px] bg-[#5C6B73] flex items-center justify-center rounded-lg border-4 border-[#9DB4C0] shadow-md">
            Carta III
          </div>
          <div className="w-[220px] h-[320px] bg-[#5C6B73] flex items-center justify-center rounded-lg border-4 border-[#9DB4C0] shadow-md">
            Carta IV
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
