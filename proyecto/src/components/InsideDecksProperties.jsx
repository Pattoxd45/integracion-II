import React from "react";

const InsideDecksProperties = () => {
  return (
    <div className="overflow-y-auto h-[76vh] space-y-4 rounded-md">
      {/* Contenedor de cubos con tamaño fijo */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {/* Cubo 1 */}
        <div className="w-full h-[450px] bg-[#1E1E1E] rounded-md"></div>

        {/* Cubo 2 */}
        <div className="w-full h-[450px] bg-[#1E1E1E] rounded-md"></div>

        {/* Cubo 3 */}
        <div className="w-full h-[450px] bg-[#1E1E1E] rounded-md"></div>

        {/* Cubo 4 */}
        <div className="w-full h-[450px] bg-[#1E1E1E] rounded-md"></div>
      </div>

      {/* Rectángulo adicional con width completo y altura fija */}
      <div className="w-full h-[550px] bg-[#1E1E1E] rounded-md"></div>
    </div>
  );
};

export default InsideDecksProperties;
