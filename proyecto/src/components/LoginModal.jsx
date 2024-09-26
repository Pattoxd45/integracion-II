import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock, AiOutlineClose } from "react-icons/ai";

const LoginModal = ({ closeLoginModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#000] border border-[#ddd] rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm relative w-[380px]">
        <button
          onClick={closeLoginModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <AiOutlineClose size={20} />
        </button>
        <h1 className="text-4xl text-[#ddd] font-bold text-center mb-6">Login</h1>
        <form>
          <div className="relative my-8">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#E83411] focus:outline-none peer"
            />
            <label className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Ingresa tu email
            </label>
            <BiUser className="absolute top-3 right-2 text-xl text-[#ddd]" />
          </div>

          <div className="relative my-8">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#E83411] focus:outline-none peer"
            />
            <label className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Ingresa tu contraseña
            </label>
            <AiOutlineUnlock className="absolute top-3 right-2 text-xl text-[#ddd]" />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#E83411] text-[#ddd] font-semibold rounded-md hover:opacity-70 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
