import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Ticket Management System</div>
        <div className="navbar-links">
          <Link to="/users" className="navbar-link">Users</Link>
          <Link to="/tickets" className="navbar-link">Tickets</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
