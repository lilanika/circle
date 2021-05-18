import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
        <Link to="/">
          <i className="fas fa-check-circle" /> Goals
        </Link>
        <ul>
          <li> <Link to="/login"> login
        </Link></li>
          <li><Link to="/register"> register
        </Link></li>
        </ul>
    </nav>
  );
};

export default Navbar