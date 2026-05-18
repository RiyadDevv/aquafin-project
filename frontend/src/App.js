import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import RisicoAnalyse from './pages/RisicoAnalyse';
import Materialen from './pages/Materialen';
import Bestellen from './pages/Bestellen';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/risico" element={<RisicoAnalyse />} />
          <Route path="/materialen" element={<Materialen />} />
          <Route path="/bestellen" element={<Bestellen />} />
          <Route path="/beheer" element={<h1>Beheer</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;