import React, {useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-[#000300]">
      <h1 className="w-full text-3xl font-bold text-[#ddd]">Magic: The Gathering</h1>
      <ul className="hidden md:flex">
        <li className="p-4">Inicio</li>
        <li className="p-4">Cartas</li>
        <li className="p-4">Noticias</li>
        <li className="p-4">Acerca</li>
        <li className="p-4">Register</li>
        <li className="p-4">Soporte</li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div className={!nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500" : "fixed left-[-100%]"}>
        <h1 className="w-full text-3xl font-bold text-[#ddd] px-4 py-[30px]">Magic: The Gathering</h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Cards</li>
          <li className="p-4 border-b border-gray-600">News</li>
          <li className="p-4 border-b border-gray-600">About</li>
          <li className="p-4 border-b border-gray-600">Register</li>
          <li className="p-4">Support</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar