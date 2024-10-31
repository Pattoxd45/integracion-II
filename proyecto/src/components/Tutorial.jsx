// src/components/Tutorial.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tutorial = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardPromises = Array.from({ length: 5 }, () => 
          axios.get('https://api.scryfall.com/cards/random')
        );
        const responses = await Promise.all(cardPromises);
        setCards(responses.map(response => response.data));
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div className="text-2xl text-blue-500">Cargando cartas...</div>;
  }

  return (
    <div className="p-8 bg-gray-900 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Magic: The Gathering</h1>
      <p className="mb-8 text-lg">Este tutorial te enseñará lo básico sobre cómo jugar.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-gray-800 rounded-lg p-4 transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
            {card.image_uris && (
              <img
                src={card.image_uris.normal} 
                alt={card.name} 
                className="w-full h-auto mb-4 rounded-lg shadow-lg"
              />
            )}
            <p className="text-sm mb-2">{card.type_line}</p>
            <p className="text-sm">{card.oracle_text}</p>
          </div>
        ))}
      </div>

      <button 
        onClick={() => window.scrollTo(0, 0)}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default Tutorial;
