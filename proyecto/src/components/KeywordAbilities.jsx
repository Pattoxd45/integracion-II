import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KeywordAbilities = () => {
  const [keywordAbilities, setKeywordAbilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeywordAbilities = async () => {
      try {
        const response = await axios.get('https://api.scryfall.com/catalog/keyword-abilities');
        setKeywordAbilities(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching keyword abilities');
        setLoading(false);
      }
    };

    fetchKeywordAbilities();
  }, []);

  if (loading) return <p className="text-white">Cargando habilidades clave...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-white text-xl mb-4">Habilidades Clave</h2>
      <ul className="text-white list-disc pl-6">
        {keywordAbilities.map((ability, index) => (
          <li key={index}>{ability}</li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordAbilities;
