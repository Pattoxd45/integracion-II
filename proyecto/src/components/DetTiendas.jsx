import React from "react";

const importAllImages = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAllImages(
  require.context("../images/imgTiendas", false, /\.(png|jpe?g|svg|webp)$/),
);

const DetTiendas = ({ store, onClose }) => {
  const isOnlineStore = !store.direccion;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#0b0f14] p-4 sm:p-6 rounded-lg border-[2px] border-[rgba(255,255,255,0.1)] relative max-w-[90%] sm:max-w-[750px] w-full h-auto max-h-[90vh] overflow-y-auto flex flex-col sm:flex-row gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenedor para el mapa o imagen */}
        <div className="flex-1">
          {!isOnlineStore ? (
            <iframe
              title="Google Maps"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAVhIKAaisgZ28GkXW8KMn6DmO56xIgVJ4&q=${encodeURIComponent(store.direccion)}`}
              width="100%"
              className="h-48 sm:h-64 md:h-72 lg:h-96 rounded"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={images[store.imgUrl]}
              alt={store.name}
              className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover rounded"
            />
          )}
        </div>

        {/* Contenedor para la información */}
        <div className="flex-1 p-4">
          <h2 className="text-lg sm:text-xl md:text-2xl text-[#3587cf] mb-4">
            {store.name}
          </h2>
          <p className="text-sm sm:text-base text-[#e2e7eb]">
            {store.description}
          </p>

          {!isOnlineStore && (
            <>
              <h3 className="text-sm sm:text-lg text-[#3587cf] mt-4">
                Dirección:
              </h3>
              <p className="text-xs sm:text-sm text-[#e2e7eb]">
                {store.direccion}
              </p>
              <h3 className="text-sm sm:text-lg text-[#3587cf] mt-4">
                Región:
              </h3>
              <p className="text-xs sm:text-sm text-[#e2e7eb]">
                {store.region}
              </p>
            </>
          )}

          {/* Botón de cierre */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-[#2a5880] hover:text-[#2d5980] text-xl sm:text-2xl"
          >
            ❌
          </button>

          {/* Iconos de redes sociales */}
          <div className="flex space-x-4 mt-4">
            {store.websiteUrl && (
              <a
                href={store.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("../images/icons/website.png")}
                  alt="Sitio Web"
                  className="h-6 sm:h-8 w-6 sm:w-8 hover:brightness-150 hover:scale-110 transition-transform duration-300"
                />
              </a>
            )}
            {store.facebookUrl && (
              <a
                href={store.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("../images/icons/facebook.png")}
                  alt="Facebook"
                  className="h-6 sm:h-8 w-6 sm:w-8 hover:brightness-150 hover:scale-110 transition-transform duration-300"
                />
              </a>
            )}
            {store.instagramUrl && (
              <a
                href={store.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("../images/icons/instagram.png")}
                  alt="Instagram"
                  className="h-6 sm:h-8 w-6 sm:w-8 hover:brightness-150 hover:scale-110 transition-transform duration-300"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetTiendas;
