import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './GrammarGamePage.css';

const GrammarGamePage: React.FC = () => {
  return (
    <div className="grammar-game-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-coming-soon"
      >
        <div className="coming-soon-content">
          <motion.div
            className="game-icon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            ⚔️
          </motion.div>
          
          <h1>GrammatikHero</h1>
          <h2>Jeu de Grammaire Interactive</h2>
          
          <motion.div
            className="feature-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <div className="feature-text">
                <h3>Règles Contextuelles</h3>
                <p>Apprenez la grammaire dans des situations réelles</p>
              </div>
            </div>
            
            <div className="feature">
              <span className="feature-icon">📝</span>
              <div className="feature-text">
                <h3>Exercices Adaptatifs</h3>
                <p>Le niveau s'ajuste à votre progression</p>
              </div>
            </div>
            
            <div className="feature">
              <span className="feature-icon">💡</span>
              <div className="feature-text">
                <h3>Corrections Détaillées</h3>
                <p>Comprenez vos erreurs avec des explications claires</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="progress-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="progress-info">
              <h3>🚧 En Développement</h3>
              <p>Ce jeu sera disponible très bientôt !</p>
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                />
              </div>
              <span className="progress-text">65% complété</span>
            </div>
          </motion.div>

          <motion.div
            className="action-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link to="/games/memory" className="action-btn primary">
              🎴 Jouer à Wortmeister en attendant
            </Link>
            <Link to="/" className="action-btn secondary">
              ← Retour à l'accueil
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GrammarGamePage;
