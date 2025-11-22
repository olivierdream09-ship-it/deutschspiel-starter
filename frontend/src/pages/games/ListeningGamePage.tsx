import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ListeningGamePage.css';

const ListeningGamePage: React.FC = () => {
  return (
    <div className="listening-game-page">
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
            🎧
          </motion.div>
          
          <h1>Hörprofi</h1>
          <h2>Compréhension Orale et Dictées</h2>
          
          <motion.div
            className="feature-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="feature">
              <span className="feature-icon">🎙️</span>
              <div className="feature-text">
                <h3>Audio Natif</h3>
                <p>Enregistrements par des locuteurs natifs allemands</p>
              </div>
            </div>
            
            <div className="feature">
              <span className="feature-icon">🌍</span>
              <div className="feature-text">
                <h3>Différents Accents</h3>
                <p>Allemand, Autrichien, Suisse et régional</p>
              </div>
            </div>
            
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <div className="feature-text">
                <h3>Vitesse Ajustable</h3>
                <p>Adaptez la vitesse de lecture à votre niveau</p>
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
                  animate={{ width: '45%' }}
                  transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                />
              </div>
              <span className="progress-text">45% complété</span>
            </div>
          </motion.div>

          <motion.div
            className="game-types"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <h3>🎯 Types d'Exercices à Venir</h3>
            <div className="exercise-grid">
              <div className="exercise-card">
                <span className="exercise-icon">📝</span>
                <h4>Dictées Interactives</h4>
                <p>Écrivez ce que vous entendez</p>
              </div>
              <div className="exercise-card">
                <span className="exercise-icon">❓</span>
                <h4>Quiz Audio</h3>
                <p>Répondez à des questions après écoute</p>
              </div>
              <div className="exercise-card">
                <span className="exercise-icon">🎯</span>
                <h4>Reconnaissance</h4>
                <p>Trouvez l'audio correspondant au texte</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="action-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
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

export default ListeningGamePage;
