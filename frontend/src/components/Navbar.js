import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Aquafin Technieker Platform</div>
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/risico">Risicoanalyse</Link></li>
        <li><Link to="/materialen">Materialen</Link></li>
        <li><Link to="/bestellen">Bestellen</Link></li>
        <li><Link to="/beheer">Beheer</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;