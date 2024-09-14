import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-[#000] mb-6">
      <div className="flex justify-between items-center h-18 px-4 text-[#ddd] max-w-[1240px] mx-auto">
        <img
          src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
          alt="Magic: The Gathering Logo"
          className="w-[150px] h-auto"
        />
        <ul className="hidden md:flex">
          <li className="p-4 hover:text-[#e85438] cursor-pointer">
            <Link to="/">Inicio</Link>
          </li>
          <li className="p-4 hover:text-[#e85438] cursor-pointer">Cartas</li>
          <li className="p-4 hover:text-[#e85438] cursor-pointer">Noticias</li>
          <li className="p-4 hover:text-[#e85438] cursor-pointer">Acerca</li>
          <li className="p-4 hover:text-[#e85438] cursor-pointer">Soporte</li>
          <li className="p-4 hover:text-[#e85438] cursor-pointer">
            <Link to="/register">Register</Link>
          </li>
          <li className="p-4 hover:text-[#e85438] cursor-pointer">
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <div onClick={handleNav} className="block md:hidden text-[#E0FBFC]">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-[#ddd] bg-[#000] ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
        >
          <img
            src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
            alt="Magic: The Gathering Logo"
            className="w-[150px] h-auto px-4 py-[30px]"
          />
          <ul className="uppercase p-4 text-[#E0FBFC]">
            <li className="p-4 border-b border-[#ddd] hover:text-[#e85438] cursor-pointer">
              Inicio
            </li>
            <li className="p-4 border-b border-[#ddd] hover:text-[#e85438] cursor-pointer">
              Cartas
            </li>
            <li className="p-4 border-b border-[#ddd] hover:text-[#e85438] cursor-pointer">
              Noticias
            </li>
            <li className="p-4 border-b border-[#ddd] hover:text-[#e85438] cursor-pointer">
              Acerca
            </li>
            <li className="p-4 border-b border-[#ddd] hover:text-[#e85438] cursor-pointer">
              Soporte
            </li>
            <li className="p-4 hover:text-[#e85438]">Register</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;