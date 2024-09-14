import React from "react";

const Cards = () => {
  return (
    <div className="max-w-[1200px] mx-auto my-6">
      <div className="p-6 rounded-lg text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
          {["Carta I", "Carta II", "Carta III", "Carta IV"].map((card, index) => (
            <div
              key={index}
              className="card w-[220px] h-[320px] bg-[#000] flex items-center justify-center rounded-lg border-4 border-[#E83411] shadow-xl hover:border-[#e85438] transition-all duration-300"
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;