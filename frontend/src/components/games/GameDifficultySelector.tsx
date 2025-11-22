import React from 'react';
import { motion } from 'framer-motion';
import './GameDifficultySelector.css';

interface GameDifficultySelectorProps {
  difficulty: string;
  category: string;
  onDifficultyChange: (difficulty: string) => void;
  onCategoryChange: (category: string) => void;
}

const GameDifficultySelector: React.FC<GameDifficultySelectorProps> = ({
  difficulty,
  category,
  onDifficultyChange,
  onCategoryChange
}) => {
  const levels = [
    { value: 'all', label: 'Tous niveaux', color: 'gray' },
    { value: 'A1', label: 'Débutant A1', color: 'green' },
    { value: 'A2', label: 'Élémentaire A2', color: 'blue' },
    { value: 'B1', label: 'Intermédiaire B1', color: 'yellow' },
    { value: 'B2', label: 'Avancé B2', color: 'orange' },
    { value: 'C1', label: 'Autonome C1', color: 'red' },
    { value: 'C2', label: 'Maîtrise C2', color: 'purple' }
  ];

  const categories = [
    { value: 'all', label: 'Toutes catégories' },
    { value: 'habitation', label: '🏠 Habitation' },
    { value: 'éducation', label: '📚 Éducation' },
    { value: 'social', label: '👥 Social' },
    { value: 'nourriture', label: '🍎 Nourriture' },
    { value: 'famille', label: '👪 Famille' },
    { value: 'transport', label: '🚗 Transport' },
    { value: 'animaux', label: '🐾 Animaux' },
    { value: 'travail', label: '💼 Travail' },
    { value: 'voyage', label: '✈️ Voyage' }
  ];

  return (
    <div className="difficulty-selector">
      <div className="selector-group">
        <h3>📊 Niveau de Difficulté</h3>
        <div className="options-grid">
          {levels.map((level) => (
            <motion.button
              key={level.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`level-option ${difficulty === level.value ? 'active' : ''} ${level.color}`}
              onClick={() => onDifficultyChange(level.value)}
            >
              {level.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="selector-group">
        <h3>📂 Catégorie de Vocabulaire</h3>
        <div className="options-grid">
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`category-option ${category === cat.value ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.value)}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameDifficultySelector;
