import React, { useState } from "react";
import DetTiendas from "./DetTiendas";

// Función para importar todas las imágenes de una carpeta
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../images/imgNews', false, /\.(png|jpe?g|svg|webp)$/));

const physicalStores = [
  {
    name: "ONLYGAMES",
    description: "¡Bienvenidos a ONLYGAMES! El paraíso de los juegos de cartas coleccionables...",
    imgUrl: images[0],
    direccion: "Dr. Juan Noe 309, 1000000 Arica, Arica y Parinacota",
    region: "Arica y Parinacota",
    instagramUrl: "https://www.instagram.com/onlygameschile/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/ONLYGAMESchile/?_rdc=1&_rdr", // URL de Facebook
  },
  {
    name: "Miskatonic Games",
    description: "Tienda especializada en juegos de mesa en Antofagasta.",
    imgUrl: images[1],
    direccion: "Uribe 786, Antofagasta",
    region: "Antofagasta",
    instagramUrl: "https://www.instagram.com/mskgames.chile/?hl=es", // URL de Instagram
    facebookUrl: "https://web.facebook.com/mskgameschile/?locale=es_LA&_rdc=1&_rdr", // URL de Facebook
  },
  {
    name: "Voodoo TCG Store",
    description: "Tienda especializada en Juegos de Mesa, TCG y Coleccionables.",
    imgUrl: images[1],
    direccion: "Esmeralda 2495, 1271644 Antofagasta",
    region: "Antofagasta",
    instagramUrl: "https://www.instagram.com/voodootcgstore/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/p/Voodoo-TCG-Store-100040548566720/?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://voodoo.cl/" // URL del sitio web
  },
  {
    name: "Isengard Store",
    description: "Tienda de tcg, grato lugar donde pasar el rato",
    imgUrl: images[1],
    direccion: "Manuel Rodríguez 561, 1530508 Copiapó, Atacama",
    region: "Atacama",
    facebookUrl: "https://web.facebook.com/isengardstore/?locale=es_LA&_rdc=1&_rdr", // URL de Facebook
  },
  {
    name: "Card Universe",
    description: "Card Universe es la mejor tienda de cartas coleccionables y juegos de mesa de Copiapó. Actualmente contamos con la presencia de las comunidades de Mitos y Leyendas, Yu-Gi-Oh!, Pokémon T.C.G., Dragon Ball Super, Weiss Schwarz y Warhammer 40000, esperando en el futuro próximo tener a todas las comunidades existentes.",
    imgUrl: images[1],
    direccion: "Bernardo O'Higgins 951, Copiapó, Atacama",
    region: "Atacama",
    instagramUrl: "https://www.instagram.com/card_universee/?hl=es-la", // URL de Instagram
    facebookUrl: "https://web.facebook.com/CardUniverse?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://carduniverse.cl/" // URL del sitio web
  },
  {
    name: "Apolo Store Tcg",
    description: "Tienda especializada en juegos de Cartas coleccionables, juegos de mesa y accesorios, y mucho más.",
    imgUrl: images[1],
    direccion: "Juan Melgarejo 1537, Coquimbo",
    region: "Coquimbo",
    instagramUrl: "https://www.instagram.com/apolostoretcg/?hl=es", // URL de Instagram
    facebookUrl: "https://web.facebook.com/p/Apolo-Store-Tcg-100063972696377/?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://apolostore.cl/categoria-producto/magic-the-gathering/" // URL del sitio web
  },
  {
    name: "Moss Eisley",
    description: "Un espacio en la galaxia para toda comunidad , con un cómodo espacio y donde puedes aprender los juegos que desees con nosotros, asesorarte con los que andes buscando y vivir una gran experiencia. Te enseñamos los juegos de cartas y tableros, para eso sólo necesitamos de tu motivación y ganas de jugar!",
    imgUrl: images[1],
    direccion: "Victoria 2486, galería Almendral local 9. Valparaíso",
    region: "Valparaíso",
    instagramUrl: "https://www.instagram.com/mossjuegos/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/Tiendamosseisley/?locale=es_LA&_rdc=1&_rdr", // URL de Facebook
  },
  {
    name: "TODO FREAK",
    description: "Somos una apasionada comunidad de jugadores que se dedican a ofrecerte una experiencia inigualable en el mundo de los juegos de mesa y cartas intercambiables (TCG).",
    imgUrl: images[1],
    direccion: "Av. Valparaíso 363, 2571493 Viña del Mar, Valparaíso",
    region: "Valparaíso",
    instagramUrl: "https://www.instagram.com/todofreakstore/reels/", // URL de Instagram
    websiteUrl: "https://todofreak.cl/categoria-producto/magic-the-gathering/" // URL del sitio web
  },
  {
    name: "Command Center",
    description: "Tenemos los más entretenidos Juegos de mesa, figuras de colección, Maquetas, Juegos de Cartas y más!",
    imgUrl: images[1],
    direccion: "Arlegui 437, 2571469 Viña del Mar, Valparaíso",
    region: "Valparaíso",
    instagramUrl: "https://www.instagram.com/tienda_command_center/?hl=en", // URL de Instagram
    facebookUrl: "https://web.facebook.com/tienda.c.vina/?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://commandcenter.cl/" // URL del sitio web
  },
  {
    name: "Spells TCG & Tableros",
    description: "Tenemos los más entretenidos Juegos de mesa, figuras de colección, Maquetas, Juegos de Cartas y más!",
    imgUrl: images[1],
    direccion: "Portal Alamos - Av. Valparaíso 515, Local 102, 2571500 Viña del Mar, Valparaíso",
    region: "Valparaíso",
    instagramUrl: "https://www.instagram.com/spells.cl/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/SpellsTCG?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://spells.cl/" // URL del sitio web
  },
  {
    name: "Kurgan",
    description: "Juegos de mesa, Cartas Magic, Pokémon, Figuras coleccionables y más! Terraza al aire libre, Café, Bebestibles, Colaciones, Helados.",
    imgUrl: images[1],
    direccion: "2 Poniente. 81, 2520305 Viña del Mar, Valparaíso",
    region: "Valparaíso",
    instagramUrl: "https://www.instagram.com/kurganjuegos/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/TiendaKurgan/?locale=fy_NL&_rdc=1&_rdr", // URL de Facebook
  },
  {
    name: "La Forja de Stone",
    description: "Tienda especializada en TCG(Magic, Pokémon, Yugi Oh).Accesorios para estos, Board Games( juegos de tablero), Rol, figuras y dados y torneos. Tienda WPN oficial. Única Tienda en Chile en Realizar Grand Prix Stgo por 5 años, Propietario es Juez de MtG por más de 22 años y es uno de los Organizadores de torneos más antiguos de Latinoamérica y con mayor número de torneos realizados en en el mundo. Personal especializado en Juegos de Mesa y Rol.",
    imgUrl: images[1],
    direccion: "Gorbea 2170, 8370230 Santiago",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/laforjadestone/?hl=es", // URL de Instagram
    facebookUrl: "https://web.facebook.com/LaForjadeStone/", // URL de Facebook
  },
  {
    name: "Rivendel",
    description: "Tienda especializada en cartas coleccionables, miniaturas y juegos de mesa.",
    imgUrl: images[1],
    direccion: "San antonio 65 local 0101 Santiago, RM Chile",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/rivendelelconcilio/#", // URL de Instagram
    facebookUrl: "https://web.facebook.com/rivendelelconcilio?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.rivendelelconcilio.cl/" // URL del sitio web
  },
  {
    name: "El Reino de los Duelos TCG Store",
    description: "Descubre El Reino de los Duelos, tu tienda online especializada en juegos de cartas coleccionables como Mitos y Leyendas, Magic: The Gathering y Pokémon TCG.",
    imgUrl: images[1],
    direccion: "Huérfanos 786, Santiago",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/elreinodelosduelosstore/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/ElReinoDeLosDuelos/?locale=es_LA&_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://elreinodelosduelos.cl/" // URL del sitio web
  },
  {
    name: "Magic4ever",
    description: "Somos Magic4Ever: La mejor tienda de Santiago para tus juegos y hobbys favoritos. Contamos con variados TCGs (Magic, Pokemon, Yu Gi Oh, One Piece, Digimon, Dragon Ball Super, Flesh and Blood, etc.). Tenemos gran variedad de productos de Warhammer 40K y Age of Sigmar, artículos para modelisto y pinturas. En nuestra tienda puedes encontrar accesorios para juegos, juegos de mesa, Álbumes, Mangas, Libros, Comics, Figuras coleccionables y mucho más. ¡También organizamos eventos y torneos todos los días! Revisa el calendario en nuestras Redes Sociales.",
    imgUrl: images[1],
    direccion: "Av. Viel 1690, Santiago",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/magic4everchile/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/Magic4ever.cl?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.m4e.cl/?srsltid=AfmBOooL5Do7P-3fBHsGqR8-07qEezgg9FHUTxQ8OerQfjR8wrCiX-E6" // URL del sitio web
  },
  {
    name: "Valhalla Store",
    description: "Tienda de cartas Magic (WPN) y Pokémon",
    imgUrl: images[1],
    direccion: "San Diego 2080, LOCAL 205, Santiago",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/tiendavalhallastore/?igshid=NmQ2ZmYxZjA%3D", // URL de Instagram
    facebookUrl: "https://web.facebook.com/tiendavalhallastore/?ref=settings&_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.valhallast.cl/index.php?id_lang=2" // URL del sitio web
  },
  {
    name: "Magicsur Chile",
    description: "Nos especializamos en los mejores juegos de cartas: Magic the Gathering, Pokémon, Digimon y Yugioh! TCG. Somos tienda premium oficial de la WPN, Pokémon Company y Wizkid.",
    imgUrl: images[1],
    direccion: "Seminario 507, 7501499 Providencia",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/magicsurchile/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/magicsur.chile?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.magicsur.cl/?srsltid=AfmBOoqP_ng2BHJkx8CusSHJR3Cekre37VIOhI7DjmRuc9cR24Mv-4K7" // URL del sitio web
  },
  {
    name: "Mesa1",
    description: "En MESA 1 amamos los TCGs desde hace más de 20 años. Nos mueve la pasión de competir y desarrollar lazos con toda la gente que comparte este hermoso pasatiempo.",
    imgUrl: images[1],
    direccion: "Av. Perú 777, 8420290 Recoleta",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/mesa1chile/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/mesaunochile?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://mesa1.cl/" // URL del sitio web
  },
  {
    name: "Tienda La Comarca",
    description: "Descubre La Comarca, tu destino principal para los apasionados de los juegos de cartas coleccionables. Sumérgete en nuestra amplia selección de los aclamados juegos como Yu-Gi-Oh!, Pokémon y Magic The Gathering.",
    imgUrl: images[1],
    direccion: "José Manuel Infante 100, Local 90, 7500641 Santiago, Providencia",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/lacomarca_hyg/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/tiendalacomarca.cl?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.tiendalacomarca.cl/pages/sobre-nosotros" // URL del sitio web
  },
  {
    name: "Area52",
    description: "Tienda online y física de juegos de mesa, TCGs y Dungeons & Dragons. Enfocada en crear comunidad y en la comodidad de nuestros jugadores.",
    imgUrl: images[1],
    direccion: "Av. Sta. Isabel 962, 7501307 Providencia",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/area52.cl/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/area52.cl/?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://area52.cl/collections/all" // URL del sitio web
  },
  {
    name: "Piedrabruja",
    description: "Tienda especializada en juegos de rol, mesa, cartas y más. Creamos y compartimos contenido de D&D.",
    imgUrl: images[1],
    direccion: "Avenida Providencia 1100 Local 45, Santiago",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/piedrabruja_chile/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/piedrabrujachile?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://piedrabruja.cl/?srsltid=AfmBOorzWrKqROraFbXCh5w3F6-pILfCmM9b54n7SAHkaDwENMxrvv6T" // URL del sitio web
  },
  {
    name: "Blood Moon Games",
    description: "Tienda dedicada a la venta de Accesorios, Cartas Pokemon, MTG, One Piece y juegos de Tablero.",
    imgUrl: images[1],
    direccion: "1336 Av. Providencia, Santiago",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/tiendabloodmoon/", // URL de Instagram
    websiteUrl: "https://bloodmoongames.cl/" // URL del sitio web
  },
  {
    name: "Wargaming",
    description: "Tienda especialista dedicada a juegos de miniaturas, juegos de mesa y juegos de rol. En nuestra tienda dispondrás del más completo catálogo de miniaturas y herramientas.",
    imgUrl: images[1],
    direccion: "Dr. Manuel Barros Borgoño 160, 7500593 Providencia",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/wargaming.cl/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/wargaming.cl/?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.wargaming.cl/" // URL del sitio web
  },
  {
    name: "Third Impact",
    description: "Somos tu tienda de juegos de cartas coleccionables y de mesa. Especialistas en diversos #TCG y pilotear el EVA 02. Hacemos envíos a todo Chile.",
    imgUrl: images[1],
    direccion: "Entre torres de departamentos - Antonio Varas 1412, Local 2, 7501042 Providencia,",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/thirdimpact.cl/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/thirdimpact.cl/", // URL de Facebook
    websiteUrl: "https://thirdimpact.cl/" // URL del sitio web
  },
  {
    name: "Entre Juegos",
    description: "Tienda de juegos de mesa, tcg, lcg y más. Tenemos el mayor catálogo juegos de mesa",
    imgUrl: images[1],
    direccion: "Nueva de Lyon 61, 7510054 Providencia",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/entrejuegos/?hl=es", // URL de Instagram
    facebookUrl: "https://web.facebook.com/entrejuegoschile/?locale=es_LA&_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.entrejuegos.cl/" // URL del sitio web
  },
  {
    name: "ZendiCard",
    description: "Tienda de venta de juegos de TCG, juegos de mesa, accesorios. Además es un espacio para quienes quieran jugar y pasarlo bien.",
    imgUrl: images[1],
    direccion: "León Prado 1091, 8930104 San Miguel",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/zendicard_chile/?igsh=MWNvc2Q2ZnB6dWVjcg%3D%3D", // URL de Instagram
    facebookUrl: "https://web.facebook.com/people/ZendiCard-Tcg/pfbid02jU8yomJnhVbZSpcHVk5M1HXfTU796obYN7LEFXQpbo1EZr993gCtTiEZsz6xPMdMl/?mibextid=ZbWKwL", // URL de Facebook
    websiteUrl: "https://zendicard.cl/contacto/" // URL del sitio web
  },
  {
    name: "The Mulligan tcg",
    description: "En The Mulligan, tu santuario para el universo TCG. Nuestra pasión es Pokémon, y te ofrecemos desde las ediciones más recientes hasta clásicos atemporales. Pero nuestra aventura va más allá, con una colección diversa que incluye éxitos como One Piece y Lorcana, asegurándonos de que siempre encuentres la carta que buscas. En The Mulligan, no solo vendemos cartas; ofrecemos una experiencia completa con accesorios de calidad para preservar y destacar tu colección y juegos de mesa variados para convertir cualquier encuentro en una memorable jornada lúdica. Somos líderes en el mercado porque en The Mulligan, la calidad, la comunidad y el conocimiento experto se unen para brindarte un servicio inigualable.",
    imgUrl: images[1],
    direccion: " Av. Irarrázaval 3054, Local 410-B, 7770498 Ñuñoa",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/themulligan.tcg/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/themulligan.tcg/?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.themulligan.cl/" // URL del sitio web
  },
  {
    name: "Casa de Juegos",
    description: "Aquí encontrarás los mejores juegos de mesa de 🇨hile y el mundo para disfrutar con tu familia o amigos.",
    imgUrl: images[1],
    direccion: "2594 Av. Nueva Providencia Local 404, Providencia",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/casadejuegoscl/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/casadejuegoschile", // URL de Facebook
    websiteUrl: "https://www.casadejuegos.cl/" // URL del sitio web
  },
  {
    name: "Oasis Games",
    description: "Tienda de cartas coleccionables en Chile: * Magic The Gathering (WPN) * Pokémon TCG Compra, Vende y Juega en Oasis Games!",
    imgUrl: images[1],
    direccion: "Los Militares 4611, Local 5, Santiago, Las Condes",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/oasisgameschile/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/OasisGamesChile/?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://www.oasisgames.cl/" // URL del sitio web
  },
  {
    name: "Movieplay FunStore",
    description: "Somos una tienda enfocada a la venta de juegos de mesa y juegos de cartas coleccionables, comics y hobbies. Nos dirigimos a todas las personas niños, jóvenes y familia que desee participar del mundo lúdico de los juegos de mesa modernos. Entre los juegos mas vendidos tenemos Catan, Dixit, Carcassonne, Dominion, entre cientos de otros títulos que te invitamos a conocer. Nuestra tienda tiene además de la sala de ventas una sala para juegos organizados donde puedes participar de los torneos de juegos de mesa como de juegos de cartas. En fin, somos una tienda de entretención que te invitamos conocer.",
    imgUrl: images[1],
    direccion: "Av. Ossa 1149, 7870003 La Reina",
    region: "Metropolitana",
    instagramUrl: "https://www.instagram.com/movieplay_funstore/#", // URL de Instagram
    facebookUrl: "https://web.facebook.com/movieplay.funstore/?_rdc=1&_rdr", // URL de Facebook
    websiteUrl: "https://movieplay.cl/juegos-de-mesa/72443-mi-tierra-1616265696521.html?srsltid=AfmBOork6vNaZ45uovjx6EwJ_ur9Rg7f5gC9f3r4Y53asMzvWlBPhRYA" // URL del sitio web
  },
  {
    name: "ImperiumTCG",
    description: "Somos una empresa dedicada a la venta de juegos de mesa, venta de TCG y artículos relacionados.",
    imgUrl: images[1],
    direccion: "Andrés Bello 870, local 7, 4791342 Temuco",
    region: "La Araucanía",
    instagramUrl: "https://www.instagram.com/imperium.tcg/?hl=es", // URL de Instagram
  },
  {
    name: "Blue Card Store",
    description: "Juegos de Cartas, Mesa, Model Kits y figuras de Anime somos Blue Card Store tu tienda favorita, con retiros en tienda en Temuco y envíos a todo Chile.",
    imgUrl: images[1],
    direccion: "Lago Riñihue 01890, 4810895 Temuco",
    region: "La Araucanía",
    instagramUrl: "https://www.instagram.com/bluecard_cl/", // URL de Instagram
    facebookUrl: "https://web.facebook.com/people/Blue-Card-Store/61557012030248/", // URL de Facebook
    websiteUrl: "https://www.bluecard.cl/search?search_text=magic&limit=12&order=relevance&way=DESC" // URL del sitio web

  },
  // Otras tiendas físicas...
];

