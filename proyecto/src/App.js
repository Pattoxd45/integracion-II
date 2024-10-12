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
import Decks from "./components/Decks";
import About from "./components/about";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Cards />
                <News />
              </>
            } />
            <Route path="/cartas" element={<Cartas />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/noticias" element={
              <>
                <br></br>
                <h1 className="text-center text-orange-500 text-4xl font-bold">ÚLTIMAS NOTICIAS</h1>
                <Noticias /> <br></br>
                <h2 className="text-center text-orange-500 text-4xl font-bold">PRÓXIMOS EVENTOS</h2>
                <Events /><br></br>
                <h3 className="text-center text-orange-500 text-4xl font-bold">CREADORES DE CONTENIDO</h3>
                <Creadores />
              </>
            } />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
