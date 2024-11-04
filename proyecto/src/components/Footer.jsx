import React from "react";
import { FaGithub, FaInstagram, FaFacebook, FaUniversity } from "react-icons/fa"; // Importamos los iconos

const Footer = () => {
  return (
    <div className="mx-auto py-6 text-white bg-[#0b0f14] w-[100%] border-t-[1px] border-[rgba(255,255,255,0.1)]">
      <div className="max-w-[1240px] px-4 mx-auto grid lg:grid-cols-3 gap-8">
        {/* Logo y descripción */}
        <div>
          <img
            src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
            alt="MTG Logo"
            className="w-[150px] h-auto"
          />
          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, error
            consequuntur temporibus impedit et accusantium?
          </p>

          {/* Iconos de GitHub, Instagram, Facebook y Universidad */}
          <div className="flex space-x-3">
            <a href="https://github.com/Pattoxd45/integracion-II" target="_blank" rel="noopener noreferrer">
              <FaGithub size={20} className="text-[#ddd] hover:text-[#e85438]" />
            </a>
            <a href="https://www.instagram.com/wizards_magic/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} className="text-[#ddd] hover:text-[#e85438]" />
            </a>
            <a href="https://www.facebook.com/MagicTheGathering/" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={20} className="text-[#ddd] hover:text-[#e85438]" />
            </a>
            <a href="https://www.uct.cl/" target="_blank" rel="noopener noreferrer">
              <FaUniversity size={20} className="text-[#ddd] hover:text-[#e85438]" />
            </a>
          </div>
        </div>

        {/* Secciones del footer */}
        <div className="lg:col-span-2 flex justify-around">
          {/* Sección 1: Recursos */}
          <div>
            <h6 className="font-[14px]">Recursos</h6>
            <ul>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Reglas Oficiales de MTG
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer" >
              <a href="/tiendas">Tiendas oficiales</a>
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Aplicaciones de MTG
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Deck Builder
              </li>
            </ul>
          </div>

          {/* Sección 2: Comunidad */}
          <div>
            <h6 className="font-[14px]">Comunidad</h6>
            <ul>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Torneos y Eventos
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Foros y Grupos
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Articulos
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Co-Streamers
              </li>
            </ul>
          </div>

          {/* Sección 3: Soporte */}
          <div>
            <h6 className="font-[14px]">Soporte</h6>
            <ul>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                FAQ
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Contacto
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Política de Privacidad
              </li>
              <li className="py-2 text-sm hover:text-[#e85438] cursor-pointer">
                Términos y Condiciones
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;