const onlineStores = [
  {
    name: "Tienda Online 1",
    description: "Compra cartas de Magic en línea.",
    imgUrl: images[5],
    websiteUrl: "https://onlygames.com" // URL del sitio web
  },
  // Otras tiendas en línea...
];

const StoreCard = ({ store, onClick }) => (
  <div
    onClick={() => onClick(store)} // Manejar clic en la tienda
    className="bg-[#12171E] rounded-lg overflow-hidden shadow-lg flex flex-col cursor-pointer max-h-[300px] max-w-[300px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#2d5980]/50" // Clases de Tailwind para efectos
  >
    <img src={store.imgUrl} alt={store.name} className="object-cover w-full h-[60%] max-h-[180px]" />
    <div className="p-4 flex-grow">
      <h2 className="text-lg font-bold text-[#e2e7eb]">{store.name}</h2>
      <p className="text-[#e2e7eb]">{store.description}</p>
    </div>
  </div>
);

const Tiendas = () => {
  const [view, setView] = useState("all");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("all");

  const regions = [...new Set(physicalStores.map(store => store.region))];

  const displayedStores = view === "all"
    ? [...physicalStores, ...onlineStores]
    : view === "physical"
    ? physicalStores.filter(store => selectedRegion === "all" || store.region === selectedRegion)
    : onlineStores;

  const openModal = (store) => {
    setSelectedStore(store);
  };

  const closeModal = () => {
    setSelectedStore(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 space-y-8">
      <div>
        <h1 className="text-xl font-bold text-[#e2e7eb]">Seleccionar Tiendas:</h1>
        <button
          className={`mr-4 p-2 rounded ${view === "all" ? "bg-[#3b3b3b]" : "bg-[#12171E]"} text-[#e2e7eb]`}
          onClick={() => {
            setView("all");
            setSelectedRegion("all"); // Resetear región al mostrar todas
          }}
        >
          Todas
        </button>
        <button
          className={`mr-4 p-2 rounded ${view === "physical" ? "bg-[#3b3b3b]" : "bg-[#12171E]"} text-[#e2e7eb]`}
          onClick={() => {
            setView("physical");
            setSelectedRegion("all"); // Resetear región al mostrar tiendas físicas
          }}
        >
          Tiendas Físicas
        </button>
        <button
          className={`p-2 rounded ${view === "online" ? "bg-[#3b3b3b]" : "bg-[#12171E]"} text-[#e2e7eb]`}
          onClick={() => setView("online")}
        >
          Tiendas Online
        </button>
      </div>

      {/* Filtro por región para tiendas físicas */}
      {view === "physical" && (
        <div className="my-4">
          <label className="text-[#e2e7eb] mr-2">Filtrar por región:</label>
          <select 
            className="p-2 rounded bg-[#2a2a2a] text-[#e2e7eb]"
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">Todas</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>
      )}

      {/* Vista previa de tiendas */}
      <div className={`grid ${displayedStores.length === 1 ? 'flex justify-center' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'} gap-4`}>
        {displayedStores.map((store, index) => (
          <StoreCard key={index} store={store} onClick={openModal} />
        ))} 
      </div>

      {/* Modal con detalles de la tienda */}
      {selectedStore && (
        <DetTiendas store={selectedStore} onClose={closeModal} />
      )}<br></br>
    </div>
  );
};

export default Tiendas;
