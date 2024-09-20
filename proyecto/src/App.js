import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
<<<<<<< HEAD
import News from "./components/News";
import Footer from "./components/Footer";
import Profile from './pages/Profile';
=======
import News from "./components/News"
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login"
>>>>>>> 31dcc32e6b689ff7b27f36a19238e1726e99856d

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
                <News />
                <Footer />
              </>
            }
          />
<<<<<<< HEAD
          <Route path="/profile" element={<Profile />} />
=======
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
>>>>>>> 31dcc32e6b689ff7b27f36a19238e1726e99856d
        </Routes>
      </Router>
    </div>
  );
}

export default App;
