import React, { useState } from 'react';

const palabras = ['CONTRAHECHIZO', 'CONFIDENTEOSCURO', 'RELÁMPAGO', 'LOTONEGRO', 'TARMOGOYF'];
const palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];

const Minijuegos = () => {
  const [intentos, setIntentos] = useState(Array(6).fill(''));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== palabraSecreta.length) {
      alert(`La palabra debe tener ${palabraSecreta.length} letras.`);
      return;
    }

    const newAttempts = [...intentos];
    newAttempts[currentAttempt] = input;
    setIntentos(newAttempts);
    setCurrentAttempt(currentAttempt + 1);
    setInput('');
  };

  const getLetterClass = (letter, index) => {
    if (palabraSecreta[index] === letter) {
      return 'bg-green-500';
    } else if (palabraSecreta.includes(letter)) {
      return 'bg-yellow-500';
    } else {
      return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Minijuegos</h1>
      <p className="mb-4">Adivina la palabra secreta:</p>
      <div className="grid grid-rows-6 gap-2">
        {intentos.map((attempt, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-10 gap-1">
            {Array.from({ length: palabraSecreta.length }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`border p-0.5 ${attempt[colIndex] ? getLetterClass(attempt[colIndex], colIndex) : ''}`}
              >
                {attempt[colIndex] || ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      {currentAttempt < 6 && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="border p-2 mb-4 w-full"
            maxLength={palabraSecreta.length}
          />
          <button type="submit" className="bg-blue-500 text-white p-2">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default Minijuegos;