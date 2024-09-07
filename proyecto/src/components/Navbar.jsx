import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-[#253237]">
      <div className="flex justify-between items-center h-24 px-4 text-[#ddd] max-w-[1240px] mx-auto">
        <h1 className="w-full text-3xl font-bold">Magic: The Gathering</h1>
        <ul className="hidden md:flex">
          <li className="p-4 hover:text-[#9DB4C0]">Inicio</li>
          <li className="p-4 hover:text-[#9DB4C0]">Cartas</li>
          <li className="p-4 hover:text-[#9DB4C0]">Noticias</li>
          <li className="p-4 hover:text-[#9DB4C0]">Acerca</li>
          <li className="p-4 hover:text-[#9DB4C0]">Register</li>
          <li className="p-4 hover:text-[#9DB4C0]">Soporte</li>
        </ul>
        <div onClick={handleNav} className="block md:hidden text-[#E0FBFC]">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-[#9DB4C0] bg-[#253237] ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
        >
          <h1 className="w-full text-3xl font-bold text-[#E0FBFC] px-4 py-[30px]">
            Magic: The Gathering
          </h1>
          <ul className="uppercase p-4 text-[#E0FBFC]">
            <li className="p-4 border-b border-[#5C6B73]">Inicio</li>
            <li className="p-4 border-b border-[#5C6B73]">Cartas</li>
            <li className="p-4 border-b border-[#5C6B73]">Noticias</li>
            <li className="p-4 border-b border-[#5C6B73]">Acerca</li>
            <li className="p-4 border-b border-[#5C6B73]">Register</li>
            <li className="p-4">Soporte</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
