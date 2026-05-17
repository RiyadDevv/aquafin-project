import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import RisicoAnalyse from './pages/RisicoAnalyse';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/risico" element={<RisicoAnalyse />} />
          <Route path="/materialen" element={<h1>Materialen</h1>} />
          <Route path="/bestellen" element={<h1>Bestellen</h1>} />
          <Route path="/beheer" element={<h1>Beheer</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;