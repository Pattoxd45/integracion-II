import React from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { IoCalendarNumberOutline } from "react-icons/io5";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#000]">
      <div className="bg-[#1a1a1a] border border-gray-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-80 relative w-[380px]">
        <h1 className="text-4xl text-[#ddd] font-bold text-center mb-6">¡Registro!</h1>
        <form action="">
          {/* Nombre */}
          <div className="relative my-8"> {/* Espacio aumentado */}
            <input
              type="text"
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#e85438] focus:outline-none peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
            >
              Ingresa tu Nombre
            </label>
            <BiUser className="absolute top-2 right-3 text-[#ddd]" />
          </div>

          {/* Fecha de Nacimiento */}
          <div className="relative my-8"> {/* Espacio aumentado */}
            <input
              type="date"
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#e85438] focus:outline-none peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
            >
              Ingresa tu fecha de Nacimiento
            </label>
            <IoCalendarNumberOutline className="absolute top-2 right-3 text-[#ddd]" />
          </div>

          {/* Email */}
          <div className="relative my-8"> {/* Espacio aumentado */}
            <input
              type="email"
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#e85438] focus:outline-none peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
            >
              Ingresa tu email
            </label>
            <BiUser className="absolute top-2 right-3 text-[#ddd]" />
          </div>

          {/* Contraseña */}
          <div className="relative my-8"> {/* Espacio aumentado */}
            <input
              type="password"
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#e85438] focus:outline-none peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
            >
              Ingresa tu contraseña
            </label>
            <AiOutlineUnlock className="absolute top-2 right-3 text-[#ddd]" />
          </div>

          {/* Confirmar Contraseña */}
          <div className="relative my-8"> {/* Espacio aumentado */}
            <input
              type="password"
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#e85438] focus:outline-none peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
            >
              Confirma tu contraseña
            </label>
            <AiOutlineUnlock className="absolute top-2 right-3 text-[#ddd]" />
          </div>

          {/* Botón de Registro */}
          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-[#e85438] text-[#000] hover:bg-[#E83411] hover:text-[#fff] py-2 font-semibold transition-colors duration-300"
            type="submit"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
