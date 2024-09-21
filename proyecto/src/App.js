import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import News from "./components/News";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Events from "./components/Events";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Cards />
                <h1 className="title">NOTICIAS IMPORTANTES</h1>
                <News /> <br/>
                <h2 className="title">PROXIMOS EVENTOS</h2>
                <Events /><br/>
                <h3 className="title">CREADORES DE CONTENIDO</h3>
                <Footer />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
