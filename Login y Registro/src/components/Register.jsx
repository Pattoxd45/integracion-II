import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai"
import { IoCalendarNumberOutline } from "react-icons/io5";


const Register = () => {
  return (
    <div>
        <div className="bg-white border border-gray-200 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-20 relative">
          <h1 className="text-4xl text-white font-bold text-center mb-6">¡Registro!</h1> <br />
          <form action="">
            <div className="relative my-4">
              <input type="text" className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
              <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ingresa tu Nombre
              </label> <br />
              <BiUser className="absolute top-0 right-3" />
            </div>
            <div className="relative my-4">
              <input type="Date" className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
              <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ingresa tu fecha de Nacimiento
              </label> <br />
              <IoCalendarNumberOutline className="absolute top-0 right-3" />
            </div>
            <div className="relative my-4">
              <input type="email" className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
              <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ingresa tu email
              </label> <br />
              <BiUser className="absolute top-0 right-3" />
            </div>
            <div className="relative my-4">
              <input type="password" className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
              <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ingresa tu contraseña
              </label><br/>
              <AiOutlineUnlock className="absolute top-0 right-3" />
            </div>
            <div className="relative my-4">
              <input type="password" className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
              <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 -top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Confirma tu contraseña
              </label>
              <AiOutlineUnlock className="absolute top-0 right-3" />
            </div>

            <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-800 hover:bg-orange-600 hover:text-white py-2 font-semibold transition-colors duration-300" type="submit">
              Registrarse
            </button>
          </form>
        </div>  
    </div>
  );
};

export default Register;