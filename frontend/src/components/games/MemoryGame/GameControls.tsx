import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './GameControls.css';

interface GameControlsProps {
  onRestart: () => void;
  gameStatus: 'idle' | 'playing' | 'completed';
  moves: number;
  time: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  onRestart,
  gameStatus,
  moves,
  time
}) => {
  const navigate = useNavigate();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="game-controls"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="controls-left">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="control-btn secondary"
          onClick={() => navigate('/')}
        >
          ← Retour à l'accueil
        </motion.button>
      </div>

      <div className="controls-center">
        {gameStatus === 'playing' && (
          <motion.div 
            className="live-stats"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <span className="live-stat">🔄 {moves} coups</span>
            <span className="live-stat">⏱️ {formatTime(time)}</span>
          </motion.div>
        )}
      </div>

      <div className="controls-right">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="control-btn primary"
          onClick={onRestart}
        >
          🔄 Recommencer
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="control-btn help"
          onClick={() => {
            // Implémenter l'aide contextuelle
            alert(`🎮 Comment jouer :\n• Retournez deux cartes à la fois\n• Trouvez les paires allemand-français\n• Moins de coups = plus de points !`);
          }}
        >
          ❓ Aide
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GameControls;
