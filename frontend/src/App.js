import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/risico" element={<h1>Risicoanalyse</h1>} />
          <Route path="/materialen" element={<h1>Materialen</h1>} />
          <Route path="/bestellen" element={<h1>Bestellen</h1>} />
          <Route path="/beheer" element={<h1>Beheer</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;