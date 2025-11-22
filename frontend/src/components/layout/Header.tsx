import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="app-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-content">
        <Link to="/" className="logo">
          <motion.div 
            className="logo-icon"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            🎯
          </motion.div>
          <div className="logo-text">
            <h1>DeutschSpiel</h1>
            <span>Apprendre l'Allemand par le Jeu</span>
          </div>
        </Link>

        <div className="header-actions">
          <div className="user-xp">
            <span className="xp-label">XP Total</span>
            <div className="xp-value">1,250</div>
          </div>
          
          <div className="user-level">
            <span className="level-badge">A2</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
