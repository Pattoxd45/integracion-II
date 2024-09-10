import React from "react";

const Register = () => {
  return (
    <div className="max-w-[1200px] mx-auto my-6 p-6 bg-[#000] text-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-4">Registro</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Nombre</label>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            className="w-full p-2 bg-[#333] text-white border border-[#e85438] rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Correo Electrónico</label>
          <input
            type="email"
            placeholder="Ingrese su correo electrónico"
            className="w-full p-2 bg-[#333] text-white border border-[#e85438] rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full p-2 bg-[#333] text-white border border-[#e85438] rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-[#e85438] text-white rounded hover:bg-[#d8432a]"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
