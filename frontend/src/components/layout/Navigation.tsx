import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/games/memory', label: 'Wortmeister', icon: '🎴' },
    { path: '/games/grammar', label: 'GrammatikHero', icon: '⚔️' },
    { path: '/games/listening', label: 'Hörprofi', icon: '🎧' },
    { path: '/profile', label: 'Profil', icon: '👤' },
    { path: '/admin', label: 'Admin', icon: '⚙️' },
  ];

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
