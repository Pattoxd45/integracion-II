import React, { useState, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs"; // Ícono de tres puntos
import { useUser } from "./UserContext"; // Contexto para obtener el userId
import InsideDecks from "./InsideDecks"; // Importar InsideDecks para mostrarlo en el modal

const Decks = () => {
  const { userId } = useUser(); // Obtener el userId del contexto
  const [decks, setDecks] = useState([]); // Estado para almacenar las barajas
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto
  const [isInsideDecksOpen, setIsInsideDecksOpen] = useState(false); // Controla si el modal de InsideDecks está abierto
  const [selectedDeckName, setSelectedDeckName] = useState(""); // Estado para almacenar el nombre de la baraja seleccionada
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el texto del buscador
  const [newDeckName, setNewDeckName] = useState(""); // Nombre de la nueva baraja
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const [isSubmitting, setIsSubmitting] = useState(false); // Controla el estado de envío
  const [activeDeck, setActiveDeck] = useState(null); // Para controlar el menú desplegable
  const [renameDeckId, setRenameDeckId] = useState(null); // Controla la baraja a renombrar
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false); // Controla si el modal de renombrar está abierto
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false); // Estado para el modal de confirmación
  const [deckToDelete, setDeckToDelete] = useState(null); // ID de la baraja a eliminar

  // Función para abrir el modal de confirmación
  const openDeleteConfirmModal = (deckId) => {
    setDeckToDelete(deckId); // Guarda el ID de la baraja a eliminar
    setIsDeleteConfirmModalOpen(true); // Muestra el modal
  };

  // Función para cerrar el modal de confirmación
  const closeDeleteConfirmModal = () => {
    setDeckToDelete(null); // Limpia el ID de la baraja
    setIsDeleteConfirmModalOpen(false); // Oculta el modal
  };

  // Función para manejar la confirmación de eliminación
  const handleConfirmDelete = async () => {
    if (deckToDelete) {
      await handleDeleteDeck(deckToDelete); // Llama a la función de eliminación existente
      closeDeleteConfirmModal(); // Cierra el modal después de eliminar
    }
  };

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

          // Itera sobre cada baraja para obtener la imagen de la primera carta
          const decksWithImages = await Promise.all(
            data.map(async (deck) => {
              const image = await fetchFirstCardImage(deck.idbarajas); // Obtiene la imagen de la primera carta
              return { ...deck, image }; // Añade la propiedad `image` a la baraja
            })
          );

          setDecks(decksWithImages); // Actualiza el estado con las barajas y sus imágenes
        } else {
          console.error("Error al obtener las barajas");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      } finally {
        setIsLoading(false); // Termina el estado de carga
      }
    };

    fetchDecks();
  }, [userId]);

  const fetchFirstCardImage = async (deckId) => {
    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/mazocartas/${deckId}`
      );

      if (response.ok) {
        const cards = await response.json();
        if (cards.length > 0) {
          const firstCardId = cards[0].IDcarta; // Asumiendo que la respuesta contiene IDcarta
          const scryfallResponse = await fetch(
            `https://api.scryfall.com/cards/${firstCardId}`
          );

          if (scryfallResponse.ok) {
            const cardData = await scryfallResponse.json();
            return (
              cardData.image_uris?.png ||
              `${process.env.PUBLIC_URL}/Cartas2.png`
            );
          }
        }
      }
    } catch (error) {
      console.error(`Error al obtener la carta para el mazo ${deckId}:`, error);
    }
    return `${process.env.PUBLIC_URL}/Cartas2.png`; // Retornar imagen por defecto si hay error o no hay cartas
  };

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
  };

  // Función para abrir el modal de creación
  const openModal = () => {
    setIsModalOpen(true);
    setModalMessage("");
    setNewDeckName("");
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNewDeckName("");
    setModalMessage("");
  };

  // Función para crear la baraja utilizando la API
  const handleCreateDeck = async () => {
    if (newDeckName.trim() === "") {
      setModalMessage("El nombre de la baraja no puede estar vacío.");
      return;
    }

    // Verificar si ya existe una baraja con el mismo nombre
    const isDuplicate = decks.some(
      (deck) => deck.nombre.toLowerCase() === newDeckName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setModalMessage("Ya existe una baraja con este nombre.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://magicarduct.online:3000/api/createmazo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: newDeckName,
            formato: "standard", // Puedes cambiar el formato si es necesario
            descripcion: "Nueva baraja creada por el usuario", // Descripción predeterminada
            idusuario: userId, // Asocia la baraja al usuario actual
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setModalMessage("¡Baraja creada exitosamente!");
        setDecks((prevDecks) => [
          ...prevDecks,
          {
            idbarajas: result.id,
            nombre: newDeckName,
            image: `${process.env.PUBLIC_URL}/Cartas2.png`, // Imagen por defecto
          },
        ]);
        setTimeout(() => closeModal(), 750);
      } else {
        setModalMessage("Error al crear la baraja.");
      }
    } catch (error) {
      setModalMessage(`Error en la petición: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para abrir el menú de opciones
  const toggleOptions = (deckId) => {
    setActiveDeck(activeDeck === deckId ? null : deckId); // Abre/cierra el menú
  };

  // Función para abrir InsideDecks en el modal
  const openInsideDecksModal = (deckName, deckId) => {
    setSelectedDeckName(deckName); // Establece el nombre de la baraja seleccionada
    setSelectedDeckId(deckId); // Establece el ID de la baraja seleccionada
    setIsInsideDecksOpen(true); // Abre el modal de InsideDecks
    lockScroll(); // Bloquea el scroll del body
  };

  // Función para cerrar InsideDecks
  const closeInsideDecksModal = () => {
    setIsInsideDecksOpen(false); // Cierra el modal de InsideDecks
    setSelectedDeckName(""); // Limpia el nombre de la baraja seleccionada
    unlockScroll(); // Habilita el scroll del body
  };

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  // Función para renombrar una baraja
  const handleRenameDeck = async () => {
    if (newDeckName.trim() === "") {
      setModalMessage("El nombre de la baraja no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/actualizarmazo/${renameDeckId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: newDeckName,
            formato: "standard", // Puedes cambiar el formato si es necesario
            descripcion: "Baraja renombrada por el usuario",
          }),
        }
      );

      if (response.ok) {
        setDecks((prevDecks) =>
          prevDecks.map((deck) =>
            deck.idbarajas === renameDeckId
              ? { ...deck, nombre: newDeckName }
              : deck
          )
        );
        setModalMessage("¡Baraja renombrada exitosamente!");
        setIsRenameModalOpen(false); // Cerrar modal de renombrar
      } else {
        setModalMessage("Error al renombrar la baraja.");
      }
    } catch (error) {
      setModalMessage("Error en la petición.");
      console.error(error);
    }
  };

  // Función para eliminar una baraja
  const handleDeleteDeck = async (deckId) => {
    try {
      const response = await fetch(
        `https://magicarduct.online:3000/api/eliminarmazo/${deckId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDecks((prevDecks) =>
          prevDecks.filter((deck) => deck.idbarajas !== deckId)
        );
        setActiveDeck(null); // Cerrar el menú de opciones
      } else {
        console.error("Error al eliminar la baraja.");
      }
    } catch (error) {
      console.error("Error en la petición al eliminar:", error);
    }
  };

  return (
    <div className="relative max-w-[1200px] mx-auto mt-6 min-h-screen bg-[#0b0f14] text-[#e2e7eb]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2 lg:justify-between mb-4 space-y-4 lg:space-y-0">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar baraja..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:flex-grow h-[46px] bg-[#e1e6ea] text-black px-4 rounded-md outline-none"
        />

        {/* Botones de Barajas y Cartas */}
        <div className="lg:flex w-full lg:w-auto">
          <button className="h-[46px] w-full lg:w-[150px] bg-[#2a5880] text-[#e2e7eb] font-semibold rounded-md text-center hover:bg-[#3587cf]">
            Buscar
          </button>
        </div>
      </div>

      {/* Mostrar el estado de carga si es necesario */}
      {isLoading ? (
        <p>Cargando barajas...</p>
      ) : (
        <div
          className={`grid gap-[25px] ${
            decks.length > 0
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              : ""
          }`}
        >
          {/* Mostrar las barajas del usuario */}
          {decks.length > 0 ? (
            <>
              {decks.map((deck) => (
                <div
                  key={deck.idbarajas}
                  className="flex flex-col items-center relative"
                >
                  <div
                    className="w-[180px] sm:w-[220px] h-[280px] sm:h-[320px] bg-[#12181E] border-[2px] border-[rgba(255,255,255,0.1)] rounded-md cursor-pointer overflow-hidden"
                    onClick={() =>
                      openInsideDecksModal(deck.nombre, deck.idbarajas)
                    }
                  >
                    {/* Imagen dentro de la baraja */}
                    <img
                      src={deck.image} // Usa la imagen cargada o la predeterminada
                      alt={deck.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Nombre de la baraja a la izquierda y menú a la derecha */}
                  <div className="flex justify-between w-full px-2 mt-2">
                    <span className="text-[#e2e7eb] text-left">
                      {deck.nombre}
                    </span>
                    <button
                      onClick={() => toggleOptions(deck.idbarajas)}
                      className="text-[#e2e7eb]"
                    >
                      <BsThreeDots size={20} />
                    </button>
                  </div>
                  {/* Menú de opciones */}
                  {activeDeck === deck.idbarajas && (
                    <div className="absolute bottom-8 right-0 bg-[#1b1f23] text-[#e2e7eb] p-2 rounded-md shadow-lg border-[1px] border-[rgba(255,255,255,0.1)]">
                      <ul>
                        <li
                          className="hover:bg-[#292f35] p-2 rounded-md cursor-pointer"
                          onClick={() => {
                            setRenameDeckId(deck.idbarajas);
                            setIsRenameModalOpen(true);
                          }}
                        >
                          Renombrar
                        </li>
                        <li
                          className="hover:bg-[#db4f4f] hover:text-[#af7878] p-2 rounded-md cursor-pointer text-[#e45a5a]"
                          onClick={() => openDeleteConfirmModal(deck.idbarajas)}
                        >
                          Eliminar
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* Baraja de creación se muestra a la derecha de las barajas existentes */}
              <div
                className="w-[180px] sm:w-[220px] h-[280px] sm:h-[320px] bg-[#12181E] border-[4px] border-[#9ebbd6] rounded-md cursor-pointer flex justify-center items-center transition-colors duration-300 hover:bg-[#2a5880]"
                onClick={openModal}
              >
                <IoMdAddCircle className="text-[#e1e6ea] text-[80px]" />
              </div>
            </>
          ) : (
            // Si no tiene barajas, solo mostramos la baraja de creación
            <div
              className="w-[220px] h-[320px] bg-[#12181E] border-[4px] border-[#9ebbd6] rounded-md cursor-pointer flex justify-center items-center transition-colors duration-300 hover:bg-[#2a5880]"
              onClick={openModal}
            >
              <IoMdAddCircle className="text-[#e2e7eb] text-[80px]" />
            </div>
          )}
        </div>
      )}

      {/* Modal de InsideDecks */}
      {isInsideDecksOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="w-[80%] h-[90vh] p-6 shadow-lg">
            {/* InsideDecks */}
            <InsideDecks
              closeModal={closeInsideDecksModal}
              deckName={selectedDeckName}
              deckId={selectedDeckId}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#0b0f14] border-[1px] border-[rgba(255,255,255,0.1)] rounded-md p-8 shadow-lg w-[400px]">
            <h2 className="text-2xl text-[#e2e7eb] mb-4">Crear Nueva Baraja</h2>
            <input
              type="text"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Nombre de la baraja"
              className="w-full mb-4 p-2 bg-[#12181E] border border-[rgba(255,255,255,0.1)] rounded-md text-[#e2e7eb]"
            />
            <p className="text-[#e2e7eb] mb-4">{modalMessage}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-[#e2e7eb] px-4 py-2 rounded-md hover:bg-gray-700"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateDeck}
                className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded-md hover:bg-[#3587cf]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para renombrar */}
      {isRenameModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#0b0f14] border-[1px] border-[rgba(255,255,255,0.1)] rounded-md p-8 shadow-lg w-[400px]">
            <h2 className="text-2xl text-[#e2e7eb] mb-4">Renombrar Baraja</h2>
            <input
              type="text"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Nuevo nombre de la baraja"
              className="w-full mb-4 p-2 bg-[#12181E] border border-[rgba(255,255,255,0.1)] rounded-md text-[#e2e7eb]"
            />
            <p className="text-[#e2e7eb] mb-4">{modalMessage}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsRenameModalOpen(false)}
                className="bg-gray-500 text-[#e2e7eb] px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleRenameDeck}
                className="bg-[#2a5880] text-[#e2e7eb] px-4 py-2 rounded-md hover:bg-[#3587cf]"
              >
                Renombrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#0b0f14] border-[1px] border-[rgba(255,255,255,0.1)] rounded-md p-8 shadow-lg w-[400px]">
            <h2 className="text-2xl text-[#e2e7eb] mb-4">
              Confirmar Eliminación
            </h2>
            <p className="text-[#e2e7eb] mb-6">
              ¿Estás seguro de que deseas eliminar esta baraja? Esta acción no
              se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteConfirmModal}
                className="bg-gray-500 text-[#e2e7eb] px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-[#bb3838] text-[#e2e7eb] px-4 py-2 rounded-md hover:bg-[#dd5656]"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Decks;
