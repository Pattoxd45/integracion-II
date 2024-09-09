import * as React from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-20 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1> <br />
        <form action="">
          <div className="relative my-4">
            <input
              type="email"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ingresa tu email
            </label> <br />
            <BiUser className="absolute top-0 right-3" />
          </div>
          <div className="relative my-4">
            <input
              type="password"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ingresa tu contraseña
            </label>
            <AiOutlineUnlock className="absolute top-0 right-3" />
          </div>

          <label className="text-white hover:text-orange-500 cursor-pointer">¿Has olvidado tu contraseña?</label> {/* cambiar span por Link to='' */}

          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-800 hover:bg-orange-600 hover:text-white py-2 font-semibold transition-colors duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <br />
      <div className="bg-white border border-gray-200 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-20 relative">
        <div>
          <span>¿No tienes cuenta? </span>
          <Link to="/register" className="text-white hover:text-orange-500 cursor-pointer" id="Register">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
