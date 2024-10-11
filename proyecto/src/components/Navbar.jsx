import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserCheck } from "react-icons/fa"; // Icono para sesión iniciada
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useUser } from './UserContext';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { userId, setUser } = useUser(); // Obtén el contexto del usuario
  const profileRef = useRef(null);

  const handleNav = () => setNav(!nav);
  const handleProfileMenu = () => setProfileMenu(!profileMenu);

  const openRegisterModal = () => setShowRegister(true);
  const closeRegisterModal = () => setShowRegister(false);
  const openLoginModal = () => setShowLogin(true);
  const closeLoginModal = () => setShowLogin(false);
  
  const handleLogout = () => {
    setUser(null); // Limpia el contexto del usuario
    // Redirige a la página principal
    window.location.href = "/"; // Redirige a la página principal
  };

  // Cierra el menú de perfil cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#000] mb-6">
      <div className="flex justify-between items-center h-18 px-4 text-[#ddd] max-w-[1240px] mx-auto">
        <Link to="/">
          <img
            src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
            alt="Magic: The Gathering Logo"
            className="w-[150px] h-auto"
          />
        </Link>

        <div className="flex items-center space-x-2">
          <ul className="hidden md:flex">
            <li className="p-4 hover:text-[#e85438] cursor-pointer">
              <Link to="/">Inicio</Link>
            </li>
            <li className="p-4 hover:text-[#e85438] cursor-pointer">
              <Link to="/cartas">Cartas</Link>
            </li>
            <li className="p-4 hover:text-[#e85438] cursor-pointer">
              <Link to="/noticias">Noticias</Link>
            </li>
            {/* Opción "Acerca" eliminada de aquí */}
          </ul>

          <div className="flex items-center space-x-[6px]">
            <div className="relative" ref={profileRef}>
              {userId ? (
                <FaUserCheck onClick={handleProfileMenu} size={30} className="cursor-pointer text-[#ddd] hover:text-[#e85438]" />
              ) : (
                <CgProfile onClick={handleProfileMenu} size={30} className="cursor-pointer text-[#ddd] hover:text-[#e85438]" />
              )}
              
              {profileMenu && (
                <div className="absolute right-0 mt-2 w-[200px] bg-[#1a1a1a] text-[#ddd] shadow-md rounded-lg z-50">
                  <ul className="flex flex-col p-2 space-y-2">
                    {userId ? (
                      <>
                        <li className="hover:text-[#e85438]">
                          <Link to="/Profile">Perfil</Link>
                        </li>
                        <li className="hover:text-[#e85438}">
                          <Link to="/about">Acerca</Link>
                        </li>
                        <li className="hover:text-[#e85438]" onClick={handleLogout}>Cerrar sesión</li>
                      </>
                    ) : (
                      <>
                        <li className="hover:text-[#e85438]" onClick={openLoginModal}>Iniciar sesión</li>
                        <li className="hover:text-[#e85438]" onClick={openRegisterModal}>Registrarse</li>
                        <li className="hover:text-[#e85438}">
                          <Link to="/about">Acerca</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div onClick={handleNav} className="block md:hidden">
            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </div>
        </div>
      </div>
      
      {nav && (
        <ul className="absolute bg-[#000] w-full px-8">
          <li className="border-b-2 border-[#ddd] w-full p-4 hover:bg-[#e85438] cursor-pointer">
            <Link to="/">Inicio</Link>
          </li>
          <li className="border-b-2 border-[#ddd] w-full p-4 hover:bg-[#e85438] cursor-pointer">
            <Link to="/cartas">Cartas</Link>
          </li>
          <li className="border-b-2 border-[#ddd] w-full p-4 hover:bg-[#e85438] cursor-pointer">
            <Link to="/noticias">Noticias</Link>
          </li>
          <li className="border-b-2 border-[#ddd] w-full p-4 hover:bg-[#e85438] cursor-pointer">
            <Link to="/about">Acerca</Link>
          </li>
        </ul>
      )}
      {showRegister && <RegisterModal closeRegisterModal={closeRegisterModal} />}
      {showLogin && <LoginModal closeLoginModal={closeLoginModal} />}
    </div>
  );
};

export default Navbar;
