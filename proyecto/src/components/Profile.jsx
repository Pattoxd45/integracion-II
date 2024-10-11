import React, { useState } from 'react';
import { useUser } from './UserContext';

function Profile() {
  const { userProfile } = useUser(); // Obtén el userProfile del contexto
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    image: '',
    description: '',
  });

  // Si no hay un perfil, muestra un perfil por defecto
  const defaultProfile = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    profileImage: 'https://via.placeholder.com/150',
    favoriteCards: [
      { name: 'Black Lotus', image: 'https://via.placeholder.com/100' },
      { name: 'Mox Emerald', image: 'https://via.placeholder.com/100' },
    ],
    decks: [
      {
        name: 'Mazo 1',
        image: 'https://via.placeholder.com/200',
        description: 'Este es un mazo de control con criaturas voladoras.',
      },
      {
        name: 'Mazo 2',
        image: 'https://via.placeholder.com/200',
        description: 'Este mazo está centrado en combos rápidos.',
      },
    ],
  };

  const profile = userProfile || defaultProfile; // Usa el perfil del contexto o el perfil por defecto

  // Maneja el inicio de la edición
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(profile.decks[index]);
  };

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios y salir del modo edición
  const handleSave = () => {
    const updatedDecks = profile.decks.map((deck, index) =>
      index === editIndex ? editData : deck
    );
    profile.decks = updatedDecks; // Actualiza directamente el perfil
    setEditIndex(null);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-8 bg-gradient-to-br from-black via-gray-900 to-red-900 min-h-screen">
      {/* Perfil de usuario */}
      <div className="text-left shadow-lg p-4 rounded-lg bg-black border border-red-500">
        <img
          src={profile.profileImage}
          alt="Imagen de perfil"
          className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-red-500"
        />
        <h2 className="text-lg font-bold text-red-500">{profile.name}</h2>
        <p className="text-sm text-gray-400">{profile.email}</p>
      </div>

      {/* Contenido */}
      <div className="flex-grow md:ml-40 p-8 space-y-8">
        {/* Sección de cartas favoritas */}
        <div className="bg-black p-6 rounded-lg shadow-md border border-red-500">
          <h3 className="text-xl font-semibold mb-4 text-red-500">Cartas Favoritas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {profile.favoriteCards.map((card, index) => (
              <div key={index} className="text-center">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-auto rounded-lg mb-2 transition-transform transform hover:scale-105 hover:brightness-90 duration-300 ease-in-out border-2 border-red-500"
                />
                <p className="text-sm font-medium text-gray-200">{card.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de mazos */}
        <div className="bg-black p-6 rounded-lg shadow-md border border-red-500">
          <h3 className="text-xl font-semibold mb-4 text-red-500">Mazos Creados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.decks.map((deck, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform duration-300 cursor-pointer p-4 rounded-lg shadow-lg hover:shadow-2xl border border-red-500"
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                {editIndex === index ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      placeholder="Nombre del mazo"
                      className="block w-full mb-2 p-2 bg-gray-800 text-gray-100 border border-red-500 rounded"
                    />
                    <input
                      type="text"
                      name="image"
                      value={editData.image}
                      onChange={handleChange}
                      placeholder="URL de la imagen"
                      className="block w-full mb-2 p-2 bg-gray-800 text-gray-100 border border-red-500 rounded"
                    />
                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                      placeholder="Descripción"
                      className="block w-full mb-2 p-2 bg-gray-800 text-gray-100 border border-red-500 rounded"
                    />

                    <button
                      onClick={handleSave}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div>
                    <img
                      src={deck.image}
                      alt={deck.name}
                      className="w-full h-48 rounded-lg object-cover mb-4 transition-transform transform hover:scale-105 duration-300"
                    />
                    <h4 className="text-lg font-bold mb-2">{deck.name}</h4>
                    <p className="text-gray-300">{deck.description}</p>
                    <button
                      onClick={() => handleEdit(index)}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
