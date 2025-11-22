import React from 'react';
import { motion } from 'framer-motion';
import { MemoryCard } from '../../../types/game';
import './MemoryCardComponent.css';

interface MemoryCardComponentProps {
  card: MemoryCard;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const MemoryCardComponent: React.FC<MemoryCardComponentProps> = ({
  card,
  isFlipped,
  isMatched,
  onClick,
  disabled
}) => {
  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`memory-card ${isMatched ? 'matched' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <motion.div
        className="card-inner"
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Face avant de la carte */}
        <div className="card-front">
          <motion.div
            className="question-mark"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            ?
          </motion.div>
          <div className="card-hint">
            {card.type === 'german' ? '🇩🇪' : '🇫🇷'}
          </div>
        </div>

        {/* Face arrière de la carte */}
        <div className="card-back">
          <div className="card-content">
            {card.article && (
              <span className="article">{card.article}</span>
            )}
            <span className="word">{card.content}</span>
          </div>
          <div className="card-type-badge">
            {card.type === 'german' ? 'Allemand' : 'Français'}
          </div>
          
          {card.audioUrl && (
            <button 
              className="audio-button"
              onClick={(e) => {
                e.stopPropagation();
                // Implémenter la lecture audio
                console.log('Play audio:', card.audioUrl);
              }}
            >
              🔊
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryCardComponent;
