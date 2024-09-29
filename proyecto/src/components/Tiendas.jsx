import React from 'react';

const Tiendas = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Tiendas</h1>
      <p>Tiendas online recomendads</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <a 
          href="https://www.cardmarket.com/es" 
          className="flex items-center justify-center h-32 bg-black border border-red-500 text-white cursor-pointer"
        >
          Cardmarket 
        </a>
        <a 
          href="https://www.tcgplayer.com" 
          className="flex items-center justify-center h-32 bg-black border border-red-500 text-white cursor-pointer"
        >
          TCGPlayer
        </a>
        <a 
          href="https://starcitygames.com" 
          className="flex items-center justify-center h-32 bg-black border border-red-500 text-white cursor-pointer"
        >
          Star City Games
        </a>
        <a 
          href="https://www.channelfireball.com" 
          className="flex items-center justify-center h-32 bg-black border border-red-500 text-white cursor-pointer"
        >
          ChannelFireball
        </a>
        <a 
          href="https://www.coolstuffinc.com" 
          className="flex items-center justify-center h-32 bg-black border border-red-500 text-white cursor-pointer"
        >
          CoolStuffInc
        </a>
        <a 
          href="https://www.cardkingdom.com" 
          className="flex items-center justify-center h-32 bg-black border border-red-500 text-white cursor-pointer"
        >
          Card Kingdom
        </a>
      </div>
    </div>
  );
};

export default Tiendas;
