import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaUniversity,
} from "react-icons/fa";
import { useUser } from "./UserContext";

const Footer = () => {
  const { userId } = useUser();

  return (
    <div className="mx-auto py-6 text-white bg-[#0b0f14] w-[100%] border-t-[1px] border-[rgba(255,255,255,0.1)]">
      <div className="max-w-[1240px] px-4 mx-auto grid gap-8 md:grid-cols-3">
        {/* Logo y descripción centrados a partir de w600 */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
            alt="MTG Logo"
            className="w-[150px] h-auto mx-auto md:mx-0"
          />
          <p className="py-4 text-center md:text-left">
            Magic: The Gathering es un juego de cartas coleccionables diseñado
            en 1993 por Richard Garfield, profesor de matemáticas, y
            comercializado por la empresa
            <a
              href="https://company.wizards.com/en"
              className="hover:opacity-80 text-[#9ebbd6] transition"
            >
              {" "}
              Wizards of the Coast.
            </a>
          </p>

          {/* Iconos centrados */}
          <div className="flex justify-center md:justify-start space-x-3">
            <a
              href="https://github.com/Pattoxd45/integracion-II"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                size={20}
                className="text-[#e2e7eb] hover:text-[#9ebbd6]"
              />
            </a>
            <a
              href="https://www.instagram.com/wizards_magic/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                size={20}
                className="text-[#e2e7eb] hover:text-[#9ebbd6]"
              />
            </a>
            <a
              href="https://www.facebook.com/MagicTheGathering/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                size={20}
                className="text-[#e2e7eb] hover:text-[#9ebbd6]"
              />
            </a>
            <a
              href="https://www.uct.cl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaUniversity
                size={20}
                className="text-[#e2e7eb] hover:text-[#9ebbd6]"
              />
            </a>
          </div>
        </div>

        {/* Secciones del footer */}
        <div className="md:col-span-2 flex justify-around">
          {/* Sección 1: Recursos */}
          <div>
            <h6 className="font-[14px]">Recursos</h6>
            <ul>
              <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                <a href="https://magic.wizards.com/es/rules">
                  Reglas Oficiales de MTG
                </a>
              </li>
              <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                <a href="/tiendas">Tiendas oficiales</a>
              </li>
              <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                <a href="https://magic.wizards.com/es/products/companion-app">
                  App oficial MTG
                </a>
              </li>
              {userId && (
                <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                  <a href="/decks">Deck Builder</a>
                </li>
              )}
            </ul>
          </div>

          {/* Sección 2: Comunidad */}
          <div>
            <h6 className="font-[14px]">Comunidad</h6>
            <ul>
              <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                <a href="/noticias">Torneos y Eventos</a>
              </li>
              <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                <a href="https://magic-the-gathering.foroactivo.com/">
                  Foros y Grupos
                </a>
              </li>
              <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                <a href="https://magic.wizards.com/es/products">Artículos</a>
              </li>
              <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                <a href="/noticias">Co-Streamers</a>
              </li>
            </ul>
          </div>

          {/* Sección 3: Soporte */}
          <div>
            <h6 className="font-[14px]">Extras</h6>
            <ul>
              <li className="py-2 text-sm hover:text-[#9ebbd6] cursor-pointer">
                <a href="/about">Acerca de Magic</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
