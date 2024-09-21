import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal"; // Importa el modal de Login

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Controla el modal de registro
  const [showLogin, setShowLogin] = useState(false); // Controla el modal de inicio de sesión (login)
  const profileRef = useRef(null); // Referencia para el dropdown del perfil

  const handleNav = () => {
    setNav(!nav);
  };

  const handleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  const openRegisterModal = () => {
    setShowRegister(true); // Abre el modal de registro
  };

  const closeRegisterModal = () => {
    setShowRegister(false); // Cierra el modal de registro
  };

  const openLoginModal = () => {
    setShowLogin(true); // Abre el modal de inicio de sesión
  };

  const closeLoginModal = () => {
    setShowLogin(false); // Cierra el modal de inicio de sesión
  };

  // Cerrar el dropdown del perfil cuando se hace clic fuera
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
  }, [profileRef]);

  // Bloquear el scroll cuando el modal de registro o de inicio de sesión está abierto
  useEffect(() => {
    if (showRegister || showLogin) {
      document.body.style.overflow = "hidden"; // Bloquea el scroll
    } else {
      document.body.style.overflow = "auto"; // Restaura el scroll
    }
  }, [showRegister, showLogin]);

  return (
    <div className="bg-[#000] mb-6">
      <div className="flex justify-between items-center h-18 px-4 text-[#ddd] max-w-[1240px] mx-auto">
        <img
          src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
          alt="Magic: The Gathering Logo"
          className="w-[150px] h-auto"
        />

        <div className="flex items-center space-x-2">
          <ul className="hidden md:flex">
            <li className="p-4 hover:text-[#e85438] cursor-pointer">
              <Link to="/">Inicio</Link>
            </li>
            <li className="p-4 hover:text-[#e85438] cursor-pointer">
              <Link to="/cartas">Cartas</Link>
            </li>
            <li className="p-4 hover:text-[#e85438] cursor-pointer">Noticias</li>
          </ul>

          {/* Profile Icon for Desktop */}
          <div className="hidden md:block relative" ref={profileRef}>
            <CgProfile
              onClick={handleProfileMenu}
              size={30}
              className="cursor-pointer text-[#ddd] hover:text-[#e85438]"
            />
            {profileMenu && (
              <div className="absolute right-0 mt-2 w-[150px] bg-[#1a1a1a] text-[#ddd] shadow-md rounded-lg z-50">
                <ul className="flex flex-col p-2 space-y-2">
                  <li className="hover:text-[#e85438]">
                    <Link to="/about">Acerca</Link>
                  </li>
                  <li className="hover:text-[#e85438]">
                    <Link to="/support">Soporte</Link>
                  </li>
                  <li className="hover:text-[#e85438]" onClick={openRegisterModal}>
                    Register
                  </li>
                  <li className="hover:text-[#e85438]" onClick={openLoginModal}>
                    Login
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center md:hidden space-x-2">
          <div className="relative" ref={profileRef}>
            <CgProfile
              onClick={handleProfileMenu}
              size={30}
              className="cursor-pointer text-[#ddd] hover:text-[#e85438]"
            />
            {profileMenu && (
              <div className="absolute top-[60px] right-0 w-[150px] bg-[#1a1a1a] text-[#ddd] shadow-md rounded-lg z-50">
                <ul className="flex flex-col p-2 space-y-2">
                  <li className="hover:text-[#e85438]">
                    <Link to="/about">Acerca</Link>
                  </li>
                  <li className="hover:text-[#e85438]">
                    <Link to="/support">Soporte</Link>
                  </li>
                  <li className="hover:text-[#e85438]" onClick={openRegisterModal}>
                    Register
                  </li>
                  <li className="hover:text-[#e85438]" onClick={openLoginModal}>
                    Login
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div onClick={handleNav} className="text-[#E0FBFC]">
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
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
              <Link to="/">Inicio</Link>
            </li>
            <li className="p-4 border-b border-[#ddd] hover:text-[#e85438] cursor-pointer">
              <Link to="/cartas">Cartas</Link>
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
          </ul>
        </div>
      </div>

      {showRegister && (
        <RegisterModal closeRegisterModal={closeRegisterModal} />
      )}
      {showLogin && (
        <LoginModal closeLoginModal={closeLoginModal} />
      )}
    </div>
  );
};

export default Navbar;
