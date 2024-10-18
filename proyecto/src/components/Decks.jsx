import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import imagen8 from '../images/imgNews/imagen8.webp'; // Importamos la imagen
import { useUser } from './UserContext'; // Importamos el contexto para obtener el userId

const Decks = () => {
  const { userId } = useUser(); // Obtener el userId del contexto
  const [decks, setDecks] = useState([]); // Estado para almacenar las barajas
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto
  const [newDeckName, setNewDeckName] = useState(''); // Nombre de la nueva baraja
  const [modalMessage, setModalMessage] = useState(''); // Mensaje del modal
  const [isSubmitting, setIsSubmitting] = useState(false); // Controla el estado de envío

  // Función para obtener las barajas del usuario
  useEffect(() => {
    const fetchDecks = async () => {
      if (!userId) {
        console.log('No se encontró userId');
        return; // Si no hay usuario, no hacemos nada
      }

      try {
        console.log(`El userId del usuario es: ${userId}`); // Imprimir el userId
        const response = await fetch(`https://magicarduct.online:3000/api/barajasdeusuaio/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setDecks(data); // Almacenar las barajas en el estado
          
          // Imprimir si el usuario tiene o no barajas
          if (data.length > 0) {
            console.log(`El usuario con ID ${userId} tiene ${data.length} baraja(s).`);
          } else {
            console.log(`El usuario con ID ${userId} no tiene barajas.`);
          }
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
        
        // Agregar la nueva baraja a la lista de barajas sin recargar toda la página
        setDecks((prevDecks) => [...prevDecks, { idbarajas: result.id, nombre: newDeckName }]);
      } else {
        setModalMessage('Error al crear la baraja.');
      }
    } catch (error) {
      setModalMessage(`Error en la petición: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-6 relative min-h-screen">
      {/* Contenedor del buscador y los botones */}
      <div className="flex justify-between items-center mb-4">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar baraja..."
          className="w-full h-[46px] bg-[#e1e6ea] text-black px-4 rounded-md outline-none"
        />

        {/* Botón "Buscar" */}
        <div className="flex items-center ml-4 space-x-2">
          <button className="w-[91px] h-[40px] bg-[#2a5880] text-[#e2e7eb] font-semibold rounded-md text-center hover:bg-[#3587cf]">
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
                <div
                  key={deck.idbarajas}
                  className="w-[220px] h-[320px] bg-[#12181E] border-[4px] border-[#9ebbd6] rounded-md cursor-pointer overflow-hidden"
                >
                  {/* Imagen dentro de la baraja */}
                  <img src={imagen8} alt={deck.nombre} className="w-full h-full object-cover" />
                  <div className="text-white text-center mt-2">{deck.nombre}</div>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#0b0f14] border-2 border-[#9ebbd6] rounded-md p-8 shadow-lg w-[400px]">
            <h2 className="text-2xl text-[#e1e6ea] mb-4">Crear Nueva Baraja</h2>
            <input
              type="text"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Nombre de la baraja"
              className="w-full mb-4 p-2 bg-[#12181E] border border-[#9ebbd6] rounded-md text-[#e1e6ea]"
            />
            <p className="text-white mb-4">{modalMessage}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateDeck}
                className="bg-[#2a5880] text-white px-4 py-2 rounded-md hover:bg-[#3587cf]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creando...' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Decks;
