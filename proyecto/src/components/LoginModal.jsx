import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { useUser } from './UserContext';
import { useNavigate } from "react-router-dom";

const LoginModal = ({ closeLoginModal }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Reset error on input change
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('https://magicarduct.online:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const result = await response.json();
      if (response.ok) {
        setUser(result.userId);
        navigate('/'); // Navegar a la página principal
        closeLoginModal(); // Cerrar el modal después de la navegación
      } else {
        setError(result.message || 'Error de login');
      }
    } catch (error) {
      setError('Error: Hubo un problema con el servidor.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#0b0f14] border-2 border-[rgba(255,255,255,0.1)] rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm relative w-[380px]">
        <button onClick={closeLoginModal} className="absolute top-2 right-2 text-gray-400 hover:text-white">X</button>
        <h1 className="text-4xl text-[#e1e6ea] font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="relative my-8">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full py-2.5 px-0 text-sm text-[#e1e6ea] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#2a5880] focus:outline-none peer"
            />
            <label className="absolute text-sm text-[#e1e6ea] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingresa tu email</label>
            <BiUser className="absolute top-3 right-2 text-xl text-[#e1e6ea]" />
          </div>

          <div className="relative my-8">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full py-2.5 px-0 text-sm text-[#e1e6ea] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#2a5880] focus:outline-none peer"
            />
            <label className="absolute text-sm text-[#e1e6ea] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingresa tu contraseña</label>
            <AiOutlineUnlock className="absolute top-3 right-2 text-xl text-[#e1e6ea]" />
          </div>

          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#2a5880] text-[#e1e6ea] font-semibold rounded-md hover:opacity-80 transition duration-100">
            {loading ? 'Cargando...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;