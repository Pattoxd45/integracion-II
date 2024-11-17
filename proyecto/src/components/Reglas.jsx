import React from 'react';
import reloj from "../images/imgAbout/reloj.png";
import jugador from "../images/imgAbout/jugador.png";
import mazo from "../images/imgAbout/mazo.png";

const Reglas = ({ selectedCardIndex, tarjetas, onClose }) => {
  
  const Info = [
    { //Cerrado
      infoAdicional: "Este formato es utilizado para eventos de pre-lanzamiento de una nueva edición, se puede jugar una partida o al mejor de tres.",
      reglas: ["Crear un mazo de mínimo 40 cartas, a partir de 6 sobres sin abrir.", "Puedes agregar tantas Tierras básicas como quieras.", "Juego 1 contra 1."],
      cantidadJugadores: "2",
      duracionPartida: "20 minutos",
      TamMazo: "40 cartas o más",
    },
    { //Cerrado por equipos
      infoAdicional: "Este formato es usado en eventos de Presentación",
      reglas: ["Equipos de tres jugadores.", "Crear mazos de mínimos 40 cartas, a partir de 12 sobres.", "Puedes agregar tantas Tierras básicas como quieras.", 
               "Duelos 1 contra 1.", "El equipo gana el enfrentamiento cuando al menos 2 de sus jugadores ganan sus duelos individuales."],
      cantidadJugadores: "6",
      duracionPartida: "120 minutos",
      TamMazo: "40 cartas o más",
    },
    {   //Daft
        infoAdicional: "En este formato los jugadores abren su sobre y eligen una carta, luego le pasan las demás cartas al jugador de su izquierda. Posteriormente se repite el proceso con el segundo sobre, pero hacia la derecha. Finalmente se repite el proceso con el tercer sobre, repartiendo hacia la izquierda. Al terminar este proceso cada jugador tendrá alrededor de 45 cartas para crear su mazo. ",
        reglas: ["Máximo 8 jugadores.", "Duelos 1 contra 1.", "Mazos de mínimo 40 cartas, a partir de 3 sobres.", "Cada duelo dura aproximadamente 20 minutos."],
        cantidadJugadores: "2-8",
        duracionPartida: "120 minutos",
        TamMazo: "40 cartas o más",
    },
    {   //Jumpstart
        infoAdicional: "Es una forma de improvisar juegos de Magic. Al combinar dos sobres cualesquiera de Jumpstart.",
        reglas: ["Se combinan 2 sobres de jumpstart", "No se permite el uso de cartas fuera de los paquetes de Jumpstart."],
        cantidadJugadores: "2-12",
        duracionPartida: "20 minutos",
        TamMazo: "40 cartas",
    },
    {   //Standar
        infoAdicional: "Cada año se publican nuevas colecciones de Magic que se añaden a Estándar. Una vez al año, cuando se lanza la colección de otoño, las cuatro colecciones más antiguas de Estándar dejan de formar parte del formato.",
        reglas: ["Duelos 1 contra 1.", "Se determina el ganador en partidas de un solo juego o el mejor de 3."],
        cantidadJugadores: "2",
        duracionPartida: "20 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //Pioneer
        infoAdicional: "En este formato, las cartas no rotan a medida que se lanzan nuevas colecciones de Estándar.",
        reglas: ["Usa colecciones de Regreso a Rávnica en adelante.", "Los mazos pueden tener hasta 4 copias de una carta entre el mazo principal y el sideboard combinados.", "La restricción anterior no se aplica a las Tierras básicas.", "Hasta 15 cartas en tu sideboard (si usas uno)."],
        cantidadJugadores: "2",
        duracionPartida: "20 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //Modern
        infoAdicional: "Este formato incluye cartas y estrategias poderosas de las dos décadas más recientes de Magic.",
        reglas: ["Duelos 1 contra 1.", "Se usa un sideboard de hasta 15", "El mazo y sideboard combinados no pueden tener más de cuatro copias de cualquier carta, según su nombre en inglés.", "La regla anterior no se aplica a las Tierras básicas."],
        cantidadJugadores: "2",
        duracionPartida: "20 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //Legacy
        infoAdicional: "Es un formato Construido sin rotación y permite jugar cartas de todas las colecciones de Magic con excepción de las cartas en la lista de prohibidas.",
        reglas: ["No puede haber más de 4 copias de cualquier carta entre tu mazo y sideboard", "La regla anterior no se aplica a las Tierras básicas.", "Puedes usar hasta 15 cartas en tu sideboard (si usas uno)."],
        cantidadJugadores: "2",
        duracionPartida: "20 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //Vintage
        infoAdicional: "Este formato permite jugar cartas de todas las colecciones de Magic e incluye cartas de las expansiones y las colecciones especiales con excepción de las cartas en la lista de prohibidas.",
        reglas: ["No se permite que tu mazo y tu sideboard combinados contengan más de 4 copias de cualquier carta.", "Puedes usar hasta 15 cartas en tu sideboard (si usas uno)."],
        cantidadJugadores: "2",
        duracionPartida: "20 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //Historic
        infoAdicional: "En este formato las cartas no rotan a medida que se lanzan nuevas colecciones y se juega de forma digital en MTG Arena.",
        reglas: ["Puedes incluir hasta 15 cartas en tu sideboard, o 7 en los juegos al mejor de uno.", "No permite incluir más de 4 copias de una carta específica en tu mazo principal y sideboard juntos.", "La regla anterior no aplica a las Tierras básicas."],
        cantidadJugadores: "2",
        duracionPartida: "10 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //Pauper
        infoAdicional: "Este formato es accesible, ya que las cartas con las que se construyen los mazos son fáciles de obtener.",
        reglas: ["Se usan cartas que se hayan lanzado con una rareza común en un producto o una colección de Magic.", "Las cartas promocionales comunes olo son legales si cumplen el requisito anterior", "Puedes usar hasta 15 cartas en tu sideboard (si usas uno).", "No permite más de 4 copias de cualquier carta en tu mazo principal y sideboard combinados.", "La regla anterior no aplica a las Tierras básicas."],
        cantidadJugadores: "2",
        duracionPartida: "20 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //Commander
        infoAdicional: "El formato Commander se centra en elegir a tu héroe y construir un mazo basado en él. En esta modalidad casual para varios jugadores, eliges una criatura legendaria para que sea tu comandante y construyes el resto del mazo en torno a su identidad de color y sus habilidades. Durante el juego, un jugador puede decidir atacar a cualquier otro jugador, al margen de su posición en la mesa, o atacar a varios jugadores diferentes en su fase de ataque. Los permanentes, hechizos y habilidades también pueden hacer objetivo a cualquier jugador de la mesa",
        reglas: ["Cada jugador comienza con 40 vidas", "Los turnos avanzan de jugador en jugador en el sentido de las agujas del reloj alrededor de la mesa.", "Formato para 4 jugadores.", "Los mazos contienen 99 cartas y 1 carta de comandante.", "Solo se pueden incluir en el mazo una copia de cada carta", "La regla anterior no aplica a las Tierras básicas", "Todas las cartas de tu mazo de Commander deben usar únicamente símbolos de maná que también aparezcan en tu comandante.", "Las cartas incoloras también están permitidas.", "Al principio del juego, cada jugador pone a su comandante boca arriba en la zona de mando.", "Se puede lanzar a un comandante desde la zona de mando por su coste normal pero, cada vez que se haya jugado de esta manera, hay que pagar 2 manás adicionales.", "Si mandan a tu comandante al cementerio o al exilio, puedes devolverlo a tu zona de mando, si así lo prefieres.", "Si un mismo comandante hace 21 puntos de daño de combate a un jugador en el transcurso del juego, este jugador pierde el juego.", "Si juegas un juego de Commander con tres o más personas, el formato es de varios jugadores todos contra todos.",],
        cantidadJugadores: "3-5",
        duracionPartida: "120 minutos",
        TamMazo: "100 cartas",
    },
    {   //OATHBREAKER
        infoAdicional: "Este es un formato para varios jugadores en el que los participantes construyen un mazo centrado en su planeswalker favorito.",
        reglas: ["Cada jugador comienza con 20 vidas", "Este formato se juega en varias partidas, todos contra todos", "Los mazos contienen, 1 oathbreaker (una carta de planeswalker), 1 hechizo distintivo (una carta de instantáneo o de conjuro) y 58 cartas del mazo principal.", "Todas las cartas del mazo de un jugador, incluido el hechizo distintivo, deben coincidir con la identidad de color de su oathbreaker.", "La regla anterior no aplica a las Tierras básicas.", "Solo se pueden tener una copia de cada carta en el mazo.", "Son legales las cartas de todas las colecciones de la historia de Magic.", "Todas las cartas de tu mazo, incluido tu hechizo distintivo, solo pueden usar símbolos de maná que también tenga tu oathbreaker.", "Están permitidas las cartas incoloras"],
        cantidadJugadores: "3-5",
        duracionPartida: "50 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //BRAWL
        infoAdicional: "Este es un formato digital que mezcla los formatos Estándar y Commander. Puede jugarse en MTG Arena.",
        reglas: ["Cada jugador comienza con 25 vidas", "Los mazos deben contener 1 carta de comandante, Otras 99 cartas legales en Brawl", "Las cartas Brawl deben ser del mismo color que la carta de comander", "Solo se debe tener 1 copia de cada carta", "La regla anterior no aplica a las Tierras básicas", "Los mazos de Brawl no usan sideboard."],
        cantidadJugadores: "2",
        duracionPartida: "20 minutos",
        TamMazo: "100 cartas",
    },
    {   //TWO-HEADED GIANT
        infoAdicional: "En este formato se juega, planea y lucha en equipos de 2 personas.",
        reglas: ["Juego en equipo de 2 jugadores.", "El total de vidas es compartido y empieza en 30.", "Juego por turnos.", "Los equipos no comparten ningún recurso a parte de las vidas.", "El equipo que empieza, se salta su primer paso de robar", "Solo se permite compartir entre el equipo, 4 copias de cualquier carta que no sea un Tierra básica.", "Los mazos se crean con los sobres que abren."],
        cantidadJugadores: "4",
        duracionPartida: "120 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //ALCHEMY
        infoAdicional: "Es un formato de MTG Arena basado en el formato Estándar que incluye nuevas cartas de Magic exclusivas de la versión digital y cartas de Estándar reajustadas. Este es un formato digital exclusivo para MTG Arena.",
        reglas: ["Duelos 1 contra 1.", "Sigue las mismas rotaciones del formato Standard", "Puedes usar hasta 15 cartas en tu sideboard (si usas uno)."],
        cantidadJugadores: "2",
        duracionPartida: "20 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //PLANECHASE
        infoAdicional: "Formato de varios jugadores con planos sobredimensionados y cartas de fenómeno que afectan a todo el campo.",
        reglas: ["Mazo planar compartido", "Los efectos del mazo planar se aplican a todos los jugadores", "Al tirar el dado planar: si cae en el símbolo de Planeswalker, los jugadores deben caminar por los planos y pasar al siguiente plano.", "Si cae en el símbolo de caos, ese jugador debe disparar la habilidad de caos del plano.", "La primera tirada de cada turno es gratis, pero, si el jugador quiere tirar el dado planar más de una vez, deberá pagar (1) adicional por cada tirada.", "Un mazo planar compartido debe contener al menos 40 cartas o al menos 10 veces la cantidad de jugadores en el juego.", "Un mazo planar compartido no puede contener más cartas de fenómeno que el doble de la cantidad de jugadores en el juego.", "Los mazos planares individuales deben contener al menos 10 cartas y no más de 2 cartas de fenómeno.", "No se pueden tener varias copias del mismo plano o fenómeno en el mismo mazo planar."],
        cantidadJugadores: "2-4",
        duracionPartida: "50 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //ARCHENEMY
        infoAdicional: "Formato para realizar partidas de varios jugadores con un archienemigo enfrentado a un equipo de tres o más personas.",
        reglas: ["Cada miembro del equipo comienza con 20 vidas y un mazo normal de 60 cartas o más.", "El archienemigo comienza con 40 vidas y un mazo normal con 60 cartas o más, además de un mazo de planes, que debe contener 20 o más cartas de planes.", "El archienemigo siempre juega primero y roba una carta durante su primer paso de robar.", "Al comienzo de cada turno del archienemigo, este debe mostrar la primera carta de su mazo de planes y pone en marcha ese plan.", "La mayoría de los planes tienen una habilidad que se dispara de inmediato cuando se ponen en marcha; a continuación, la carta va al fondo del mazo de planes. En cambio, otros son planes “continuos” que, tras ponerlos en marcha, permanecen boca arriba y activos hasta que una habilidad diga que “abandones” el plan.", "Los demás participantes juegan sus turnos a la vez. Primero juegan juntos su fase inicial,  luego declaran atacantes al mismo tiempo en su fase de combate.", "Cuando el archienemigo declare atacantes, debe elegir a qué jugador atacará cada criatura. Luego, los miembros del equipo declaran bloqueadoras a la vez y pueden bloquear los ataques contra sus aliados.", "Si un jugador del equipo se queda sin vidas y pierde, remueve del juego todas las cartas de las que es propietario.", "El juego continúa hasta que pierda el archienemigo o hasta que pierdan todos los miembros del equipo.", "Existe la variante Contienda de Supervillanos. Donde en vez de enfrentar a un archienemigo contra tres o más jugadores, en esta modalidad hay tres o más participantes que tienen su propio mazo de planes y luchan todos contra todos. Cada jugador comienza con 40 vidas."],
        cantidadJugadores: "4+",
        duracionPartida: "60 minutos",
        TamMazo: "60 cartas o más",
    },
    {   //TIMELESS
      infoAdicional: "Este es el formato con las cartas más poderosas de Arena. Las cartas no rotan a medida que se lanzan nuevas colecciones de Estándar.",
      reglas: ["Todas las cartas son legales", "Solo se permite el uso de una carta a una sola copia permitida entre el sideboard y el mazo principal."],
      cantidadJugadores: "2",
      duracionPartida: "10 minutos",
      TamMazo: "60 cartas o más",
  },
  {   //CONSPIRACY
      infoAdicional: "En este formato, las cartas de Conspiracy pueden afectar a su propietario, a los oponentes o a los propios mazos.",
      reglas: ["Cada jugador abre uno de sus tres sobres y selecciona una carta cada vez para añadirla a su reserva. Luego, pasa boca abajo las cartas que quedan al siguiente jugador.", "Los jugadores también eligen las cartas del tipo Conspiracy que comenzarán el juego en su zona de mando.", "Las cartas de Conspiracy no son permanentes y no pueden ser afectadas por nada una vez que comienza el juego.", "Los jugadores pueden atacar, usar permanentes, lanzar hechizos, etc., a varios jugadores durante su fase de ataque.", "Duelos 1 contra 1.", "Si juegan más de 2 personas, la modalidad será todos contra todos."],
      cantidadJugadores: "3-9",
      duracionPartida: "120 minutos",
      TamMazo: "40 cartas o más",
  },
  {   //FREEFORM
      infoAdicional: "En este formato se permiten todas las colecciones y cartas.",
      reglas: ["No hay cartas prohibidas.", "Los mazos pueden incluir cualquier cantidad de copias de una carta.", "El mazo principal debe contener al menos 40 cartas", "Puedes usar hasta 15 cartas en tu sideboard (si usas uno).", "Duelos 1 contra 1."],
      cantidadJugadores: "2",
      duracionPartida: "10 minutos",
      TamMazo: "40 cartas o más",
  },
  {   //MOMIR BASIC
      infoAdicional: "En este formato no hay dos turnos iguales y las criaturas aleatorias de Magic te ayudan a vencer. Se puede en Magic Online y MTG Arena.",
      reglas: ["Se juega con mazos de 60 cartas de Tierras básicas y una única carta Mómir Vig.", "En cada turno, los jugadores descartan una tierra básica para usar a Mómir Vig y obtienen una criatura al azar de toda la historia de Magic.", "Los jugadores comienzan con 24 vidas."],
      cantidadJugadores: "2",
      duracionPartida: "10 minutos",
      TamMazo: "60 cartas o más",
  },
  ];

  if (selectedCardIndex === null || selectedCardIndex >= Info.length) return null; // Validar índice

  const selectedInfo = Info[selectedCardIndex]; // Almacena la información seleccionada

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      onClick={onClose} // Cerrar modal al hacer clic fuera
    >
      <div 
        className="bg-[#0b0f14] p-4 sm:p-6 rounded-lg border-[2px] border-[rgba(255,255,255,0.1)] relative max-w-[90%] sm:max-w-[750px] w-full h-auto max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} // Evitar que el clic en el cuadro cierre el modal
      >
        <h2 className="text-xl sm:text-2xl text-[#3587cf] mb-4">{tarjetas[selectedCardIndex].nombre}</h2>
        <p className="text-base sm:text-lg text-[#e2e7eb]">{selectedInfo.infoAdicional}</p>
        <h3 className="text-lg sm:text-xl text-[#3587cf] mt-4">Reglas del juego</h3>
        <ul className="list-disc pl-5 text-base sm:text-lg text-[#e2e7eb]">
          {selectedInfo.reglas.map((regla, index) => (
            <li key={index}>{regla}</li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between"> {/* Contenedor flex para horizontal */}
          <div className="flex flex-col items-center"> {/* Columna para el mazo */}
            <img src={mazo} alt="Mazo" className="w-12 h-12 sm:w-16 sm:h-16 mb-2" />
            <span className="text-base sm:text-lg text-[#e2e7eb]">Tamaño del Mazo</span>
            <span className="text-base sm:text-lg text-[#e2e7eb]">{selectedInfo.TamMazo}</span>
          </div>
          <div className="flex flex-col items-center"> {/* Columna para los jugadores */}
            <img src={jugador} alt="Jugadores" className="w-12 h-12 sm:w-16 sm:h-16 mb-2" />
            <span className="text-base sm:text-lg text-[#e2e7eb]">Cantidad de Jugadores</span>
            <span className="text-base sm:text-lg text-[#e2e7eb]">{selectedInfo.cantidadJugadores}</span>
          </div>
          <div className="flex flex-col items-center"> {/* Columna para la duración */}
            <img src={reloj} alt="Reloj" className="w-12 h-12 sm:w-16 sm:h-16 mb-2" />
            <span className="text-base sm:text-lg text-[#e2e7eb]">Duración del Juego</span>
            <span className="text-base sm:text-lg text-[#e2e7eb]">{selectedInfo.duracionPartida}</span>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-[#2a5880] hover:text-[#2d5980]"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default Reglas;