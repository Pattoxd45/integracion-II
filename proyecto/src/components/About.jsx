import React from 'react';
import Formatos from './Formatos';
import fondo1 from "../images/imgFormatos/fondo.png";
const About = () => {
  return (
    <>
      <div
        className="relative max-w-[1200px] mx-auto mb-[20px] p-4 sm:p-6 min-h-[40vh] h-auto rounded-lg shadow-xl text-[#e2e7eb] bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo1})`, backgroundSize: 'cover' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#3587cf] text-center mb-6 font-['ROBOTO']">
            SOBRE NOSOTROS
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-center mb-8">
            Bienvenido a nuestra página dedicada al increíble juego de cartas{' '}
            <strong className="font-bold text-xl sm:text-2xl">Magic: The Gathering</strong>.
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

      <Formatos />
    </>
  );
};

export default About;
