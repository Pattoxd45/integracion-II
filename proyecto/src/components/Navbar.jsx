import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserCheck } from "react-icons/fa"; // Icono para sesión iniciada
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useUser } from "./UserContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { userId, setUser } = useUser(); // Obtén el contexto del usuario
  const profileRef = useRef(null);

  const handleNav = () => {
    if (window.innerWidth < 768) {
      setNav(!nav);
    }
  };

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

  // Restablecer el estado del menú en pantallas más grandes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[#0b0f14] border-b-[1px] border-[rgba(255,255,255,0.1)] z-50 relative">
      <div className="flex justify-between items-center h-19 px-4 text-[#e1e6ea] max-w-[1240px] mx-auto">
        {/* Logo */}
        <Link to="/" onClick={() => setNav(false)}>
          <img
            src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
            alt="Magic: The Gathering Logo"
            className="w-[150px] h-auto"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li className="hover:opacity-70 transition cursor-pointer">
              <Link to="/">Inicio</Link>
            </li>
            <li className="hover:opacity-70 transition cursor-pointer">
              <Link to="/cartas">Cartas</Link>
            </li>
            <li className="hover:opacity-70 transition cursor-pointer">
              <Link to="/noticias">Noticias</Link>
            </li>
          </ul>
          <div className="relative" ref={profileRef}>
            {userId ? (
              <FaUserCheck
                onClick={handleProfileMenu}
                size={30}
                className="cursor-pointer text-[#e1e6ea] hover:opacity-70 transition"
              />
            ) : (
              <CgProfile
                onClick={handleProfileMenu}
                size={30}
                className="cursor-pointer text-[#e1e6ea] hover:opacity-70 transition"
              />
            )}
            {profileMenu && (
              <div className="absolute right-0 mt-3 w-[200px] bg-[#12181E] text-[#e1e6ea] border-2 border-[rgba(255,255,255,0.1)] shadow-md rounded-lg z-50">
                <ul className="flex flex-col p-2 space-y-2">
                  {userId ? (
                    <>
                      <li className="hover:opacity-70 transition">
                        <Link
                          to="/profile"
                          onClick={() => setProfileMenu(false)}
                        >
                          Perfil
                        </Link>
                      </li>
                      <li className="hover:opacity-70 transition">
                        <Link to="/decks" onClick={() => setProfileMenu(false)}>
                          Barajas
                        </Link>
                      </li>
                      <li className="hover:opacity-70 transition">
                        <Link to="/about" onClick={() => setProfileMenu(false)}>
                          Acerca
                        </Link>
                      </li>
                      <li
                        className="hover:opacity-70 transition cursor-pointer"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className="hover:opacity-70 transition cursor-pointer"
                        onClick={openLoginModal}
                      >
                        Iniciar sesión
                      </li>
                      <li
                        className="hover:opacity-70 transition cursor-pointer"
                        onClick={openRegisterModal}
                      >
                        Registrarse
                      </li>
                      <li className="hover:opacity-70 transition">
                        <Link to="/about" onClick={() => setProfileMenu(false)}>
                          Acerca
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="block md:hidden">
          {nav ? (
            <AiOutlineClose
              size={30}
              onClick={handleNav}
              className="cursor-pointer hover:opacity-70 transition"
            />
          ) : (
            <AiOutlineMenu
              size={30}
              onClick={handleNav}
              className="cursor-pointer hover:opacity-70 transition"
            />
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 right-0 w-[75%] max-w-[300px] h-full bg-[#12181E] text-[#e1e6ea] shadow-md z-40 transform ${
          nav ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b-[1px] border-[rgba(255,255,255,0.1)]">
          <Link to="/" onClick={handleNav}>
            <img
              src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
              alt="Magic: The Gathering Logo"
              className="w-[120px] h-auto"
            />
          </Link>
          <AiOutlineClose
            size={30}
            onClick={handleNav}
            className="cursor-pointer hover:opacity-70 transition"
          />
        </div>
        <ul className="flex flex-col mt-6 space-y-4 px-4">
          <li className="hover:opacity-70 transition">
            <Link to="/" onClick={handleNav}>
              Inicio
            </Link>
          </li>
          <li className="hover:opacity-70 transition">
            <Link to="/cartas" onClick={handleNav}>
              Cartas
            </Link>
          </li>
          {userId && ( // Condición para mostrar "Barajas" solo si el usuario ha iniciado sesión
            <li className="hover:opacity-70 transition">
              <Link to="/decks" onClick={handleNav}>
                Barajas
              </Link>
            </li>
          )}
          <li className="hover:opacity-70 transition">
            <Link to="/noticias" onClick={handleNav}>
              Noticias
            </Link>
          </li>
          <li className="hover:opacity-70 transition">
            <Link to="/about" onClick={handleNav}>
              Acerca
            </Link>
          </li>
        </ul>
        <div className="mt-8 px-4">
          {userId ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  handleLogout();
                  setNav(false);
                }}
                className="w-full bg-[#2a5880] py-2 rounded-md hover:bg-[#244b6d] transition"
              >
                Cerrar sesión
              </button>
              <Link
                to="/profile"
                className="w-full block text-center bg-[#9ebbd6] py-2 rounded-md hover:bg-[#87a2b8] transition"
                onClick={handleNav}
              >
                Ver Perfil
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={openLoginModal}
                className="w-full bg-[#2a5880] py-2 rounded-md hover:bg-[#244b6d] transition"
              >
                Iniciar sesión
              </button>
              <button
                onClick={openRegisterModal}
                className="w-full bg-[#9ebbd6] py-2 rounded-md hover:bg-[#87a2b8] transition"
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showRegister && (
        <RegisterModal closeRegisterModal={closeRegisterModal} />
      )}
      {showLogin && <LoginModal closeLoginModal={closeLoginModal} />}
    </div>
  );
};
export default Navbar;
