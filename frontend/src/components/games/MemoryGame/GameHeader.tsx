import React from 'react';
import { motion } from 'framer-motion';
import './GameHeader.css';

interface GameHeaderProps {
  moves: number;
  time: number;
  matchedPairs: number;
  totalPairs: number;
  gameStatus: 'idle' | 'playing' | 'completed';
}

const GameHeader: React.FC<GameHeaderProps> = ({
  moves,
  time,
  matchedPairs,
  totalPairs,
  gameStatus
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="game-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="game-title">
        <h2>🎴 Wortmeister - Memory</h2>
        <p>Trouvez toutes les paires de mots</p>
      </div>

      <div className="game-stats">
        <motion.div 
          className="stat"
          whileHover={{ scale: 1.05 }}
          key={`moves-${moves}`}
        >
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <span className="stat-value">{moves}</span>
            <span className="stat-label">Coups</span>
          </div>
        </motion.div>

        <motion.div 
          className="stat"
          whileHover={{ scale: 1.05 }}
          key={`time-${time}`}
        >
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <span className="stat-value">{formatTime(time)}</span>
            <span className="stat-label">Temps</span>
          </div>
        </motion.div>

        <motion.div 
          className="stat"
          whileHover={{ scale: 1.05 }}
          key={`pairs-${matchedPairs}`}
        >
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-value">{matchedPairs}/{totalPairs}</span>
            <span className="stat-label">Paires</span>
          </div>
        </motion.div>

        <motion.div 
          className="stat progress-stat"
          whileHover={{ scale: 1.05 }}
        >
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(matchedPairs / totalPairs) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="progress-text">
            {Math.round((matchedPairs / totalPairs) * 100)}% complété
          </span>
        </motion.div>
      </div>

      {gameStatus === 'idle' && (
        <motion.div 
          className="game-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>👆 Cliquez sur une carte pour commencer !</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameHeader;
