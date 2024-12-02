import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import image1 from "../assets/azul.png";
import image2 from "../assets/verde.png";
import image3 from "../assets/negro.png";
import image4 from "../assets/blanco.png";
import image5 from "../assets/rojo.png";
import image6 from "../assets/incoloro.png";
import defaultImage from "../assets/azul.png";

function Profile() {
  const { userId } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    image: "",
    imageNumber: 0,
  });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profileImage: "https://via.placeholder.com/150",
    favoriteCards: [],
    decks: [],
  });
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const images = [
    { src: image1, alt: "Azul" },
    { src: image2, alt: "Verde" },
    { src: image3, alt: "Negro" },
    { src: image4, alt: "Blanco" },
    { src: image5, alt: "Rojo" },
    { src: image6, alt: "Incoloro" },
  ];

  // Función para obtener las barajas del usuario
  useEffect(() => {
    const fetchDecks = async () => {
      if (!userId) {
        console.log("No se encontró userId");
        return; // Si no hay usuario, no hacemos nada
      }
      try {
        const response = await fetch(
          `https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setDecks(data); // Almacenar las barajas en el estado
        } else {
          console.error("Error al obtener las barajas");
        }
      } catch (error) {
        console.error("Error en la petición:", error); // Mostrar error en consola
      }
    };

    fetchDecks();
  }, [userId]); // Se ejecuta cuando el userId está disponible

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://magicarduct.online:3000/obtener-usuario?userId=${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const userData = await response.json();
        const profileImage = getProfileImage(userData.image);

        setProfile((prevProfile) => ({
          ...prevProfile,
          name: userData.userName,
          email: userData.email,
          profileImage: profileImage,
        }));

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    const fetchDecks = async () => {
      if (!userId) {
        console.log("No se encontró userId");
        return;
      }

      try {
        const response = await fetch(
          `https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setDecks(data);
        } else {
          console.error("Error al obtener las barajas");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchDecks();
  }, [userId]);

  // Nueva función para obtener las cartas favoritas
  const fetchFavoriteCards = async () => {
    if (!userId) return;

    try {
      // Petición a tu backend para obtener las cartas favoritas
      const response = await fetch(
        `https://magicarduct.online:3000/api/cartasfavoritas/${userId}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener cartas favoritas");
      }

      const favoriteCards = await response.json(); // Supongamos que es un array de objetos con IDusuario, IDcarta, y numero
      const favoriteCardsData = [];

      // Ahora hacemos peticiones a Scryfall para obtener los detalles de cada carta
      for (const card of favoriteCards) {
        const cardId = card.IDcarta; // Extraemos el ID de carta
        const cardResponse = await fetch(
          `https://api.scryfall.com/cards/${cardId}`
        );
        if (cardResponse.ok) {
          const cardData = await cardResponse.json();
          favoriteCardsData.push({
            id: cardData.id,
            name: cardData.name,
            imageUrl:
              cardData.image_uris?.normal || "https://via.placeholder.com/150", // Placeholder si no hay imagen
          });
        } else {
          console.error(`Error al obtener la carta con ID ${cardId}`);
        }
      }

      setFavoriteCards(favoriteCardsData);
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  useEffect(() => {
    fetchFavoriteCards();
  }, [userId]);

  const getProfileImage = (userId) => {
    switch (userId) {
      case "1":
        return image1;
      case "2":
        return image2;
      case "3":
        return image3;
      case "4":
        return image4;
      case "5":
        return image5;
      case "6":
        return image6;
      default:
        return defaultImage;
    }
  };

  const handleDeleteFavoriteCard = async (cardId) => {
    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/cartasfavoritas/${userId}/${cardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Carta eliminada exitosamente");
      } else {
        console.error("Error al eliminar la carta");
      }
    } catch (error) {
      console.error("Error en la petición de eliminación:", error);
    }
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/usuario/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: editData.name,
            correo: editData.email,
            imageNumber: getImageNumber(editData.image),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      const result = await response.json();
      console.log(result);

      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isEditing || isChangingPassword) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden"; // Desactiva el scroll
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Compensa la desaparición de la barra de scroll
    } else {
      document.body.style.overflow = ""; // Restaura el scroll
      document.body.style.paddingRight = ""; // Restaura el padding
    }

    // Limpia el efecto al desmontar el componente
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isEditing, isChangingPassword]);

  const handleEditProfile = () => {
    setEditData({
      name: profile.name,
      email: profile.email,
      imageNumber: getImageNumber(profile.profileImage),
    });
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
        return 0;
    }
  };

  const handleDeckClick = (deckId) => {
    navigate(`/decks`);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleCerrar = () => {
    setIsChangingPassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSavePassword = async () => {
    if (newPassword === confirmPassword) {
      // Aquí llamas a tu endpoint de cambio de contraseña
      try {
        const response = await fetch(
          `https://magicarduct.online:3000/api/actualizarpassword/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword: newPassword,
            }),
          }
        );

        if (response.ok) {
          alert("Contraseña cambiada exitosamente");
          // Reinicia los campos y cierra el panel
          setIsChangingPassword(false);
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setErrorMessage(
            "Error al cambiar la contraseña. Inténtalo de nuevo."
          );
          console.log(response.text());
        }
      } catch (error) {
        setErrorMessage("Error en la conexión. Inténtalo de nuevo.");
      }
    } else {
      setErrorMessage("Las contraseñas no coinciden.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0b0f14]">
        <h1 className="text-[#e2e7eb] text-2xl">
          Cargando... Espere un momento.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-[#0b0f14] min-h-screen">
      <div className="w-full max-w-[1200px] p-8 flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8">
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-[#12181E] p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold text-[#e2e7eb] mb-4">
                Editar Perfil
              </h2>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="block w-full mb-4 p-2 text-black border-[2px] border-[rgba(255,255,255,0.1)] rounded"
              />
              <div className="grid grid-cols-3 gap-4 mb-4 justify-center max-w-sm mx-auto">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img.src}
                    alt={img.alt}
                    className={`w-16 h-16 rounded-full cursor-pointer border-2 transition-transform duration-200 ease-in-out transform hover:scale-105 ${
                      editData.image === img.src
                        ? "border-[#9ebbd6]"
                        : "border-transparent"
                    }`}
                    onClick={() => {
                      setEditData((prev) => ({
                        ...prev,
                        image: img.src,
                        imageNumber: index + 1,
                      }));
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-[#2a5880] text-white px-4 py-2 rounded hover:bg-[#244b6d] mr-2"
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

        {/* Perfil */}
        <div className="flex-shrink-0 w-full md:w-1/3 bg-[#12181E] p-6 rounded-lg shadow-lg border-[2px] border-[rgba(255,255,255,0.1)] flex flex-col items-center relative">
          <img
            src={profile.profileImage}
            alt="Imagen de perfil"
            className="w-24 h-24 rounded-full mb-4 border-2 border-[rgba(255,255,255,0.1)]"
          />
          {/* Botón para editar imagen de perfil */}
          <button
            onClick={handleEditProfile}
            className="absolute top-4 right-4 text-[#e2e7eb] hover:text-[#babec2]"
            title="Editar imagen de perfil"
          >
            <FaPen />
          </button>
          <h2 className="text-xl font-bold text-[#9ebbd6] text-center">
            {profile.name}
          </h2>
          <p className="text-[#e2e7eb] text-center">{profile.email}</p>
          <button
            onClick={handleChangePassword}
            className="mt-6 px-6 py-3 bg-[#2a5880] text-[#e2e7eb] font-semibold rounded-lg transition-transform transform hover:scale-105 hover:text-[#3587cf] focus:outline-none focus:ring-2 focus:ring-[#3587cf]"
          >
            Cambiar contraseña
          </button>
          {isChangingPassword && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg w-full">
              <h3 className="text-lg font-semibold text-[#e2e7eb]">
                Cambiar Contraseña
              </h3>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="password"
                placeholder="Repetir nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={handleSavePassword}
                  className="px-4 py-2 bg-[#3587cf] text-white font-semibold rounded-lg transition-colors hover:bg-[#244b6d] focus:outline-none focus:ring-2 focus:ring-[#9ebbd6]"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCerrar}
                  className="px-4 py-2 bg-[#244b6d] text-white font-semibold rounded-lg transition-colors hover:bg-[#2a5880] focus:outline-none focus:ring-2 focus:ring-[#9ebbd6]"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mazos y Cartas Favoritas */}
        <div className="flex-grow bg-[#12181E] p-6 rounded-lg shadow-lg border-[2px] border-[rgba(255,255,255,0.1)] flex flex-col space-y-8">
          {/* Mazos */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#3587cf]">Mazos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {decks.length > 0 ? (
                decks.map((deck) => (
                  <div
                    key={deck.idbarajas}
                    className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
                    onClick={() => handleDeckClick(deck.idbarajas)}
                  >
                    <h4 className="text-[#e2e7eb]">{deck.nombre}</h4>
                    <p className="text-[#e2e7eb]">{deck.formato}</p>
                    <p className="text-[#e2e7eb]">{deck.descripcion}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No tienes mazos creados.</p>
              )}
            </div>
          </div>

          {/* Cartas Favoritas */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#3587cf]">
              Cartas Favoritas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteCards.length > 0 ? (
                favoriteCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-gray-800 p-4 rounded-lg relative"
                  >
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-full h-auto mb-2"
                    />
                    <h4 className="text-[#e2e7eb]">{card.name}</h4>
                    <button
                      onClick={() => handleDeleteFavoriteCard(card.id)}
                      className="absolute top-2 right-2 text-[#3587cf] hover:text-[#244b6d] focus:outline-none"
                      title="Eliminar carta favorita"
                    >
                      ❤️
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No hay cartas favoritas.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
