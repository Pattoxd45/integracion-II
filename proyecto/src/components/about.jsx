import React, { useState } from 'react';
import Reglas from './Reglas'; // Asegúrate de importar el componente
import fondo1 from "../images/imgFormatos/fondo.png";
import fondo2 from "../images/imgFormatos/fondo2.png";

const About = () => {
  const tarjetas = [
    "Sealed Deck", 
    "Team Sealed", 
    "BOOSTER DRAFT", 
    "JUMPSTART", 
    "STANDAR", 
    "PIONEER", 
    "MODERN", 
    "LEGACY", 
    "VINTAGE", 
    "HISTORIC", 
    "PAUPER", 
    "COMMANDER", 
    "OATHBREAKER",
    "BRAWL",
    "TWO-HEADED GIANT",
    "ALCHEMY",
    "PLANECHASE",
    "ARCHENEMY",
    "TIMELESS",
    "CONSPIRANCY",
    "FREEFORM",
    "MOMIR BASIC"
  ];

  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 8, tarjetas.length));
  };

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedCardIndex(null);
  };

  return (
    <>
      {/* Contenedor con fondo sin difuminado */}
      <div 
        className="relative max-w-[1200px] mx-auto mb-[20px] p-4 min-h-[40vh] h-auto rounded-lg shadow-xl text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo1})`, backgroundSize: 'cover' }} // Cambié aquí
      >
        {/* Capa semi-transparente encima del fondo */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

        {/* Contenido encima del fondo */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-[#e85438] text-center mb-6 font-['ROBOTO']">SOBRE NOSOTROS</h1>
          <p className="text-lg leading-relaxed text-center mb-8">
            Bienvenido a nuestra página dedicada al increíble juego de cartas <strong className="font-bold text-2xl">Magic: The Gathering</strong>.
            Nuestra misión es ofrecer una plataforma donde los jugadores puedan optimizar la creación de sus mazos utilizando las estadísticas de cada carta,
            para mejorar su experiencia de juego y tomar decisiones estratégicas informadas.
          </p>
          <p className="text-lg leading-relaxed text-center mb-8">
            Nuestro enfoque está en proporcionar información detallada y análisis de las cartas disponibles,
            con el objetivo de facilitar la elección de las mejores cartas para cada formato de juego.
          </p>
          <p className="text-lg leading-relaxed text-center mb-8">
            Nuestro objetivo es ayudarte a comprender mejor el potencial de cada carta y permitirte construir los mazos más competitivos,
            basándote en datos y estadísticas confiables.
          </p>
          <p className="text-lg leading-relaxed text-center mb-8">
            ¡Esperamos que encuentres esta página útil y que disfrutes del mundo de Magic como nunca antes!
          </p>
        </div>
      </div>

      {/* Título y explicación sobre los formatos */}
      <div className="max-w-[1200px] mx-auto mb-[20px] p-4 text-white">
        <h2 className="text-3xl font-bold text-[#e85438] text-center mb-4">Formatos</h2>
        <p className="text-lg leading-relaxed text-center text-black">
          Magic: The Gathering ofrece múltiples formatos de juego, cada uno con sus propias reglas y características. 
          Algunos formatos se enfocan en construir mazos a partir de colecciones específicas de cartas, mientras que otros te permiten
          crear estrategias a partir de cartas lanzadas en cualquier momento de la historia de Magic. Existen formatos casuales y competitivos,
          donde los jugadores pueden experimentar o enfrentarse en torneos oficiales.
        </p>
        <p className="text-lg leading-relaxed text-center text-black">
          A continuación, te presentamos los formatos oficiales de Magic junto con sus reglas principales. Cada uno de estos formatos tiene
          un conjunto de cartas permitidas, condiciones de victoria y reglas específicas, que hacen de Magic un juego tan dinámico y diverso.
          Ya sea que prefieras construir mazos rápidamente en sellados o disfrutar de complejas estrategias en Commander, existe un formato
          ideal para cada tipo de jugador.
        </p>
      </div>

      {/* Sección de tarjetas */}
      <div className="max-w-[1200px] mx-auto mb-[20px] p-4 min-h-[40vh] h-auto rounded-lg text-white">
        <div className="flex flex-wrap justify-between">
          {tarjetas.slice(0, visibleCount).map((tarjeta, index) => (
            <div 
              key={index} 
              className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1rem)] md:w-[calc(25%-1rem)] h-[100px] border-4 border-[#e85438] relative flex items-center justify-center rounded-lg mb-4 cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:border-[#e85438] hover:shadow-[0_0_30px_rgba(232,52,17,1)]" 
              onClick={() => handleCardClick(index)}
            >
              {/* Imagen de fondo difuminada y oscurecida */} 
              <div 
                className="absolute inset-0 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${fondo2})`, // Cambié aquí
                  backgroundSize: 'cover',
                  filter: 'blur(5px) brightness(0.6)',
                  zIndex: 0,
                }}
              ></div>

              {/* Texto dentro de la tarjeta */}
              <p className="relative z-10 text-base md:text-lg lg:text-xl font-semibold text-[#e85438] text-center p-2 bg-black bg-opacity-40 rounded-lg">
                {tarjeta}
              </p>
            </div>
          ))}
        </div>

        {visibleCount < tarjetas.length && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleLoadMore} 
              className="bg-[#e85438] text-white px-4 py-2 rounded-lg hover:bg-[#d8432b]"
            >
              ➕ Cargar más
            </button>
          </div>
        )}
      </div>

      {/* Modal para mostrar información de la tarjeta */}
      <Reglas 
        selectedCardIndex={selectedCardIndex} 
        tarjetas={tarjetas} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default About;
