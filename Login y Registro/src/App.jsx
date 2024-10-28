import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="text-white h-[100vh] flex flex-col justify-center items-center bg-cover">
        {/* Header */}
        <header className="w-full p-4 shadow-md flex justify-between items-center">
          {/* Título a la izquierda */}
          <h1 className="text-2xl font-bold">Magic: The Gathering</h1>

          {/* Menú a la derecha */}
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-400">Inicio</Link></li>
              <li><Link to="/cartas" className="hover:text-gray-400">Cartas</Link></li>
              <li><Link to="/noticias" className="hover:text-gray-400">Noticias</Link></li>
              <li><Link to="/acerca" className="hover:text-gray-400">Acerca</Link></li>
              <li><Link to="/soporte" className="hover:text-gray-400">Soporte</Link></li>
            </ul>
          </nav>
        </header>

        {/* Formulario de Login centrado */}
        <div className="flex-grow flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
