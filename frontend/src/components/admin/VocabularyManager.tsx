import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './VocabularyManager.css';

const VocabularyManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [importData, setImportData] = useState('');

  const sampleVocabulary = [
    { id: 1, german: 'Haus', french: 'maison', article: 'das', level: 'A1', category: 'habitation' },
    { id: 2, german: 'Buch', french: 'livre', article: 'das', level: 'A1', category: 'éducation' },
    { id: 3, german: 'Freund', french: 'ami', article: 'der', level: 'A1', category: 'social' },
    { id: 4, german: 'Universität', french: 'université', article: 'die', level: 'A2', category: 'éducation' },
    { id: 5, german: 'Wirtschaft', french: 'économie', article: 'die', level: 'B1', category: 'travail' }
  ];

  const handleImport = () => {
    alert('Fonction d\'import à implémenter avec l\'API');
    setImportData('');
  };

  const handleExport = () => {
    alert('Fonction d\'export à implémenter avec l\'API');
  };

  return (
    <div className="vocabulary-manager">
      <div className="manager-header">
        <h2>📚 Gestion du Vocabulaire</h2>
        <p>Ajoutez et gérez les mots de vocabulaire</p>
      </div>

      <div className="manager-tabs">
        <button 
          className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
          onClick={() => setActiveTab('browse')}
        >
          📖 Parcourir
        </button>
        <button 
          className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ➕ Ajouter
        </button>
        <button 
          className={`tab-button ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          📥 Importer
        </button>
      </div>

      <div className="manager-content">
        {activeTab === 'browse' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="browse-content"
          >
            <div className="content-actions">
              <input 
                type="text" 
                placeholder="🔍 Rechercher un mot..." 
                className="search-input"
              />
              <select className="filter-select">
                <option>Tous les niveaux</option>
                <option>A1</option>
                <option>A2</option>
                <option>B1</option>
                <option>B2</option>
              </select>
              <button className="action-btn" onClick={handleExport}>
                📤 Exporter CSV
              </button>
            </div>

            <div className="vocabulary-table">
              <table>
                <thead>
                  <tr>
                    <th>Allemand</th>
                    <th>Français</th>
                    <th>Article</th>
                    <th>Niveau</th>
                    <th>Catégorie</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleVocabulary.map((word) => (
                    <tr key={word.id}>
                      <td>
                        <strong>{word.german}</strong>
                      </td>
                      <td>{word.french}</td>
                      <td>
                        <span className="article-tag">{word.article}</span>
                      </td>
                      <td>
                        <span className={`level-badge level-${word.level}`}>
                          {word.level}
                        </span>
                      </td>
                      <td>
                        <span className="category-tag">{word.category}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-edit">✏️</button>
                          <button className="btn-delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'add' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="add-content"
          >
            <div className="add-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Mot Allemand *</label>
                  <input type="text" placeholder="Haus" />
                </div>
                <div className="form-group">
                  <label>Traduction Française *</label>
                  <input type="text" placeholder="maison" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Article</label>
                  <select>
                    <option value="">Sans article</option>
                    <option value="der">der</option>
                    <option value="die">die</option>
                    <option value="das">das</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Niveau CECRL *</label>
                  <select>
                    <option value="A1">A1 - Débutant</option>
                    <option value="A2">A2 - Élémentaire</option>
                    <option value="B1">B1 - Intermédiaire</option>
                    <option value="B2">B2 - Avancé</option>
                    <option value="C1">C1 - Autonome</option>
                    <option value="C2">C2 - Maîtrise</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Catégorie *</label>
                <input type="text" placeholder="habitation, nourriture, travail..." />
              </div>

              <div className="form-group">
                <label>Phrase d'exemple (optionnel)</label>
                <textarea placeholder="Das Haus ist groß. (La maison est grande.)" rows={3} />
              </div>

              <div className="form-actions">
                <button className="btn-primary">💾 Sauvegarder le Mot</button>
                <button className="btn-secondary">➕ Ajouter un Autre</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'import' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="import-content"
          >
            <div className="import-info">
              <h3>📥 Import par Lot</h3>
              <p>Importez des mots de vocabulaire en format CSV</p>
              
              <div className="csv-format">
                <h4>Format attendu :</h4>
                <code>
                  german_word,translation,article,level,category,example_sentence
                </code>
                <br />
                <code>
                  Haus,maison,das,A1,habitation,"Das Haus ist groß."
                </code>
              </div>

              <div className="import-area">
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="Collez vos données CSV ici..."
                  rows={10}
                  className="import-textarea"
                />
                <div className="import-actions">
                  <button className="btn-primary" onClick={handleImport}>
                    📥 Importer les Données
                  </button>
                  <button className="btn-secondary">
                    📋 Utiliser un Exemple
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VocabularyManager;
