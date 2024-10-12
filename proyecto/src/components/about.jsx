import React, { useState } from 'react';
import imagen from '../images/imgNews/imagen1.jpg'; // Importa la imagen aquí

const About = () => {
  const cards = [
    "MAZO CERRADO", "MAZO CERRADO POR EQUIPOS", "BOOSTER DRAFT", "JUMPSTART", 
    "STANDAR", "PIONEER", "MODERN", "LEGACY", "VINTAGE", 
    "PRE-MODERN", "PAUPER", "COMMANDER", "FORMATOS EN MAGIC ARENA"
  ];

  const [visibleRows, setVisibleRows] = useState(2); // Número inicial de filas visibles (2 filas)

  // Calcula cuántas filas se están mostrando, siendo 4 cartas por fila
  const rows = Math.ceil(cards.length / 3);
  
  // Mostrar las cartas según las filas visibles
  const cardsToShow = cards.slice(0, visibleRows * 3); 

  const handleShowMore = () => {
    if (visibleRows < rows) {
      setVisibleRows(prev => prev + 1); // Mostrar una fila más al hacer clic
    }
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto mb-[20px] p-4 bg-[#000] min-h-[40vh] h-auto rounded-lg shadow-xl text-white">
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

      <div className="max-w-[1200px] mx-auto mb-[20px]">
        <div className="rounded-lg text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
            {cardsToShow.map((card, index) => {
              const isSecondRow = visibleRows > 1 && index >= 4 && index < 8; // Verifica si estamos en la segunda fila
              return (
                <div
                  key={index}
                  className={`card w-[220px] h-[320px] flex items-center justify-center rounded-lg border-4 border-[#E83411] shadow-xl relative ${isSecondRow ? 'overflow-hidden' : ''}`}
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-lg" 
                    style={{ backgroundImage: `url(${imagen})` }} // Usa la imagen importada
                  >
                    <div className="bg-gradient-to-b from-transparent to-black h-full rounded-lg opacity-50"></div> {/* Gradiente difuminado */}
                  </div>
                  <div className="relative z-10 text-white text-xl font-bold">{card}</div> {/* Texto de la carta */}
                  {isSecondRow && (
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black"></div>
                  )}
                </div>
              );
            })}
          </div>
          {visibleRows < rows && (
            <div className="flex justify-center mt-8">
              <button 
                className="text-4xl text-[#e85438] hover:text-[#E83411] transition-all duration-300" 
                onClick={handleShowMore}
              >
                ↓
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
