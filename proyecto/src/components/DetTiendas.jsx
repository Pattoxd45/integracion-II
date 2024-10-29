import React from "react";

const DetTiendas = ({ store, onClose }) => {
  const isOnlineStore = !store.direccion; // Verificar si es una tienda online

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      onClick={onClose} // Cerrar modal al hacer clic fuera
    >
      <div 
        className="bg-[#0b0f14] p-4 sm:p-6 rounded-lg border-[2px] border-[rgba(255,255,255,0.1)] relative max-w-[90%] sm:max-w-[750px] w-full h-auto max-h-[90vh] overflow-y-auto flex"
        onClick={e => e.stopPropagation()} // Evitar que el clic en el cuadro cierre el modal
      >
        {/* Contenedor para el mapa o imagen a la izquierda */}
        <div className="flex-1">
          {!isOnlineStore ? (
            <iframe
              title="Google Maps"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAVhIKAaisgZ28GkXW8KMn6DmO56xIgVJ4&q=${encodeURIComponent(store.direccion)}`}
              width="100%"
              height="200" // Ajusta la altura según sea necesario
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          ) : (
            <img src={store.imgUrl} alt={store.name} className="w-full h-auto object-cover" />
          )}
        </div>

        {/* Contenedor para la información a la derecha */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl text-[#3587cf] mb-4">{store.name}</h2>
          <p className="text-base sm:text-lg text-[#e2e7eb]">{store.description}</p>
          
          {/* Detalles adicionales para tiendas físicas */}
          {!isOnlineStore && (
            <>
              <h3 className="text-lg sm:text-xl text-[#3587cf] mt-4">Dirección:</h3>
              <p className="text-[#e2e7eb]">{store.direccion}</p>
              <h3 className="text-lg sm:text-xl text-[#3587cf] mt-4">Región:</h3>
              <p className="text-[#e2e7eb]">{store.region}</p>
            </>
          )}

          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-[#2a5880] hover:text-[#2d5980]"
          >
            ❌
          </button>

          {/* Contenedor de iconos de redes sociales alineados a la izquierda */}
          <div className="flex space-x-4 mt-4">
            {/* Mostrar solo el logo del sitio web si es una tienda online */}
            {isOnlineStore ? (
              store.websiteUrl && (
                <a href={store.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <img src={require('../images/icons/website.png')} alt="Sitio Web" className="h-8 w-8" />
                </a>
              )
            ) : (
              <>
                {store.facebookUrl && (
                  <a href={store.facebookUrl} target="_blank" rel="noopener noreferrer">
                    <img src={require('../images/icons/facebook.png')} alt="Facebook" className="h-8 w-8" />
                  </a>
                )}
                {store.instagramUrl && (
                  <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer">
                    <img src={require('../images/icons/instagram.png')} alt="Instagram" className="h-8 w-8" />
                  </a>
                )}
                {store.twitterUrl && (
                  <a href={store.twitterUrl} target="_blank" rel="noopener noreferrer">
                    <img src={require('../images/icons/website.png')} alt="Sitio Web" className="h-8 w-8" />
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetTiendas;
