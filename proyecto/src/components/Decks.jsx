import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs"; // Ícono de tres puntos
import { IoIosOptions } from "react-icons/io"; // Ícono de opciones
import imagen8 from '../images/imgNews/imagen8.webp'; // Imagen
import { useUser } from './UserContext'; // Contexto para obtener el userId
import InsideDecks from './InsideDecks'; // Importar InsideDecks para mostrarlo en el modal


const Decks = () => {
  const { userId } = useUser(); // Obtener el userId del contexto
  const [decks, setDecks] = useState([]); // Estado para almacenar las barajas
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto
  const [isInsideDecksOpen, setIsInsideDecksOpen] = useState(false); // Controla si el modal de InsideDecks está abierto
  const [selectedDeckName, setSelectedDeckName] = useState(''); // Estado para almacenar el nombre de la baraja seleccionada
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el texto del buscador
  const [view, setView] = useState('barajas');
  const [newDeckName, setNewDeckName] = useState(''); // Nombre de la nueva baraja
  const [modalMessage, setModalMessage] = useState(''); // Mensaje del modal
  const [isSubmitting, setIsSubmitting] = useState(false); // Controla el estado de envío
  const [activeDeck, setActiveDeck] = useState(null); // Para controlar el menú desplegable
  const [renameDeckId, setRenameDeckId] = useState(null); // Controla la baraja a renombrar
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false); // Controla si el modal de renombrar está abierto

  // Función para obtener las barajas del usuario
  useEffect(() => {
    const fetchDecks = async () => {
      if (!userId) {
        console.log('No se encontró userId');
        return; // Si no hay usuario, no hacemos nada
      }

      try {
        const response = await fetch(`https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setDecks(data); // Almacenar las barajas en el estado
        } else {
          console.error("Error al obtener las barajas");
        }
      } catch (error) {
        console.error("Error en la petición:", error); // Mostrar error en consola
      } finally {
        setIsLoading(false); // Terminar el estado de carga
      }
    };

    fetchDecks();
  }, [userId]); // Se ejecuta cuando el userId está disponible

  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
  };

  // Función para abrir el modal de creación
  const openModal = () => {
    setIsModalOpen(true);
    setModalMessage('');
    setNewDeckName('');
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNewDeckName('');
    setModalMessage('');
  };

  // Función para crear la baraja utilizando la API
  const handleCreateDeck = async () => {
    if (newDeckName.trim() === '') {
      setModalMessage('El nombre de la baraja no puede estar vacío.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://magicarduct.online:3000/api/createmazo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: newDeckName,
          formato: 'standard', // Puedes cambiar el formato si es necesario
          descripcion: 'Nueva baraja creada por el usuario', // Descripción predeterminada
          idusuario: userId, // Asocia la baraja al usuario actual
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setModalMessage('¡Baraja creada exitosamente!');
        setDecks((prevDecks) => [...prevDecks, { idbarajas: result.id, nombre: newDeckName }]);
        setTimeout(() => closeModal(), 2000); // Cerrar el modal después de 2 segundos
      } else {
        setModalMessage('Error al crear la baraja.');
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
    setSelectedDeckName(''); // Limpia el nombre de la baraja seleccionada
    unlockScroll(); // Habilita el scroll del body
  };

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  // Función para renombrar una baraja
  const handleRenameDeck = async () => {
    if (newDeckName.trim() === '') {
      setModalMessage('El nombre de la baraja no puede estar vacío.');
      return;
    }

    try {
      const response = await fetch(`https://magicarduct.online:3000/api/actualizarmazo/${renameDeckId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: newDeckName,
          formato: 'standard', // Puedes cambiar el formato si es necesario
          descripcion: 'Baraja renombrada por el usuario',
        }),
      });

      if (response.ok) {
        setDecks((prevDecks) =>
          prevDecks.map((deck) =>
            deck.idbarajas === renameDeckId ? { ...deck, nombre: newDeckName } : deck
          )
        );
        setModalMessage('¡Baraja renombrada exitosamente!');
        setIsRenameModalOpen(false); // Cerrar modal de renombrar
      } else {
        setModalMessage('Error al renombrar la baraja.');
      }
    } catch (error) {
      setModalMessage('Error en la petición.');
      console.error(error);
    }
  };

  // Función para eliminar una baraja
  const handleDeleteDeck = async (deckId) => {
    try {
      const response = await fetch(`https://magicarduct.online:3000/api/eliminarmazo/${deckId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.idbarajas !== deckId));
        setActiveDeck(null); // Cerrar el menú de opciones
      } else {
        console.error('Error al eliminar la baraja.');
      }
    } catch (error) {
      console.error('Error en la petición al eliminar:', error);
    }
  };

  const toggleView = (viewSelected) => {
    setView(viewSelected);
  };

  return (
    <div className="relative max-w-[1200px] mx-auto mt-6 min-h-screen bg-[#0b0f14] text-[#e2e7eb]">
      <div className="flex justify-between items-center mb-4">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar baraja..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-[46px] bg-[#e1e6ea] text-black px-4 rounded-md outline-none"
        />

        {/* Botones de Barajas y Cartas + Buscar */}
        <div className="flex items-center ml-4 space-x-2">
          {/* Botones de Barajas y Cartas */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleView('barajas')}
              className={`w-[100px] h-[46px] rounded-md text-[#e2e7eb] font-semibold ${
                view === 'barajas' ? 'bg-[#2a5880]' : 'bg-[#9ebbd6]'
              }`}
            >
              Barajas
            </button>
            <button
              onClick={() => toggleView('cartas')}
              className={`w-[100px] h-[46px] rounded-md text-[#e2e7eb] font-semibold ${
                view === 'cartas' ? 'bg-[#2a5880]' : 'bg-[#9ebbd6]'
              }`}
            >
              Cartas
            </button>
          </div>

          {/* Botón "Buscar" */}
          <button className="w-[91px] h-[46px] bg-[#2a5880] text-[#e2e7eb] font-semibold rounded-md text-center hover:bg-[#3587cf]">
            Buscar
          </button>
        </div>
      </div>

      {/* Mostrar el estado de carga si es necesario */}
      {isLoading ? (
        <p>Cargando barajas...</p>
      ) : (
        <div className="grid grid-cols-5 gap-[25px]">
          {/* Mostrar las barajas del usuario */}
          {decks.length > 0 ? (
            <>
              {decks.map((deck) => (
                <div key={deck.idbarajas} className="flex flex-col items-center relative">
                  <div className="w-[220px] h-[320px] bg-[#12181E] border-[2px] border-[rgba(255,255,255,0.1)] rounded-md cursor-pointer overflow-hidden" onClick={() => openInsideDecksModal(deck.nombre, deck.idbarajas)}>
                    {/* Imagen dentro de la baraja */}
                    <img src={imagen8} alt={deck.nombre} className="w-full h-full object-cover" />
                  </div>
                  {/* Nombre de la baraja a la izquierda y menú a la derecha */}
                  <div className="flex justify-between w-full px-2 mt-2">
                    <span className="text-[#e2e7eb] text-left">{deck.nombre}</span>
                    <button onClick={() => toggleOptions(deck.idbarajas)} className="text-[#e2e7eb]">
                      <BsThreeDots size={20} />
                    </button>
                  </div>

                  {/* Menú de opciones */}
                  {activeDeck === deck.idbarajas && (
                    <div className="absolute bottom-8 right-0 bg-[#1b1f23] text-[#e2e7eb] p-2 rounded-md shadow-lg border-[1px] border-[#9ebbd6]">
                      <ul>
                        <li
                          className="hover:bg-[#2a5880] p-2 rounded-md cursor-pointer"
                          onClick={() => {
                            setRenameDeckId(deck.idbarajas);
                            setIsRenameModalOpen(true);
                          }}
                        >
                          Renombrar
                        </li>
                        <li className="hover:bg-[#2a5880] p-2 rounded-md cursor-pointer">Propiedades</li>
                        <li
                          className="hover:bg-red-600 p-2 rounded-md cursor-pointer text-red-400"
                          onClick={() => handleDeleteDeck(deck.idbarajas)}
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
                className="w-[220px] h-[320px] bg-[#12181E] border-[4px] border-[#9ebbd6] rounded-md cursor-pointer flex justify-center items-center transition-colors duration-300 hover:bg-[#2a5880]"
                onClick={openModal}
              >
                {/* Ícono en el centro de la baraja */}
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
            <InsideDecks closeModal={closeInsideDecksModal} deckName={selectedDeckName} deckId={selectedDeckId} />
          </div>
        </div>
      )}
      
      {/* Botón de opciones siempre visible, cuadrado y con bordes, alineado al right */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[1200px]">
        <div className="flex justify-end">
          <button
            className="bg-[#2a5880] text-[#e2e7eb] rounded-[10px] p-[10px] hover:opacity-70 transition flex items-center justify-center"
            style={{ width: "50px", height: "50px" }} // Tamaño del botón
          >
            <IoIosOptions className="text-[#e2e7eb] text-[24px]" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#0b0f14] border-2 border-[#9ebbd6] rounded-md p-8 shadow-lg w-[400px]">
            <h2 className="text-2xl text-[#e2e7eb] mb-4">Crear Nueva Baraja</h2>
            <input
              type="text"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Nombre de la baraja"
              className="w-full mb-4 p-2 bg-[#12181E] border border-[#9ebbd6] rounded-md text-[#e2e7eb]"
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
                {isSubmitting ? 'Creando...' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para renombrar */}
      {isRenameModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#0b0f14] border-2 border-[#9ebbd6] rounded-md p-8 shadow-lg w-[400px]">
            <h2 className="text-2xl text-[#e2e7eb] mb-4">Renombrar Baraja</h2>
            <input
              type="text"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Nuevo nombre de la baraja"
              className="w-full mb-4 p-2 bg-[#12181E] border border-[#9ebbd6] rounded-md text-[#e2e7eb]"
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
    </div>
  );
};

export default Decks;
