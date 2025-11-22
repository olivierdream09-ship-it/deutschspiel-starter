import React from 'react';
import { motion } from 'framer-motion';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  const userStats = {
    level: 'A2',
    xp: 1250,
    nextLevelXp: 2000,
    gamesPlayed: 47,
    vocabularyMastered: 128,
    currentStreak: 12,
    bestStreak: 15
  };

  const recentGames = [
    { game: 'Wortmeister', score: 950, date: '2024-01-15', time: '3:45' },
    { game: 'Wortmeister', score: 870, date: '2024-01-14', time: '4:12' },
    { game: 'Wortmeister', score: 780, date: '2024-01-13', time: '5:01' },
    { game: 'Wortmeister', score: 920, date: '2024-01-12', time: '3:28' }
  ];

  const skills = [
    { name: 'Vocabulaire', level: 75, category: 'A1-A2' },
    { name: 'Grammaire', level: 60, category: 'Articles' },
    { name: 'Écoute', level: 45, category: 'Compréhension' },
    { name: 'Conjugaison', level: 70, category: 'Présent' }
  ];

  return (
    <div className="user-profile">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-header"
      >
        <h1>👤 Votre Profil</h1>
        <p>Suivez votre progression et vos performances</p>
      </motion.div>

      <div className="profile-content">
        {/* Section Statistiques Principales */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="stats-section"
        >
          <div className="level-card">
            <div className="level-badge">
              <span className="level">{userStats.level}</span>
              <span className="level-label">Niveau Actuel</span>
            </div>
            <div className="xp-progress">
              <div className="xp-info">
                <span className="current-xp">{userStats.xp} XP</span>
                <span className="next-xp">{userStats.nextLevelXp} XP pour B1</span>
              </div>
              <div className="xp-bar">
                <motion.div
                  className="xp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎮</div>
              <div className="stat-info">
                <span className="stat-value">{userStats.gamesPlayed}</span>
                <span className="stat-label">Parties Jouées</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-info">
                <span className="stat-value">{userStats.vocabularyMastered}</span>
                <span className="stat-label">Mots Maîtrisés</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <span className="stat-value">{userStats.currentStreak}</span>
                <span className="stat-label">Jours Consécutifs</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <span className="stat-value">{userStats.bestStreak}</span>
                <span className="stat-label">Record de Série</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Compétences */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="skills-section"
        >
          <h2>📊 Vos Compétences</h2>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-category">{skill.category}</span>
                </div>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="skill-level">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section Parties Récentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="games-section"
        >
          <h2>🎮 Parties Récentes</h2>
          <div className="games-list">
            {recentGames.map((game, index) => (
              <div key={index} className="game-item">
                <div className="game-icon">🎴</div>
                <div className="game-info">
                  <span className="game-name">{game.game}</span>
                  <span className="game-date">{game.date}</span>
                </div>
                <div className="game-stats">
                  <span className="game-score">{game.score} points</span>
                  <span className="game-time">{game.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section Objectifs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="goals-section"
        >
          <h2>🎯 Objectifs du Jour</h2>
          <div className="goals-list">
            <div className="goal-item completed">
              <span className="goal-check">✅</span>
              <span className="goal-text">Jouer 1 partie</span>
            </div>
            <div className="goal-item completed">
              <span className="goal-check">✅</span>
              <span className="goal-text">Apprendre 10 mots</span>
            </div>
            <div className="goal-item">
              <span className="goal-check">⏳</span>
              <span className="goal-text">Atteindre 80% en grammaire</span>
            </div>
            <div className="goal-item">
              <span className="goal-check">🎯</span>
              <span className="goal-text">Terminer le niveau A2</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
