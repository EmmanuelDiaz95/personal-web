import React from 'react';
import { NavLink } from 'react-router-dom';

const NavButton = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black ${
          isActive ? 'bg-blue-900/30' : 'hover:bg-blue-900/30'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const Navigation = () => {
  return (
    <nav className="flex space-x-4" aria-label="Main navigation">
      <NavButton to="/">About</NavButton>
      <NavButton to="/projects">Projects</NavButton>
      <NavButton to="/blog">Blog</NavButton>
      <NavButton to="/contact">Contact</NavButton>
    </nav>
  );
};

export default Navigation;
