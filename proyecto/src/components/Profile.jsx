import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { FaPen } from 'react-icons/fa';
import image1 from '../assets/azul.png';
import image2 from '../assets/verde.png';
import image3 from '../assets/negro.png';
import image4 from '../assets/blanco.png';
import image5 from '../assets/rojo.png';
import image6 from '../assets/incoloro.png';

function Profile() {
  const { userId } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    image: '',
    imageNumber: 0, // Agregar el número de imagen
  });
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profileImage: 'https://via.placeholder.com/150',
    favoriteCards: [],
    decks: [],
  });
  const [loading, setLoading] = useState(true);

  // Imágenes disponibles para seleccionar
  const images = [
    { src: image1, alt: 'Azul' },
    { src: image2, alt: 'Verde' },
    { src: image3, alt: 'Negro' },
    { src: image4, alt: 'Blanco' },
    { src: image5, alt: 'Rojo' },
    { src: image6, alt: 'Incoloro' },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://186.64.122.218:3000/obtener-usuario?userId=${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const userData = await response.json();
        console.log(userData);

        const profileImage = getProfileImage(userData.image);
        setProfile((prevProfile) => ({
          ...prevProfile,
          name: userData.userName,
          email: userData.email,
          profileImage: profileImage,
        }));

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const getProfileImage = (userId) => {
    switch (userId) {
      case 1:
        return image1;
      case 2:
        return image2;
      case 3:
        return image3;
      case 4:
        return image4;
      case 5:
        return image5;
      case 6:
        return image6;
      default:
        return 'https://via.placeholder.com/150';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://186.64.122.218:3000/api/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: editData.name,
          imageNumber: editData.imageNumber, // Enviar el número de imagen
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
  
      const result = await response.json();
      console.log(result);
  
      setIsEditing(false);
      // Recargar la página después de guardar
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditProfile = () => {
    setEditData({ name: profile.name, image: profile.profileImage, imageNumber: getImageNumber(profile.profileImage) });
    setIsEditing(true);
  };

  const getImageNumber = (image) => {
    switch (image) {
      case image1:
        return 1;
      case image2:
        return 2;
      case image3:
        return 3;
      case image4:
        return 4;
      case image5:
        return 5;
      case image6:
        return 6;
      default:
        return 0; // Imagen por defecto
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <h1 className="text-red-500 text-2xl">Cargando... Espere un momento.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between p-8 bg-gradient-to-br from-black via-gray-900 to-red-900 min-h-screen">
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-red-500 mb-4">Editar Perfil</h2>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="block w-full mb-4 p-2 bg-gray-700 text-gray-100 border border-red-500 rounded"
            />
            <div className="flex overflow-x-auto space-x-4 mb-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 ${editData.image === img.src ? 'border-red-500' : 'border-transparent'}`}
                  onClick={() => {
                    setEditData((prev) => ({
                      ...prev,
                      image: img.src,
                      imageNumber: index + 1 // Cambia el número de imagen (1-6)
                    }));
                  }}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-left shadow-lg p-4 rounded-lg bg-black border border-red-500 relative">
        <img
          src={profile.profileImage}
          alt="Imagen de perfil"
          className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-red-500"
        />
        <button
          onClick={handleEditProfile}
          className="absolute top-2 right-2 text-red-500 hover:text-red-300"
        >
          <FaPen />
        </button>
        <h2 className="text-lg font-bold text-red-500 text-center">{profile.name}</h2>
        <p className="text-gray-200 text-center">{profile.email}</p>
      </div>

      {/* Contenido */}
      <div className="flex-grow md:ml-40 p-8 space-y-8">
        {/* Sección de cartas favoritas */}
        <div className="bg-black p-6 rounded-lg shadow-md border border-red-500">
          <h3 className="text-xl font-semibold mb-4 text-red-500">Cartas Favoritas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {profile.favoriteCards.length > 0 ? (
              profile.favoriteCards.map((card, index) => (
                <div key={index} className="text-center">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-auto rounded-lg mb-2 transition-transform transform hover:scale-105 hover:brightness-90 duration-300 ease-in-out border-2 border-red-500"
                  />
                  <p className="text-sm font-medium text-gray-200">{card.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No hay cartas favoritas aún.</p>
            )}
          </div>
        </div>

        {/* Sección de mazos */}
        <div className="bg-black p-6 rounded-lg shadow-md border border-red-500">
          <h3 className="text-xl font-semibold mb-4 text-red-500">Mazos Creados</h3>
          <div className="space-y-4">
            {profile.decks.length > 0 ? (
              profile.decks.map((deck, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-md border border-red-500">
                  <h4 className="text-lg font-semibold text-red-500">{deck.name}</h4>
                  <p className="text-gray-200">{deck.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No hay mazos creados aún.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
