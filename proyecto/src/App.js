import React from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import News from "./components/News"
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Cards />
      <News />
      <Footer />
    </div>
  );
}

export default App;
