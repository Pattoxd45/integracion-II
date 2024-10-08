import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import News from "./components/News";
import Footer from "./components/Footer";
import Cartas from "./components/Cartas";  
import Creadores from "./components/Creadores";
import Noticias from "./components/Noticias";
import Events from "./components/Events";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Cards />
              <News />
            </>
          } />
          <Route path="/cartas" element={<Cartas />} />  
          <Route path="/profile" element={<Profile />} />
          <Route path="/noticias" element={
            <>
              <h1 className="title">NOTICIAS IMPORTANTES</h1>
              <Noticias />
              <h2 className="title">PROXIMOS EVENTOS</h2>
              <Events />
              <h3 className="title">CREADORES DE CONTENIDO</h3>
              <Creadores />
            </>
          } />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;