import React, { useState } from 'react';
import Reglas from './Reglas';
import fondo1 from "../images/imgFormatos/fondo.png";
import fondo2 from "../images/imgFormatos/fondo2.png";
import fondo3 from "../images/imgFormatos/fondo3.png"; // Importar fondo3
import fondo4 from "../images/imgFormatos/fondo4.png"; // Importar fondo4

const About = () => {
  const tarjetas = [
    { nombre: "Sealed Deck", categoria: "Limitados" }, 
    { nombre: "Team Sealed", categoria: "Limitados" }, 
    { nombre: "Booster Draft", categoria: "Limitados" }, 
    { nombre: "Jumpstart", categoria: "Limitados" }, 
    { nombre: "Standard", categoria: "Constructed" }, 
    { nombre: "Pioneer", categoria: "Constructed" }, 
    { nombre: "Modern", categoria: "Constructed" }, 
    { nombre: "Legacy", categoria: "Constructed" }, 
    { nombre: "Vintage", categoria: "Constructed" }, 
    { nombre: "Historic", categoria: "Constructed" }, 
    { nombre: "Pauper", categoria: "Constructed" }, 
    { nombre: "Commander", categoria: "Constructed" }, 
    { nombre: "Oathbreaker", categoria: "Constructed" },
    { nombre: "Brawl", categoria: "Constructed" },
    { nombre: "Two-Headed Giant", categoria: "Especiales" },
    { nombre: "Alchemy", categoria: "Especiales" },
    { nombre: "Planechase", categoria: "Especiales" },
    { nombre: "Archenemy", categoria: "Especiales" },
    { nombre: "Timeless", categoria: "Especiales" },
    { nombre: "Conspiracy", categoria: "Especiales" },
    { nombre: "Freeform", categoria: "Especiales" },
    { nombre: "Momir Basic", categoria: "Especiales" }
  ];

  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 8, tarjetas.length));
  };

  const handleCardClick = (index) => {
    setSelectedFormat(index); // Cambiado para usar el índice
  };

  const handleCloseModal = () => {
    setSelectedFormat(null);
  };

  // Función para seleccionar el fondo según la categoría
  const getBackgroundImage = (categoria) => {
    switch (categoria) {
      case "Limitados":
        return fondo2;
      case "Constructed":
        return fondo3;
      case "Especiales":
        return fondo4;
      default:
        return fondo2; // Valor predeterminado
    }
  };

  return (
    <>
      <div 
        className="relative max-w-[1200px] mx-auto mb-[20px] p-4 sm:p-6 min-h-[40vh] h-auto rounded-lg shadow-xl text-[#e2e7eb] bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo1})`, backgroundSize: 'cover' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#3587cf] text-center mb-6 font-['ROBOTO']">SOBRE NOSOTROS</h1>
          <p className="text-base sm:text-lg leading-relaxed text-center mb-8">
            Bienvenido a nuestra página dedicada al increíble juego de cartas <strong className="font-bold text-xl sm:text-2xl">Magic: The Gathering</strong>.
            Nuestra misión es ofrecer una plataforma donde los jugadores puedan optimizar la creación de sus mazos utilizando las estadísticas de cada carta,
            para mejorar su experiencia de juego y tomar decisiones estratégicas informadas.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-center mb-8">
            Nuestro enfoque está en proporcionar información detallada y análisis de las cartas disponibles,
            con el objetivo de facilitar la elección de las mejores cartas para cada formato de juego.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-center mb-8">
            Nuestro objetivo es ayudarte a comprender mejor el potencial de cada carta y permitirte construir los mazos más competitivos,
            basándote en datos y estadísticas confiables.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-center mb-8">
            ¡Esperamos que encuentres esta página útil y que disfrutes del mundo de Magic como nunca antes!
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mb-[20px] p-4 text-[#e2e7eb]">
        <h2 className="text-3xl font-bold text-[#3587cf] text-center mb-4">Formatos</h2>
        <p className="text-lg leading-relaxed text-center text-[#e2e7eb]">
          Magic: The Gathering ofrece varios formatos de juego, cada uno con reglas y características únicas. Algunos formatos permiten construir mazos con colecciones específicas, mientras que otros permiten estrategias con cartas de toda la historia de Magic.
        </p>
        <p className="text-lg leading-relaxed text-center text-[#e2e7eb]">
          <strong>Formatos Limitados:</strong> Se juegan con cartas de un pool restringido, construyendo mazos a partir de lo que se obtiene en boosters.
        </p>
        <p className="text-lg leading-relaxed text-center text-[#e2e7eb]">
          <strong>Formatos Constructed:</strong> Permiten la creación de mazos a partir de una colección más amplia, con listas de cartas prohibidas o restringidas.
        </p>
        <p className="text-lg leading-relaxed text-center text-[#e2e7eb]">
          <strong>Formatos Especiales:</strong> Incluyen variantes y reglas que pueden alterar significativamente la experiencia de juego.
        </p>
      </div>

      {/* Sección de tarjetas */}
      <div className="max-w-[1200px] mx-auto mb-[20px] p-4 min-h-[40vh] h-auto rounded-lg text-[#e2e7eb]">
        <div className="flex flex-wrap justify-between">
          {tarjetas.slice(0, visibleCount).map((tarjeta, index) => (
            <div 
              key={index} 
              className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1rem)] md:w-[calc(25%-1rem)] h-[100px] border-4 border-[#2a5880] relative flex items-center justify-center rounded-lg mb-4 cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:border-[#2d5980] hover:shadow-[0_0_30px_rgba(0,200,240,1)]" 
              onClick={() => handleCardClick(index)} // Pasa el índice del formato seleccionado
            >
              {/* Imagen de fondo difuminada y oscurecida */} 
              <div 
                className="absolute inset-0  bg-cover bg-center"
                style={{
                  backgroundImage: `url(${getBackgroundImage(tarjeta.categoria)})`, // Usa la función para determinar el fondo
                  backgroundSize: 'cover',
                  //filter: 'blur(5px) brightness(0.6)',
                  zIndex: 0,
                }}
              ></div>

              {/* Div para la categoría superpuesta */} 
              <div className="absolute -top-4 left-4 bg-black bg-opacity-70 text-[#e2e7eb] text-xs font-bold px-2 py-1 rounded z-20">
                {tarjeta.categoria} {/* Muestra la categoría aquí */}
              </div>

              {/* Texto dentro de la tarjeta */} 
              <p className="relative z-10 text-base md:text-lg lg:text-xl font-semibold text-[#e2e7eb] text-center p-2 bg-black bg-opacity-40 rounded-lg">
                {tarjeta.nombre} {/* Muestra el nombre aquí */}
              </p>
            </div>
          ))}
        </div>

        {visibleCount < tarjetas.length && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleLoadMore} 
              className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded-lg hover:bg-[#2d5980]"
            >
              ➕ Cargar más
            </button>
          </div>
        )}
      </div>

      {/* Modal para mostrar información de la tarjeta */}
      {selectedFormat !== null && (
        <Reglas 
          selectedCardIndex={selectedFormat} // Pasa el índice seleccionado
          tarjetas={tarjetas} // Pasa el array de tarjetas
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default About;