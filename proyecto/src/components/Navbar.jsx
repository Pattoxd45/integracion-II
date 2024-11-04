import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserCheck } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useUser } from './UserContext';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const lastScrollY = useRef(window.scrollY);
  const location = useLocation();

  const { userId, setUser } = useUser();
  const profileRef = useRef(null);

  const handleNav = () => setNav(!nav);
  const handleProfileMenu = () => setProfileMenu(!profileMenu);

  const openRegisterModal = () => setShowRegister(true);
  const closeRegisterModal = () => setShowRegister(false);
  const openLoginModal = () => setShowLogin(true);
  const closeLoginModal = () => setShowLogin(false);

  const handleLogout = () => {
    setUser(null);
    window.location.href = "/";
  };

  const closeProfileMenu = () => setProfileMenu(false);

  // Cerrar menú de perfil al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        closeProfileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll al top al cambiar de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Mostrar/ocultar el segundo navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (window.scrollY < lastScrollY.current) {
          setShowFixedNavbar(true);
        } else {
          setShowFixedNavbar(false);
        }
      } else {
        setShowFixedNavbar(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderNavbarContent = () => (
    <div className="flex justify-between items-center h-19 px-4 text-[#e1e6ea] max-w-[1240px] mx-auto">
      <Link to="/" onClick={closeProfileMenu}>
        <img
          src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
          alt="Magic: The Gathering Logo"
          className="w-[150px] h-auto"
        />
      </Link>

      <div className="flex items-center space-x-2">
        <ul className="hidden md:flex">
          <li className="p-4 hover:opacity-70 transition cursor-pointer" onClick={closeProfileMenu}>
            <Link to="/">Inicio</Link>
          </li>
          <li className="p-4 hover:opacity-70 transition cursor-pointer" onClick={closeProfileMenu}>
            <Link to="/cartas">Cartas</Link>
          </li>
          <li className="p-4 hover:opacity-70 transition cursor-pointer" onClick={closeProfileMenu}>
            <Link to="/noticias">Noticias</Link>
          </li>
        </ul>

        <div className="flex items-center space-x-[6px]">
          <div className="relative" ref={profileRef}>
            {userId ? (
              <FaUserCheck onClick={handleProfileMenu} size={30} className="cursor-pointer text-[#e1e6ea] hover:opacity-70 transition"/>
            ) : (
              <CgProfile onClick={handleProfileMenu} size={30} className="cursor-pointer text-[#e1e6ea] hover:opacity-70 transition"/>
            )}
            
            {profileMenu && (
              <div className="absolute right-0 mt-3 w-[200px] bg-[#12181E] text-[#e1e6ea] border-2 border-[rgba(255,255,255,0.1)] shadow-md rounded-lg z-50">
                <ul className="flex flex-col p-2 space-y-2">
                  {userId ? (
                    <>
                      <li className="hover:opacity-70 transition" onClick={closeProfileMenu}>
                        <Link to="/profile">Perfil</Link>
                      </li>
                      <li className="hover:opacity-70 transition" onClick={closeProfileMenu}>
                        <Link to="/decks">Barajas</Link>
                      </li>
                      <li className="hover:opacity-70 transition" onClick={closeProfileMenu}>
                        <Link to="/about">Acerca</Link>
                      </li>
                      <li className="hover:opacity-70 transition cursor-pointer" onClick={() => { closeProfileMenu(); handleLogout(); }}>Cerrar sesión</li>
                    </>
                  ) : (
                    <>
                      <li className="hover:opacity-70 transition cursor-pointer" onClick={() => { closeProfileMenu(); openLoginModal(); }}>Iniciar sesión</li>
                      <li className="hover:opacity-70 transition cursor-pointer" onClick={() => { closeProfileMenu(); openRegisterModal(); }}>Registrarse</li>
                      <li className="hover:opacity-70 transition" onClick={closeProfileMenu}>
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
      
      {nav && (
        <ul className="absolute bg-[#0b0f14] w-full px-8 text-[#e1e6ea] border-b-[1px] border-[rgba(255,255,255,0.1)]">
          <li className="border-b-2 border-[rgba(255,255,255,0.1)] w-full p-4 hover:opacity-70 transition cursor-pointer" onClick={closeProfileMenu}>
            <Link to="/">Inicio</Link>
          </li>
          <li className="border-b-2 border-[rgba(255,255,255,0.1)] w-full p-4 hover:opacity-70 transition cursor-pointer" onClick={closeProfileMenu}>
            <Link to="/cartas">Cartas</Link>
          </li>
          <li className="border-b-2 border-[rgba(255,255,255,0.1)] w-full p-4 hover:opacity-70 transition cursor-pointer" onClick={closeProfileMenu}>
            <Link to="/noticias">Noticias</Link>
          </li>
          <li className="border-[rgba(255,255,255,0.1)] w-full p-4 hover:opacity-70 transition cursor-pointer" onClick={closeProfileMenu}>
            <Link to="/about">Acerca</Link>
          </li>
        </ul>
      )}
      {showRegister && <RegisterModal closeRegisterModal={closeRegisterModal} />}
      {showLogin && <LoginModal closeLoginModal={closeLoginModal} />}
    </div>
  );

  return (
    <>
      {/* Navbar principal */}
      <div className="bg-[#0b0f14] border-b-[1px] border-[rgba(255,255,255,0.1)]">
        {renderNavbarContent()}
      </div>

      {/* Segundo navbar que aparece al hacer scroll hacia arriba */}
      {showFixedNavbar && !nav && (
        <div className={`fixed top-0 left-0 w-full bg-[#0b0f14] border-b-[1px] border-[rgba(255,255,255,0.1)] text-[#e1e6ea] z-50 shadow-md transition-transform duration-300 ${showFixedNavbar ? "slide-down" : "slide-up"}`}>
          {renderNavbarContent()}
        </div>
      )}

      <style jsx>{`
        /* Animación para el segundo navbar */
        .slide-down {
          transform: translateY(0);
        }
        .slide-up {
          transform: translateY(-100%);
        }
      `}</style>
    </>
  );
};

export default Navbar;
