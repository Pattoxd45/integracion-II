import React, { useState } from "react";
import { BiUser, BiEnvelope } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { useUser } from './UserContext'; // Asegúrate de importar el contexto
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ closeRegisterModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUser(); // Obtener la función setUser del contexto
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    // Validación
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    // Objeto con los datos del usuario
    const userData = {
      nombre: username,
      correo: email,
      clave: password,
    };

    // Petición POST al servidor
    fetch('http://186.64.122.218:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          // Guardar el token en localStorage (o en cookies)
          localStorage.setItem('token', data.token);

          // Iniciar sesión automáticamente
          const loginData = {
            email: userData.correo,
            password: userData.clave,
          };

          return fetch('http://186.64.122.218:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });
        }
      })
      .then(loginResponse => {
        if (loginResponse) {
          return loginResponse.json();
        }
      })
      .then(loginData => {
        if (loginData && loginData.userId) {
          setUser(loginData.userId); // Actualizar el contexto con el ID del usuario
          alert('¡Registro exitoso y sesión iniciada!');
          closeRegisterModal(); // Cierra el modal después del registro exitoso
          navigate('/'); // Navegar a la página principal (si lo deseas)
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        setErrorMessage('Hubo un problema con el registro. Inténtalo de nuevo.');
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#000] border border-[#ddd] rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm relative w-[380px]">
        <button
          onClick={closeRegisterModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          X
        </button>
        <h1 className="text-4xl text-[#ddd] font-bold text-center mb-6">¡Registro!</h1>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="relative my-8">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#E83411] focus:outline-none peer"
            />
            <label className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Usuario
            </label>
            <BiUser className="absolute top-3 right-2 text-xl text-[#ddd]" />
          </div>

          {/* Campo de Correo */}
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
              Correo Electrónico
            </label>
            <BiEnvelope className="absolute top-3 right-2 text-xl text-[#ddd]" />
          </div>

          {/* Campo de Contraseña */}
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
              Contraseña
            </label>
            <AiOutlineUnlock className="absolute top-3 right-2 text-xl text-[#ddd]" />
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div className="relative my-8">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="block w-full py-2.5 px-0 text-sm text-[#ddd] bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-[#E83411] focus:outline-none peer"
            />
            <label className="absolute text-sm text-[#ddd] transition-all transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirmar Contraseña
            </label>
            <AiOutlineUnlock className="absolute top-3 right-2 text-xl text-[#ddd]" />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#E83411] text-white font-semibold rounded-md hover:bg-[#d82511] transition duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
