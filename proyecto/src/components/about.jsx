import React from 'react';

const About = () => {
  return (
    <div className="max-w-[1200px] mx-auto mb-[20px] p-4 bg-[#000] min-h-[40vh] h-auto rounded-lg shadow-xl text-white">
      <h1 className="text-4xl font-bold text-[#e85438] text-center mb-6 font-['ROBOTO']">SOBRE NOSOTROS</h1>
      <p className="text-lg leading-relaxed text-center mb-8">
        Bienvenido a nuestra página dedicada al increíble juego de cartas <strong>Magic: The Gathering</strong>. 
        Nuestra misión es ofrecer una plataforma donde los jugadores puedan optimizar la creación de sus mazos utilizando las estadísticas de cada carta, 
        para mejorar su experiencia de juego y tomar decisiones estratégicas informadas.
      </p>
      <p className="text-lg leading-relaxed text-center mb-8">
        Nuestro enfoque está en proporcionar información detallada y análisis de las cartas disponibles, 
        con el objetivo de facilitar la elección de las mejores cartas para cada formato de juego.
      </p>
      <p className="text-lg leading-relaxed text-center">
        Nuestro objetivo es ayudarte a comprender mejor el potencial de cada carta y permitirte construir los mazos más competitivos, 
        basándote en datos y estadísticas confiables. ¡Esperamos que encuentres esta página útil y que disfrutes del mundo de Magic como nunca antes!
      </p>
    </div>
  );
};

export default About;
