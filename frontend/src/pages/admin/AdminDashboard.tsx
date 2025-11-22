import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminStats from '../../components/admin/AdminStats';
import VocabularyManager from '../../components/admin/VocabularyManager';
import ContentScheduler from '../../components/admin/ContentScheduler';
import UserManagement from '../../components/admin/UserManagement';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: '📊 Tableau de Bord', icon: '📊' },
    { id: 'vocabulary', label: '📚 Vocabulaire', icon: '📚' },
    { id: 'content', label: '🗓️ Programmation', icon: '🗓️' },
    { id: 'users', label: '👥 Utilisateurs', icon: '👥' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminStats />;
      case 'vocabulary':
        return <VocabularyManager />;
      case 'content':
        return <ContentScheduler />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return (
          <div className="coming-soon-section">
            <h2>📈 Analytics Avancés</h2>
            <p>Disponible prochainement avec le tracking complet des performances</p>
          </div>
        );
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="admin-dashboard">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-header"
      >
        <h1>⚙️ Administration DeutschSpiel</h1>
        <p>Gérez le contenu, les utilisateurs et analysez les performances</p>
      </motion.div>

      <div className="admin-layout">
        <motion.nav 
          className="admin-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </motion.button>
          ))}
        </motion.nav>

        <motion.main 
          className="admin-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          key={activeTab}
        >
          {renderContent()}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminDashboard;
