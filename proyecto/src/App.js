import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import News from "./components/News"
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <News />
      <Footer />
    </div>
  );
}

export default App;
