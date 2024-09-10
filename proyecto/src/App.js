import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import News from "./components/News"
import Footer from "./components/Footer";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Hero />
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Cards />
        <News />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
