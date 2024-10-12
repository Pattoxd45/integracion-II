import React, { useState } from 'react';

import reloj from "../images/imgAbout/reloj.png";
import jugador from "../images/imgAbout/jugador.png";
import mazo from "../images/imgAbout/mazo.png";

const About = () => {
  const tarjetas = [
    "MAZO CERRADO", 
    "MAZO CERRADO POR EQUIPOS", 
    "BOOSTER DRAFT", 
    "JUMPSTART", 
    "STANDAR", 
    "PIONEER", 
    "MODERN", 
    "LEGACY", 
    "VINTAGE", 
    "PRE-MODERN", 
    "PAUPER", 
    "COMMANDER", 
    "FORMATOS EN MAGIC ARENA",
    "FORMATO",
    "FORMATO",
    "FORMATO",
    "FORMATO",
    "FORMATO",
    "FORMATO",
    "FORMATO",
  ];

  // Información adicional para cada tarjeta
  const Info = [
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "Cada jugador comienza con 20 puntos de vida. El objetivo es reducir la vida de tu oponente a cero.",
      cantidadJugadores: "2",
      duracionPartida: "20 minutos",
      TamMazo: "40 cartas o más",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "Formato de Mazo Cerrado por Equipos: dos equipos de dos jugadores cada uno. Juegan contra otro equipo.",
      cantidadJugadores: "4 jugadores en total",
      duracionPartida: "1 a 2 horas",
      TamMazo: "Normalmente entre 60 y 80 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    {
      infoAdicional: "Aquí puedes agregar información adicional sobre la tarjeta seleccionada.",
      reglas: "El Booster Draft permite a los jugadores construir mazos a partir de cartas seleccionadas de boosters.",
      cantidadJugadores: "8 jugadores en total.",
      duracionPartida: "2 a 3 horas",
      TamMazo: "Normalmente entre 40 y 60 cartas",
    },
    // Agrega más objetos de Info según sea necesario
    // ...
  ];

  const [visibleCount, setVisibleCount] = useState(8); // Inicialmente mostrar 8 tarjetas
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Índice de la tarjeta seleccionada

  const handleLoadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 8, tarjetas.length));
  };

  const handleCardClick = (index) => {
    setSelectedCardIndex(index); // Establecer el índice de la tarjeta seleccionada
  };

  const handleCloseModal = () => {
    setSelectedCardIndex(null); // Cerrar el modal
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

      <div className="max-w-[1200px] mx-auto mb-[20px] p-4 min-h-[40vh] h-auto rounded-lg text-white">
        <div className="flex flex-wrap justify-between">
          {tarjetas.slice(0, visibleCount).map((tarjeta, index) => (
            <div 
              key={index} 
              className="w-[calc(25%-1rem)] aspect-[4/3] border-4 border-[#e85438] bg-[#000] flex items-center justify-center rounded-lg mb-4 cursor-pointer"
              onClick={() => handleCardClick(index)} // Manejar el clic en la tarjeta
            >
              <p className="text-base md:text-lg lg:text-xl font-semibold text-[#e85438] text-center p-2">{tarjeta}</p>
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
      {selectedCardIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
          onClick={handleCloseModal} // Cerrar modal al hacer clic fuera
        >
          <div 
            className="bg-[#000] p-6 rounded-lg border-4 border-[#e85438] relative" 
            onClick={e => e.stopPropagation()} // Evitar que el clic en el cuadro cierre el modal
          >
            <h2 className="text-2xl text-[#e85438] mb-4">{tarjetas[selectedCardIndex]}</h2>
            <p className="text-lg text-white">{Info[selectedCardIndex].infoAdicional}</p>
            <h3 className="text-xl text-[#e85438] mt-4">Reglas del juego</h3>
            <p className="text-lg text-white">{Info[selectedCardIndex].reglas}</p>
            <div className="flex justify-around mt-4">
              <div className="text-center">
                <img src={mazo} alt="Tamaño del mazo" className="mx-auto mb-2" />
                <p className="text-[#e85438] font-bold">Tamaño del Mazo</p>
                <p className="text-white">{Info[selectedCardIndex].TamMazo}</p>
              </div>
              <div className="text-center">
                <img src={jugador} alt="Número de jugadores" className="mx-auto mb-2" />
                <p className="text-[#e85438] font-bold">Número de Jugadores</p>
                <p className="text-white">{Info[selectedCardIndex].cantidadJugadores}</p>
              </div>
              <div className="text-center">
                <img src={reloj} alt="Duración del juego" className="mx-auto mb-2" />
                <p className="text-[#e85438] font-bold">Duración de un Juego</p>
                <p className="text-white">{Info[selectedCardIndex].duracionPartida}</p>
              </div>
            </div>
            <button 
              onClick={handleCloseModal} 
              className="absolute top-2 right-2 text-[#e85438] hover:text-white"
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
