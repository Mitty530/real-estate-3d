import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Buildings from './components/Buildings';
import About from './components/About';
import Contact from './components/Contact';
import BuildingDetails from './components/BuildingDetails';

// Set the app element for react-modal
Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <div className="relative z-0 bg-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Buildings />
              <About />
              <Contact />
            </>
          } />
          <Route path="/building/:id" element={<BuildingDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
