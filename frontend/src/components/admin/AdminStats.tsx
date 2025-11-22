import React from 'react';
import { motion } from 'framer-motion';
import './AdminStats.css';

const AdminStats: React.FC = () => {
  const stats = [
    {
      title: 'Utilisateurs Actifs',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Parties Jouées',
      value: '8,956',
      change: '+23%',
      trend: 'up',
      icon: '🎮',
      color: 'green'
    },
    {
      title: 'Mots de Vocabulaire',
      value: '542',
      change: '+5%',
      trend: 'up',
      icon: '📚',
      color: 'purple'
    },
    {
      title: 'Taux de Réussite',
      value: '78%',
      change: '+3%',
      trend: 'up',
      icon: '📊',
      color: 'orange'
    }
  ];

  const recentActivity = [
    { user: 'Marie D.', action: 'a complété Wortmeister', time: '2 min', score: '950' },
    { user: 'Thomas L.', action: 'a débloqué A2', time: '5 min', score: 'Level Up' },
    { user: 'Sophie M.', action: 'a battu son record', time: '10 min', score: '1,250' },
    { user: 'Admin', action: 'a ajouté 20 mots', time: '1 h', score: 'Nouveau' }
  ];

  return (
    <div className="admin-stats">
      <div className="stats-header">
        <h2>📊 Tableau de Bord</h2>
        <p>Aperçu des performances et de l'engagement</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className={`stat-card stat-card-${stat.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.change} ce mois
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activité récente et contenu en un seul row */}
      <div className="dashboard-content">
        {/* Activité Récente */}
        <motion.div
          className="recent-activity"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>🕐 Activité Récente</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className="activity-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="activity-avatar">
                  {activity.user.charAt(0)}
                </div>
                <div className="activity-details">
                  <strong>{activity.user}</strong> {activity.action}
                  <span className="activity-time">{activity.time}</span>
                </div>
                <div className="activity-score">{activity.score}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contenu à Venir */}
        <motion.div
          className="upcoming-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>🚀 Contenu à Venir</h3>
          <div className="content-list">
            <div className="content-item">
              <div className="content-icon">⚔️</div>
              <div className="content-info">
                <h4>GrammatikHero</h4>
                <p>Jeu de grammaire - 65% complété</p>
                <div className="content-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-item">
              <div className="content-icon">🎧</div>
              <div className="content-info">
                <h4>Hörprofi</h4>
                <p>Compréhension orale - 45% complété</p>
                <div className="content-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-item">
              <div className="content-icon">🎯</div>
              <div className="content-info">
                <h4>Saison "Oktoberfest"</h4>
                <p>Vocabulaire thématique - En préparation</p>
                <div className="content-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminStats;
