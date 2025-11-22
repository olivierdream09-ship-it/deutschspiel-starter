import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css';

const HomePage: React.FC = () => {
  const games = [
    {
      path: '/games/memory',
      icon: '🎴',
      title: 'Wortmeister',
      description: 'Jeu de mémoire vocabulaire allemand-français',
      features: ['Vocabulaire adaptatif', 'Système de progression', 'Niveaux A1-C2'],
      color: 'blue'
    },
    {
      path: '/games/grammar',
      icon: '⚔️',
      title: 'GrammatikHero',
      description: 'Jeu de grammaire interactive',
      features: ['Règles contextuelles', 'Exercices adaptatifs', 'Corrections détaillées'],
      color: 'purple'
    },
    {
      path: '/games/listening',
      icon: '🎧',
      title: 'Hörprofi',
      description: 'Compréhension orale et dictées',
      features: ['Audio natif', 'Différents accents', 'Vitesse ajustable'],
      color: 'green'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <h1>Apprenez l'Allemand en Vous Amusant !</h1>
          <p className="hero-subtitle">
            Découvrez une méthode innovante basée sur les jeux adaptatifs et l'intelligence artificielle
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Mots de vocabulaire</span>
            </div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Types de jeux</span>
            </div>
            <div className="stat">
              <span className="stat-number">A1-C2</span>
              <span className="stat-label">Niveaux CECRL</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Games Grid */}
      <motion.section 
        className="games-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2>Choisissez Votre Aventure</h2>
        <div className="games-grid">
          {games.map((game, index) => (
            <motion.div
              key={game.path}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={game.path} className={`game-card game-card-${game.color}`}>
                <div className="game-icon">{game.icon}</div>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <ul className="game-features">
                  {game.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <div className="game-cta">
                  <span>Commencer →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2>Pourquoi DeutschSpiel ?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Adaptatif</h3>
            <p>Le contenu s'adapte à votre niveau et vos difficultés</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Progressif</h3>
            <p>Suivez votre progression de A1 à C2 avec des objectifs clairs</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🏆</div>
            <h3>Ludique</h3>
            <p>Apprenez grâce à des jeux engageants et des récompenses</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
