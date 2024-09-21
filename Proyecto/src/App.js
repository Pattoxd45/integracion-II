import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import News from "./components/News";
import Footer from "./components/Footer";
import Cartas from "./components/Cartas";  

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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
